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
    _this.elements.listenerHelper.style.pointerEvents = "none";
    removeListener("mouseup", _this.listeners.onMouseUp, false);
    removeListener("touchend", _this.listeners.onMouseUp, false);
    removeListener("mousemove", _this.listeners.onCursorMove, false);
    removeListener("touchmove", _this.listeners.onCursorMove, false);

    _this.handleDragEnd(_this.settings);
  };

  _this.listeners.onMouseDown = function (e) {
    _this.elements.listenerHelper.style.pointerEvents = "auto";

    if (_this.clip.runTimeInfo.state === "playing") {
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