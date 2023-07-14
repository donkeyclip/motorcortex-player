import {
  addMouseUpAndMoveListeners,
  addStartListeners,
  isMobile,
  removeMouseUpAndMoveListeners,
} from "../helpers";

export default (_this) => {
  _this.listeners.onCursorMoveLoopEnd = (e) => {
    e.stopPropagation();
    if (isMobile()) e.preventDefault();
    const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
    const viewportOffset = _this.elements.totalBar.getBoundingClientRect();
    let positionX = clientX - viewportOffset.left;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.totalBar.offsetWidth) {
      positionX = _this.elements.totalBar.offsetWidth;
    }

    if (
      _this.elements.runningBar.offsetWidth >=
      _this.elements.loopBar.offsetWidth
    ) {
      _this.elements.runningBar.style.width =
        _this.elements.loopBar.offsetWidth + `px`;
    }

    if (_this.settings.loopLastPositionXPxls - positionX < 0) {
      _this.elements.loopBar.style.width =
        Math.abs(_this.settings.loopLastPositionXPxls - positionX) + `px`;
    } else {
      _this.elements.loopBar.style.left = positionX + `px`;
      _this.settings.loopLastPositionXPxls = positionX;
    }

    _this.settings.loopEndMillisecond = Math.round(
      (_this.clip.duration *
        ((parseFloat(_this.elements.loopBar.style.left) || 0) +
          parseFloat(_this.elements.loopBar.style.width))) /
        _this.elements.totalBar.offsetWidth
    );

    if (
      _this.settings.loopEndMillisecond <
      _this.clip.runTimeInfo.currentMillisecond
    ) {
      _this.settings.loopJourney = true;
    }

    if (
      _this.settings.loopStartMillisecond > _this.settings.loopEndMillisecond
    ) {
      _this.settings.loopStartMillisecond = _this.settings.loopEndMillisecond;
      _this.settings.loopJourney = true;
    }
  };

  _this.listeners.onMouseUpLoopEnd = () => {
    _this.elements.listenerHelper.style.pointerEvents = "none";
    _this.settings.resizeLoop = false;
    const { loopBar, totalBar, runningBar } = _this.elements;

    runningBar.style.width =
      (runningBar.offsetWidth / loopBar.offsetWidth) * 100 + `%`;

    loopBar.style.left = `${
      (loopBar.offsetLeft / totalBar.offsetWidth) * 100
    }%`;

    loopBar.style.width = `${
      (loopBar.offsetWidth / totalBar.offsetWidth) * 100
    }%`;

    if (_this.settings.loopJourney) {
      _this.createProgressDrag(runningBar.offsetWidth);
      _this.settings.loopJourney = false;
    }
    removeMouseUpAndMoveListeners(
      _this,
      _this.listeners.onMouseUpLoopEnd,
      _this.listeners.onCursorMoveLoopEnd
    );

    addStartListeners(_this.listeners.onMouseDown, loopBar, true);

    if (!_this.settings.playAfterResize) {
      return;
    }
    if (
      _this.clip.runTimeInfo.state === "idle" ||
      _this.clip.runTimeInfo.state === "completed"
    ) {
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
  };

  _this.listeners.onMouseDownLoopEnd = (e) => {
    e.stopPropagation();

    _this.elements.listenerHelper.style.pointerEvents = "auto";

    _this.settings.resizeLoop = true;
    _this.settings.needsUpdate = true;

    if (_this.clip.runTimeInfo.state === "playing") {
      _this.clip.pause();
      _this.settings.playAfterResize = true;
    }
    _this.elements.runningBar.style.width = `${_this.elements.runningBar.offsetWidth}px`;

    const loopBar = _this.elements.loopBar;
    loopBar.style.left = `${loopBar.offsetLeft}px`;
    loopBar.style.width = `${loopBar.offsetWidth}px`;

    _this.listeners.onCursorMoveLoopEnd(e);
    addMouseUpAndMoveListeners(
      _this,
      _this.listeners.onMouseUpLoopEnd,
      _this.listeners.onCursorMoveLoopEnd
    );
  };

  addStartListeners(
    _this.listeners.onMouseDownLoopEnd,
    _this.elements.loopBarEnd,
    false
  );
};
