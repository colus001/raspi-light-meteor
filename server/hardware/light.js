var ws281x = Meteor.npmRequire('rpi-ws281x-native');
var NUM_LEDS = 16;
var neoPixel = null;

class Light {
  constructor (options) {
    this.numberOfLeds = options.numberOfLeds;
    this.pixelData = new Uint32Array(this.numberOfLeds);
    this.lightInterval = null;
  }

  setColors (colors) {
    var options = _.extend([0,0,0], [ colors.red, colors.green, colors.blue ]);

    for ( var i = 0; i < this.numberOfLeds; i++) {
      this.pixelData[i] = NeoPixelUtil.rgb2Int(options[0], options[1], options[2]);
    }
  }

  rainbow () {
    var offset = 0;

    if ( this.lightInterval ) {
      clearInterval(this.lightInterval)
    }

    var pixelData = this.pixelData;

    this.lightInterval = setInterval(function () {
      for (var i = 0; i < NUM_LEDS; i++) {
        pixelData[i] = NeoPixelUtil.colorwheel((offset + i) % 256);
      }

      offset = (offset + 1) % 256;
      ws281x.render(pixelData);
    }, 1000 / 30);
  }

  light () {
    console.log('Light On');
    ws281x.render(this.pixelData);
  }

  turnoff() {
    this.setColors(0,0,0);
    ws281x.render(this.pixelData);
    clearInterval(this.lightInterval);
  }
}

NeoPixelUtil = {
  colorwheel(pos) {
    pos = 255 - pos;
    if (pos < 85) { return this.rgb2Int(255 - pos * 3, 0, pos * 3); }
    else if (pos < 170) { pos -= 85; return this.rgb2Int(0, pos * 3, 255 - pos * 3); }
    else { pos -= 170; return this.rgb2Int(pos * 3, 255 - pos * 3, 0); }
  },
  rgb2Int(r, g, b) {
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
  }
}

Meteor.startup(function () {
  try {
    ws281x.init(NUM_LEDS);
    neoPixel = new Light({
      numberOfLeds: NUM_LEDS
    });
    console.log("Initialization completed.");
  }
  catch (err) {
    console.log('This app only works in raspberry pi 1 b and b+. Check your deivce.');
    console.log('If you have other problem see the error below');
    console.log('Error:', err);
  }
});

Meteor.methods({
  light (options) {
    switch (options.mode) {
      case 'on':
        neoPixel.light();
        break;
      case 'off':
        console.log('Light Off');
        neoPixel.turnoff();
        break;
      case 'rainbow':
        console.log('Rainbow');
        neoPixel.rainbow();
        break;
      default:
        console.log('MATCH_NOT_FOUND');
        break;
    }
  },

  setColors (colors) {
    neoPixel.setColors(colors);
  }
});
