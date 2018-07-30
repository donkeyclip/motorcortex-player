const MotorCortex = require("./node_modules/@kissmybutton/motorcortex");
const TestPluginDefinition = require("./testPlugin/main");
const Player = require("../src/Player");

const TestPlugin = MotorCortex.loadPlugin(TestPluginDefinition);

// Configure clip
const config = {
  css: `
    #one {
      font-size:40px;
      display: table-cell;
      vertical-align: middle;
      text-align:center;
      font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif;
      color:#4b475f;
      
    }
    .container {
      display: table;
      position: absolute;
      height: 100%;
      width: 80%;
      background-color:#292929;
      margin-left:10%;
      border:2px solid black;
    }
  `,
  html: `<div class="container">
    <div id="one" class="element">MotorCortex\n Textillate-Plugin</div>
  </div>`,
  host: document.getElementById("clip"),
  containerParams: {
    width: "100%",
    height: "100%"
  }
};

// Create clip
const clip = new MotorCortex.Clip(null, config);
const animation_1 = new TestPlugin.TestIncident(
  {
    animatedAttrs: {
      left: 800,
      opacity: 0
    }
  },
  {
    id: "animation_1",
    selector: "#one",
    duration: 10000
  }
);

clip.addIncident(animation_1, 0);

// Add clip to timer
new Player({ clip });
