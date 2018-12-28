const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var admin = require("firebase-admin");
const Multer = require('multer');
const format = require('util').format;

var serviceAccount = require("./eymo-91ecd-firebase-adminsdk-jw962-76b11e34f9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eymo-91ecd.firebaseio.com",
  storageBucket: "eymo-91ecd.appspot.com"
});

var dataBase = admin.database();
var Auth = admin.auth();
var bucket = admin.storage().bucket("eymo-91ecd.appspot.com");
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


const multer = Multer({
    dest:"Areas/"
});

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
                   var obt = babychild.val();
                    var lucesObj1 = babychild.val().Componentes.Luces;
                    var IndicadorObj1 = babychild.val().Componentes.Indicador_VF;
                    var MotoresObj1 = babychild.val().Componentes.Motores;
                    var RodamientosObj1 = babychild.val().Componentes.Rodamientos;

                    if(lucesObj1){
                      Object.keys(lucesObj1).forEach(function(key){
                        var lucesObj = lucesObj1[key].Mantenimientos;
                        if(lucesObj){
                        Object.keys(lucesObj).forEach(function(key){
                        resolve(ArrayAux = ArrayAux.concat([{
                          key:key,
                          Tipo:lucesObj[key].Tipo,
                          ObjetivoMtoPreventivo:lucesObj[key].ObjetivoMtoPreventivo,
                          ObjetivoMtoCorrectivo:lucesObj[key].ObjetivoMtoCorrectivo,
                          Componente:lucesObj[key].Componente,
                          TipoMan:lucesObj[key].TipoMan,
                          TipoMantenimiento:lucesObj[key].TipoMantenimiento,
                          Costo:lucesObj[key].Costo,
                          Encargado:lucesObj[key].Encargado,
                          UidEncargado:lucesObj[key].UidEncargado,
                          Tiempo:lucesObj[key].Tiempo,
                          Nueva:lucesObj[key].Nueva,
                          Area:lucesObj[key].Area,
                          Maquina:lucesObj[key].Maquina,
                          MetodoMto:lucesObj[key].MetodoMto,
                          FechaDeSubida:lucesObj[key].FechaDeSubida,
                        }]))
                      })
                    }
                    })

                    }
                    if(IndicadorObj1){
                    Object.keys(IndicadorObj1).forEach(function(key){
                      var IndicadorObj=IndicadorObj1[key].Mantenimientos
                      if (IndicadorObj) {

                      Object.keys(IndicadorObj).forEach(function(key){
                          resolve(ArrayAux = ArrayAux.concat([{
                              key:key,
                              Tipo:IndicadorObj[key].Tipo,
                              ObjetivoMtoPreventivo:IndicadorObj[key].ObjetivoMtoPreventivo,
                              ObjetivoMtoCorrectivo:IndicadorObj[key].ObjetivoMtoCorrectivo,
                              Componente:IndicadorObj[key].Componente,
                              TipoMan:IndicadorObj[key].TipoMan,
                              TipoMantenimiento:IndicadorObj[key].TipoMantenimiento,
                              Costo:IndicadorObj[key].Costo,
                              Encargado:IndicadorObj[key].Encargado,
                              UidEncargado:IndicadorObj[key].UidEncargado,
                              Tiempo:IndicadorObj[key].Tiempo,
                              Nueva:IndicadorObj[key].Nueva,
                              Area:IndicadorObj[key].Area,
                              Maquina:IndicadorObj[key].Maquina,
                              MetodoMto:IndicadorObj[key].MetodoMto,
                              FechaDeSubida:IndicadorObj[key].FechaDeSubida,
                        }]))
                       })
                     }
                      })
                    }
                    if(MotoresObj1){
                      Object.keys(MotoresObj1).forEach(function(key){
                        var MotoresObj = MotoresObj1[key].Mantenimientos;
                        if (MotoresObj) {
                        Object.keys(MotoresObj).forEach(function(key){
                        resolve(ArrayAux = ArrayAux.concat([{
                          key:key,
                          Tipo:MotoresObj[key].Tipo,
                          ObjetivoMtoPreventivo:MotoresObj[key].ObjetivoMtoPreventivo,
                          ObjetivoMtoCorrectivo:MotoresObj[key].ObjetivoMtoCorrectivo,
                          Componente:MotoresObj[key].Componente,
                          TipoMan:MotoresObj[key].TipoMan,
                          TipoMantenimiento:MotoresObj[key].TipoMantenimiento,
                          Costo:MotoresObj[key].Costo,
                          Encargado:MotoresObj[key].Encargado,
                          UidEncargado:MotoresObj[key].UidEncargado,
                          Tiempo:MotoresObj[key].Tiempo,
                          Nueva:MotoresObj[key].Nueva,
                          Area:MotoresObj[key].Area,
                          Maquina:MotoresObj[key].Maquina,
                          MetodoMto:MotoresObj[key].MetodoMto,
                          FechaDeSubida:MotoresObj[key].FechaDeSubida,
                        }]))
                      })
                    }
                      })
                    }
                    if(RodamientosObj1){
                      Object.keys(RodamientosObj1).forEach(function(key){
                        var RodamientosObj= RodamientosObj1[key].Mantenimientos;
                        if (RodamientosObj) {
                        Object.keys(RodamientosObj).forEach(function(key){
                        resolve(ArrayAux = ArrayAux.concat([{
                          key:key,
                          Tipo:RodamientosObj[key].Tipo,
                          ObjetivoMtoPreventivo:RodamientosObj[key].ObjetivoMtoPreventivo,
                          ObjetivoMtoCorrectivo:RodamientosObj[key].ObjetivoMtoCorrectivo,
                          Componente:RodamientosObj[key].Componente,
                          TipoMan:RodamientosObj[key].TipoMan,
                          TipoMantenimiento:RodamientosObj[key].TipoMantenimiento,
                          Costo:RodamientosObj[key].Costo,
                          Encargado:RodamientosObj[key].Encargado,
                          UidEncargado:RodamientosObj[key].UidEncargado,
                          Tiempo:RodamientosObj[key].Tiempo,
                          Nueva:RodamientosObj[key].Nueva,
                          Area:RodamientosObj[key].Area,
                          Maquina:RodamientosObj[key].Maquina,
                          MetodoMto:RodamientosObj[key].MetodoMto,
                          FechaDeSubida:RodamientosObj[key].FechaDeSubida,
                        }]))
                      })
                    }
                    })
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

            res.send({Mantenimientos:ArrayAux});

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




app.post('/Subir_ImagenMaquina',multer.single("file"), function (req, res) {
/*
  console.log("Upload Imagennes");
  let url = "";
  let file= req.file;
  if (file) {
  uploadImageToStorage(file,file.name).then((success) => {
    url = success;
    res.status(200).send(url);
  }).catch((error) => {
    console.error(error);
  });
}

*/

  }
);

app.post('/Subir_MaquinaNueva', function (req, res) {


var refDa = dataBase.ref("Ing_Tala/Areas/"+req.body.AreaM+"/"+req.body.NombreM);
refDa.set({
  Nombre:req.body.NombreM,
  Area:req.body.AreaM,
  Marca:req.body.MarcaM,
  AnoInstalacion:req.body.AnoInstalacionM,
  Corriente:req.body.CorrienteM,
  Imagen:req.body.Imagen,
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
var UidEncargado = "";

admin.auth().createUser({
  email: req.body.CorreoA,
  password:req.body.PassA,
  displayName:req.body.NombreA,
})
  .then(function(user) {
    // See the UserRecord reference doc for the contents of userRecord.
    UidEncargado = user.uid;
    var refDaComponentes = dataBase.ref("Ing_Tala/Agentes/"+UidEncargado);

    refDaComponentes.set({
      email: req.body.CorreoA,
      displayName:req.body.NombreA,
      Area:req.body.AreaA,
      Profesion:req.body.ProfesionA,
      Edad:req.body.EdadA,

    });
    res.send("ok");

  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });


}
);


app.post('/Subir_Mantenimiento', function (req, res) {


    var refDaComponentes = dataBase.ref("Ing_Tala/Areas/"+req.body.Area+"/"+req.body.Maquina+"/Componentes/"+req.body.Componente+"/Mantenimientos");

    var PushComponentes=refDaComponentes.push();
    PushComponentes.set({
      ObjetivoMtoPreventivo:req.body.ObjetivoMtoPreventivo,
      ObjetivoMtoCorrectivo:req.body.ObjetivoMtoCorrectivo,
      Componente:req.body.Componente,
      TipoMan:req.body.TipoMan,
      TipoMantenimiento: req.body.TipoMan,
      Costo:req.body.Costo,
      Encargado:req.body.Encargado,
      UidEncargado: req.body.UidEncargado,
      Tiempo:req.body.Tiempo,
      Nueva:req.body.Nueva,
      Area:req.body.Area,
      Maquina:req.body.Maquina,
      MetodoMto:req.body.MetodoMto,
      FechaDeSubida : req.body.FechaDeSubida,
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

app.post('/AgentesDisponibles', function (req, res) {

  var ArrayAux=[];
  let self=this;
  var refDB=dataBase.ref("Ing_Tala/Agentes/");
  var promise=new Promise(
    function(resolve,reject){
        refDB.on('value', snapshot=> {
          if(snapshot.exists()){
            snapshot.forEach(function(child){
              resolve(ArrayAux = ArrayAux.concat([{Area:child.val().Area, Edad:child.val().Edad, Profesion:child.val().Profesion, displayName:child.val().displayName, email : child.val().email}]))
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

          res.send({Agentes:ArrayAux});

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
