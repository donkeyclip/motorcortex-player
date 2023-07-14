import {
  addMouseUpAndMoveListeners,
  addStartListeners,
  isMobile,
  removeMouseUpAndMoveListeners,
} from "../helpers";

export default (_this) => {
  _this.listeners.onCursorMoveLoopStart = (e) => {
    e.stopPropagation();
    if (isMobile()) e.preventDefault();
    const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
    const viewportOffset = _this.elements.totalBar.getBoundingClientRect();
    let positionX = Math.round(clientX - viewportOffset.left);

    const endPositionsInPxls = Math.round(
      (_this.settings.loopEndMillisecond / _this.clip.duration) *
        _this.elements.totalBar.offsetWidth
    );

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.totalBar.offsetWidth) {
      positionX = _this.elements.totalBar.offsetWidth;
    }

    const runningBarWidthInPxls =
      (_this.clip.runTimeInfo.currentMillisecond / _this.clip.duration) *
        _this.elements.totalBar.offsetWidth -
      positionX;

    _this.elements.loopBar.style.left = positionX + `px`;

    _this.elements.loopBar.style.width = endPositionsInPxls - positionX + `px`;

    _this.elements.runningBar.style.width = runningBarWidthInPxls + `px`;

    _this.settings.loopLastPositionXPxls = positionX;

    _this.settings.loopStartMillisecond = Math.round(
      (_this.clip.duration * _this.elements.loopBar.offsetLeft) /
        _this.elements.totalBar.offsetWidth
    );

    if (
      _this.settings.loopEndMillisecond < _this.settings.loopStartMillisecond
    ) {
      _this.settings.loopEndMillisecond = _this.settings.loopStartMillisecond;
      _this.elements.loopBar.style.width = "0px";
      _this.elements.runningBar.style.width = "0px";
    }

    if (
      _this.settings.loopStartMillisecond >
      _this.clip.runTimeInfo.currentMillisecond
    ) {
      _this.settings.loopJourney = true;
    }
  };

  _this.listeners.onMouseUpLoopStart = () => {
    _this.elements.listenerHelper.style.pointerEvents = "none";

    _this.settings.resizeLoop = false;

    if (_this.settings.loopJourney) {
      _this.createProgressDrag(_this.elements.runningBar.offsetWidth);
      _this.settings.loopJourney = false;
    }

    _this.elements.loopBar.style.left =
      (_this.elements.loopBar.offsetLeft /
        _this.elements.totalBar.offsetWidth) *
        100 +
      `%`;

    _this.elements.loopBar.style.width =
      (_this.elements.loopBar.offsetWidth /
        _this.elements.totalBar.offsetWidth) *
        100 +
      `%`;

    _this.settings.loopStartMillisecond = Math.round(
      (_this.clip.duration * _this.elements.loopBar.offsetLeft) /
        _this.elements.totalBar.offsetWidth
    );

    _this.elements.runningBar.style.width =
      (_this.elements.runningBar.offsetWidth /
        _this.elements.loopBar.offsetWidth) *
        100 +
      `%`;

    removeMouseUpAndMoveListeners(
      _this,
      _this.listeners.onMouseUpLoopStart,
      _this.listeners.onCursorMoveLoopStart
    );

    addStartListeners(
      _this.listeners.onMouseDown,
      _this.elements.loopBar,
      true
    );

    if (_this.settings.playAfterResize) {
      if (_this.clip.runTimeInfo.state === `idle`) {
        let loopms;
        if (_this.clip.speed >= 0) {
          loopms = _this.settings.loopStartMillisecond + 1;
        } else {
          loopms = _this.settings.loopEndMillisecond - 1;
        }
        _this.settings.needsUpdate = true;
        _this.goToMillisecond(loopms, {
          before: "pause",
          after: "play",
        });
      } else {
        _this.clip.play();
      }
      _this.settings.playAfterResize = false;
    }
  };

  _this.listeners.onMouseDownLoopStart = (e) => {
    e.stopPropagation();

    _this.elements.listenerHelper.style.pointerEvents = "auto";

    _this.settings.resizeLoop = true;

    _this.settings.needsUpdate = true;

    if (_this.clip.runTimeInfo.state === `playing`) {
      _this.clip.pause();
      _this.settings.playAfterResize = true;
    }

    _this.listeners.onCursorMoveLoopStart(e);
    addMouseUpAndMoveListeners(
      _this,
      _this.listeners.onMouseUpLoopStart,
      _this.listeners.onCursorMoveLoopStart
    );
  };
  addStartListeners(
    _this.listeners.onMouseDownLoopStart,
    _this.elements.loopBarStart
  );
};
