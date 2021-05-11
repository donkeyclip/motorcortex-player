import { TimeCapsule } from "@kissmybutton/motorcortex";
import { name, updateName } from "./config";
import { calcClipScale, elcreate, elFirstClass, elid, eltag } from "./helpers";
import setElements from "./html/setElements";
// import { loadingSVG, pauseSVG, playSVG } from "./html/svg";
const loadingSVG = "Loading";
const pauseSVG = "Pause";
const playSVG = "Play";
import bodyListener from "./listeners/body";
import controlsListener from "./listeners/controls";
import donkeyclipListener from "./listeners/donkeyclip";
import { PLAYING,TRANSITIONAL,ARMED, showControls } from "./listeners/enums";
import css from  "./html/newStyle.css";
import icomooncss from  "./assets/icomoon/style.css";

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
import loopStartEndListener from "./listeners/loopStartEnd";
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
    // set defaults
    options.id ||= Date.now();
    options.preview ||= false;
    options.showVolume ||= false;
    options.showIndicator ||= false;
    options.theme ||= "transparent position-ontop";
    options.host ||= options.clip.props.host;
    options.buttons ||= {};
    options.timeFormat ||= "ss";
    options.backgroundColor ||= "black";
    options.fullscreen ||= false;
    options.scaleToFit ??= true;
    options.pointerEvents = !!(options.pointerEvents ?? false);
    options.onMillisecondChange ||= null;
    options.speedValues ||= [-2, -1, -0.5, 0, 0.5, 1, 2];

    options.muted ||= false;
    options.controls = !!options.controls;
    options.loop ||= false;
    options.volume = typeof options.volume !== "undefined" ? options.volume : 1;
    options.currentScript ||= null;
    // remove strings
    for (const i in options.speedValues) {
      if (!isFinite(options.speedValues[i])) {
        options.speedValues.splice(i, 1);
      }
    }

    options.speedValues.sort(function (a, b) {
      return a - b;
    });

    this.className = name;

    updateName(options.id);
    this.options = options;
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
    this.resizeTimeout = setTimeout(() => {}, 20);
    window.addEventListener(`resize`, () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        if (this.options.preview) {
          this.setPreviewDimentions();
        }
        if (this.options.scaleToFit) {
          this.scaleClipHost();
        }
      }, 20);
    });
    this.changeSettings(options, true);
  }

  changeSettings(newOptions, initial) {
    //set defaults
    newOptions.theme ||= "transparent on-top";
    newOptions.speed ||= 1;
    newOptions.volume ||= 1;
    newOptions.clip ||= this.clip;

    if (newOptions.clip !== this.options.clip) {
      initial = true;
      this.clip = newOptions.clip;
      this.options.clip = newOptions.clip;
    }
    if (newOptions.controls === false) {
      this.elements.mcPlayer.style.display = "none";
    } else if (newOptions.controls === true) {
      this.elements.mcPlayer.style.display = "unset";
    }

    if (
      typeof newOptions.loop !== "undefined" &&
      (this.options.loop !== newOptions.loop || (initial && this.options.loop))
    ) {
      loopTrigger(this);
    }

    if (
      typeof newOptions.fullscreen !== "undefined" &&
      (this.options.fullscreen !== newOptions.fullscreen ||
        (initial && this.options.fullscreen))
    ) {
      fullscreenTrigger(this);
    }

    if (
      typeof newOptions.muted !== "undefined" &&
      (this.options.muted !== newOptions.muted ||
        (initial && this.options.muted))
    ) {
      volumeTrigger(this, undefined, newOptions.mute);
    }
    if (
      typeof newOptions.volume !== "undefined" &&
      (this.options.volume !== newOptions.volume ||
        (initial && this.options.volume))
    ) {
      volumeTrigger(this, newOptions.volume, undefined);
    }

    if (
      typeof newOptions.speed !== "undefined" &&
      (this.options.speed !== newOptions.speed ||
        (initial && this.options.speed))
    ) {
      speedTrigger(this, newOptions.speed);
    }

    if (
      typeof newOptions.scaleToFit !== "undefined" &&
      (this.options.scaleToFit !== newOptions.scaleToFit ||
        (initial && this.options.scaleToFit))
    ) {
      //this is to prevent infinite loop
      this.options.scaleToFit = newOptions.scaleToFit;
      this.scaleClipHost();
    }

    if (
      typeof newOptions.showVolume !== "undefined" &&
      this.options.showVolume !== newOptions.showVolume
    ) {
      settingsTrigger(this, "showVolume");
    }

    if (
      typeof newOptions.preview !== "undefined" &&
      this.options.preview !== newOptions.preview
    ) {
      settingsTrigger(this, "showPreview");
    }
    if (
      typeof newOptions.theme !== "undefined" &&
      this.options.theme !== newOptions.theme
    ) {
      this.options.theme = newOptions.theme;
      this.setTheme();
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
          height: this.clip.props.host.offsetHeight,
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

  createJourney(millisecond, clipCommands = {}) {
    const clip = this.clip;
    setTimeout(() => {
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

    const {
      loopActivated,
    } = this.settings;
    if (loopActivated && this.clip.speed){
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
  calculateJourney(millisecond){
    const {
      loopEndMillisecond,
      loopStartMillisecond,
    } = this.settings;
    const atEndOfLoop = millisecond > loopEndMillisecond || millisecond === this.clip.duration;
    const atStartOfLoop = millisecond < loopStartMillisecond || millisecond === 0;
    const positiveSpeed = this.clip.speed > 0;
    if (this.clip.runTimeInfo.state === PLAYING){
      if (positiveSpeed){
        if (atEndOfLoop){
          this.createJourney(loopStartMillisecond + 1,{after:"play"});
          return true;
        }
      } else {
         if(atStartOfLoop) {
          this.createJourney(loopEndMillisecond - 1,{after:"play"});
          return true;
        }
      }
      
    }
    return false;
  }
  eventBroadcast(eventName, state) {
    const {mcPlayer} = this.elements;
    const controlsEl = elFirstClass(mcPlayer,`--mcp-controls`);
    if (eventName === STATE_CHANGE) {
      if (this.options.currentScript) {
        this.options.currentScript.dataset.status = state;
      }
      if (
        state === "paused" ||
        state === "idle" ||
        state === "transitional" ||
        state === "armed" ||
        state === "blocked"
      ) {
        if (!controlsEl.classList.value.includes(showControls)) {
          controlsEl.classList.toggle(showControls);
        }
        this.elements.statusButton.innerHTML = playSVG;
        this.elements.statusButton.appendChild(this.elements.indicator);
        this.elements.indicator.innerHTML = `${
          state.charAt(0).toUpperCase() + state.slice(1)
        }`;
        if (state == "blocked") {
          this.elements.pointerEventPanel.innerHTML = `
            <div style="width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;">${loadingSVG}</div>`;
        } else {
          this.elements.pointerEventPanel.innerHTML = "";
        }
      } else {
        if (controlsEl.classList.value.includes(showControls)) {
          controlsEl.classList.toggle(showControls);
        }
        this.elements.statusButton.innerHTML = pauseSVG;
        this.elements.statusButton.appendChild(this.elements.indicator);
        this.elements.indicator.innerHTML = "Playing";
        this.elements.pointerEventPanel.innerHTML = "";
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
    } else if (eventName === DURATION_CHANGE) {
      this.elements.totalTime.innerHTML = this.timeFormat(this.clip.duration);
      this.settings.loopEndMillisecond = this.clip.duration;
      this.elements.pointerEventPanel.innerHTML = "";
      this.millisecondChange(this.clip.runTimeInfo.currentMillisecond);
    } else if (this.options.currentScript) {
      if (eventName === VOLUME_CHANGE) {
        this.options.volume = state;
        this.options.currentScript.dataset.volume = state;
      } else if (eventName === SPEED_CHANGE) {
        this.options.speed = state;
        this.options.currentScript.dataset.speed = state;
      } else if (eventName === MUTE_CHANGE) {
        if (state) {
          this.options.muted = true;
          this.options.currentScript.dataset.muted = "";
        } else {
          this.options.muted = false;
          delete this.options.currentScript.dataset.muted;
        }
      } else if (eventName === LOOP_CHANGE) {
        if (state) {
          this.options.loop = true;
          this.options.currentScript.dataset.loop = "";
        } else {
          this.options.loop = false;
          delete this.options.currentScript.dataset.loop;
        }
      } else if (eventName === SCALE_CHANGE) {
        if (state) {
          this.options.scaleToFit = true;
          this.options.currentScript.dataset.scaleToFit = "";
        } else {
          this.options.scaleToFit = false;
          delete this.options.currentScript.dataset.scaleToFit;
        }
      } else if (eventName === SHOW_VOLUME_CHANGE) {
        if (state) {
          this.options.showVolume = true;
          this.options.currentScript.dataset.showVolume = "";
        } else {
          this.options.showVolume = false;
          delete this.options.currentScript.dataset.showVolume;
        }
      } else if (eventName === SHOW_PREVIEW_CHANGE) {
        if (state) {
          this.options.preview = true;
          this.options.currentScript.dataset.preview = "";
        } else {
          this.options.preview = false;
          delete this.options.currentScript.dataset.preview;
        }
      }
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

      const h = ("0" + parseInt(hours)).slice(-2);
      const m = ("0" + parseInt(minutes)).slice(-2);
      const s = ("0" + parseInt(seconds)).slice(-2);

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
    loopStartEndListener(this);
    volumeAdd(this);
    statusBtnListener(this);
    settingsAdd(this);
    speedAdd(this);
    loopAdd(this);
    controlsListener(this);
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
    // remove previous style if exists
    // elid(this.name + "-style") &&
    // eltag(`head`)[0].removeChild(elid(this.name + "-style"));
    // replace multiple spaces with one space
    this.options.theme.replace(/\s\s+/g, ` `);
    this.options.theme.trim();
    const POSITION_ON_TOP = "position-ontop";
    const POSITION_BOTTOM ="position-bottom";

    if (
      !this.options.theme.includes(POSITION_ON_TOP) &&
      !this.options.theme.includes(POSITION_BOTTOM)
    ) {
      this.options.theme += ` ${POSITION_ON_TOP}`;
    }
    if (this.options.theme.includes(POSITION_ON_TOP))
      this.elements.mcPlayer.classList.add(POSITION_ON_TOP);
    else 
      this.elements.mcPlayer.classList.add(POSITION_BOTTOM);

    if (this.options.theme.includes("default"))
      this.elements.mcPlayer.classList.add("theme-default");
    else if (this.options.theme.includes("transparent"))
      this.elements.mcPlayer.classList.add("theme-transparent");
    else if (this.options.theme.includes("dark"))
      this.elements.mcPlayer.classList.add("theme-dark");
    else if (this.options.theme.includes("whiteGold"))
      this.elements.mcPlayer.classList.add("theme-whiteGold");
    else if (this.options.theme.includes("darkGold"))
      this.elements.mcPlayer.classList.add("theme-darkGold");
    else if (this.options.theme.includes("mc-green"))
      this.elements.mcPlayer.classList.add("theme-mc-green");
    else if (this.options.theme.includes("mc-blue"))
      this.elements.mcPlayer.classList.add("theme-mc-blue");


    if (!elid("--mc-player-style")){
      const style = elcreate("style");
      style.id = "--mc-player-style";
      style.styleSheet
        ? (style.styleSheet.cssText = css)
        : style.appendChild(document.createTextNode(css));
  
      // append player style to document
      eltag("head")[0].appendChild(style);

      const styleIcomoon = elcreate("style");
      styleIcomoon.id = "--mc-player-style";
      styleIcomoon.styleSheet
        ? (styleIcomoon.styleSheet.cssText = icomooncss)
        : styleIcomoon.appendChild(document.createTextNode(icomooncss));
  
      // append player style to document
      eltag("head")[0].appendChild(styleIcomoon);
    }
    
    this.eventBroadcast("theme-change", this.options.theme);
  }

  setSpeed() {
    const currentSpeed = this.clip.speed == 1 ? "Normal" : this.clip.speed;
    this.elements.speedCurrent.innerHTML = currentSpeed;

    // const targetZone = (() => {
    //   for (let i = 0; i < this.options.speedValues.length - 1; i++) {
    //     if (
    //       this.options.speedValues[i] <= this.clip.speed &&
    //       this.options.speedValues[i + 1] > this.clip.speed
    //     ) {
    //       return (
    //         i +
    //         Math.abs(
    //           (this.clip.speed - this.options.speedValues[i]) /
    //             (this.options.speedValues[i] - this.options.speedValues[i + 1])
    //         )
    //       );
    //     }
    //   }
    // })();

    // const step = 1 / (this.options.speedValues.length - 1);

    // const positionY =
    //   (targetZone * step - 1) * (this.options.speedValues.length - 1) * -16;

    // elFirstClass(this.elements.mcPlayer,`--mcp-speed-cursor`).style.top = `${positionY}px`;
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
    const previewHost= elFirstClass(this.elements.mcPlayer,`--mcp-preview-host`);
    this.previewClip = this.clip.paste(previewHost);

    previewHost.style.position = "absolute";
    previewHost.style.background = this.options.backgroundColor;
    previewHost.style.zIndex = 1;
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
        height: this.clip.props.containerParams.height,
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

    const previewElement= elFirstClass(this.elements.mcPlayer,`--mcp-preview`);
    previewElement.style.width = `${width}px`;
    previewElement.style.height = `${height}px`;

    previewClip.style.boxSizing = "border-box";
  }
}

export default Player;
