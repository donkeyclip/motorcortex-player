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

  let twt = false;
  elid(`${_this.name}-controls`).ontouchstart = function(event) {
    const e = event.toElement || event.relatedTarget || event.target;
    if (
      isDescendant(_this.elements.statusButton, e) ||
      e === _this.elements.statusButton ||
      isDescendant(_this.elements.settingsButton, e) ||
      e === _this.elements.settingsButton ||
      isDescendant(_this.elements.fullScreenButton, e) ||
      e === _this.elements.fullScreenButton ||
      isDescendant(_this.elements.loopButton, e) ||
      e === _this.elements.loopButton ||
      isDescendant(_this.elements.totalBar, e) ||
      e === _this.elements.totalBar
    ) {
      return;
    }

    _this.elements.volumeControl.className = `${
      _this.name
    }-volume-width-transition`;
    _this.elements.volumeBar.className = `${
      _this.name
    }-volume-width-transition`;
    _this.elements.volumeBarHelper.className = `${
      _this.name
    }-volume-width-transition`;
    _this.elements.timeDisplay.className = `${
      _this.name
    }-time-width-transition`;
    _this.elements.volumeCursor.className = `${
      _this.name
    }-volume-cursor-transition`;
    twt = true;
  };

  window.addEventListener("touchstart", function(event) {
    const e = event.toElement || event.relatedTarget || event.target;
    if (
      isDescendant(elid(`${_this.name}-controls`), e) ||
      e === elid(`${_this.name}-controls`)
    ) {
      return;
    }
    if (twt) {
      _this.elements.volumeControl.className = ``;
      _this.elements.volumeBar.className = ``;
      _this.elements.volumeBarHelper.className = ``;
      _this.elements.timeDisplay.className = ``;
      _this.elements.volumeCursor.className = ``;
    }
  });

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
