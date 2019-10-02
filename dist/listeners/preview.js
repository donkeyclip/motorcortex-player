"use strict";

var _require = require("../helpers"),
    elid = _require.elid,
    addListener = _require.addListener,
    removeListener = _require.removeListener;

module.exports = function (_this) {
  // only on desctop devices
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    var loopBarMouseInOut = function loopBarMouseInOut() {
      if (!_this.options.preview) {
        return;
      }

      elid("".concat(_this.name, "-hover-display")).classList.toggle("m-fadeOut");
      elid("".concat(_this.name, "-hover-display")).classList.toggle("m-fadeIn");
      elid("".concat(_this.name, "-hover-display")).classList.toggle("".concat(_this.name, "-hide")); // if (elid(`${_this.name}-hover-display`).className.includes(`m-fadeIn`)) {
      //   _this.previewJourney = hoverTimeCapsule.startJourney(_this.previewClip);
      // } else {
      //   _this.previewJourney.destination();
      // }

      _this.elements.loopBar.onmousemove = loopBarMouseMove;
    };

    var loopBarAddListeners = function loopBarAddListeners() {
      if (!_this.options.preview) {
        return;
      }

      loopBarMouseInOut();
      _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;
      _this.elements.loopBar.onmousemove = loopBarMouseMove;
      removeListener("mouseup", loopBarAddListeners, false);
      removeListener("touchend", loopBarAddListeners, false);
      removeListener("mousemove", loopBarMouseMove, false);
      removeListener("touchmove", loopBarMouseMove, false);
    };

    _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;

    _this.elements.loopBar.onmousedown = function () {
      if (!_this.options.preview) {
        return;
      }

      _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = null;
      _this.elements.loopBar.onmousemove = null;
      addListener("mouseup", loopBarAddListeners, false);
      addListener("touchend", loopBarAddListeners, false);
      addListener("mousemove", loopBarMouseMove, false);
      addListener("touchmove", loopBarMouseMove, false);
    };

    _this.elements.loopBar.onmouseup = function () {
      if (!_this.options.preview) {
        return;
      }

      removeListener("mouseup", loopBarAddListeners, false);
      removeListener("touchend", loopBarAddListeners, false);
      removeListener("mousemove", loopBarMouseMove, false);
      removeListener("touchmove", loopBarMouseMove, false);
      _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;
      _this.elements.loopBar.onmousemove = loopBarMouseMove;
    };

    var loopBarMouseMove = function loopBarMouseMove(e) {
      var clientX = e.clientX;

      var viewportOffset = _this.elements.loopBar.getBoundingClientRect();

      if (clientX - viewportOffset.left + _this.settings.loopLastPositionXPxls > _this.settings.loopLastPositionXPxls + _this.elements.loopBar.offsetWidth && !_this.settings.resizeLoop) {
        elid("".concat(_this.name, "-hover-millisecond")).innerHTML = _this.settings.loopEndMillisecond;
        return;
      } else if (clientX - viewportOffset.left < 0 && !_this.settings.resizeLoop) {
        elid("".concat(_this.name, "-hover-millisecond")).innerHTML = _this.settings.loopStartMillisecond;
        return;
      }

      var positionX = clientX - viewportOffset.left + _this.settings.loopLastPositionXPxls;

      if (positionX < 0) {
        positionX = 0;
      }

      var previewWidth = elid("".concat(_this.name, "-hover-display")).offsetWidth * _this.previewScale;

      var halfPreviewWidth = previewWidth / 2;
      var clipWidth = elid("".concat(_this.name, "-hover-display")).offsetWidth;
      var halfClipWidth = clipWidth / 2; // console.log(
      //   elid(`${_this.name}-hover-display`).offsetWidth,
      //   _this.previewScale,
      //   positionX,
      //   clipWidth,
      //   halfClipWidth,
      //   previewWidth,
      //   halfPreviewWidth
      // );

      var left = positionX - halfClipWidth; // console.log(left, halfClipWidth);

      if (positionX - halfPreviewWidth < 0) {
        left = 0 - (previewWidth + halfPreviewWidth);
      } else if (positionX + halfPreviewWidth > _this.elements.totalBar.offsetWidth) {
        left = _this.elements.totalBar.offsetWidth - halfClipWidth - halfPreviewWidth;
      }

      var ms = Math.round(positionX / _this.elements.totalBar.offsetWidth * _this.clip.duration);

      if (_this.options.preview) {
        var fraction = ms / _this.clip.duration;

        _this.previewClip.onProgress(fraction, ms);
      }

      elid("".concat(_this.name, "-hover-millisecond")).innerHTML = ms;
      elid("".concat(_this.name, "-hover-display")).style.left = left + "px";
    };
  }
};