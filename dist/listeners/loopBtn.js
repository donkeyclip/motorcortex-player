"use strict";

var _require = require("../helpers"),
    elid = _require.elid;

module.exports = function (_this) {
  _this.elements.loopButton.onclick = function () {
    _this.settings.loopActivated = !_this.settings.loopActivated;

    _this.elements.loopButton.classList.toggle("svg-selected");

    _this.elements.loopBarStart.classList.toggle("m-fadeOut");

    _this.elements.loopBarEnd.classList.toggle("m-fadeOut");

    _this.elements.loopBarStart.classList.toggle("m-fadeIn");

    _this.elements.loopBarStart.classList.toggle("".concat(_this.name, "-hide"));

    _this.elements.loopBarEnd.classList.toggle("m-fadeIn");

    _this.elements.loopBarEnd.classList.toggle("".concat(_this.name, "-hide"));

    elid("".concat(_this.name, "-loop-time")).classList.toggle("m-fadeOut");
    elid("".concat(_this.name, "-loop-time")).classList.toggle("m-fadeIn");
    elid("".concat(_this.name, "-loop-time")).classList.toggle("".concat(_this.name, "-hide"));
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
};