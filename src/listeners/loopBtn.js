const { elid } = require(`../helpers`);

module.exports = _this => {
  _this.elements.loopButton.onclick = () => {
    _this.settings.loopActivated = !_this.settings.loopActivated;
    _this.elements.loopButton.classList.toggle(`svg-selected`);
    _this.elements.loopBarStart.classList.toggle(`m-fadeOut`);
    _this.elements.loopBarEnd.classList.toggle(`m-fadeOut`);
    _this.elements.loopBarStart.classList.toggle(`m-fadeIn`);
    _this.elements.loopBarStart.classList.toggle(`${_this.name}-hide`);
    _this.elements.loopBarEnd.classList.toggle(`m-fadeIn`);
    _this.elements.loopBarEnd.classList.toggle(`${_this.name}-hide`);
    elid(`${_this.name}-loop-time`).classList.toggle(`m-fadeOut`);
    elid(`${_this.name}-loop-time`).classList.toggle(`m-fadeIn`);
    elid(`${_this.name}-loop-time`).classList.toggle(`${_this.name}-hide`);

    _this.elements.loopEndTime.innerHTML = _this.settings.loopEndMillisecond;
    _this.elements.loopStartTime.innerHTML =
      _this.settings.loopStartMillisecond;
    _this.settings.needsUpdate = true;

    if (!_this.settings.loopActivated) {
      _this.elements.loopBar.style.left = `0%`;
      _this.elements.loopBar.style.width = `100%`;
      _this.settings.loopStartMillisecond = 0;
      _this.settings.loopEndMillisecond = _this.clip.duration;
      _this.settings.loopLastPositionXPxls = 0;
      _this.settings.loopLastPositionXPercentage = 0;
      _this.elements.runningBar.style.width =
        (_this.clip.runTimeInfo.currentMillisecond / _this.clip.duration) *
          100 +
        `%`;
    }
  };
};
