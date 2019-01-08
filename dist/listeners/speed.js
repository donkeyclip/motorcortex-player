"use strict";

var _require = require("../helpers"),
    elid = _require.elid,
    addListener = _require.addListener,
    removeListener = _require.removeListener;

module.exports = function (_this) {
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

    elid("".concat(_this.name, "-speed-runtime")).innerHTML = speed + "0";
    elid("".concat(_this.name, "-speed-cursor")).style.top = positionY + "px";
    _this.clip.executionSpeed = speed;
  };

  var onMouseUpSpeedBar = function onMouseUpSpeedBar(e) {
    // if (pe) {
    //   _this.elements.settingsPointerEvents.click();
    // }
    _this.elements.listenerHelper.style.pointerEvents = "none";
    e.preventDefault();
    removeListener("mouseup", onMouseUpSpeedBar, false);
    removeListener("touchend", onMouseUpSpeedBar, false);
    removeListener("mousemove", onCursorMoveSpeedBar, false);
    removeListener("touchmove", onCursorMoveSpeedBar, false);
    elid("".concat(_this.name, "-speed-runtime")).innerHTML = "Speed";
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
    addListener("mouseup", onMouseUpSpeedBar, false);
    addListener("touchend", onMouseUpSpeedBar, false);
    addListener("mousemove", onCursorMoveSpeedBar, false);
    addListener("touchmove", onCursorMoveSpeedBar, false);
  };

  _this.elements.speedBarHelper.addEventListener("mousedown", onMouseDownSpeedBar, false);

  _this.elements.speedBarHelper.addEventListener("touchstart", onMouseDownSpeedBar, {
    passive: false
  }, false);
};