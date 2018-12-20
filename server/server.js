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
var Auth = admin.auth();
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




app.post('/ConsultaAnalitics', function (req, res) {

  var ArrayAux=[];
  let self=this;
  var refDB=dataBase.ref("Ing_Tala/Areas/");
  var promise=new Promise(
    function(resolve,reject){
        refDB.on('value', snapshot=> {
          if(snapshot.exists()){
            snapshot.forEach(function(child){
            resolve(ArrayAux = ArrayAux.concat(child.val()))
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

        var a = obtenerMaquinas(ArrayAux);
        var b = obtenerComponentes(ArrayAux);
        var c =  obtenerAreas(ArrayAux);
        var d =  obtenerMantenimientos(ArrayAux);


          res.send({TotalMaquinas:a, TotalComponentes:b,TotalAreas:c,TotalMantenimientos:d});

        }
      )


  });


function  obtenerMaquinas(data){
    var count=0;
    for (var i = 0; i < data.length; i++) {
     count += Object.keys(data[i]).length ;
    }
    return(count);
  }
function  obtenerComponentes(data){
    var count=0;
    var count2=0;
    for (var i = 0; i < data.length; i++) {
     count = Object.keys(data[i]).length ;
     for (var j = 0; j < count; j++) {
       var aux = Object.keys(data[i])[j];
         count2 += Object.keys(data[i][aux].Componentes).length ;
     }
    }
    return(count2);
  }
function  obtenerMantenimientos(data){
    var count=0;
    var count2=0;
    for (var i = 0; i < data.length; i++) {
     count = Object.keys(data[i]).length ;
     for (var j = 0; j < count; j++) {
       var aux = Object.keys(data[i])[j];
       if (data[i][aux].Mantenimientos) {

       count2 += Object.keys(data[i][aux].Mantenimientos).length ;
        }

     }

    }
    return(count2);
  }
function  obtenerAreas(data){
    return(data.length);
  }


  app.post('/CompoMaquina', function (req, res) {

    var ArrayAux=[];
    let self=this;
    var refDB=dataBase.ref("Ing_Tala/Areas/"+req.body.Area+"/"+req.body.Maquina);
    var promise=new Promise(
      function(resolve,reject){
          refDB.on('value', snapshot=> {
            if(snapshot.exists()){
                resolve(ArrayAux = ArrayAux.concat([{Componentes:snapshot.val().Componentes}]))
            }
            else{
              console.log('hello');
              resolve();
            }
          });
        })
        promise.then(
          function(){

            res.send({ComponentesPorMaquina:ArrayAux});

          }
        )


    });



    app.post('/Subir_Componente', function (req, res) {


        var refDaComponentes = dataBase.ref("Ing_Tala/Areas/"+req.body.Area+"/"+req.body.Maquina+"/Componentes/"+req.body.Tipo);

        var PushComponentes=refDaComponentes.push();

        PushComponentes.set({
          Tipo: req.body.Tipo,
          Modelo:req.body.Modelo_Componente,
          FechaInstalacion:req.body.FechaI_Componente,
          EstadoPieza:req.body.Estado_Componente,
          CorrienteComponente:req.body.Corriente_Componente,

        });
        res.send("Datos subidos exitosamente");

    }
    );
    app.post('/Eliminar_Componente', function (req, res) {


        var refDaComponentes = dataBase.ref("Ing_Tala/Areas/"+req.body.Area+"/"+req.body.Maquina+"/Componentes/"+req.body.Tipo);

      refDaComponentes.child(req.body.key).remove();

        res.send("Datos eliminados exitosamente");

    }
    );

app.post('/MtoMaquina', function (req, res) {

  var ArrayAux=[];
  let self=this;
  var refDB=dataBase.ref("Ing_Tala/Areas/"+req.body.Area+"/"+req.body.Maquina+"/Mantenimientos");
  var promise=new Promise(
    function(resolve,reject){
        refDB.on('value', snapshot=> {
          if(snapshot.exists()){
            snapshot.forEach(function(snapchild){
              resolve(ArrayAux = ArrayAux.concat([{key:snapchild.key,Area:snapchild.val().Area,Costo:snapchild.val().Costo,Encargado:snapchild.val().Encargado,Maquina:snapchild.val().Maquina,Nueva:snapchild.val().Nueva,Remplazo:snapchild.val().Remplazo,Tiempo:snapchild.val().Tiempo,TipoMantenimiento:snapchild.val().TipoMantenimiento}]))
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
          console.log("Mantenimientos"+ArrayAux);
          res.send({MantenimientosPorMaquina:ArrayAux});

        }
      )


  });

  app.post('/TomarHistorial', function (req, res) {

    var ArrayAux=[];
    let self=this;
    var refDB=dataBase.ref("Ing_Tala/Areas/");
    var promise=new Promise(
      function(resolve,reject){
          refDB.on('value', snapshot=> {
            if(snapshot.exists()){
              snapshot.forEach(function(snapchild){
                if(snapchild.exists()){
                snapchild.forEach(function(babychild){
                    if(babychild.val().Mantenimientos){
                    resolve(ArrayAux = ArrayAux.concat([{Mantenimientos:babychild.val().Mantenimientos}]))
                    }
                  })
                  }
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

              var output = Object.keys(snap.Mantenimientos).map(function(key) {

              Arr.push({key: key, data: snap.Mantenimientos[key]})     ;
              })

            });

            res.send({Mantenimientos:Arr});

          }
        )


    });

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
                console.log("Cada hijo"+child.val().AnoInstalacion);
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

              Arr.push(ARCom)     ;


            });

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

    res.send("Subido exitoso");


  }
);


app.post('/Subir_Agente', function (req, res) {

  Auth.createUser({
    email: req.body.CorreoA,
    password:req.body.PassA,
    displayName:req.body.NombreA,
  })

    var refDaComponentes = dataBase.ref("Ing_Tala/");

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
