"use strict";

const MC = require("@kissmybutton/motorcortex");
const Textillate = require("./Textillate");

module.exports = {
  npm_name: "@kissmybutton/motorcortex-textillate",
  incidents: [
    {
      exportable: Textillate
    }
  ],
  channel: MC.Channel
};
