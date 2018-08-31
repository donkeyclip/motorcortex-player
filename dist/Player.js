"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MC = require("@kissmybutton/motorcortex");
var helper = new MC.Helper();
var timeCapsule = new MC.TimeCapsule();
var hoverTimeCapsule = new MC.TimeCapsule();
var confThemes = require("./themes");
var confStyle = require("./style");
var svg = require("./svg");
var playerHTML = require("./playerHTML");
/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident (such as a Scene or a Clip)
 * can both privide info regarding their timing state but also provide an interface for interacting /
 * altering the timing of it
 */

var Player = function () {
  function Player(options) {
    _classCallCheck(this, Player);

    this.id = options.id || helper.getAnId(); // timer id
    this.clip = options.clip; // host to apply the timer
    this.clipClass = options.clipClass;
    options.preview = options.preview || false;
    // this.previewClip.props.host = elid()
    this.speedValues = [-4, -2, -1, -0.5, 0, 0.5, 1, 2, 4];
    this.requestingLoop = false;
    this.loopLastPositionXPxls = 0;
    this.playAfterResize = false;
    this.loopLastPositionXPercentage = 0;
    this.journey = null;
    this.hoverJourney = null;
    this.loopJourney = false;
    this.needsUpdate = true;
    this.loopStartMillisecond = 0;
    this.loopEndMillisecond = this.clip.duration;
    this.theme = options.theme || "transparent on-top";

    // set clip position to relative
    this.clip.props.host.style.position = "relative";
    var clip = this.clip.props.host.getElementsByTagName("iframe")[0];
    clip.style.margin = "0 auto";
    clip.style.display = "block";

    // create the timer controls main div
    this.mcPlayer = elcreate("div");
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
    this.loopButton = elid("mc-player-loop-btn");
    this.settingsSpeedButtonShow = elid("mc-player-settings-speed-show");
    this.settingsSpeedButtonHide = elid("mc-player-settings-speed-hide");
    this.fullScreenButton = elid("mc-player-full-screen-btn");
    this.settingsPanel = elid("mc-player-settings-panel");
    this.settingsMainPanel = elid("mc-player-main-settings");
    this.settingsSpeedPanel = elid("mc-player-speed-settings");
    this.speedCurrent = elid("mc-player-speed-current");
    this.loopBarStart = elid("mc-player-loopbar-start");
    this.loopBarEnd = elid("mc-player-loopbar-end");

    this.currentTime.innerHTML = 0;
    this.totalTime.innerHTML = this.clip.duration;
    this.timeSeparator.innerHTML = "/";
    this.settingsSpeedPanel.style.display = "none";
    this.settingsPanel.classList.add("m-fadeOut");
    this.indicator.style.visibility = "hidden";
    this.indicator.innerHTML = "Idle";

    this.settingsSpeedPanel.getElementsByTagName("li")[1].classList.add("no-hover");

    this.loopBarStart.style.left = "0%";
    this.loopBarEnd.style.left = "100%";
    this.loopBarStart.classList.add("m-fadeOut");
    this.loopBarEnd.classList.add("m-fadeOut");
    elid("mc-player-loop-time").classList.add("m-fadeOut");

    elid("mc-player-hover-display").classList.add("m-fadeOut");

    this.setSpeed();
    this.setTheme();
    this.subscribeToTimer();
    this.subscribeToEvents();
    this.addEventListeners();
    if (options.preview) {
      this.createHoverDisplay();
    }
  }

  _createClass(Player, [{
    key: "millisecondChange",
    value: function millisecondChange(millisecond) {
      var _this = this;

      if (!this.needsUpdate) {
        this.clip.wait();
        return 1;
      }
      var duration = this.clip.duration;

      // zero value if style.left is null
      var loopBarLeftPercentage = parseFloat(this.loopBar.style.left) / 100 || 0;

      var loopBarWidth = this.loopBar.offsetWidth;

      var localMillisecond = millisecond - duration * loopBarLeftPercentage;

      var localDuration = duration / this.totalBar.offsetWidth * loopBarWidth;
      if (millisecond >= this.loopEndMillisecond && this.loopButton.className.includes("svg-selected")) {
        this.needsUpdate = false;
        setTimeout(function () {
          if (_this.clip.state === "idle") {
            _this.clip.stop();
            _this.journey = timeCapsule.startJourney(_this.clip);
            _this.journey.station(_this.loopStartMillisecond + 1);
            _this.journey.destination();
            _this.clip.play();
          } else if (_this.clip.state === "completed") {
            _this.clip.stop();
            _this.journey = timeCapsule.startJourney(_this.clip);
            _this.journey.station(_this.loopStartMillisecond + 1);
            _this.journey.destination();
            _this.clip.play();
          } else {
            _this.journey = timeCapsule.startJourney(_this.clip);
            _this.journey.station(_this.loopStartMillisecond + 1);
            _this.journey.destination();
            _this.clip.resume();
          }
          _this.needsUpdate = true;
        }, 0);
        return 1;
      } else if (millisecond <= this.loopStartMillisecond && this.loopButton.className.includes("svg-selected")) {
        this.needsUpdate = false;
        setTimeout(function () {
          if (_this.clip.state === "idle") {
            _this.clip.stop();
            _this.journey = timeCapsule.startJourney(_this.clip);
            _this.journey.station(_this.loopEndMillisecond - 1);
            _this.journey.destination();
            _this.clip.play();
          } else if (_this.clip.state === "completed") {
            _this.clip.stop();
            _this.journey = timeCapsule.startJourney(_this.clip);
            _this.journey.station(_this.loopEndMillisecond - 1);
            _this.journey.destination();
            _this.clip.play();
          } else {
            _this.journey = timeCapsule.startJourney(_this.clip);
            _this.journey.station(_this.loopEndMillisecond - 1);
            _this.journey.destination();
            _this.clip.resume();
          }
          _this.needsUpdate = true;
        }, 0);
        return 1;
      } else if (millisecond >= this.loopEndMillisecond) {
        this.needsUpdate = false;
        setTimeout(function () {
          _this.journey = timeCapsule.startJourney(_this.clip);
          _this.journey.station(_this.loopEndMillisecond);
          _this.journey.destination();
        }, 0);
        this.runningBar.style.width = "100%";
        this.currentTime.innerHTML = this.loopEndMillisecond;
        return 1;
      } else if (millisecond <= this.loopStartMillisecond) {
        this.needsUpdate = false;
        setTimeout(function () {
          _this.journey = timeCapsule.startJourney(_this.clip);
          _this.journey.station(_this.loopStartMillisecond);
          _this.journey.destination();
        }, 0);
        this.runningBar.style.width = "0%";
        this.currentTime.innerHTML = this.loopStartMillisecond;
        return 1;
      }

      this.runningBar.style.width = localMillisecond / localDuration * 100 + "%";

      this.currentTime.innerHTML = millisecond;
    }
  }, {
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
        helper.log("Attributes", meta.attributes, "have been rejected from animation with id " + meta.animationID);
      } else if (eventName === "animation-rejection") {
        helper.log("Animation " + meta.animationID + " has been rejected as all attributes of it overlap on specific elements because of existing animations");
      } else if (eventName === "duration-change" && this.needsUpdate) {
        this.millisecondChange(this.clip.runTimeInfo.currentMillisecond, this.clip.state);
      }
    }
  }, {
    key: "subscribeToEvents",
    value: function subscribeToEvents() {
      this.clip.subscribeToEvents(this.id, this.eventBroadcast.bind(this));
    }
  }, {
    key: "subscribeToTimer",
    value: function subscribeToTimer() {
      this.clip.subscribe(this.id, this.millisecondChange.bind(this));
    }
  }, {
    key: "handleDragStart",
    value: function handleDragStart() {
      this.needsUpdate = true;
      this.journey = timeCapsule.startJourney(this.clip);
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(loopBarPositionX) {
      if (!isFinite(loopBarPositionX)) {
        loopBarPositionX = 0;
      }
      var duration = this.clip.duration;

      var loopBarPercentageLeft = void 0;

      if (this.loopBar.style.left.includes("px")) {
        loopBarPercentageLeft = parseFloat(this.loopBar.style.left) / this.totalBar.offsetWidth || 0;
      } else {
        loopBarPercentageLeft = parseFloat(this.loopBar.style.left) / 100 || 0;
      }

      var totalBarPositionX = loopBarPositionX + this.totalBar.offsetWidth * loopBarPercentageLeft;

      var millisecond = Math.round(duration * totalBarPositionX / this.totalBar.offsetWidth);

      this.currentTime.innerHTML = millisecond;

      this.runningBar.style.width = loopBarPositionX / this.loopBar.offsetWidth * 100 + "%";

      this.journey.station(millisecond);
    }
  }, {
    key: "handleDragEnd",
    value: function handleDragEnd() {
      this.journey.destination();
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this2 = this;

      /* 
      * Play - pause - replay interactions
      */

      this.statusButton.onclick = function (e) {
        e.preventDefault();
        if (_this2.clip.state === "playing") {
          _this2.clip.wait();
        } else if (_this2.clip.state === "waiting") {
          _this2.clip.resume();
        } else if (_this2.clip.state === "idle") {
          if (_this2.clip.speed >= 0) {
            _this2.clip.play();
            _this2.needsUpdate = true;
          } else {
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_this2.loopEndMillisecond - 1);
            _this2.journey.destination();
            _this2.clip.play();
            _this2.needsUpdate = true;
          }
        } else if (_this2.clip.state === "completed") {
          if (_this2.clip.speed >= 0) {
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(0);
            _this2.journey.destination();
            _this2.clip.play();
            _this2.needsUpdate = true;
          } else {
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_this2.loopEndMillisecond - 1);
            _this2.journey.destination();
            _this2.clip.play();
            _this2.needsUpdate = true;
          }
        }
      };

      this.settingsShowIndicator.onclick = function (e) {
        e.preventDefault();
        var checkbox = elid("mc-player-show-indicator-checkbox");
        if (checkbox.checked) {
          checkbox.checked = false;
          _this2.indicator.style.visibility = "hidden";
          _this2.statusButton.style.margin = "10px 5px 5px 5px";
          _this2.statusButton.style.height = "25px";
          _this2.statusButton.style.width = "45px";
          _this2.timeDisplay.style.left = "50px";
        } else {
          checkbox.checked = true;
          _this2.indicator.style.visibility = "visible";
          _this2.statusButton.style.margin = "10px 5px 12px 5px";
          _this2.statusButton.style.width = "55px";
          _this2.timeDisplay.style.left = "60px";
          _this2.statusButton.style.height = "18px";
        }
      };

      this.settingsButton.onclick = function (e) {
        e.preventDefault();

        var showHideSettings = function showHideSettings(e) {
          if (_this2.settingsPanel.contains(e.target)) {
            return true;
          }
          _this2.settingsPanel.classList.toggle("m-fadeOut");
          _this2.settingsPanel.classList.toggle("m-fadeIn");
          if (_this2.settingsPanel.className.includes("m-fadeOut")) {
            removeListener("click", showHideSettings, false);
          }
        };

        if (_this2.settingsPanel.className.includes("m-fadeOut")) {
          addListener("click", showHideSettings, false);
        } else {
          removeListener("click", showHideSettings, false);
        }
      };
      this.settingsSpeedButtonShow.onclick = this.settingsSpeedButtonHide.onclick = function (e) {
        e.preventDefault();
        _this2.settingsPanel.classList.toggle("mc-player-settings-speed-panel");
        var includesClass = _this2.settingsPanel.className.includes("mc-player-settings-speed-panel");
        if (includesClass) {
          _this2.settingsMainPanel.style.display = "none";
          _this2.settingsSpeedPanel.style.display = "block";
        } else {
          _this2.settingsSpeedPanel.style.display = "none";
          _this2.settingsMainPanel.style.display = "block";
        }
      };

      var onCursorMove = function onCursorMove(e) {
        e.preventDefault();
        var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
        var viewportOffset = _this2.loopBar.getBoundingClientRect();
        var positionX = clientX - viewportOffset.left;
        if (positionX < 0) {
          positionX = 0;
        } else if (_this2.loopBar.offsetWidth === _this2.totalBar.offsetWidth && positionX >= _this2.loopBar.offsetWidth) {
          positionX = _this2.totalBar.offsetWidth;
        } else if (positionX >= _this2.loopBar.offsetWidth) {
          positionX = parseFloat(_this2.loopBar.style.width) / 100 * _this2.totalBar.offsetWidth;
        }
        _this2.handleDrag(positionX);
      };

      var onMouseUp = function onMouseUp(e) {
        e.preventDefault();
        removeListener("mouseup", onMouseUp, false);
        removeListener("touchend", onMouseUp, false);
        removeListener("mousemove", onCursorMove, false);
        removeListener("touchmove", onCursorMove, false);
        _this2.handleDragEnd();
        if (_this2.playAfterResize) {
          if (_this2.clip.state === "idle" && !_this2.loopButton.className.includes("svg-selected")) {
            _this2.clip.play();
          } else if (_this2.clip.state === "completed" && !_this2.loopButton.className.includes("svg-selected")) {
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_this2.loopEndMillisecond - 1);
            _this2.journey.destination();
            _this2.clip.play();
          } else if ((_this2.clip.state === "completed" || _this2.clip.state === "idle") && _this2.loopButton.className.includes("svg-selected")) {
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.clip.speed >= 0 ? _this2.journey.station(_this2.loopStartMillisecond + 1) : _this2.journey.station(_this2.loopEndMillisecond - 1);
            _this2.journey.destination();
            _this2.clip.play();
          } else {
            _this2.clip.resume();
          }
          _this2.playAfterResize = false;
        }
      };
      var onMouseDown = function onMouseDown(e) {
        e.preventDefault();
        if (_this2.clip.state === "playing") {
          _this2.playAfterResize = true;
        }
        _this2.handleDragStart();
        onCursorMove(e);
        addListener("mouseup", onMouseUp, false);
        addListener("touchend", onMouseUp, false);
        addListener("mousemove", onCursorMove, false);
        addListener("touchmove", onCursorMove, false);
      };

      this.loopBar.addEventListener("mousedown", onMouseDown, false);
      this.loopBar.addEventListener("touchstart", onMouseDown, {
        passive: true
      }, false);

      var onCursorMoveSpeedBar = function onCursorMoveSpeedBar(e) {
        e.preventDefault();
        var viewportOffset = _this2.speedBar.getBoundingClientRect();
        var clientY = e.clientY || ((e.touches || [])[0] || {}).clientY;
        var positionY = clientY - viewportOffset.top;
        positionY -= 8;
        if (positionY < 0) {
          positionY = 0;
        } else if (positionY > _this2.speedBar.offsetHeight - 15.5) {
          positionY = _this2.speedBar.offsetHeight - 15.5;
        }

        // show speed
        var percentage = (positionY / 128.5 - 1) * -1;
        var step = 1 / 8;
        var speed = _this2.calculateSpeed(step, _this2.speedValues, percentage);
        elid("mc-player-speed-runtime").innerHTML = speed + "0";
        elid("mc-player-speed-cursor").style.top = positionY + "px";
        _this2.clip.executionSpeed = speed;
      };

      var onMouseUpSpeedBar = function onMouseUpSpeedBar(e) {
        e.preventDefault();
        removeListener("mouseup", onMouseUpSpeedBar, false);
        removeListener("touchend", onMouseUpSpeedBar, false);
        removeListener("mousemove", onCursorMoveSpeedBar, false);
        removeListener("touchmove", onCursorMoveSpeedBar, false);
        elid("mc-player-speed-runtime").innerHTML = "Speed";
        var speedDisplay = void 0;
        _this2.clip.speed == 1 ? speedDisplay = "Normal" : speedDisplay = _this2.clip.speed;

        _this2.speedCurrent.innerHTML = speedDisplay;
      };
      var onMouseDownSpeedBar = function onMouseDownSpeedBar(e) {
        e.preventDefault();
        onCursorMoveSpeedBar(e);
        addListener("mouseup", onMouseUpSpeedBar, false);
        addListener("touchend", onMouseUpSpeedBar, false);
        addListener("mousemove", onCursorMoveSpeedBar, false);
        addListener("touchmove", onCursorMoveSpeedBar, false);
      };

      this.speedBarHelper.addEventListener("mousedown", onMouseDownSpeedBar, false);
      this.speedBarHelper.addEventListener("touchstart", onMouseDownSpeedBar, {
        passive: true
      }, false);

      this.fullScreenButton.addEventListener("click", function () {
        var elFullScreen = _this2.clip.props.host.className.includes("full-screen");
        elFullScreen ? _this2.exitFullscreen() : _this2.launchIntoFullscreen(_this2.clip.props.host);
        _this2.clip.props.host.classList.toggle("full-screen");
      });

      this.loopButton.onclick = function () {
        _this2.loopButton.classList.toggle("svg-selected");
        _this2.loopBarStart.classList.toggle("m-fadeOut");
        _this2.loopBarEnd.classList.toggle("m-fadeOut");
        _this2.loopBarStart.classList.toggle("m-fadeIn");
        _this2.loopBarEnd.classList.toggle("m-fadeIn");
        elid("mc-player-loop-time").classList.toggle("m-fadeOut");
        elid("mc-player-loop-time").classList.toggle("m-fadeIn");

        elid("mc-player-loopbar-end-time").innerHTML = _this2.loopEndMillisecond;
        elid("mc-player-loopbar-start-time").innerHTML = _this2.loopStartMillisecond;
        _this2.needsUpdate = true;

        if (elid("mc-player-loop-time").className.includes("m-fadeOut")) {
          _this2.loopBar.style.left = "0px";
          _this2.loopBar.style.width = "100%";
          _this2.loopStartMillisecond = 0;
          _this2.loopEndMillisecond = _this2.clip.duration;
          _this2.loopLastPositionXPxls = 0;
          _this2.loopLastPositionXPercentage = 0;
          _this2.runningBar.style.width = _this2.clip.runTimeInfo.currentMillisecond / _this2.clip.duration * 100 + "%";
        }
      };

      elid("mc-player-controls").onmouseover = function () {
        if (!_this2.loopButton.className.includes("svg-selected")) {
          return;
        }
        _this2.loopBarStart.classList.remove("m-fadeOut");
        _this2.loopBarEnd.classList.remove("m-fadeOut");
        _this2.loopBarStart.classList.add("m-fadeIn");
        _this2.loopBarEnd.classList.add("m-fadeIn");
      };
      elid("mc-player-controls").onmouseout = function () {
        if (!_this2.loopButton.className.includes("svg-selected")) {
          return;
        }
        _this2.loopBarStart.classList.add("m-fadeOut");
        _this2.loopBarEnd.classList.add("m-fadeOut");
        _this2.loopBarStart.classList.remove("m-fadeIn");
        _this2.loopBarEnd.classList.remove("m-fadeIn");
      };

      var onCursorMoveLoopStart = function onCursorMoveLoopStart(e) {
        e.preventDefault();
        var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
        var viewportOffset = _this2.totalBar.getBoundingClientRect();
        var positionX = clientX - viewportOffset.left;
        if (positionX < 0) {
          positionX = 0;
        } else if (positionX > _this2.totalBar.offsetWidth) {
          positionX = _this2.totalBar.offsetWidth;
        }

        var loopBarDeltaX = positionX - _this2.loopLastPositionXPxls || 0;
        var runningBarWidthInPxls = _this2.runningBar.offsetWidth - loopBarDeltaX;

        _this2.loopBar.style.left = positionX + "px";

        if (parseFloat(_this2.loopBar.style.width) - loopBarDeltaX + positionX > _this2.totalBar.offsetWidth) {
          _this2.loopBar.style.width = "0px";
          _this2.runningBar.style.width = "0px";
        } else {
          _this2.loopBar.style.width = parseFloat(_this2.loopBar.style.width) - loopBarDeltaX + "px";
          _this2.runningBar.style.width = runningBarWidthInPxls + "px";
        }

        _this2.loopLastPositionXPxls = positionX;

        _this2.loopStartMillisecond = Math.round(_this2.clip.duration * parseFloat(_this2.loopBar.style.left) / _this2.totalBar.offsetWidth);

        var newLoopEndMillisecond = Math.round(_this2.clip.duration * ((parseFloat(_this2.loopBar.style.left) || 0) + parseFloat(_this2.loopBar.style.width)) / _this2.totalBar.offsetWidth);

        if (_this2.loopEndMillisecond < newLoopEndMillisecond) {
          _this2.loopEndMillisecond = Math.round(_this2.clip.duration * ((parseFloat(_this2.loopBar.style.left) || 0) + parseFloat(_this2.loopBar.style.width)) / _this2.totalBar.offsetWidth);
          _this2.loopJourney = true;
        }

        elid("mc-player-loopbar-end-time").innerHTML = _this2.loopEndMillisecond;
        elid("mc-player-loopbar-start-time").innerHTML = _this2.loopStartMillisecond;
      };

      var onMouseUpLoopStart = function onMouseUpLoopStart(e) {
        _this2.resizeLoop = false;

        e.preventDefault();
        if (_this2.loopJourney) {
          _this2.handleDragStart();
          _this2.handleDrag(_this2.runningBar.offsetWidth);
          _this2.handleDragEnd();
          _this2.loopJourney = false;
        }

        _this2.loopLastPositionXPercentage = _this2.loopLastPositionXPxls / _this2.loopBar.offsetWidth;

        var runningBarWidthPercentage = _this2.runningBar.offsetWidth / _this2.loopBar.offsetWidth * 100 + "%";

        _this2.loopBar.style.left = parseFloat(_this2.loopBar.style.left) / _this2.totalBar.offsetWidth * 100 + "%";

        _this2.loopBar.style.width = parseFloat(_this2.loopBar.style.width) / _this2.totalBar.offsetWidth * 100 + "%";

        _this2.loopStartMillisecond = Math.round(_this2.clip.duration * parseFloat(_this2.loopBar.style.left) / 100);

        _this2.loopEndMillisecond = Math.round(_this2.clip.duration * ((parseFloat(_this2.loopBar.style.left) || 0) + parseFloat(_this2.loopBar.style.width)) / 100);

        _this2.runningBar.style.width = runningBarWidthPercentage;
        removeListener("mouseup", onMouseUpLoopStart, false);
        removeListener("touchend", onMouseUpLoopStart, false);
        removeListener("mousemove", onCursorMoveLoopStart, false);
        removeListener("touchmove", onCursorMoveLoopStart, false);
        _this2.loopBar.addEventListener("mousedown", onMouseDown, false);
        _this2.loopBar.addEventListener("touchstart", onMouseDown, {
          passive: true
        }, false);

        if (_this2.playAfterResize) {
          if (_this2.clip.state === "idle") {
            var loopms = void 0;
            if (_this2.clip.speed >= 0) {
              loopms = _this2.loopStartMillisecond + 1;
            } else {
              loopms = _this2.loopEndMillisecond - 1;
            }
            _this2.needsUpdate = true;
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(loopms);
            _this2.journey.destination();
            _this2.clip.play();
          } else if (_this2.clip.state === "completed") {
            var _loopms = void 0;
            if (_this2.clip.speed >= 0) {
              _loopms = _this2.loopStartMillisecond + 1;
            } else {
              _loopms = _this2.loopEndMillisecond - 1;
            }
            _this2.needsUpdate = true;
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_loopms);
            _this2.journey.destination();
            _this2.clip.play();
          } else {
            _this2.clip.resume();
          }
          _this2.playAfterResize = false;
        }
      };

      var onMouseDownLoopStart = function onMouseDownLoopStart(e) {
        _this2.resizeLoop = true;

        e.preventDefault();
        _this2.needsUpdate = true;

        if (_this2.clip.state === "playing") {
          _this2.clip.wait();
          _this2.playAfterResize = true;
        }
        _this2.loopBar.style.width = _this2.loopBar.offsetWidth + "px";

        if (_this2.loopLastPositionXPxls - _this2.loopLastPositionXPercentage * _this2.loopBar.offsetWidth > 1 || _this2.loopLastPositionXPercentage * _this2.loopBar.offsetWidth - _this2.loopLastPositionXPxls > 1) {
          _this2.loopLastPositionXPxls = _this2.loopLastPositionXPercentage * _this2.loopBar.offsetWidth;
        }

        _this2.loopBar.removeEventListener("mousedown", onMouseDown, false);
        _this2.loopBar.removeEventListener("touchstart", onMouseDown, false);
        onCursorMoveLoopStart(e);
        addListener("mouseup", onMouseUpLoopStart, false);
        addListener("touchend", onMouseUpLoopStart, false);
        addListener("mousemove", onCursorMoveLoopStart, false);
        addListener("touchmove", onCursorMoveLoopStart, false);
      };

      this.loopBarStart.addEventListener("mousedown", onMouseDownLoopStart, false);
      this.loopBarStart.addEventListener("touchstart", onMouseDownLoopStart, {
        passive: true
      }, false);

      var onCursorMoveLoopEnd = function onCursorMoveLoopEnd(e) {
        e.preventDefault();

        var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
        var viewportOffset = _this2.totalBar.getBoundingClientRect();
        var positionX = clientX - viewportOffset.left;
        if (positionX < 0) {
          positionX = 0;
        } else if (positionX > _this2.totalBar.offsetWidth) {
          positionX = _this2.totalBar.offsetWidth;
        }

        if (_this2.runningBar.offsetWidth + (parseFloat(_this2.loopBar.style.left) || 0) > positionX) {
          _this2.runningBar.style.width = positionX - parseFloat(_this2.loopBar.style.left) + "px";
        }

        if (_this2.loopLastPositionXPxls - positionX < 0) {
          _this2.loopBar.style.width = Math.abs(_this2.loopLastPositionXPxls - positionX) + "px";
        } else {
          _this2.loopBar.style.left = positionX + "px";
          _this2.loopLastPositionXPxls = positionX;
        }

        var newLoopStartMillisecond = Math.round(_this2.clip.duration * parseFloat(_this2.loopBar.style.left) / _this2.totalBar.offsetWidth);
        if (_this2.loopStartMillisecond > newLoopStartMillisecond) {
          _this2.loopStartMillisecond = newLoopStartMillisecond;
          _this2.loopJourney = true;
        }

        _this2.loopEndMillisecond = Math.round(_this2.clip.duration * ((parseFloat(_this2.loopBar.style.left) || 0) + parseFloat(_this2.loopBar.style.width)) / _this2.totalBar.offsetWidth);

        elid("mc-player-loopbar-end-time").innerHTML = _this2.loopEndMillisecond;
        elid("mc-player-loopbar-start-time").innerHTML = _this2.loopStartMillisecond;
      };

      var onMouseUpLoopEnd = function onMouseUpLoopEnd(e) {
        _this2.resizeLoop = false;
        e.preventDefault();
        _this2.runningBar.style.width = _this2.runningBar.offsetWidth / _this2.loopBar.offsetWidth * 100 + "%";

        _this2.loopBar.style.left = (parseFloat(_this2.loopBar.style.left) || 0) / _this2.totalBar.offsetWidth * 100 + "%";

        _this2.loopBar.style.width = parseFloat(_this2.loopBar.style.width) / _this2.totalBar.offsetWidth * 100 + "%";

        _this2.loopLastPositionXPercentage = _this2.loopLastPositionXPxls / _this2.loopBar.offsetWidth;

        _this2.loopStartMillisecond = Math.round(_this2.clip.duration * parseFloat(_this2.loopBar.style.left) / 100);

        _this2.loopEndMillisecond = Math.round(_this2.clip.duration * ((parseFloat(_this2.loopBar.style.left) || 0) + parseFloat(_this2.loopBar.style.width)) / 100);

        if (_this2.loopJourney) {
          _this2.handleDragStart();
          _this2.handleDrag(_this2.runningBar.offsetWidth);
          _this2.handleDragEnd();
          _this2.loopJourney = false;
        }
        removeListener("mouseup", onMouseUpLoopEnd, false);
        removeListener("touchend", onMouseUpLoopEnd, false);
        removeListener("mousemove", onCursorMoveLoopEnd, false);
        removeListener("touchmove", onCursorMoveLoopEnd, false);
        _this2.loopBar.addEventListener("mousedown", onMouseDown, false);
        _this2.loopBar.addEventListener("touchstart", onMouseDown, {
          passive: true
        }, false);

        if (_this2.playAfterResize) {
          if (_this2.clip.state === "idle") {
            var loopms = void 0;
            if (_this2.clip.speed >= 0) {
              loopms = _this2.loopStartMillisecond + 1;
            } else {
              loopms = _this2.loopEndMillisecond - 1;
            }
            _this2.needsUpdate = true;
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(loopms);
            _this2.journey.destination();
            _this2.clip.play();
          } else if (_this2.clip.state === "completed") {
            var _loopms2 = void 0;
            if (_this2.clip.speed >= 0) {
              _loopms2 = _this2.loopStartMillisecond + 1;
            } else {
              _loopms2 = _this2.loopEndMillisecond - 1;
            }
            _this2.needsUpdate = true;
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_loopms2);
            _this2.journey.destination();
            _this2.clip.play();
          } else {
            _this2.clip.resume();
          }
          _this2.playAfterResize = false;
        }
      };

      var onMouseDownLoopEnd = function onMouseDownLoopEnd(e) {
        _this2.resizeLoop = true;
        _this2.needsUpdate = true;

        if (_this2.clip.state === "playing") {
          _this2.clip.wait();
          _this2.playAfterResize = true;
        }
        e.preventDefault();
        _this2.runningBar.style.width = _this2.runningBar.offsetWidth + "px";

        _this2.loopBar.style.left = (parseFloat(_this2.loopBar.style.left) || 0) / 100 * _this2.totalBar.offsetWidth + "px";

        if (_this2.loopLastPositionXPxls - _this2.loopLastPositionXPercentage * _this2.loopBar.offsetWidth > 1 || _this2.loopLastPositionXPercentage * _this2.loopBar.offsetWidth - _this2.loopLastPositionXPxls > 1) {
          _this2.loopLastPositionXPxls = _this2.loopLastPositionXPercentage * _this2.loopBar.offsetWidth;
        }

        _this2.loopBar.style.width = _this2.loopBar.offsetWidth + "px";
        _this2.loopBar.removeEventListener("mousedown", onMouseDown, false);
        _this2.loopBar.removeEventListener("touchstart", onMouseDown, false);
        onCursorMoveLoopEnd(e);
        addListener("mouseup", onMouseUpLoopEnd, false);
        addListener("touchend", onMouseUpLoopEnd, false);
        addListener("mousemove", onCursorMoveLoopEnd, false);
        addListener("touchmove", onCursorMoveLoopEnd, false);
      };

      this.loopBarEnd.addEventListener("mousedown", onMouseDownLoopEnd, false);
      this.loopBarEnd.addEventListener("touchstart", onMouseDownLoopEnd, {
        passive: true
      }, false);

      // only on desctop devices
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var loopBarMouseInOut = function loopBarMouseInOut() {
          elid("mc-player-hover-display").classList.toggle("m-fadeOut");
          elid("mc-player-hover-display").classList.toggle("m-fadeIn");

          if (elid("mc-player-hover-display").className.includes("m-fadeIn")) {
            _this2.hoverJourney = hoverTimeCapsule.startJourney(_this2.previewClip);
          } else {
            _this2.hoverJourney.destination();
          }
          _this2.loopBar.onmousemove = _loopBarMouseMove;
        };
        var loopBarAddListeners = function loopBarAddListeners() {
          loopBarMouseInOut();
          _this2.loopBar.onmouseover = _this2.loopBar.onmouseout = loopBarMouseInOut;
          _this2.loopBar.onmousemove = _loopBarMouseMove;
          removeListener("mouseup", loopBarAddListeners, false);
          removeListener("touchend", loopBarAddListeners, false);
          removeListener("mousemove", _loopBarMouseMove, false);
          removeListener("touchmove", _loopBarMouseMove, false);
        };

        this.loopBar.onmouseover = this.loopBar.onmouseout = loopBarMouseInOut;

        this.loopBar.onmousedown = function () {
          _this2.loopBar.onmouseover = _this2.loopBar.onmouseout = null;
          _this2.loopBar.onmousemove = null;
          addListener("mouseup", loopBarAddListeners, false);
          addListener("touchend", loopBarAddListeners, false);
          addListener("mousemove", _loopBarMouseMove, false);
          addListener("touchmove", _loopBarMouseMove, false);
        };
        this.loopBar.onmouseup = function () {
          removeListener("mouseup", loopBarAddListeners, false);
          removeListener("touchend", loopBarAddListeners, false);
          removeListener("mousemove", _loopBarMouseMove, false);
          removeListener("touchmove", _loopBarMouseMove, false);
          _this2.loopBar.onmouseover = _this2.loopBar.onmouseout = loopBarMouseInOut;
          _this2.loopBar.onmousemove = _loopBarMouseMove;
        };

        var _loopBarMouseMove = function _loopBarMouseMove(e) {
          var clientX = e.clientX;
          var viewportOffset = _this2.loopBar.getBoundingClientRect();
          if (clientX - viewportOffset.left + _this2.loopLastPositionXPxls > _this2.loopLastPositionXPxls + _this2.loopBar.offsetWidth && !_this2.resizeLoop) {
            elid("mc-player-hover-millisecond").innerHTML = _this2.loopEndMillisecond;
            return;
          } else if (clientX - viewportOffset.left < 0 && !_this2.resizeLoop) {
            elid("mc-player-hover-millisecond").innerHTML = _this2.loopStartMillisecond;
            return;
          }

          var positionX = clientX - viewportOffset.left + _this2.loopLastPositionXPxls;

          if (positionX < 0) {
            positionX = 0;
          }

          var left = positionX - elid("mc-player-hover-display").offsetWidth / 2;

          if (left < 0) {
            left = 0;
          } else if (left + elid("mc-player-hover-display").offsetWidth > _this2.totalBar.offsetWidth) {
            left = _this2.totalBar.offsetWidth - elid("mc-player-hover-display").offsetWidth;
          }

          var ms = Math.round(positionX / _this2.totalBar.offsetWidth * _this2.clip.duration);

          _this2.hoverJourney.station(ms);

          elid("mc-player-hover-millisecond").innerHTML = ms;
          elid("mc-player-hover-display").style.left = left + "px";
        };
      }

      el("body")[0].addEventListener("click", function (e) {
        if (e.target.className === "mc-player-speed-value") {
          var speedDisplay = e.target.dataset.speedValue - 0;
          _this2.clip.executionSpeed = e.target.dataset.speedValue;
          _this2.clip.speed == 1 ? speedDisplay = "Normal" : speedDisplay = _this2.clip.speed;
          _this2.speedCurrent.innerHTML = speedDisplay;

          var step = 1 / (_this2.speedValues.length - 1);

          var positionY = (e.target.dataset.zone * step - 1) * -1 * 128.5;

          elid("mc-player-speed-cursor").style.top = positionY + "px";
        }
      });
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
  }, {
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
  }, {
    key: "setTheme",
    value: function setTheme() {
      // replace multiple spaces with one space
      this.theme.replace(/\s\s+/g, " ");
      this.theme.trim();

      if (!this.theme.includes("on-top") && !this.theme.includes("position-default")) {
        this.theme += " position-default";
      }

      var theme = {};
      for (var i in this.theme.split(" ")) {
        var confTheme = confThemes(this.theme.split(" ")[i]);
        for (var q in confTheme || {}) {
          theme[q] = confTheme[q];
        }
      }
      var css = confStyle(theme);

      var style = elcreate("style");

      style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css));

      // append player style to document
      eltag("head")[0].appendChild(style);
    }
  }, {
    key: "setSpeed",
    value: function setSpeed() {
      var _this3 = this;

      var currentSpeed = void 0;
      this.clip.speed == 1 ? currentSpeed = "Normal" : currentSpeed = this.clip.speed;
      this.speedCurrent.innerHTML = currentSpeed;

      var targetZone = function () {
        for (var i = 0; i < _this3.speedValues.length - 1; i++) {
          if (_this3.speedValues[i] <= _this3.clip.speed && _this3.speedValues[i + 1] > _this3.clip.speed) {
            return i + Math.abs((_this3.clip.speed - _this3.speedValues[i]) / (_this3.speedValues[i] - _this3.speedValues[i + 1]));
          }
        }
      }();

      var step = 1 / 8;

      var positionY = (targetZone * step - 1) * -1 * 128.5;

      elid("mc-player-speed-cursor").style.top = positionY + "px";
    }
  }, {
    key: "createHoverDisplay",
    value: function createHoverDisplay() {
      var clip = this.clip.props.host.getElementsByTagName("iframe")[0];

      var definition = this.clip.exportState({ unprocessed: true });

      definition.props.host = elid("mc-player-hover-display");
      this.previewClip = MC.ClipFromDefinition(definition, this.clipClass);
      // console.log("asdfsadfdsafsad", this.clip, this.previewClip);

      var previewClip = this.previewClip.props.host.getElementsByTagName("iframe")[0];

      previewClip.style.position = "absolute";

      previewClip.style.zIndex = 1;

      var clipWidth = clip.offsetWidth;

      var clipHeight = clip.offsetHeight;

      var previewRatio = 0.253125;

      var previewWidth = Math.round(clipWidth * previewRatio);

      // max width is 300
      if (previewWidth > parseFloat(elid("mc-player-hover-display").style.maxWidth)) {
        previewWidth = parseFloat(elid("mc-player-hover-display").style.maxWidth);
      }

      elid("mc-player-hover-display").style.width = previewWidth + "px";

      var previewHeight = Math.round(clipHeight / clipWidth * previewWidth);

      elid("mc-player-hover-display").style.height = previewHeight + "px";

      var scaleY = previewHeight / clipHeight;
      var scaleX = previewWidth / clipWidth;

      previewClip.style.transform = "scale(" + scaleX + "," + scaleY + ")";
      previewClip.style.transformOrigin = "center bottom";

      // check if width of iframe is percentage
      if (this.clip.props.containerParams.width.includes("%")) {
        previewClip.style.width = 100 + 100 * previewRatio + parseFloat(this.clip.props.containerParams.width) / previewRatio + "%";
      }

      if (this.clip.props.containerParams.height.includes("%")) {
        previewClip.style.height = 100 + 100 * previewRatio + parseFloat(this.clip.props.containerParams.height) / previewRatio + "%";
      }
    }
  }]);

  return Player;
}();

var el = function el(selector) {
  return document.querySelectorAll(selector);
};
var elid = function elid(id) {
  return document.getElementById(id);
};
var eltag = function eltag(tag) {
  return document.getElementsByTagName(tag);
};
var elcreate = function elcreate(tag) {
  return document.createElement(tag);
};
var addListener = function addListener() {
  var _document;

  return (_document = document).addEventListener.apply(_document, arguments);
};
var removeListener = function removeListener() {
  var _document2;

  return (_document2 = document).removeEventListener.apply(_document2, arguments);
};

module.exports = Player;