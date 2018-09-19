const { elid, addListener, removeListener } = require(`../helpers`);

module.exports = _this => {
  // const pe = false;
  _this.elements.settingsSpeedButtonShow.onclick = _this.elements.settingsSpeedButtonHide.onclick = e => {
    e.preventDefault();
    _this.elements.settingsPanel.classList.toggle(
      `${_this.name}-settings-speed-panel`
    );
    const includesClass = _this.elements.settingsPanel.className.includes(
      `${_this.name}-settings-speed-panel`
    );
    if (includesClass) {
      _this.elements.settingsMainPanel.style.display = `none`;
      _this.elements.settingsSpeedPanel.style.display = `block`;
    } else {
      _this.elements.settingsSpeedPanel.style.display = `none`;
      _this.elements.settingsMainPanel.style.display = `block`;
    }
  };

  const onCursorMoveSpeedBar = e => {
    e.preventDefault();
    const viewportOffset = _this.elements.speedBar.getBoundingClientRect();
    const clientY = e.clientY || ((e.touches || [])[0] || {}).clientY;
    let positionY = clientY - viewportOffset.top;

    positionY -= 8;
    if (positionY < 0) {
      positionY = 0;
    } else if (positionY > _this.elements.speedBar.offsetHeight - 16) {
      positionY = _this.elements.speedBar.offsetHeight - 16;
    }
    positionY = Math.floor(positionY);
    // show speed
    const percentage =
      (positionY / ((_this.options.speedValues.length - 1) * 16) - 1) * -1;
    const step = 1 / (_this.options.speedValues.length - 1);
    const speed = _this.calculateSpeed(
      step,
      _this.options.speedValues,
      percentage
    );
    elid(`${_this.name}-speed-runtime`).innerHTML = speed + `0`;
    elid(`${_this.name}-speed-cursor`).style.top = positionY + `px`;
    _this.clip.executionSpeed = speed;
  };

  const onMouseUpSpeedBar = e => {
    // if (pe) {
    //   _this.elements.settingsPointerEvents.click();
    // }
    _this.elements.listenerHelper.style.pointerEvents = "none";

    e.preventDefault();
    removeListener(`mouseup`, onMouseUpSpeedBar, false);
    removeListener(`touchend`, onMouseUpSpeedBar, false);
    removeListener(`mousemove`, onCursorMoveSpeedBar, false);
    removeListener(`touchmove`, onCursorMoveSpeedBar, false);
    elid(`${_this.name}-speed-runtime`).innerHTML = `Speed`;
    let speedDisplay;
    _this.clip.speed == 1
      ? (speedDisplay = `Normal`)
      : (speedDisplay = _this.clip.speed);

    _this.elements.speedCurrent.innerHTML = speedDisplay;
  };
  const onMouseDownSpeedBar = e => {
    // if (!_this.options.pointerEvents) {
    //   pe = true;
    //   _this.elements.settingsPointerEvents.click();
    // }
    _this.elements.listenerHelper.style.pointerEvents = "auto";

    e.preventDefault();
    onCursorMoveSpeedBar(e);
    addListener(`mouseup`, onMouseUpSpeedBar, false);
    addListener(`touchend`, onMouseUpSpeedBar, false);
    addListener(`mousemove`, onCursorMoveSpeedBar, false);
    addListener(`touchmove`, onCursorMoveSpeedBar, false);
  };

  _this.elements.speedBarHelper.addEventListener(
    `mousedown`,
    onMouseDownSpeedBar,
    false
  );
  _this.elements.speedBarHelper.addEventListener(
    `touchstart`,
    onMouseDownSpeedBar,
    {
      passive: false
    },
    false
  );
};
