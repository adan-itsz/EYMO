

function Red(dataSet,training){
const  brain  = require('brain.js');
const TrainingSet=require('./trainingSet.js');
let posiblesFallas=[];
let adiccionesDataTraning=[];
const net = new brain.NeuralNetwork({hiddenLayers: [4,4]});
console.log('antes de entrenamiento');
net.train(training,
  {  errorThresh: 0.005,  // error threshold to reach before completion
    learningRate: 0.3    // learning rate
});

// agregar loop que recorra el dataset y correr cada item
dataSet.forEach((it)=>{

  let prediccion=parseFloat(net.run(it));
  if(prediccion>.88){
    posiblesFallas.push(it);
  }
  else{
    adiccionesDataTraning.push(it);
  }

})
  return {fallas:posiblesFallas,adicciones:adiccionesDataTraning};
}




exports.Red=Red;
