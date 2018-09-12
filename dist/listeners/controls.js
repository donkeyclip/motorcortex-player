"use strict";

var _require = require("../helpers"),
    elid = _require.elid;

module.exports = function (_this) {
  elid(_this.name + "-controls").onmouseover = function () {
    if (!_this.settings.loopActivated) {
      return;
    }
    _this.elements.loopBarStart.classList.remove("m-fadeOut");
    _this.elements.loopBarEnd.classList.remove("m-fadeOut");
    _this.elements.loopBarStart.classList.add("m-fadeIn");
    _this.elements.loopBarEnd.classList.add("m-fadeIn");
  };

  elid(_this.name + "-controls").onmouseout = function (event) {
    var e = event.toElement || event.relatedTarget || event.target;
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
};

function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}