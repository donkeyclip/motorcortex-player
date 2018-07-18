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
      font-size:40px;
      width: 100%;
    }
    #two {
      background: #7fdbff;
      height: 64px;
      font-size:30px;
      width: 100%;
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
  { type: "fadeInDown" },
  { duration: 3000, selector: ".element" }
);

clip.addIncident(animate, 0);
