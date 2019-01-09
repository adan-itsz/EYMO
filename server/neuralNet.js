

function Red(dataSet){
const  brain  = require('brain.js');
const TrainingSet=require('./trainingSet.js');
let posiblesFallas=[];
let adiccionesDataTraning=[];
const net = new brain.NeuralNetwork({hiddenLayers: [4,4]});
console.log('antes de entrenamiento');
net.train(TrainingSet.TrainingSet,
  {  errorThresh: 0.005,  // error threshold to reach before completion
    learningRate: 0.3    // learning rate
});

// agregar loop que recorra el dataset y correr cada item
let prediccion=parseFloat(net.run({dsm:.132,duf:.190,fi:.7996,area:.2}));
if(prediccion>.85){
  //posiblesFallas.push(item del dataset);
}
return (prediccion);
}




exports.Red=Red;
