import { addListener, removeListener } from "../helpers";
import {
  SHOW_PREVIEW_CHANGE,
  SHOW_VOLUME_CHANGE,
  STATE_CHANGE,
} from "./events";

const showIndicator = (_this) => {
  if (_this.elements.showIndicatorCheckbox.checked) {
    _this.elements.showIndicatorCheckbox.checked = false;
    _this.elements.indicator.style.display = "none";
  } else {
    _this.elements.showIndicatorCheckbox.checked = true;
    _this.elements.indicator.style.display = undefined;
  }
  _this.eventBroadcast(
    "show-indicator-change",
    _this.elements.showIndicatorCheckbox.checked
  );
};

const showPointerEvents = (_this) => {
  if (!_this.elements.showPointerEventsCheckbox.checked) {
    _this.elements.showPointerEventsCheckbox.checked = true;
    _this.options.pointerEvents = false;
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "none";
    _this.elements.controls.style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  } else {
    _this.elements.showPointerEventsCheckbox.checked = false;
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "auto";
    _this.elements.controls.style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  }
  _this.eventBroadcast(
    "show-pointer-events-change",
    _this.elements.showPointerEventsCheckbox.checked
  );
};

const showVolume = (_this) => {
  _this.elements.volumeControl.classList.toggle("m-fadeOut");
  if (_this.elements.showVolumeCheckbox.checked) {
    _this.elements.showVolumeCheckbox.checked = false;
  } else {
    _this.elements.showVolumeCheckbox.checked = true;
  }
  _this.eventBroadcast(
    SHOW_VOLUME_CHANGE,
    _this.elements.showVolumeCheckbox.checked
  );
};

const showPreview = (_this) => {
  if (_this.elements.showPreviewCheckbox.checked) {
    _this.elements.showPreviewCheckbox.checked = false;
    _this.elements.preview.style.display = "none";
    _this.elements.preview.style.display = "unset";
    _this.options.preview = false;
  } else {
    if (!_this.previewClip) {
      _this.createPreviewDisplay();
    }
    _this.elements.showPreviewCheckbox.checked = true;
    _this.elements.preview.style.display = "flex";
    _this.options.preview = true;
  }
  _this.eventBroadcast(
    SHOW_PREVIEW_CHANGE,
    _this.elements.showPreviewCheckbox.checked
  );
};

export function add(_this) {
  _this.elements.settingsShowIndicator.onclick = () => showIndicator(_this);

  _this.elements.settingsPointerEvents.onclick = () => showPointerEvents(_this);

  _this.elements.settingsShowVolume.onclick = () => showVolume(_this);

  _this.elements.settingsShowPreview.onclick = () => showPreview(_this);

  _this.elements.settingsButton.onclick = () => {
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
      if (
        !_this.elements.controls.classList.value.includes(
          "--mcp-force-show-controls"
        )
      ) {
        _this.elements.controls.classList.toggle("--mcp-force-show-controls");
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
