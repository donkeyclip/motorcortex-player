"use strict";

module.exports = function (_this) {
  _this.elements.statusButton.onclick = function (e) {
    e.preventDefault();

    if (_this.clip.state === "playing") {
      _this.clip.wait();
    } else if (_this.clip.state === "waiting") {
      _this.clip.resume();
    } else if (_this.clip.state === "idle") {
      if (_this.clip.speed >= 0) {
        _this.clip.play();

        _this.settings.needsUpdate = true;
      } else {
        _this.createJourney(_this.clip, _this.settings.loopEndMillisecond - 1, {
          before: "stop",
          after: "play"
        });

        _this.settings.needsUpdate = true;
      }
    } else if (_this.clip.state === "completed") {
      if (_this.clip.speed >= 0) {
        _this.createJourney(_this.clip, 0, {
          before: "stop",
          after: "play"
        });

        _this.settings.needsUpdate = true;
      } else {
        _this.createJourney(_this.clip, _this.settings.loopEndMillisecond - 1, {
          before: "stop",
          after: "play"
        });

        _this.settings.needsUpdate = true;
      }
    }

    return false;
  };
};