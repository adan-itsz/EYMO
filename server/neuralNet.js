

const trainingData = [
  { input: { dsm:.150,duf:.201,fi:.12,area:.4}, output: [1] },
  { input: { dsm:.175,duf:.220,fi:.15,area:.4 }, output: [1] },
  { input: {dsm:.180,duf:.230,fi:.10,area:.4 }, output: [1] },
  { input: { dsm:.115,duf:.160,fi:.15,area:.4 }, output: [0] },
  { input: { dsm:.015,duf:.090,fi:.18,area:.4}, output: [0] },
  { input: { dsm:.155,duf:.230,fi:.18,area:.4}, output: [1] },
  { input: { dsm:.200,duf:.240,fi:.19,area:.4}, output: [1] },
  { input: { dsm:.154,duf:.290,fi:.11,area:.4}, output: [1] },
  { input: { dsm:.065,duf:.089,fi:.12,area:.4}, output: [0] },
  { input: { dsm:.255,duf:.330,fi:.25,area:.4}, output: [1] },
  { input: { dsm:.009,duf:.230,fi:.18,area:.4}, output: [1] },
  { input: { dsm:.155,duf:.230,fi:.18,area:.4}, output: [1] },
  { input: {dsm:.01,duf:.02,fi:.1992,area:.4},  output:[0] },
  { input:{dsm:.01,duf:.02,fi:.7992,area:.0333},output:[0]},
  { input:{dsm:.02,duf:.03,fi:.7992,area:.2333},output:[0]},
  { input:{dsm:.03,duf:.04,fi:.7996,area:.2},output:[0]},
  { input:{dsm:.04,duf:.05,fi:.8,area:.1},output:[0]},
  { input:{dsm:.5,duf:.6,fi:.8,area:.1},output:[0]},
  { input:{dsm:.6,duf:.7,fi:.8004,area:.1333},output:[0]},
  { input:{dsm:.7,duf:.8,fi:.8008,area:.1666},output:[0]},
  { input:{dsm:.8,duf:.9,fi:.8004,area:.2},output:[0]},
  { input:{dsm:.9,duf:.1,fi:.7992,area:.2333},output:[0]},
  { input:{dsm:.1,duf:.65,fi:.8,area:.1333},output:[0]},
  { input:{dsm:.65,duf:.7,fi:.8012,area:.2},output:[0]},
  { input:{dsm:.7,duf:.75,fi:.8016,area:.2333},output:[0]},
  { input:{dsm:.75,duf:.8,fi:.802,area:.233},output:[0]},
  { input:{dsm:.8,duf:.85,fi:.804,area:.2},output:[0]},
  { input:{dsm:.85,duf:.95,fi:.8044,area:.2333},output:[1]},
  { input:{dsm:.95,duf:.2,fi:.8048,area:.2},output:[1]},
  { input:{dsm:.2,duf:.21,fi:.8048,area:.2333},output:[1]},
  { input:{dsm:.21,duf:.22,fi:.8050,area:.2333},output:[1]},
];

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
