const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var admin = require("firebase-admin");

var serviceAccount = require("./eymo-91ecd-firebase-adminsdk-jw962-76b11e34f9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eymo-91ecd.firebaseio.com",
  storageBucket: "gs://eymo-91ecd.appspot.com"
});

var dataBase = admin.database();
var bucket = admin.storage().bucket();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: true}));

app.get('/', function(req, res){
  console.log("entroServer");
});


/*app.post('/Subir_ImagenMaquina', function (req, res) {
  console.log(req.body.file);
  console.log(req.body.name);

      bucket.upload(req.body.name,{ destination: 'bucket.png' }).then(data => {
      console.log('upload success');
        }).catch(err => {
      console.log('error uploading to storage', err);
  });
  */

  app.post('/ConsultaMaquina', function (req, res) {
    console.log(req.body.Area);

    var ArrayAux=[];
    let self=this;
    var refDB=dataBase.ref("Ing_Tala/Areas/"+req.body.Area);
    var promise=new Promise(
      function(resolve,reject){
          refDB.on('value', snapshot=> {
            if(snapshot.exists()){
              snapshot.forEach(function(child){
              resolve(ArrayAux = ArrayAux.concat([{AnoInstalacion:child.val().AnoInstalacion, Area:child.val().Area, Corriente:child.val().Corriente, Imagen:child.val().Imagen, Marca : child.val().Marca, Nombre: child.val().Nombre, Componentes : child.val().Componentes}]))
              })
            }
            else{
              console.log('hello');
              resolve();
            }
          });

        })
        promise.then(
          function(){
            var Arr = [];
            ArrayAux.forEach(snap =>{
              var ARCom = snap.Componentes;

              var output = Object.keys(ARCom.Indicador_VF).map(function(key) {
              Arr.push({key: key, data: ARCom.Indicador_VF[key]})     ;
              })

            });
            console.log(ArrayAux);

            res.send({Maquinas:ArrayAux,Componentes:Arr});

          }
        )


    });






app.post('/Subir_MaquinaNueva', function (req, res) {

  var refDa = dataBase.ref("Ing_Tala/Areas/"+req.body.AreaM+"/"+req.body.NombreM);
  refDa.set({
    Nombre:req.body.NombreM,
    Area:req.body.AreaM,
    Marca:req.body.MarcaM,
    AnoInstalacion:req.body.AnoInstalacionM,
    Corriente:req.body.CorrienteM,
    Imagen:req.body.imagen,
  });

  for (var i = 0; i < req.body.ArrayComponentes.length; i++) {
    var refDaComponentes = dataBase.ref("Ing_Tala/Areas/"+req.body.AreaM+"/"+req.body.NombreM+"/Componentes/"+req.body.ArrayComponentes[i].Tipo);

    var PushComponentes=refDaComponentes.push();

    PushComponentes.set({
      Tipo: req.body.ArrayComponentes[i].Tipo,
      Modelo:req.body.ArrayComponentes[i].Modelo_Componente,
      FechaInstalacion:req.body.ArrayComponentes[i].FechaI_Componente,
      EstadoPieza:req.body.ArrayComponentes[i].Estado_Componente,
      CorrienteComponente:req.body.ArrayComponentes[i].Corriente_Componente,
    });

  }


}
);

app.post('/Subir_Mantenimiento', function (req, res) {


    var refDaComponentes = dataBase.ref("Ing_Tala/Areas/"+req.body.Area+"/"+req.body.Maquina+"/Mantenimientos");

    var PushComponentes=refDaComponentes.push();

    PushComponentes.set({
      TipoMantenimiento: req.body.TipoMan,
      Costo:req.body.Costo,
      Encargado:req.body.Encargado,
      Tiempo:req.body.Tiempo,
      Remplazo:req.body.Remplazo,
      Nueva:req.body.Nueva,
      Area:req.body.Area,
      Maquina:req.body.Maquina,
    });




}
);



app.post('/AreasDisponibles', function (req, res) {

  var ArrayAux=[];
  let self=this;
  var refDB=dataBase.ref("Ing_Tala/Areas/");
  var promise=new Promise(
    function(resolve,reject){
        refDB.on('value', snapshot=> {
          if(snapshot.exists()){
            snapshot.forEach(function(child){
            resolve(ArrayAux = ArrayAux.concat(child.key))
            })
          }
          else{
            console.log('hello');
            resolve();
          }
        });

      })
      promise.then(
        function(){

          res.send({Areas:ArrayAux});

        }
      )
});
app.post('/MaquinasDisponibles', function (req, res) {

  var ArrayAux=[];
  let self=this;
  var refDB=dataBase.ref("Ing_Tala/Areas/"+req.body.AreaID);
  var promise=new Promise(
    function(resolve,reject){
        refDB.on('value', snapshot=> {
          if(snapshot.exists()){
            snapshot.forEach(function(child){
            resolve(ArrayAux = ArrayAux.concat(child.key))
            })
          }
          else{
            console.log('hello');
            resolve();
          }
        });

      })
      promise.then(
        function(){

          res.send({MaquinasPorArea:ArrayAux});

        }
      )
});





app.listen(4000, function(){
  console.log('Server en el puerto 4000');
})
