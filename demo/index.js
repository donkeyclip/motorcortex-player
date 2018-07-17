const MotorCortex = require("@kissmybutton/motorcortex");
const TextillateDefinition = require("../src/main");

// console.log(TextillateDefinition);

// Load Anime plugin
const Textillate = MotorCortex.loadPlugin(TextillateDefinition);

// Configure clip
const config = {
  css: `
    .element {
      background: #7fdbff;
      height: 64px;
      left: 41.25%;
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
  html: `<div class="container"><div class="element">I am an element</div></div>`,
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
  width: 294 // timer width must be .bar width minus #time-cursor width
});

// Create a Group
const group = new MotorCortex.Group();

// Add Group to Clip
clip.addIncident(group, 0);

// Create an Animate effect
const animate = new Textillate.Textillate(
  { type: "rotateOut" },
  { duration: 10000, selector: ".element" }
);

// Test Animate plugin
group.addIncident(animate, 0);
