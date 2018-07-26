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

// Add clip to timer
new MotorCortex.Timer({
  Incident: clip,
  width: document.getElementsByClassName("bar")[0].offsetWidth, // timer width must be .bar width minus #time-cursor width
  cursorWidth: 10
});

// Add Group to Clip

document.getElementById("apply").addEventListener("click", function() {
  // get the iframe
  // const iframe = document.getElementById("clip").firstChild.contentDocument;

  // create in animate
  const animateIn = new Textillate.Textillate(
    {
      type: document.getElementById("animation-type-in").value,
      splitType: document.getElementById("split-type").value
    },
    {
      duration: document.getElementById("duration-in").value - 0,
      selector: ".element"
    }
  );

  // create in animate
  const animateOut = new Textillate.Textillate(
    {
      type: document.getElementById("animation-type-out").value,
      splitType: document.getElementById("split-type").value
    },
    {
      duration: document.getElementById("duration-out").value - 0,
      selector: ".element"
    }
  );

  if (clip.incidents.length > 0) {
    clip.removeIncident(clip.incidents[1].id);
    clip.removeIncident(clip.incidents[0].id);
  }

  clip.addIncident(animateIn, 0);
  clip.addIncident(
    animateOut,
    document.getElementById("duration-in").value - 0
  );
  // clip.flashDOM();
});

function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent("on" + etype);
  } else {
    const evObj = document.createEvent("Events");
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
eventFire(document.getElementById("apply"), "click");
