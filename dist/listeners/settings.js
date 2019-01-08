"use strict";

var _require = require("../helpers"),
    elid = _require.elid,
    addListener = _require.addListener,
    removeListener = _require.removeListener;

module.exports = function (_this) {
  _this.elements.settingsShowIndicator.onclick = function (e) {
    e.preventDefault();
    var checkbox = elid("".concat(_this.name, "-show-indicator-checkbox"));

    if (checkbox.checked) {
      checkbox.checked = false;
      _this.elements.indicator.style.visibility = "hidden";
      _this.elements.statusButton.style.width = "40px";
      _this.elements.statusButton.style.height = "25px";
      _this.elements.statusButton.style.bottom = "0px";
    } else {
      checkbox.checked = true;
      _this.elements.indicator.style.visibility = "visible";
      _this.elements.statusButton.style.width = "35px";
      _this.elements.statusButton.style.height = "20px";
      _this.elements.statusButton.style.bottom = "5px";
    }
  };

  _this.elements.settingsPointerEvents.onclick = function (e) {
    e.preventDefault();
    var checkbox = elid("".concat(_this.name, "-pointer-events-checkbox"));

    if (checkbox.checked) {
      checkbox.checked = false;
      _this.options.pointerEvents = false;
      _this.elements.mcPlayer.style.pointerEvents = "none";
      _this.elements.pointerEventPanel.style.pointerEvents = "none";
      elid("".concat(_this.name, "-controls")).style.pointerEvents = "auto";
      _this.elements.settingsPanel.style.pointerEvents = "auto";
    } else {
      checkbox.checked = true;
      _this.elements.mcPlayer.style.pointerEvents = "none";
      _this.elements.pointerEventPanel.style.pointerEvents = "auto";
      elid("".concat(_this.name, "-controls")).style.pointerEvents = "auto";
      _this.elements.settingsPanel.style.pointerEvents = "auto";
    }
  };

  _this.elements.settingsShowVolume.onclick = function (e) {
    e.preventDefault();

    _this.elements.volumeControl.classList.toggle("".concat(_this.name, "-volume-width-transition"));

    _this.elements.volumeBar.classList.toggle("".concat(_this.name, "-volume-width-transition"));

    _this.elements.volumeBar.classList.toggle("".concat(_this.name, "-hide"));

    _this.elements.volumeBarHelper.classList.toggle("".concat(_this.name, "-volume-width-transition")); // _this.elements.timeDisplay.classList.toggle(
    //   `${_this.name}-time-width-transition`
    // );


    var checkbox = elid("".concat(_this.name, "-show-volume-checkbox"));

    if (checkbox.checked) {
      checkbox.checked = false;
      _this.elements.volumeControl.style.visibility = "hidden";
      _this.elements.timeDisplay.style.left = "45px";
    } else {
      checkbox.checked = true;
      _this.elements.volumeControl.style.visibility = "visible";
      _this.elements.timeDisplay.style.left = "";
    }
  };

  _this.elements.settingsShowPreview.onclick = function (e) {
    e.preventDefault();
    var checkbox = elid("".concat(_this.name, "-show-preview-checkbox"));

    if (checkbox.checked) {
      checkbox.checked = false;
      elid("".concat(_this.name, "-hover-display")).style.visibility = "hidden";
      elid("".concat(_this.name, "-hover-display")).style.display = "none";
      _this.options.preview = false;
    } else {
      if (!_this.previewClip) {
        _this.createPreviewDisplay();
      }

      checkbox.checked = true;
      elid("".concat(_this.name, "-hover-display")).style.visibility = "visible";
      elid("".concat(_this.name, "-hover-display")).style.display = "flex";
      _this.options.preview = true;
    }
  };

  _this.elements.settingsButton.onclick = function (e) {
    e.preventDefault();

    var showHideSettings = function showHideSettings(e) {
      if (_this.elements.settingsPanel.contains(e.target)) {
        return true;
      }

      _this.elements.settingsPanel.classList.toggle("".concat(_this.name, "-hide"));

      _this.elements.settingsPanel.classList.toggle("m-fadeOut");

      _this.elements.settingsPanel.classList.toggle("m-fadeIn");

      if (_this.elements.settingsPanel.className.includes("m-fadeOut")) {
        removeListener("click", showHideSettings, false);
      }
    };

    if (_this.elements.settingsPanel.className.includes("m-fadeOut")) {
      addListener("click", showHideSettings, false);
    } else {
      removeListener("click", showHideSettings, false);
    }
  };
};