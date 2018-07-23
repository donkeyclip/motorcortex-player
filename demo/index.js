const MotorCortex = require("../node_modules/@kissmybutton/motorcortex");
const TextillateDefinition = require("../src/main");

// console.log(TextillateDefinition);

// Load Anime plugin
const Textillate = MotorCortex.loadPlugin(TextillateDefinition);

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
      width: 100%;
    }
  `,
  html: `<div class="container">
    <div id="one" class="element">MotorCortex\n Textillate-Plugin</div>
  </div>`,
  host: document.getElementById("clip"),
  containerParams: {
    width: "400px",
    height: "400px"
  }
};

// Create clip
const clip = new MotorCortex.Clip(null, config);

// Add clip to timer
new MotorCortex.Timer({
  Incident: clip,
  width: 290, // timer width must be .bar width minus #time-cursor width
  cursorWidth: 10
});

// Add Group to Clip

document.getElementById("animate").addEventListener("click", function() {
  const iframe = document.getElementById("clip").firstChild.contentDocument;
  iframe.getElementsByClassName(
    "element"
  )[0].innerHTML = iframe
    .getElementsByClassName("element")[0]
    .getAttribute("aria-label");
  const animate = new Textillate.Textillate(
    {
      type: document.getElementById("animation-type").value,
      splitType: document.getElementById("split-type").value
    },
    { duration: 3000, selector: ".element" }
  );
  clip.removeIncident(clip.incidents[0].id);
  clip.addIncident(animate, 0);
  clip.flashDOM();
});
// Create an Animate effect
const animate = new Textillate.Textillate(
  {
    type: document.getElementById("animation-type").value,
    splitType: document.getElementById("split-type").value
  },
  { duration: 3000, selector: ".element" }
);

clip.addIncident(animate, 0);
