const { addListener, removeListener } = require(`../helpers`);

module.exports = _this => {
  // let pe = false;
  _this.listeners.onCursorMoveLoopStart = e => {
    e.preventDefault();
    const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
    const viewportOffset = _this.elements.totalBar.getBoundingClientRect();
    let positionX = clientX - viewportOffset.left;

    const endPosition =
      _this.elements.loopBar.offsetWidth + _this.elements.loopBar.offsetLeft;
    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.totalBar.offsetWidth) {
      positionX = _this.elements.totalBar.offsetWidth;
    }

    const loopBarDeltaX = positionX - _this.settings.loopLastPositionXPxls || 0;
    const runningBarWidthInPxls =
      _this.elements.runningBar.offsetWidth - loopBarDeltaX;

    _this.elements.loopBar.style.left = positionX + `px`;

    const diff = endPosition - _this.elements.loopBar.offsetLeft;
    _this.elements.loopBar.style.width = diff + `px`;

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
      _this.elements.loopBar.style.width = `0px`;
      _this.elements.runningBar.style.width = `0px`;
    }

    _this.elements.loopEndTime.innerHTML = _this.settings.loopEndMillisecond;
    _this.elements.loopStartTime.innerHTML =
      _this.settings.loopStartMillisecond;

    if (
      _this.settings.loopStartMillisecond >
      _this.clip.runTimeInfo.currentMillisecond
    ) {
      _this.settings.loopJourney = true;
    }
  };

  _this.listeners.onMouseUpLoopStart = e => {
    _this.elements.listenerHelper.style.pointerEvents = "none";

    // if (pe) {
    //   _this.elements.settingsPointerEvents.click();
    // }
    _this.settings.resizeLoop = false;

    e.preventDefault();
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

    removeListener(`mouseup`, _this.listeners.onMouseUpLoopStart, false);
    removeListener(`touchend`, _this.listeners.onMouseUpLoopStart, false);
    removeListener(`mousemove`, _this.listeners.onCursorMoveLoopStart, false);
    removeListener(`touchmove`, _this.listeners.onCursorMoveLoopStart, false);
    _this.elements.loopBar.addEventListener(
      `mousedown`,
      _this.listeners.onMouseDown,
      false
    );
    _this.elements.loopBar.addEventListener(
      `touchstart`,
      _this.listeners.onMouseDown,
      {
        passive: true
      },
      false
    );

    if (_this.settings.playAfterResize) {
      if (_this.clip.state === `idle`) {
        let loopms;
        if (_this.clip.speed >= 0) {
          loopms = _this.settings.loopStartMillisecond + 1;
        } else {
          loopms = _this.settings.loopEndMillisecond - 1;
        }
        _this.settings.needsUpdate = true;
        _this.createJourney(_this.clip, loopms, {
          before: "stop",
          after: "play"
        });
      } else if (_this.clip.state === `completed`) {
        let loopms;
        if (_this.clip.speed >= 0) {
          loopms = _this.settings.loopStartMillisecond + 1;
        } else {
          loopms = _this.settings.loopEndMillisecond - 1;
        }
        _this.settings.needsUpdate = true;
        _this.createJourney(_this.clip, loopms, {
          before: "stop",
          after: "play"
        });
      } else {
        _this.clip.resume();
      }
      _this.settings.playAfterResize = false;
    }
  };

  _this.listeners.onMouseDownLoopStart = e => {
    _this.elements.listenerHelper.style.pointerEvents = "auto";

    // if (!_this.options.pointerEvents) {
    //   pe = true;
    //   _this.elements.settingsPointerEvents.click();
    // }

    _this.settings.resizeLoop = true;

    e.preventDefault();
    _this.settings.needsUpdate = true;

    if (_this.clip.state === `playing`) {
      _this.clip.wait();
      _this.settings.playAfterResize = true;
    }

    _this.elements.loopBar.removeEventListener(
      `mousedown`,
      _this.listeners.onMouseDown,
      false
    );
    _this.elements.loopBar.removeEventListener(
      `touchstart`,
      _this.listeners.onMouseDown,
      false
    );
    _this.listeners.onCursorMoveLoopStart(e);
    addListener(`mouseup`, _this.listeners.onMouseUpLoopStart, false);
    addListener(`touchend`, _this.listeners.onMouseUpLoopStart, false);
    addListener(`mousemove`, _this.listeners.onCursorMoveLoopStart, false);
    addListener(`touchmove`, _this.listeners.onCursorMoveLoopStart, false);
  };

  _this.elements.loopBarStart.addEventListener(
    `mousedown`,
    _this.listeners.onMouseDownLoopStart,
    false
  );
  _this.elements.loopBarStart.addEventListener(
    `touchstart`,
    _this.listeners.onMouseDownLoopStart,
    {
      passive: false
    },
    false
  );
};
