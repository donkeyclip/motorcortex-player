var MotorCortex = require("@kissmybutton/motorcortex");
var Textillate = require("./Textillate");

module.exports = {
  npm_name: "@kissmybutton/motorcortex-textillate",
  incidents: [
    {
      exportable: Textillate
    }
  ],
  channel: MotorCortex.Channel
};