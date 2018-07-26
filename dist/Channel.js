"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

const MC = require("@kissmybutton/motorcortex");

const Channel = (function(_MC$Channel) {
  _inherits(Channel, _MC$Channel);

  function Channel(props) {
    _classCallCheck(this, Channel);

    const _this = _possibleConstructorReturn(
      this,
      (Channel.__proto__ || Object.getPrototypeOf(Channel)).call(this, props)
    );

    _this.textillateElements = [];
    _this.textillateOldElements = [];
    return _this;
  }

  return Channel;
})(MC.Channel);

module.exports = Channel;
