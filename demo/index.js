import { HTMLClip, CSSEffect } from "@donkeyclip/motorcortex";
import Player from "../src";

const clip = new HTMLClip({
  css: `.test{ background:white;width:100%; height:100%; }`,
  html: `<div class="test"><div id="text">{{initParams.text}}</div></div>`,
  host: document.getElementById("root"),
  initParams: {
    text: "Hello! It's me, your player :)",
  },
  containerParams: {
    width: "612px",
    height: "800px",
  },
});

const AnimateWidth = new CSSEffect(
  {
    animatedAttrs: {
      padding: "200px",
      transform: {
        scaleX: 2,
        scaleY: 2,
      },
    },
  },
  {
    selector: "#text",
    duration: 15000,
  }
);

clip.addIncident(AnimateWidth, 0);

window.player = new Player({
  clip,
});
