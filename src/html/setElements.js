import {
  elcreate,
  elFirstClass,
  initializeIcons,
  changeIcon,
} from "../helpers";

import htmlplayer from "./player.html";

export default (_this) => {
  _this.elements = {};
  initializePlayer(_this);

  const { mcPlayer } = _this.elements;

  _this.elements.pointerEventPanel = elFirstClass(
    mcPlayer,
    `--mcp-pointer-events-panel`
  );
  _this.elements.listenerHelper = elFirstClass(
    mcPlayer,
    `--mcp-listener-helper`
  );
  _this.elements.loopBar = elFirstClass(mcPlayer, `--mcp-loopbar`);
  _this.elements.totalBar = elFirstClass(mcPlayer, `--mcp-totalbar`);
  _this.elements.indicator = elFirstClass(mcPlayer, `--mcp-indicator`);
  _this.elements.loopButton = elFirstClass(mcPlayer, `--mcp-loop-btn`);
  _this.elements.volumeBar = elFirstClass(mcPlayer, `--mcp-volumebar`);
  _this.elements.totalTime = elFirstClass(mcPlayer, `--mcp-time-total`);
  _this.elements.volumeControl = elFirstClass(mcPlayer, `--mcp-volume`);
  _this.elements.volumeBtn = elFirstClass(mcPlayer, `--mcp-volume-btn`);
  _this.elements.runningBar = elFirstClass(mcPlayer, `--mcp-runningbar`);
  _this.elements.loopBarEnd = elFirstClass(mcPlayer, `--mcp-loopbar-end`);
  _this.elements.statusButton = elFirstClass(mcPlayer, `--mcp-status-btn`);
  _this.elements.speedBar = elFirstClass(mcPlayer, `--mcp-speed-values`);
  _this.elements.currentTime = elFirstClass(mcPlayer, `--mcp-time-current`);
  _this.elements.timeDisplay = elFirstClass(mcPlayer, `--mcp-time-display`);
  _this.elements.speedButtonShow = elFirstClass(
    mcPlayer,
    `--mcp-speed-btn-show`
  );
  _this.elements.speedButtonHide = elFirstClass(
    mcPlayer,
    `--mcp-speed-btn-hide`
  );
  _this.elements.speedCurrent = elFirstClass(mcPlayer, `--mcp-speed-current`);
  _this.elements.loopBarStart = elFirstClass(mcPlayer, `--mcp-loopbar-start`);
  _this.elements.volumeCursor = elFirstClass(mcPlayer, `--mcp-volume-cursor`);
  _this.elements.settingsButton = elFirstClass(mcPlayer, `--mcp-settings-btn`);
  _this.elements.donkeyclipButton = elFirstClass(mcPlayer, `--mcp-dc-btn`);
  _this.elements.timeSeparator = elFirstClass(mcPlayer, `--mcp-time-separator`);
  _this.elements.settingsPanel = elFirstClass(mcPlayer, `--mcp-settings-panel`);
  _this.elements.background = elFirstClass(mcPlayer, `--mcp-background`);
  _this.elements.settingsMainPanel = elFirstClass(
    mcPlayer,
    `--mcp-main-settings`
  );
  _this.elements.fullScreenButton = elFirstClass(
    mcPlayer,
    `--mcp-full-screen-btn`
  );
  _this.elements.volumeBarHelper = elFirstClass(mcPlayer, `--mcp-volumebar`);
  _this.elements.volumeBarActive = elFirstClass(
    mcPlayer,
    `--mcp-volumebar-color-active`
  );
  _this.elements.settingsSpeedPanel = elFirstClass(
    mcPlayer,
    `--mcp-speed-settings`
  );
  _this.elements.settingsShowVolume = elFirstClass(
    mcPlayer,
    `--mcp-settings-volume`
  );
  _this.elements.settingsShowPreview = elFirstClass(
    mcPlayer,
    `--mcp-settings-preview`
  );
  _this.elements.settingsPointerEvents = elFirstClass(
    mcPlayer,
    `--mcp-settings-pointer-events`
  );

  _this.elements.settingsSpeedButtonShow = elFirstClass(
    mcPlayer,
    `--mcp-settings-speed-show`
  );
  _this.elements.settingsSpeedButtonHide = elFirstClass(
    mcPlayer,
    `--mcp-settings-speed-hide`
  );
  _this.elements.controls = elFirstClass(mcPlayer, `--mcp-controls`);
  _this.elements.previewHost = elFirstClass(mcPlayer, `--mcp-preview-host`);
  _this.elements.preview = elFirstClass(mcPlayer, `--mcp-preview`);
  _this.elements.volumeCheckbox = elFirstClass(
    mcPlayer,
    `--mcp-show-volume-checkbox`
  );
 
  _this.elements.showPreviewCheckbox = elFirstClass(
    mcPlayer,
    `--mcp-show-preview-checkbox`
  );
  _this.elements.showVolumeCheckbox = elFirstClass(
    mcPlayer,
    `--mcp-show-volume-checkbox`
  );
  _this.elements.showPointerEventsCheckbox = elFirstClass(
    mcPlayer,
    `--mcp-show-pointer-events-checkbox`
  );
  _this.elements.previewMillisecond = elFirstClass(
    mcPlayer,
    `--mcp-preview-millisecond`
  );
  _this.elements.leftButtons = elFirstClass(mcPlayer, `--mcp-left-buttons`);

  initializeIcons(_this.elements);
  addStyles(_this);
  createSpeedValues(_this);
  showHideButtons(_this);
};

const initializePlayer = (_this) => {
  const clipIframe = _this.clip.props.host;
  if (!clipIframe.offsetWidth) {
    clipIframe.style.width = _this.clip.props.containerParams.width;
  }
  if (!clipIframe.offsetHeight) {
    clipIframe.style.height = _this.clip.props.containerParams.height;
  }

  clipIframe.style.display = `flex`;
  clipIframe.style.justifyContent = `center`;
  clipIframe.style.alignItems = `center`;
  clipIframe.style.overflow = "hidden";
  _this.clip.props.host.style.position = `relative`;
  _this.clip.props.host.style.zIndex = 0;
  _this.elements.mcPlayer = elcreate(`div`);

  _this.elements.mcPlayer.id = `${_this.name}`;
  _this.elements.mcPlayer.className = `${_this.className}`;
  _this.elements.mcPlayer.innerHTML = htmlplayer;
  if (typeof _this.options.host === "string") {
    const nodelist = document.querySelectorAll(_this.options.host);
    for (const i in nodelist) {
      if (isNaN(i)) {
        continue;
      }
      nodelist[i].appendChild(_this.elements.mcPlayer);
    }
  } else {
    _this.options.host.appendChild(_this.elements.mcPlayer);
  }
};

const addStyles = (_this) => {
  _this.elements.volumeBarActive.style.width = `${
    _this.settings.volume * 100
  }%`;

  _this.elements.currentTime.innerHTML = _this.timeFormat(0);

  _this.elements.totalTime.innerHTML = _this.timeFormat(_this.clip.duration);

  _this.elements.timeSeparator.innerHTML = "/";

  _this.elements.settingsPanel.classList.add("m-fadeOut", `${_this.name}-hide`);

    if(_this.options.backgroundColor){
    _this.elements.background.style.background = _this.options.backgroundColor;

  }
  if (!_this.options.showIndicator) {
    _this.elements.indicator.style.display = "none";
  } else {
    _this.elements.indicator.style.display = undefined;
    _this.elements.statusButton.style.width = "35px";
    _this.elements.statusButton.style.height = "20px";
    _this.elements.statusButton.style.bottom = "5px";
  }
  _this.elements.indicator.innerHTML = _this.clip.runTimeInfo.state;

  _this.elements.settingsSpeedPanel.style.display = "none";

  _this.elements.loopBarStart.style.left = "0%";
  _this.elements.loopBarStart.classList.add("m-fadeOut", `${_this.name}-hide`);

  _this.elements.loopBarEnd.style.left = "100%";
  _this.elements.loopBarEnd.classList.add("m-fadeOut", `${_this.name}-hide`);

  _this.elements.preview.classList.add("m-fadeOut");

  _this.elements.volumeCheckbox.checked = _this.options.showVolume;

  _this.elements.showPreviewCheckbox.checked = _this.options.preview;

  _this.elements.showPointerEventsCheckbox.checked =
    _this.options.pointerEvents;

  if (_this.options.pointerEvents) {
    _this.elements.pointerEventPanel.style.pointerEvents = "none";
  } else {
    _this.elements.pointerEventPanel.style.pointerEvents = "auto";
  }

  if (!_this.options.showVolume) {
    _this.elements.volumeControl.classList.toggle("m-fadeOut");
  }
};

const createSpeedValues = (_this) => {
  for (const i in _this.options.speedValues) {
    if (_this.options.speedValues[i] == 0) continue;
    const iconCheckClass = "check-solid";
    const selectedClass = "--mcp-selected";

    //create the parent li element
    const li = elcreate("li");
    li.className = `--mcp-speed-value`;
    li.dataset.speedValue = _this.options.speedValues[i];

    //create the check holder
    const span = document.createElement("span");
    li.append(span);

    //create the value of the speed
    const valueDiv = elcreate("p");
    const isNormal = _this.options.speedValues[i] == 1;
    valueDiv.innerHTML = isNormal ? "Normal" : _this.options.speedValues[i];
    valueDiv.dataset.zone = i;
    valueDiv.classList.add("--mcp-speed-value-item");

    //add the check if this is the speed
    if (_this.options.speedValues[i] == _this.clip.speed) {
      changeIcon(span, null, iconCheckClass);
      valueDiv.classList.add(selectedClass);
    }

    li.append(valueDiv);
    _this.elements.speedBar.append(li);

    li.onclick = function () {
      _this.options.speed = _this.options.speedValues[i];
      _this.clip.speed = _this.options.speedValues[i];

      const isNormal = _this.clip.speed == 1;
      _this.elements.speedCurrent.innerHTML = isNormal
        ? "Normal"
        : _this.clip.speed;

      const previousChecked = elFirstClass(
        _this.elements.mcPlayer,
        "icon-check-solid"
      );
      changeIcon(previousChecked, iconCheckClass);
      changeIcon(span, null, iconCheckClass);

      elFirstClass(_this.elements.mcPlayer, selectedClass).classList.remove(
        selectedClass
      );
      valueDiv.classList.add(selectedClass);
    };
  }
};

const showHideButtons = (_this) => {
  // show hide buttons
  if (_this.options.buttons.fullScreen === false) {
    _this.elements.fullScreenButton.remove();
  }

  if (_this.options.buttons.settings === false) {
    _this.elements.settingsButton.remove();
  }

  if (!_this.options.buttons.donkeyclip) {
    _this.elements.donkeyclipButton.remove();
  }

  if (_this.options.buttons.loop === false) {
    _this.elements.loopButton.remove();
  }
};
