"use strict";

var _require = require("../helpers"),
    elid = _require.elid,
    elcreate = _require.elcreate;

var svg = require("./svg");

var playerHTML = require("./playerHTML");

module.exports = function (_this) {
  _this.elements = {};
  var clipIframe = _this.clip.rootElement; // set _this.clip position to relative

  clipIframe.style.display = "block";
  clipIframe.style.margin = "0 auto";
  _this.clip.props.host.style.position = "relative";
  _this.clip.props.host.style.zIndex = "0";
  _this.elements.mcPlayer = elcreate("div");
  _this.elements.mcPlayer.id = "".concat(_this.name);
  _this.elements.mcPlayer.className = "".concat(_this.className);
  _this.elements.mcPlayer.innerHTML = playerHTML({
    svg: svg,
    name: _this.name
  });

  _this.options.host.appendChild(_this.elements.mcPlayer);

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
  _this.elements.currentTime.innerHTML = 0;
  _this.elements.totalTime.innerHTML = _this.clip.duration;
  _this.elements.timeSeparator.innerHTML = "/";

  _this.elements.settingsPanel.classList.add("m-fadeOut", "".concat(_this.name, "-hide"));

  _this.elements.indicator.style.visibility = "hidden";
  _this.elements.indicator.innerHTML = _this.clip.state;
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
  elid("".concat(_this.name, "-hover-display")).classList.add("m-fadeOut", "".concat(_this.name, "-hide"));
  elid("".concat(_this.name, "-show-volume-checkbox")).checked = _this.options.showVolume;
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

    _this.elements.volumeBar.classList.toggle("".concat(_this.name, "-hide"));

    _this.elements.volumeBar.classList.toggle("".concat(_this.name, "-volume-width-transition"));
  } else {
    _this.elements.timeDisplay.style.left = "";
    _this.elements.volumeControl.style.visibility = "visible";
  }

  for (var i in _this.options.speedValues) {
    var barDiv = elcreate("div");
    barDiv.className = "".concat(_this.name, "-speed-value-step");
    var valueDiv = elcreate("div");
    valueDiv.className = "".concat(_this.name, "-speed-value");
    valueDiv.dataset.speedValue = _this.options.speedValues[i];
    valueDiv.innerHTML = _this.options.speedValues[i];
    valueDiv.dataset.zone = i;
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