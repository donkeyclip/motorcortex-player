import { addListener, elid, removeListener } from "../helpers";

const showIndicator = (_this, e) => {
  e && e.preventDefault();
  const checkbox = elid(`${_this.name}-show-indicator-checkbox`);
  if (checkbox.checked) {
    checkbox.checked = false;
    _this.elements.indicator.style.visibility = `hidden`;
  } else {
    checkbox.checked = true;
    _this.elements.indicator.style.visibility = `visible`;
  }
  _this.eventBroadcast("show-indicator-change", checkbox.checked);
};
const showPointerEvents = (_this, e) => {
  e && e.preventDefault();
  const checkbox = elid(`${_this.name}-pointer-events-checkbox`);
  if (!checkbox.checked) {
    checkbox.checked = true;
    _this.options.pointerEvents = false;
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "none";
    elid(`${_this.name}-controls`).style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  } else {
    checkbox.checked = false;
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "auto";
    elid(`${_this.name}-controls`).style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  }
  _this.eventBroadcast("show-pointer-events-change", checkbox.checked);
};
const showVolume = (_this, e) => {
  e && e.preventDefault();
  _this.elements.volumeControl.classList.toggle(
    `${_this.name}-volume-width-transition`
  );
  _this.elements.volumeControl.classList.toggle(`${_this.name}-hide`);

  const checkbox = elid(`${_this.name}-show-volume-checkbox`);
  if (checkbox.checked) {
    checkbox.checked = false;
    _this.elements.volumeControl.style.visibility = `hidden`;
    _this.elements.timeDisplay.style.left = `45px`;
  } else {
    checkbox.checked = true;
    _this.elements.volumeControl.style.visibility = `visible`;
    _this.elements.timeDisplay.style.left = ``;
  }
  _this.eventBroadcast("show-volume-change", checkbox.checked);
};
const showPreview = (_this, e) => {
  e && e.preventDefault();
  const checkbox = elid(`${_this.name}-show-preview-checkbox`);
  if (checkbox.checked) {
    checkbox.checked = false;
    elid(`${_this.name}-hover-display`).style.visibility = `hidden`;
    elid(`${_this.name}-hover-display`).style.display = `none`;
    _this.options.preview = false;
  } else {
    if (!_this.previewClip) {
      _this.createPreviewDisplay();
    }
    checkbox.checked = true;
    elid(`${_this.name}-hover-display`).style.visibility = `visible`;
    elid(`${_this.name}-hover-display`).style.display = `flex`;
    _this.options.preview = true;
  }
  _this.eventBroadcast("show-preview-change", checkbox.checked);
};
export function add(_this) {
  _this.elements.settingsShowIndicator.onclick = (e) => showIndicator(_this, e);

  _this.elements.settingsPointerEvents.onclick = (e) =>
    showPointerEvents(_this, e);

  _this.elements.settingsShowVolume.onclick = (e) => showVolume(_this, e);

  _this.elements.settingsShowPreview.onclick = (e) => showPreview(_this, e);

  _this.elements.settingsButton.onclick = (e) => {
    e.preventDefault();
    const controlsEl = elid(`${_this.name}-controls`);

    const showHideSettings = (e) => {
      if (_this.elements.settingsPanel.contains(e.target)) {
        return true;
      }
      _this.elements.settingsPanel.classList.toggle(`${_this.name}-hide`);
      _this.elements.settingsPanel.classList.toggle(`m-fadeOut`);
      _this.elements.settingsPanel.classList.toggle(`m-fadeIn`);
      if (_this.elements.settingsPanel.className.includes(`m-fadeOut`)) {
        removeListener(`click`, showHideSettings, false);
        _this.eventBroadcast("state-change", _this.state);
      }
    };

    if (_this.elements.settingsPanel.className.includes(`m-fadeOut`)) {
      if (!controlsEl.classList.value.includes("force-show-controls")) {
        controlsEl.classList.toggle("force-show-controls");
      }
      addListener(`click`, showHideSettings, false);
    } else {
      removeListener(`click`, showHideSettings, false);
    }
  };
}
export function trigger(_this, setting) {
  if (setting === "showIndicator") {
    showIndicator(_this);
  } else if (setting === "showPointerEvents") {
    showPointerEvents(_this);
  } else if (setting === "showVolume") {
    showVolume(_this);
  } else if (setting === "showPreview") {
    showPreview(_this);
  }
}
