const { elid, elcreate } = require("../helpers");
const svg = require("./svg");
const playerHTML = require("./playerHTML");

module.exports = (clip, name, options, settings) => {
  const elements = {};
  const clipIframe = clip.props.host.getElementsByTagName(`iframe`)[0];

  // set clip position to relative
  clipIframe.style.display = `block`;
  clipIframe.style.margin = `0 auto`;
  clip.props.host.style.position = `relative`;

  // create the timer controls main div
  elements.mcPlayer = elcreate(`div`);

  elements.mcPlayer.id = `${name}`;
  elements.mcPlayer.innerHTML = playerHTML({ svg, name });
  elid(clip.props.host.id).appendChild(elements.mcPlayer);

  elements.loopBar = elid(`${name}-loopbar`);
  elements.totalBar = elid(`${name}-totalbar`);
  elements.indicator = elid(`${name}-indicator`);
  elements.loopButton = elid(`${name}-loop-btn`);
  elements.volumeBar = elid(`${name}-volumebar`);
  elements.totalTime = elid(`${name}-time-total`);
  elements.volumeControl = elid(`${name}-volume`);
  elements.volumeBtn = elid(`${name}-volume-btn`);
  elements.runningBar = elid(`${name}-runningbar`);
  elements.loopBarEnd = elid(`${name}-loopbar-end`);
  elements.statusButton = elid(`${name}-status-btn`);
  elements.speedBar = elid(`${name}-speed-value-bar`);
  elements.currentTime = elid(`${name}-time-current`);
  elements.timeDisplay = elid(`${name}-time-display`);
  elements.speedCurrent = elid(`${name}-speed-current`);
  elements.loopBarStart = elid(`${name}-loopbar-start`);
  elements.volumeCursor = elid(`${name}-volume-cursor`);
  elements.settingsButton = elid(`${name}-settings-btn`);
  elements.timeSeparator = elid(`${name}-time-separator`);
  elements.settingsPanel = elid(`${name}-settings-panel`);
  elements.settingsMainPanel = elid(`${name}-main-settings`);
  elements.fullScreenButton = elid(`${name}-full-screen-btn`);
  elements.volumeBarHelper = elid(`${name}-volumebar-helper`);
  elements.volumeBarActive = elid(`${name}-volumebar-active`);
  elements.settingsSpeedPanel = elid(`${name}-speed-settings`);
  elements.settingsShowVolume = elid(`${name}-settings-volume`);
  elements.settingsShowPreview = elid(`${name}-settings-preview`);
  elements.speedBarHelper = elid(`${name}-speed-value-helperbar`);
  elements.settingsShowIndicator = elid(`${name}-settings-indicator`);
  elements.settingsSpeedButtonShow = elid(`${name}-settings-speed-show`);
  elements.settingsSpeedButtonHide = elid(`${name}-settings-speed-hide`);

  elements.volumeBarActive.style.width = settings.volume * 100 + `%`;

  elements.currentTime.innerHTML = 0;

  elements.totalTime.innerHTML = clip.duration;

  elements.timeSeparator.innerHTML = `/`;

  elements.settingsPanel.classList.add(`m-fadeOut`);

  elements.indicator.style.visibility = `hidden`;
  elements.indicator.innerHTML = clip.state;

  elements.settingsSpeedPanel.style.display = `none`;

  elements.settingsSpeedPanel
    .getElementsByTagName(`li`)[1]
    .classList.add(`no-hover`);

  elements.loopBarStart.style.left = `0%`;
  elements.loopBarStart.classList.add(`m-fadeOut`);

  elements.loopBarEnd.style.left = `100%`;
  elements.loopBarEnd.classList.add(`m-fadeOut`);

  elements.loopStartTime = elid(`${name}-loopbar-start-time`);

  elements.loopEndTime = elid(`${name}-loopbar-end-time`);

  elements.editableLoopStartTime = document.createElement(`input`);

  elements.editableLoopStartTime.type = `text`;

  elements.editableLoopStartTime.size =
    elid(`${name}-time-total`).innerHTML.length + 1;

  elements.editableLoopStartTime.maxLength = elid(
    `${name}-time-total`
  ).innerHTML.length;

  elements.editableLoopStartTime.style.height = elid(
    `${name}-time-total`
  ).offsetHeight;

  elements.editableLoopStartTime.value = elid(
    `${name}-loopbar-start-time`
  ).innerHTML;

  elements.editableLoopStartTime.style.fontSize = `8px`;

  elements.editableLoopEndTime = document.createElement(`input`);

  elements.editableLoopEndTime.type = `text`;

  elements.editableLoopEndTime.size =
    elid(`${name}-time-total`).innerHTML.length + 1;

  elements.editableLoopEndTime.maxLength = elid(
    `${name}-time-total`
  ).innerHTML.length;

  elements.editableLoopEndTime.style.height = elid(
    `${name}-time-total`
  ).offsetHeight;

  elements.editableLoopEndTime.value = elid(
    `${name}-loopbar-start-time`
  ).innerHTML;

  elements.editableLoopEndTime.pattern = `d*`;

  elements.editableLoopEndTime.style.fontSize = `8px`;

  elid(`${name}-loop-time`).classList.add(`m-fadeOut`);

  elid(`${name}-hover-display`).classList.add(`m-fadeOut`);

  elid(`${name}-show-volume-checkbox`).checked = options.showVolume;

  elid(`${name}-show-preview-checkbox`).checked = options.preview;

  if (!options.showVolume) {
    elements.timeDisplay.style.left = `45px`;
    elements.volumeControl.style.visibility = `hidden`;
  } else {
    elements.timeDisplay.style.left = ``;

    elements.volumeControl.classList.toggle(`${name}-volume-width-transition`);

    elements.volumeBar.classList.toggle(`${name}-volume-width-transition`);

    elements.volumeBarHelper.classList.toggle(
      `${name}-volume-width-transition`
    );
    elements.timeDisplay.classList.toggle(`${name}-time-width-transition`);

    elements.volumeControl.style.visibility = `visible`;
  }
  return elements;
};
