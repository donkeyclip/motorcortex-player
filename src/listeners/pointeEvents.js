import { changeIcon, playPauseIconFunctionality } from "../helpers";
import { trigger as fullscreenTrigger } from "./fullscreen";
export function addPlayIcon(playPausePanelContainer) {
  changeIcon(playPausePanelContainer, null, "play");
}
export function addPauseIcon(playPausePanelContainer) {
  changeIcon(playPausePanelContainer, null, "pause");
}

export function trigger(_this) {
  playPauseIconFunctionality(_this);
}

export function add(_this) {
  _this.elements.pointerEventPanel.onclick = () => trigger(_this);
  _this.elements.pointerEventPanel.ondblclick = () => fullscreenTrigger(_this);
}
