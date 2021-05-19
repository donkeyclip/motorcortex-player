import {
  mousedown,
  mousemove,
  mouseup,
  touchend,
  touchmove,
  touchstart,
} from "./listeners/events";

import SVG from "./assets/svg.js";
export function el(selector) {
  return document.querySelectorAll(selector);
}
export function elid(id) {
  return document.getElementById(id);
}
export function elFirstClass(player, className) {
  return player.getElementsByClassName(className)[0];
}
export function eltag(tag) {
  return document.getElementsByTagName(tag);
}
export function elcreate(tag) {
  return document.createElement(tag);
}
export function addListener() {
  return document.addEventListener(...arguments);
}
export function removeListener() {
  return document.removeEventListener(...arguments);
}

function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

const numberPartRegexp = new RegExp(
  "^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)",
  "gi"
);

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
  let widthAnalysed, heightAnalysed;

  if (Object.prototype.hasOwnProperty.call(containerParams, "width")) {
    widthAnalysed = calculateDimension(containerParams.width);
  }

  if (Object.prototype.hasOwnProperty.call(containerParams, "height")) {
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
  if (widthAnalysed !== null) {
    let clipWidth = widthAnalysed.number * finalScale;
    if (widthAnalysed.unit !== "px") {
      clipWidth *= platoDims.width / 100;
    }

    const blankSpace = platoDims.width - clipWidth;
    position.left = blankSpace / 2;
  }

  if (widthAnalysed !== null) {
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
  document.addEventListener(mouseup, callbackForUp, false);
  document.addEventListener(touchend, callbackForUp, false);
  document.addEventListener(mousemove, callbackForMove, false);
  document.addEventListener(touchmove, callbackForMove, false);
}

export function removeMouseUpAndMoveListeners(callbackForUp, callbackForMove) {
  document.removeEventListener(mouseup, callbackForUp, false);
  document.removeEventListener(touchend, callbackForUp, false);
  document.removeEventListener(mousemove, callbackForMove, false);
  document.removeEventListener(touchmove, callbackForMove, false);
}

export function addStartListeners(
  callback,
  element = document,
  passive = false
) {
  element.addEventListener(mousedown, callback, { passive }, false);
  element.addEventListener(touchstart, callback, { passive }, false);
}

export function removeStartListeners(callback, element = document) {
  element.removeEventListener(mousedown, callback, false);
  element.removeEventListener(touchstart, callback, false);
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
  playerElements.loopButton.innerHTML = SVG["loop"];
  playerElements.volumeBtn.innerHTML = SVG["volume-on"];
  playerElements.statusButton.innerHTML = SVG["play"];
  playerElements.settingsButton.innerHTML = SVG["settings"];
  playerElements.donkeyclipButton.innerHTML = SVG["donkeyclip-logo"];
  playerElements.fullScreenButton.innerHTML = SVG["expand-full"];
  playerElements.fullScreenButton.innerHTML = SVG["expand-full"];
  playerElements.speedButtonShow.innerHTML = SVG["angle-right"];
  playerElements.speedButtonHide.innerHTML = SVG["angle-left"];
}
