module.exports = {
  el: selector => document.querySelectorAll(selector),
  elid: id => document.getElementById(id),
  eltag: tag => document.getElementsByTagName(tag),
  elcreate: tag => document.createElement(tag),
  addListener: function() {
    return document.addEventListener(...arguments);
  },
  removeListener: function() {
    return document.removeEventListener(...arguments);
  },
  calcClipScale: (containerParams, platoDims) => {
    function isNumber(value) {
      return typeof value === "number" && isFinite(value);
    }
    const numberPartRegexp = new RegExp(
      "^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)",
      "gi"
    );
    let widthAnalysed = null,
      heightAnalysed = null;

    if (Object.prototype.hasOwnProperty.call(containerParams, "width")) {
      const widthNumberPart = containerParams.width.match(numberPartRegexp)[0];
      const widthUnitPart = containerParams.width.substring(
        widthNumberPart.length
      );
      if (
        !isNumber(Number(widthNumberPart)) ||
        (widthUnitPart !== "%" && widthUnitPart !== "px")
      ) {
        widthAnalysed = null;
      } else {
        widthAnalysed = {
          number: Number(widthNumberPart),
          unit: widthUnitPart
        };
      }
    }
    if (Object.prototype.hasOwnProperty.call(containerParams, "height")) {
      const heightNumberPart = containerParams.height.match(
        numberPartRegexp
      )[0];
      const heightUnitPart = containerParams.height.substring(
        heightNumberPart.length
      );
      if (
        !isNumber(Number(heightNumberPart)) ||
        (heightUnitPart !== "%" && heightUnitPart !== "px")
      ) {
        heightAnalysed = null;
      } else {
        heightAnalysed = {
          number: Number(heightNumberPart),
          unit: heightUnitPart
        };
      }
    }
    // the only case the Clip needs to be scaled is when any of the two axis of the Clip
    // is defined in pixels and the value of it is greater than the available space of
    // the plato
    let scaleDifWidth = 1,
      scaleDifHeight = 1;
    if (widthAnalysed !== null) {
      if (widthAnalysed.unit === "px") {
        if (widthAnalysed.number > platoDims.width) {
          scaleDifWidth = platoDims.width / widthAnalysed.number;
        }
      }
    }
    if (heightAnalysed !== null) {
      if (heightAnalysed.unit === "px") {
        if (heightAnalysed.number > platoDims.height) {
          scaleDifHeight = platoDims.height / heightAnalysed.number;
        }
      }
    }
    let finalScale = 1;
    scaleDifHeight <= scaleDifWidth
      ? (finalScale = scaleDifHeight)
      : (finalScale = scaleDifWidth);
    const position = {};
    if (widthAnalysed !== null) {
      let clipWidth;
      if (widthAnalysed.unit === "px") {
        clipWidth = widthAnalysed.number * finalScale;
      } else {
        clipWidth = (widthAnalysed.number / 100) * platoDims.width * finalScale;
      }
      const blankSpace = platoDims.width - clipWidth;
      position.left = blankSpace / 2;
    }
    if (widthAnalysed !== null) {
      let clipHeight;
      if (heightAnalysed.unit === "px") {
        clipHeight = heightAnalysed.number * finalScale;
      } else {
        clipHeight =
          (heightAnalysed.number / 100) * platoDims.height * finalScale;
      }
      const blankSpace = platoDims.height - clipHeight;
      position.top = blankSpace / 2;
    }
    return {
      scale: finalScale,
      position: position
    };
  },
  createUID: () => {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx".replace(/[xy]/g, function(c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      const rand = Math.random() > 0.5;
      const str = (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      return rand ? str.toUpperCase() : str;
    });
    return uuid;
  }
};
