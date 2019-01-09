var moment = require('moment');

function normalizar(data){

    var dataSet=[];
    var fechas=[];
    var count=0;
    var count2=0;
    var count3 =0;
    var count4 = 0;
    if (data != undefined) {
      for (var i = 0; i < data.length; i++) {     //for que recorre cada area
        count = Object.keys(data[i]).length ; // cantidad de maquinas
        for (var j = 0; j < count; j++) { //for de cada maquina
          if (Object.keys(data[i])[j] != undefined) {
            var aux = Object.keys(data[i])[j];  //nombre de cada mquina
              count2 = Object.keys(data[i][aux].Componentes).length ; //cantidad de componentes (Luces,Motores,Rodamientos)
              for (var k = 0; k < count2; k++) {      //for de componentes (Luces,Motores,Rodamientos)
                if (Object.keys(data[i][aux].Componentes)[k] != undefined) {
                  var aux2 = Object.keys(data[i][aux].Componentes)[k]; //nombre del componente (Luces,Motores,Rodamientos)
                  count3 = Object.keys(data[i][aux].Componentes[aux2]).length; //cantidad de componentes especificos
                  for (var l = 0; l < count3; l++) {  //cantidad de componentes especificos
                    if (Object.keys(data[i][aux].Componentes[aux2])[l] != undefined) {
                      var aux3 = Object.keys(data[i][aux].Componentes[aux2])[l];  //nombre (key) de el compoennete especifico
                      var Compo = data[i][aux].Componentes[aux2][aux3].FechaInstalacion;  //  path directo a fechaI de cada componente
                      count4 = Object.keys(data[i][aux].Componentes[aux2][aux3].Mantenimientos).length; //cantidad de mantenimientos
                      let FechaInstalacion=parseInt(Compo)/5000;// normalizacion para quedar en umbrel de 1
                      let ump; //ultimo mantenimiento preventivo
                      let umc;//ultimo mantenimiento correctivo
                      let area;
                      let maquina;
                      let componente;

                      for (var m = 0; m < count4; m++) {  //for de mantenimientos
                        if (Object.keys(data[i][aux].Componentes[aux2][aux3].Mantenimientos)[m] != undefined) {

                          var auxMto = Object.keys(data[i][aux].Componentes[aux2][aux3].Mantenimientos)[m]; //key de cada mto
                          var Mto = data[i][aux].Componentes[aux2][aux3].Mantenimientos[auxMto]; //mantenimiento
                          if(Mto.TipoMantenimiento=='Correctivo'){
                            umc=Mto.FechaDeSubida;
                          }
                          else if(Mto.TipoMantenimiento=='Preventivo'){
                            ump=Mto.FechaDeSubida;
                          }
                          maquina=Mto.Maquina;
                          area=parseInt(Mto.Area)/30;
                          componente=Mto.Componente;
                          fechas= contarDias(ump,umc);

                        }
                      }
                      dataSet.push({dsm:fechas.mc,duf:fechas.mp,fi:FechaInstalacion,area:area,nombreComponente:componente,maquina:maquina});
                    } //if existe key (componente especifico)
                  } //for cantidad de componentes especificos
                } //if componentes especificos
              } //for componentes (Luces,Roamientos, Motores)
            } //if maquina existe
          }//for cada maquina
        } //for area
      }  //if area existe
    return dataSet;
  }

  function contarDias(uMantPrev,uMantCorr){

    var d= new Date();
    var anio= d.getFullYear();
    var mes= d.getMonth()+1;
    var dia=d.getDate();
    var today= mes+'/'+dia+'/'+anio;
    var todayMoment=moment(today);
    let difMP= todayMoment.diff(uMantPrev,'days');
    let difMC=todayMoment.diff(uMantCorr,'days');
    return {mp:difMP/1000,mc:difMC/1000}
  }

  exports.normalizar=normalizar;
