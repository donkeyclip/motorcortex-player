import { elFirstClass, elid } from "../helpers";
import { touchstart } from "./events";

export default (_this) => {
  elFirstClass(_this.elements.mcPlayer,`--mcp-controls`).onmouseover = () => {
    if (!_this.settings.loopActivated) {
      return;
    }
    _this.elements.loopBarStart.classList.remove("m-fadeOut");
    _this.elements.loopBarEnd.classList.remove("m-fadeOut");
    _this.elements.loopBarStart.classList.add("m-fadeIn");
    _this.elements.loopBarEnd.classList.add("m-fadeIn");
  };

  elFirstClass(_this.elements.mcPlayer,`--mcp-controls`).onmouseout = function (event) {
    const e = event.toElement || event.relatedTarget || event.target;
    if (isDescendant(this, e) || e === this) {
      return;
    }

    if (!_this.settings.loopActivated) {
      return;
    }
    _this.elements.loopBarStart.classList.add("m-fadeOut");
    _this.elements.loopBarEnd.classList.add("m-fadeOut");
    _this.elements.loopBarStart.classList.remove("m-fadeIn");
    _this.elements.loopBarEnd.classList.remove("m-fadeIn");
  };

  let twt = false;
  elFirstClass(_this.elements.mcPlayer,`--mcp-controls`).ontouchstart = function (event) {
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
  

    twt = true;
  };

  window.addEventListener(touchstart, function (event) {
    const e = event.toElement || event.relatedTarget || event.target;
    if (
      isDescendant(elFirstClass(_this.elements.mcPlayer,`--mcp-controls`), e) ||
      e === elFirstClass(_this.elements.mcPlayer,`--mcp-controls`)
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
