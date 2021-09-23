import MC from "@donkeyclip/motorcortex";
import Definition from "./Plugin";
import Player from "../src/";
const Plugin = MC.loadPlugin(Definition);

const css = `
.test{
  position:relative;
  width:200px;
  height:100px;
  left:0px;
  top:40%;
  color:red;
  margin:auto;
  font-size:20px;
}
`;

const html = `
<div class="test">{{ initParams.test }} </div>`;

const host = document.getElementById("app");

const containerParams = {
  width: "612px",
  height: "800px",
};

const clip = new MC.HTMLClip({
  css,
  html,
  host,
  containerParams,
  initParams: {
    test: "hello world",
  },
});

const AnimateWidth = new Plugin.Test(
  {
    animatedAttrs: {
      left: 100,
    },
  },
  {
    selector: ".test",
    duration: 3000,
  }
);

clip.addIncident(AnimateWidth, 0);

window.player = new Player({
  clip,
  preview: false,
  showVolume: true,
  loop: true,
  theme: "yellow",
  visible: "always",
  // speed: 0.1,
  // autoPlay: true,
});
window.player.changeSettings({
  pointerEvents: true,
  overflow: "visible",
  outline: "1px dashed gray",
  visible: "normal",
});

// window.player.changeInitParams({window.player.})
// window.player.pcpause();
// window.player.play();
