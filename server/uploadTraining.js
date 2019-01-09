
function uploadNewTraining(dataSet,banOutput,dataBase){
  var ref =dataBase.ref('Ing_Tala/TrainingSet');
  dataSet.forEach((it)=>{

    var referenciaPush=ref.push();
    referenciaPush.set({
      dsm:it.dsm,
      duf:it.duf,
      fi:it.fi,
      area:it.area,
      output:banOutput
    });
  })


}
  

function downloadTraining(dataBase,Normalizar,ArrayAux,Red,uploadNewTraining){
  console.log('entro a downoad');
  var ref =dataBase.ref('Ing_Tala/TrainingSet');
  let traningRes=[];
  var promise=new Promise(
      function(resolve,reject){
          ref.on('value', snapshot=> {
            if(snapshot.exists()){
              snapshot.forEach(function(child){
                
              resolve(traningRes = traningRes.concat({input:{dsm:child.val().dsm,duf:child.val().duf,
                fi:child.val().fi,area:child.val().area},output:[parseInt(child.val().output) ]}))
              })
            }
            else{
              resolve();
            }
          });

        })
  promise.then(
          function(){
           let dataSet= Normalizar.normalizar(ArrayAux);
           let prediccion= Red.Red(dataSet,traningRes);//.adicciones y .fallas
           uploadNewTraining.uploadNewTraining(prediccion.adicciones,0,dataBase);
            console.log(prediccion);
          }
        )


}



exports.uploadNewTraining=uploadNewTraining;
exports.downloadTraining=downloadTraining;