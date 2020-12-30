const MC = require(`@kissmybutton/motorcortex`);

const timeCapsule = new MC.TimeCapsule();

const { elid, eltag, elcreate, calcClipScale } = require(`./helpers`);
const svg = require("./html/svg");
const config = require(`./config`);
const confStyle = require(`./html/style`);
const confThemes = require(`./html/themes`);
const setElements = require(`./html/setElements`);

const volumeListener = require(`./listeners/volume`);
const loopBarStartListener = require(`./listeners/loopBarStart`);
const loopBarEndListener = require(`./listeners/loopBarEnd`);
const loopStartEndListener = require(`./listeners/loopStartEnd`);
const progressBarListener = require(`./listeners/progressBar`);
const statusBtnListener = require(`./listeners/statusBtn`);
const settingsListener = require(`./listeners/settings`);
const speedListener = require(`./listeners/speed`);
const loopBtnListener = require(`./listeners/loopBtn`);
const controlsListener = require(`./listeners/controls`);
const fullscreenListener = require(`./listeners/fullscreen`);
const donkeyclipListener = require(`./listeners/donkeyclip`);
const previewListener = require(`./listeners/preview`);
const bodyListener = require(`./listeners/body`);

/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident
 * (such as a Scene or a Clip) can both privide info regarding their timing
 * state but also provide an interface for interacting/altering the timing of it
 */

class Player {
  constructor(options) {
    // set defaults
    options.id = options.id || Date.now();
    options.preview = options.preview || false;
    options.showVolume = options.showVolume || false;
    options.showIndicator = options.showIndicator || false;
    options.theme = options.theme || `transparent on-top`;
    options.host = options.host || options.clip.props.host;
    options.buttons = options.buttons || {};
    options.timeFormat = options.timeFormat || "ss";
    options.backgroundColor = options.backgroundColor || "transparent";
    options.scaleToFit = options.scaleToFit || false;
    if (options.pointerEvents === undefined || options.pointerEvents === null) {
      options.pointerEvents = true;
    } else {
      options.pointerEvents = Boolean(options.pointerEvents);
    }
    options.onMillisecondChange = options.onMillisecondChange || null;
    options.speedValues = options.speedValues || [-2, -1, -0.5, 0, 0.5, 1, 2];

    options.muted = options.muted || false;
    options.controls = options.controls == false ? false : true;
    options.loop = options.loop || false;
    options.volume = typeof options.volume !== "undefined" ? options.volume : 1;
    options.currentScript = options.currentScript || null;
    // remove strings
    for (const i in options.speedValues) {
      if (!isFinite(options.speedValues[i])) {
        options.speedValues.splice(i, 1);
      }
    }

    options.speedValues.sort(function(a, b) {
      return a - b;
    });

    this.className = config.name;

    config.playerName = options.id;
    this.options = options;
    this.id = this.options.id;
    this.name = config.name;

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
      controls: true
    };

    this.functions = {
      millisecondChange: this.millisecondChange,
      createJourney: this.createJourney,
      changeSettings: this.changeSettings,
      createLoop: this.createLoop
    };
    // create the timer controls main div
    setElements(this);
    this.setTheme();
    this.setSpeed();
    this.subscribeToTimer();
    this.subscribeToDurationChange();
    this.addEventListeners();
    this.scaleClipHost();
    this.eventBroadcast("state-change", this.state);
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
    // if (newOptions.controls === false) {
    //   elid(this.name).style.display = "none";
    // } else if (this.options.controls === true) {
    //   elid(this.name).style.display = "unset";
    // }

    // if (typeof newOptions.volume !== "undefined") {
    //   volumeListener.trigger(this, newOptions.volume, undefined);
    // }
    // if (newOptions.muted === true) {
    //   volumeListener.trigger(this, undefined, newOptions.muted);
    // }

    //set defaults
    newOptions.theme = newOptions.theme || `transparent on-top`;
    newOptions.speed = newOptions.speed || 1;
    newOptions.volume = newOptions.volume || 1;

    if (newOptions.controls === false) {
      elid(this.name).style.display = "none";
    } else if (newOptions.controls === true) {
      elid(this.name).style.display = "unset";
    }

    if (
      typeof newOptions.loop !== "undefined" &&
      (this.options.loop !== newOptions.loop || (initial && this.options.loop))
    ) {
      loopBtnListener.trigger(this);
    }

    if (
      typeof newOptions.muted !== "undefined" &&
      (this.options.muted !== newOptions.muted ||
        (initial && this.options.muted))
    ) {
      volumeListener.trigger(this, undefined, newOptions.mute);
    }
    if (
      typeof newOptions.volume !== "undefined" &&
      (this.options.volume !== newOptions.volume ||
        (initial && this.options.volume))
    ) {
      volumeListener.trigger(this, newOptions.volume, undefined);
    }

    if (
      typeof newOptions.speed !== "undefined" &&
      (this.options.speed !== newOptions.speed ||
        (initial && this.options.speed))
    ) {
      speedListener.trigger(this, newOptions.speed);
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
      settingsListener.trigger(this, "showVolume");
    }

    if (
      typeof newOptions.preview !== "undefined" &&
      this.options.preview !== newOptions.preview
    ) {
      settingsListener.trigger(this, "showPreview");
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
      const transform = calcClipScale(this.clip.props.containerParams, {
        width: this.clip.props.host.offsetWidth,
        height: this.clip.props.host.offsetHeight
      });
      this.clip.realClip.rootElement.style.transform = `scale(${transform.scale}`;
      this.clip.realClip.rootElement.style.left =
        transform.position.left + "px";
      this.clip.realClip.rootElement.style.top = transform.position.top + "px";
    } else {
      this.clip.realClip.rootElement.style.transform = `scale(1)`;
      this.clip.realClip.rootElement.style.left = "0px";
      this.clip.realClip.rootElement.style.top = "0px";
    }
    this.eventBroadcast("scale-change", this.options.scaleToFit);
  }
  createLoop(msStart, msEnd) {
    this.settings.loopStartMillisecond = msStart;
    this.settings.loopEndMillisecond = msEnd;
    this.elements.loopBar.style.left =
      (msStart / this.clip.duration) * 100 + "%";
    this.elements.loopBar.style.width =
      ((msEnd - msStart) / this.clip.duration) * 100 + "%";
    this.createJourney(this.clip, msStart);
    this.elements.runningBar.style.width = "0%";
    !this.settings.loopActivated && this.activateLoop(false);
  }

  createJourney(clip, millisecond, clipCommands = {}) {
    setTimeout(() => {
      const def = null;
      const { before = def, after = def } = clipCommands;
      before ? clip[before]() : null;
      this.settings.journey = timeCapsule.startJourney(clip);
      this.settings.journey.station(millisecond);
      this.settings.journey.destination();
      after ? clip[after]() : null;
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
      this.eventBroadcast("state-change", state);
    }

    if (!this.settings.needsUpdate) {
      this.clip.pause();
      return 1;
    }

    const { clip } = this;

    const {
      loopActivated,
      loopEndMillisecond,
      loopStartMillisecond
    } = this.settings;

    const duration = this.clip.duration;

    const { totalBar, loopBar } = this.elements;

    const loopBarWidth = loopBar.offsetWidth;
    const loopBarLeft = loopBar.offsetLeft / totalBar.offsetWidth;
    const localMillisecond = millisecond - duration * loopBarLeft;
    const localDuration = (duration / totalBar.offsetWidth) * loopBarWidth;

    if (
      millisecond >= loopEndMillisecond &&
      loopActivated &&
      this.clip.speed >= 0
    ) {
      this.createJourney(clip, loopStartMillisecond + 1, {
        after:
          this.settings.playAfterResize ||
          this.clip.runTimeInfo.state == "playing"
            ? "play"
            : null
      });
      return 1;
    } else if (
      millisecond >= loopEndMillisecond &&
      loopActivated &&
      this.clip.speed < 0
    ) {
      this.createJourney(clip, loopEndMillisecond - 1, {
        after:
          this.settings.playAfterResize ||
          this.clip.runTimeInfo.state == "playing"
            ? "play"
            : null
      });
      return 1;
    } else if (
      millisecond <= loopStartMillisecond &&
      loopActivated &&
      this.clip.speed >= 0
    ) {
      this.createJourney(clip, loopStartMillisecond + 1, {
        after:
          this.settings.playAfterResize ||
          this.clip.runTimeInfo.state == "playing"
            ? "play"
            : null
      });
      return 1;
    } else if (
      millisecond <= loopStartMillisecond &&
      loopActivated &&
      this.clip.speed < 0
    ) {
      this.createJourney(clip, loopEndMillisecond - 1, {
        after:
          this.settings.playAfterResize ||
          this.clip.runTimeInfo.state == "playing"
            ? "play"
            : null
      });
      return 1;
    }

    if (makeJouney) {
      this.createJourney(clip, millisecond, {
        after: this.settings.playAfterResize ? "play" : null
      });
    }
    this.elements.runningBar.style.width =
      (localMillisecond / localDuration) * 100 + `%`;

    this.elements.currentTime.innerHTML = this.timeFormat(millisecond);

    if (this.options.onMillisecondChange && executeOnMillisecondChange) {
      this.options.onMillisecondChange(millisecond);
    }
  }

  eventBroadcast(eventName, state) {
    const controlsEl = elid(`${this.name}-controls`);
    if (eventName === `state-change`) {
      if (this.options.currentScript) {
        this.options.currentScript.dataset.status = state;
      }
      if (
        state === `paused` ||
        state === `idle` ||
        state === `transitional` ||
        state === `armed` ||
        state === `blocked`
      ) {
        if (!controlsEl.classList.value.includes("force-show-controls")) {
          controlsEl.classList.toggle("force-show-controls");
        }
        this.elements.statusButton.innerHTML = svg.playSVG;
        this.elements.statusButton.appendChild(this.elements.indicator);
        this.elements.indicator.innerHTML = `${state.charAt(0).toUpperCase() +
          state.slice(1)}`;
        if (state === `blocked`) {
          this.elements.pointerEventPanel.innerHTML = `
            <div style="width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;">${svg.loadingSVG}</div>`;
        }
      } else {
        if (controlsEl.classList.value.includes("force-show-controls")) {
          controlsEl.classList.toggle("force-show-controls");
        }
        this.elements.statusButton.innerHTML = svg.pauseSVG;
        this.elements.statusButton.appendChild(this.elements.indicator);
        this.elements.indicator.innerHTML = `Playing`;
        this.elements.pointerEventPanel.innerHTML = "";
        if (
          state === `playing` &&
          this.clip.runTimeInfo.currentMillisecond === this.clip.duration &&
          this.clip.speed >= 0
        ) {
          this.createJourney(this.clip, 1, { after: "play" });
        } else if (
          state === `playing` &&
          this.clip.runTimeInfo.currentMillisecond === 0 &&
          this.clip.speed < 0
        ) {
          this.createJourney(this.clip, this.clip.duration - 1, {
            after: "play"
          });
        } else if (
          state === `playing` &&
          this.clip.runTimeInfo.currentMillisecond === this.clip.duration &&
          this.clip.speed < 0
        ) {
          this.createJourney(this.clip, this.clip.duration - 1, {
            after: "play"
          });
        }
      }
    } else if (eventName === `duration-change`) {
      this.elements.totalTime.innerHTML = this.timeFormat(this.clip.duration);
      this.settings.loopEndMillisecond = this.clip.duration;
      this.elements.pointerEventPanel.innerHTML = "";
      this.millisecondChange(this.clip.runTimeInfo.currentMillisecond);
    } else if (this.options.currentScript) {
      if (eventName === "volume-change") {
        this.options.volume = state;
        this.options.currentScript.dataset.volume = state;
      } else if (eventName === "speed-change") {
        this.options.speed = state;
        this.options.currentScript.dataset.speed = state;
      } else if (eventName === "mute-change") {
        if (state) {
          this.options.muted = true;
          this.options.currentScript.dataset.muted = "";
        } else {
          this.options.muted = false;
          delete this.options.currentScript.dataset.muted;
        }
      } else if (eventName === "loop-change") {
        if (state) {
          this.options.loop = true;
          this.options.currentScript.dataset.loop = "";
        } else {
          this.options.loop = false;
          delete this.options.currentScript.dataset.loop;
        }
      } else if (eventName === "scale-change") {
        if (state) {
          this.options.scaleToFit = true;
          this.options.currentScript.dataset.scaleToFit = "";
        } else {
          this.options.scaleToFit = false;
          delete this.options.currentScript.dataset.scaleToFit;
        }
      } else if (eventName === "show-volume-change") {
        if (state) {
          this.options.showVolume = true;
          this.options.currentScript.dataset.showVolume = "";
        } else {
          this.options.showVolume = false;
          delete this.options.currentScript.dataset.showVolume;
        }
      } else if (eventName === "show-preview-change") {
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
  subscribeToDurationChangeCallback(/*newDuration*/) {
    this.eventBroadcast("duration-change");
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
    volumeListener.add(this);
    statusBtnListener(this);
    settingsListener.add(this);
    speedListener.add(this);
    loopBtnListener.add(this);
    controlsListener(this);
    fullscreenListener(this);
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
    //remove previous style if exists
    elid(this.name + "-style") &&
      eltag(`head`)[0].removeChild(elid(this.name + "-style"));

    // replace multiple spaces with one space
    this.options.theme.replace(/\s\s+/g, ` `);
    this.options.theme.trim();

    if (
      !this.options.theme.includes(`on-top`) &&
      !this.options.theme.includes(`position-bottom`)
    ) {
      this.options.theme += ` on-top`;
    }
    const theme = {};
    for (const i in this.options.theme.split(` `)) {
      const confTheme = confThemes(this.options.theme.split(` `)[i], this.name);
      for (const q in confTheme || {}) {
        theme[q] = confTheme[q];
      }
    }
    const css = confStyle(theme, this.name, this.options);
    const style = elcreate(`style`);
    style.id = this.name + "-style";
    style.styleSheet
      ? (style.styleSheet.cssText = css)
      : style.appendChild(document.createTextNode(css));

    // append player style to document
    eltag(`head`)[0].appendChild(style);
    this.eventBroadcast("theme-change", this.options.theme);
  }

  setSpeed() {
    let currentSpeed;
    this.clip.speed == 1
      ? (currentSpeed = `Normal`)
      : (currentSpeed = this.clip.speed);
    this.elements.speedCurrent.innerHTML = currentSpeed;

    const targetZone = (() => {
      for (let i = 0; i < this.options.speedValues.length - 1; i++) {
        if (
          this.options.speedValues[i] <= this.clip.speed &&
          this.options.speedValues[i + 1] > this.clip.speed
        ) {
          return (
            i +
            Math.abs(
              (this.clip.speed - this.options.speedValues[i]) /
                (this.options.speedValues[i] - this.options.speedValues[i + 1])
            )
          );
        }
      }
    })();

    const step = 1 / (this.options.speedValues.length - 1);

    const positionY =
      (targetZone * step - 1) * -1 * (this.options.speedValues.length - 1) * 16;

    elid(`${this.name}-speed-cursor`).style.top = positionY + `px`;
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
      return `0.0`;
    }
    return realSpeed;
  }

  createPreviewDisplay() {
    this.previewClip = this.clip.paste(elid(`${this.name}-hover-display`));
    const previewClip = elid(`${this.name}-hover-display`);
    window.previewClip = this.previewClip;

    previewClip.style.position = `absolute`;

    previewClip.style.zIndex = 1;
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
      // previewWidth = parseFloat(
      //   elid(`${this.name}-hover-display`).style.maxWidth
      // );
      previewWidth = 300;
      this.previewScale = previewWidth / clipWidth;
    }

    elid(`${this.name}-hover-display`).style.width = clipWidth + `px`;
    elid(`${this.name}-hover-display`).style.height = clipHeight + `px`;

    previewClip.style.transform = `scale(${this.previewScale})`;
    previewClip.style.transformOrigin = `center bottom`;
    previewClip.style.boxSizing = `border-box`;
  }
}

module.exports = Player;
