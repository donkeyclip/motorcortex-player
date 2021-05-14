import {
  addMouseUpAndMoveListeners,
  elFirstClass,
  isMobile,
  removeMouseUpAndMoveListeners,
} from "../helpers";

export default (_this) => {
  if (isMobile()) {
    return;
  }

  const hoverMillisecondElement = elFirstClass(_this.elements.mcPlayer,`--mcp-preview-millisecond`);
  const hoverDisplayElement = elFirstClass(_this.elements.mcPlayer,`--mcp-preview`);
  const loopBarMouseInOut = () => {
    if (!_this.options.preview) {
      return;
    }
    hoverDisplayElement.classList.toggle("m-fadeIn");
    hoverDisplayElement.classList.toggle("m-fadeOut");
    _this.elements.loopBar.onmousemove = loopBarMouseMove;
  };

  const loopBarAddListeners = () => {
    if (!_this.options.preview) {
      return;
    }
    loopBarMouseInOut();
    _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;
    _this.elements.loopBar.onmousemove = loopBarMouseMove;
    removeMouseUpAndMoveListeners(loopBarAddListeners, loopBarMouseMove);
  };

  _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;

  _this.elements.loopBar.onmousedown = () => {
    if (!_this.options.preview) {
      return;
    }
    _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = null;
    _this.elements.loopBar.onmousemove = null;

    addMouseUpAndMoveListeners(loopBarAddListeners, loopBarMouseMove);
  };
  _this.elements.loopBar.onmouseup = () => {
    if (!_this.options.preview) {
      return;
    }

    removeMouseUpAndMoveListeners(loopBarAddListeners, loopBarMouseMove);
    _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;
    _this.elements.loopBar.onmousemove = loopBarMouseMove;
  };

  const loopBarMouseMove = (e) => {
    const clientX = e.clientX;
    const viewportOffset = _this.elements.loopBar.getBoundingClientRect();

    if (
      clientX - viewportOffset.left + _this.settings.loopLastPositionXPxls >
        _this.settings.loopLastPositionXPxls +
          _this.elements.loopBar.offsetWidth &&
      !_this.settings.resizeLoop
    ) {
      hoverMillisecondElement.innerHTML = _this.timeFormat(
        _this.settings.loopEndMillisecond
      );
      return;
    } else if (
      clientX - viewportOffset.left < 0 &&
      !_this.settings.resizeLoop
    ) {
      hoverMillisecondElement.innerHTML = _this.timeFormat(
        _this.settings.loopStartMillisecond
      );
      return;
    }

    let positionX =
      clientX - viewportOffset.left + _this.settings.loopLastPositionXPxls;

    if (positionX < 0) {
      positionX = 0;
    }
    const previewWidth = hoverDisplayElement.offsetWidth;

    const halfPreviewWidth = previewWidth / 2;
    const clipWidth = hoverDisplayElement.offsetWidth;
    const halfClipWidth = clipWidth / 2;

    let left = positionX - halfClipWidth;
    if (positionX - halfPreviewWidth < 0) {
      left = 0;
    } else if (
      positionX + halfPreviewWidth >
      _this.elements.totalBar.offsetWidth
    ) {
      left =
        _this.elements.totalBar.offsetWidth - halfClipWidth - halfPreviewWidth;
    }

    const ms = Math.round(
      (positionX / _this.elements.totalBar.offsetWidth) * _this.clip.duration
    );
    if (_this.options.preview) {
      const fraction = ms / _this.clip.duration;
      _this.previewClip.onProgress(fraction, ms);
    }
    hoverMillisecondElement.innerHTML = _this.timeFormat(ms);
    hoverDisplayElement.style.left = `${left}px`;
  };
};
