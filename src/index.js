import { utils } from "@donkeyclip/motorcortex";
import { name } from "./config";
import {
  calcClipScale,
  changeIcon,
  sanitizeCSS,
  initializeOptions,
  timeCapsule,
  sortFunc,
} from "./helpers";
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
  SHOW_VOLUME_CHANGE,
  SPEED_CHANGE,
  STATE_CHANGE,
  VOLUME_CHANGE,
} from "./listeners/events";
import { add as pointerEventsAdd, addPlayIcon } from "./listeners/pointeEvents";
import {
  add as fullscreenAdd,
  exitFullscreen,
  launchIntoFullscreen,
  trigger as fullscreenTrigger,
} from "./listeners/fullscreen";

import { add as keydownAdd } from "./listeners/keydown";
import loopBarEndListener from "./listeners/loopBarEnd";
import loopBarStartListener from "./listeners/loopBarStart";
import { add as loopAdd, trigger as loopTrigger } from "./listeners/loopBtn";
import progressBarListener from "./listeners/progressBar";
import {
  add as settingsAdd,
  trigger as settingsTrigger,
} from "./listeners/settings";
import { add as speedAdd, trigger as speedTrigger } from "./listeners/speed";
import statusBtnListener from "./listeners/statusBtn";
import { add as volumeAdd, trigger as volumeTrigger } from "./listeners/volume";
import wheelListener from "./listeners/wheelListener";

const themeKeyToClass = {
  default: "theme-default",
  transparent: "theme-transparent",
  whiteGold: "theme-whiteGold",
  darkGold: "theme-darkGold",
  green: "theme-green",
  blue: "theme-blue",
  dark: "theme-dark",
  yellow: "theme-yellow",
  donkeyclip: "theme-donkeyclip",
  donkeyclipDark: "theme-donkeyclipDark",
};

function addSpinner(pointerEventPanel) {
  changeIcon(pointerEventPanel, null, "spinner");
  pointerEventPanel.classList.add("loading");
}

function removeSpinner(pointerEventPanel) {
  changeIcon(pointerEventPanel, "spinner", null);
  pointerEventPanel.classList.remove("loading");
}

const timeCache = [];

/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident
 * (such as a Scene or a Clip) can both privide info regarding their timing
 * state but also provide an interface for interacting/altering the timing of it
 */
export default class Player {
  constructor(options) {
    this.elements = {};
    this.clip = options.clip; // host to apply the timer
    this.options = initializeOptions(options, this);
    this.document = this.options.host.ownerDocument;
    this.className = name;
    this.id = this.options.id;
    this.name = name;
    this.clipClass = options.clipClass;
    this.state = this.clip.runTimeInfo.state;
    this.listeners = {};
    this.settings = {
      volume: 1,
      journey: null,
      previousVolume: 1,
      volumeMute: false,
      needsUpdate: true,
      resizeLoop: false,
      loopJourney: false,
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

    if (this.options.type === "scroller") {
      this.timeBucket = 0;
      this.timeProgress = 0;
      this.options.sections?.sort(sortFunc);
    }
    const resizeObserver = new ResizeObserver(() => {
      if (window.innerWidth < 450) {
        this.elements.timeDisplay.style.display = "none";
      } else {
        this.elements.timeDisplay.style.display = "block";
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
    window.clip = this.clip;
  }

  play() {
    this.clip.play();
  }

  pause() {
    this.clip.pause();
  }
  enterFullScreen() {
    launchIntoFullscreen(this.clip.props.host);
  }
  exitFullScreen() {
    exitFullscreen();
  }
  changeSettings(newOptions, initial) {
    newOptions = initializeOptions(
      Object.assign({}, this.options, newOptions),
      this
    );
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
      type: () => {
        if (newOptions.type === "scroller") wheelListener(this);
      },
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
          (initial &&
            this.options[key] !== false &&
            checkWhenInitial.includes(key)))
      ) {
        checkObject[key]();
      }
    }
    this.options = Object.assign({}, this.options, newOptions);
  }

  scaleClipHost() {
    if (this.options.scaleToFit) {
      const props = this.clip.props;
      const transform = calcClipScale(
        props.containerParams,
        {
          width: props.host.offsetWidth,
          height:
            props.host.offsetHeight -
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

  goToMillisecond(ms, { before, after } = {}) {
    if (ms > this.clip.duration) ms = this.clip.duration;
    else if (ms < 0) ms = 0;

    setTimeout(() => {
      const clip = this.clip;
      if (!clip.id) return;
      if (before) clip[before]();
      this.settings.journey = timeCapsule.startJourney(clip);
      this.settings.journey.station(ms);
      this.settings.journey.destination();
      if (after) clip[after]();
    }, 0);
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
    this.goToMillisecond(msStart);
    this.elements.runningBar.style.width = "0%";
    !this.settings.loopActivated && loopTrigger(this);
  }

  calculateMinMaxOfTimeProgress() {
    if (this.timeProgress >= this.clip.duration)
      this.timeProgress = this.clip.duration;
    if (this.timeProgress <= 0) this.timeProgress = 0;
  }
  requestAnimation() {
    this.requestAnimationID = window.requestAnimationFrame(
      this.animateTimeBucket.bind(this)
    );
  }
  cancelAnimation() {
    window.cancelAnimationFrame(this.requestAnimationID);
    this.requestAnimationID = null;
  }

  removeTimeFromBucket() {
    const log = Math.log(this.timeBucket);
    const timeRemove = Math.pow(log, 2);
    this.timeBucket -= this.options.scrollAnimation ? log : timeRemove;
    return timeRemove;
  }
  addTimeToProgress(timeRemove) {
    this.timeProgress += timeRemove * this.multiplier * this.clip.speed;
  }
  checkIfBucketHasTime() {
    if (this.timeBucket <= 0) {
      this.requestAnimationID = null;
      return false;
    }
    return true;
  }
  calculateJourneyPosition(progress) {
    const easedProgress = utils.easings[this.options.sectionsEasing](progress);
    return (
      this.startPosition +
      easedProgress *
        this.options.speed *
        this.multiplier *
        this.endAnimationTime
    );
  }
  animateTimeBucket() {
    if (!this.checkIfBucketHasTime) return;
    this.addTimeToProgress(this.removeTimeFromBucket());
    this.calculateMinMaxOfTimeProgress();
    if (!this.options.sections) {
      this.goToMillisecond(this.timeProgress);
    } else {
      const progress =
        (Date.now() - this.startAnimationTime) / this.endAnimationTime;
      if (progress >= 1 || this.endAnimationTime === 0)
        return this.cancelAnimation();
      const sectionPosition = this.calculateJourneyPosition(progress);
      this.goToMillisecond(Math.ceil(sectionPosition));
    }
    this.requestAnimation();
  }

  setUpTimeBucket(deltaY) {
    const newMultiplier = deltaY > 0 ? 1 : -1;
    deltaY = Math.ceil(Math.abs(deltaY)) * newMultiplier;
    this.timeBucket += Math.abs(deltaY);
    /* clear timebucket if check of direction */
    if (newMultiplier != this.multiplier) this.timeBucket = Math.abs(deltaY);
    /* check if bucket exceeds the maximum value */
    if (this.timeBucket > this.options.maxScrollStorage)
      this.timeBucket = this.options.maxScrollStorage;

    this.multiplier = newMultiplier;
  }

  getSectionTime(direction) {
    let sectionIndex;
    const sortedSections = this.options.sections;
    if (direction > 0) {
      const newPosition = this.startPosition + this.timeBucket;
      for (let i = 0; i < sortedSections.length; i++) {
        if (newPosition < sortedSections[i]) {
          sectionIndex = i;
          break;
        }
      }
      sectionIndex ??= sortedSections.length - 1;
    } else {
      const newPosition = this.startPosition - this.timeBucket;
      for (let i = sortedSections.length - 1; i >= 0; i--) {
        if (newPosition > sortedSections[i]) {
          sectionIndex = i;
          break;
        }
      }
      sectionIndex ??= 0;
    }
    return sectionIndex;
  }

  initializeSections() {
    this.startAnimationTime = Date.now();
    this.startPosition = this.clip.runTimeInfo.currentMillisecond;
    this.currentSectionIndex = this.getSectionTime(this.multiplier);
    this.endAnimationTime = Math.abs(
      this.startPosition - this.options.sections[this.currentSectionIndex]
    );
  }

  stepper(deltaY) {
    this.setUpTimeBucket(deltaY);
    if (this.options.sections) this.initializeSections();
    if (!this.requestAnimationID) this.animateTimeBucket();
  }
  /* scroller end*/
  millisecondChange(
    millisecond,
    state,
    _,
    makeJouney,
    executeOnMillisecondChange = true
  ) {
    const { totalBar, loopBar } = this.elements;

    if (this.state !== state) {
      this.state = state;
      this.eventBroadcast(STATE_CHANGE, state);
    }

    if (!this.settings.needsUpdate) {
      this.clip.pause();
      return 1;
    }

    if (this.settings.loopActivated && this.clip.speed) {
      this.calculateJourney(millisecond);
    }

    const duration = this.clip.duration;

    const localMillisecond =
      millisecond - (duration * loopBar.offsetLeft) / totalBar.offsetWidth;
    const localDuration =
      (duration / totalBar.offsetWidth) * loopBar.offsetWidth;

    if (makeJouney) {
      this.goToMillisecond(millisecond, {
        after: this.settings.playAfterResize ? "play" : null,
      });
    }
    this.elements.runningBar.style.width =
      (localMillisecond / localDuration) * 100 + `%`;

    const newTime = this.timeFormat(millisecond);
    if (this.elements.currentTime.innerHTML !== newTime)
      this.elements.currentTime.innerHTML = newTime;

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
          this.goToMillisecond(loopStartMillisecond + 1, {
            after: "play",
          });
          return true;
        }
        return false;
      }

      if (atStartOfLoop) {
        this.goToMillisecond(loopEndMillisecond - 1, {
          after: "play",
        });
        return true;
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
      addSpinner(this.elements.pointerEventPanel);
    } else if (state !== "idle") {
      removeSpinner(this.elements.pointerEventPanel);
    }
  }

  changeInitParams(initParams) {
    const response = { result: true };
    this.clip.pause();
    const definition = this.clip?.exportLiveDefinition();
    definition.props.host = this.clip.props.host;
    let oldMillisecond = this.clip.runTimeInfo.currentMillisecond;
    const wasPlaying = this.clip.runTimeInfo.state === PLAYING;
    const oldParams = JSON.parse(
      JSON.stringify(definition.props.initParams || {})
    );
    definition.props.initParams = initParams;
    // unmount the previous clip
    this.clip.realClip.context.unmount();
    for (const key in this.clip) {
      delete this.clip[key];
    }
    let newClip;
    try {
      newClip = utils.clipFromDefinition(definition);
      if (newClip.nonBlockingErrorClip || newClip?.errors?.length)
        throw "Error: Params Error: Clip cannot be created!";
    } catch (e) {
      response.result = false;
      response.clip = newClip;
      console.error(e);
      definition.props.initParams = oldParams;
      newClip = utils.clipFromDefinition(definition);
    }
    //assign the new clip
    this.clip = newClip;
    this.options.clip = this.clip;
    this.elements.totalTime.innerHTML = this.timeFormat(this.clip.duration);
    this.changeSettings(this.options, true);
    this.subscribeToTimer();
    this.subscribeToDurationChange();
    if (oldMillisecond > this.clip.duration)
      oldMillisecond = this.clip.duration;
    this.goToMillisecond(oldMillisecond);
    if (wasPlaying) this.clip.play();
    return response;
  }

  broadcastPlaying(state) {
    removeSpinner(this.elements.pointerEventPanel);
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
      this.goToMillisecond(1, { after: "play" });
    } else if (
      (this.clip.runTimeInfo.currentMillisecond === this.clip.duration ||
        this.clip.runTimeInfo.currentMillisecond === 0) &&
      this.clip.speed < 0
    ) {
      this.goToMillisecond(this.clip.duration - 1, {
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
      return;
    }
    this.options.muted = false;
    delete this.options.currentScript.dataset.muted;
  }
  broadcastLoopChange(state) {
    if (state) {
      this.options.loop = true;
      this.options.currentScript.dataset.loop = "";
      return;
    }
    this.options.loop = false;
    delete this.options.currentScript.dataset.loop;
  }
  broadcastScaleChange(state) {
    if (state) {
      this.options.scaleToFit = state;
      this.options.currentScript.dataset.scaleToFit = state;
      return;
    }
    this.options.scaleToFit = false;
    delete this.options.currentScript.dataset.scaleToFit;
  }

  broadcastShowVolumeChange(state) {
    if (state) {
      this.options.showVolume = true;
      this.options.currentScript.dataset.showVolume = "";
      return;
    }
    this.options.showVolume = false;
    delete this.options.currentScript.dataset.showVolume;
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
    }
  }
  calculateThumbnail(state) {
    const hasThumbnail = this.options.thumbnail || this.options.thumbnailColor;
    const isZeroMs =
      this.clip.runTimeInfo.currentMillisecond === 0 && this.clip.speed > 0;
    const hasAutoplay = this.options.autoPlay;
    if (state === "idle") {
      if (hasAutoplay) {
        this.elements.playPausePanel.classList.add("hide");
        return;
      }
      if (isZeroMs) {
        if (!hasThumbnail) {
          this.elements.playPausePanel.classList.add("hide");
          return;
        }

        addPlayIcon(this.elements.playPausePanelContainer);
        this.elements.playPausePanel.style.backgroundColor =
          this.options.thumbnailColor || "black";
        this.elements.playPausePanel.style.backgroundImage =
          this.options.thumbnail && `url(${this.options.thumbnail})`;
        this.elements.playPausePanel.classList.add("initial");
        this.elements.pointerEventPanel.classList.add("initial");
        return;
      }
    }
    this.elements.playPausePanel.style.backgroundColor = "transparent";
    this.elements.playPausePanel.style.backgroundImage = "none";
    this.elements.pointerEventPanel.classList.remove("initial");
    this.elements.playPausePanel.classList.remove("initial");
  }
  eventBroadcast(eventName, state) {
    if (eventName === STATE_CHANGE) {
      if (this.options.currentScript) {
        this.options.currentScript.dataset.status = state;
      }
      this.calculateThumbnail(state);
      const playingStates = [
        "paused",
        "idle",
        "transitional",
        "armed",
        "blocked",
      ];
      if (playingStates.includes(state)) {
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
    if (this.options.timeFormat !== "ss") {
      return ms;
    }

    const diff = ms - timeCache[0];
    // If the diff from previous calculated value is less than a second, return the cached result
    if (0 < diff && diff < 1000) {
      return timeCache[1];
    }

    const hours = ms / 1000 / 60 / 60;
    const minutes = (hours % 1) * 60;
    const seconds = (minutes % 1) * 60;

    // By default, JavaScript converts any floating-point number
    // with six or more leading zeros into e-notation
    // to avoid this problem we round to 5 float digits
    const h = ("0" + parseInt(hours.toFixed(5))).slice(-2);
    const m = ("0" + parseInt(minutes.toFixed(5))).slice(-2);
    const s = ("0" + parseInt(seconds.toFixed(5))).slice(-2);

    const date = `${h === "00" ? "" : h + ":"}${m}:${s}`;

    if (timeCache[0] == null || ms - timeCache[0] < 2000) {
      // Make sure to round our cache number to the beginning of the second
      // So we don't get any stale cache results, as we would if we cached 1009 for example
      timeCache[0] = Math.floor(ms / 1000) * 1000;
      timeCache[1] = date;
    }

    return date;
  }

  handleDrag(loopBarPositionX, executeOnMillisecondChange = true) {
    if (!isFinite(loopBarPositionX)) {
      loopBarPositionX = 0;
    }
    const { loopBar, totalBar, runningBar, currentTime } = this.elements;

    const totalBarPositionX = loopBarPositionX + loopBar.offsetLeft;

    const millisecond = Math.round(
      (this.clip.duration * totalBarPositionX) / totalBar.offsetWidth
    );

    currentTime.innerHTML = this.timeFormat(millisecond);

    runningBar.style.width =
      (loopBarPositionX / loopBar.offsetWidth) * 100 + `%`;

    this.settings.journey.station(millisecond);

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
    keydownAdd(this);
    volumeAdd(this);
    statusBtnListener(this);
    settingsAdd(this);
    speedAdd(this);
    loopAdd(this);
    fullscreenAdd(this);
    pointerEventsAdd(this);
    donkeyclipListener(this);
    bodyListener(this);
    if (this.options.type === "scroller") wheelListener(this);
  }

  setTheme() {
    this.options.theme.replace(/\s\s+/g, ` `);
    this.options.theme.trim();

    const themeClass = themeKeyToClass[this.options.theme];
    if (themeClass) {
      this.elements.mcPlayer.classList.add(themeClass);
    } else if (
      this.options.themeCSS &&
      !this.document.getElementById("--mc-player-style-custom")
    ) {
      this.options.themeCSS = sanitizeCSS(this.options.themeCSS);
      const customStyle = this.document.createElement("style");
      customStyle.id = "--mc-player-style-custom";
      if (customStyle.styleSheet) {
        customStyle.styleSheet.cssText = this.options.themeCSS;
      } else {
        customStyle.appendChild(document.createTextNode(this.options.themeCSS));
      }
      this.document.querySelector("head").appendChild(customStyle);
      this.elements.mcPlayer.classList.add(this.options.theme);
    }

    if (!this.document.getElementById("--mc-player-style")) {
      const style = this.document.createElement("style");
      style.id = "--mc-player-style";
      style.styleSheet
        ? (style.styleSheet.cssText = css)
        : style.appendChild(document.createTextNode(css));

      // append player style to document
      this.document.querySelector("head").appendChild(style);
    }

    this.eventBroadcast("theme-change", this.options.theme);
  }

  setSpeed() {
    const currentSpeed = this.clip.speed == 1 ? "Normal" : this.clip.speed;
    this.elements.speedCurrent.innerHTML = currentSpeed;
  }
}
