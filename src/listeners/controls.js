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

  elid(`${_this.name}-controls`).onmouseout = function(event) {
    const e = event.toElement || event.relatedTarget || event.target;
    if (isDescendant(this, e) || e === this) {
      return;
    }

    if (!_this.settings.loopActivated) {
      return;
    }
    _this.elements.loopBarStart.classList.add(`m-fadeOut`);
    _this.elements.loopBarEnd.classList.add(`m-fadeOut`);
    _this.elements.loopBarStart.classList.remove(`m-fadeIn`);
    _this.elements.loopBarEnd.classList.remove(`m-fadeIn`);
  };

  // elid(`${_this.name}-left-controls`).ontouchstart = function (event) {
  //   const e = event.toElement || event.relatedTarget || event.target;
  //     if (isDescendant(_this.elements.statusBtn, e) || e === _this.elements.statusBtn) {
  //       return false;
  //     }
  //     return "";
  // };
};

function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
