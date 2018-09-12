const { el, elid } = require(`../helpers`);

module.exports = _this => {
  el(`body`)[0].addEventListener(`click`, e => {
    if (e.target.className === `${_this.name}-speed-value`) {
      let speedDisplay = e.target.dataset.speedValue - 0;
      _this.clip.executionSpeed = e.target.dataset.speedValue;
      _this.clip.speed == 1
        ? (speedDisplay = `Normal`)
        : (speedDisplay = _this.clip.speed);
      _this.elements.speedCurrent.innerHTML = speedDisplay;

      const step = 1 / (_this.options.speedValues.length - 1);

      const positionY =
        (e.target.dataset.zone * step - 1) *
        -1 *
        ((_this.options.speedValues.length - 1) * 16);

      elid(`${_this.name}-speed-cursor`).style.top = positionY + `px`;
    }
  });
};
