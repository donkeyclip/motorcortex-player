const { addListener, removeListener } = require(`../helpers`);

module.exports = _this => {
  // let pe = false;
  _this.listeners.onCursorMoveLoopEnd = e => {
    e.preventDefault();
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

    _this.elements.loopEndTime.innerHTML = _this.settings.loopEndMillisecond;
    _this.elements.loopStartTime.innerHTML =
      _this.settings.loopStartMillisecond;
  };

  _this.listeners.onMouseUpLoopEnd = e => {
    _this.elements.listenerHelper.style.pointerEvents = "none";

    // if (pe) {
    //   _this.elements.settingsPointerEvents.click();
    // }
    _this.settings.resizeLoop = false;
    e.preventDefault();
    _this.elements.runningBar.style.width =
      (_this.elements.runningBar.offsetWidth /
        _this.elements.loopBar.offsetWidth) *
        100 +
      `%`;

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

    if (_this.settings.loopJourney) {
      _this.createProgressDrag(_this.elements.runningBar.offsetWidth);
      _this.settings.loopJourney = false;
    }

    removeListener(`mouseup`, _this.listeners.onMouseUpLoopEnd, false);
    removeListener(`touchend`, _this.listeners.onMouseUpLoopEnd, false);
    removeListener(`mousemove`, _this.listeners.onCursorMoveLoopEnd, false);
    removeListener(`touchmove`, _this.listeners.onCursorMoveLoopEnd, false);
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

  _this.listeners.onMouseDownLoopEnd = e => {
    _this.elements.listenerHelper.style.pointerEvents = "auto";

    // if (!_this.options.pointerEvents) {
    //   pe = true;
    //   _this.elements.settingsPointerEvents.click();
    // }
    _this.settings.resizeLoop = true;
    _this.settings.needsUpdate = true;

    if (_this.clip.state === `playing`) {
      _this.clip.wait();
      _this.settings.playAfterResize = true;
    }
    e.preventDefault();
    _this.elements.runningBar.style.width =
      _this.elements.runningBar.offsetWidth + `px`;

    _this.elements.loopBar.style.left =
      _this.elements.loopBar.offsetLeft + `px`;

    _this.elements.loopBar.style.width =
      _this.elements.loopBar.offsetWidth + `px`;
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
    _this.listeners.onCursorMoveLoopEnd(e);
    addListener(`mouseup`, _this.listeners.onMouseUpLoopEnd, false);
    addListener(`touchend`, _this.listeners.onMouseUpLoopEnd, false);
    addListener(`mousemove`, _this.listeners.onCursorMoveLoopEnd, false);
    addListener(`touchmove`, _this.listeners.onCursorMoveLoopEnd, false);
  };

  _this.elements.loopBarEnd.addEventListener(
    `mousedown`,
    _this.listeners.onMouseDownLoopEnd,
    false
  );
  _this.elements.loopBarEnd.addEventListener(
    `touchstart`,
    _this.listeners.onMouseDownLoopEnd,
    {
      passive: false
    },
    false
  );
};
