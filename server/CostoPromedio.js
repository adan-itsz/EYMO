
function Costos(data) {
  var ArrayOrdenado=[];
  var Costos=0;
  var Cantidad=0;
  var count=0;
  var count2=0;
  var count3 =0;
  var count4 = 0;

  if (data != undefined) {
    for (var i = 0; i < data.length; i++) {     //for que recorre cada area
      count = Object.keys(data[i]).length ; // cantidad de maquinas
      for (var j = 0; j < count; j++) { //for de cada maquina
        var aux = Object.keys(data[i])[j];  //nombre de cada mquina
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
                    if (data[i][aux].Componentes[aux2][aux3].Mantenimientos != undefined) {
                      count4 = Object.keys(data[i][aux].Componentes[aux2][aux3].Mantenimientos).length; //cantidad de mantenimientos
                      for (var m = 0; m < count4; m++) {  //for de mantenimientos
                        if (Object.keys(data[i][aux].Componentes[aux2][aux3].Mantenimientos)[m] != undefined) {

                          var auxMto = Object.keys(data[i][aux].Componentes[aux2][aux3].Mantenimientos)[m]; //key de cada mto
                          var Mto = data[i][aux].Componentes[aux2][aux3].Mantenimientos[auxMto]; //mantenimiento
                          if(Mto.Costo){
                            var costo = parseInt(Mto.Costo);
                              Costos += costo;
                              Cantidad +=1;

                          }

                        }
                      }
                    }

                  } //if existe key (componente especifico)
                } //for cantidad de componentes especificos
              } //if componentes especificos
            } //for componentes (Luces,Roamientos, Motores)
          } //if maquina existe
        }//for cada maquina
      } //for area
    }  //if area existe
    var Aux = Costos/Cantidad;

    return(Aux);
}

  exports.Costos=Costos;
