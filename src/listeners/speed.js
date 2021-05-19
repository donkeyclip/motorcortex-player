import { SPEED_CHANGE } from "./events";

export function add(_this) {
  _this.elements.settingsSpeedButtonShow.onclick =
    _this.elements.settingsSpeedButtonHide.onclick = () => {
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
}

export function trigger(_this, speed) {
  speed = parseFloat(speed) || 1;
  _this.eventBroadcast(SPEED_CHANGE, speed);
  const speedDisplay = speed == 1 ? "Normal" : speed;
  _this.clip.executionSpeed = speed;
  _this.elements.speedCurrent.innerHTML = speedDisplay;
}
