import { TimeCapsule } from "@donkeyclip/motorcortex";
import SVG from "./assets/svg.js";
import {
  mousedown,
  mousemove,
  mouseup,
  touchend,
  touchmove,
  touchstart,
} from "./listeners/events";

export const timeCapsule = new TimeCapsule();

export const el = document.querySelectorAll.bind(document);
export const elid = document.getElementById.bind(document);
export function elFirstClass(player, className) {
  return player.getElementsByClassName(className)[0];
}
export const eltag = document.getElementsByTagName.bind(document);
export const elcreate = document.createElement.bind(document);

export const addListener = document.addEventListener.bind(document);
export function addListenerWithElement(element, ...rest) {
  return element.addEventListener(...rest);
}
export function removeListenerWithElement(element, ...rest) {
  return element.removeEventListener(...rest);
}

export const removeListener = document.removeEventListener.bind(document);
export function sanitizeCSS(css) {
  return css.replace(/(behaviour|javascript|expression)/gm, "");
}
function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

const numberPartRegexp = /^[+-]?(\d+([.]\d*)?|[.]\d+)/gi;

function calculateDimension(dimensionToMatch) {
  const widthNumberPart = dimensionToMatch.match(numberPartRegexp)[0];
  const widthUnitPart = dimensionToMatch.substring(widthNumberPart.length);

  if (
    isNumber(Number(widthNumberPart)) &&
    (widthUnitPart !== "%" || widthUnitPart !== "px")
  ) {
    return {
      number: Number(widthNumberPart),
      unit: widthUnitPart,
    };
  }
}

export function calcClipScale(containerParams, platoDims, cover = false) {
  if (!containerParams) {
    return {
      scale: 1,
      position: {},
    };
  }

  let widthAnalysed, heightAnalysed;
  if (containerParams.width) {
    widthAnalysed = calculateDimension(containerParams.width);
  }

  if (containerParams.height) {
    heightAnalysed = calculateDimension(containerParams.height);
  }

  // the only case the Clip needs to be scaled is when any of the two axis of the Clip
  // is defined in pixels and the value of it is greater than the available space of
  // the plato
  let scaleDifWidth = 1,
    scaleDifHeight = 1;
  if (
    widthAnalysed?.unit === "px" &&
    widthAnalysed.number !== platoDims.width
  ) {
    scaleDifWidth = platoDims.width / widthAnalysed.number;
  }

  if (
    heightAnalysed?.unit === "px" &&
    heightAnalysed.number !== platoDims.height
  ) {
    scaleDifHeight = platoDims.height / heightAnalysed.number;
  }

  const boundaryToUse = cover
    ? scaleDifHeight > scaleDifWidth
    : scaleDifHeight <= scaleDifWidth;

  const finalScale = boundaryToUse ? scaleDifHeight : scaleDifWidth;

  const position = {};
  if (widthAnalysed != null) {
    let clipWidth = widthAnalysed.number * finalScale;
    if (widthAnalysed.unit !== "px") {
      clipWidth *= platoDims.width / 100;
    }

    const blankSpace = platoDims.width - clipWidth;
    position.left = blankSpace / 2;
  }

  if (heightAnalysed != null) {
    let clipHeight = heightAnalysed.number * finalScale;
    if (heightAnalysed.unit !== "px") {
      clipHeight *= platoDims.height / 100;
    }

    const blankSpace = platoDims.height - clipHeight;
    position.top = blankSpace / 2;
  }

  return {
    scale: finalScale,
    position: position,
  };
}

export function createUID() {
  let dt = new Date().getTime();
  return "xxxxxxxx-xxxx".replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    const rand = Math.random() > 0.5;
    const str = (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    return rand ? str.toUpperCase() : str;
  });
}

// FIXME: This is a super unreliable way of testing, we need to update this
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function addMouseUpAndMoveListeners(callbackForUp, callbackForMove) {
  addListener(mouseup, callbackForUp, false);
  addListener(touchend, callbackForUp, false);
  addListener(mousemove, callbackForMove, false);
  addListener(touchmove, callbackForMove, false);
}

export function removeMouseUpAndMoveListeners(callbackForUp, callbackForMove) {
  removeListener(mouseup, callbackForUp, false);
  removeListener(touchend, callbackForUp, false);
  removeListener(mousemove, callbackForMove, false);
  removeListener(touchmove, callbackForMove, false);
}

export function addStartListeners(
  callback,
  element = document,
  passive = false
) {
  addListenerWithElement(element, mousedown, callback, { passive });
  addListenerWithElement(element, touchstart, callback, { passive });
}

export function removeStartListeners(callback, element = document) {
  removeListenerWithElement(element, callback, false);
  removeListenerWithElement(element, touchstart, callback, false);
}

export function changeIcon(element, from, to) {
  if (from) {
    element.classList.remove(`icon-${from}`);
    element.innerHTML = "";
  }
  if (to) {
    element.classList.add(`icon-${to}`);
    element.innerHTML = SVG[to];
  }
}

export function initializeIcons(playerElements) {
  playerElements.loopButton.innerHTML = SVG.loop;
  playerElements.volumeBtn.innerHTML = SVG["volume-on"];
  playerElements.statusButton.innerHTML = SVG.play;
  playerElements.settingsButton.innerHTML = SVG.settings;
  playerElements.donkeyclipButton.innerHTML = SVG["donkeyclip-logo"];
  playerElements.fullScreenButton.innerHTML = SVG["expand-full"];
  playerElements.speedButtonShow.innerHTML = SVG["angle-right"];
  playerElements.speedButtonHide.innerHTML = SVG["angle-left"];
}
export function sortFunc(a, b) {
  return a - b;
}
export function initializeOptions(options, _this) {
  options.id ??= Date.now();
  options.showVolume ??= !!Object.keys(options.clip?.audioClip?.children || [])
    .length;
  options.showIndicator ??= false;
  options.theme ??= "transparent";
  options.host ??= options.clip.props.host;
  options.buttons ??= {};
  options.timeFormat ??= "ss";
  options.backgroundColor ??= "black";
  options.fullscreen ??= false;
  options.scaleToFit ??= true;
  options.sectionsEasing ??= "easeOutQuart";
  options.pointerEvents ??= false;
  options.scrollAnimation ??= false;
  options.onMillisecondChange ??= null;
  options.speedValues ??= [-1, 0, 0.5, 1, 2];
  options.speed ??= 1;
  options.muted ??= false;
  options.maxScrollStorage ??= 50;
  options.controls ??= true;
  options.loop ??= false;
  options.volume ??= 1;
  options.currentScript ??= null;

  if (options.millisecond) {
    const clip = _this.clip;
    if (options.millisecond > clip.duration)
      options.millisecond = clip.duration;
    if (options.millisecond < 0 || !isFinite(options.millisecond))
      options.millisecond = 0;

    createJourney(options.millisecond, _this);
  }
  // remove strings
  for (const i in options.speedValues) {
    if (!isFinite(options.speedValues[i])) {
      options.speedValues.splice(i, 1);
    }
  }

  options.speedValues.sort(sortFunc);
  return options;
}

export function createJourney(millisecond, _this, { before, after } = {}) {
  const clip = _this.clip;
  setTimeout(() => {
    if (!clip.id) return;
    if (before) clip[before]();
    _this.settings.journey = timeCapsule.startJourney(clip);
    _this.settings.journey.station(millisecond);
    _this.settings.journey.destination();
    if (after) clip[after]();
  }, 0);
}
