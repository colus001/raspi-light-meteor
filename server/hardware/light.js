var ws281x = Meteor.npmRequire('rpi-ws281x-native');

var NUM_LEDS = 16;
var pixelData = new Uint32Array(NUM_LEDS);

Meteor.methods({
  light: function (options) {
    switch (options.mode) {
      case 'on':
        console.log('Light On');
        break;
      case 'off':
        console.log('Light Off');
        ws281x.reset();
        break;
      case 'rainbow':
        console.log('Rainbow');
        break;
      default:
        console.log('MATCH_NOT_FOUND');
        break;
    }
  }
});

function rainbow () {
  var offset = 0;
  setInterval(function () {
    for (var i = 0; i < NUM_LEDS; i++) {
      pixelData[i] = colorwheel((offset + i) % 256);
    }

    offset = (offset + 1) % 256;
    ws281x.render(pixelData);
  }, 1000 / 30);
}


try {
  ws281x.init(NUM_LEDS);

  // // ---- trap the SIGINT and reset before exit
  // process.on('SIGINT', function () {
  //   ws281x.reset();
  //   process.nextTick(function () { process.exit(0); });
  // });
  //
  //
  // // ---- animation-loop
  // var offset = 0;
  // setInterval(function () {
  //   for (var i = 0; i < NUM_LEDS; i++) {
  //     pixelData[i] = colorwheel((offset + i) % 256);
  //   }
  //
  //   offset = (offset + 1) % 256;
  //   ws281x.render(pixelData);
  // }, 1000 / 30);
  //
  // console.log('Press <ctrl>+C to exit.');
}
catch (err) {
  console.log('This app only works in raspberry pi 1 b and b+. Check your deivce.');
  console.log('If you have other problem see the error below');
  console.log('Error:', err);
}

// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colorwheel(pos) {
  pos = 255 - pos;
  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}
