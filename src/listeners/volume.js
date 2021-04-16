import {
  addMouseUpAndMoveListeners,
  addStartListeners,
  elcreate,
  elid,
  removeMouseUpAndMoveListeners,
} from "../helpers";
import { volumeMuteSVG, volumeSVG } from "../html/svg";
import { MUTE_CHANGE, VOLUME_CHANGE } from "./events";
export function trigger(_this, volume, mute) {
  const elements = _this.elements;
  if (typeof mute !== undefined) {
    if (mute === false) {
      elements.volumeBarActive.style.width = `${_this.settings.volume * 100}%`;
      _this.clip.setVolume(_this.settings.previousVolume);
      _this.settings.volumeMute = false;
      const SVG = document.createElement("span");
      SVG.innerHTML = volumeSVG;
      elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
    } else if (mute === true) {
      _this.settings.volumeMute = true;
      elements.volumeBarActive.style.width = "0%";
      _this.clip.setVolume(0);
      const SVG = document.createElement("span");
      SVG.innerHTML = volumeMuteSVG;
      elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
    }
    _this.options.muted = _this.settings.volumeMute;
    _this.eventBroadcast(MUTE_CHANGE, _this.settings.volumeMute);
  }

  if (typeof volume !== undefined) {
    _this.settings.volume = volume;
    if (_this.settings.volume > 0) {
      _this.settings.previousVolume = volume;
    }

    elements.volumeBarActive.style.width = `${_this.settings.volume * 100}%`;
    _this.clip.setVolume(_this.settings.volume);

    if (_this.settings.volume > 0) {
      _this.settings.volumeMute = false;
      const SVG = document.createElement("span");
      SVG.innerHTML = volumeSVG;
      elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
    } else if (_this.settings.volume === 0) {
      _this.settings.volumeMute = true;
      const SVG = document.createElement("span");
      SVG.innerHTML = volumeMuteSVG;
      elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
    }

    _this.options.volume = _this.settings.volume;
    _this.eventBroadcast(VOLUME_CHANGE, _this.settings.volume);
    _this.eventBroadcast(MUTE_CHANGE, _this.settings.volumeMute);
  }
}
export function add(_this) {
  const elements = _this.elements;

  let volumeDrag = false;
  elements.volumeBtn.onclick = () => {
    if (_this.settings.volumeMute) {
      elements.volumeBarActive.style.width = `${_this.settings.volume * 100}%`;
      _this.clip.setVolume(_this.settings.previousVolume);
      _this.settings.volumeMute = false;
      const SVG = document.createElement("span");
      SVG.innerHTML = volumeSVG;
      elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
    } else {
      _this.settings.volumeMute = true;
      elements.volumeBarActive.style.width = "0%";
      _this.clip.setVolume(0);
      const SVG = document.createElement("span");
      SVG.innerHTML = volumeMuteSVG;
      elements.volumeBtn.getElementsByTagName("svg")[0].replaceWith(SVG);
    }
    _this.eventBroadcast(VOLUME_CHANGE, _this.settings.previousVolume);
    _this.eventBroadcast(MUTE_CHANGE, _this.settings.volumeMute);
  };
  let volumeOpen = false;
  elements.volumeBtn.onmouseover = () => {
    volumeOpen = true;
    elements.volumeCursor.classList.add(
      `${_this.name}-volume-cursor-transition`
    );
    elements.volumeBar.classList.add(`${_this.name}-volume-width-transition`);
    elements.volumeBarHelper.classList.add(
      `${_this.name}-volume-width-transition`
    );
    elements.timeDisplay.classList.add(`${_this.name}-time-width-transition`);
  };

  const leftControlsElement = elid(`${_this.name}-left-controls`);
  leftControlsElement.onmouseout = () => {
    if (!volumeOpen || volumeDrag) {
      return;
    }

    const e = event.toElement || event.relatedTarget || event.target;
    if (e === leftControlsElement || isDescendant(leftControlsElement, e)) {
      return;
    }
    volumeOpen = false;
    elements.volumeCursor.classList.remove(
      `${_this.name}-volume-cursor-transition`
    );
    elements.volumeBar.classList.remove(
      `${_this.name}-volume-width-transition`
    );
    elements.volumeBarHelper.classList.remove(
      `${_this.name}-volume-width-transition`
    );
    elements.timeDisplay.classList.remove(
      `${_this.name}-time-width-transition`
    );
  };
  const listeners = _this.listeners;
  listeners.onCursorMoveVolumeBar = (e) => {
    e.preventDefault();
    const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
    const viewportOffset = elements.volumeBarHelper.getBoundingClientRect();
    let positionX = clientX - viewportOffset.left;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > elements.volumeBarHelper.offsetWidth) {
      positionX = elements.volumeBarHelper.offsetWidth;
    }

    _this.settings.volume = Number(
      (positionX / elements.volumeBarHelper.offsetWidth).toFixed(2)
    );
    elements.volumeBarActive.style.width = `${_this.settings.volume * 100}%`;
    _this.clip.setVolume(_this.settings.volume);

    if (_this.settings.volume >= 0) {
      const mute = _this.settings.volume === 0;
      _this.settings.volumeMute = mute;
      const SVG = elcreate("span");
      SVG.innerHTML = mute ? volumeMuteSVG : volumeSVG;
      elements.volumeBtn.getElementsByTagName(`svg`)[0].replaceWith(SVG);
    }
    _this.eventBroadcast(VOLUME_CHANGE, _this.settings.volume);
    _this.eventBroadcast(MUTE_CHANGE, _this.settings.volumeMute);
  };

  listeners.onMouseUpVolumeBar = (e) => {
    volumeDrag = false;
    elements.listenerHelper.style.pointerEvents = "none";

    e.preventDefault();
    if (_this.settings.volume > 0) {
      _this.settings.previousVolume = _this.settings.volume;
    }
    removeMouseUpAndMoveListeners(
      listeners.onMouseUpVolumeBar,
      listeners.onCursorMoveVolumeBar
    );
  };

  listeners.onMouseDownVolumeBar = (e) => {
    volumeDrag = true;
    elements.listenerHelper.style.pointerEvents = "auto";

    e.preventDefault();
    listeners.onCursorMoveVolumeBar(e);
    addMouseUpAndMoveListeners(
      listeners.onMouseUpVolumeBar,
      listeners.onCursorMoveVolumeBar
    );
  };

  addStartListeners(listeners.onMouseDownVolumeBar, elements.volumeBarHelper);
  addStartListeners(listeners.onMouseDownVolumeBar, elements.volumeCursor);
}

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
