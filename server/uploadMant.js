var Normalizar=require('./normalizacionNN.js');

function uploadMant(database,ruta){
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
                  resolve(datos=datos.concat({fechaMantenimiento:snapChild.val(),
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
           datos.forEach((it)=>{
              area=parseInt(it.area)/30;
              fi=parseInt(it.area)/5000;
              if(it.tipo=="Preventivo"){
                umPreventivo=it.fechaMantenimiento;
              }
              else if(it.tipo=="Correctivo"){
                umCorrectivo=it.fechaMantenimiento;
              }
           })
           
           var mantenimientosFechas=contarDias.contarDias(umPreventivo,umCorrectivo);
           return {dsm:mantenimientosFechas.mp,duf:mantenimientosFechas.mc,area:area,fi:fi}
          }
        )


}



exports.uploadMant=uploadMant;
