const MC = require("@kissmybutton/motorcortex");
// const MCAnimate = require("@kissmybutton/motorcortex-animate");
// const charming = require("charming");

class Textillate extends MC.Group {
  onGetContext() {
    // console.log(this);
    return true;
  }

  getScratchValue() {
    return true;
  }

  onProgress() {
    return true;
  }
}

module.exports = Textillate;
