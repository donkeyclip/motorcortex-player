import {
  addMouseUpAndMoveListeners,
  addStartListeners,
  elid,
  elFirstClass,
  removeMouseUpAndMoveListeners,
} from "../helpers";
import { SPEED_CHANGE } from "./events";

export function add(_this) {
  // const pe = false;
  _this.elements.settingsSpeedButtonShow.onclick = _this.elements.settingsSpeedButtonHide.onclick = (
    e
  ) => {
    // e.preventDefault();
    _this.elements.settingsPanel.classList.toggle(
      `${_this.name}-settings-speed-panel`
    );
    const includesClass = _this.elements.settingsPanel.className.includes(
      `${_this.name}-settings-speed-panel`
    );
    if (includesClass) {
      _this.elements.settingsMainPanel.style.display = "none";
      _this.elements.settingsSpeedPanel.style.display = "block";
    } else {
      _this.elements.settingsSpeedPanel.style.display = "none";
      _this.elements.settingsMainPanel.style.display = "block";
    }
  };

  const onCursorMoveSpeedBar = (e) => {
    // e.preventDefault();
    // const viewportOffset = _this.elements.speedBar.getBoundingClientRect();
    // const clientY = e.clientY || ((e.touches || [])[0] || {}).clientY;
    // let positionY = clientY - viewportOffset.top;

    // positionY -= 8;
    // if (positionY < 0) {
    //   positionY = 0;
    // } else if (positionY > _this.elements.speedBar.offsetHeight - 16) {
    //   positionY = _this.elements.speedBar.offsetHeight - 16;
    // }
    // positionY = Math.floor(positionY);
    // // show speed
    // const percentage = -(
    //   positionY / ((_this.options.speedValues.length - 1) * 16) -
    //   1
    // );
    // const step = 1 / (_this.options.speedValues.length - 1);
    // const speed = _this.calculateSpeed(
    //   step,
    //   _this.options.speedValues,
    //   percentage
    // );
    // elFirstClass(_this.elements.mcPlayer,`--mcp-speed-runtime`).innerHTML = `${speed}0`;
    // elFirstClass(_this.elements.mcPlayer,`--mcp-speed-cursor`).style.top = `${positionY}px`;
    // _this.clip.executionSpeed = speed;
    // _this.eventBroadcast(SPEED_CHANGE, _this.clip.executionSpeed);
  };

  const onMouseUpSpeedBar = (e) => {
    // _this.elements.listenerHelper.style.pointerEvents = "none";

    // e.preventDefault();
    // removeMouseUpAndMoveListeners(onMouseUpSpeedBar, onCursorMoveSpeedBar);
    // elFirstClass(_this.elements.mcPlayer,`--mcp-speed-runtime`).innerHTML = "Speed";
    // const speedDisplay = _this.clip.speed == 1 ? "Normal" : _this.clip.speed;

    // _this.elements.speedCurrent.innerHTML = speedDisplay;
  };
  const onMouseDownSpeedBar = (e) => {
  //   _this.elements.listenerHelper.style.pointerEvents = "auto";
  //   e.preventDefault();
  //   onCursorMoveSpeedBar(e);
  //   addMouseUpAndMoveListeners(onMouseUpSpeedBar, onCursorMoveSpeedBar);
  };

  // addStartListeners(onMouseDownSpeedBar, _this.elements.speedBarHelper);
}

export function trigger(_this, speed) {
  speed = parseFloat(speed) || 1;
  _this.eventBroadcast(SPEED_CHANGE, speed);
  const speedDisplay = speed == 1 ? "Normal" : speed;
  _this.clip.executionSpeed = speed;
  _this.elements.speedCurrent.innerHTML = speedDisplay;
}
