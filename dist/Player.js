"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MC = require("@kissmybutton/motorcortex");

var timeCapsule = new MC.TimeCapsule();

var _require = require("./helpers"),
    elid = _require.elid,
    eltag = _require.eltag,
    elcreate = _require.elcreate;

var svg = require("./html/svg");

var config = require("./config");

var confStyle = require("./html/style");

var confThemes = require("./html/themes");

var setElements = require("./html/setElements");

var volumeListener = require("./listeners/volume");

var loopBarStartListener = require("./listeners/loopBarStart");

var loopBarEndListener = require("./listeners/loopBarEnd");

var loopStartEndListener = require("./listeners/loopStartEnd");

var progressBarListener = require("./listeners/progressBar");

var statusBtnListener = require("./listeners/statusBtn");

var settingsListener = require("./listeners/settings");

var speedListener = require("./listeners/speed");

var loopBtnListener = require("./listeners/loopBtn");

var controlsListener = require("./listeners/controls");

var fullscreenListener = require("./listeners/fullscreen");

var donkeyclipListener = require("./listeners/donkeyclip");

var previewListener = require("./listeners/preview");

var bodyListener = require("./listeners/body");
/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident
 * (such as a Scene or a Clip) can both privide info regarding their timing
 * state but also provide an interface for interacting/altering the timing of it
 */


var Player =
/*#__PURE__*/
function () {
  function Player(options) {
    var _this = this;

    _classCallCheck(this, Player);

    // set defaults
    options.id = options.id || Date.now();
    options.preview = options.preview || false;
    options.showVolume = options.showVolume || false;
    options.theme = options.theme || "transparent on-top";
    options.host = options.host || options.clip.props.host;
    options.buttons = options.buttons || {};

    if (options.pointerEvents === undefined || options.pointerEvents === null) {
      options.pointerEvents = true;
    } else {
      options.pointerEvents = Boolean(options.pointerEvents);
    }

    options.onMillisecondChange = options.onMillisecondChange || null;
    options.speedValues = options.speedValues || [-4, -2, -1, -0.5, 0, 0.5, 1, 2, 4]; // remove strings

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
      loopEndMillisecond: this.clip.duration
    };
    this.functions = {
      millisecondChange: this.millisecondChange,
      createJourney: this.createJourney
    }; // create the timer controls main div

    setElements(this);
    this.setTheme();
    this.setSpeed();
    this.subscribeToTimer();
    this.subscribeToDurationChange();
    this.addEventListeners();

    if (this.options.preview) {
      this.createPreviewDisplay();
    }

    window.addEventListener("resize", function () {
      if (_this.options.preview) {
        _this.setPreviewDimentions();
      }
    });
  }

  _createClass(Player, [{
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
      this.elements.currentTime.innerHTML = millisecond;

      if (this.options.onMillisecondChange && executeOnMillisecondChange) {
        this.options.onMillisecondChange(millisecond);
      }
    }
  }, {
    key: "eventBroadcast",
    value: function eventBroadcast(eventName, state) {
      if (eventName === "state-change") {
        if (state === "paused" || state === "idle" || state === "transitional" || state === "armed" || state === "blocked") {
          this.elements.statusButton.innerHTML = svg.playSVG;
          this.elements.statusButton.appendChild(this.elements.indicator);
          this.elements.indicator.innerHTML = "".concat(state.charAt(0).toUpperCase() + state.slice(1));

          if (state === "blocked") {
            this.elements.pointerEventPanel.innerHTML = "\n            <div style=\"width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;\">".concat(svg.loadingSVG, "</div>");
          }
        } else {
          this.elements.statusButton.innerHTML = svg.pauseSVG;
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
        this.elements.totalTime.innerHTML = this.clip.duration;
        this.settings.loopEndMillisecond = this.clip.duration;
        this.elements.pointerEventPanel.innerHTML = "";
        this.millisecondChange(this.clip.runTimeInfo.currentMillisecond);
      }
    }
  }, {
    key: "subscribeToDurationChange",
    value: function subscribeToDurationChange() {
      this.clip.subscribeToDurationChange(this.id, this.eventBroadcast.bind(this));
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
      currentTime.innerHTML = millisecond;
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
      loopBarEndListener(this);
      progressBarListener(this);
      loopBarStartListener(this);
      loopStartEndListener(this);
      volumeListener(this);
      statusBtnListener(this);
      settingsListener(this);
      speedListener(this);
      loopBtnListener(this);
      controlsListener(this);
      fullscreenListener(this);
      donkeyclipListener(this);
      previewListener(this);
      bodyListener(this);
    }
  }, {
    key: "launchIntoFullscreen",
    value: function launchIntoFullscreen(element) {
      if (this.options.preview) {
        this.setPreviewDimentions();
      }

      this.elements.mcPlayer.classList.toggle("full-screen");

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
      if (this.options.preview) {
        this.setPreviewDimentions();
      }

      this.elements.mcPlayer.classList.toggle("full-screen");

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

      if (!this.options.theme.includes("on-top") && !this.options.theme.includes("position-default")) {
        this.options.theme += " position-default";
      }

      var theme = {};

      for (var i in this.options.theme.split(" ")) {
        var confTheme = confThemes(this.options.theme.split(" ")[i]);

        for (var q in confTheme || {}) {
          theme[q] = confTheme[q];
        }
      }

      var css = confStyle(theme, this.name, this.options);
      var style = elcreate("style");
      style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)); // append player style to document

      eltag("head")[0].appendChild(style);
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
      elid("".concat(this.name, "-speed-cursor")).style.top = positionY + "px";
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
      this.previewClip = this.clip.paste(elid("".concat(this.name, "-hover-display")));
      var previewClip = elid("".concat(this.name, "-hover-display"));
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

      elid("".concat(this.name, "-hover-display")).style.width = clipWidth + "px";
      elid("".concat(this.name, "-hover-display")).style.height = clipHeight + "px";
      previewClip.style.transform = "scale(".concat(this.previewScale, ")");
      previewClip.style.transformOrigin = "center bottom";
      previewClip.style.boxSizing = "border-box";
    }
  }]);

  return Player;
}();

module.exports = Player;