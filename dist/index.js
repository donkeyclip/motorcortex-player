"use strict";

var MotorCortex = require("@kissmybutton/motorcortex");

var TestPluginDefinition = require("./testPlugin/main");

var Player = require("../src/Player");

var TestPlugin = MotorCortex.loadPlugin(TestPluginDefinition); // Configure clip

var config = {
  css: "\n    #one {\n      font-size:40px;\n      text-align:center;\n      font-family: \"Century Gothic\", CenturyGothic, AppleGothic, sans-serif;\n      color:#4b475f;\n      \n    }\n    .container {\n      background-color:black;\n      display:flex;\n      justify-content:center;\n      align-items:center;\n      height: 100%;\n      background-color:#292929;\n      border:2px solid black;\n    }\n  ",
  html: "<div class=\"container\">\n    <div id=\"one\" class=\"element\">Motorcortex Player-Test Plugin</div>\n  </div>",
  host: document.getElementById("clip"),
  containerParams: {
    width: "70%",
    height: "100%"
  }
};
var AudioClip = new MotorCortex.AudioClip({
  audioSources: [{
    src: './Tchaikovsky_Rococo_Var_orch.mp3',
    id: 'classic',
    classes: ['classic'],
    base64: false
  }],
  id: 'audioClip'
});
var Playback = new MotorCortex.AudioPlayback({}, {
  selector: '#classic',
  duration: 15000,
  startFrom: 1200,
  id: 'playback-classic'
});
AudioClip.addIncident(Playback, 1000); // Create clip

var clip = new MotorCortex.Clip(config);
clip.addIncident(AudioClip, 0);
var animation_1 = new TestPlugin.TestIncident({
  animatedAttrs: {
    left: 800,
    opacity: 0
  }
}, {
  id: "animation_1",
  selector: "#one",
  duration: 60000
});
var animation_2 = new TestPlugin.TestIncident({
  animatedAttrs: {
    left: 800,
    opacity: 0
  }
}, {
  id: "animation_2",
  selector: "#one",
  duration: 60000
});
var animation_3 = new TestPlugin.TestIncident({
  animatedAttrs: {
    left: 800,
    opacity: 0
  }
}, {
  id: "animation_3",
  selector: "#one",
  duration: 60000
});
clip.addIncident(animation_1, 0);
clip.addIncident(animation_2, 60000);
clip.addIncident(animation_3, 120000);
window.clip = clip; // Add clip to timer

new Player({
  clip: clip,
  theme: "transparent",
  preview: false,
  showVolume: true,
  speedValues: [8, 3, "d", -4, -2, -1, "dd", -0.5, 0, 0.5, 1, 2, 4, 32, -32, 1.2],
  buttons: {
    donkeyclip: false
  }
});