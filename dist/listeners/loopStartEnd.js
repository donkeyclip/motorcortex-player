"use strict";

module.exports = function (_this) {
  _this.listeners.editableLoopStartTime = function () {
    _this.elements.editableLoopStartTime.value = _this.elements.loopStartTime.innerHTML;

    _this.elements.loopStartTime.replaceWith(_this.elements.editableLoopStartTime);

    _this.elements.editableLoopStartTime.focus();
  };

  _this.listeners.editableLoopEndTime = function () {
    _this.elements.editableLoopEndTime.value = _this.elements.loopEndTime.innerHTML;

    _this.elements.loopEndTime.replaceWith(_this.elements.editableLoopEndTime);

    _this.elements.editableLoopEndTime.focus();
  };

  _this.elements.editableLoopEndTime.onkeydown = _this.elements.editableLoopStartTime.onkeydown = function (e) {
    e.preventDefault();

    if (e.keyCode === 8) {
      e.target.value = e.target.value.toString().substring(0, e.target.value.toString().length - 1);
    }

    if (e.keyCode === 13) {
      e.target.blur();
    }

    var newValue = parseFloat((e.target.value || 0).toString() + e.key);

    if (newValue > _this.clip.duration) {
      return;
    }

    e.target.value = newValue;

    if (e.target === _this.elements.editableLoopStartTime) {
      var viewportOffset = _this.elements.totalBar.getBoundingClientRect();

      var event = {
        preventDefault: function preventDefault() {},
        clientX: _this.elements.totalBar.offsetWidth / _this.clip.duration * e.target.value + viewportOffset.left
      };

      _this.listeners.onMouseDownLoopStart(event);

      _this.listeners.onCursorMoveLoopStart(event);

      _this.listeners.onMouseUpLoopStart(event);
    } else if (e.target === _this.elements.editableLoopEndTime) {
      var _viewportOffset = _this.elements.totalBar.getBoundingClientRect();

      var _event = {
        preventDefault: function preventDefault() {},
        clientX: _this.elements.totalBar.offsetWidth / _this.clip.duration * e.target.value + _viewportOffset.left
      };

      _this.listeners.onMouseDownLoopEnd(_event);

      _this.listeners.onCursorMoveLoopEnd(_event);

      _this.listeners.onMouseUpLoopEnd(_event);
    }
  };

  _this.elements.loopStartTime.onclick = _this.listeners.editableLoopStartTime;
  _this.elements.loopEndTime.onclick = _this.listeners.editableLoopEndTime;

  _this.elements.editableLoopStartTime.onfocusout = function () {
    _this.elements.editableLoopStartTime.replaceWith(_this.elements.loopStartTime);
  };

  _this.elements.editableLoopEndTime.onfocusout = function () {
    _this.elements.editableLoopEndTime.replaceWith(_this.elements.loopEndTime);
  };
};