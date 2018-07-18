const MotorCortex = require("../node_modules/@kissmybutton/motorcortex");
const TextillateDefinition = require("../src/main");

// console.log(TextillateDefinition);

// Load Anime plugin
const Textillate = MotorCortex.loadPlugin(TextillateDefinition);

// Configure clip
const config = {
  css: `
    #one {
      background: #7fdbff;
      height: 64px;
      left: 41.25%;
      position: absolute;
      top: 41.25%;
      width: 64px;
    }
    #two {
      background: #7fdbff;
      height: 64px;
      left: 20.25%;
      position: absolute;
      top: 41.25%;
      width: 64px;
    }
    .container {
      height: 384px;
      position: relative;
      width: 384px;
    }
  `,
  html: `<div class="container">
    <div id="one" class="element">I am an element</div>
    <div id="two" class="element">I am an element</div>
  </div>`,
  host: document.getElementById("clip"),
  containerParams: {
    width: "384px",
    height: "384px"
  }
};

// Create clip
const clip = new MotorCortex.Clip(null, config);

// Add clip to timer
new MotorCortex.Timer({
  Incident: clip,
  width: 980 // timer width must be .bar width minus #time-cursor width
});

// Add Group to Clip

// Create an Animate effect
const animate = new Textillate.Textillate(
  { type: "fadeInLeftBig" },
  { duration: 3000, selector: ".element" }
);

clip.addIncident(animate, 0);
