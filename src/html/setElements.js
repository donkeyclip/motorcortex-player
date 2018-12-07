const { elid, elcreate } = require("../helpers");
const svg = require("./svg");
const playerHTML = require("./playerHTML");

module.exports = _this => {
  _this.elements = {};
  const clipIframe = _this.clip.rootElement;

  // set _this.clip position to relative
  clipIframe.style.display = `block`;
  clipIframe.style.margin = `0 auto`;
  _this.clip.props.host.style.position = `relative`;
  _this.clip.props.host.style.zIndex = `0`;
  _this.elements.mcPlayer = elcreate(`div`);

  _this.elements.mcPlayer.id = `${_this.name}`;
  _this.elements.mcPlayer.className = `${_this.className}`;
  _this.elements.mcPlayer.innerHTML = playerHTML({ svg, name: _this.name });
  _this.options.host.appendChild(_this.elements.mcPlayer);

  _this.elements.pointerEventPanel = elid(`${_this.name}-pointer-event-panel`);
  _this.elements.listenerHelper = elid(`${_this.name}-listener-helper`);
  _this.elements.loopBar = elid(`${_this.name}-loopbar`);
  _this.elements.totalBar = elid(`${_this.name}-totalbar`);
  _this.elements.indicator = elid(`${_this.name}-indicator`);
  _this.elements.loopButton = elid(`${_this.name}-loop-btn`);
  _this.elements.volumeBar = elid(`${_this.name}-volumebar`);
  _this.elements.totalTime = elid(`${_this.name}-time-total`);
  _this.elements.volumeControl = elid(`${_this.name}-volume`);
  _this.elements.volumeBtn = elid(`${_this.name}-volume-btn`);
  _this.elements.runningBar = elid(`${_this.name}-runningbar`);
  _this.elements.loopBarEnd = elid(`${_this.name}-loopbar-end`);
  _this.elements.statusButton = elid(`${_this.name}-status-btn`);
  _this.elements.speedBar = elid(`${_this.name}-speed-value-bar`);
  _this.elements.currentTime = elid(`${_this.name}-time-current`);
  _this.elements.timeDisplay = elid(`${_this.name}-time-display`);
  _this.elements.speedCurrent = elid(`${_this.name}-speed-current`);
  _this.elements.loopBarStart = elid(`${_this.name}-loopbar-start`);
  _this.elements.volumeCursor = elid(`${_this.name}-volume-cursor`);
  _this.elements.settingsButton = elid(`${_this.name}-settings-btn`);
  _this.elements.donkeyclipButton = elid(`${_this.name}-dc-btn`);
  _this.elements.timeSeparator = elid(`${_this.name}-time-separator`);
  _this.elements.settingsPanel = elid(`${_this.name}-settings-panel`);
  _this.elements.settingsMainPanel = elid(`${_this.name}-main-settings`);
  _this.elements.fullScreenButton = elid(`${_this.name}-full-screen-btn`);
  _this.elements.volumeBarHelper = elid(`${_this.name}-volumebar-helper`);
  _this.elements.volumeBarActive = elid(`${_this.name}-volumebar-active`);
  _this.elements.settingsSpeedPanel = elid(`${_this.name}-speed-settings`);
  _this.elements.settingsShowVolume = elid(`${_this.name}-settings-volume`);
  _this.elements.settingsShowPreview = elid(`${_this.name}-settings-preview`);
  _this.elements.settingsPointerEvents = elid(
    `${_this.name}-settings-pointer-events`
  );
  _this.elements.speedBarHelper = elid(`${_this.name}-speed-value-helperbar`);
  _this.elements.settingsShowIndicator = elid(
    `${_this.name}-settings-indicator`
  );
  _this.elements.settingsSpeedButtonShow = elid(
    `${_this.name}-settings-speed-show`
  );
  _this.elements.settingsSpeedButtonHide = elid(
    `${_this.name}-settings-speed-hide`
  );

  _this.elements.volumeBarActive.style.width =
    _this.settings.volume * 100 + `%`;

  _this.elements.currentTime.innerHTML = 0;

  _this.elements.totalTime.innerHTML = _this.clip.duration;

  _this.elements.timeSeparator.innerHTML = `/`;

  _this.elements.settingsPanel.classList.add(`m-fadeOut`, `${_this.name}-hide`);

  _this.elements.indicator.style.visibility = `hidden`;
  _this.elements.indicator.innerHTML = _this.clip.state;

  _this.elements.settingsSpeedPanel.style.display = `none`;

  _this.elements.settingsSpeedPanel
    .getElementsByTagName(`li`)[1]
    .classList.add(`no-hover`);

  _this.elements.loopBarStart.style.left = `0%`;
  _this.elements.loopBarStart.classList.add(`m-fadeOut`, `${_this.name}-hide`);

  _this.elements.loopBarEnd.style.left = `100%`;
  _this.elements.loopBarEnd.classList.add(`m-fadeOut`, `${_this.name}-hide`);

  _this.elements.loopStartTime = elid(`${_this.name}-loopbar-start-time`);

  _this.elements.loopEndTime = elid(`${_this.name}-loopbar-end-time`);

  _this.elements.editableLoopStartTime = document.createElement(`input`);

  _this.elements.editableLoopStartTime.type = `text`;

  _this.elements.editableLoopStartTime.size =
    elid(`${_this.name}-time-total`).innerHTML.length + 1;

  _this.elements.editableLoopStartTime.maxLength = elid(
    `${_this.name}-time-total`
  ).innerHTML.length;

  _this.elements.editableLoopStartTime.style.height = elid(
    `${_this.name}-time-total`
  ).offsetHeight;

  _this.elements.editableLoopStartTime.value = elid(
    `${_this.name}-loopbar-start-time`
  ).innerHTML;

  _this.elements.editableLoopStartTime.style.fontSize = `8px`;

  _this.elements.editableLoopEndTime = document.createElement(`input`);

  _this.elements.editableLoopEndTime.type = `text`;

  _this.elements.editableLoopEndTime.size =
    elid(`${_this.name}-time-total`).innerHTML.length + 1;

  _this.elements.editableLoopEndTime.maxLength = elid(
    `${_this.name}-time-total`
  ).innerHTML.length;

  _this.elements.editableLoopEndTime.style.height = elid(
    `${_this.name}-time-total`
  ).offsetHeight;

  _this.elements.editableLoopEndTime.value = elid(
    `${_this.name}-loopbar-start-time`
  ).innerHTML;

  _this.elements.editableLoopEndTime.pattern = `d*`;

  _this.elements.editableLoopEndTime.style.fontSize = `8px`;

  elid(`${_this.name}-loop-time`).classList.add(
    `m-fadeOut`,
    `${_this.name}-hide`
  );

  elid(`${_this.name}-hover-display`).classList.add(
    `m-fadeOut`,
    `${_this.name}-hide`
  );

  elid(`${_this.name}-show-volume-checkbox`).checked = _this.options.showVolume;

  elid(`${_this.name}-show-preview-checkbox`).checked = _this.options.preview;

  elid(`${_this.name}-pointer-events-checkbox`).checked =
    _this.options.pointerEvents;

  if (_this.options.pointerEvents) {
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "auto";
    elid(`${_this.name}-controls`).style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  } else {
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "none";
    elid(`${_this.name}-controls`).style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  }
  _this.elements.listenerHelper.style.pointerEvents = "none";

  if (!_this.options.showVolume) {
    _this.elements.timeDisplay.style.left = `45px`;
    _this.elements.volumeControl.style.visibility = `hidden`;
    _this.elements.volumeBar.classList.toggle(`${_this.name}-hide`);
    _this.elements.volumeBar.classList.toggle(
      `${_this.name}-volume-width-transition`
    );
  } else {
    _this.elements.timeDisplay.style.left = ``;
    _this.elements.volumeControl.style.visibility = `visible`;
  }

  for (const i in _this.options.speedValues) {
    const barDiv = elcreate("div");
    barDiv.className = `${_this.name}-speed-value-step`;

    const valueDiv = elcreate("div");
    valueDiv.className = `${_this.name}-speed-value`;
    valueDiv.dataset.speedValue = _this.options.speedValues[i];
    valueDiv.innerHTML = _this.options.speedValues[i];
    valueDiv.dataset.zone = i;
    elid(`${_this.name}-speed-value`).prepend(valueDiv);

    _this.elements.speedBar.prepend(barDiv);
  }

  // show hide buttons
  if (_this.options.buttons.fullScreen === false) {
    _this.elements.fullScreenButton.remove();
  }

  if (_this.options.buttons.settings === false) {
    _this.elements.settingsButton.remove();
  }

  if (_this.options.buttons.donkeyclip === false) {
    _this.elements.donkeyclipButton.remove();
  }

  if (_this.options.buttons.loop === false) {
    _this.elements.loopButton.remove();
  }
};
