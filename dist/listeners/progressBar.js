"use strict";

var _require = require("../helpers"),
    addListener = _require.addListener,
    removeListener = _require.removeListener;

module.exports = function (_this) {
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
    _this.elements.listenerHelper.style.pointerEvents = "none"; // if (pe) {
    //   _this.elements.settingsPointerEvents.click();
    // }
    // e.preventDefault();

    removeListener("mouseup", _this.listeners.onMouseUp, false);
    removeListener("touchend", _this.listeners.onMouseUp, false);
    removeListener("mousemove", _this.listeners.onCursorMove, false);
    removeListener("touchmove", _this.listeners.onCursorMove, false);

    _this.handleDragEnd(_this.settings);

    if (_this.settings.playAfterResize) {
      if (_this.clip.state === "idle" && !_this.settings.loopActivated) {
        _this.clip.play();
      } else if (_this.clip.state === "completed" && !_this.settings.loopActivated) {
        _this.createJourney(_this.clip, _this.settings.loopBarMillisecond - 1, {
          before: "stop",
          after: "play"
        });
      } else if ((_this.clip.state === "completed" || _this.clip.state === "idle") && _this.settings.loopActivated) {
        _this.clip.speed >= 0 ? _this.createJourney(_this.clip, _this.settings.loopBarStartMillisecond + 1, {
          before: "stop",
          after: "play"
        }) : _this.createJourney(_this.clip, _this.settings.loopBarEndMillisecond - 1, {
          before: "stop",
          after: "play"
        });
      } else {
        _this.clip.resume();
      }

      _this.settings.playAfterResize = false;
    }
  };

  _this.listeners.onMouseDown = function (e) {
    _this.elements.listenerHelper.style.pointerEvents = "auto"; // e.preventDefault();
    // if (!_this.options.pointerEvents) {
    //   pe = true;
    //   _this.elements.settingsPointerEvents.click();
    // }

    if (_this.clip.state === "playing") {
      _this.settings.playAfterResize = true;
    }

    _this.handleDragStart(_this.clip);

    _this.listeners.onCursorMove(e);

    addListener("mouseup", _this.listeners.onMouseUp, false);
    addListener("touchend", _this.listeners.onMouseUp, false);
    addListener("mousemove", _this.listeners.onCursorMove, false);
    addListener("touchmove", _this.listeners.onCursorMove, false);
  };

  _this.elements.loopBar.addEventListener("mousedown", _this.listeners.onMouseDown, false);

  _this.elements.loopBar.addEventListener("touchstart", _this.listeners.onMouseDown, {
    passive: false
  }, false);
};