import { addListener, elid, elFirstClass, removeListener } from "../helpers";
import {
  SHOW_PREVIEW_CHANGE,
  SHOW_VOLUME_CHANGE,
  STATE_CHANGE,
} from "./events";

const showIndicator = (_this, e) => {
  // e && e.preventDefault();
  const checkbox = elFirstClass(_this.elements.mcPlayer,`--mcp-show-indicator-checkbox`);
  if (checkbox.checked) {
    checkbox.checked = false;
    _this.elements.indicator.style.display = "none";
  } else {
    checkbox.checked = true;
    _this.elements.indicator.style.display = undefined;
  }
  _this.eventBroadcast("show-indicator-change", checkbox.checked);
};

const showPointerEvents = (_this, e) => {
  // e && e.preventDefault();
  const checkbox = elFirstClass(_this.elements.mcPlayer,`--mcp-pointer-events-checkbox`);
  if (!checkbox.checked) {
    checkbox.checked = true;
    _this.options.pointerEvents = false;
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "none";
    elFirstClass(_this.elements.mcPlayer,`--mcp-controls`).style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  } else {
    checkbox.checked = false;
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "auto";
    elFirstClass(_this.elements.mcPlayer,`--mcp-controls`).style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  }
  _this.eventBroadcast("show-pointer-events-change", checkbox.checked);
};

const showVolume = (_this, e) => {
  // e && e.preventDefault();
  _this.elements.volumeControl.classList.toggle(
    "m-fadeOut"
  );

  const checkbox = elFirstClass(_this.elements.mcPlayer,`--mcp-show-volume-checkbox`);
  if (checkbox.checked) {
    checkbox.checked = false;
  } else {
    checkbox.checked = true;
  }
  _this.eventBroadcast(SHOW_VOLUME_CHANGE, checkbox.checked);
};

const showPreview = (_this, e) => {
  // e && e.preventDefault();
  const checkbox = elFirstClass(_this.elements.mcPlayer,`--mcp-show-preview-checkbox`);
  if (checkbox.checked) {
    checkbox.checked = false;
    elFirstClass(_this.elements.mcPlayer,`--mcp-preview`).style.display = "none";
    elFirstClass(_this.elements.mcPlayer,`--mcp-preview`).style.display = "unset";
    _this.options.preview = false;
  } else {
    if (!_this.previewClip) {
      _this.createPreviewDisplay();
    }
    checkbox.checked = true;
    elFirstClass(_this.elements.mcPlayer,`--mcp-preview`).style.display = "flex";
    _this.options.preview = true;
  }
  _this.eventBroadcast(SHOW_PREVIEW_CHANGE, checkbox.checked);
};

export function add(_this) {
  _this.elements.settingsShowIndicator.onclick = (e) => showIndicator(_this, e);

  _this.elements.settingsPointerEvents.onclick = (e) =>
    showPointerEvents(_this, e);

  _this.elements.settingsShowVolume.onclick = (e) => showVolume(_this, e);

  _this.elements.settingsShowPreview.onclick = (e) => showPreview(_this, e);

  _this.elements.settingsButton.onclick = (e) => {
    // e.preventDefault();
    const controlsEl = elFirstClass(_this.elements.mcPlayer,`--mcp-controls`);

    const showHideSettings = (e) => {
      if (_this.elements.settingsPanel.contains(e.target)) {
        return true;
      }
      _this.elements.settingsPanel.classList.toggle(`${_this.name}-hide`);
      _this.elements.settingsPanel.classList.toggle("m-fadeOut");
      _this.elements.settingsPanel.classList.toggle("m-fadeIn");
      if (_this.elements.settingsPanel.className.includes("m-fadeOut")) {
        removeListener("click", showHideSettings, false);
        _this.eventBroadcast(STATE_CHANGE, _this.state);
      }
    };

    if (_this.elements.settingsPanel.className.includes(`m-fadeOut`)) {
      if (!controlsEl.classList.value.includes("--mcp-force-show-controls")) {
        controlsEl.classList.toggle("--mcp-force-show-controls");
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
