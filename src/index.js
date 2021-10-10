import { TimeCapsule, utils } from "@donkeyclip/motorcortex";
import { name } from "./config";
import { calcClipScale, elcreate, elid, eltag, changeIcon, sanitizeCSS } from "./helpers";
import setElements from "./html/setElements";
import bodyListener from "./listeners/body";
import donkeyclipListener from "./listeners/donkeyclip";
import { PLAYING, showControls } from "./listeners/enums";
import css from "./html/style.css";

import {
  DURATION_CHANGE,
  LOOP_CHANGE,
  MUTE_CHANGE,
  SCALE_CHANGE,
  SHOW_PREVIEW_CHANGE,
  SHOW_VOLUME_CHANGE,
  SPEED_CHANGE,
  STATE_CHANGE,
  VOLUME_CHANGE,
} from "./listeners/events";
import {
  add as fullscreenAdd,
  trigger as fullscreenTrigger,
} from "./listeners/fullscreen";
import loopBarEndListener from "./listeners/loopBarEnd";
import loopBarStartListener from "./listeners/loopBarStart";
import { add as loopAdd, trigger as loopTrigger } from "./listeners/loopBtn";
import previewListener from "./listeners/preview";
import progressBarListener from "./listeners/progressBar";
import {
  add as settingsAdd,
  trigger as settingsTrigger,
} from "./listeners/settings";
import { add as speedAdd, trigger as speedTrigger } from "./listeners/speed";
import statusBtnListener from "./listeners/statusBtn";
import { add as volumeAdd, trigger as volumeTrigger } from "./listeners/volume";
const timeCapsule = new TimeCapsule();

/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident
 * (such as a Scene or a Clip) can both privide info regarding their timing
 * state but also provide an interface for interacting/altering the timing of it
 */

class Player {
  constructor(options) {
    this.options = this.initializeOptions(options);
    this.className = name;
    this.id = this.options.id;
    this.name = name;
    this.previewClip = null;
    this.clip = options.clip; // host to apply the timer
    this.clipClass = options.clipClass;
    this.state = this.clip.runTimeInfo.state;
    this.listeners = {};
    this.previewScale = 0.25;

    this.settings = {
      volume: 1,
      journey: null,
      previousVolume: 1,
      volumeMute: false,
      needsUpdate: true,
      resizeLoop: false,
      loopJourney: false,
      previewJourney: null,
      loopActivated: false,
      requestingLoop: false,
      playAfterResize: false,
      loopStartMillisecond: 0,
      loopLastPositionXPxls: 0,
      loopLastPositionXPercentage: 0,
      loopEndMillisecond: this.clip.duration,
      controls: true,
    };

    // create the timer controls main div
    setElements(this);
    this.setTheme();
    this.setSpeed();
    this.subscribeToTimer();
    this.subscribeToDurationChange();
    this.addEventListeners();
    this.scaleClipHost();
    this.eventBroadcast(STATE_CHANGE, this.state);
    if (this.options.preview) {
      this.createPreviewDisplay();
    }

    const resizeObserver = new ResizeObserver(() => {
      if (this.options.preview) {
        this.setPreviewDimentions();
      }
      if (this.options.scaleToFit) {
        this.scaleClipHost();
      }
    });
    this.changeSettings(options, true);
    resizeObserver.observe(this.options.host);

    if (this.options.autoPlay) {
      this.play();
    }
  }

  initializeOptions(options) {
    options.id ??= Date.now();
    options.preview ??= false;
    options.showVolume ??= Object.keys(options.clip?.audioClip?.children || []).length || false;
    options.showIndicator ??= false;
    options.theme ??= "transparent";
    options.host ??= options.clip.props.host;
    options.buttons ??= {};
    options.timeFormat ??= "ss";
    options.backgroundColor ??= "black";
    options.fullscreen ??= false;
    options.scaleToFit ??= true;
    options.pointerEvents ??= false;
    options.onMillisecondChange ??= null;
    options.speedValues ??= [-1, 0, 0.5, 1, 2];
    options.speed ??= 1;
    options.muted ??= false;
    options.controls ??= true;
    options.loop ??= false;
    options.volume ??= 1;
    options.currentScript ??= null;
    if (options.millisecond) {
      const clip = this.clip || options.clip;

      if(options.millisecond > clip.duration ) options.millisecond = clip.duration;
      if(options.millisecond < 0 ) options.millisecond = 0;
      if(!isFinite(options.millisecond)) options.millisecond = 0;

      this.createJourney(options.millisecond,{},this.clip || options.clip);
    }
    // remove strings
    for (const i in options.speedValues) {
      if (!isFinite(options.speedValues[i])) {
        options.speedValues.splice(i, 1);
      }
    }

    options.speedValues.sort(function (a, b) {
      return a - b;
    });
    return options;
  }

  play() {
    this.clip.play();
  }

  pause() {
    this.clip.pause();
  }

  changeSettings(newOptions, initial) {
    newOptions = this.initializeOptions({ ...this.options, ...newOptions });

    if (newOptions.clip !== this.options.clip) {
      initial = true;
      this.clip = newOptions.clip;
      this.options.clip = newOptions.clip;
    }
    if (newOptions.controls === false) {
      this.elements.mcPlayer.style.display = "none";
    } else if (newOptions.controls === true) {
      this.elements.mcPlayer.style.display = "block";
    }
    const checkObject = {
      loop: () => loopTrigger(this),
      fullscreen: () => fullscreenTrigger(this),
      muted: () => volumeTrigger(this, undefined, newOptions.mute),
      volume: () => volumeTrigger(this, newOptions.volume),
      speed: () => speedTrigger(this, newOptions.speed),
      scaleToFit: () => {
        this.options.scaleToFit = newOptions.scaleToFit;
        this.scaleClipHost();
      },
      showVolume: () => settingsTrigger(this, "showVolume"),
      preview: () => settingsTrigger(this, "showPreview"),
      theme: () => {
        this.options.theme = newOptions.theme;
        this.setTheme();
      },
      overflow: () => {
        this.clip.props.host.shadowRoot.children[0].style.overflow =
          newOptions.overflow;
      },
      outline: () => {
        this.clip.props.host.shadowRoot.children[0].style.outline =
          newOptions.outline;
      },
      visible: () => {
        if (newOptions.visible == "always") {
          this.elements.controls.classList.add("--mcp-always-show-controls");
        } else if (newOptions.visible == "normal") {
          this.elements.controls.classList.remove("--mcp-always-show-controls");
        }
      },
    };

    const checkWhenInitial = [
      "fullscreen",
      "muted",
      "volume",
      "speed",
      "scaleToFit",
      "loop",
      "overflow",
      "outline",
      "visible",
    ];
    for (const key in checkObject) {
      if (
        typeof newOptions[key] !== "undefined" &&
        (this.options[key] !== newOptions[key] ||
          (initial && this.options[key] && checkWhenInitial.includes(key)))
      ) {
        checkObject[key]();
      }
    }

    this.options = { ...this.options, ...newOptions };
  }

  scaleClipHost() {
    if (this.options.scaleToFit) {
      const { width, height } = this.clip.props.containerParams;
      const transform = calcClipScale(
        { width, height },
        {
          width: this.clip.props.host.offsetWidth,
          height:
            this.clip.props.host.offsetHeight -
            (this.options.visible == "always" ? 50 : 0),
        },
        this.options.scaleToFit === "cover"
      );

      this.clip.realClip.rootElement.style.transform = `scale(${transform.scale}`;
      this.clip.realClip.rootElement.style.left = `${transform.position.left}px`;
      this.clip.realClip.rootElement.style.top = `${transform.position.top}px`;
    } else {
      this.clip.realClip.rootElement.style.transform = "scale(1)";
      this.clip.realClip.rootElement.style.left = "0px";
      this.clip.realClip.rootElement.style.top = "0px";
    }
    this.eventBroadcast(SCALE_CHANGE, this.options.scaleToFit);
  }

  createLoop(msStart, msEnd) {
    this.settings.loopStartMillisecond = msStart;
    this.settings.loopEndMillisecond = msEnd;
    this.elements.loopBar.style.left = `${
      (msStart / this.clip.duration) * 100
    }%`;
    this.elements.loopBar.style.width = `${
      ((msEnd - msStart) / this.clip.duration) * 100
    }%`;
    this.createJourney(msStart);
    this.elements.runningBar.style.width = "0%";
    !this.settings.loopActivated && loopTrigger(this);
  }

  createJourney(millisecond, clipCommands = {},clip=undefined) {
    clip ??= this.clip;
    setTimeout(() => {
      if(!clip.id) return;
      const def = null;
      const { before = def, after = def } = clipCommands;
      if (before) clip[before]();
      this.settings.journey = timeCapsule.startJourney(clip);
      this.settings.journey.station(millisecond);
      this.settings.journey.destination();
      if (after) clip[after]();
    }, 0);
  }

  millisecondChange(
    millisecond,
    state,
    roundTo,
    makeJouney,
    executeOnMillisecondChange = true
  ) {
    if (this.state !== state) {
      this.state = state;
      this.eventBroadcast(STATE_CHANGE, state);
    }

    if (!this.settings.needsUpdate) {
      this.clip.pause();
      return 1;
    }

    const { loopActivated } = this.settings;
    if (loopActivated && this.clip.speed) {
      this.calculateJourney(millisecond);
    }

    const duration = this.clip.duration;
    const { totalBar, loopBar } = this.elements;
    const loopBarWidth = loopBar.offsetWidth;
    const loopBarLeft = loopBar.offsetLeft / totalBar.offsetWidth;
    const localMillisecond = millisecond - duration * loopBarLeft;
    const localDuration = (duration / totalBar.offsetWidth) * loopBarWidth;

    if (makeJouney) {
      this.createJourney(millisecond, {
        after: this.settings.playAfterResize ? "play" : null,
      });
    }
    this.elements.runningBar.style.width =
      (localMillisecond / localDuration) * 100 + `%`;

    this.elements.currentTime.innerHTML = this.timeFormat(millisecond);

    if (this.options.onMillisecondChange && executeOnMillisecondChange) {
      this.options.onMillisecondChange(millisecond);
    }
  }
  calculateJourney(millisecond) {
    const { loopEndMillisecond, loopStartMillisecond } = this.settings;
    const atEndOfLoop =
      millisecond > loopEndMillisecond || millisecond === this.clip.duration;
    const atStartOfLoop =
      millisecond < loopStartMillisecond || millisecond === 0;
    const positiveSpeed = this.clip.speed > 0;
    if (this.clip.runTimeInfo.state === PLAYING) {
      if (positiveSpeed) {
        if (atEndOfLoop) {
          this.createJourney(loopStartMillisecond + 1, { after: "play" });
          return true;
        }
      } else {
        if (atStartOfLoop) {
          this.createJourney(loopEndMillisecond - 1, { after: "play" });
          return true;
        }
      }
    }
    return false;
  }
  broadcastNotPlaying(state) {
    if (!this.elements.controls.classList.value.includes(showControls)) {
      this.elements.controls.classList.toggle(showControls);
    }
    changeIcon(this.elements.statusButton, "pause", "play");
    this.elements.indicator.innerHTML = `${
      state.charAt(0).toUpperCase() + state.slice(1)
    }`;
    if (state == "blocked") {
      this.addSpinner();
    } else {
      this.removeSpinner();
    }
  }

  changeInitParams(initParams) {
    this.clip.pause();
    const definition = this.clip.exportLiveDefinition();
    definition.props.host = this.clip.props.host;
    definition.props.initParams = initParams;
    this.clip.realClip.context.unmount();
    for (const key in this.clip) {
      delete this.clip[key];
    }
    this.clip = utils.clipFromDefinition(definition);
    this.options.clip = this.clip;
    this.changeSettings(this.options,true);
    this.subscribeToTimer();
    this.subscribeToDurationChange();
  }

  addSpinner() {
    changeIcon(this.elements.pointerEventPanel, null, "spinner");
    this.elements.pointerEventPanel.classList.add("loading");
  }
  removeSpinner() {
    changeIcon(this.elements.pointerEventPanel, "spinner", null);
    this.elements.pointerEventPanel.classList.remove("loading");
  }
  broadcastPlaying(state) {
    this.removeSpinner();
    if (this.elements.controls.classList.value.includes(showControls)) {
      this.elements.controls.classList.toggle(showControls);
    }
    this.elements.indicator.innerHTML = "Playing";
    changeIcon(this.elements.statusButton, "play", "pause");
    if (state !== PLAYING) {
      return;
    }

    if (
      this.clip.runTimeInfo.currentMillisecond === this.clip.duration &&
      this.clip.speed >= 0
    ) {
      this.createJourney(1, { after: "play" });
    } else if (
      (this.clip.runTimeInfo.currentMillisecond === this.clip.duration ||
        this.clip.runTimeInfo.currentMillisecond === 0) &&
      this.clip.speed < 0
    ) {
      this.createJourney(this.clip.duration - 1, {
        after: "play",
      });
    }
  }
  broadcastDurationChange() {
    this.elements.totalTime.innerHTML = this.timeFormat(this.clip.duration);
    this.settings.loopEndMillisecond = this.clip.duration;
    this.elements.pointerEventPanel.innerHTML = "";
    this.millisecondChange(this.clip.runTimeInfo.currentMillisecond);
  }
  broadcastVolumeChange(state) {
    this.options.volume = state;
    this.options.currentScript.dataset.volume = state;
  }
  broadcastSpeedChange(state) {
    this.options.speed = state;
    this.options.currentScript.dataset.speed = state;
  }
  broadcastMuteChange(state) {
    if (state) {
      this.options.muted = true;
      this.options.currentScript.dataset.muted = "";
    } else {
      this.options.muted = false;
      delete this.options.currentScript.dataset.muted;
    }
  }
  broadcastLoopChange(state) {
    if (state) {
      this.options.loop = true;
      this.options.currentScript.dataset.loop = "";
    } else {
      this.options.loop = false;
      delete this.options.currentScript.dataset.loop;
    }
  }
  broadcastScaleChange(state) {
    if (state) {
      this.options.scaleToFit = true;
      this.options.currentScript.dataset.scaleToFit = "";
    } else {
      this.options.scaleToFit = false;
      delete this.options.currentScript.dataset.scaleToFit;
    }
  }

  broadcastShowVolumeChange(state) {
    if (state) {
      this.options.showVolume = true;
      this.options.currentScript.dataset.showVolume = "";
    } else {
      this.options.showVolume = false;
      delete this.options.currentScript.dataset.showVolume;
    }
  }
  broadcastShowPreviewChange(state) {
    if (state) {
      this.options.preview = true;
      this.options.currentScript.dataset.preview = "";
    } else {
      this.options.preview = false;
      delete this.options.currentScript.dataset.preview;
    }
  }

  broadcastToScript(eventName, state) {
    if (eventName === VOLUME_CHANGE) {
      this.broadcastVolumeChange(state);
    } else if (eventName === SPEED_CHANGE) {
      this.broadcastSpeedChange(state);
    } else if (eventName === MUTE_CHANGE) {
      this.broadcastMuteChange(state);
    } else if (eventName === LOOP_CHANGE) {
      this.broadcastLoopChange(state);
    } else if (eventName === SCALE_CHANGE) {
      this.broadcastScaleChange(state);
    } else if (eventName === SHOW_VOLUME_CHANGE) {
      this.broadcastShowVolumeChange(state);
    } else if (eventName === SHOW_PREVIEW_CHANGE) {
      this.broadcastShowPreviewChange(state);
    }
  }
  eventBroadcast(eventName, state) {
    if (eventName === STATE_CHANGE) {
      if (this.options.currentScript) {
        this.options.currentScript.dataset.status = state;
      }
      if (
        ["paused", "idle", "transitional", "armed", "blocked"].includes(state)
      ) {
        this.broadcastNotPlaying(state);
      } else {
        this.broadcastPlaying(state);
      }
    } else if (eventName === DURATION_CHANGE) {
      this.broadcastDurationChange();
    } else if (this.options.currentScript) {
      this.broadcastToScript(eventName, state);
    }
  }

  subscribeToDurationChange() {
    this.clip.subscribeToDurationChange(
      this.subscribeToDurationChangeCallback.bind(this)
    );
  }
  subscribeToDurationChangeCallback() {
    this.eventBroadcast(DURATION_CHANGE);
  }

  subscribeToTimer() {
    this.clip.subscribe(this.id, this.millisecondChange.bind(this));
  }

  handleDragStart() {
    this.settings.needsUpdate = true;
    this.settings.journey = timeCapsule.startJourney(this.clip);
  }

  timeFormat(ms) {
    if (this.options.timeFormat === "ss") {
      const hours = ms / 1000 / 60 / 60;
      const minutes = (hours % 1) * 60;
      const seconds = (minutes % 1) * 60;

      // By default, JavaScript converts any floating-point number 
      // with six or more leading zeros into e-notation
      // to avoid this problem we round to 5 float digits
      const h = ("0" + parseInt(hours.toFixed(50))).slice(-2);
      const m = ("0" + parseInt(minutes.toFixed(50))).slice(-2);
      const s = ("0" + parseInt(seconds.toFixed(50))).slice(-2);

      return `${h === "00" ? "" : h + ":"}${m}:${s}`;

    } else {
      return ms;
    }
  }

  handleDrag(loopBarPositionX, executeOnMillisecondChange = true) {
    if (!isFinite(loopBarPositionX)) {
      loopBarPositionX = 0;
    }
    const { duration } = this.clip;
    const { journey } = this.settings;
    const { loopBar, totalBar, runningBar, currentTime } = this.elements;

    const totalBarPositionX = loopBarPositionX + loopBar.offsetLeft;

    const millisecond = Math.round(
      (duration * totalBarPositionX) / totalBar.offsetWidth
    );

    currentTime.innerHTML = this.timeFormat(millisecond);

    runningBar.style.width =
      (loopBarPositionX / loopBar.offsetWidth) * 100 + `%`;

    journey.station(millisecond);

    if (this.options.onMillisecondChange && executeOnMillisecondChange) {
      this.options.onMillisecondChange(millisecond);
    }
  }

  handleDragEnd() {
    this.settings.journey.destination();
  }

  createProgressDrag(loopBarPositionX) {
    this.handleDragStart();
    this.handleDrag(loopBarPositionX);
    this.handleDragEnd();
  }
  addEventListeners() {
    loopBarEndListener(this);
    progressBarListener(this);
    loopBarStartListener(this);
    volumeAdd(this);
    statusBtnListener(this);
    settingsAdd(this);
    speedAdd(this);
    loopAdd(this);
    fullscreenAdd(this);
    donkeyclipListener(this);
    previewListener(this);
    bodyListener(this);
  }

  launchIntoFullscreen(element) {
    if (this.options.preview) {
      this.setPreviewDimentions();
    }

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  setTheme() {
    this.options.theme.replace(/\s\s+/g, ` `);
    this.options.theme.trim();

    if (this.options.theme === "default")
      this.elements.mcPlayer.classList.add("theme-default");
    else if (this.options.theme ==="transparent")
      this.elements.mcPlayer.classList.add("theme-transparent");
    else if (this.options.theme === "whiteGold")
      this.elements.mcPlayer.classList.add("theme-whiteGold");
    else if (this.options.theme === "darkGold")
      this.elements.mcPlayer.classList.add("theme-darkGold");
    else if (this.options.theme === "green")
      this.elements.mcPlayer.classList.add("theme-green");
    else if (this.options.theme === "blue")
      this.elements.mcPlayer.classList.add("theme-blue");
    else if (this.options.theme === "dark")
      this.elements.mcPlayer.classList.add("theme-dark");
    else if (this.options.theme === "yellow")
      this.elements.mcPlayer.classList.add("theme-yellow");
    else if(this.options.themeCSS && !elid("--mc-player-style-custom")){
        this.options.themeCSS = sanitizeCSS(this.options.themeCSS);
        const customStyle = elcreate("style");
        customStyle.id = "--mc-player-style-custom";
        customStyle.styleSheet
            ? (customStyle.styleSheet.cssText = this.options.themeCSS)
            : customStyle.appendChild(document.createTextNode(this.options.themeCSS));
            eltag("head")[0].appendChild(customStyle);
          this.elements.mcPlayer.classList.add(this.options.theme);
    };
    
    
    if (!elid("--mc-player-style")) {
      const style = elcreate("style");
      style.id = "--mc-player-style";
      style.styleSheet
        ? (style.styleSheet.cssText = css)
        : style.appendChild(document.createTextNode(css));

      // append player style to document
      eltag("head")[0].appendChild(style);
    }

    this.eventBroadcast("theme-change", this.options.theme);
  }

  setSpeed() {
    const currentSpeed = this.clip.speed == 1 ? "Normal" : this.clip.speed;
    this.elements.speedCurrent.innerHTML = currentSpeed;
  }

  calculateSpeed(step, arrayOfValues, currentPercentage) {
    const botLimitIndex = Math.floor(currentPercentage / step);

    if (botLimitIndex === arrayOfValues.length - 1) {
      return arrayOfValues[botLimitIndex].toFixed(1);
    }

    const limitZonePercentage = (currentPercentage / step) % 1;

    const limitZoneLength = Math.abs(
      arrayOfValues[botLimitIndex] - arrayOfValues[botLimitIndex + 1]
    );

    const realZoneSpeed = limitZonePercentage * limitZoneLength;

    const realSpeed = (realZoneSpeed + arrayOfValues[botLimitIndex]).toFixed(1);

    if (realSpeed == 0) {
      return "0.0";
    }
    return realSpeed;
  }

  createPreviewDisplay() {
    this.previewClip = this.clip.paste(this.elements.previewHost, {
      isPreviewClip: true,
    });
    this.elements.previewHost.style.position = "absolute";
    this.elements.previewHost.style.background = this.options.backgroundColor;
    this.elements.previewHost.style.zIndex = 1;
    this.setPreviewDimentions();
  }

  setPreviewDimentions() {
    const clip = this.clip.props.host;
    const previewClip = this.previewClip.ownClip.props.host;
    const clipWidth = clip.offsetWidth;
    const clipHeight = clip.offsetHeight;

    let previewWidth = clipWidth * this.previewScale;

    // max width is 300
    if (previewWidth > 300) {
      previewWidth = 300;
      this.previewScale = previewWidth / clipWidth;
    }
    const width = clipWidth * this.previewScale;
    const height = clipHeight * this.previewScale;
    const transform = calcClipScale(
      {
        width: this.clip.props.containerParams.width,
        height:
          parseFloat(this.clip.props.containerParams.height) -
          (this.options.visible == "always" ? 50 : 0) + "px",
      },
      {
        width: width,
        height: height,
      },
      this.options.scaleToFit === "cover"
    );

    this.previewClip.ownClip.rootElement.style.transform = `scale(${transform.scale}`;
    this.previewClip.ownClip.rootElement.style.left = `${transform.position.left}px`;
    this.previewClip.ownClip.rootElement.style.top = `${transform.position.top}px`;

    this.elements.preview.style.width = `${width}px`;
    this.elements.preview.style.height = `${height}px`;

    previewClip.style.boxSizing = "border-box";
  }
}

export default Player;
