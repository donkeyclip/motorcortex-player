const MC = require("@kissmybutton/motorcortex");

class Channel extends MC.Channel {
  constructor(props) {
    super(props);
    this.textillateElements = [];
    this.textillateOldElements = [];
  }
}

module.exports = Channel;
