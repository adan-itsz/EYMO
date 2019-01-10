var Normalizar=require('./normalizacionNN.js');

function uploadMant(dataBase,ruta){
  var uploadNewTraining= require('./uploadTraining.js');
  var contarDias=require('./normalizacionNN.js');
  console.log('entro a downoad');
  var ref =dataBase.ref(ruta);
  let datos=[];
  var instalacion;
  var promise=new Promise(
      function(resolve,reject){
          ref.on('value', snapshot=> {
            if(snapshot.exists()){
              snapshot.forEach(function(child){
                instalacion=child.val().FechaInstalacion;
                child.forEach(function(snapChild){
                  resolve(datos=datos.concat({fechaMantenimiento:snapChild.val().FechaDeSubida,
                    area:snapChild.val().Area,fInstalacion:instalacion,tipo:snapChild.val().TipoMantenimiento }))
                })
            })
            }
            else{
              resolve();
            }
          });

        })
  promise.then(
          function(){
           let umCorrectivo;
           let umPreventivo;
           let area;
           let fi;
           datos.forEach((it,idx,array)=>{
            if(idx===array.length-1){

            }
            else{
              area=parseInt(it.area)/30;
              fi=parseInt(it.area)/5000;
              if(it.tipo=="Preventivo"){
                umPreventivo=it.fechaMantenimiento;
              }
              else if(it.tipo=="Correctivo"){
                umCorrectivo=it.fechaMantenimiento;
              }
            }
            
           })
           
           var mantenimientosFechas=contarDias.contarDias(umPreventivo,umCorrectivo);
           let NewData1=[];
           NewData1.push({dsm:mantenimientosFechas.mp.toString().substr(1),duf:mantenimientosFechas.mc.toString().substr(1),area:area.toString().substr(1),fi:fi.toString().substr(1)});
           uploadNewTraining.uploadNewTraining(NewData1,1,dataBase);
          }
        )


}



exports.uploadMant=uploadMant;
