import MC from "@kissmybutton/motorcortex";
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
  color:white;
  margin:auto;
  font-size:20px;
}
`;

const html = `
<div class="test">Hello World</div>`;

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
  preview: true,
  showVolume: true,
});
