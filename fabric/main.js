var canvas = new fabric.Canvas('canvas');
var rect = new fabric.Rect({
  top: 100,
  left: 100,
  width: 500,
  height: 500,
  fill: 'red'
});
canvas.add(rect);

// var fabric = require('../bower_components/fabric/dist/').fabric,
//     canvas = fabric.createCanvasForNode(200, 200);

// canvas.add(new fabric.Rect({
//   top: 100,
//   left: 100,
//   width: 100,
//   height: 50,
//   angle: 30,
//   fill: 'rgba(255,0,0,0.5)'
// }));

// var out = require('fs').createWriteStream(__dirname + '/rectangle.png'),
//     stream = canvas.createPNGStream();

// stream.on('data', function(chunk) {
//   out.write(chunk);
// });