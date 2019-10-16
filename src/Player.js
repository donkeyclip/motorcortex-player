const MC = require(`@kissmybutton/motorcortex`);

const timeCapsule = new MC.TimeCapsule();

const { elid, eltag, elcreate } = require(`./helpers`);
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
    options.theme = options.theme || `transparent on-top`;
    options.host = options.host || options.clip.props.host;
    options.buttons = options.buttons || {};

    if (options.pointerEvents === undefined || options.pointerEvents === null) {
      options.pointerEvents = true;
    } else {
      options.pointerEvents = Boolean(options.pointerEvents);
    }
    options.onMillisecondChange = options.onMillisecondChange || null;
    options.speedValues = options.speedValues || [
      -4,
      -2,
      -1,
      -0.5,
      0,
      0.5,
      1,
      2,
      4
    ];
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
      loopEndMillisecond: this.clip.duration
    };

    this.functions = {
      millisecondChange: this.millisecondChange,
      createJourney: this.createJourney
    };
    // create the timer controls main div
    setElements(this);
    this.setTheme();
    this.setSpeed();
    this.subscribeToTimer();
    this.subscribeToDurationChange();
    this.addEventListeners();

    if (this.options.preview) {
      this.createPreviewDisplay();
    }
    window.addEventListener(`resize`, () => {
      if (this.options.preview) {
        this.setPreviewDimentions();
      }
    });
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

    this.elements.currentTime.innerHTML = millisecond;

    if (this.options.onMillisecondChange && executeOnMillisecondChange) {
      this.options.onMillisecondChange(millisecond);
    }
  }

  eventBroadcast(eventName, state) {
    if (eventName === `state-change`) {
      if (
        state === `paused` ||
        state === `idle` ||
        state === `transitional` ||
        state === `armed` ||
        state === `blocked`
      ) {
        this.elements.statusButton.innerHTML = svg.playSVG;
        this.elements.statusButton.appendChild(this.elements.indicator);
        this.elements.indicator.innerHTML = `${state.charAt(0).toUpperCase() +
          state.slice(1)}`;
        if (state === `blocked`) {
          this.elements.pointerEventPanel.innerHTML = `
            <div style="width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;">${
              svg.loadingSVG
            }</div>`;
        }
      } else {
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
      this.elements.totalTime.innerHTML = this.clip.duration;
      this.settings.loopEndMillisecond = this.clip.duration;
      this.elements.pointerEventPanel.innerHTML = "";
      this.millisecondChange(this.clip.runTimeInfo.currentMillisecond);
    }
  }

  subscribeToDurationChange() {
    this.clip.subscribeToDurationChange(
      this.id,
      this.eventBroadcast.bind(this)
    );
  }

  subscribeToTimer() {
    this.clip.subscribe(this.id, this.millisecondChange.bind(this));
  }

  handleDragStart() {
    this.settings.needsUpdate = true;
    this.settings.journey = timeCapsule.startJourney(this.clip);
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

    currentTime.innerHTML = millisecond;

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
    volumeListener(this);
    statusBtnListener(this);
    settingsListener(this);
    speedListener(this);
    loopBtnListener(this);
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

    this.elements.mcPlayer.classList.toggle(`full-screen`);
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
    if (this.options.preview) {
      this.setPreviewDimentions();
    }
    this.elements.mcPlayer.classList.toggle(`full-screen`);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  setTheme() {
    // replace multiple spaces with one space
    this.options.theme.replace(/\s\s+/g, ` `);
    this.options.theme.trim();

    if (
      !this.options.theme.includes(`on-top`) &&
      !this.options.theme.includes(`position-default`)
    ) {
      this.options.theme += ` position-default`;
    }

    const theme = {};
    for (const i in this.options.theme.split(` `)) {
      const confTheme = confThemes(this.options.theme.split(` `)[i]);
      for (const q in confTheme || {}) {
        theme[q] = confTheme[q];
      }
    }
    const css = confStyle(theme, this.name, this.options);
    const style = elcreate(`style`);

    style.styleSheet
      ? (style.styleSheet.cssText = css)
      : style.appendChild(document.createTextNode(css));

    // append player style to document
    eltag(`head`)[0].appendChild(style);
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
