"use strict";

const _createClass = (function() {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

const MC = require("@kissmybutton/motorcortex");
const helper = new MC.Helper();
const timeCapsule = new MC.TimeCapsule();
let journey = null;
const confThemes = require("./themes");
const confStyle = require("./style");
const svg = require("./svg");
const playerHTML = require("./playerHTML");
/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident (such as a Scene or a Clip)
 * can both privide info regarding their timing state but also provide an interface for interacting /
 * altering the timing of it
 */

const Player = (function() {
  function Player(options) {
    _classCallCheck(this, Player);

    this.id = options.id || helper.getAnId(); // timer id
    this.clip = options.clip; // host to apply the timer
    this.speedValues = [-4, -2, -1, -0.5, 0, 0.5, 1, 2, 4];

    this.theme = "transparent on-top";
    if (!this.theme.includes("on-top")) {
      this.theme += " position-default";
    }

    const theme = {};
    for (const i in this.theme.split(" ")) {
      const confTheme = confThemes(this.theme.split(" ")[i]);
      for (const q in confTheme) {
        theme[q] = confTheme[q];
      }
    }
    const css = confStyle(theme);
    // set clip position to relative
    this.clip.props.host.style.position = "relative";

    // create the timer controls main div
    this.mcPlayer = document.createElement("div");
    this.mcPlayer.id = "mc-player";
    this.mcPlayer.innerHTML = playerHTML({ svg: svg });
    elid(this.clip.props.host.id).appendChild(this.mcPlayer);

    this.totalBar = elid("mc-player-totalbar");
    this.loopBar = elid("mc-player-loopbar");
    this.runningBar = elid("mc-player-runningbar");
    this.speedBar = elid("mc-player-speed-value-bar");
    this.speedBarHelper = elid("mc-player-speed-value-helperbar");
    this.indicator = elid("mc-player-indicator");
    this.currentTime = elid("mc-player-time-current");
    this.timeSeparator = elid("mc-player-time-separator");
    this.timeDisplay = elid("mc-player-time-display");
    this.totalTime = elid("mc-player-time-total");
    this.statusButton = elid("mc-player-status-btn");
    this.settingsShowIndicator = elid("mc-player-settings-indicator");
    this.settingsButton = elid("mc-player-settings-btn");
    this.settingsSpeedButtonShow = elid("mc-player-settings-speed-show");
    this.settingsSpeedButtonHide = elid("mc-player-settings-speed-hide");
    this.fullScreenButton = elid("mc-player-full-screen-btn");
    this.settingsPanel = elid("mc-player-settings-panel");
    this.settingsMainPanel = elid("mc-player-main-settings");
    this.settingsSpeedPanel = elid("mc-player-speed-settings");
    this.speedCurrent = elid("mc-player-speed-current");

    let currentSpeed = void 0;
    this.clip.speed == 1
      ? (currentSpeed = "Normal")
      : (currentSpeed = this.clip.speed);
    this.speedCurrent.innerHTML = currentSpeed;
    this.currentTime.innerHTML = 0;
    this.totalTime.innerHTML = this.clip.duration;
    this.timeSeparator.innerHTML = "/";
    this.settingsSpeedPanel.style.display = "none";
    this.settingsPanel.classList.add("m-fadeOut");
    this.indicator.style.visibility = "hidden";
    this.indicator.innerHTML = "Idle";

    this.settingsSpeedPanel
      .getElementsByTagName("li")[1]
      .classList.add("no-hover");
    const style = document.createElement("style");
    style.styleSheet
      ? (style.styleSheet.cssText = css)
      : style.appendChild(document.createTextNode(css));

    // append player style to document
    document.getElementsByTagName("head")[0].appendChild(style);

    this.subscribeToTimer();
    this.subscribeToEvents();
    this.addEventListeners();
    this.previousTimestamp = 0;
  }

  _createClass(Player, [
    {
      key: "millisecondChange",
      value: function millisecondChange(millisecond) {
        this.runningBar.style.width =
          (millisecond / this.clip.duration) * 100 + "%";
        this.currentTime.innerHTML = millisecond;
      }
    },
    {
      key: "eventBroadcast",
      value: function eventBroadcast(eventName, meta) {
        if (eventName === "state-change") {
          if (meta.newState === "waiting") {
            this.statusButton.innerHTML = svg.playSVG;
            this.statusButton.appendChild(this.indicator);
            this.indicator.innerHTML = "Waiting";
          } else if (meta.newState === "playing") {
            this.statusButton.innerHTML = svg.pauseSVG;
            this.statusButton.appendChild(this.indicator);
            this.indicator.innerHTML = "Playing";
          } else if (meta.newState === "completed") {
            this.currentTime.innerHTML = this.clip.duration;
            this.statusButton.innerHTML = svg.replaySVG;
            this.statusButton.appendChild(this.indicator);
            this.indicator.innerHTML = "Completed";
          } else if (meta.newState === "transitional") {
            this.statusButton.innerHTML = svg.playSVG;
            this.statusButton.appendChild(this.indicator);
            this.indicator.innerHTML = "Transitional";
          } else if (meta.newState === "idle") {
            this.statusButton.innerHTML = svg.playSVG;
            this.statusButton.appendChild(this.indicator);
            this.indicator.innerHTML = "Idle";
          }
        } else if (eventName === "attribute-rejection") {
          helper.log(
            "Attributes",
            meta.attributes,
            "have been rejected from animation with id " + meta.animationID
          );
        } else if (eventName === "animation-rejection") {
          helper.log(
            "Animation " +
              meta.animationID +
              " has been rejected as all attributes of it overlap on specific elements because of existing animations"
          );
        } else if (eventName === "duration-change") {
          this.millisecondChange(
            this.clip.runTimeInfo.currentMillisecond,
            this.clip.state
          );
        }
      }
    },
    {
      key: "subscribeToEvents",
      value: function subscribeToEvents() {
        this.clip.subscribeToEvents(this.id, this.eventBroadcast.bind(this));
      }
    },
    {
      key: "subscribeToTimer",
      value: function subscribeToTimer() {
        this.clip.subscribe(this.id, this.millisecondChange.bind(this));
      }
    },
    {
      key: "handleDragStart",
      value: function handleDragStart() {
        journey = timeCapsule.startJourney(this.clip);
      }
    },
    {
      key: "handleDrag",
      value: function handleDrag(positionX) {
        const offsetWidth = this.totalBar.offsetWidth;
        const duration = this.clip.duration;
        const millisecond = Math.round((duration * positionX) / offsetWidth);

        this.currentTime.innerHTML = millisecond;
        this.runningBar.style.width =
          (millisecond / this.clip.duration) * 100 + "%";
        journey.station(millisecond);
      }
    },
    {
      key: "handleDragEnd",
      value: function handleDragEnd() {
        journey.destination();
      }
    },
    {
      key: "addEventListeners",
      value: function addEventListeners() {
        const _this = this;

        this.statusButton.onclick = function(e) {
          e.preventDefault();
          if (_this.clip.state === "playing") {
            _this.clip.wait();
          } else if (_this.clip.state === "waiting") {
            _this.clip.resume();
          } else if (_this.clip.state === "idle") {
            _this.clip.play();
          } else if (_this.clip.state === "completed") {
            journey = timeCapsule.startJourney(_this.clip);
            journey.station(0);
            journey.destination();
            _this.clip.play();
          }
        };

        this.settingsShowIndicator.onclick = function(e) {
          e.preventDefault();
          const checkbox = document.getElementById(
            "mc-player-show-indicator-checkbox"
          );
          if (checkbox.checked) {
            checkbox.checked = false;
            _this.indicator.style.visibility = "hidden";
            _this.statusButton.style.margin = "10px 5px 5px 5px";
            _this.statusButton.style.height = "25px";
            _this.statusButton.style.width = "45px";
            _this.timeDisplay.style.left = "50px";
          } else {
            checkbox.checked = true;
            _this.indicator.style.visibility = "visible";
            _this.statusButton.style.margin = "10px 5px 12px 5px";
            _this.statusButton.style.width = "55px";
            _this.timeDisplay.style.left = "60px";
            _this.statusButton.style.height = "18px";
          }
        };

        this.settingsButton.onclick = function(e) {
          e.preventDefault();
          _this.settingsPanel.classList.toggle("m-fadeOut");
          _this.settingsPanel.classList.toggle("m-fadeIn");
        };

        this.settingsSpeedButtonShow.onclick = this.settingsSpeedButtonHide.onclick = function(
          e
        ) {
          e.preventDefault();
          _this.settingsPanel.classList.toggle(
            "mc-player-settings-speed-panel"
          );
          const includesClass = _this.settingsPanel.className.includes(
            "mc-player-settings-speed-panel"
          );
          if (includesClass) {
            _this.settingsMainPanel.style.display = "none";
            _this.settingsSpeedPanel.style.display = "block";
          } else {
            _this.settingsSpeedPanel.style.display = "none";
            _this.settingsMainPanel.style.display = "block";
          }
        };

        const onCursorMove = function onCursorMove(e) {
          const clientX = e.clientX || e.touches[0].clientX;
          const viewportOffset = _this.totalBar.getBoundingClientRect();
          let positionX = clientX - viewportOffset.left;
          if (positionX < 0) {
            positionX = 0;
          } else if (positionX > _this.totalBar.offsetWidth) {
            positionX = _this.totalBar.offsetWidth;
          }

          _this.handleDrag(positionX);
        };

        const onMouseUp = function onMouseUp(e) {
          e.preventDefault();
          document.removeEventListener("mouseup", onMouseUp, false);
          document.removeEventListener("touchend", onMouseUp, false);
          document.removeEventListener("mousemove", onCursorMove, false);
          document.removeEventListener("touchmove", onCursorMove, false);
          _this.handleDragEnd();
        };
        const onMouseDown = function onMouseDown(e) {
          e.preventDefault();
          _this.handleDragStart();
          onCursorMove(e);
          document.addEventListener("mouseup", onMouseUp, false);
          document.addEventListener("touchend", onMouseUp, false);
          document.addEventListener("mousemove", onCursorMove, false);
          document.addEventListener("touchmove", onCursorMove, false);
        };

        this.loopBar.addEventListener("mousedown", onMouseDown, false);
        this.loopBar.addEventListener("touchstart", onMouseDown, false);

        const onCursorMoveSpeedBar = function onCursorMoveSpeedBar(e) {
          const viewportOffset = _this.speedBar.getBoundingClientRect();
          const clientY = e.clientY || e.touches[0].clientY;
          let positionY = clientY - viewportOffset.top;
          positionY -= 8;
          if (positionY < 0) {
            positionY = 0;
          } else if (positionY > _this.speedBar.offsetHeight - 15.5) {
            positionY = _this.speedBar.offsetHeight - 15.5;
          }

          // show speed
          const percentage = (positionY / 128.5 - 1) * -1;
          const step = 1 / 8;
          const speed = _this.calculateSpeed(
            step,
            _this.speedValues,
            percentage
          );
          document.getElementById("mc-player-speed-runtime").innerHTML =
            speed + "0";
          _this.clip.executionSpeed = speed;
          document.getElementById("mc-player-speed-cursor").style.top =
            positionY + "px";
        };

        const onMouseUpSpeedBar = function onMouseUpSpeedBar(e) {
          e.preventDefault();
          document.removeEventListener("mouseup", onMouseUpSpeedBar, false);
          document.removeEventListener("touchend", onMouseUpSpeedBar, false);
          document.removeEventListener(
            "mousemove",
            onCursorMoveSpeedBar,
            false
          );
          document.removeEventListener(
            "touchmove",
            onCursorMoveSpeedBar,
            false
          );
          document.getElementById("mc-player-speed-runtime").innerHTML =
            "Speed";
          let speedDisplay = void 0;
          _this.clip.speed == 1
            ? (speedDisplay = "Normal")
            : (speedDisplay = _this.clip.speed);

          _this.speedCurrent.innerHTML = speedDisplay;
        };
        const onMouseDownSpeedBar = function onMouseDownSpeedBar(e) {
          e.preventDefault();
          onCursorMoveSpeedBar(e);
          document.addEventListener("mouseup", onMouseUpSpeedBar, false);
          document.addEventListener("touchend", onMouseUpSpeedBar, false);
          document.addEventListener("mousemove", onCursorMoveSpeedBar, false);
          document.addEventListener("touchmove", onCursorMoveSpeedBar, false);
        };

        this.speedBarHelper.addEventListener(
          "mousedown",
          onMouseDownSpeedBar,
          false
        );
        this.speedBarHelper.addEventListener(
          "touchstart",
          onMouseDownSpeedBar,
          false
        );

        this.fullScreenButton.addEventListener("click", function() {
          const elFullScreen = _this.clip.props.host.className.includes(
            "full-screen"
          );
          elFullScreen
            ? _this.exitFullscreen()
            : _this.launchIntoFullscreen(_this.clip.props.host);
          _this.clip.props.host.classList.toggle("full-screen");
        });

        document.querySelector("body").addEventListener("click", function(e) {
          if (e.target.className === "mc-player-speed-value") {
            let speedDisplay = e.target.dataset.speedValue - 0;
            _this.clip.executionSpeed = e.target.dataset.speedValue;
            _this.clip.speed == 1
              ? (speedDisplay = "Normal")
              : (speedDisplay = _this.clip.speed);
            _this.speedCurrent.innerHTML = speedDisplay;

            const step = 1 / (_this.speedValues.length - 1);
            const positionY = (e.target.dataset.zone * step - 1) * -1 * 128.5;

            document.getElementById("mc-player-speed-cursor").style.top =
              positionY + "px";
          }
        });
      }
    },
    {
      key: "calculateSpeed",
      value: function calculateSpeed(step, arrayOfValues, currentPercentage) {
        const botLimitIndex = Math.floor(currentPercentage / step);
        if (botLimitIndex === arrayOfValues.length - 1) {
          return arrayOfValues[botLimitIndex].toFixed(1);
        }
        const limitZonePercentage = (currentPercentage / step) % 1;
        const limitZoneLength = Math.abs(
          arrayOfValues[botLimitIndex] - arrayOfValues[botLimitIndex + 1]
        );

        const realZoneSpeed = limitZonePercentage * limitZoneLength;
        const realSpeed = (
          realZoneSpeed + arrayOfValues[botLimitIndex]
        ).toFixed(1);
        return realSpeed;
      }
    },
    {
      key: "launchIntoFullscreen",
      value: function launchIntoFullscreen(element) {
        this.mcPlayer.classList.toggle("full-screen");
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
    },
    {
      key: "exitFullscreen",
      value: function exitFullscreen() {
        this.mcPlayer.classList.toggle("full-screen");
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }
  ]);

  return Player;
})();

var elid = function elid(id) {
  return document.getElementById(id);
};
// const elclass = className => document.getElementsByClassName(className);

module.exports = Player;
