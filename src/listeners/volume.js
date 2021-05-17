import {
  addMouseUpAndMoveListeners,
  addStartListeners,
  changeIcon,
  elFirstClass,
  removeMouseUpAndMoveListeners,
} from "../helpers";
import { MUTE_CHANGE, VOLUME_CHANGE } from "./events";
import { VOLUME_OFF, VOLUME_ON } from "./enums";
export function trigger(_this, volume, mute) {
  const elements = _this.elements;
  if (typeof mute !== undefined) {
    if (mute === false) {
      elements.volumeBarActive.style.width = `${_this.settings.volume * 100}%`;
      _this.clip.setVolume(_this.settings.previousVolume);
      _this.settings.volumeMute = false;
      changeIcon(elements.volumeBtn, VOLUME_OFF, VOLUME_ON);
    } else if (mute === true) {
      _this.settings.volumeMute = true;
      elements.volumeBarActive.style.width = "0%";
      _this.clip.setVolume(0);
      changeIcon(elements.volumeBtn, VOLUME_ON, VOLUME_OFF);
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
      changeIcon(elements.volumeBtn, VOLUME_OFF, VOLUME_ON);
    } else if (_this.settings.volume === 0) {
      _this.settings.volumeMute = true;
      changeIcon(elements.volumeBtn, VOLUME_OFF, VOLUME_ON);
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
      elements.volumeBarActive.style.width = `${
        _this.settings.previousVolume * 100
      }%`;
      _this.settings.volumeMute = false;
      changeIcon(elements.volumeBtn, VOLUME_OFF, VOLUME_ON);
    } else {
      _this.settings.volumeMute = true;
      changeIcon(elements.volumeBtn, VOLUME_ON, VOLUME_OFF);
      elements.volumeBarActive.style.width = `0%`;
      _this.clip.setVolume(0);
    }
    _this.eventBroadcast(VOLUME_CHANGE, _this.settings.previousVolume);
    _this.eventBroadcast(MUTE_CHANGE, _this.settings.volumeMute);
  };
  let volumeOpen = false;
  elements.volumeBtn.onmouseover = () => {
    volumeOpen = true;
  };

  const leftControlsElement = elFirstClass(
    _this.elements.mcPlayer,
    `--mcp-left-buttons`
  );
  leftControlsElement.onmouseout = () => {
    if (!volumeOpen || volumeDrag) {
      return;
    }

    const e = event.toElement || event.relatedTarget || event.target;
    if (e === leftControlsElement || isDescendant(leftControlsElement, e)) {
      return;
    }
    volumeOpen = false;
  };
  const listeners = _this.listeners;
  listeners.onCursorMoveVolumeBar = (e) => {
    // e.preventDefault();
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
      mute
        ? changeIcon(elements.volumeBtn, VOLUME_ON, VOLUME_OFF)
        : changeIcon(elements.volumeBtn, VOLUME_OFF, VOLUME_ON);
    }
    _this.eventBroadcast(VOLUME_CHANGE, _this.settings.volume);
    _this.eventBroadcast(MUTE_CHANGE, _this.settings.volumeMute);
  };

  listeners.onMouseUpVolumeBar = () => {
    volumeDrag = false;
    elements.listenerHelper.style.pointerEvents = "none";

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
