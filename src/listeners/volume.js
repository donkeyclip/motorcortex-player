const { addListener, removeListener, elid } = require(`../helpers`);

const svg = require("../html/svg");

module.exports = _this => {
  // let pe = false;
  let volumeDrag = false;
  _this.elements.volumeBtn.onclick = () => {
    if (_this.settings.volumeMute) {
      _this.elements.volumeBarActive.style.width =
        _this.settings.previousVolume * 100 + `%`;
      _this.clip.setVolume(_this.settings.previousVolume);
      _this.settings.volumeMute = false;
      const SVG = document.createElement(`span`);
      SVG.innerHTML = svg.volumeSVG;
      _this.elements.volumeBtn.getElementsByTagName(`svg`)[0].replaceWith(SVG);
    } else {
      _this.settings.volumeMute = true;
      _this.elements.volumeBarActive.style.width = `0%`;
      _this.clip.setVolume(0);
      const SVG = document.createElement(`span`);
      SVG.innerHTML = svg.volumeMuteSVG;
      _this.elements.volumeBtn.getElementsByTagName(`svg`)[0].replaceWith(SVG);
    }
  };
  let volumeOpen = false;
  _this.elements.volumeBtn.onmouseover = () => {
    volumeOpen = true;
    _this.elements.volumeCursor.classList.add(
      `${_this.name}-volume-cursor-transition`
    );
    _this.elements.volumeBar.classList.add(
      `${_this.name}-volume-width-transition`
    );
    _this.elements.volumeBarHelper.classList.add(
      `${_this.name}-volume-width-transition`
    );
    _this.elements.timeDisplay.classList.add(
      `${_this.name}-time-width-transition`
    );
  };

  elid(`${_this.name}-left-controls`).onmouseout = () => {
    if (!volumeOpen || volumeDrag) {
      return;
    }

    const e = event.toElement || event.relatedTarget || event.target;
    if (
      isDescendant(elid(`${_this.name}-left-controls`), e) ||
      e === elid(`${_this.name}-left-controls`)
    ) {
      return;
    }
    volumeOpen = false;
    _this.elements.volumeCursor.classList.remove(
      `${_this.name}-volume-cursor-transition`
    );
    _this.elements.volumeBar.classList.remove(
      `${_this.name}-volume-width-transition`
    );
    _this.elements.volumeBarHelper.classList.remove(
      `${_this.name}-volume-width-transition`
    );
    _this.elements.timeDisplay.classList.remove(
      `${_this.name}-time-width-transition`
    );
  };

  _this.listeners.onCursorMoveVolumeBar = e => {
    e.preventDefault();
    const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
    const viewportOffset = _this.elements.volumeBarHelper.getBoundingClientRect();
    let positionX = clientX - viewportOffset.left;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.volumeBarHelper.offsetWidth) {
      positionX = _this.elements.volumeBarHelper.offsetWidth;
    }

    _this.settings.volume = Number(
      (positionX / _this.elements.volumeBarHelper.offsetWidth).toFixed(2)
    );
    _this.elements.volumeBarActive.style.width =
      _this.settings.volume * 100 + `%`;
    _this.clip.setVolume(_this.settings.volume);

    if (_this.settings.volume > 0) {
      _this.settings.volumeMute = false;
      const SVG = document.createElement(`span`);
      SVG.innerHTML = svg.volumeSVG;
      _this.elements.volumeBtn.getElementsByTagName(`svg`)[0].replaceWith(SVG);
    } else if (_this.settings.volume === 0) {
      _this.settings.volumeMute = true;
      const SVG = document.createElement(`span`);
      SVG.innerHTML = svg.volumeMuteSVG;
      _this.elements.volumeBtn.getElementsByTagName(`svg`)[0].replaceWith(SVG);
    }
  };

  _this.listeners.onMouseUpVolumeBar = e => {
    volumeDrag = false;
    // if (pe) {
    //   _this.elements.settingsPointerEvents.click();
    // }
    _this.elements.listenerHelper.style.pointerEvents = "none";

    e.preventDefault();
    if (_this.settings.volume > 0) {
      _this.settings.previousVolume = _this.settings.volume;
    }
    removeListener(`mouseup`, _this.listeners.onMouseUpVolumeBar, false);
    removeListener(`touchend`, _this.listeners.onMouseUpVolumeBar, false);
    removeListener(`mousemove`, _this.listeners.onCursorMoveVolumeBar, false);
    removeListener(`touchmove`, _this.listeners.onCursorMoveVolumeBar, false);
  };

  _this.listeners.onMouseDownVolumeBar = e => {
    volumeDrag = true;
    // if (!_this.options.pointerEvents) {
    //   pe = true;
    //   _this.elements.settingsPointerEvents.click();
    // }
    _this.elements.listenerHelper.style.pointerEvents = "auto";

    e.preventDefault();
    _this.listeners.onCursorMoveVolumeBar(e);
    addListener(`mouseup`, _this.listeners.onMouseUpVolumeBar, false);
    addListener(`touchend`, _this.listeners.onMouseUpVolumeBar, false);
    addListener(`mousemove`, _this.listeners.onCursorMoveVolumeBar, false);
    addListener(`touchmove`, _this.listeners.onCursorMoveVolumeBar, false);
  };

  _this.elements.volumeBarHelper.addEventListener(
    `mousedown`,
    _this.listeners.onMouseDownVolumeBar,
    false
  );
  _this.elements.volumeCursor.addEventListener(
    `mousedown`,
    _this.listeners.onMouseDownVolumeBar,
    false
  );
  _this.elements.volumeBarHelper.addEventListener(
    `touchstart`,
    _this.listeners.onMouseDownVolumeBar,
    {
      passive: false
    },
    false
  );
  _this.elements.volumeCursor.addEventListener(
    `touchstart`,
    _this.listeners.onMouseDownVolumeBar,
    {
      passive: false
    },
    false
  );
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
