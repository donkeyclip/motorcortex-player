import {
  addMouseUpAndMoveListeners,
  isMobile,
  removeMouseUpAndMoveListeners,
} from "../helpers";

export default (_this) => {
  if (isMobile()) {
    return;
  }
  const {
    loopBarMouseIn,
    loopBarMouseOut,
    loopBarAddListeners,
    loopBarMouseMove,
  } = EventFunctions(_this);

  _this.elements.loopBar.onmouseover = loopBarMouseIn;
  _this.elements.loopBar.onmouseout = loopBarMouseOut;

  _this.elements.loopBar.onmousedown = () => {
    if (!_this.options.preview) {
      return;
    }
    _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout =
      null;

    _this.elements.loopBar.onmousemove = null;

    addMouseUpAndMoveListeners(loopBarAddListeners, loopBarMouseMove);
  };

  _this.elements.loopBar.onmouseup = () => {
    if (!_this.options.preview) {
      return;
    }

    removeMouseUpAndMoveListeners(loopBarAddListeners, loopBarMouseMove);

    _this.elements.loopBar.onmouseover = loopBarMouseIn;
    _this.elements.loopBar.onmouseout = loopBarMouseOut;
    _this.elements.loopBar.onmousemove = loopBarMouseMove;
  };
};

const EventFunctions = (_this) => {
  const loopBarMouseIn = () => {
    if (!_this.options.preview) {
      return;
    }
    _this.elements.preview.classList.add("m-fadeIn");
    _this.elements.preview.classList.remove("m-fadeOut");
    _this.elements.loopBar.onmousemove = loopBarMouseMove;
  };

  const loopBarMouseOut = () => {
    if (!_this.options.preview) {
      return;
    }
    _this.elements.preview.classList.remove("m-fadeIn");
    _this.elements.preview.classList.add("m-fadeOut");
    _this.elements.loopBar.onmousemove = loopBarMouseMove;
  };

  const loopBarAddListeners = () => {
    if (!_this.options.preview) {
      return;
    }
    loopBarMouseOut();
    _this.elements.loopBar.onmouseover = loopBarMouseIn;
    _this.elements.loopBar.onmouseout = loopBarMouseOut;
    _this.elements.loopBar.onmousemove = loopBarMouseMove;
    removeMouseUpAndMoveListeners(loopBarAddListeners, loopBarMouseMove);
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
      _this.elements.previewMillisecond.innerHTML = _this.timeFormat(
        _this.settings.loopEndMillisecond
      );
      return;
    } else if (
      clientX - viewportOffset.left < 0 &&
      !_this.settings.resizeLoop
    ) {
      _this.elements.previewMillisecond.innerHTML = _this.timeFormat(
        _this.settings.loopStartMillisecond
      );
      return;
    }

    let positionX =
      clientX - viewportOffset.left + _this.settings.loopLastPositionXPxls;

    if (positionX < 0) {
      positionX = 0;
    }
    const previewWidth = _this.elements.preview.offsetWidth;

    const halfPreviewWidth = previewWidth / 2;
    const clipWidth = _this.elements.preview.offsetWidth;
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
    _this.elements.previewMillisecond.innerHTML = _this.timeFormat(ms);
    _this.elements.preview.style.left = `${left}px`;
  };
  return {
    loopBarMouseIn,
    loopBarMouseOut,
    loopBarAddListeners,
    loopBarMouseMove,
  };
};
