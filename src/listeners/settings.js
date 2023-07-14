import { SHOW_VOLUME_CHANGE, STATE_CHANGE } from "./events";

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

export function add(_this) {
  _this.elements.settingsPanel.onblur = () => {
    _this.elements.settingsButton.click();
  };

  _this.elements.settingsPointerEvents.onclick = () => showPointerEvents(_this);

  _this.elements.settingsShowVolume.onclick = () => showVolume(_this);

  _this.elements.settingsButton.onclick = () => {
    const showHideSettings = (e) => {
      if (_this.elements.settingsPanel.contains(e.target)) {
        return true;
      }
      _this.elements.settingsPanel.classList.toggle(`${_this.name}-hide`);
      _this.elements.settingsPanel.classList.toggle("m-fadeOut");
      _this.elements.settingsPanel.classList.toggle("m-fadeIn");
      if (_this.elements.settingsPanel.className.includes("m-fadeOut")) {
        _this.document.removeEventListener("click", showHideSettings, false);
        _this.eventBroadcast(STATE_CHANGE, _this.state);
      } else {
        _this.elements.settingsPanel.focus();
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
      _this.document.addEventListener(`click`, showHideSettings, false);
    } else {
      _this.document.removeEventListener(`click`, showHideSettings, false);
    }
  };
}
export function trigger(_this, setting) {
  if (setting === "showPointerEvents") {
    showPointerEvents(_this);
  } else if (setting === "showVolume") {
    showVolume(_this);
  }
}
