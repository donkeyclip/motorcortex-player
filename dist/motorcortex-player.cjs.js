'use strict';

var motorcortex = require('@kissmybutton/motorcortex');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var motorcortex__default = /*#__PURE__*/_interopDefaultLegacy(motorcortex);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var helpers = {
  el: function el(selector) {
    return document.querySelectorAll(selector);
  },
  elid: function elid(id) {
    return document.getElementById(id);
  },
  eltag: function eltag(tag) {
    return document.getElementsByTagName(tag);
  },
  elcreate: function elcreate(tag) {
    return document.createElement(tag);
  },
  addListener: function addListener() {
    var _document;

    return (_document = document).addEventListener.apply(_document, arguments);
  },
  removeListener: function removeListener() {
    var _document2;

    return (_document2 = document).removeEventListener.apply(_document2, arguments);
  },
  calcClipScale: function calcClipScale(containerParams, platoDims) {
    function isNumber(value) {
      return typeof value === "number" && isFinite(value);
    }

    var numberPartRegexp = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)", "gi");
    var widthAnalysed = null,
        heightAnalysed = null;

    if (Object.prototype.hasOwnProperty.call(containerParams, "width")) {
      var widthNumberPart = containerParams.width.match(numberPartRegexp)[0];
      var widthUnitPart = containerParams.width.substring(widthNumberPart.length);

      if (!isNumber(Number(widthNumberPart)) || widthUnitPart !== "%" && widthUnitPart !== "px") {
        widthAnalysed = null;
      } else {
        widthAnalysed = {
          number: Number(widthNumberPart),
          unit: widthUnitPart
        };
      }
    }

    if (Object.prototype.hasOwnProperty.call(containerParams, "height")) {
      var heightNumberPart = containerParams.height.match(numberPartRegexp)[0];
      var heightUnitPart = containerParams.height.substring(heightNumberPart.length);

      if (!isNumber(Number(heightNumberPart)) || heightUnitPart !== "%" && heightUnitPart !== "px") {
        heightAnalysed = null;
      } else {
        heightAnalysed = {
          number: Number(heightNumberPart),
          unit: heightUnitPart
        };
      }
    } // the only case the Clip needs to be scaled is when any of the two axis of the Clip
    // is defined in pixels and the value of it is greater than the available space of
    // the plato


    var scaleDifWidth = 1,
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

    var finalScale = 1;
    scaleDifHeight <= scaleDifWidth ? finalScale = scaleDifHeight : finalScale = scaleDifWidth;
    var position = {};

    if (widthAnalysed !== null) {
      var clipWidth;

      if (widthAnalysed.unit === "px") {
        clipWidth = widthAnalysed.number * finalScale;
      } else {
        clipWidth = widthAnalysed.number / 100 * platoDims.width * finalScale;
      }

      var blankSpace = platoDims.width - clipWidth;
      position.left = blankSpace / 2;
    }

    if (widthAnalysed !== null) {
      var clipHeight;

      if (heightAnalysed.unit === "px") {
        clipHeight = heightAnalysed.number * finalScale;
      } else {
        clipHeight = heightAnalysed.number / 100 * platoDims.height * finalScale;
      }

      var _blankSpace = platoDims.height - clipHeight;

      position.top = _blankSpace / 2;
    }

    return {
      scale: finalScale,
      position: position
    };
  },
  createUID: function createUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx".replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      var rand = Math.random() > 0.5;
      var str = (c == "x" ? r : r & 0x3 | 0x8).toString(16);
      return rand ? str.toUpperCase() : str;
    });
    return uuid;
  }
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var svg_1 = createCommonjsModule(function (module) {
  var svg = module.exports = {};
  svg.playSVG = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"20\" viewBox=\"0 0 18 20\">\n    <path fill=\"#999\" fill-rule=\"nonzero\" d=\"M16.224 8.515L2.582.245A1.7 1.7 0 0 0 0 1.702V18.24a1.7 1.7 0 0 0 2.582 1.455l13.642-8.27a1.7 1.7 0 0 0 0-2.91z\"/>\n</svg>\n\n";
  svg.dcSVG = "\n  <svg class=\"svg\" style=\"transform:scale(0.55)\" version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\"\n width=\"1705.000000pt\" height=\"1903.000000pt\" viewBox=\"0 0 1705.000000 1903.000000\"\n preserveAspectRatio=\"xMidYMid meet\">\n<metadata>\nCreated by potrace 1.15, written by Peter Selinger 2001-2017\n</metadata>\n<g transform=\"translate(0.000000,1903.000000) scale(0.100000,-0.100000)\"\nfill=\"#000000\" stroke=\"none\">\n<path d=\"M0 9515 l0 -9515 1583 0 1582 0 4430 4655 c2437 2561 4457 4687 4490\n4726 33 38 1164 1227 2513 2642 l2452 2572 0 2192 c0 1206 -2 2193 -4 2193 -3\n0 -1597 -1652 -3542 -3671 l-3538 -3671 -31 35 c-16 20 -1497 1683 -3290 3696\nl-3260 3661 -1692 0 -1693 0 0 -9515z m5504 2412 c1253 -1413 2279 -2574 2282\n-2580 3 -9 -3274 -3438 -4597 -4811 -5 -6 -9 1968 -9 4999 l0 5010 24 -25 c13\n-14 1048 -1181 2300 -2593z\"/>\n<path d=\"M13924 7584 c-34 -17 -2029 -2158 -2029 -2178 0 -15 5121 -5400 5141\n-5404 12 -3 14 295 14 2241 l0 2245 -1478 1543 c-813 849 -1490 1550 -1505\n1557 -38 16 -105 15 -143 -4z\"/>\n</g>\n</svg>\n";
  svg.pauseSVG = "\n  <svg class=\"svg\" style=\"transform:scale(1.5)\" width=\"100%\" height=\"100%\" viewBox=\"0 0 36 36\" >\n    <path id=\"pause-icon\" data-state=\"playing\" d=\"M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26\" />\n  </svg>\n";
  svg.replaySVG = "\n  <svg class=\"svg\" width=\"100%\" height=\"100%\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 1000 1000\" enable-background=\"new 0 0 1000 1000\" xml:space=\"preserve\">\n    <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>\n    <g><g transform=\"translate(0.000000,511.000000) scale(0.100000,-0.100000)\">\n      <path d=\"M5356.3,4203.8c-1247.8-153.1-2324.2-811.3-3000.7-1839.7c-379.4-578.2-596.5-1209-660.5-1933.4l-27.4-294.8H883.9c-431.9,0-783.9-6.9-783.9-18.3c0-9.2,477.6-493.7,1062.7-1078.7l1062.7-1062.7L3288.1-961.1C3873.1-376,4350.8,108.5,4350.8,117.6c0,11.4-356.5,18.3-790.7,18.3h-793l18.3,189.7C2831,876.3,2991,1338,3288.1,1779.1C4122.3,3026.9,5706,3472.5,7065.8,2841.8C7639.4,2578.9,8197,2035,8487.3,1461.4C8581,1274,8709,896.9,8754.7,666.1c48-246.8,54.8-811.3,9.1-1055.8C8567.3-1491.3,7788-2394,6720.7-2750.5c-315.4-107.4-541.6-139.4-941.6-139.4c-287.9,0-415.9,11.4-598.8,50.3c-523.3,112-973.6,335.9-1371.2,681c-75.4,68.6-148.5,123.4-160,123.4c-9.1,0-187.4-169.1-393.1-374.8c-434.2-434.2-420.5-363.4-105.1-628.5c852.4-710.7,1972.3-1055.8,3046.4-937c1627.2,176,2977.8,1257,3489.8,2790.4c457.1,1368.9,169.1,2843-777,3969.7C8322.7,3484,7417.8,4000.4,6503.6,4160.4C6197.4,4213,5619.2,4235.8,5356.3,4203.8z\"/>\n      <path d=\"M4990.7,124.5c0-1503.8,4.6-1794,32-1778c16,9.1,505.1,413.6,1085.6,895.8C7113.8,78.8,7161.8,122.2,7122.9,161c-80,75.4-2109.4,1757.5-2120.8,1757.5C4995.3,1918.5,4990.7,1111.8,4990.7,124.5z\"/>\n    </g></g>\n  </svg>\n";
  svg.volumeSVG = "\n  <svg class=\"svg\" width=\"100%\" height=\"100%\" version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n   viewBox=\"0 0 286.374 286.374\" enable-background=\"new 0 0 286.374 286.374\" xml:space=\"preserve\">\n    <g id=\"Volume_2\">\n      <path style=\"fill-rule:evenodd;clip-rule:evenodd;\" d=\"M233.636,26.767l-33.372,28.5c25.659,21.07,42.006,52.616,42.006,87.92\n        c0,35.305-16.347,66.851-42.006,87.921l33.372,28.499c32.324-28.869,52.738-70.268,52.738-116.421\n        C286.374,97.034,265.96,55.635,233.636,26.767z M177.737,74.513l-34.69,29.64c15.14,6.818,27.19,21.681,27.19,39.034\n        s-12.05,32.216-27.19,39.034l34.69,29.64c21.294-15.717,36.051-40.586,36.051-68.674C213.788,115.099,199.03,90.23,177.737,74.513z\n         M108.672,48.317L44.746,98.441H17.898C4.671,98.441,0,103.268,0,116.34v53.695c0,13.072,4.951,17.898,17.898,17.898h26.848\n        l63.926,50.068c7.668,4.948,16.558,6.505,16.558-7.365V55.683C125.23,41.813,116.34,43.37,108.672,48.317z\"/>\n    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>\n  </svg>\n";
  svg.volumeMuteSVG = "\n  <svg class=\"svg\" width=\"100%\" height=\"100%\" version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n   viewBox=\"0 0 286.277 286.277\" enable-background=\"new 0 0 286.277 286.277\" xml:space=\"preserve\">\n    <g id=\"Volume_none\">\n      <path style=\"fill-rule:evenodd;clip-rule:evenodd;\" d=\"M245.102,143.151l36.98-37.071c5.593-5.605,5.593-14.681,0-20.284\n        l-10.124-10.142c-5.593-5.604-14.655-5.604-20.247,0l-36.98,37.071l-36.977-37.043c-5.594-5.603-14.654-5.603-20.247,0\n        l-10.124,10.143c-5.594,5.603-5.594,14.679,0,20.282l36.987,37.053l-36.961,37.051c-5.591,5.604-5.591,14.681,0,20.284\n        l10.126,10.141c5.593,5.604,14.654,5.604,20.247,0l36.96-37.05l36.97,37.035c5.592,5.605,14.654,5.605,20.247,0l10.124-10.141\n        c5.593-5.603,5.593-14.68,0-20.282L245.102,143.151z M108.674,48.296L44.747,98.42H17.9c-13.228,0-17.899,4.826-17.899,17.898\n        L0,142.719l0.001,27.295c0,13.072,4.951,17.898,17.899,17.898h26.847l63.927,50.068c7.667,4.948,16.557,6.505,16.557-7.365V55.662\n        C125.23,41.792,116.341,43.349,108.674,48.296z\"/>\n    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>\n  </svg>\n";
  svg.settingsSVG = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19\" height=\"19\" viewBox=\"0 0 19 19\">\n    <path fill=\"#999\" fill-rule=\"nonzero\" d=\"M17.812 7.52h-1.474a7.09 7.09 0 0 0-.604-1.456l1.043-1.042a1.187 1.187 0 0 0 0-1.68l-1.12-1.118a1.188 1.188 0 0 0-1.68 0l-1.043 1.042a7.05 7.05 0 0 0-1.455-.604V1.188C11.48.531 10.948 0 10.292 0H8.708c-.656 0-1.187.532-1.187 1.188v1.474a7.1 7.1 0 0 0-1.456.604L5.022 2.224a1.187 1.187 0 0 0-1.68 0l-1.12 1.12a1.188 1.188 0 0 0 0 1.68l1.044 1.042c-.256.46-.458.949-.604 1.455H1.188C.531 7.52 0 8.052 0 8.708v1.584c0 .656.532 1.187 1.188 1.187h1.474c.146.507.348.995.604 1.456L2.22 13.979a1.188 1.188 0 0 0 0 1.68l1.12 1.119a1.223 1.223 0 0 0 1.68 0l1.043-1.043c.462.255.95.458 1.457.605v1.472c0 .656.531 1.188 1.187 1.188h1.584c.656 0 1.187-.532 1.187-1.188V16.34c.506-.147.995-.35 1.456-.604l1.043 1.043a1.188 1.188 0 0 0 1.68 0l1.119-1.12a1.187 1.187 0 0 0 0-1.679l-1.043-1.043c.256-.461.458-.95.604-1.456h1.474A1.188 1.188 0 0 0 19 10.29V8.709c0-.656-.532-1.187-1.188-1.187zM9.5 13.459a3.958 3.958 0 1 1 0-7.916 3.958 3.958 0 0 1 0 7.916z\"/>\n</svg>\n\n";
  svg.arrowRightSVG = "\n  <svg class=\"svg arrow\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"100%\" height=\"100%\" viewBox=\"0 0 50 80\" xml:space=\"preserve\">\n    <polyline fill=\"none\" stroke-width=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"0.375,0.375 45.63,38.087 0.375,75.8 \"/>\n  </svg>\n";
  svg.arrowLeftSVG = "\n  <svg class=\"svg arrow\" class=\"svg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 50 80\" xml:space=\"preserve\">\n    <polyline fill=\"none\" stroke-width=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"45.63,75.8 0.375,38.087 45.63,0.375 \"/>\n  </svg> \n";
  svg.fullScreenSVG = "\n <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19\" height=\"19\" viewBox=\"0 0 19 19\">\n    <g fill=\"#999\" fill-rule=\"nonzero\">\n        <path d=\"M18.802 1.942A1.746 1.746 0 0 0 17.06.2h-4.537a.99.99 0 1 0 0 1.98h4.102c.11 0 .198.088.198.197v2.588a.99.99 0 1 0 1.98 0V1.942zM.198 4.965a.99.99 0 0 0 1.98 0v-2.59a.198.198 0 0 1 .197-.199h4.102a.99.99 0 0 0 0-1.979H1.944C.983.2.204.978.202 1.94L.198 4.965zM18.802 17.056v-3.023a.99.99 0 1 0-1.98 0v2.592c0 .11-.088.198-.197.198h-4.102a.99.99 0 1 0 0 1.98h4.533c.964-.001 1.746-.783 1.746-1.747zM.198 17.056a1.746 1.746 0 0 0 1.746 1.742h4.533a.99.99 0 1 0 0-1.979H2.375a.198.198 0 0 1-.198-.194v-2.592a.99.99 0 1 0-1.98 0v3.023z\"/>\n        <rect width=\"10.651\" height=\"6.117\" x=\"4.174\" y=\"6.441\" rx=\"1.954\"/>\n    </g>\n</svg>\n\n";
  svg.loopSVG = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"22\" viewBox=\"0 0 24 22\">\n    <g fill=\"#999\" fill-rule=\"nonzero\">\n        <path d=\"M16.773 15.476H16.3a1.25 1.25 0 0 0 0 2.5h.478a6.944 6.944 0 0 0 .98-13.823.251.251 0 0 1-.208-.246V1.93A1.25 1.25 0 0 0 15.584.906l-4.778 3.341a1.25 1.25 0 0 0 .717 2.274h4.764c2.829 0 4.963 1.925 4.963 4.478a4.482 4.482 0 0 1-4.477 4.477zM6.247 17.845c.12.02.208.124.208.246v1.976a1.249 1.249 0 0 0 1.966 1.024l4.773-3.34a1.251 1.251 0 0 0-.717-2.275H7.713c-2.829 0-4.963-1.925-4.963-4.476a4.482 4.482 0 0 1 4.477-4.479h.478a1.25 1.25 0 1 0 0-2.5h-.478a6.945 6.945 0 0 0-.98 13.824z\"/>\n    </g>\n</svg>\n";
  svg.loadingSVG = "<svg class=\"lds-spinner\" width=\"200px\"  height=\"200px\"  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" style=\"background: none;\"><g transform=\"rotate(0 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.9166666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(30 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.8333333333333334s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(60 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(90 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(120 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5833333333333334s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(150 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(180 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.4166666666666667s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(210 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(240 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.25s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(270 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.16666666666666666s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(300 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.08333333333333333s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g><g transform=\"rotate(330 50 50)\">\n  <rect x=\"47\" y=\"24\" rx=\"9.4\" ry=\"4.8\" width=\"6\" height=\"12\" fill=\"#999\">\n    <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"0s\" repeatCount=\"indefinite\"></animate>\n  </rect>\n</g></svg>";
});

var config = {
  // the players start name
  name: "mc-player",

  // set the players total name
  set playerName(name) {
    this.name += "-" + name;
  }

};

var style = function style(theme, name, options) {
  return "\n#".concat(name, ", #").concat(name, " *{\n  font-family:'Ubuntu' !important;\n}\n#").concat(name, " .background {\n  background-color: ").concat(options.backgroundColor, ";\n  width:100%;\n  height:").concat(theme["background-height"], ";;\n  position:absolute;\n  top:0px;\n  left:0px;\n  z-index:-2000;\n}\n\n#").concat(name, " .full-screen #").concat(name, "-controls {\n  position:fixed;\n  left:0px;\n  bottom:0px;\n}\n\n#").concat(name, " .full-screen #").concat(name, "-settings-panel {\n  position:fixed;\n  bottom: 45px;\n}\n\n#").concat(name, " .svg, .svg *,svg, svg *  {\n  fill: ").concat(theme["svg-color"], ";\n}\n\n#").concat(name, " .svg.arrow {\n  stroke: ").concat(theme["svg-color"], ";\n}\n\n#").concat(name, " .pointer-event-panel {\n  height: ").concat(theme["pointer-event-panel-height"], ";\n  display:flex;\n  align-items:center;\n  justify-content:center;\n}\n#").concat(name, "-pointer-event-panel{\n  width:100%;\n  position:absolute;\n  z-index:100;\n}\n#").concat(name, "-listener-helper{\n  width:100%;\n  height:calc( 100% - 45px );\n  position:absolute;\n  z-index:110;\n}\n#").concat(name, " .svg-selected svg{\n  fill: ").concat(theme["svg-selected-color"], ";\n  stroke: ").concat(theme["svg-selected-color"], ";\n}\n#").concat(name, "-hover-display{\n    border: ").concat(theme["preview-border"], ";\n    display: flex;\n    visibility:hidden;\n    opacity:0;\n    overflow:hidden;\n    background-color: black;\n    position: absolute;\n    bottom: 14px;\n    left: 0px;\n    align-items: flex-end;\n    justify-content: center;\n}\n\n#").concat(name, "-hover-millisecond {\n  background-color: ").concat(theme["hms-background-color"], ";\n  padding:3px;\n  height:18px;\n  margin:0px;\n  line-height:12px;\n  font-size:10px;\n  text-align: center;\n  min-width:20px;\n  max-width:100px;\n  z-index:2;\n}\n#").concat(name, ",\n#").concat(name, " ::before,\n#").concat(name, " :::after,\n#").concat(name, " div,\n#").concat(name, " p,\n#").concat(name, " span,\n#").concat(name, " ul,\n#").concat(name, " li {\n  font-weight: 400;\n  line-height: 1.9 !important;\n  color: ").concat(theme["color"], ";\n  font-family: \"Century Gothic\", CenturyGothic, AppleGothic, sans-serif;\n  box-sizing:border-box;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n#").concat(name, " {\n  line-height: 1.9;\n  font-size: 12px;\n  overflow:hidden;\n  height: calc(100% + ").concat(theme["controls-position"], ");\n  width:100%;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  color: ").concat(theme["color"], ";\n  pointer-events:auto !important;\n}\n\n#").concat(name, " .force-show-controls {\n  opacity:1 !important;\n}\n\n").concat(!options.theme.includes("position-bottom") ? "#".concat(name, ":hover #").concat(name, "-controls {\n  opacity:1 !important;\n}\n") : "\n    #".concat(name, "-controls {\n      opacity:1 !important;\n    }\n    "), "\n\n#").concat(name, ":hover {\n  pointer-events:none;\n}\n\n#").concat(name, "-settings-speed-hide {\n  text-align:right;\n}\n\n#").concat(name, " .grad {\n  background-image: linear-gradient(\n    rgba(0,0,0,00.01),\n    rgba(0,0,0,00.02),\n    rgba(0,0,0,00.03),\n    rgba(0,0,0,0.04),\n    rgba(0,0,0,0.05),\n    rgba(0,0,0,0.06),\n    rgba(0,0,0,0.07),\n    rgba(0,0,0,0.08),\n    rgba(0,0,0,0.09),\n    rgba(0,0,0,0.1),\n    rgba(0,0,0,0.15),\n    rgba(0,0,0,0.2),\n    rgba(0,0,0,0.25),\n    rgba(0,0,0,0.3),\n    rgba(0,0,0,0.35),\n    rgba(0,0,0,0.4),\n    rgba(0,0,0,0.45),\n    rgba(0,0,0,0.5),\n    rgba(0,0,0,0.55),\n    rgba(0,0,0,0.6),\n    rgba(0,0,0,0.65),\n    rgba(0,0,0,0.7),\n    rgba(0,0,0,0.75),\n    rgba(0,0,0,0.8),\n    rgba(0,0,0,0.88)\n  );\n  position:absolute;\n  width:100%;\n  height:").concat(theme["grad-height"], ";\n  left:0px;\n  bottom:0px;\n  z-index:-1;\n}\n\n#").concat(name, " #").concat(name, "-controls {\n  touch-action: none;\n  background-color: ").concat(theme["background-color"], ";\n  border: ").concat(theme["controls-border"], ";\n  position: absolute;\n  bottom: ").concat(theme["controls-bottom"], ";\n  left: 0px;\n  width: 100%;\n  z-index:100;\n  height: 44px;\n  opacity:0;\n  display:flex;\n  border-radius: 6px;\n  align-items:center;\n  -webkit-transition: opacity 0.2s ease;\n  -moz-transition: opacity 0.2s ease;\n  transition: opacity 0.2s ease;\n}\n\n#").concat(name, " #").concat(name, "-totalbar {\n  width: calc(100% - 20px);\n  height: 5px;\n  margin: 0px 10px 0px 10px;\n  background-color: ").concat(theme["totalbar-color"], ";\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n\n#").concat(name, " #").concat(name, "-loopbar {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  top: 0px;\n  left: 0px;\n  background-color: ").concat(theme["loopbar-color"], ";\n}\n\n#").concat(name, " .").concat(name, "-loop-boundaries::before {\n  ").concat(theme["loopbar-boundaries-style::before"], "\n\n}\n#").concat(name, " .").concat(name, "-loop-boundaries {\n  transform:translate(-50%,-37%);\n  position:absolute;\n  width:18px;\n  background-color:").concat(theme["loopbar-boundaries-color"], ";\n  height:18px;\n  border-radius:10px;\n  z-index:40;\n  ").concat(theme["loopbar-boundaries-style"], "\n}\n\n#").concat(name, " .").concat(name, "-loop-boundaries::after {\n  ").concat(theme["loopbar-boundaries-style::after"], "\n\n}\n\n#").concat(name, " #").concat(name, "-helperbar {\n  position: absolute;\n  height: 20px;\n  top: -10px;\n  left: 0px;\n  right: 0px;\n  z-index:2;\n}\n\n#").concat(name, " #").concat(name, "-runningbar {\n  position: relative;\n  width: 0px;\n  max-width:100%;\n  height: 100%;\n  background-color: ").concat(theme["runningbar-color"], ";\n}\n\n#").concat(name, " #").concat(name, "-cursor {\n  transform:translate(50%,-36%);\n  right: 0px;\n  overflow:hidden;\n  top: 0px;\n  width: 0px;\n  height: 0px;\n  position: absolute;\n  background-color: ").concat(theme["cursor-color"], ";\n  border-radius: 10px;\n  z-index: 5;\n}\n\n#").concat(name, " #").concat(name, "-cursor::before {\n  ").concat(theme["cursor-style::before"], "\n}\n\n#").concat(name, " #").concat(name, "-cursor::after {\n  ").concat(theme["cursor-style::after"], "\n}\n\n#").concat(name, " #").concat(name, "-left-controls,#").concat(name, " #").concat(name, "-right-controls {\n    display: flex;\n    align-items:center;\n    height: 100%;\n    padding: 5px 5px 0px;\n}\n#").concat(name, " #").concat(name, "-right-controls {\n  position:absolute;\n  right:0px;\n}\n\n\n#").concat(name, " #").concat(name, "-left-controls > div,#").concat(name, " #").concat(name, "-right-controls > div {\n    display: inline-flex;\n    align-items:center;\n   margin:0 10px 0 10px;\n}\n\n\n\n/*#").concat(name, "-time-display {\n  display: table;\n  text-align: center;\n  width: auto;\n  height: 34px;\n  position: absolute;\n  left: 90px;\n  -webkit-transition: left 0.1s ease;\n  -moz-transition: left 0.1s ease;\n  transition: left 0.1s ease;\n}\n*/\n#").concat(name, " #").concat(name, "-time-display span {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n#").concat(name, " #").concat(name, "-status-btn {\n  opacity: ").concat(theme["button-opacity"], ";\n}\n#").concat(name, " #").concat(name, "-status-btn svg{\n  width:20px;\n  height:18px;\n}\n#").concat(name, " #").concat(name, "-volume {\n  opacity: ").concat(theme["button-opacity"], ";\n  position: relative;\n}\n#").concat(name, " #").concat(name, "-volume-btn {\n  width: 20px;\n  height: 15px;\n}\n\n#").concat(name, " #").concat(name, "-volumebar {\n  width: 0px;\n  height: 3px;\n  background-color: ").concat(theme["loopbar-color"], ";\n  -webkit-transition: left 0.1s ease;\n  -moz-transition: left 0.1s ease;\n  transition: left 0.1s ease;\n  position:relative;\n  left:5px;\n}\n\n#").concat(name, " #").concat(name, "-volumebar-helper {\n  position: absolute;\n    width: 0px;\n    height: 15px;\n    bottom: 0px;\n    z-index: 10;\n    left: 25px;\n}\n\n#").concat(name, " #").concat(name, "-volumebar-active {\n  position: relative;\n  width: 0%;\n  height: 100%;\n  background-color: ").concat(theme["color"], ";\n  position:relative;\n  bottom:0px;\n}\n\n#").concat(name, " #").concat(name, "-volume-cursor {\n  transform:translate(50%,-36%);\n  right: 0px;\n  top: 0px;\n  width: 0px;\n  height: 0px;\n  position: absolute;\n  background-color: ").concat(theme["color"], ";\n  border-radius: 10px;\n  z-index: 5;\n}\n\n#").concat(name, " .").concat(name, "-loopbar-time {\n  width:auto;\n  height:12px;\n  background-color:").concat(theme["background-color"], ";\n  line-height:10px;\n  font-size:10px;\n}\n\n#").concat(name, " #").concat(name, "-loop-time {\n  margin: 7px;\n}\n\n#").concat(name, " #").concat(name, "-dc-btn {\n    background-repeat: no-repeat;\n    background-size: 100% 100%;\n    width: 20px;\n    height: 15px;\n    margin: 7px 10px 5px 0px;\n    transform: scale(1.5,1.5);\n}\n\n#").concat(name, " #").concat(name, "-loop-btn {\n  opacity: ").concat(theme["button-opacity"], ";\n  display:flex;\n  align-items:center;\n}\n\n\n#").concat(name, " #").concat(name, "-settings-btn {\n  overflow:hidden;\n  opacity: ").concat(theme["button-opacity"], ";\n}\n\n#").concat(name, " #").concat(name, "-full-screen-btn {\n  opacity: ").concat(theme["button-opacity"], ";\n}\n\n#").concat(name, " .").concat(name, "-speed-btn {\n  opacity: ").concat(theme["button-opacity"], ";\n  height: 14px;\n}\n\n#").concat(name, " #").concat(name, "-settings-panel {\n  touch-action: none;\n  box-sizing: border-box;\n  position: absolute;\n  z-index:102;\n  background-color: ").concat(theme["settings-background-color"], ";\n  bottom: ").concat(theme["settings-panel-bottom"], ";\n  border: ").concat(theme["border"], ";\n  right: 8px;\n  width: 167px;\n  padding: 5px;\n  margin: 0px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#").concat(name, " .").concat(name, "-hide {\n  display:none !important;\n}\n\n#").concat(name, " #").concat(name, "-speed-value-bar {\n  position: relative;\n  width: 5px;\n  background-color: ").concat(theme["speedbar-color"], ";\n  display: inline-block;\n  box-sizing: border-box;\n  height: ").concat(options.speedValues.length * 16, "px;\n  float: left;\n  margin-right:15px;\n}\n\n#").concat(name, " #").concat(name, "-speed-value-helperbar {\n  position: absolute;\n  width: 25px;\n  height: ").concat(options.speedValues.length * 16, "px;\n  float: left;\n  left: 18px;\n  z-index:10;\n}\n\n\n#").concat(name, " #").concat(name, "-speed-value-bar:hover,\n#").concat(name, " #").concat(name, "-speed-value-helperbar {\n  cursor: pointer;\n}\n\n#").concat(name, " #").concat(name, "-volumebar:hover,\n#").concat(name, " #").concat(name, "-volumebar-helper:hover,\n#").concat(name, " #").concat(name, "-volume-btn:hover,\n#").concat(name, " #").concat(name, "-volumebar:active,\n#").concat(name, " #").concat(name, "-volumebar-helper:active,\n#").concat(name, " #").concat(name, "-volume-btn:active {\n  cursor:pointer;\n}\n\n#").concat(name, " #").concat(name, "-speed-cursor {\n  position: absolute;\n  background-color: ").concat(theme["speedbar-cursor-color"], ";\n  top: 0px;\n  left: 0px;\n}\n\n#").concat(name, " #").concat(name, "-speed-cursor div {\n  position: absolute;\n  background-color: ").concat(theme["speedbar-cursor-color"], ";\n  left: -2.5px;\n  top: -4px;\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n}\n\n#").concat(name, " #").concat(name, "-time-separator{\n  margin:0 3px;\n}\n#").concat(name, " #").concat(name, "-speed-cursor:hover {\n  cursor: pointer;\n}\n\n#").concat(name, " .").concat(name, "-speed-value-step {\n  width: 16px;\n  background-color: ").concat(theme["speedbar-color"], ";\n  display: inline-block;\n  box-sizing: border-box;\n  height: 2px;\n  margin-top: 7px;\n  margin-bottom: 7px;\n  float: left;\n}\n\n#").concat(name, " #").concat(name, "-speed-value {\n  display: inline-block;\n  box-sizing: border-box;\n  height: ").concat(options.speedValues.length * 16, "px;\n  text-align: left;\n}\n\n#").concat(name, " .").concat(name, "-speed-value {\n  box-sizing: border-box;\n  height: 16px;\n  font-size: 12px;\n}\n\n#").concat(name, " #").concat(name, "-indicator {\n  font-size: 8px !important;\n  position: absolute;\n  bottom: -3px;\n  color: ").concat(theme["color"], ";\n}\n\n/*#").concat(name, "-speed-settings {\n  height: ").concat(options.speedValues.length * 16 + 32 + 10 - 2, "px;\n}*/\n\n#").concat(name, " #").concat(name, "-speed-settings li.no-hover { \n  height: ").concat(options.speedValues.length * 16 + 10 - 2, "px !important; \n}\n#").concat(name, " #").concat(name, "-settings-panel.").concat(name, "-settings-speed-panel {\n  overflow: hidden;\n  width: 92px;\n  position:absolute;\n  z-index:120;\n  /*height: ").concat(options.speedValues.length * 16 + 32 + 20, "px;*/\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#").concat(name, " #").concat(name, "-settings-panel.").concat(name, "-settings-speed-panel .").concat(name, "-speed-btn {\n  float: left;\n}\n\n#").concat(name, " .").concat(name, "-settings-speed-panel ul:first-child {\n  text-align: right;\n}\n\n#").concat(name, " #").concat(name, "-speed-current {\n  float: right;\n  padding-right: 10px\n}\n\n#").concat(name, " #").concat(name, "-settings-panel .").concat(name, "-speed-btn {\n  float: right;\n}\n\n#").concat(name, " #").concat(name, "-settings-panel ul {\n  width: 100%;\n  margin: 0px;\n  padding: 0px;\n  overflow: hidden;\n}\n\n#").concat(name, " #").concat(name, "-settings-panel.").concat(name, "-settings-speed-panel ul li {\n  min-width: 70px;\n  display: flex;\n  height: 32px;\n  align-items: center;\n  justify-content:center;\n}\n\n#").concat(name, " #").concat(name, "-settings-panel ul li.no-hover:hover {\n  background-color: transparent;\n  cursor: default;\n}\n\n#").concat(name, " div.").concat(name, "-speed-value:hover {\n  background-color: ").concat(theme["hover-color"], ";\n  cursor: pointer;\n}\n\n#").concat(name, " #").concat(name, "-settings-panel ul li {\n  /*position: relative;\n  width: 100%;\n  min-width: 154px;*/\n  list-style-type: none;\n  margin: 0px;\n  padding: 5px;\n  display: flex;\n  height:32px;\n  align-items:center;\n}\n\n#").concat(name, " #").concat(name, "-settings-panel ul li label {\n  margin: 0px;\n}\n\n#").concat(name, " .switch {\n  position: relative;\n  display: inline-block;\n  width: 32px;\n  height: 18px;\n}\n\n#").concat(name, " .switch input {\n  display: none;\n}\n\n#").concat(name, " .settings-switch {\n  position: absolute;\n  right: 24px;\n}\n\n#").concat(name, " .settings-switch::after {\n  clear: both;\n}\n\n#").concat(name, " .slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: ").concat(theme["slider-off-color"], ";\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n#").concat(name, " .slider:before {\n  position: absolute;\n  content: \"\";\n  height: 16px;\n  width: 16px;\n  left: 1px;\n  bottom: 1px;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n#").concat(name, " input:checked+.slider {\n  background-color: ").concat(theme["slider-on-color"], ";\n}\n\n#").concat(name, " input:focus+.slider {\n  box-shadow: 0 0 1px ").concat(theme["slider-on-color"], ";\n}\n\n#").concat(name, " input:checked+.slider:before {\n  -webkit-transform: translateX(16px);\n  -ms-transform: translateX(16px);\n  transform: translateX(16px);\n}\n\n\n/* Rounded sliders */\n\n#").concat(name, " .slider.round {\n  border-radius: 34px;\n}\n\n#").concat(name, " .slider.round:before {\n  border-radius: 50%;\n}\n\n\n#").concat(name, " .m-fadeOut {\n  visibility: hidden !important;\n  opacity: 0 !important;\n}\n\n#").concat(name, " .m-fadeIn {\n  visibility: visible !important;\n  opacity: 1 !important;\n}\n\n#").concat(name, " #").concat(name, "-settings-panel ul li:hover {\n  background-color: ").concat(theme["hover-color"], ";\n  cursor: pointer;\n}\n\n#").concat(name, " #").concat(name, "-settings-panel ul li label:hover {\n  cursor: pointer;\n}\n\n#").concat(name, " #").concat(name, "-loopbar:hover {\n  cursor: pointer;\n}\n\n#").concat(name, " #").concat(name, "-status-btn:hover {\n  cursor: pointer;\n}\n\n#").concat(name, " #").concat(name, "-controls:active #").concat(name, "-cursor,\n#").concat(name, " #").concat(name, "-controls:hover #").concat(name, "-cursor  {\n  width: 16px;\n  height: 16px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#").concat(name, " #").concat(name, "-volume .").concat(name, "-volume-cursor-transition {\n  width: 12px;\n  height: 12px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#").concat(name, " #").concat(name, "-volume .").concat(name, "-volume-width-transition\n {\n  width: 50px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#").concat(name, " #").concat(name, "-time-display.").concat(name, "-time-width-transition {\n  position:relative;\n  left: 10px;\n  -webkit-transition: left 0.3s ease;\n  -moz-transition: left 0.3s ease;\n  transition: left 0.3s ease;\n}\n\n#").concat(name, " #").concat(name, "-settings-speed:hover .").concat(name, "-speed-btn {\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#").concat(name, " #").concat(name, "-status-btn:hover {\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#").concat(name, " #").concat(name, "-loop-btn:hover,\n#").concat(name, " #").concat(name, "-dc-btn:hover\n {\n  cursor: pointer;\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n#").concat(name, " #").concat(name, "-settings-btn:hover {\n  cursor: pointer;\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#").concat(name, " #").concat(name, "-full-screen-btn:hover {\n  cursor: pointer;\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n").concat(theme["theme-style"], "\n");
};

var themes = function themes(theme, name) {
  var themes = {
    "default": {
      "settings-background-color": "whitesmoke",
      "hms-background-color": "whitesmoke",
      "background-color": "whitesmoke",
      "grad-height": "0px",
      color: "black",
      "svg-color": "black",
      "loopbar-color": "#808086",
      "speedbar-color": "#999",
      "runningbar-color": "red",
      "cursor-color": "red",
      "speedbar-cursor-color": "red",
      "button-opacity": "1",
      "hover-color": "rgba(200, 200, 200, 0.5)",
      "slider-off-color": "#ccc",
      "slider-on-color": "red",
      "preview-border": "1px solid rgba(0,0,0,1)",
      border: "1px solid rgba(255,255,255,0.2)",
      "controls-border": "none",
      "svg-selected-color": "red",
      "loopbar-boundaries-style::before": "",
      "loopbar-boundaries-style::after": "",
      "theme-style": "",
      "loopbar-boundaries-color": "#808086"
    },
    dark: {
      "settings-background-color": "black",
      "hms-background-color": "black",
      "background-color": "black",
      "grad-height": "0px",
      color: "white",
      "svg-color": "white",
      "loopbar-color": "#808086",
      "speedbar-color": "#999",
      "runningbar-color": "red",
      "cursor-color": "red",
      "speedbar-cursor-color": "red",
      "button-opacity": "1",
      "hover-color": "rgba(90, 90, 90, 0.5)",
      "slider-off-color": "#ccc",
      "slider-on-color": "red",
      "preview-border": "1px solid rgba(0,0,0,1)",
      border: "1px solid rgba(255,255,255,0.2)",
      "controls-border": "none",
      "svg-selected-color": "red",
      "loopbar-boundaries-style::before": "",
      "loopbar-boundaries-style::after": "",
      "theme-style": "",
      "loopbar-boundaries-color": "#808086"
    },
    whiteGold: {
      "settings-background-color": "white",
      "hms-background-color": "white",
      "background-color": "white",
      "grad-height": "0px",
      color: "#a17f1a",
      "svg-color": "#a17f1a",
      "loopbar-color": "#808086",
      "speedbar-color": "#999",
      "runningbar-color": "#a17f1a",
      "cursor-color": "#a17f1a",
      "speedbar-cursor-color": "#a17f1a",
      "button-opacity": "1",
      "hover-color": "rgba(200, 200, 200, 0.5)",
      "slider-off-color": "#ccc",
      "slider-on-color": "#a17f1a",
      "preview-border": "1px solid rgba(0,0,0,1)",
      border: "1px solid rgba(255,255,255,0.2)",
      "controls-border": "none",
      "svg-selected-color": "red",
      "loopbar-boundaries-style::before": "",
      "loopbar-boundaries-style::after": "",
      "theme-style": "",
      "loopbar-boundaries-color": "#808086"
    },
    darkGold: {
      "settings-background-color": "black",
      "hms-background-color": "black",
      "background-color": "black",
      "grad-height": "0px",
      color: "#a17f1a",
      "svg-color": "#a17f1a",
      "loopbar-color": "#808086",
      "speedbar-color": "#999",
      "runningbar-color": "#a17f1a",
      "cursor-color": "#a17f1a",
      "speedbar-cursor-color": "#a17f1a",
      "button-opacity": "1",
      "hover-color": "rgba(90, 90, 90, 0.5)",
      "slider-off-color": "#ccc",
      "slider-on-color": "#a17f1a",
      "preview-border": "1px solid rgba(0,0,0,1)",
      border: "1px solid rgba(255,255,255,0.2)",
      "controls-border": "none",
      "svg-selected-color": "red",
      "loopbar-boundaries-style::before": "",
      "loopbar-boundaries-style::after": "",
      "theme-style": "",
      "loopbar-boundaries-color": "#808086"
    },
    transparent: {
      "background-color": "transparent",
      "settings-background-color": "rgba(0,0,0,0.5)",
      "hms-background-color": "rgba(0,0,0,0.5)",
      "preview-border": "1px solid rgba(0,0,0,1)",
      color: "#e8eaeb",
      "grad-height": "200px",
      "svg-color": "#e8eaeb",
      "loopbar-color": "#cfcfd0",
      "totalbar-color": "#797979",
      "speedbar-color": "#999",
      "runningbar-color": "red",
      "cursor-color": "#9e2d11",
      "cursor-style::before": "\n        box-shadow: 0px 0px 6px 6px red;\n        width: 6px;\n        height: 6px;\n        border-radius: 100%;\n        display: block;\n        content: \"\";\n        background-color: red;\n        position: relative;\n        left: -2px;\n        top: -2px;\n    ",
      "cursor-style::after": "\n        width: 6px;\n        height: 6px;\n        border-radius: 100%;\n        box-shadow: 0px 0px 6px 6px red;\n        content: \"\";\n        display: block;\n        position: absolute;\n        background-color: red;\n        right: -2px;\n        bottom: -2px;\n    ",
      "speedbar-cursor-color": "red",
      "button-opacity": "1",
      "hover-color": "rgba(200, 200, 200, 0.5)",
      "slider-off-color": "#ccc",
      "slider-on-color": "red",
      border: "1px solid rgba(255,255,255,0.1)",
      "svg-selected-color": "red",
      "loopbar-boundaries-style": "\n        transform: translate(-50%,-37%);\n        position: absolute;\n        width: 18px;\n        background-color: #ff0000;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        position: absolute;\n        width: 18px;\n        background-color: #ff0000;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        width: 18px;\n        height: 9px;\n        border-radius: 100%;\n        top: 1.5px;\n    ",
      "loopbar-boundaries-style::before": "\n            width: 16px;\n        height: 5px;\n        background: #ff0000;\n        border-radius: 100%;\n        display: block;\n        content: \"\";\n        position: relative;\n        left: -2px;\n        top: 2px;\n    ",
      "loopbar-boundaries-style::after": "\n        width: 14px;\n        height: 11px;\n        border-radius: 100%;\n        background: #ff0000;\n        content: \"\";\n        display: block;\n        position: relative;\n        top: -6px;\n        left: 5px;\n    ",
      "theme-style": "\n        #".concat(name, "-loopbar-start {\n            left: -9px !important;\n            transform: rotate(180deg);\n            top: -2px;\n        }\n    ")
    },
    "mc-green": {
      "background-color": "#141416",
      "settings-background-color": "rgba(0,0,0,0.5)",
      "hms-background-color": "rgba(0,0,0,0.5)",
      "preview-border": "1px solid rgba(0,0,0,1)",
      color: "#999",
      "grad-height": "0px",
      "svg-color": "#999",
      "loopbar-color": "rgba(0,184,139,0.2)",
      "loopbar-boundaries-color": "#00b88b",
      "totalbar-color": "rgba(255, 255, 255, 0.11)",
      "speedbar-color": "#999",
      "runningbar-color": "#00b88b",
      "cursor-color": "#00b88b",
      "speedbar-cursor-color": "#00b88b",
      "button-opacity": "1",
      "hover-color": "rgba(0,184,139,0.2)",
      "slider-off-color": "#ccc",
      "slider-on-color": "#00b88b",
      border: "1px solid rgba(255,255,255,0.1)",
      "controls-border": "1px solid #151515",
      "svg-selected-color": "#00b88b",
      "loopbar-boundaries-style": "\n        transform: translate(-50%,-37%);\n        position: absolute;\n        width: 18px;\n        background-color: #00b88b;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        position: absolute;\n        width: 18px;\n        background-color: #00b88b;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        width: 18px;\n        height: 9px;\n        border-radius: 100%;\n        top: 1.5px;\n    ",
      "loopbar-boundaries-style::before": "\n            width: 16px;\n        height: 5px;\n        background: #00b88b;\n        border-radius: 100%;\n        display: block;\n        content: \"\";\n        position: relative;\n        left: -2px;\n        top: 2px;\n    ",
      "loopbar-boundaries-style::after": "\n        width: 14px;\n        height: 11px;\n        border-radius: 100%;\n        background: #00b88b;\n        content: \"\";\n        display: block;\n        position: relative;\n        top: -6px;\n        left: 5px;\n    ",
      "theme-style": "\n        #".concat(name, "-loopbar-start {\n            left: -9px !important;\n            transform: rotate(180deg);\n            top: -2px;\n        }\n    ")
    },
    "mc-blue": {
      "background-color": "#141416",
      "settings-background-color": "rgba(0,0,0,0.5)",
      "hms-background-color": "rgba(0,0,0,0.5)",
      "preview-border": "1px solid rgba(0,0,0,1)",
      color: "#999",
      "grad-height": "0px",
      "svg-color": "#999",
      "loopbar-color": "rgba(0,153,225,0.2)",
      "loopbar-boundaries-color": "#0099e1",
      "totalbar-color": "rgba(255, 255, 255, 0.11)",
      "speedbar-color": "#999",
      "runningbar-color": "#0099e1",
      "cursor-color": "#0099e1",
      "speedbar-cursor-color": "#0099e1",
      "button-opacity": "1",
      "hover-color": "rgba(0,153,225,0.2)",
      "slider-off-color": "#ccc",
      "slider-on-color": "#0099e1",
      border: "1px solid rgba(255,255,255,0.1)",
      "controls-border": "1px solid #151515",
      "svg-selected-color": "#0099e1",
      "loopbar-boundaries-style": "\n        transform: translate(-50%,-37%);\n        position: absolute;\n        width: 18px;\n        background-color: #0099e1;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        position: absolute;\n        width: 18px;\n        background-color: #0099e1;\n        height: 18px;\n        border-radius: 10px;\n        z-index: 40;\n        width: 18px;\n        height: 9px;\n        border-radius: 100%;\n        top: 1.5px;\n    ",
      "loopbar-boundaries-style::before": "\n            width: 16px;\n        height: 5px;\n        background: #0099e1;\n        border-radius: 100%;\n        display: block;\n        content: \"\";\n        position: relative;\n        left: -2px;\n        top: 2px;\n    ",
      "loopbar-boundaries-style::after": "\n        width: 14px;\n        height: 11px;\n        border-radius: 100%;\n        background: #0099e1;\n        content: \"\";\n        display: block;\n        position: relative;\n        top: -6px;\n        left: 5px;\n    ",
      "theme-style": "\n        #".concat(name, "-loopbar-start {\n            left: -9px !important;\n            transform: rotate(180deg);\n            top: -2px;\n        }\n    ")
    },
    "on-top": {
      "background-height": "100%",
      "pointer-event-panel-height": "calc(100% - 44px)",
      "controls-bottom": "0px",
      "settings-panel-bottom": "48px",
      "controls-position": "0px"
    },
    "position-bottom": {
      "background-height": "calc(100% - 44px)",
      "pointer-event-panel-height": "calc(100% - 44px)",
      "controls-bottom": "-0px",
      "settings-panel-bottom": "48px",
      "controls-position": "40px"
    }
  };
  return themes[theme];
};

var playerHTML = function playerHTML(config) {
  return "\n  <div\n    class=\"pointer-event-panel\"\n    id=\"".concat(config.name, "-pointer-event-panel\"\n  ></div>\n  <div\n    class=\"pointer-event-panel\"\n    id=\"").concat(config.name, "-listener-helper\"\n  ></div>\n  <div class=\"background\"></div>\n  <div id=\"").concat(config.name, "-controls\">\n    <div class=\"grad\"></div>\n    <div id=\"").concat(config.name, "-totalbar\">\n      <div id=\"").concat(config.name, "-hover-display\">\n        <div id=\"").concat(config.name, "-hover-millisecond\"></div>\n      </div>\n      <div id=\"").concat(config.name, "-loopbar\">\n        <div\n          class=\"").concat(config.name, "-loop-boundaries\"\n          id=\"").concat(config.name, "-loopbar-start\"\n        ></div>\n        <div\n          class=\"").concat(config.name, "-loop-boundaries\"\n          id=\"").concat(config.name, "-loopbar-end\"\n        ></div>\n        <div id=\"").concat(config.name, "-helperbar\"></div>\n        <div id=\"").concat(config.name, "-runningbar\">\n          <div id=\"").concat(config.name, "-cursor\"></div>\n        </div>\n      </div>\n    </div>\n    <div id=\"").concat(config.name, "-left-controls\">\n      <div id=\"").concat(config.name, "-status-btn\">\n        ").concat(config.svg.playSVG, "\n        <span id=\"").concat(config.name, "-indicator\"></span>\n      </div>\n      <div id=\"").concat(config.name, "-volume\">\n        <div id=\"").concat(config.name, "-volume-btn\">\n          ").concat(config.svg.volumeSVG, "\n        </div>\n        <div id=\"").concat(config.name, "-volumebar-helper\"></div>\n        <div id=\"").concat(config.name, "-volumebar\">\n            <div id=\"").concat(config.name, "-volumebar-active\">\n              <div id=\"").concat(config.name, "-volume-cursor\"></div>\n            </div>\n        </div>\n      </div>\n      <div id=\"").concat(config.name, "-time-display\">\n        <span id=\"").concat(config.name, "-time-current\"></span>\n        <span id=\"").concat(config.name, "-time-separator\"></span>\n        <span id=\"").concat(config.name, "-time-total\"></span>\n      </div>\n    </div>\n    <div id=\"").concat(config.name, "-right-controls\">\n      <div\n        id=\"").concat(config.name, "-loop-btn-container\"\n      >\n        <div\n          id=\"").concat(config.name, "-loop-btn\"\n        >").concat(config.svg.loopSVG, "</div>\n        <div\n          id=\"").concat(config.name, "-loop-time\"\n        >\n          <span\n            id=\"").concat(config.name, "-loopbar-start-time\"\n            class=\"").concat(config.name, "-loopbar-time\"\n          ></span>\n          <span>:</span>\n          <span\n            id=\"").concat(config.name, "-loopbar-end-time\"\n            class=\"").concat(config.name, "-loopbar-time\"\n          ></span>\n        </div>\n      </div>\n      <div\n        id=\"").concat(config.name, "-settings-btn\"\n      >").concat(config.svg.settingsSVG, "</div>\n      <div\n        id=\"").concat(config.name, "-dc-btn\"\n      >\n        ").concat(config.svg.dcSVG, "\n      </div>\n      \n      <div\n        id=\"").concat(config.name, "-full-screen-btn\"\n      >").concat(config.svg.fullScreenSVG, "</div>\n    </div>\n    \n\n  </div>\n  <div id=\"").concat(config.name, "-settings-panel\">\n    <ul id=\"").concat(config.name, "-main-settings\">\n      <li id=\"").concat(config.name, "-settings-pointer-events\">\n        <label>Pointer Events</label>\n        <label class=\"switch settings-switch\">\n          <input id=\"").concat(config.name, "-pointer-events-checkbox\" type=\"checkbox\">\n          <span class=\"slider round\"></span>\n        </label>\n      </li>\n      <li id=\"").concat(config.name, "-settings-preview\">\n        <label>Show Preview</label>\n        <label class=\"switch settings-switch\">\n          <input id=\"").concat(config.name, "-show-preview-checkbox\" type=\"checkbox\">\n          <span class=\"slider round\"></span>\n        </label>\n      </li>\n      <li id=\"").concat(config.name, "-settings-indicator\">\n        <label>Show Indicator</label>\n        <label class=\"switch settings-switch\">\n          <input id=\"").concat(config.name, "-show-indicator-checkbox\" type=\"checkbox\">\n          <span class=\"slider round\"></span>\n        </label>\n      </li>\n      <li id=\"").concat(config.name, "-settings-volume\">\n        <label>Show Volume</label>\n        <label class=\"switch settings-switch\">\n          <input id=\"").concat(config.name, "-show-volume-checkbox\" type=\"checkbox\">\n          <span class=\"slider round\"></span>\n        </label>\n      </li>\n      <li id=\"").concat(config.name, "-settings-speed-show\">\n        <label>Speed</label>\n        <div class=\"").concat(config.name, "-speed-btn\">").concat(config.svg.arrowRightSVG, "</div>\n        <span id=\"").concat(config.name, "-speed-current\"></span>\n      </li>\n    </ul>\n    <ul id=\"").concat(config.name, "-speed-settings\">\n      <li id=\"").concat(config.name, "-settings-speed-hide\">\n        <div class=\"").concat(config.name, "-speed-btn\">").concat(config.svg.arrowLeftSVG, "</div>\n        <label id=").concat(config.name, "-speed-runtime>Speed</label>\n      </li>\n      <li>\n        <div id=\"").concat(config.name, "-speed-value-helperbar\"></div>\n        <div id=\"").concat(config.name, "-speed-value-bar\">\n          <div\n            class=\"").concat(config.name, "-speed-value-step\"\n            id=\"").concat(config.name, "-speed-cursor\"\n          >\n            <div></div>\n          </div>\n        </div>\n        <div id=\"").concat(config.name, "-speed-value\">\n        </div>\n      </li>\n    </ul>\n  </div>\n");
};

var elid = helpers.elid,
    elcreate = helpers.elcreate;

var setElements = function setElements(_this) {
  _this.elements = {};
  var clipIframe = _this.clip.props.host;
  clipIframe.style.display = "flex";
  clipIframe.style.justifyContent = "center";
  clipIframe.style.alignItems = "center";
  _this.clip.props.host.style.position = "relative";
  _this.clip.props.host.style.zIndex = "0";
  _this.elements.mcPlayer = elcreate("div");
  _this.elements.mcPlayer.id = "".concat(_this.name);
  _this.elements.mcPlayer.className = "".concat(_this.className);
  _this.elements.mcPlayer.innerHTML = playerHTML({
    svg: svg_1,
    name: _this.name
  });

  if (typeof _this.options.host === "string") {
    var nodelist = document.querySelectorAll(_this.options.host);

    for (var i in nodelist) {
      if (isNaN(i)) {
        continue;
      }

      nodelist[i].appendChild(_this.elements.mcPlayer);
    }
  } else {
    _this.options.host.appendChild(_this.elements.mcPlayer);
  }

  _this.elements.pointerEventPanel = elid("".concat(_this.name, "-pointer-event-panel"));
  _this.elements.listenerHelper = elid("".concat(_this.name, "-listener-helper"));
  _this.elements.loopBar = elid("".concat(_this.name, "-loopbar"));
  _this.elements.totalBar = elid("".concat(_this.name, "-totalbar"));
  _this.elements.indicator = elid("".concat(_this.name, "-indicator"));
  _this.elements.loopButton = elid("".concat(_this.name, "-loop-btn"));
  _this.elements.volumeBar = elid("".concat(_this.name, "-volumebar"));
  _this.elements.totalTime = elid("".concat(_this.name, "-time-total"));
  _this.elements.volumeControl = elid("".concat(_this.name, "-volume"));
  _this.elements.volumeBtn = elid("".concat(_this.name, "-volume-btn"));
  _this.elements.runningBar = elid("".concat(_this.name, "-runningbar"));
  _this.elements.loopBarEnd = elid("".concat(_this.name, "-loopbar-end"));
  _this.elements.statusButton = elid("".concat(_this.name, "-status-btn"));
  _this.elements.speedBar = elid("".concat(_this.name, "-speed-value-bar"));
  _this.elements.currentTime = elid("".concat(_this.name, "-time-current"));
  _this.elements.timeDisplay = elid("".concat(_this.name, "-time-display"));
  _this.elements.speedCurrent = elid("".concat(_this.name, "-speed-current"));
  _this.elements.loopBarStart = elid("".concat(_this.name, "-loopbar-start"));
  _this.elements.volumeCursor = elid("".concat(_this.name, "-volume-cursor"));
  _this.elements.settingsButton = elid("".concat(_this.name, "-settings-btn"));
  _this.elements.donkeyclipButton = elid("".concat(_this.name, "-dc-btn"));
  _this.elements.timeSeparator = elid("".concat(_this.name, "-time-separator"));
  _this.elements.settingsPanel = elid("".concat(_this.name, "-settings-panel"));
  _this.elements.settingsMainPanel = elid("".concat(_this.name, "-main-settings"));
  _this.elements.fullScreenButton = elid("".concat(_this.name, "-full-screen-btn"));
  _this.elements.volumeBarHelper = elid("".concat(_this.name, "-volumebar-helper"));
  _this.elements.volumeBarActive = elid("".concat(_this.name, "-volumebar-active"));
  _this.elements.settingsSpeedPanel = elid("".concat(_this.name, "-speed-settings"));
  _this.elements.settingsShowVolume = elid("".concat(_this.name, "-settings-volume"));
  _this.elements.settingsShowPreview = elid("".concat(_this.name, "-settings-preview"));
  _this.elements.settingsPointerEvents = elid("".concat(_this.name, "-settings-pointer-events"));
  _this.elements.speedBarHelper = elid("".concat(_this.name, "-speed-value-helperbar"));
  _this.elements.settingsShowIndicator = elid("".concat(_this.name, "-settings-indicator"));
  _this.elements.settingsSpeedButtonShow = elid("".concat(_this.name, "-settings-speed-show"));
  _this.elements.settingsSpeedButtonHide = elid("".concat(_this.name, "-settings-speed-hide"));
  _this.elements.volumeBarActive.style.width = _this.settings.volume * 100 + "%";
  _this.elements.currentTime.innerHTML = _this.timeFormat(0);
  _this.elements.totalTime.innerHTML = _this.timeFormat(_this.clip.duration);
  _this.elements.timeSeparator.innerHTML = "/";

  _this.elements.settingsPanel.classList.add("m-fadeOut", "".concat(_this.name, "-hide"));

  if (!_this.options.showIndicator) {
    _this.elements.indicator.style.visibility = "hidden";
  } else {
    _this.elements.indicator.style.visibility = "visible";
    _this.elements.statusButton.style.width = "35px";
    _this.elements.statusButton.style.height = "20px";
    _this.elements.statusButton.style.bottom = "5px";
  }

  _this.elements.indicator.innerHTML = _this.clip.runTimeInfo.state;
  _this.elements.settingsSpeedPanel.style.display = "none";

  _this.elements.settingsSpeedPanel.getElementsByTagName("li")[1].classList.add("no-hover");

  _this.elements.loopBarStart.style.left = "0%";

  _this.elements.loopBarStart.classList.add("m-fadeOut", "".concat(_this.name, "-hide"));

  _this.elements.loopBarEnd.style.left = "100%";

  _this.elements.loopBarEnd.classList.add("m-fadeOut", "".concat(_this.name, "-hide"));

  _this.elements.loopStartTime = elid("".concat(_this.name, "-loopbar-start-time"));
  _this.elements.loopEndTime = elid("".concat(_this.name, "-loopbar-end-time"));
  _this.elements.editableLoopStartTime = document.createElement("input");
  _this.elements.editableLoopStartTime.type = "text";
  _this.elements.editableLoopStartTime.size = elid("".concat(_this.name, "-time-total")).innerHTML.length + 1;
  _this.elements.editableLoopStartTime.maxLength = elid("".concat(_this.name, "-time-total")).innerHTML.length;
  _this.elements.editableLoopStartTime.style.height = elid("".concat(_this.name, "-time-total")).offsetHeight;
  _this.elements.editableLoopStartTime.value = elid("".concat(_this.name, "-loopbar-start-time")).innerHTML;
  _this.elements.editableLoopStartTime.style.fontSize = "8px";
  _this.elements.editableLoopEndTime = document.createElement("input");
  _this.elements.editableLoopEndTime.type = "text";
  _this.elements.editableLoopEndTime.size = elid("".concat(_this.name, "-time-total")).innerHTML.length + 1;
  _this.elements.editableLoopEndTime.maxLength = elid("".concat(_this.name, "-time-total")).innerHTML.length;
  _this.elements.editableLoopEndTime.style.height = elid("".concat(_this.name, "-time-total")).offsetHeight;
  _this.elements.editableLoopEndTime.value = elid("".concat(_this.name, "-loopbar-start-time")).innerHTML;
  _this.elements.editableLoopEndTime.pattern = "d*";
  _this.elements.editableLoopEndTime.style.fontSize = "8px";
  elid("".concat(_this.name, "-loop-time")).classList.add("m-fadeOut", "".concat(_this.name, "-hide"));
  elid("".concat(_this.name, "-hover-display")).classList.add("m-fadeOut" // `${_this.name}-hide`
  );
  elid("".concat(_this.name, "-show-volume-checkbox")).checked = _this.options.showVolume;
  elid("".concat(_this.name, "-show-indicator-checkbox")).checked = _this.options.showIndicator;
  elid("".concat(_this.name, "-show-preview-checkbox")).checked = _this.options.preview;
  elid("".concat(_this.name, "-pointer-events-checkbox")).checked = _this.options.pointerEvents;

  if (_this.options.pointerEvents) {
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "auto";
    elid("".concat(_this.name, "-controls")).style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  } else {
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "none";
    elid("".concat(_this.name, "-controls")).style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  }

  _this.elements.listenerHelper.style.pointerEvents = "none";

  if (!_this.options.showVolume) {
    _this.elements.timeDisplay.style.left = "45px";
    _this.elements.volumeControl.style.visibility = "hidden";

    _this.elements.volumeControl.classList.toggle("".concat(_this.name, "-hide"));

    _this.elements.volumeControl.classList.toggle("".concat(_this.name, "-volume-width-transition"));
  } else {
    _this.elements.timeDisplay.style.left = "";
    _this.elements.volumeControl.style.visibility = "visible";
  }

  for (var _i in _this.options.speedValues) {
    var barDiv = elcreate("div");
    barDiv.className = "".concat(_this.name, "-speed-value-step");
    var valueDiv = elcreate("div");
    valueDiv.className = "".concat(_this.name, "-speed-value");
    valueDiv.dataset.speedValue = _this.options.speedValues[_i];
    valueDiv.innerHTML = _this.options.speedValues[_i];
    valueDiv.dataset.zone = _i;
    elid("".concat(_this.name, "-speed-value")).prepend(valueDiv);

    _this.elements.speedBar.prepend(barDiv);
  } // show hide buttons


  if (_this.options.buttons.fullScreen === false) {
    _this.elements.fullScreenButton.remove();
  }

  if (_this.options.buttons.settings === false) {
    _this.elements.settingsButton.remove();
  }

  if (_this.options.buttons.donkeyclip === false) {
    _this.elements.donkeyclipButton.remove();
  }

  if (_this.options.buttons.loop === false) {
    _this.elements.loopButton.remove();
  }
};

var addListener = helpers.addListener,
    removeListener = helpers.removeListener,
    elid$1 = helpers.elid;
var volume = {
  trigger: function trigger(_this, volume, mute) {
    if (_typeof(mute) !== undefined) {
      if (mute === false) {
        _this.elements.volumeBarActive.style.width = _this.settings.previousVolume * 100 + "%";

        _this.clip.setVolume(_this.settings.previousVolume);

        _this.settings.volumeMute = false;
        var SVG = document.createElement("span");
        SVG.innerHTML = svg_1.volumeSVG;

        _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
      } else if (mute === true) {
        _this.settings.volumeMute = true;
        _this.elements.volumeBarActive.style.width = "0%";

        _this.clip.setVolume(0);

        var _SVG = document.createElement("span");

        _SVG.innerHTML = svg_1.volumeMuteSVG;

        _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(_SVG);
      }

      _this.options.muted = _this.settings.volumeMute;

      _this.eventBroadcast("mute-change", _this.settings.volumeMute);
    }

    if (_typeof(volume) !== undefined) {
      _this.settings.volume = volume;

      if (_this.settings.volume > 0) {
        _this.settings.previousVolume = volume;
      }

      _this.elements.volumeBarActive.style.width = _this.settings.volume * 100 + "%";

      _this.clip.setVolume(_this.settings.volume);

      if (_this.settings.volume > 0) {
        _this.settings.volumeMute = false;

        var _SVG2 = document.createElement("span");

        _SVG2.innerHTML = svg_1.volumeSVG;

        _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(_SVG2);
      } else if (_this.settings.volume === 0) {
        _this.settings.volumeMute = true;

        var _SVG3 = document.createElement("span");

        _SVG3.innerHTML = svg_1.volumeMuteSVG;

        _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(_SVG3);
      }

      _this.options.volume = _this.settings.volume;

      _this.eventBroadcast("volume-change", _this.settings.volume);

      _this.eventBroadcast("mute-change", _this.settings.volumeMute);
    }
  },
  add: function add(_this) {
    // let pe = false;
    var volumeDrag = false;

    _this.elements.volumeBtn.onclick = function () {
      if (_this.settings.volumeMute) {
        _this.elements.volumeBarActive.style.width = _this.settings.previousVolume * 100 + "%";

        _this.clip.setVolume(_this.settings.previousVolume);

        _this.settings.volumeMute = false;
        var SVG = document.createElement("span");
        SVG.innerHTML = svg_1.volumeSVG;

        _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
      } else {
        _this.settings.volumeMute = true;
        _this.elements.volumeBarActive.style.width = "0%";

        _this.clip.setVolume(0);

        var _SVG4 = document.createElement("span");

        _SVG4.innerHTML = svg_1.volumeMuteSVG;

        _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(_SVG4);
      }

      _this.eventBroadcast("volume-change", _this.settings.previousVolume);

      _this.eventBroadcast("mute-change", _this.settings.volumeMute);
    };

    var volumeOpen = false;

    _this.elements.volumeBtn.onmouseover = function () {
      volumeOpen = true;

      _this.elements.volumeCursor.classList.add("".concat(_this.name, "-volume-cursor-transition"));

      _this.elements.volumeBar.classList.add("".concat(_this.name, "-volume-width-transition"));

      _this.elements.volumeBarHelper.classList.add("".concat(_this.name, "-volume-width-transition"));

      _this.elements.timeDisplay.classList.add("".concat(_this.name, "-time-width-transition"));
    };

    elid$1("".concat(_this.name, "-left-controls")).onmouseout = function () {
      if (!volumeOpen || volumeDrag) {
        return;
      }

      var e = event.toElement || event.relatedTarget || event.target;

      if (isDescendant(elid$1("".concat(_this.name, "-left-controls")), e) || e === elid$1("".concat(_this.name, "-left-controls"))) {
        return;
      }

      volumeOpen = false;

      _this.elements.volumeCursor.classList.remove("".concat(_this.name, "-volume-cursor-transition"));

      _this.elements.volumeBar.classList.remove("".concat(_this.name, "-volume-width-transition"));

      _this.elements.volumeBarHelper.classList.remove("".concat(_this.name, "-volume-width-transition"));

      _this.elements.timeDisplay.classList.remove("".concat(_this.name, "-time-width-transition"));
    };

    _this.listeners.onCursorMoveVolumeBar = function (e) {
      e.preventDefault();
      var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;

      var viewportOffset = _this.elements.volumeBarHelper.getBoundingClientRect();

      var positionX = clientX - viewportOffset.left;

      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > _this.elements.volumeBarHelper.offsetWidth) {
        positionX = _this.elements.volumeBarHelper.offsetWidth;
      }

      _this.settings.volume = Number((positionX / _this.elements.volumeBarHelper.offsetWidth).toFixed(2));
      _this.elements.volumeBarActive.style.width = _this.settings.volume * 100 + "%";

      _this.clip.setVolume(_this.settings.volume);

      if (_this.settings.volume > 0) {
        _this.settings.volumeMute = false;
        var SVG = document.createElement("span");
        SVG.innerHTML = svg_1.volumeSVG;

        _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
      } else if (_this.settings.volume === 0) {
        _this.settings.volumeMute = true;

        var _SVG5 = document.createElement("span");

        _SVG5.innerHTML = svg_1.volumeMuteSVG;

        _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(_SVG5);
      }

      _this.eventBroadcast("volume-change", _this.settings.volume);

      _this.eventBroadcast("mute-change", _this.settings.volumeMute);
    };

    _this.listeners.onMouseUpVolumeBar = function (e) {
      volumeDrag = false; // if (pe) {
      //   _this.elements.settingsPointerEvents.click();
      // }

      _this.elements.listenerHelper.style.pointerEvents = "none";
      e.preventDefault();

      if (_this.settings.volume > 0) {
        _this.settings.previousVolume = _this.settings.volume;
      }

      removeListener("mouseup", _this.listeners.onMouseUpVolumeBar, false);
      removeListener("touchend", _this.listeners.onMouseUpVolumeBar, false);
      removeListener("mousemove", _this.listeners.onCursorMoveVolumeBar, false);
      removeListener("touchmove", _this.listeners.onCursorMoveVolumeBar, false);
    };

    _this.listeners.onMouseDownVolumeBar = function (e) {
      volumeDrag = true; // if (!_this.options.pointerEvents) {
      //   pe = true;
      //   _this.elements.settingsPointerEvents.click();
      // }

      _this.elements.listenerHelper.style.pointerEvents = "auto";
      e.preventDefault();

      _this.listeners.onCursorMoveVolumeBar(e);

      addListener("mouseup", _this.listeners.onMouseUpVolumeBar, false);
      addListener("touchend", _this.listeners.onMouseUpVolumeBar, false);
      addListener("mousemove", _this.listeners.onCursorMoveVolumeBar, false);
      addListener("touchmove", _this.listeners.onCursorMoveVolumeBar, false);
    };

    _this.elements.volumeBarHelper.addEventListener("mousedown", _this.listeners.onMouseDownVolumeBar, false);

    _this.elements.volumeCursor.addEventListener("mousedown", _this.listeners.onMouseDownVolumeBar, false);

    _this.elements.volumeBarHelper.addEventListener("touchstart", _this.listeners.onMouseDownVolumeBar, {
      passive: false
    }, false);

    _this.elements.volumeCursor.addEventListener("touchstart", _this.listeners.onMouseDownVolumeBar, {
      passive: false
    }, false);
  }
};

function isDescendant(parent, child) {
  var node = child.parentNode;

  while (node != null) {
    if (node == parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

var addListener$1 = helpers.addListener,
    removeListener$1 = helpers.removeListener;

var loopBarStart = function loopBarStart(_this) {
  // let pe = false;
  _this.listeners.onCursorMoveLoopStart = function (e) {
    e.preventDefault();
    var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;

    var viewportOffset = _this.elements.totalBar.getBoundingClientRect();

    var positionX = Math.round(clientX - viewportOffset.left);
    var endPositionsInPxls = Math.round(_this.settings.loopEndMillisecond / _this.clip.duration * _this.elements.totalBar.offsetWidth);

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.totalBar.offsetWidth) {
      positionX = _this.elements.totalBar.offsetWidth;
    }

    var runningBarWidthInPxls = _this.clip.runTimeInfo.currentMillisecond / _this.clip.duration * _this.elements.totalBar.offsetWidth - positionX;
    _this.elements.loopBar.style.left = positionX + "px";
    _this.elements.loopBar.style.width = endPositionsInPxls - positionX + "px";
    _this.elements.runningBar.style.width = runningBarWidthInPxls + "px";
    _this.settings.loopLastPositionXPxls = positionX;
    _this.settings.loopStartMillisecond = Math.round(_this.clip.duration * _this.elements.loopBar.offsetLeft / _this.elements.totalBar.offsetWidth);

    if (_this.settings.loopEndMillisecond < _this.settings.loopStartMillisecond) {
      _this.settings.loopEndMillisecond = _this.settings.loopStartMillisecond;
      _this.elements.loopBar.style.width = "0px";
      _this.elements.runningBar.style.width = "0px";
    }

    _this.elements.loopEndTime.innerHTML = _this.settings.loopEndMillisecond;
    _this.elements.loopStartTime.innerHTML = _this.settings.loopStartMillisecond;

    if (_this.settings.loopStartMillisecond > _this.clip.runTimeInfo.currentMillisecond) {
      _this.settings.loopJourney = true;
    }
  };

  _this.listeners.onMouseUpLoopStart = function (e) {
    _this.elements.listenerHelper.style.pointerEvents = "none"; // if (pe) {
    //   _this.elements.settingsPointerEvents.click();
    // }

    _this.settings.resizeLoop = false;
    e.preventDefault();

    if (_this.settings.loopJourney) {
      _this.createProgressDrag(_this.elements.runningBar.offsetWidth);

      _this.settings.loopJourney = false;
    }

    _this.elements.loopBar.style.left = _this.elements.loopBar.offsetLeft / _this.elements.totalBar.offsetWidth * 100 + "%";
    _this.elements.loopBar.style.width = _this.elements.loopBar.offsetWidth / _this.elements.totalBar.offsetWidth * 100 + "%";
    _this.settings.loopStartMillisecond = Math.round(_this.clip.duration * _this.elements.loopBar.offsetLeft / _this.elements.totalBar.offsetWidth);
    _this.elements.runningBar.style.width = _this.elements.runningBar.offsetWidth / _this.elements.loopBar.offsetWidth * 100 + "%";
    removeListener$1("mouseup", _this.listeners.onMouseUpLoopStart, false);
    removeListener$1("touchend", _this.listeners.onMouseUpLoopStart, false);
    removeListener$1("mousemove", _this.listeners.onCursorMoveLoopStart, false);
    removeListener$1("touchmove", _this.listeners.onCursorMoveLoopStart, false);

    _this.elements.loopBar.addEventListener("mousedown", _this.listeners.onMouseDown, false);

    _this.elements.loopBar.addEventListener("touchstart", _this.listeners.onMouseDown, {
      passive: true
    }, false);

    if (_this.settings.playAfterResize) {
      if (_this.clip.runTimeInfo.state === "idle") {
        var loopms;

        if (_this.clip.speed >= 0) {
          loopms = _this.settings.loopStartMillisecond + 1;
        } else {
          loopms = _this.settings.loopEndMillisecond - 1;
        }

        _this.settings.needsUpdate = true;

        _this.createJourney(_this.clip, loopms, {
          before: "pause",
          after: "play"
        });
      } else {
        _this.clip.play();
      }

      _this.settings.playAfterResize = false;
    }
  };

  _this.listeners.onMouseDownLoopStart = function (e) {
    _this.elements.listenerHelper.style.pointerEvents = "auto"; // if (!_this.options.pointerEvents) {
    //   pe = true;
    //   _this.elements.settingsPointerEvents.click();
    // }

    _this.settings.resizeLoop = true;
    e.preventDefault();
    _this.settings.needsUpdate = true;

    if (_this.clip.runTimeInfo.state === "playing") {
      _this.clip.pause();

      _this.settings.playAfterResize = true;
    }

    _this.elements.loopBar.removeEventListener("mousedown", _this.listeners.onMouseDown, false);

    _this.elements.loopBar.removeEventListener("touchstart", _this.listeners.onMouseDown, false);

    _this.listeners.onCursorMoveLoopStart(e);

    addListener$1("mouseup", _this.listeners.onMouseUpLoopStart, false);
    addListener$1("touchend", _this.listeners.onMouseUpLoopStart, false);
    addListener$1("mousemove", _this.listeners.onCursorMoveLoopStart, false);
    addListener$1("touchmove", _this.listeners.onCursorMoveLoopStart, false);
  };

  _this.elements.loopBarStart.addEventListener("mousedown", _this.listeners.onMouseDownLoopStart, false);

  _this.elements.loopBarStart.addEventListener("touchstart", _this.listeners.onMouseDownLoopStart, {
    passive: false
  }, false);
};

var addListener$2 = helpers.addListener,
    removeListener$2 = helpers.removeListener;

var loopBarEnd = function loopBarEnd(_this) {
  // let pe = false;
  _this.listeners.onCursorMoveLoopEnd = function (e) {
    e.preventDefault();
    var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;

    var viewportOffset = _this.elements.totalBar.getBoundingClientRect();

    var positionX = clientX - viewportOffset.left;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.totalBar.offsetWidth) {
      positionX = _this.elements.totalBar.offsetWidth;
    }

    if (_this.elements.runningBar.offsetWidth >= _this.elements.loopBar.offsetWidth) {
      _this.elements.runningBar.style.width = _this.elements.loopBar.offsetWidth + "px";
    }

    if (_this.settings.loopLastPositionXPxls - positionX < 0) {
      _this.elements.loopBar.style.width = Math.abs(_this.settings.loopLastPositionXPxls - positionX) + "px";
    } else {
      _this.elements.loopBar.style.left = positionX + "px";
      _this.settings.loopLastPositionXPxls = positionX;
    }

    _this.settings.loopEndMillisecond = Math.round(_this.clip.duration * ((parseFloat(_this.elements.loopBar.style.left) || 0) + parseFloat(_this.elements.loopBar.style.width)) / _this.elements.totalBar.offsetWidth);

    if (_this.settings.loopEndMillisecond < _this.clip.runTimeInfo.currentMillisecond) {
      _this.settings.loopJourney = true;
    }

    if (_this.settings.loopStartMillisecond > _this.settings.loopEndMillisecond) {
      _this.settings.loopStartMillisecond = _this.settings.loopEndMillisecond;
      _this.settings.loopJourney = true;
    }

    _this.elements.loopEndTime.innerHTML = _this.settings.loopEndMillisecond;
    _this.elements.loopStartTime.innerHTML = _this.settings.loopStartMillisecond;
  };

  _this.listeners.onMouseUpLoopEnd = function (e) {
    _this.elements.listenerHelper.style.pointerEvents = "none"; // if (pe) {
    //   _this.elements.settingsPointerEvents.click();
    // }

    _this.settings.resizeLoop = false;
    e.preventDefault();
    _this.elements.runningBar.style.width = _this.elements.runningBar.offsetWidth / _this.elements.loopBar.offsetWidth * 100 + "%";
    _this.elements.loopBar.style.left = _this.elements.loopBar.offsetLeft / _this.elements.totalBar.offsetWidth * 100 + "%";
    _this.elements.loopBar.style.width = _this.elements.loopBar.offsetWidth / _this.elements.totalBar.offsetWidth * 100 + "%";

    if (_this.settings.loopJourney) {
      _this.createProgressDrag(_this.elements.runningBar.offsetWidth);

      _this.settings.loopJourney = false;
    }

    removeListener$2("mouseup", _this.listeners.onMouseUpLoopEnd, false);
    removeListener$2("touchend", _this.listeners.onMouseUpLoopEnd, false);
    removeListener$2("mousemove", _this.listeners.onCursorMoveLoopEnd, false);
    removeListener$2("touchmove", _this.listeners.onCursorMoveLoopEnd, false);

    _this.elements.loopBar.addEventListener("mousedown", _this.listeners.onMouseDown, false);

    _this.elements.loopBar.addEventListener("touchstart", _this.listeners.onMouseDown, {
      passive: true
    }, false);

    if (_this.settings.playAfterResize) {
      if (_this.clip.runTimeInfo.state === "idle") {
        var loopms;

        if (_this.clip.speed >= 0) {
          loopms = _this.settings.loopStartMillisecond + 1;
        } else {
          loopms = _this.settings.loopEndMillisecond - 1;
        }

        _this.settings.needsUpdate = true;

        _this.createJourney(_this.clip, loopms, {
          before: "pause",
          after: "play"
        });
      } else if (_this.clip.runTimeInfo.state === "completed") {
        var _loopms;

        if (_this.clip.speed >= 0) {
          _loopms = _this.settings.loopStartMillisecond + 1;
        } else {
          _loopms = _this.settings.loopEndMillisecond - 1;
        }

        _this.settings.needsUpdate = true;

        _this.createJourney(_this.clip, _loopms, {
          before: "pause",
          after: "play"
        });
      } else {
        _this.clip.play();
      }

      _this.settings.playAfterResize = false;
    }
  };

  _this.listeners.onMouseDownLoopEnd = function (e) {
    _this.elements.listenerHelper.style.pointerEvents = "auto"; // if (!_this.options.pointerEvents) {
    //   pe = true;
    //   _this.elements.settingsPointerEvents.click();
    // }

    _this.settings.resizeLoop = true;
    _this.settings.needsUpdate = true;

    if (_this.clip.runTimeInfo.state === "playing") {
      _this.clip.pause();

      _this.settings.playAfterResize = true;
    }

    e.preventDefault();
    _this.elements.runningBar.style.width = _this.elements.runningBar.offsetWidth + "px";
    _this.elements.loopBar.style.left = _this.elements.loopBar.offsetLeft + "px";
    _this.elements.loopBar.style.width = _this.elements.loopBar.offsetWidth + "px";

    _this.elements.loopBar.removeEventListener("mousedown", _this.listeners.onMouseDown, false);

    _this.elements.loopBar.removeEventListener("touchstart", _this.listeners.onMouseDown, false);

    _this.listeners.onCursorMoveLoopEnd(e);

    addListener$2("mouseup", _this.listeners.onMouseUpLoopEnd, false);
    addListener$2("touchend", _this.listeners.onMouseUpLoopEnd, false);
    addListener$2("mousemove", _this.listeners.onCursorMoveLoopEnd, false);
    addListener$2("touchmove", _this.listeners.onCursorMoveLoopEnd, false);
  };

  _this.elements.loopBarEnd.addEventListener("mousedown", _this.listeners.onMouseDownLoopEnd, false);

  _this.elements.loopBarEnd.addEventListener("touchstart", _this.listeners.onMouseDownLoopEnd, {
    passive: false
  }, false);
};

var loopStartEnd = function loopStartEnd(_this) {
  _this.listeners.editableLoopStartTime = function () {
    _this.elements.editableLoopStartTime.value = _this.elements.loopStartTime.innerHTML;

    _this.elements.loopStartTime.replaceWith(_this.elements.editableLoopStartTime);

    _this.elements.editableLoopStartTime.focus();
  };

  _this.listeners.editableLoopEndTime = function () {
    _this.elements.editableLoopEndTime.value = _this.elements.loopEndTime.innerHTML;

    _this.elements.loopEndTime.replaceWith(_this.elements.editableLoopEndTime);

    _this.elements.editableLoopEndTime.focus();
  };

  _this.elements.editableLoopEndTime.onkeydown = _this.elements.editableLoopStartTime.onkeydown = function (e) {
    e.preventDefault();

    if (e.keyCode === 13) {
      _this.elements.editableLoopStartTime.onfocusout();

      _this.elements.editableLoopEndTime.onfocusout();
    }

    if (e.keyCode === 8) {
      e.target.value = e.target.value.toString().substring(0, e.target.value.toString().length - 1);
    }

    if (e.keyCode === 13) {
      e.target.blur();
    }

    var newValue = parseFloat((e.target.value || 0).toString() + e.key);

    if (newValue > _this.clip.duration) {
      return;
    }

    e.target.value = newValue;

    if (e.target === _this.elements.editableLoopStartTime) {
      var viewportOffset = _this.elements.totalBar.getBoundingClientRect();

      var event = {
        preventDefault: function preventDefault() {},
        clientX: _this.elements.totalBar.offsetWidth / _this.clip.duration * e.target.value + viewportOffset.left
      };

      _this.listeners.onMouseDownLoopStart(event);

      _this.listeners.onCursorMoveLoopStart(event);

      _this.listeners.onMouseUpLoopStart(event);
    } else if (e.target === _this.elements.editableLoopEndTime) {
      var _viewportOffset = _this.elements.totalBar.getBoundingClientRect();

      var _event = {
        preventDefault: function preventDefault() {},
        clientX: _this.elements.totalBar.offsetWidth / _this.clip.duration * e.target.value + _viewportOffset.left
      };

      _this.listeners.onMouseDownLoopEnd(_event);

      _this.listeners.onCursorMoveLoopEnd(_event);

      _this.listeners.onMouseUpLoopEnd(_event);
    }
  };

  _this.elements.loopStartTime.onclick = _this.listeners.editableLoopStartTime;
  _this.elements.loopEndTime.onclick = _this.listeners.editableLoopEndTime;

  _this.elements.editableLoopStartTime.onfocusout = function () {
    _this.elements.editableLoopStartTime.replaceWith(_this.elements.loopStartTime);
  };

  _this.elements.editableLoopEndTime.onfocusout = function () {
    _this.elements.editableLoopEndTime.replaceWith(_this.elements.loopEndTime);
  };
};

var addListener$3 = helpers.addListener,
    removeListener$3 = helpers.removeListener;

var progressBar = function progressBar(_this) {
  // let pe = false;
  _this.listeners.onCursorMove = function (e) {
    e.preventDefault();
    var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;

    var viewportOffset = _this.elements.loopBar.getBoundingClientRect();

    var positionX = clientX - viewportOffset.left;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.loopBar.offsetWidth) {
      positionX = _this.elements.loopBar.offsetWidth;
    }

    _this.handleDrag(positionX);
  };

  _this.listeners.onMouseUp = function () {
    _this.elements.listenerHelper.style.pointerEvents = "none";
    removeListener$3("mouseup", _this.listeners.onMouseUp, false);
    removeListener$3("touchend", _this.listeners.onMouseUp, false);
    removeListener$3("mousemove", _this.listeners.onCursorMove, false);
    removeListener$3("touchmove", _this.listeners.onCursorMove, false);

    _this.handleDragEnd(_this.settings);
  };

  _this.listeners.onMouseDown = function (e) {
    _this.elements.listenerHelper.style.pointerEvents = "auto";

    if (_this.clip.runTimeInfo.state === "playing") {
      _this.settings.playAfterResize = true;
    }

    _this.handleDragStart(_this.clip);

    _this.listeners.onCursorMove(e);

    addListener$3("mouseup", _this.listeners.onMouseUp, false);
    addListener$3("touchend", _this.listeners.onMouseUp, false);
    addListener$3("mousemove", _this.listeners.onCursorMove, false);
    addListener$3("touchmove", _this.listeners.onCursorMove, false);
  };

  _this.elements.loopBar.addEventListener("mousedown", _this.listeners.onMouseDown, false);

  _this.elements.loopBar.addEventListener("touchstart", _this.listeners.onMouseDown, {
    passive: false
  }, false);
};

var statusBtn = function statusBtn(_this) {
  _this.elements.statusButton.onclick = function (e) {
    e.preventDefault(); // console.log(_this.clip);

    if (_this.clip.runTimeInfo.state === "playing") {
      _this.clip.pause();
    } else if (_this.clip.runTimeInfo.state === "paused" || _this.clip.runTimeInfo.state === "idle" || _this.clip.runTimeInfo.state === "transitional" || _this.clip.runTimeInfo.state === "armed") {
      _this.clip.play();
    } //not working below this
    else if (_this.clip.runTimeInfo.state === "idle") {
        if (_this.clip.speed >= 0) {
          _this.clip.play();

          _this.settings.needsUpdate = true;
        } else {
          _this.createJourney(_this.clip, _this.settings.loopEndMillisecond - 1, {
            before: "pause",
            after: "play"
          });

          _this.settings.needsUpdate = true;
        }
      } else if (_this.clip.runTimeInfo.state === "completed") {
        if (_this.clip.speed >= 0) {
          _this.createJourney(_this.clip, 0, {
            before: "pause",
            after: "play"
          });

          _this.settings.needsUpdate = true;
        } else {
          _this.createJourney(_this.clip, _this.settings.loopEndMillisecond - 1, {
            before: "pause",
            after: "play"
          });

          _this.settings.needsUpdate = true;
        }
      }

    return false;
  };
};

var elid$2 = helpers.elid,
    addListener$4 = helpers.addListener,
    removeListener$4 = helpers.removeListener;

var settings = function settings(_this) {
  _this.elements.settingsShowIndicator.onclick = function (e) {
    e.preventDefault();
    var checkbox = elid$2("".concat(_this.name, "-show-indicator-checkbox"));

    if (checkbox.checked) {
      checkbox.checked = false;
      _this.elements.indicator.style.visibility = "hidden";
    } else {
      checkbox.checked = true;
      _this.elements.indicator.style.visibility = "visible";
    }
  };

  _this.elements.settingsPointerEvents.onclick = function (e) {
    e.preventDefault();
    var checkbox = elid$2("".concat(_this.name, "-pointer-events-checkbox"));

    if (checkbox.checked) {
      checkbox.checked = false;
      _this.options.pointerEvents = false;
      _this.elements.mcPlayer.style.pointerEvents = "none";
      _this.elements.pointerEventPanel.style.pointerEvents = "none";
      elid$2("".concat(_this.name, "-controls")).style.pointerEvents = "auto";
      _this.elements.settingsPanel.style.pointerEvents = "auto";
    } else {
      checkbox.checked = true;
      _this.elements.mcPlayer.style.pointerEvents = "none";
      _this.elements.pointerEventPanel.style.pointerEvents = "auto";
      elid$2("".concat(_this.name, "-controls")).style.pointerEvents = "auto";
      _this.elements.settingsPanel.style.pointerEvents = "auto";
    }
  };

  _this.elements.settingsShowVolume.onclick = function (e) {
    e.preventDefault();

    _this.elements.volumeControl.classList.toggle("".concat(_this.name, "-volume-width-transition"));

    _this.elements.volumeControl.classList.toggle("".concat(_this.name, "-hide"));

    var checkbox = elid$2("".concat(_this.name, "-show-volume-checkbox"));

    if (checkbox.checked) {
      checkbox.checked = false;
      _this.elements.volumeControl.style.visibility = "hidden";
      _this.elements.timeDisplay.style.left = "45px";
    } else {
      checkbox.checked = true;
      _this.elements.volumeControl.style.visibility = "visible";
      _this.elements.timeDisplay.style.left = "";
    }
  };

  _this.elements.settingsShowPreview.onclick = function (e) {
    e.preventDefault();
    var checkbox = elid$2("".concat(_this.name, "-show-preview-checkbox"));

    if (checkbox.checked) {
      checkbox.checked = false;
      elid$2("".concat(_this.name, "-hover-display")).style.visibility = "hidden";
      elid$2("".concat(_this.name, "-hover-display")).style.display = "none";
      _this.options.preview = false;
    } else {
      if (!_this.previewClip) {
        _this.createPreviewDisplay();
      }

      checkbox.checked = true;
      elid$2("".concat(_this.name, "-hover-display")).style.visibility = "visible";
      elid$2("".concat(_this.name, "-hover-display")).style.display = "flex";
      _this.options.preview = true;
    }
  };

  _this.elements.settingsButton.onclick = function (e) {
    e.preventDefault();
    var controlsEl = elid$2("".concat(_this.name, "-controls"));

    var showHideSettings = function showHideSettings(e) {
      if (_this.elements.settingsPanel.contains(e.target)) {
        return true;
      }

      _this.elements.settingsPanel.classList.toggle("".concat(_this.name, "-hide"));

      _this.elements.settingsPanel.classList.toggle("m-fadeOut");

      _this.elements.settingsPanel.classList.toggle("m-fadeIn");

      if (_this.elements.settingsPanel.className.includes("m-fadeOut")) {
        removeListener$4("click", showHideSettings, false);

        _this.eventBroadcast("state-change", _this.state);
      }
    };

    if (_this.elements.settingsPanel.className.includes("m-fadeOut")) {
      if (!controlsEl.classList.value.includes("force-show-controls")) {
        controlsEl.classList.toggle("force-show-controls");
      }

      addListener$4("click", showHideSettings, false);
    } else {
      removeListener$4("click", showHideSettings, false);
    }
  };
};

var elid$3 = helpers.elid,
    addListener$5 = helpers.addListener,
    removeListener$5 = helpers.removeListener;
var speed = {
  add: function add(_this) {
    // const pe = false;
    _this.elements.settingsSpeedButtonShow.onclick = _this.elements.settingsSpeedButtonHide.onclick = function (e) {
      e.preventDefault();

      _this.elements.settingsPanel.classList.toggle("".concat(_this.name, "-settings-speed-panel"));

      var includesClass = _this.elements.settingsPanel.className.includes("".concat(_this.name, "-settings-speed-panel"));

      if (includesClass) {
        _this.elements.settingsMainPanel.style.display = "none";
        _this.elements.settingsSpeedPanel.style.display = "block";
      } else {
        _this.elements.settingsSpeedPanel.style.display = "none";
        _this.elements.settingsMainPanel.style.display = "block";
      }
    };

    var onCursorMoveSpeedBar = function onCursorMoveSpeedBar(e) {
      e.preventDefault();

      var viewportOffset = _this.elements.speedBar.getBoundingClientRect();

      var clientY = e.clientY || ((e.touches || [])[0] || {}).clientY;
      var positionY = clientY - viewportOffset.top;
      positionY -= 8;

      if (positionY < 0) {
        positionY = 0;
      } else if (positionY > _this.elements.speedBar.offsetHeight - 16) {
        positionY = _this.elements.speedBar.offsetHeight - 16;
      }

      positionY = Math.floor(positionY); // show speed

      var percentage = (positionY / ((_this.options.speedValues.length - 1) * 16) - 1) * -1;
      var step = 1 / (_this.options.speedValues.length - 1);

      var speed = _this.calculateSpeed(step, _this.options.speedValues, percentage);

      elid$3("".concat(_this.name, "-speed-runtime")).innerHTML = speed + "0";
      elid$3("".concat(_this.name, "-speed-cursor")).style.top = positionY + "px";
      _this.clip.executionSpeed = speed;

      _this.eventBroadcast("speed-change", _this.clip.executionSpeed);
    };

    var onMouseUpSpeedBar = function onMouseUpSpeedBar(e) {
      // if (pe) {
      //   _this.elements.settingsPointerEvents.click();
      // }
      _this.elements.listenerHelper.style.pointerEvents = "none";
      e.preventDefault();
      removeListener$5("mouseup", onMouseUpSpeedBar, false);
      removeListener$5("touchend", onMouseUpSpeedBar, false);
      removeListener$5("mousemove", onCursorMoveSpeedBar, false);
      removeListener$5("touchmove", onCursorMoveSpeedBar, false);
      elid$3("".concat(_this.name, "-speed-runtime")).innerHTML = "Speed";
      var speedDisplay;
      _this.clip.speed == 1 ? speedDisplay = "Normal" : speedDisplay = _this.clip.speed;
      _this.elements.speedCurrent.innerHTML = speedDisplay;
    };

    var onMouseDownSpeedBar = function onMouseDownSpeedBar(e) {
      // if (!_this.options.pointerEvents) {
      //   pe = true;
      //   _this.elements.settingsPointerEvents.click();
      // }
      _this.elements.listenerHelper.style.pointerEvents = "auto";
      e.preventDefault();
      onCursorMoveSpeedBar(e);
      addListener$5("mouseup", onMouseUpSpeedBar, false);
      addListener$5("touchend", onMouseUpSpeedBar, false);
      addListener$5("mousemove", onCursorMoveSpeedBar, false);
      addListener$5("touchmove", onCursorMoveSpeedBar, false);
    };

    _this.elements.speedBarHelper.addEventListener("mousedown", onMouseDownSpeedBar, false);

    _this.elements.speedBarHelper.addEventListener("touchstart", onMouseDownSpeedBar, {
      passive: false
    }, false);
  },
  trigger: function trigger(_this, speed) {
    speed = parseFloat(speed) || 1;

    _this.eventBroadcast("speed-change", speed);

    var speedDisplay;
    speed == 1 ? speedDisplay = "Normal" : speedDisplay = speed;
    _this.clip.executionSpeed = speed;
    _this.elements.speedCurrent.innerHTML = speedDisplay;
  }
};

var elid$4 = helpers.elid;

var trigger = function trigger(_this) {
  _this.settings.loopActivated = !_this.settings.loopActivated;

  _this.eventBroadcast("loop-change", _this.settings.loopActivated);

  _this.elements.loopButton.classList.toggle("svg-selected");

  _this.elements.loopBarStart.classList.toggle("m-fadeOut");

  _this.elements.loopBarEnd.classList.toggle("m-fadeOut");

  _this.elements.loopBarStart.classList.toggle("m-fadeIn");

  _this.elements.loopBarStart.classList.toggle("".concat(_this.name, "-hide"));

  _this.elements.loopBarEnd.classList.toggle("m-fadeIn");

  _this.elements.loopBarEnd.classList.toggle("".concat(_this.name, "-hide"));

  elid$4("".concat(_this.name, "-loop-time")).classList.toggle("m-fadeOut");
  elid$4("".concat(_this.name, "-loop-time")).classList.toggle("m-fadeIn");
  elid$4("".concat(_this.name, "-loop-time")).classList.toggle("".concat(_this.name, "-hide"));
  _this.elements.loopEndTime.innerHTML = _this.settings.loopEndMillisecond;
  _this.elements.loopStartTime.innerHTML = _this.settings.loopStartMillisecond;
  _this.settings.needsUpdate = true;

  if (!_this.settings.loopActivated) {
    _this.elements.loopBar.style.left = "0%";
    _this.elements.loopBar.style.width = "100%";
    _this.settings.loopStartMillisecond = 0;
    _this.settings.loopEndMillisecond = _this.clip.duration;
    _this.settings.loopLastPositionXPxls = 0;
    _this.settings.loopLastPositionXPercentage = 0;
    _this.elements.runningBar.style.width = _this.clip.runTimeInfo.currentMillisecond / _this.clip.duration * 100 + "%";
  }
};

var loopBtn = {
  trigger: trigger,
  add: function add(_this) {
    _this.elements.loopButton.onclick = function () {
      return trigger(_this);
    };
  }
};

var elid$5 = helpers.elid;

var controls = function controls(_this) {
  elid$5("".concat(_this.name, "-controls")).onmouseover = function () {
    if (!_this.settings.loopActivated) {
      return;
    }

    _this.elements.loopBarStart.classList.remove("m-fadeOut");

    _this.elements.loopBarEnd.classList.remove("m-fadeOut");

    _this.elements.loopBarStart.classList.add("m-fadeIn");

    _this.elements.loopBarEnd.classList.add("m-fadeIn");
  };

  elid$5("".concat(_this.name, "-controls")).onmouseout = function (event) {
    var e = event.toElement || event.relatedTarget || event.target;

    if (isDescendant$1(this, e) || e === this) {
      return;
    }

    if (!_this.settings.loopActivated) {
      return;
    }

    _this.elements.loopBarStart.classList.add("m-fadeOut");

    _this.elements.loopBarEnd.classList.add("m-fadeOut");

    _this.elements.loopBarStart.classList.remove("m-fadeIn");

    _this.elements.loopBarEnd.classList.remove("m-fadeIn");
  };

  var twt = false;

  elid$5("".concat(_this.name, "-controls")).ontouchstart = function (event) {
    var e = event.toElement || event.relatedTarget || event.target;

    if (isDescendant$1(_this.elements.statusButton, e) || e === _this.elements.statusButton || isDescendant$1(_this.elements.settingsButton, e) || e === _this.elements.settingsButton || isDescendant$1(_this.elements.fullScreenButton, e) || e === _this.elements.fullScreenButton || isDescendant$1(_this.elements.loopButton, e) || e === _this.elements.loopButton || isDescendant$1(_this.elements.totalBar, e) || e === _this.elements.totalBar) {
      return;
    }

    _this.elements.volumeControl.className = "".concat(_this.name, "-volume-width-transition");
    _this.elements.volumeBar.className = "".concat(_this.name, "-volume-width-transition");
    _this.elements.volumeBarHelper.className = "".concat(_this.name, "-volume-width-transition");
    _this.elements.timeDisplay.className = "".concat(_this.name, "-time-width-transition");
    _this.elements.volumeCursor.className = "".concat(_this.name, "-volume-cursor-transition");
    twt = true;
  };

  window.addEventListener("touchstart", function (event) {
    var e = event.toElement || event.relatedTarget || event.target;

    if (isDescendant$1(elid$5("".concat(_this.name, "-controls")), e) || e === elid$5("".concat(_this.name, "-controls"))) {
      return;
    }

    if (twt) {
      _this.elements.volumeControl.className = "";
      _this.elements.volumeBar.className = "";
      _this.elements.volumeBarHelper.className = "";
      _this.elements.timeDisplay.className = "";
      _this.elements.volumeCursor.className = "";
    }
  }); // elid(`${_this.name}-left-controls`).ontouchstart = function (event) {
  //   const e = event.toElement || event.relatedTarget || event.target;
  //     if (isDescendant(_this.elements.statusBtn, e) || e === _this.elements.statusBtn) {
  //       return false;
  //     }
  //     return "";
  // };
};

function isDescendant$1(parent, child) {
  var node = child.parentNode;

  while (node != null) {
    if (node == parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

var fullscreen = function fullscreen(_this) {
  _this.elements.fullScreenButton.addEventListener("click", function () {
    var elFullScreen = _this.clip.props.host.className.includes("full-screen");

    _this.clip.props.host !== _this.options.host && !elFullScreen ? _this.clip.props.host.appendChild(_this.elements.mcPlayer) : null;
    _this.clip.props.host !== _this.options.host && elFullScreen ? _this.options.host.appendChild(_this.elements.mcPlayer) : null;
    elFullScreen ? _this.exitFullscreen() : _this.launchIntoFullscreen(_this.clip.props.host);
  });
};

var createUID = helpers.createUID;

var donkeyclip = function donkeyclip(_this) {
  _this.elements.donkeyclipButton.addEventListener("click", function () {
    var u = createUID();
    var popupDC = window.open("https://donkeyclip.com?u=".concat(u));

    var definition = _this.clip.exportDefinition();

    var clipClass = _this.clipClass;
    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event) {
      if (event.data === u) {
        popupDC.postMessage(JSON.stringify({
          definition: definition,
          clipClass: clipClass,
          u: u
        }), "*");
      }
    }
  });
};

var elid$6 = helpers.elid,
    addListener$6 = helpers.addListener,
    removeListener$6 = helpers.removeListener;

var preview = function preview(_this) {
  // only on desctop devices
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    var loopBarMouseInOut = function loopBarMouseInOut() {
      if (!_this.options.preview) {
        return;
      }

      elid$6("".concat(_this.name, "-hover-display")).classList.toggle("m-fadeIn");
      elid$6("".concat(_this.name, "-hover-display")).classList.toggle("m-fadeOut"); // elid(`${_this.name}-hover-display`).classList.toggle(
      //   `${_this.name}-hide`
      // );
      // if (elid(`${_this.name}-hover-display`).className.includes(`m-fadeIn`)) {
      //   _this.previewJourney = hoverTimeCapsule.startJourney(_this.previewClip);
      // } else {
      //   _this.previewJourney.destination();
      // }

      _this.elements.loopBar.onmousemove = loopBarMouseMove;
    };

    var loopBarAddListeners = function loopBarAddListeners() {
      if (!_this.options.preview) {
        return;
      }

      loopBarMouseInOut();
      _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;
      _this.elements.loopBar.onmousemove = loopBarMouseMove;
      removeListener$6("mouseup", loopBarAddListeners, false);
      removeListener$6("touchend", loopBarAddListeners, false);
      removeListener$6("mousemove", loopBarMouseMove, false);
      removeListener$6("touchmove", loopBarMouseMove, false);
    };

    _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;

    _this.elements.loopBar.onmousedown = function () {
      if (!_this.options.preview) {
        return;
      }

      _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = null;
      _this.elements.loopBar.onmousemove = null;
      addListener$6("mouseup", loopBarAddListeners, false);
      addListener$6("touchend", loopBarAddListeners, false);
      addListener$6("mousemove", loopBarMouseMove, false);
      addListener$6("touchmove", loopBarMouseMove, false);
    };

    _this.elements.loopBar.onmouseup = function () {
      if (!_this.options.preview) {
        return;
      }

      removeListener$6("mouseup", loopBarAddListeners, false);
      removeListener$6("touchend", loopBarAddListeners, false);
      removeListener$6("mousemove", loopBarMouseMove, false);
      removeListener$6("touchmove", loopBarMouseMove, false);
      _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;
      _this.elements.loopBar.onmousemove = loopBarMouseMove;
    };

    var loopBarMouseMove = function loopBarMouseMove(e) {
      var clientX = e.clientX;

      var viewportOffset = _this.elements.loopBar.getBoundingClientRect();

      if (clientX - viewportOffset.left + _this.settings.loopLastPositionXPxls > _this.settings.loopLastPositionXPxls + _this.elements.loopBar.offsetWidth && !_this.settings.resizeLoop) {
        elid$6("".concat(_this.name, "-hover-millisecond")).innerHTML = _this.settings.loopEndMillisecond;
        return;
      } else if (clientX - viewportOffset.left < 0 && !_this.settings.resizeLoop) {
        elid$6("".concat(_this.name, "-hover-millisecond")).innerHTML = _this.settings.loopStartMillisecond;
        return;
      }

      var positionX = clientX - viewportOffset.left + _this.settings.loopLastPositionXPxls;

      if (positionX < 0) {
        positionX = 0;
      }

      var previewWidth = elid$6("".concat(_this.name, "-hover-display")).offsetWidth * _this.previewScale;

      var halfPreviewWidth = previewWidth / 2;
      var clipWidth = elid$6("".concat(_this.name, "-hover-display")).offsetWidth;
      var halfClipWidth = clipWidth / 2; // console.log(
      //   elid(`${_this.name}-hover-display`).offsetWidth,
      //   _this.previewScale,
      //   positionX,
      //   clipWidth,
      //   halfClipWidth,
      //   previewWidth,
      //   halfPreviewWidth
      // );

      var left = positionX - halfClipWidth; // console.log(left, halfClipWidth);

      if (positionX - halfPreviewWidth < 0) {
        left = 0 - (previewWidth + halfPreviewWidth);
      } else if (positionX + halfPreviewWidth > _this.elements.totalBar.offsetWidth) {
        left = _this.elements.totalBar.offsetWidth - halfClipWidth - halfPreviewWidth;
      }

      var ms = Math.round(positionX / _this.elements.totalBar.offsetWidth * _this.clip.duration);

      if (_this.options.preview) {
        var fraction = ms / _this.clip.duration;

        _this.previewClip.onProgress(fraction, ms);
      }

      elid$6("".concat(_this.name, "-hover-millisecond")).innerHTML = ms;
      elid$6("".concat(_this.name, "-hover-display")).style.left = left + "px";
    };
  }
};

var el = helpers.el,
    elid$7 = helpers.elid;

var body = function body(_this) {
  document.addEventListener("fullscreenchange", function () {
    _this.elements.mcPlayer.classList.toggle("full-screen");

    _this.clip.props.host.classList.toggle("full-screen");

    if (_this.options.preview) {
      _this.setPreviewDimentions();
    }
  });
  document.addEventListener("webkitfullscreenchange", function () {
    _this.elements.mcPlayer.classList.toggle("full-screen");

    _this.clip.props.host.classList.toggle("full-screen");

    if (_this.options.preview) {
      _this.setPreviewDimentions();
    }
  });
  document.addEventListener("mozfullscreenchange", function () {
    _this.elements.mcPlayer.classList.toggle("full-screen");

    _this.clip.props.host.classList.toggle("full-screen");

    if (_this.options.preview) {
      _this.setPreviewDimentions();
    }
  });
  document.addEventListener("MSFullscreenChange", function () {
    _this.elements.mcPlayer.classList.toggle("full-screen");

    _this.clip.props.host.classList.toggle("full-screen");

    if (_this.options.preview) {
      _this.setPreviewDimentions();
    }
  });
  el("body")[0].addEventListener("click", function (e) {
    if (e.target.className === "".concat(_this.name, "-speed-value")) {
      var speedDisplay = e.target.dataset.speedValue - 0;
      _this.clip.executionSpeed = e.target.dataset.speedValue;
      _this.clip.speed == 1 ? speedDisplay = "Normal" : speedDisplay = _this.clip.speed;
      _this.elements.speedCurrent.innerHTML = speedDisplay;
      var step = 1 / (_this.options.speedValues.length - 1);
      var positionY = (e.target.dataset.zone * step - 1) * -1 * ((_this.options.speedValues.length - 1) * 16);
      elid$7("".concat(_this.name, "-speed-cursor")).style.top = positionY + "px";
    }
  });
};

var timeCapsule = new motorcortex__default['default'].TimeCapsule();
var elid$8 = helpers.elid,
    eltag = helpers.eltag,
    elcreate$1 = helpers.elcreate,
    calcClipScale = helpers.calcClipScale;
/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident
 * (such as a Scene or a Clip) can both privide info regarding their timing
 * state but also provide an interface for interacting/altering the timing of it
 */

var Player = /*#__PURE__*/function () {
  function Player(options) {
    var _this = this;

    _classCallCheck(this, Player);

    // set defaults
    options.id = options.id || Date.now();
    options.preview = options.preview || false;
    options.showVolume = options.showVolume || false;
    options.showIndicator = options.showIndicator || false;
    options.theme = options.theme || "transparent on-top";
    options.host = options.host || options.clip.props.host;
    options.buttons = options.buttons || {};
    options.timeFormat = options.timeFormat || "ss";
    options.backgroundColor = options.backgroundColor || "transparent";
    options.scaleToFit = options.scaleToFit || false;

    if (options.pointerEvents === undefined || options.pointerEvents === null) {
      options.pointerEvents = true;
    } else {
      options.pointerEvents = Boolean(options.pointerEvents);
    }

    options.onMillisecondChange = options.onMillisecondChange || null;
    options.speedValues = options.speedValues || [-2, -1, -0.5, 0, 0.5, 1, 2];
    options.muted = options.muted || false;
    options.controls = options.controls == false ? false : true;
    options.loop = options.loop || false;
    options.volume = typeof options.volume !== "undefined" ? options.volume : 1;
    options.currentScript = options.currentScript || null; // remove strings

    for (var i in options.speedValues) {
      if (!isFinite(options.speedValues[i])) {
        options.speedValues.splice(i, 1);
      }
    }

    options.speedValues.sort(function (a, b) {
      return a - b;
    });
    this.className = config.name;
    config.playerName = options.id;
    this.options = options;
    this.id = this.options.id;
    this.name = config.name;
    this.previewClip = null;
    this.clip = options.clip; // host to apply the timer

    this.clipClass = options.clipClass;
    this.state = this.clip.runTimeInfo.state;
    this.listeners = {};
    this.previewScale = 0.25;
    this.settings = {
      volume: 1,
      journey: null,
      previousVolume: 1,
      volumeMute: false,
      needsUpdate: true,
      resizeLoop: false,
      loopJourney: false,
      previewJourney: null,
      loopActivated: false,
      requestingLoop: false,
      playAfterResize: false,
      loopStartMillisecond: 0,
      loopLastPositionXPxls: 0,
      loopLastPositionXPercentage: 0,
      loopEndMillisecond: this.clip.duration,
      controls: true
    };
    this.functions = {
      millisecondChange: this.millisecondChange,
      createJourney: this.createJourney,
      changeSettings: this.changeSettings,
      createLoop: this.createLoop
    }; // create the timer controls main div

    setElements(this);
    this.setTheme();
    this.setSpeed();
    this.subscribeToTimer();
    this.subscribeToDurationChange();
    this.addEventListeners();
    this.scaleClipHost();
    this.eventBroadcast("state-change", this.state);

    if (this.options.preview) {
      this.createPreviewDisplay();
    }

    this.resizeTimeout = setTimeout(function () {}, 20);
    window.addEventListener("resize", function () {
      clearTimeout(_this.resizeTimeout);
      _this.resizeTimeout = setTimeout(function () {
        if (_this.options.preview) {
          _this.setPreviewDimentions();
        }

        if (_this.options.scaleToFit) {
          _this.scaleClipHost();
        }
      }, 20);
    });
    this.changeSettings(options, true);
  }

  _createClass(Player, [{
    key: "changeSettings",
    value: function changeSettings(newOptions, initial) {
      // if (newOptions.controls === false) {
      //   elid(this.name).style.display = "none";
      // } else if (this.options.controls === true) {
      //   elid(this.name).style.display = "unset";
      // }
      // if (typeof newOptions.volume !== "undefined") {
      //   volumeListener.trigger(this, newOptions.volume, undefined);
      // }
      // if (newOptions.muted === true) {
      //   volumeListener.trigger(this, undefined, newOptions.muted);
      // }
      if (newOptions.controls === false) {
        elid$8(this.name).style.display = "none";
      } else if (newOptions.controls === true) {
        elid$8(this.name).style.display = "unset";
      }

      if (typeof newOptions.loop !== "undefined" && (this.options.loop !== newOptions.loop || initial && this.options.loop)) {
        loopBtn.trigger(this);
      }

      if (typeof newOptions.muted !== "undefined" && (this.options.muted !== newOptions.muted || initial && this.options.muted)) {
        volume.trigger(this, undefined, newOptions.mute);
      }

      if (typeof newOptions.volume !== "undefined" && (this.options.volume !== newOptions.volume || initial && this.options.volume)) {
        volume.trigger(this, newOptions.volume, undefined);
      }

      if (typeof newOptions.speed !== "undefined" && (this.options.speed !== newOptions.speed || initial && this.options.speed)) {
        speed.trigger(this, newOptions.speed);
      }

      if (typeof newOptions.scaleToFit !== "undefined" && (this.options.scaleToFit !== newOptions.scaleToFit || initial && this.options.scaleToFit)) {
        this.scaleClipHost();
      }

      this.options = _objectSpread2(_objectSpread2({}, this.options), newOptions);
    }
  }, {
    key: "scaleClipHost",
    value: function scaleClipHost() {
      if (this.options.scaleToFit) {
        var transform = calcClipScale(this.clip.props.containerParams, {
          width: this.clip.props.host.offsetWidth,
          height: this.clip.props.host.offsetHeight
        });
        this.clip.realClip.rootElement.style.transform = "scale(".concat(transform.scale);
        this.clip.realClip.rootElement.style.left = transform.position.left + "px";
        this.clip.realClip.rootElement.style.top = transform.position.top + "px";
      } else {
        this.clip.realClip.rootElement.style.transform = "scale(1)";
        this.clip.realClip.rootElement.style.left = "0px";
        this.clip.realClip.rootElement.style.top = "0px";
      }

      this.eventBroadcast("scale-change", this.options.scaleToFit);
    }
  }, {
    key: "createLoop",
    value: function createLoop(msStart, msEnd) {
      this.settings.loopStartMillisecond = msStart;
      this.settings.loopEndMillisecond = msEnd;
      this.elements.loopBar.style.left = msStart / this.clip.duration * 100 + "%";
      this.elements.loopBar.style.width = (msEnd - msStart) / this.clip.duration * 100 + "%";
      this.createJourney(this.clip, msStart);
      this.elements.runningBar.style.width = "0%";
      !this.settings.loopActivated && this.activateLoop(false);
    }
  }, {
    key: "createJourney",
    value: function createJourney(clip, millisecond) {
      var _this2 = this;

      var clipCommands = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      setTimeout(function () {
        var def = null;
        var _clipCommands$before = clipCommands.before,
            before = _clipCommands$before === void 0 ? def : _clipCommands$before,
            _clipCommands$after = clipCommands.after,
            after = _clipCommands$after === void 0 ? def : _clipCommands$after;
        before ? clip[before]() : null;
        _this2.settings.journey = timeCapsule.startJourney(clip);

        _this2.settings.journey.station(millisecond);

        _this2.settings.journey.destination();

        after ? clip[after]() : null;
      }, 0);
    }
  }, {
    key: "millisecondChange",
    value: function millisecondChange(millisecond, state, roundTo, makeJouney) {
      var executeOnMillisecondChange = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      if (this.state !== state) {
        this.state = state;
        this.eventBroadcast("state-change", state);
      }

      if (!this.settings.needsUpdate) {
        this.clip.pause();
        return 1;
      }

      var clip = this.clip;
      var _this$settings = this.settings,
          loopActivated = _this$settings.loopActivated,
          loopEndMillisecond = _this$settings.loopEndMillisecond,
          loopStartMillisecond = _this$settings.loopStartMillisecond;
      var duration = this.clip.duration;
      var _this$elements = this.elements,
          totalBar = _this$elements.totalBar,
          loopBar = _this$elements.loopBar;
      var loopBarWidth = loopBar.offsetWidth;
      var loopBarLeft = loopBar.offsetLeft / totalBar.offsetWidth;
      var localMillisecond = millisecond - duration * loopBarLeft;
      var localDuration = duration / totalBar.offsetWidth * loopBarWidth;

      if (millisecond >= loopEndMillisecond && loopActivated && this.clip.speed >= 0) {
        this.createJourney(clip, loopStartMillisecond + 1, {
          after: this.settings.playAfterResize || this.clip.runTimeInfo.state == "playing" ? "play" : null
        });
        return 1;
      } else if (millisecond >= loopEndMillisecond && loopActivated && this.clip.speed < 0) {
        this.createJourney(clip, loopEndMillisecond - 1, {
          after: this.settings.playAfterResize || this.clip.runTimeInfo.state == "playing" ? "play" : null
        });
        return 1;
      } else if (millisecond <= loopStartMillisecond && loopActivated && this.clip.speed >= 0) {
        this.createJourney(clip, loopStartMillisecond + 1, {
          after: this.settings.playAfterResize || this.clip.runTimeInfo.state == "playing" ? "play" : null
        });
        return 1;
      } else if (millisecond <= loopStartMillisecond && loopActivated && this.clip.speed < 0) {
        this.createJourney(clip, loopEndMillisecond - 1, {
          after: this.settings.playAfterResize || this.clip.runTimeInfo.state == "playing" ? "play" : null
        });
        return 1;
      }

      if (makeJouney) {
        this.createJourney(clip, millisecond, {
          after: this.settings.playAfterResize ? "play" : null
        });
      }

      this.elements.runningBar.style.width = localMillisecond / localDuration * 100 + "%";
      this.elements.currentTime.innerHTML = this.timeFormat(millisecond);

      if (this.options.onMillisecondChange && executeOnMillisecondChange) {
        this.options.onMillisecondChange(millisecond);
      }
    }
  }, {
    key: "eventBroadcast",
    value: function eventBroadcast(eventName, state) {
      var controlsEl = elid$8("".concat(this.name, "-controls"));

      if (eventName === "state-change") {
        if (this.options.currentScript) {
          this.options.currentScript.dataset.status = state;
        }

        if (state === "paused" || state === "idle" || state === "transitional" || state === "armed" || state === "blocked") {
          if (!controlsEl.classList.value.includes("force-show-controls")) {
            controlsEl.classList.toggle("force-show-controls");
          }

          this.elements.statusButton.innerHTML = svg_1.playSVG;
          this.elements.statusButton.appendChild(this.elements.indicator);
          this.elements.indicator.innerHTML = "".concat(state.charAt(0).toUpperCase() + state.slice(1));

          if (state === "blocked") {
            this.elements.pointerEventPanel.innerHTML = "\n            <div style=\"width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;\">".concat(svg_1.loadingSVG, "</div>");
          }
        } else {
          if (controlsEl.classList.value.includes("force-show-controls")) {
            controlsEl.classList.toggle("force-show-controls");
          }

          this.elements.statusButton.innerHTML = svg_1.pauseSVG;
          this.elements.statusButton.appendChild(this.elements.indicator);
          this.elements.indicator.innerHTML = "Playing";
          this.elements.pointerEventPanel.innerHTML = "";

          if (state === "playing" && this.clip.runTimeInfo.currentMillisecond === this.clip.duration && this.clip.speed >= 0) {
            this.createJourney(this.clip, 1, {
              after: "play"
            });
          } else if (state === "playing" && this.clip.runTimeInfo.currentMillisecond === 0 && this.clip.speed < 0) {
            this.createJourney(this.clip, this.clip.duration - 1, {
              after: "play"
            });
          } else if (state === "playing" && this.clip.runTimeInfo.currentMillisecond === this.clip.duration && this.clip.speed < 0) {
            this.createJourney(this.clip, this.clip.duration - 1, {
              after: "play"
            });
          }
        }
      } else if (eventName === "duration-change") {
        this.elements.totalTime.innerHTML = this.timeFormat(this.clip.duration);
        this.settings.loopEndMillisecond = this.clip.duration;
        this.elements.pointerEventPanel.innerHTML = "";
        this.millisecondChange(this.clip.runTimeInfo.currentMillisecond);
      } else if (this.options.currentScript) {
        if (eventName === "volume-change") {
          this.options.volume = state;
          this.options.currentScript.dataset.volume = state;
        } else if (eventName === "speed-change") {
          this.options.speed = state;
          this.options.currentScript.dataset.speed = state;
        } else if (eventName === "mute-change") {
          if (state) {
            this.options.muted = true;
            this.options.currentScript.dataset.muted = "";
          } else {
            this.options.muted = false;
            delete this.options.currentScript.dataset.muted;
          }
        } else if (eventName === "loop-change") {
          if (state) {
            this.options.loop = true;
            this.options.currentScript.dataset.loop = "";
          } else {
            this.options.loop = false;
            delete this.options.currentScript.dataset.loop;
          }
        } else if (eventName === "scale-change") {
          if (state) {
            this.options.scaleToFit = true;
            this.options.currentScript.dataset["scale-to-fit"] = "";
          } else {
            this.options.scaleToFit = false;
            delete this.options.currentScript.dataset["scale-to-fit"];
          }
        }
      }
    }
  }, {
    key: "subscribeToDurationChange",
    value: function subscribeToDurationChange() {
      this.clip.subscribeToDurationChange(this.subscribeToDurationChangeCallback.bind(this));
    }
  }, {
    key: "subscribeToDurationChangeCallback",
    value: function subscribeToDurationChangeCallback()
    /*newDuration*/
    {
      this.eventBroadcast("duration-change");
    }
  }, {
    key: "subscribeToTimer",
    value: function subscribeToTimer() {
      this.clip.subscribe(this.id, this.millisecondChange.bind(this));
    }
  }, {
    key: "handleDragStart",
    value: function handleDragStart() {
      this.settings.needsUpdate = true;
      this.settings.journey = timeCapsule.startJourney(this.clip);
    }
  }, {
    key: "timeFormat",
    value: function timeFormat(ms) {
      if (this.options.timeFormat === "ss") {
        var hours = ms / 1000 / 60 / 60;
        var minutes = hours % 1 * 60;
        var seconds = minutes % 1 * 60;
        var h = ("0" + parseInt(hours)).slice(-2);
        var m = ("0" + parseInt(minutes)).slice(-2);
        var s = ("0" + parseInt(seconds)).slice(-2);
        return "".concat(h === "00" ? "" : h + ":").concat(m, ":").concat(s);
      } else {
        return ms;
      }
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(loopBarPositionX) {
      var executeOnMillisecondChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!isFinite(loopBarPositionX)) {
        loopBarPositionX = 0;
      }

      var duration = this.clip.duration;
      var journey = this.settings.journey;
      var _this$elements2 = this.elements,
          loopBar = _this$elements2.loopBar,
          totalBar = _this$elements2.totalBar,
          runningBar = _this$elements2.runningBar,
          currentTime = _this$elements2.currentTime;
      var totalBarPositionX = loopBarPositionX + loopBar.offsetLeft;
      var millisecond = Math.round(duration * totalBarPositionX / totalBar.offsetWidth);
      currentTime.innerHTML = this.timeFormat(millisecond);
      runningBar.style.width = loopBarPositionX / loopBar.offsetWidth * 100 + "%";
      journey.station(millisecond);

      if (this.options.onMillisecondChange && executeOnMillisecondChange) {
        this.options.onMillisecondChange(millisecond);
      }
    }
  }, {
    key: "handleDragEnd",
    value: function handleDragEnd() {
      this.settings.journey.destination();
    }
  }, {
    key: "createProgressDrag",
    value: function createProgressDrag(loopBarPositionX) {
      this.handleDragStart();
      this.handleDrag(loopBarPositionX);
      this.handleDragEnd();
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      loopBarEnd(this);
      progressBar(this);
      loopBarStart(this);
      loopStartEnd(this);
      volume.add(this);
      statusBtn(this);
      settings(this);
      speed.add(this);
      loopBtn.add(this);
      controls(this);
      fullscreen(this);
      donkeyclip(this);
      preview(this);
      body(this);
    }
  }, {
    key: "launchIntoFullscreen",
    value: function launchIntoFullscreen(element) {
      if (this.options.preview) {
        this.setPreviewDimentions();
      }

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }, {
    key: "setTheme",
    value: function setTheme() {
      // replace multiple spaces with one space
      this.options.theme.replace(/\s\s+/g, " ");
      this.options.theme.trim();

      if (!this.options.theme.includes("on-top") && !this.options.theme.includes("position-bottom")) {
        this.options.theme += " on-top";
      }

      var theme = {};

      for (var i in this.options.theme.split(" ")) {
        var confTheme = themes(this.options.theme.split(" ")[i], this.name);

        for (var q in confTheme || {}) {
          theme[q] = confTheme[q];
        }
      }

      var css = style(theme, this.name, this.options);
      var style$1 = elcreate$1("style");
      style$1.styleSheet ? style$1.styleSheet.cssText = css : style$1.appendChild(document.createTextNode(css)); // append player style to document

      eltag("head")[0].appendChild(style$1);
    }
  }, {
    key: "setSpeed",
    value: function setSpeed() {
      var _this3 = this;

      var currentSpeed;
      this.clip.speed == 1 ? currentSpeed = "Normal" : currentSpeed = this.clip.speed;
      this.elements.speedCurrent.innerHTML = currentSpeed;

      var targetZone = function () {
        for (var i = 0; i < _this3.options.speedValues.length - 1; i++) {
          if (_this3.options.speedValues[i] <= _this3.clip.speed && _this3.options.speedValues[i + 1] > _this3.clip.speed) {
            return i + Math.abs((_this3.clip.speed - _this3.options.speedValues[i]) / (_this3.options.speedValues[i] - _this3.options.speedValues[i + 1]));
          }
        }
      }();

      var step = 1 / (this.options.speedValues.length - 1);
      var positionY = (targetZone * step - 1) * -1 * (this.options.speedValues.length - 1) * 16;
      elid$8("".concat(this.name, "-speed-cursor")).style.top = positionY + "px";
    }
  }, {
    key: "calculateSpeed",
    value: function calculateSpeed(step, arrayOfValues, currentPercentage) {
      var botLimitIndex = Math.floor(currentPercentage / step);

      if (botLimitIndex === arrayOfValues.length - 1) {
        return arrayOfValues[botLimitIndex].toFixed(1);
      }

      var limitZonePercentage = currentPercentage / step % 1;
      var limitZoneLength = Math.abs(arrayOfValues[botLimitIndex] - arrayOfValues[botLimitIndex + 1]);
      var realZoneSpeed = limitZonePercentage * limitZoneLength;
      var realSpeed = (realZoneSpeed + arrayOfValues[botLimitIndex]).toFixed(1);

      if (realSpeed == 0) {
        return "0.0";
      }

      return realSpeed;
    }
  }, {
    key: "createPreviewDisplay",
    value: function createPreviewDisplay() {
      this.previewClip = this.clip.paste(elid$8("".concat(this.name, "-hover-display")));
      var previewClip = elid$8("".concat(this.name, "-hover-display"));
      window.previewClip = this.previewClip;
      previewClip.style.position = "absolute";
      previewClip.style.zIndex = 1;
      this.setPreviewDimentions();
    }
  }, {
    key: "setPreviewDimentions",
    value: function setPreviewDimentions() {
      var clip = this.clip.props.host;
      var previewClip = this.previewClip.ownClip.props.host;
      var clipWidth = clip.offsetWidth;
      var clipHeight = clip.offsetHeight;
      var previewWidth = clipWidth * this.previewScale; // max width is 300

      if (previewWidth > 300) {
        // previewWidth = parseFloat(
        //   elid(`${this.name}-hover-display`).style.maxWidth
        // );
        previewWidth = 300;
        this.previewScale = previewWidth / clipWidth;
      }

      elid$8("".concat(this.name, "-hover-display")).style.width = clipWidth + "px";
      elid$8("".concat(this.name, "-hover-display")).style.height = clipHeight + "px";
      previewClip.style.transform = "scale(".concat(this.previewScale, ")");
      previewClip.style.transformOrigin = "center bottom";
      previewClip.style.boxSizing = "border-box";
    }
  }]);

  return Player;
}();

var src = Player;

module.exports = src;
