import {
  addMouseUpAndMoveListeners,
  isMobile,
  removeMouseUpAndMoveListeners,
} from "../helpers";

export default (_this) => {
  if (isMobile()) {
    return;
  }

  _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut(
    _this
  );

  _this.elements.loopBar.onmousedown = () => {
    if (!_this.options.preview) {
      return;
    }
    _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = null;
    _this.elements.loopBar.onmousemove = null;

    addMouseUpAndMoveListeners(
      loopBarAddListeners(_this),
      loopBarMouseMove(_this)
    );
  };

  _this.elements.loopBar.onmouseup = () => {
    if (!_this.options.preview) {
      return;
    }

    removeMouseUpAndMoveListeners(
      loopBarAddListeners(_this),
      loopBarMouseMove(_this)
    );
    _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut(
      _this
    );
    _this.elements.loopBar.onmousemove = loopBarMouseMove(_this);
  };
};

const loopBarAddListeners = (_this) => () => {
  if (!_this.options.preview) {
    return;
  }
  loopBarMouseInOut(_this)();
  _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut(
    _this
  );
  _this.elements.loopBar.onmousemove = loopBarMouseMove(_this);
  removeMouseUpAndMoveListeners(
    loopBarAddListeners(_this),
    loopBarMouseMove(_this)
  );
};

const loopBarMouseInOut = (_this) => () => {
  if (!_this.options.preview) {
    return;
  }
  _this.elements.preview.classList.toggle("m-fadeIn");
  _this.elements.preview.classList.toggle("m-fadeOut");
  _this.elements.loopBar.onmousemove = loopBarMouseMove(_this);
};

const loopBarMouseMove = (_this) => (e) => {
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
  } else if (clientX - viewportOffset.left < 0 && !_this.settings.resizeLoop) {
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
