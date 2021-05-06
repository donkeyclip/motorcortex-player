import { elcreate, elid,elFirstClass } from "../helpers";
// import playerHTML from "./playerHTML";
// import svg from "./svg";
import htmlplayer from "./player.html";
export default (_this) => {
  _this.elements = {};
  const clipIframe = _this.clip.props.host;
  if (!clipIframe.offsetWidth) {
    clipIframe.style.width = _this.clip.props.containerParams.width;
  }
  if (!clipIframe.offsetHeight) {
    clipIframe.style.height = _this.clip.props.containerParams.height;
  }
  //load ubuntu font

  const linkPreconnect = document.createElement("link");
  linkPreconnect.rel = "preconnect";
  linkPreconnect.href = "https://fonts.gstatic.com";
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap";
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(linkPreconnect);
  head.appendChild(link);
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
  const {mcPlayer} = _this.elements;
  window.mcPlayer = mcPlayer;
  
  _this.elements.pointerEventPanel = elFirstClass(mcPlayer,`--mcp-pointer-events-panel`);
  // _this.elements.listenerHelper = elFirstClass(mcPlayer,`--mcp-listener-helper`);
  _this.elements.loopBar = elFirstClass(mcPlayer,`--mcp-loopbar`);
  _this.elements.totalBar = elFirstClass(mcPlayer,`--mcp-totalbar`);
  _this.elements.indicator = elFirstClass(mcPlayer,`--mcp-indicator`);
  _this.elements.loopButton = elFirstClass(mcPlayer,`--mcp-loop-btn`);
  _this.elements.volumeBar = elFirstClass(mcPlayer,`--mcp-volumebar`);
  _this.elements.totalTime = elFirstClass(mcPlayer,`--mcp-time-total`);
  _this.elements.volumeControl = elFirstClass(mcPlayer,`--mcp-volume`);
  _this.elements.volumeBtn = elFirstClass(mcPlayer,`--mcp-volume-btn`);
  _this.elements.runningBar = elFirstClass(mcPlayer,`--mcp-runningbar`);
  _this.elements.loopBarEnd = elFirstClass(mcPlayer,`--mcp-loopbar-end`);
  _this.elements.statusButton = elFirstClass(mcPlayer,`--mcp-status-btn`);
  _this.elements.speedBar = elFirstClass(mcPlayer,`--mcp-speed-value-bar`);
  _this.elements.currentTime = elFirstClass(mcPlayer,`--mcp-time-current`);
  _this.elements.timeDisplay = elFirstClass(mcPlayer,`--mcp-time-display`);
  _this.elements.speedCurrent = elFirstClass(mcPlayer,`--mcp-speed-current`);
  _this.elements.loopBarStart = elFirstClass(mcPlayer,`--mcp-loopbar-start`);
  _this.elements.volumeCursor = elFirstClass(mcPlayer,`--mcp-volume-cursor`);
  _this.elements.settingsButton = elFirstClass(mcPlayer,`--mcp-settings-btn`);
  _this.elements.donkeyclipButton = elFirstClass(mcPlayer,`--mcp-dc-btn`);
  _this.elements.timeSeparator = elFirstClass(mcPlayer,`--mcp-time-separator`);
  _this.elements.settingsPanel = elFirstClass(mcPlayer,`--mcp-settings-panel`);
  _this.elements.settingsMainPanel = elFirstClass(mcPlayer,`--mcp-main-settings`);
  _this.elements.fullScreenButton = elFirstClass(mcPlayer,`--mcp-full-screen-btn`);
  _this.elements.volumeBarHelper = elFirstClass(mcPlayer,`--mcp-volumebar-helper`);
  _this.elements.volumeBarActive = elFirstClass(mcPlayer,`--mcp-volumebar-active`);
  _this.elements.settingsSpeedPanel = elFirstClass(mcPlayer,`--mcp-speed-settings`);
  _this.elements.settingsShowVolume = elFirstClass(mcPlayer,`--mcp-settings-volume`);
  _this.elements.settingsShowPreview = elFirstClass(mcPlayer,`--mcp-settings-preview`);
  _this.elements.settingsPointerEvents = elFirstClass(mcPlayer,`--mcp-settings-pointer-events`
  );
  _this.elements.speedBarHelper = elFirstClass(mcPlayer,`--mcp-speed-value-helperbar`);
  _this.elements.settingsShowIndicator = elFirstClass(mcPlayer,`--mcp-settings-indicator`
  );
  _this.elements.settingsSpeedButtonShow = elFirstClass(mcPlayer,`--mcp-settings-speed-show`
  );
  _this.elements.settingsSpeedButtonHide = elFirstClass(mcPlayer,`--mcp-settings-speed-hide`
  );
  console.log("x");
  // _this.elements.volumeBarActive.style.width = `${
  //   _this.settings.volume * 100
  // }%`;

  _this.elements.currentTime.innerHTML = _this.timeFormat(0);

  _this.elements.totalTime.innerHTML = _this.timeFormat(_this.clip.duration);

  _this.elements.timeSeparator.innerHTML = "/";

  _this.elements.settingsPanel.classList.add("m-fadeOut", `${_this.name}-hide`);

  if (!_this.options.showIndicator) {
    _this.elements.indicator.style.visibility = "hidden";
  } else {
    _this.elements.indicator.style.visibility = "visible";
    _this.elements.statusButton.style.width = "35px";
    _this.elements.statusButton.style.height = "20px";
    _this.elements.statusButton.style.bottom = "5px";
  }
  _this.elements.indicator.innerHTML = _this.clip.runTimeInfo.state;

  _this.elements.settingsSpeedPanel.style.display = "none";

  _this.elements.settingsSpeedPanel
    .getElementsByTagName("li")[1]
    .classList.add("no-hover");

  _this.elements.loopBarStart.style.left = "0%";
  _this.elements.loopBarStart.classList.add("m-fadeOut", `${_this.name}-hide`);

  _this.elements.loopBarEnd.style.left = "100%";
  _this.elements.loopBarEnd.classList.add("m-fadeOut", `${_this.name}-hide`);

  // _this.elements.loopStartTime = elFirstClass(mcPlayer,`--mcp-loopbar-start-time`);

  // _this.elements.loopEndTime = elFirstClass(mcPlayer,`--mcp-loopbar-end-time`);

  // _this.elements.editableLoopStartTime = document.createElement("input");

  // _this.elements.editableLoopStartTime.type = "text";

  // _this.elements.editableLoopStartTime.size =
  //   elFirstClass(mcPlayer,`--mcp-time-total`).innerHTML.length + 1;

  // _this.elements.editableLoopStartTime.maxLength = elFirstClass(mcPlayer,`--mcp-time-total`
  // ).innerHTML.length;

  // _this.elements.editableLoopStartTime.style.height = elFirstClass(mcPlayer,`--mcp-time-total`
  // ).offsetHeight;

  // _this.elements.editableLoopStartTime.value = elFirstClass(mcPlayer,`--mcp-loopbar-start-time`
  // ).innerHTML;

  // _this.elements.editableLoopStartTime.style.fontSize = "8px";

  // _this.elements.editableLoopEndTime = document.createElement("input");

  // _this.elements.editableLoopEndTime.type = "text";

  // _this.elements.editableLoopEndTime.size =
  //   elFirstClass(mcPlayer,`--mcp-time-total`).innerHTML.length + 1;

  // _this.elements.editableLoopEndTime.maxLength = elFirstClass(mcPlayer,`--mcp-time-total`
  // ).innerHTML.length;

  // _this.elements.editableLoopEndTime.style.height = elFirstClass(mcPlayer,`--mcp-time-total`
  // ).offsetHeight;

  // _this.elements.editableLoopEndTime.value = elFirstClass(mcPlayer,`--mcp-loopbar-start-time`
  // ).innerHTML;

  // _this.elements.editableLoopEndTime.pattern = "d*";

  // _this.elements.editableLoopEndTime.style.fontSize = "8px";

  // elFirstClass(mcPlayer,`--mcp-loop-time`).classList.add(
  //   "m-fadeOut",
  //   `${_this.name}-hide`
  // );

  elFirstClass(mcPlayer,`--mcp-preview`).classList.add("m-fadeOut");

  elFirstClass(mcPlayer,`--mcp-show-volume-checkbox`).checked = _this.options.showVolume;

  elFirstClass(mcPlayer,`--mcp-show-indicator-checkbox`).checked =
    _this.options.showIndicator;

  elFirstClass(mcPlayer,`--mcp-show-preview-checkbox`).checked = _this.options.preview;

  elFirstClass(mcPlayer,`--mcp-pointer-events-checkbox`).checked =
    _this.options.pointerEvents;

  if (_this.options.pointerEvents) {
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "none";
    elFirstClass(mcPlayer,`--mcp-controls`).style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  } else {
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "auto";
    elFirstClass(mcPlayer,`--mcp-controls`).style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  }
  // _this.elements.listenerHelper.style.pointerEvents = "none";

  if (!_this.options.showVolume) {
    _this.elements.timeDisplay.style.left = "45px";
    _this.elements.volumeControl.style.visibility = "hidden";
    _this.elements.volumeControl.classList.toggle(`${_this.name}-hide`);
    _this.elements.volumeControl.classList.toggle(
      `${_this.name}-volume-width-transition`
    );
  } else {
    _this.elements.timeDisplay.style.left = "";
    _this.elements.volumeControl.style.visibility = "visible";
  }

  for (const i in _this.options.speedValues) {
    const barDiv = elcreate("div");
    barDiv.className = `${_this.name}-speed-value-step`;

    const valueDiv = elcreate("div");
    valueDiv.className = `${_this.name}-speed-value`;
    valueDiv.dataset.speedValue = _this.options.speedValues[i];
    valueDiv.innerHTML = _this.options.speedValues[i];
    valueDiv.dataset.zone = i;
    elFirstClass(mcPlayer,`--mcp-speed-value`).prepend(valueDiv);

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
