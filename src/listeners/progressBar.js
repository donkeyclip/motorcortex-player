import {
  addMouseUpAndMoveListeners,
  addStartListeners,
  isMobile,
  removeMouseUpAndMoveListeners,
} from "../helpers";

export default (_this) => {
  _this.listeners.onCursorMove = (e) => {
    e.stopPropagation();
    if (isMobile()) e.preventDefault();
    const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
    const viewportOffset = _this.elements.loopBar.getBoundingClientRect();
    let positionX = clientX - viewportOffset.left;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.loopBar.offsetWidth) {
      positionX = _this.elements.loopBar.offsetWidth;
    }
    _this.handleDrag(positionX);
  };

  _this.listeners.onMouseUp = () => {
    _this.elements.listenerHelper.style.pointerEvents = "none";
    removeMouseUpAndMoveListeners(
      _this,
      _this.listeners.onMouseUp,
      _this.listeners.onCursorMove
    );
    _this.handleDragEnd(_this.settings);
  };

  _this.listeners.onMouseDown = (e) => {
    _this.elements.listenerHelper.style.pointerEvents = "auto";

    if (_this.clip.runTimeInfo.state === "playing") {
      _this.settings.playAfterResize = true;
    }
    _this.handleDragStart(_this.clip);
    _this.listeners.onCursorMove(e);
    addMouseUpAndMoveListeners(
      _this,
      _this.listeners.onMouseUp,
      _this.listeners.onCursorMove
    );
  };

  addStartListeners(_this.listeners.onMouseDown, _this.elements.loopBar);
};
