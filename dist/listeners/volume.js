"use strict";

var _require = require("../helpers"),
    addListener = _require.addListener,
    removeListener = _require.removeListener,
    elid = _require.elid;

var svg = require("../html/svg");

module.exports = function (_this) {
  // let pe = false;
  var volumeDrag = false;

  _this.elements.volumeBtn.onclick = function () {
    if (_this.settings.volumeMute) {
      _this.elements.volumeBarActive.style.width = _this.settings.previousVolume * 100 + "%";

      _this.clip.setVolume(_this.settings.previousVolume);

      _this.settings.volumeMute = false;
      var SVG = document.createElement("span");
      SVG.innerHTML = svg.volumeSVG;

      _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
    } else {
      _this.settings.volumeMute = true;
      _this.elements.volumeBarActive.style.width = "0%";

      _this.clip.setVolume(0);

      var _SVG = document.createElement("span");

      _SVG.innerHTML = svg.volumeMuteSVG;

      _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(_SVG);
    }
  };

  var volumeOpen = false;

  _this.elements.volumeBtn.onmouseover = function () {
    volumeOpen = true;

    _this.elements.volumeCursor.classList.add("".concat(_this.name, "-volume-cursor-transition"));

    _this.elements.volumeBar.classList.add("".concat(_this.name, "-volume-width-transition"));

    _this.elements.volumeBarHelper.classList.add("".concat(_this.name, "-volume-width-transition"));

    _this.elements.timeDisplay.classList.add("".concat(_this.name, "-time-width-transition"));
  };

  elid("".concat(_this.name, "-left-controls")).onmouseout = function () {
    if (!volumeOpen || volumeDrag) {
      return;
    }

    var e = event.toElement || event.relatedTarget || event.target;

    if (isDescendant(elid("".concat(_this.name, "-left-controls")), e) || e === elid("".concat(_this.name, "-left-controls"))) {
      return;
    }

    volumeOpen = false;

    _this.elements.volumeCursor.classList.remove("".concat(_this.name, "-volume-cursor-transition"));

    _this.elements.volumeBar.classList.remove("".concat(_this.name, "-volume-width-transition"));

    _this.elements.volumeBarHelper.classList.remove("".concat(_this.name, "-volume-width-transition"));

    _this.elements.timeDisplay.classList.remove("".concat(_this.name, "-time-width-transition"));
  };

  _this.listeners.onCursorMoveVolumeBar = function (e) {
    e.preventDefault();
    var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;

    var viewportOffset = _this.elements.volumeBarHelper.getBoundingClientRect();

    var positionX = clientX - viewportOffset.left;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.volumeBarHelper.offsetWidth) {
      positionX = _this.elements.volumeBarHelper.offsetWidth;
    }

    _this.settings.volume = Number((positionX / _this.elements.volumeBarHelper.offsetWidth).toFixed(2));
    _this.elements.volumeBarActive.style.width = _this.settings.volume * 100 + "%";

    _this.clip.setVolume(_this.settings.volume);

    if (_this.settings.volume > 0) {
      _this.settings.volumeMute = false;
      var SVG = document.createElement("span");
      SVG.innerHTML = svg.volumeSVG;

      _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
    } else if (_this.settings.volume === 0) {
      _this.settings.volumeMute = true;

      var _SVG2 = document.createElement("span");

      _SVG2.innerHTML = svg.volumeMuteSVG;

      _this.elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(_SVG2);
    }
  };

  _this.listeners.onMouseUpVolumeBar = function (e) {
    volumeDrag = false; // if (pe) {
    //   _this.elements.settingsPointerEvents.click();
    // }

    _this.elements.listenerHelper.style.pointerEvents = "none";
    e.preventDefault();

    if (_this.settings.volume > 0) {
      _this.settings.previousVolume = _this.settings.volume;
    }

    removeListener("mouseup", _this.listeners.onMouseUpVolumeBar, false);
    removeListener("touchend", _this.listeners.onMouseUpVolumeBar, false);
    removeListener("mousemove", _this.listeners.onCursorMoveVolumeBar, false);
    removeListener("touchmove", _this.listeners.onCursorMoveVolumeBar, false);
  };

  _this.listeners.onMouseDownVolumeBar = function (e) {
    volumeDrag = true; // if (!_this.options.pointerEvents) {
    //   pe = true;
    //   _this.elements.settingsPointerEvents.click();
    // }

    _this.elements.listenerHelper.style.pointerEvents = "auto";
    e.preventDefault();

    _this.listeners.onCursorMoveVolumeBar(e);

    addListener("mouseup", _this.listeners.onMouseUpVolumeBar, false);
    addListener("touchend", _this.listeners.onMouseUpVolumeBar, false);
    addListener("mousemove", _this.listeners.onCursorMoveVolumeBar, false);
    addListener("touchmove", _this.listeners.onCursorMoveVolumeBar, false);
  };

  _this.elements.volumeBarHelper.addEventListener("mousedown", _this.listeners.onMouseDownVolumeBar, false);

  _this.elements.volumeCursor.addEventListener("mousedown", _this.listeners.onMouseDownVolumeBar, false);

  _this.elements.volumeBarHelper.addEventListener("touchstart", _this.listeners.onMouseDownVolumeBar, {
    passive: false
  }, false);

  _this.elements.volumeCursor.addEventListener("touchstart", _this.listeners.onMouseDownVolumeBar, {
    passive: false
  }, false);
};

function isDescendant(parent, child) {
  var node = child.parentNode;

  while (node != null) {
    if (node == parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}