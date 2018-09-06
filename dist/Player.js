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
    var _this = this;

    _classCallCheck(this, Player);

    this.id = options.id || helper.getAnId(); // timer id
    this.clip = options.clip; // host to apply the timer
    this.clipClass = options.clipClass;
    options.preview = options.preview || false;
    this.options = options;
    this.previewClip = null;
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
    this.settingsShowPreview = elid("mc-player-settings-preview");
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

    this.volumeBar = elid("mc-player-volumebar-helper");
    this.volumeBarActive = elid("mc-player-volumebar-active");

    this.currentTime.innerHTML = 0;
    this.totalTime.innerHTML = this.clip.duration;
    this.timeSeparator.innerHTML = "/";
    this.settingsSpeedPanel.style.display = "none";
    this.settingsPanel.classList.add("m-fadeOut");
    this.indicator.style.visibility = "hidden";
    this.indicator.innerHTML = this.clip.state;

    this.settingsSpeedPanel.getElementsByTagName("li")[1].classList.add("no-hover");

    this.loopBarStart.style.left = "0%";
    this.loopBarEnd.style.left = "100%";
    this.loopBarStart.classList.add("m-fadeOut");
    this.loopBarEnd.classList.add("m-fadeOut");
    this.loopStartTime = elid("mc-player-loopbar-start-time");
    this.loopEndTime = elid("mc-player-loopbar-end-time");

    this.editableLoopStartTime = document.createElement("input");
    this.editableLoopStartTime.type = "text";
    this.editableLoopStartTime.size = elid("mc-player-time-total").innerHTML.length + 1;
    this.editableLoopStartTime.maxLength = elid("mc-player-time-total").innerHTML.length;
    this.editableLoopStartTime.style.height = elid("mc-player-time-total").offsetHeight;
    this.editableLoopStartTime.value = elid("mc-player-loopbar-start-time").innerHTML;
    this.editableLoopStartTime.pattern = "d*";
    this.editableLoopStartTime.style.fontSize = "8px";

    this.editableLoopEndTime = document.createElement("input");
    this.editableLoopEndTime.type = "text";
    this.editableLoopEndTime.size = elid("mc-player-time-total").innerHTML.length + 1;
    this.editableLoopEndTime.maxLength = elid("mc-player-time-total").innerHTML.length;
    this.editableLoopEndTime.style.height = elid("mc-player-time-total").offsetHeight;
    this.editableLoopEndTime.value = elid("mc-player-loopbar-start-time").innerHTML;
    this.editableLoopEndTime.pattern = "d*";
    this.editableLoopEndTime.style.fontSize = "8px";

    elid("mc-player-loop-time").classList.add("m-fadeOut");

    elid("mc-player-hover-display").classList.add("m-fadeOut");

    this.setSpeed();
    this.setTheme();
    this.subscribeToTimer();
    this.subscribeToEvents();
    this.addEventListeners();

    if (this.options.preview) {
      elid("mc-player-show-preview-checkbox").checked = this.options.preview;
      this.createHoverDisplay();
    }

    window.addEventListener("resize", function () {
      if (_this.options.preview) {
        _this.setPreviewDimentions();
      }
    });
  }

  _createClass(Player, [{
    key: "millisecondChange",
    value: function millisecondChange(millisecond) {
      var _this2 = this;

      if (!this.needsUpdate) {
        this.clip.wait();
        return 1;
      }
      var duration = this.clip.duration;

      // zero value if style.left is null
      var loopBarLeft = this.loopBar.offsetLeft / this.totalBar.offsetWidth;

      var loopBarWidth = this.loopBar.offsetWidth;

      var localMillisecond = millisecond - duration * loopBarLeft;

      var localDuration = duration / this.totalBar.offsetWidth * loopBarWidth;

      if (millisecond >= this.loopEndMillisecond && this.loopButton.className.includes("svg-selected")) {
        this.needsUpdate = false;
        setTimeout(function () {
          if (_this2.clip.state === "idle") {
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_this2.loopStartMillisecond + 1);
            _this2.journey.destination();
            _this2.clip.play();
          } else if (_this2.clip.state === "completed") {
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_this2.loopStartMillisecond + 1);
            _this2.journey.destination();
            _this2.clip.play();
          } else {
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_this2.loopStartMillisecond + 1);
            _this2.journey.destination();
            _this2.clip.resume();
          }
          _this2.needsUpdate = true;
        }, 0);
        return 1;
      } else if (millisecond <= this.loopStartMillisecond && this.loopButton.className.includes("svg-selected")) {
        this.needsUpdate = false;
        setTimeout(function () {
          if (_this2.clip.state === "idle") {
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_this2.loopEndMillisecond - 1);
            _this2.journey.destination();
            _this2.clip.play();
          } else if (_this2.clip.state === "completed") {
            _this2.clip.stop();
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_this2.loopEndMillisecond - 1);
            _this2.journey.destination();
            _this2.clip.play();
          } else {
            _this2.journey = timeCapsule.startJourney(_this2.clip);
            _this2.journey.station(_this2.loopEndMillisecond - 1);
            _this2.journey.destination();
            _this2.clip.resume();
          }
          _this2.needsUpdate = true;
        }, 0);
        return 1;
      } else if (millisecond >= this.loopEndMillisecond) {
        this.needsUpdate = false;
        setTimeout(function () {
          _this2.journey = timeCapsule.startJourney(_this2.clip);
          _this2.journey.station(_this2.loopEndMillisecond);
          _this2.journey.destination();
        }, 0);
        this.runningBar.style.width = "100%";
        this.currentTime.innerHTML = this.loopEndMillisecond;
        return 1;
      } else if (millisecond <= this.loopStartMillisecond) {
        this.needsUpdate = false;
        setTimeout(function () {
          _this2.journey = timeCapsule.startJourney(_this2.clip);
          _this2.journey.station(_this2.loopStartMillisecond);
          _this2.journey.destination();
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
        } else {
          this.indicator.innerHTML = meta.newSTate;
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

      var totalBarPositionX = loopBarPositionX + this.loopBar.offsetLeft;

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
      var _this3 = this;

      var onCursorMoveVolumeBar = function onCursorMoveVolumeBar(e) {
        e.preventDefault();
        var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
        var viewportOffset = _this3.volumeBar.getBoundingClientRect();
        var positionX = clientX - viewportOffset.left;

        if (positionX < 0) {
          positionX = 0;
        } else if (positionX > _this3.volumeBar.offsetWidth) {
          positionX = _this3.volumeBar.offsetWidth;
        }
        var volume = Number((positionX / _this3.volumeBar.offsetWidth).toFixed(2));
        _this3.volumeBarActive.style.width = volume * 100 + "%";
        _this3.clip.setVolume(volume);
      };

      var onMouseUpVolumeBar = function onMouseUpVolumeBar(e) {
        e.preventDefault();
        removeListener("mouseup", onMouseUpVolumeBar, false);
        removeListener("touchend", onMouseUpVolumeBar, false);
        removeListener("mousemove", onCursorMoveVolumeBar, false);
        removeListener("touchmove", onCursorMoveVolumeBar, false);
      };

      var onMouseDownVolumeBar = function onMouseDownVolumeBar(e) {
        e.preventDefault();
        onCursorMoveVolumeBar(e);
        addListener("mouseup", onMouseUpVolumeBar, false);
        addListener("touchend", onMouseUpVolumeBar, false);
        addListener("mousemove", onCursorMoveVolumeBar, false);
        addListener("touchmove", onCursorMoveVolumeBar, false);
      };

      this.volumeBar.addEventListener("mousedown", onMouseDownVolumeBar, false);
      this.volumeBar.addEventListener("touchstart", onMouseDownVolumeBar, {
        passive: true
      }, false);
      /* 
      * Play - pause - replay interactions
      */

      var editableLoopStartTime = function editableLoopStartTime() {
        _this3.editableLoopStartTime.value = _this3.loopStartTime.innerHTML;
        _this3.loopStartTime.replaceWith(_this3.editableLoopStartTime);
        _this3.editableLoopStartTime.focus();
      };

      var editableLoopEndTime = function editableLoopEndTime() {
        _this3.editableLoopEndTime.value = _this3.loopEndTime.innerHTML;
        _this3.loopEndTime.replaceWith(_this3.editableLoopEndTime);
        _this3.editableLoopEndTime.focus();
      };

      this.editableLoopEndTime.onkeydown = this.editableLoopStartTime.onkeydown = function (e) {
        e.preventDefault();
        if (e.keyCode === 8) {
          e.target.value = e.target.value.toString().substring(0, e.target.value.toString().length - 1);
        }

        if (e.keyCode === 13) {
          e.target.blur();
        }

        var newValue = parseFloat((e.target.value || 0).toString() + e.key);

        if (newValue > _this3.clip.duration) {
          return;
        }
        e.target.value = newValue;

        if (e.target === _this3.editableLoopStartTime) {
          var viewportOffset = _this3.totalBar.getBoundingClientRect();
          var event = {
            preventDefault: function preventDefault() {},
            clientX: _this3.totalBar.offsetWidth / _this3.clip.duration * e.target.value + viewportOffset.left
          };
          onMouseDownLoopStart(event);
          onCursorMoveLoopStart(event);
          onMouseUpLoopStart(event);
        } else if (e.target === _this3.editableLoopEndTime) {
          var _viewportOffset = _this3.totalBar.getBoundingClientRect();
          var _event = {
            preventDefault: function preventDefault() {},
            clientX: _this3.totalBar.offsetWidth / _this3.clip.duration * e.target.value + _viewportOffset.left
          };
          onMouseDownLoopEnd(_event);
          onCursorMoveLoopEnd(_event);
          onMouseUpLoopEnd(_event);
        }
      };

      this.loopStartTime.onclick = editableLoopStartTime;
      this.loopEndTime.onclick = editableLoopEndTime;

      this.editableLoopStartTime.onfocusout = function () {
        _this3.editableLoopStartTime.replaceWith(_this3.loopStartTime);
      };

      this.editableLoopEndTime.onfocusout = function () {
        _this3.editableLoopEndTime.replaceWith(_this3.loopEndTime);
      };

      this.statusButton.onclick = function (e) {
        e.preventDefault();
        if (_this3.clip.state === "playing") {
          _this3.clip.wait();
        } else if (_this3.clip.state === "waiting") {
          _this3.clip.resume();
        } else if (_this3.clip.state === "idle") {
          if (_this3.clip.speed >= 0) {
            _this3.clip.play();
            _this3.needsUpdate = true;
          } else {
            _this3.clip.stop();
            _this3.journey = timeCapsule.startJourney(_this3.clip);
            _this3.journey.station(_this3.loopEndMillisecond - 1);
            _this3.journey.destination();
            _this3.clip.play();
            _this3.needsUpdate = true;
          }
        } else if (_this3.clip.state === "completed") {
          if (_this3.clip.speed >= 0) {
            _this3.clip.stop();
            _this3.journey = timeCapsule.startJourney(_this3.clip);
            _this3.journey.station(0);
            _this3.journey.destination();
            _this3.clip.play();
            _this3.needsUpdate = true;
          } else {
            _this3.clip.stop();
            _this3.journey = timeCapsule.startJourney(_this3.clip);
            _this3.journey.station(_this3.loopEndMillisecond - 1);
            _this3.journey.destination();
            _this3.clip.play();
            _this3.needsUpdate = true;
          }
        }
      };

      this.settingsShowIndicator.onclick = function (e) {
        e.preventDefault();
        var checkbox = elid("mc-player-show-indicator-checkbox");
        if (checkbox.checked) {
          checkbox.checked = false;
          _this3.indicator.style.visibility = "hidden";
          _this3.statusButton.style.margin = "10px 5px 5px 5px";
          _this3.statusButton.style.height = "25px";
          _this3.statusButton.style.width = "45px";
          _this3.timeDisplay.style.left = "50px";
        } else {
          checkbox.checked = true;
          _this3.indicator.style.visibility = "visible";
          _this3.statusButton.style.margin = "10px 5px 12px 5px";
          _this3.statusButton.style.width = "55px";
          _this3.timeDisplay.style.left = "60px";
          _this3.statusButton.style.height = "18px";
        }
      };

      this.settingsShowPreview.onclick = function (e) {
        e.preventDefault();
        var checkbox = elid("mc-player-show-preview-checkbox");
        if (checkbox.checked) {
          checkbox.checked = false;
          elid("mc-player-hover-display").style.visibility = "hidden";
          elid("mc-player-hover-display").style.display = "none";
          _this3.options.preview = false;
        } else {
          if (!_this3.previewClip) {
            _this3.createHoverDisplay();
          }
          checkbox.checked = true;
          elid("mc-player-hover-display").style.visibility = "visible";
          elid("mc-player-hover-display").style.display = "flex";
          _this3.options.preview = true;
        }
      };

      this.settingsButton.onclick = function (e) {
        e.preventDefault();

        var showHideSettings = function showHideSettings(e) {
          if (_this3.settingsPanel.contains(e.target)) {
            return true;
          }
          _this3.settingsPanel.classList.toggle("m-fadeOut");
          _this3.settingsPanel.classList.toggle("m-fadeIn");
          if (_this3.settingsPanel.className.includes("m-fadeOut")) {
            removeListener("click", showHideSettings, false);
          }
        };

        if (_this3.settingsPanel.className.includes("m-fadeOut")) {
          addListener("click", showHideSettings, false);
        } else {
          removeListener("click", showHideSettings, false);
        }
      };
      this.settingsSpeedButtonShow.onclick = this.settingsSpeedButtonHide.onclick = function (e) {
        e.preventDefault();
        _this3.settingsPanel.classList.toggle("mc-player-settings-speed-panel");
        var includesClass = _this3.settingsPanel.className.includes("mc-player-settings-speed-panel");
        if (includesClass) {
          _this3.settingsMainPanel.style.display = "none";
          _this3.settingsSpeedPanel.style.display = "block";
        } else {
          _this3.settingsSpeedPanel.style.display = "none";
          _this3.settingsMainPanel.style.display = "block";
        }
      };

      var onCursorMove = function onCursorMove(e) {
        e.preventDefault();
        var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
        var viewportOffset = _this3.loopBar.getBoundingClientRect();
        var positionX = clientX - viewportOffset.left;

        if (positionX < 0) {
          positionX = 0;
        } else if (positionX > _this3.loopBar.offsetWidth) {
          positionX = _this3.loopBar.offsetWidth;
        }
        _this3.handleDrag(positionX);
      };

      var onMouseUp = function onMouseUp(e) {
        e.preventDefault();
        removeListener("mouseup", onMouseUp, false);
        removeListener("touchend", onMouseUp, false);
        removeListener("mousemove", onCursorMove, false);
        removeListener("touchmove", onCursorMove, false);
        _this3.handleDragEnd();

        if (_this3.playAfterResize) {
          if (_this3.clip.state === "idle" && !_this3.loopButton.className.includes("svg-selected")) {
            _this3.clip.play();
          } else if (_this3.clip.state === "completed" && !_this3.loopButton.className.includes("svg-selected")) {
            _this3.clip.stop();
            _this3.journey = timeCapsule.startJourney(_this3.clip);
            _this3.journey.station(_this3.loopEndMillisecond - 1);
            _this3.journey.destination();
            _this3.clip.play();
          } else if ((_this3.clip.state === "completed" || _this3.clip.state === "idle") && _this3.loopButton.className.includes("svg-selected")) {
            _this3.clip.stop();
            _this3.journey = timeCapsule.startJourney(_this3.clip);
            _this3.clip.speed >= 0 ? _this3.journey.station(_this3.loopStartMillisecond + 1) : _this3.journey.station(_this3.loopEndMillisecond - 1);
            _this3.journey.destination();
            _this3.clip.play();
          } else {
            _this3.clip.resume();
          }
          _this3.playAfterResize = false;
        }
      };

      var onMouseDown = function onMouseDown(e) {
        e.preventDefault();
        if (_this3.clip.state === "playing") {
          _this3.playAfterResize = true;
        }
        _this3.handleDragStart();
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
        var viewportOffset = _this3.speedBar.getBoundingClientRect();
        var clientY = e.clientY || ((e.touches || [])[0] || {}).clientY;
        var positionY = clientY - viewportOffset.top;

        positionY -= 8;
        if (positionY < 0) {
          positionY = 0;
        } else if (positionY > _this3.speedBar.offsetHeight - 15.5) {
          positionY = _this3.speedBar.offsetHeight - 15.5;
        }

        // show speed
        var percentage = (positionY / 128.5 - 1) * -1;
        var step = 1 / 8;
        var speed = _this3.calculateSpeed(step, _this3.speedValues, percentage);
        elid("mc-player-speed-runtime").innerHTML = speed + "0";
        elid("mc-player-speed-cursor").style.top = positionY + "px";
        _this3.clip.executionSpeed = speed;
      };

      var onMouseUpSpeedBar = function onMouseUpSpeedBar(e) {
        e.preventDefault();
        removeListener("mouseup", onMouseUpSpeedBar, false);
        removeListener("touchend", onMouseUpSpeedBar, false);
        removeListener("mousemove", onCursorMoveSpeedBar, false);
        removeListener("touchmove", onCursorMoveSpeedBar, false);
        elid("mc-player-speed-runtime").innerHTML = "Speed";
        var speedDisplay = void 0;
        _this3.clip.speed == 1 ? speedDisplay = "Normal" : speedDisplay = _this3.clip.speed;

        _this3.speedCurrent.innerHTML = speedDisplay;
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
        var elFullScreen = _this3.clip.props.host.className.includes("full-screen");
        elFullScreen ? _this3.exitFullscreen() : _this3.launchIntoFullscreen(_this3.clip.props.host);
        _this3.clip.props.host.classList.toggle("full-screen");
      });

      this.loopButton.onclick = function () {
        _this3.loopButton.classList.toggle("svg-selected");
        _this3.loopBarStart.classList.toggle("m-fadeOut");
        _this3.loopBarEnd.classList.toggle("m-fadeOut");
        _this3.loopBarStart.classList.toggle("m-fadeIn");
        _this3.loopBarEnd.classList.toggle("m-fadeIn");
        elid("mc-player-loop-time").classList.toggle("m-fadeOut");
        elid("mc-player-loop-time").classList.toggle("m-fadeIn");

        _this3.loopEndTime.innerHTML = _this3.loopEndMillisecond;
        _this3.loopStartTime.innerHTML = _this3.loopStartMillisecond;
        _this3.needsUpdate = true;

        if (elid("mc-player-loop-time").className.includes("m-fadeOut")) {
          _this3.loopBar.style.left = "0%";
          _this3.loopBar.style.width = "100%";
          _this3.loopStartMillisecond = 0;
          _this3.loopEndMillisecond = _this3.clip.duration;
          _this3.loopLastPositionXPxls = 0;
          _this3.loopLastPositionXPercentage = 0;
          _this3.runningBar.style.width = _this3.clip.runTimeInfo.currentMillisecond / _this3.clip.duration * 100 + "%";
        }
      };

      elid("mc-player-controls").onmouseover = function () {
        if (!_this3.loopButton.className.includes("svg-selected")) {
          return;
        }
        _this3.loopBarStart.classList.remove("m-fadeOut");
        _this3.loopBarEnd.classList.remove("m-fadeOut");
        _this3.loopBarStart.classList.add("m-fadeIn");
        _this3.loopBarEnd.classList.add("m-fadeIn");
      };

      elid("mc-player-controls").onmouseout = function () {
        if (!_this3.loopButton.className.includes("svg-selected")) {
          return;
        }
        _this3.loopBarStart.classList.add("m-fadeOut");
        _this3.loopBarEnd.classList.add("m-fadeOut");
        _this3.loopBarStart.classList.remove("m-fadeIn");
        _this3.loopBarEnd.classList.remove("m-fadeIn");
      };

      var onCursorMoveLoopStart = function onCursorMoveLoopStart(e) {
        e.preventDefault();
        var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
        var viewportOffset = _this3.totalBar.getBoundingClientRect();
        var positionX = clientX - viewportOffset.left;

        var endPosition = _this3.loopBar.offsetWidth + _this3.loopBar.offsetLeft;
        if (positionX < 0) {
          positionX = 0;
        } else if (positionX > _this3.totalBar.offsetWidth) {
          positionX = _this3.totalBar.offsetWidth;
        }

        var loopBarDeltaX = positionX - _this3.loopLastPositionXPxls || 0;
        var runningBarWidthInPxls = _this3.runningBar.offsetWidth - loopBarDeltaX;

        _this3.loopBar.style.left = positionX + "px";

        var diff = endPosition - _this3.loopBar.offsetLeft;
        _this3.loopBar.style.width = diff + "px";

        _this3.runningBar.style.width = runningBarWidthInPxls + "px";

        _this3.loopLastPositionXPxls = positionX;

        _this3.loopStartMillisecond = Math.round(_this3.clip.duration * _this3.loopBar.offsetLeft / _this3.totalBar.offsetWidth);

        if (_this3.loopEndMillisecond < _this3.loopStartMillisecond) {
          _this3.loopEndMillisecond = _this3.loopStartMillisecond;
          _this3.loopBar.style.width = "0px";
          _this3.runningBar.style.width = "0px";
        }

        _this3.loopEndTime.innerHTML = _this3.loopEndMillisecond;
        _this3.loopStartTime.innerHTML = _this3.loopStartMillisecond;

        if (_this3.loopStartMillisecond > _this3.clip.runTimeInfo.currentMillisecond) {
          _this3.loopJourney = true;
        }
      };

      var onMouseUpLoopStart = function onMouseUpLoopStart(e) {
        _this3.resizeLoop = false;

        e.preventDefault();
        if (_this3.loopJourney) {
          _this3.handleDragStart();
          _this3.handleDrag(_this3.runningBar.offsetWidth);
          _this3.handleDragEnd();
          _this3.loopJourney = false;
        }

        _this3.loopBar.style.left = _this3.loopBar.offsetLeft / _this3.totalBar.offsetWidth * 100 + "%";

        _this3.loopBar.style.width = _this3.loopBar.offsetWidth / _this3.totalBar.offsetWidth * 100 + "%";

        _this3.loopStartMillisecond = Math.round(_this3.clip.duration * _this3.loopBar.offsetLeft / _this3.totalBar.offsetWidth);

        _this3.runningBar.style.width = _this3.runningBar.offsetWidth / _this3.loopBar.offsetWidth * 100 + "%";
        removeListener("mouseup", onMouseUpLoopStart, false);
        removeListener("touchend", onMouseUpLoopStart, false);
        removeListener("mousemove", onCursorMoveLoopStart, false);
        removeListener("touchmove", onCursorMoveLoopStart, false);
        _this3.loopBar.addEventListener("mousedown", onMouseDown, false);
        _this3.loopBar.addEventListener("touchstart", onMouseDown, {
          passive: true
        }, false);

        if (_this3.playAfterResize) {
          if (_this3.clip.state === "idle") {
            var loopms = void 0;
            if (_this3.clip.speed >= 0) {
              loopms = _this3.loopStartMillisecond + 1;
            } else {
              loopms = _this3.loopEndMillisecond - 1;
            }
            _this3.needsUpdate = true;
            _this3.clip.stop();
            _this3.journey = timeCapsule.startJourney(_this3.clip);
            _this3.journey.station(loopms);
            _this3.journey.destination();
            _this3.clip.play();
          } else if (_this3.clip.state === "completed") {
            var _loopms = void 0;
            if (_this3.clip.speed >= 0) {
              _loopms = _this3.loopStartMillisecond + 1;
            } else {
              _loopms = _this3.loopEndMillisecond - 1;
            }
            _this3.needsUpdate = true;
            _this3.clip.stop();
            _this3.journey = timeCapsule.startJourney(_this3.clip);
            _this3.journey.station(_loopms);
            _this3.journey.destination();
            _this3.clip.play();
          } else {
            _this3.clip.resume();
          }
          _this3.playAfterResize = false;
        }
      };

      var onMouseDownLoopStart = function onMouseDownLoopStart(e) {
        _this3.resizeLoop = true;

        e.preventDefault();
        _this3.needsUpdate = true;

        if (_this3.clip.state === "playing") {
          _this3.clip.wait();
          _this3.playAfterResize = true;
        }

        _this3.loopBar.removeEventListener("mousedown", onMouseDown, false);
        _this3.loopBar.removeEventListener("touchstart", onMouseDown, false);
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
        var viewportOffset = _this3.totalBar.getBoundingClientRect();
        var positionX = clientX - viewportOffset.left;

        if (positionX < 0) {
          positionX = 0;
        } else if (positionX > _this3.totalBar.offsetWidth) {
          positionX = _this3.totalBar.offsetWidth;
        }

        if (_this3.runningBar.offsetWidth + _this3.loopBar.offsetLeft > positionX) {
          _this3.runningBar.style.width = positionX - _this3.loopBar.offsetLeft + "px";
        }

        if (_this3.loopLastPositionXPxls - positionX < 0) {
          _this3.loopBar.style.width = Math.abs(_this3.loopLastPositionXPxls - positionX) + "px";
        } else {
          _this3.loopBar.style.left = positionX + "px";
          _this3.loopLastPositionXPxls = positionX;
        }

        _this3.loopEndMillisecond = Math.round(_this3.clip.duration * ((parseFloat(_this3.loopBar.style.left) || 0) + parseFloat(_this3.loopBar.style.width)) / _this3.totalBar.offsetWidth);
        if (_this3.loopStartMillisecond > _this3.loopEndMillisecond) {
          _this3.loopStartMillisecond = _this3.loopEndMillisecond;
          _this3.loopJourney = true;
        }
        _this3.loopEndTime.innerHTML = _this3.loopEndMillisecond;
        _this3.loopStartTime.innerHTML = _this3.loopStartMillisecond;
      };

      var onMouseUpLoopEnd = function onMouseUpLoopEnd(e) {
        _this3.resizeLoop = false;
        e.preventDefault();
        _this3.runningBar.style.width = _this3.runningBar.offsetWidth / _this3.loopBar.offsetWidth * 100 + "%";

        _this3.loopBar.style.left = _this3.loopBar.offsetLeft / _this3.totalBar.offsetWidth * 100 + "%";

        _this3.loopBar.style.width = _this3.loopBar.offsetWidth / _this3.totalBar.offsetWidth * 100 + "%";

        _this3.loopStartMillisecond = Math.round(_this3.clip.duration * _this3.loopBar.offsetLeft / 100);

        if (_this3.loopJourney) {
          _this3.handleDragStart();
          _this3.handleDrag(_this3.runningBar.offsetWidth);
          _this3.handleDragEnd();
          _this3.loopJourney = false;
        }
        removeListener("mouseup", onMouseUpLoopEnd, false);
        removeListener("touchend", onMouseUpLoopEnd, false);
        removeListener("mousemove", onCursorMoveLoopEnd, false);
        removeListener("touchmove", onCursorMoveLoopEnd, false);
        _this3.loopBar.addEventListener("mousedown", onMouseDown, false);
        _this3.loopBar.addEventListener("touchstart", onMouseDown, {
          passive: true
        }, false);

        if (_this3.playAfterResize) {
          if (_this3.clip.state === "idle") {
            var loopms = void 0;
            if (_this3.clip.speed >= 0) {
              loopms = _this3.loopStartMillisecond + 1;
            } else {
              loopms = _this3.loopEndMillisecond - 1;
            }
            _this3.needsUpdate = true;
            _this3.clip.stop();
            _this3.journey = timeCapsule.startJourney(_this3.clip);
            _this3.journey.station(loopms);
            _this3.journey.destination();
            _this3.clip.play();
          } else if (_this3.clip.state === "completed") {
            var _loopms2 = void 0;
            if (_this3.clip.speed >= 0) {
              _loopms2 = _this3.loopStartMillisecond + 1;
            } else {
              _loopms2 = _this3.loopEndMillisecond - 1;
            }
            _this3.needsUpdate = true;
            _this3.clip.stop();
            _this3.journey = timeCapsule.startJourney(_this3.clip);
            _this3.journey.station(_loopms2);
            _this3.journey.destination();
            _this3.clip.play();
          } else {
            _this3.clip.resume();
          }
          _this3.playAfterResize = false;
        }
      };

      var onMouseDownLoopEnd = function onMouseDownLoopEnd(e) {
        _this3.resizeLoop = true;
        _this3.needsUpdate = true;

        if (_this3.clip.state === "playing") {
          _this3.clip.wait();
          _this3.playAfterResize = true;
        }
        e.preventDefault();
        _this3.runningBar.style.width = _this3.runningBar.offsetWidth + "px";

        _this3.loopBar.style.left = _this3.loopBar.offsetLeft + "px";

        _this3.loopBar.style.width = _this3.loopBar.offsetWidth + "px";
        _this3.loopBar.removeEventListener("mousedown", onMouseDown, false);
        _this3.loopBar.removeEventListener("touchstart", onMouseDown, false);
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
          if (!_this3.options.preview) {
            return;
          }
          elid("mc-player-hover-display").classList.toggle("m-fadeOut");
          elid("mc-player-hover-display").classList.toggle("m-fadeIn");

          if (elid("mc-player-hover-display").className.includes("m-fadeIn")) {
            _this3.hoverJourney = hoverTimeCapsule.startJourney(_this3.previewClip);
          } else {
            _this3.hoverJourney.destination();
          }
          _this3.loopBar.onmousemove = _loopBarMouseMove;
        };

        var loopBarAddListeners = function loopBarAddListeners() {
          if (!_this3.options.preview) {
            return;
          }
          loopBarMouseInOut();
          _this3.loopBar.onmouseover = _this3.loopBar.onmouseout = loopBarMouseInOut;
          _this3.loopBar.onmousemove = _loopBarMouseMove;
          removeListener("mouseup", loopBarAddListeners, false);
          removeListener("touchend", loopBarAddListeners, false);
          removeListener("mousemove", _loopBarMouseMove, false);
          removeListener("touchmove", _loopBarMouseMove, false);
        };

        this.loopBar.onmouseover = this.loopBar.onmouseout = loopBarMouseInOut;

        this.loopBar.onmousedown = function () {
          if (!_this3.options.preview) {
            return;
          }
          _this3.loopBar.onmouseover = _this3.loopBar.onmouseout = null;
          _this3.loopBar.onmousemove = null;
          addListener("mouseup", loopBarAddListeners, false);
          addListener("touchend", loopBarAddListeners, false);
          addListener("mousemove", _loopBarMouseMove, false);
          addListener("touchmove", _loopBarMouseMove, false);
        };
        this.loopBar.onmouseup = function () {
          if (!_this3.options.preview) {
            return;
          }
          removeListener("mouseup", loopBarAddListeners, false);
          removeListener("touchend", loopBarAddListeners, false);
          removeListener("mousemove", _loopBarMouseMove, false);
          removeListener("touchmove", _loopBarMouseMove, false);
          _this3.loopBar.onmouseover = _this3.loopBar.onmouseout = loopBarMouseInOut;
          _this3.loopBar.onmousemove = _loopBarMouseMove;
        };

        var _loopBarMouseMove = function _loopBarMouseMove(e) {
          var clientX = e.clientX;
          var viewportOffset = _this3.loopBar.getBoundingClientRect();
          if (clientX - viewportOffset.left + _this3.loopLastPositionXPxls > _this3.loopLastPositionXPxls + _this3.loopBar.offsetWidth && !_this3.resizeLoop) {
            elid("mc-player-hover-millisecond").innerHTML = _this3.loopEndMillisecond;
            return;
          } else if (clientX - viewportOffset.left < 0 && !_this3.resizeLoop) {
            elid("mc-player-hover-millisecond").innerHTML = _this3.loopStartMillisecond;
            return;
          }

          var positionX = clientX - viewportOffset.left + _this3.loopLastPositionXPxls;

          if (positionX < 0) {
            positionX = 0;
          }

          var left = positionX - elid("mc-player-hover-display").offsetWidth / 2;

          if (left < 0) {
            left = 0;
          } else if (left + elid("mc-player-hover-display").offsetWidth > _this3.totalBar.offsetWidth) {
            left = _this3.totalBar.offsetWidth - elid("mc-player-hover-display").offsetWidth;
          }

          var ms = Math.round(positionX / _this3.totalBar.offsetWidth * _this3.clip.duration);
          if (_this3.options.preview) {
            _this3.hoverJourney.station(ms);
          }

          elid("mc-player-hover-millisecond").innerHTML = ms;
          elid("mc-player-hover-display").style.left = left + "px";
        };
      }

      el("body")[0].addEventListener("click", function (e) {
        if (e.target.className === "mc-player-speed-value") {
          var speedDisplay = e.target.dataset.speedValue - 0;
          _this3.clip.executionSpeed = e.target.dataset.speedValue;
          _this3.clip.speed == 1 ? speedDisplay = "Normal" : speedDisplay = _this3.clip.speed;
          _this3.speedCurrent.innerHTML = speedDisplay;

          var step = 1 / (_this3.speedValues.length - 1);

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
      if (this.options.preview) {
        this.setPreviewDimentions();
      }

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
      if (this.options.preview) {
        this.setPreviewDimentions();
      }
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
      var _this4 = this;

      var currentSpeed = void 0;
      this.clip.speed == 1 ? currentSpeed = "Normal" : currentSpeed = this.clip.speed;
      this.speedCurrent.innerHTML = currentSpeed;

      var targetZone = function () {
        for (var i = 0; i < _this4.speedValues.length - 1; i++) {
          if (_this4.speedValues[i] <= _this4.clip.speed && _this4.speedValues[i + 1] > _this4.clip.speed) {
            return i + Math.abs((_this4.clip.speed - _this4.speedValues[i]) / (_this4.speedValues[i] - _this4.speedValues[i + 1]));
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
      var definition = this.clip.exportState({ unprocessed: true });

      definition.props.host = elid("mc-player-hover-display");
      this.previewClip = MC.ClipFromDefinition(definition, this.clipClass);
      var previewClip = this.previewClip.props.host.getElementsByTagName("iframe")[0];

      previewClip.style.position = "absolute";

      previewClip.style.zIndex = 1;
      this.setPreviewDimentions();
      this.setPreviewDimentions();
    }
  }, {
    key: "setPreviewDimentions",
    value: function setPreviewDimentions() {
      var clip = this.clip.props.host.getElementsByTagName("iframe")[0];
      var previewClip = this.previewClip.props.host.getElementsByTagName("iframe")[0];

      var clipWidth = clip.offsetWidth;

      var clipHeight = clip.offsetHeight;

      var previewRatio = 0.25;

      var previewWidth = clipWidth * previewRatio;

      // max width is 300
      if (previewWidth > parseFloat(elid("mc-player-hover-display").style.maxWidth)) {
        previewWidth = parseFloat(elid("mc-player-hover-display").style.maxWidth);
      }

      elid("mc-player-hover-display").style.width = previewWidth + "px";

      var previewHeight = clipHeight / clipWidth * previewWidth;

      elid("mc-player-hover-display").style.height = previewHeight + "px";

      var scaleY = previewHeight / clipHeight;
      var scaleX = previewWidth / clipWidth;

      previewClip.style.transform = "scale(" + scaleX + "," + scaleY + ")";
      previewClip.style.transformOrigin = "center bottom";
      previewClip.style.boxSizing = "border-box";

      // check if width of iframe is percentage
      if (this.clip.props.containerParams.width.includes("%")) {
        if (previewWidth / previewRatio - 2 / previewRatio > parseFloat(elid("mc-player-hover-display").style.maxWidth)) {
          previewClip.style.width = "298px";
        } else {
          previewClip.style.width = previewWidth / previewRatio - 2 / previewRatio + "px";
        }
      }

      if (this.clip.props.containerParams.height.includes("%")) {
        if (previewWidth / previewRatio - 2 / previewRatio > parseFloat(elid("mc-player-hover-display").style.maxWidth)) {
          previewClip.style.height = clipHeight / clipWidth * 300 - 2 + "px";
        } else {
          previewClip.style.height = previewHeight / previewRatio - 2 / previewRatio + "px";
        }
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