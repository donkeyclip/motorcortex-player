import { HTMLClip, CSSEffect } from "@donkeyclip/motorcortex";
import Player from "../src";

const clip = new HTMLClip({
  css: `
  .test{
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    background:white;
  }

  `,
  html: `<div class="test"><div id="text">{{initParams.text}}</div></div>`,
  host: document.getElementById("root"),
  initParams: {
    text: "Hello! It's me, your player :)",
  },
  initParamsValidationRules: {
    text: "string",
  },
  containerParams: {
    width: "612px",
    height: "800px",
  },
});

const AnimateWidth = new CSSEffect(
  {
    animatedAttrs: {
      transform: {
        scale: 2,
      },
    },
  },
  {
    selector: "#text",
    duration: 2000,
  }
);

clip.addIncident(AnimateWidth, 0);

window.player = new Player({
  clip,
  showVolume: true,
  buttons: {
    donkeyclip: true,
  },
});
