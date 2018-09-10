const { elid } = require(`../helpers`);

module.exports = _this => {
  elid(`${_this.name}-controls`).onmouseover = () => {
    if (!_this.settings.loopActivated) {
      return;
    }
    _this.elements.loopBarStart.classList.remove(`m-fadeOut`);
    _this.elements.loopBarEnd.classList.remove(`m-fadeOut`);
    _this.elements.loopBarStart.classList.add(`m-fadeIn`);
    _this.elements.loopBarEnd.classList.add(`m-fadeIn`);
  };

  elid(`${_this.name}-controls`).onmouseout = () => {
    if (!_this.settings.loopActivated) {
      return;
    }
    _this.elements.loopBarStart.classList.add(`m-fadeOut`);
    _this.elements.loopBarEnd.classList.add(`m-fadeOut`);
    _this.elements.loopBarStart.classList.remove(`m-fadeIn`);
    _this.elements.loopBarEnd.classList.remove(`m-fadeIn`);
  };
};
