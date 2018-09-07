const MC = require(`@kissmybutton/motorcortex`);

const mch = new MC.Helper();
const timeCapsule = new MC.TimeCapsule();
const hoverTimeCapsule = new MC.TimeCapsule();

const {
  el,
  elid,
  eltag,
  elcreate,
  addListener,
  removeListener
} = require(`./helpers`);
const svg = require("./html/svg");
const config = require(`./config`);
const confStyle = require(`./html/style`);
const confThemes = require(`./html/themes`);
const setElements = require(`./html/setElements`);

/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident
 * (such as a Scene or a Clip) can both privide info regarding their timing
 * state but also provide an interface for interacting/altering the timing of it
 */

class Player {
  constructor(options) {
    // set defaults
    options.id = options.id || mch.getAnId();
    options.preview = options.preview || false;
    options.showVolume = options.showVolume || false;
    options.theme = options.theme || `transparent on-top`;
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

    config.playerName = options.id;

    this.options = options;

    this.id = this.options.id;
    this.name = config.name;

    this.previewClip = null;
    this.clip = options.clip; // host to apply the timer
    this.clipClass = options.clipClass;
    this.journey = null;
    this.previewJourney = null;

    this.settings = {
      volume: 1,
      previousVolume: 1,
      volumeMute: false,
      needsUpdate: true,
      loopJourney: false,
      loopActivated: false,
      requestingLoop: false,
      playAfterResize: false,
      loopStartMillisecond: 0,
      loopLastPositionXPxls: 0,
      loopLastPositionXPercentage: 0,
      loopEndMillisecond: this.clip.duration
    };

    // create the timer controls main div
    this.elements = setElements(this.clip, this.name, this.options);
    this.setSpeed();
    this.setTheme();
    this.subscribeToTimer();
    this.subscribeToEvents();
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

  createJourney(clip, millisecond) {
    setTimeout(() => {
      this.journey = timeCapsule.startJourney(clip);
      this.journey.station(millisecond);
      this.journey.destination();
    }, 0);
  }

  millisecondChange(millisecond) {
    if (!this.settings.needsUpdate) {
      this.clip.wait();
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

    if (millisecond >= loopEndMillisecond && loopActivated) {
      if (clip.state === `idle` || clip.state === `completed`) {
        clip.stop();
        this.createJourney(clip, loopStartMillisecond + 1);
        clip.play();
      } else {
        this.createJourney(clip, loopStartMillisecond + 1);
        this.clip.resume();
      }
      return 1;
    } else if (millisecond <= loopStartMillisecond && loopActivated) {
      if (clip.state === `idle` || clip.state === `completed`) {
        this.clip.stop();
        this.createJourney(clip, loopEndMillisecond - 1);
        this.clip.play();
      } else {
        this.createJourney(clip, loopEndMillisecond - 1);
        this.clip.resume();
      }
      return 1;
    } else if (millisecond > loopEndMillisecond) {
      this.settings.needsUpdate = false;
      this.createJourney(clip, loopEndMillisecond);
      this.elements.runningBar.style.width = `100%`;
      this.elements.currentTime.innerHTML = loopEndMillisecond;
      return 1;
    } else if (millisecond < loopStartMillisecond) {
      this.settings.needsUpdate = false;
      this.createJourney(clip, loopStartMillisecond);
      this.elements.runningBar.style.width = `0%`;
      this.elements.currentTime.innerHTML = loopStartMillisecond;
      return 1;
    }

    this.elements.runningBar.style.width =
      (localMillisecond / localDuration) * 100 + `%`;

    this.elements.currentTime.innerHTML = millisecond;
  }

  eventBroadcast(eventName, meta) {
    if (eventName === `state-change`) {
      if (meta.newState === `waiting`) {
        this.elements.statusButton.innerHTML = svg.playSVG;
        this.elements.statusButton.appendChild(this.elements.indicator);
        this.elements.indicator.innerHTML = `Waiting`;
      } else if (meta.newState === `playing`) {
        this.elements.statusButton.innerHTML = svg.pauseSVG;
        this.elements.statusButton.appendChild(this.elements.indicator);
        this.elements.indicator.innerHTML = `Playing`;
      } else if (meta.newState === `completed`) {
        this.elements.currentTime.innerHTML = this.clip.duration;
        this.elements.statusButton.innerHTML = svg.replaySVG;
        this.elements.statusButton.appendChild(this.elements.indicator);
        this.elements.indicator.innerHTML = `Completed`;
      } else if (meta.newState === `transitional`) {
        this.elements.statusButton.innerHTML = svg.playSVG;
        this.elements.statusButton.appendChild(this.elements.indicator);
        this.elements.indicator.innerHTML = `Transitional`;
      } else if (meta.newState === `idle`) {
        this.elements.statusButton.innerHTML = svg.playSVG;
        this.elements.statusButton.appendChild(this.elements.indicator);
        this.elements.indicator.innerHTML = `Idle`;
      } else {
        this.elements.indicator.innerHTML = meta.newSTate;
      }
    } else if (eventName === `attribute-rejection`) {
      mch.log(
        `Attributes`,
        meta.attributes,
        `have been rejected from animation with id ${meta.animationID}`
      );
    } else if (eventName === `animation-rejection`) {
      mch.log(
        `Animation ${meta.animationID} has been rejected as all attributes of 
        it overlap on specific elements because of existing animations`
      );
    } else if (eventName === `duration-change`) {
      this.elements.totalTime.innerHTML = this.clip.duration;
      this.settings.loopEndMillisecond = this.clip.duration;
      this.millisecondChange(
        this.clip.runTimeInfo.currentMillisecond,
        this.clip.state
      );
    }
  }

  subscribeToEvents() {
    this.clip.subscribeToEvents(this.id, this.eventBroadcast.bind(this));
  }

  subscribeToTimer() {
    this.clip.subscribe(this.id, this.millisecondChange.bind(this));
  }

  handleDragStart() {
    this.settings.needsUpdate = true;
    this.journey = timeCapsule.startJourney(this.clip);
  }

  handleDrag(loopBarPositionX) {
    if (!isFinite(loopBarPositionX)) {
      loopBarPositionX = 0;
    }
    const { duration } = this.clip;
    const { loopBar, totalBar } = this.elements;

    const totalBarPositionX = loopBarPositionX + loopBar.offsetLeft;

    const millisecond = Math.round(
      (duration * totalBarPositionX) / totalBar.offsetWidth
    );

    this.elements.currentTime.innerHTML = millisecond;

    this.elements.runningBar.style.width =
      (loopBarPositionX / loopBar.offsetWidth) * 100 + `%`;

    this.journey.station(millisecond);
  }

  handleDragEnd() {
    this.journey.destination();
  }

  addEventListeners() {
    this.elements.volumeBtn.onclick = () => {
      if (this.settings.volumeMute) {
        this.elements.volumeBarActive.style.width =
          this.settings.previousVolume * 100 + `%`;
        this.clip.setVolume(this.settings.previousVolume);
        this.settings.volumeMute = false;
        const SVG = document.createElement(`span`);
        SVG.innerHTML = svg.volumeSVG;
        this.elements.volumeBtn.getElementsByTagName(`svg`)[0].replaceWith(SVG);
      } else {
        this.settings.volumeMute = true;
        this.elements.volumeBarActive.style.width = `0%`;
        this.clip.setVolume(0);
        const SVG = document.createElement(`span`);
        SVG.innerHTML = svg.volumeMuteSVG;
        this.elements.volumeBtn.getElementsByTagName(`svg`)[0].replaceWith(SVG);
      }
    };

    const onCursorMoveVolumeBar = e => {
      e.preventDefault();
      const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
      const viewportOffset = this.elements.volumeBarHelper.getBoundingClientRect();
      let positionX = clientX - viewportOffset.left;

      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > this.elements.volumeBarHelper.offsetWidth) {
        positionX = this.elements.volumeBarHelper.offsetWidth;
      }
      this.settings.volume = Number(
        (positionX / this.elements.volumeBarHelper.offsetWidth).toFixed(2)
      );
      this.elements.volumeBarActive.style.width =
        this.settings.volume * 100 + `%`;
      this.clip.setVolume(this.settings.volume);

      if (this.settings.volume > 0) {
        this.settings.volumeMute = false;
        const SVG = document.createElement(`span`);
        SVG.innerHTML = svg.volumeSVG;
        this.elements.volumeBtn.getElementsByTagName(`svg`)[0].replaceWith(SVG);
      } else if (this.settings.volume === 0) {
        this.settings.volumeMute = true;
        const SVG = document.createElement(`span`);
        SVG.innerHTML = svg.volumeMuteSVG;
        this.elements.volumeBtn.getElementsByTagName(`svg`)[0].replaceWith(SVG);
      }
    };

    const onMouseUpVolumeBar = e => {
      e.preventDefault();
      if (this.settings.volume > 0) {
        this.settings.previousVolume = this.settings.volume;
      }
      removeListener(`mouseup`, onMouseUpVolumeBar, false);
      removeListener(`touchend`, onMouseUpVolumeBar, false);
      removeListener(`mousemove`, onCursorMoveVolumeBar, false);
      removeListener(`touchmove`, onCursorMoveVolumeBar, false);
    };

    const onMouseDownVolumeBar = e => {
      e.preventDefault();
      onCursorMoveVolumeBar(e);
      addListener(`mouseup`, onMouseUpVolumeBar, false);
      addListener(`touchend`, onMouseUpVolumeBar, false);
      addListener(`mousemove`, onCursorMoveVolumeBar, false);
      addListener(`touchmove`, onCursorMoveVolumeBar, false);
    };

    this.elements.volumeBarHelper.addEventListener(
      `mousedown`,
      onMouseDownVolumeBar,
      false
    );
    this.elements.volumeCursor.addEventListener(
      `mousedown`,
      onMouseDownVolumeBar,
      false
    );
    this.elements.volumeBarHelper.addEventListener(
      `touchstart`,
      onMouseDownVolumeBar,
      {
        passive: true
      },
      false
    );
    this.elements.volumeCursor.addEventListener(
      `touchstart`,
      onMouseDownVolumeBar,
      {
        passive: true
      },
      false
    );
    /* 
    * Play - pause - replay interactions
    */

    const editableLoopStartTime = () => {
      this.elements.editableLoopStartTime.value = this.elements.loopStartTime.innerHTML;
      this.elements.loopStartTime.replaceWith(
        this.elements.editableLoopStartTime
      );
      this.elements.editableLoopStartTime.focus();
    };

    const editableLoopEndTime = () => {
      this.elements.editableLoopEndTime.value = this.elements.loopEndTime.innerHTML;
      this.elements.loopEndTime.replaceWith(this.elements.editableLoopEndTime);
      this.elements.editableLoopEndTime.focus();
    };

    this.elements.editableLoopEndTime.onkeydown = this.elements.editableLoopStartTime.onkeydown = e => {
      e.preventDefault();
      if (e.keyCode === 8) {
        e.target.value = e.target.value
          .toString()
          .substring(0, e.target.value.toString().length - 1);
      }

      if (e.keyCode === 13) {
        e.target.blur();
      }

      const newValue = parseFloat((e.target.value || 0).toString() + e.key);

      if (newValue > this.clip.duration) {
        return;
      }
      e.target.value = newValue;

      if (e.target === this.elements.editableLoopStartTime) {
        const viewportOffset = this.elements.totalBar.getBoundingClientRect();
        const event = {
          preventDefault: () => {},
          clientX:
            (this.elements.totalBar.offsetWidth / this.clip.duration) *
              e.target.value +
            viewportOffset.left
        };
        onMouseDownLoopStart(event);
        onCursorMoveLoopStart(event);
        onMouseUpLoopStart(event);
      } else if (e.target === this.elements.editableLoopEndTime) {
        const viewportOffset = this.elements.totalBar.getBoundingClientRect();
        const event = {
          preventDefault: () => {},
          clientX:
            (this.elements.totalBar.offsetWidth / this.clip.duration) *
              e.target.value +
            viewportOffset.left
        };
        onMouseDownLoopEnd(event);
        onCursorMoveLoopEnd(event);
        onMouseUpLoopEnd(event);
      }
    };

    this.elements.loopStartTime.onclick = editableLoopStartTime;
    this.elements.loopEndTime.onclick = editableLoopEndTime;

    this.elements.editableLoopStartTime.onfocusout = () => {
      this.elements.editableLoopStartTime.replaceWith(
        this.elements.loopStartTime
      );
    };

    this.elements.editableLoopEndTime.onfocusout = () => {
      this.elements.editableLoopEndTime.replaceWith(this.elements.loopEndTime);
    };

    this.elements.statusButton.onclick = e => {
      e.preventDefault();
      if (this.clip.state === `playing`) {
        this.clip.wait();
      } else if (this.clip.state === `waiting`) {
        this.clip.resume();
      } else if (this.clip.state === `idle`) {
        if (this.clip.speed >= 0) {
          this.clip.play();
          this.settings.needsUpdate = true;
        } else {
          this.clip.stop();
          this.journey = timeCapsule.startJourney(this.clip);
          this.journey.station(this.settings.loopEndMillisecond - 1);
          this.journey.destination();
          this.clip.play();
          this.settings.needsUpdate = true;
        }
      } else if (this.clip.state === `completed`) {
        if (this.clip.speed >= 0) {
          this.clip.stop();
          this.journey = timeCapsule.startJourney(this.clip);
          this.journey.station(0);
          this.journey.destination();
          this.clip.play();
          this.settings.needsUpdate = true;
        } else {
          this.clip.stop();
          this.journey = timeCapsule.startJourney(this.clip);
          this.journey.station(this.settings.loopEndMillisecond - 1);
          this.journey.destination();
          this.clip.play();
          this.settings.needsUpdate = true;
        }
      }
    };

    this.elements.settingsShowIndicator.onclick = e => {
      e.preventDefault();
      const checkbox = elid(`${this.name}-show-indicator-checkbox`);
      if (checkbox.checked) {
        checkbox.checked = false;
        this.elements.indicator.style.visibility = `hidden`;
        this.elements.statusButton.style.width = `40px`;
        this.elements.statusButton.style.height = `25px`;
        this.elements.statusButton.style.bottom = `0px`;
      } else {
        checkbox.checked = true;
        this.elements.indicator.style.visibility = `visible`;
        this.elements.statusButton.style.width = `35px`;
        this.elements.statusButton.style.height = `20px`;
        this.elements.statusButton.style.bottom = `5px`;
      }
    };

    this.elements.settingsShowVolume.onclick = e => {
      e.preventDefault();
      this.elements.volumeControl.classList.toggle(
        `${this.name}-volume-width-transition`
      );
      this.elements.volumeBar.classList.toggle(
        `${this.name}-volume-width-transition`
      );
      this.elements.volumeBarHelper.classList.toggle(
        `${this.name}-volume-width-transition`
      );
      this.elements.timeDisplay.classList.toggle(
        `${this.name}-time-width-transition`
      );

      const checkbox = elid(`${this.name}-show-volume-checkbox`);
      if (checkbox.checked) {
        checkbox.checked = false;
        this.elements.volumeControl.style.visibility = `hidden`;
        this.elements.timeDisplay.style.left = `45px`;
      } else {
        checkbox.checked = true;
        this.elements.volumeControl.style.visibility = `visible`;
        this.elements.timeDisplay.style.left = ``;
      }
    };

    this.elements.settingsShowPreview.onclick = e => {
      e.preventDefault();
      const checkbox = elid(`${this.name}-show-preview-checkbox`);
      if (checkbox.checked) {
        checkbox.checked = false;
        elid(`${this.name}-hover-display`).style.visibility = `hidden`;
        elid(`${this.name}-hover-display`).style.display = `none`;
        this.options.preview = false;
      } else {
        if (!this.previewClip) {
          this.createPreviewDisplay();
        }
        checkbox.checked = true;
        elid(`${this.name}-hover-display`).style.visibility = `visible`;
        elid(`${this.name}-hover-display`).style.display = `flex`;
        this.options.preview = true;
      }
    };

    this.elements.settingsButton.onclick = e => {
      e.preventDefault();

      const showHideSettings = e => {
        if (this.elements.settingsPanel.contains(e.target)) {
          return true;
        }
        this.elements.settingsPanel.classList.toggle(`m-fadeOut`);
        this.elements.settingsPanel.classList.toggle(`m-fadeIn`);
        if (this.elements.settingsPanel.className.includes(`m-fadeOut`)) {
          removeListener(`click`, showHideSettings, false);
        }
      };

      if (this.elements.settingsPanel.className.includes(`m-fadeOut`)) {
        addListener(`click`, showHideSettings, false);
      } else {
        removeListener(`click`, showHideSettings, false);
      }
    };

    this.elements.settingsSpeedButtonShow.onclick = this.elements.settingsSpeedButtonHide.onclick = e => {
      e.preventDefault();
      this.elements.settingsPanel.classList.toggle(
        `${this.name}-settings-speed-panel`
      );
      const includesClass = this.elements.settingsPanel.className.includes(
        `${this.name}-settings-speed-panel`
      );
      if (includesClass) {
        this.elements.settingsMainPanel.style.display = `none`;
        this.elements.settingsSpeedPanel.style.display = `block`;
      } else {
        this.elements.settingsSpeedPanel.style.display = `none`;
        this.elements.settingsMainPanel.style.display = `block`;
      }
    };

    const onCursorMove = e => {
      e.preventDefault();
      const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
      const viewportOffset = this.elements.loopBar.getBoundingClientRect();
      let positionX = clientX - viewportOffset.left;

      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > this.elements.loopBar.offsetWidth) {
        positionX = this.elements.loopBar.offsetWidth;
      }
      this.handleDrag(positionX);
    };

    const onMouseUp = e => {
      e.preventDefault();
      removeListener(`mouseup`, onMouseUp, false);
      removeListener(`touchend`, onMouseUp, false);
      removeListener(`mousemove`, onCursorMove, false);
      removeListener(`touchmove`, onCursorMove, false);
      this.handleDragEnd();

      if (this.settings.playAfterResize) {
        if (this.clip.state === `idle` && !this.settings.loopActivated) {
          this.clip.play();
        } else if (
          this.clip.state === `completed` &&
          !this.settings.loopActivated
        ) {
          this.clip.stop();
          this.journey = timeCapsule.startJourney(this.clip);
          this.journey.station(this.settings.loopEndMillisecond - 1);
          this.journey.destination();
          this.clip.play();
        } else if (
          (this.clip.state === `completed` || this.clip.state === `idle`) &&
          this.settings.loopActivated
        ) {
          this.clip.stop();
          this.journey = timeCapsule.startJourney(this.clip);
          this.clip.speed >= 0
            ? this.journey.station(this.settings.loopStartMillisecond + 1)
            : this.journey.station(this.settings.loopEndMillisecond - 1);
          this.journey.destination();
          this.clip.play();
        } else {
          this.clip.resume();
        }
        this.settings.playAfterResize = false;
      }
    };

    const onMouseDown = e => {
      e.preventDefault();
      if (this.clip.state === `playing`) {
        this.settings.playAfterResize = true;
      }
      this.handleDragStart();
      onCursorMove(e);
      addListener(`mouseup`, onMouseUp, false);
      addListener(`touchend`, onMouseUp, false);
      addListener(`mousemove`, onCursorMove, false);
      addListener(`touchmove`, onCursorMove, false);
    };

    this.elements.loopBar.addEventListener(`mousedown`, onMouseDown, false);
    this.elements.loopBar.addEventListener(
      `touchstart`,
      onMouseDown,
      {
        passive: true
      },
      false
    );

    const onCursorMoveSpeedBar = e => {
      e.preventDefault();
      const viewportOffset = this.elements.speedBar.getBoundingClientRect();
      const clientY = e.clientY || ((e.touches || [])[0] || {}).clientY;
      let positionY = clientY - viewportOffset.top;

      positionY -= 8;
      if (positionY < 0) {
        positionY = 0;
      } else if (positionY > this.elements.speedBar.offsetHeight - 15.5) {
        positionY = this.elements.speedBar.offsetHeight - 15.5;
      }

      // show speed
      const percentage = (positionY / 128.5 - 1) * -1;
      const step = 1 / 8;
      const speed = this.calculateSpeed(
        step,
        this.options.speedValues,
        percentage
      );
      elid(`${this.name}-speed-runtime`).innerHTML = speed + `0`;
      elid(`${this.name}-speed-cursor`).style.top = positionY + `px`;
      this.clip.executionSpeed = speed;
    };

    const onMouseUpSpeedBar = e => {
      e.preventDefault();
      removeListener(`mouseup`, onMouseUpSpeedBar, false);
      removeListener(`touchend`, onMouseUpSpeedBar, false);
      removeListener(`mousemove`, onCursorMoveSpeedBar, false);
      removeListener(`touchmove`, onCursorMoveSpeedBar, false);
      elid(`${this.name}-speed-runtime`).innerHTML = `Speed`;
      let speedDisplay;
      this.clip.speed == 1
        ? (speedDisplay = `Normal`)
        : (speedDisplay = this.clip.speed);

      this.elements.speedCurrent.innerHTML = speedDisplay;
    };
    const onMouseDownSpeedBar = e => {
      e.preventDefault();
      onCursorMoveSpeedBar(e);
      addListener(`mouseup`, onMouseUpSpeedBar, false);
      addListener(`touchend`, onMouseUpSpeedBar, false);
      addListener(`mousemove`, onCursorMoveSpeedBar, false);
      addListener(`touchmove`, onCursorMoveSpeedBar, false);
    };

    this.elements.speedBarHelper.addEventListener(
      `mousedown`,
      onMouseDownSpeedBar,
      false
    );
    this.elements.speedBarHelper.addEventListener(
      `touchstart`,
      onMouseDownSpeedBar,
      {
        passive: true
      },
      false
    );

    this.elements.fullScreenButton.addEventListener(`click`, () => {
      const elFullScreen = this.clip.props.host.className.includes(
        `full-screen`
      );
      elFullScreen
        ? this.exitFullscreen()
        : this.launchIntoFullscreen(this.clip.props.host);
      this.clip.props.host.classList.toggle(`full-screen`);
    });

    this.elements.loopButton.onclick = () => {
      this.settings.loopActivated = !this.settings.loopActivated;
      this.elements.loopButton.classList.toggle(`svg-selected`);
      this.elements.loopBarStart.classList.toggle(`m-fadeOut`);
      this.elements.loopBarEnd.classList.toggle(`m-fadeOut`);
      this.elements.loopBarStart.classList.toggle(`m-fadeIn`);
      this.elements.loopBarEnd.classList.toggle(`m-fadeIn`);
      elid(`${this.name}-loop-time`).classList.toggle(`m-fadeOut`);
      elid(`${this.name}-loop-time`).classList.toggle(`m-fadeIn`);

      this.elements.loopEndTime.innerHTML = this.settings.loopEndMillisecond;
      this.elements.loopStartTime.innerHTML = this.settings.loopStartMillisecond;
      this.settings.needsUpdate = true;

      if (!this.settings.loopActivated) {
        this.elements.loopBar.style.left = `0%`;
        this.elements.loopBar.style.width = `100%`;
        this.settings.loopStartMillisecond = 0;
        this.settings.loopEndMillisecond = this.clip.duration;
        this.settings.loopLastPositionXPxls = 0;
        this.settings.loopLastPositionXPercentage = 0;
        this.elements.runningBar.style.width =
          (this.clip.runTimeInfo.currentMillisecond / this.clip.duration) *
            100 +
          `%`;
      }
    };

    elid(`${this.name}-controls`).onmouseover = () => {
      if (!this.settings.loopActivated) {
        return;
      }
      this.elements.loopBarStart.classList.remove(`m-fadeOut`);
      this.elements.loopBarEnd.classList.remove(`m-fadeOut`);
      this.elements.loopBarStart.classList.add(`m-fadeIn`);
      this.elements.loopBarEnd.classList.add(`m-fadeIn`);
    };

    elid(`${this.name}-controls`).onmouseout = () => {
      if (!this.settings.loopActivated) {
        return;
      }
      this.elements.loopBarStart.classList.add(`m-fadeOut`);
      this.elements.loopBarEnd.classList.add(`m-fadeOut`);
      this.elements.loopBarStart.classList.remove(`m-fadeIn`);
      this.elements.loopBarEnd.classList.remove(`m-fadeIn`);
    };

    const onCursorMoveLoopStart = e => {
      e.preventDefault();
      const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
      const viewportOffset = this.elements.totalBar.getBoundingClientRect();
      let positionX = clientX - viewportOffset.left;

      const endPosition =
        this.elements.loopBar.offsetWidth + this.elements.loopBar.offsetLeft;
      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > this.elements.totalBar.offsetWidth) {
        positionX = this.elements.totalBar.offsetWidth;
      }

      const loopBarDeltaX =
        positionX - this.settings.loopLastPositionXPxls || 0;
      const runningBarWidthInPxls =
        this.elements.runningBar.offsetWidth - loopBarDeltaX;

      this.elements.loopBar.style.left = positionX + `px`;

      const diff = endPosition - this.elements.loopBar.offsetLeft;
      this.elements.loopBar.style.width = diff + `px`;

      this.elements.runningBar.style.width = runningBarWidthInPxls + `px`;

      this.settings.loopLastPositionXPxls = positionX;

      this.settings.loopStartMillisecond = Math.round(
        (this.clip.duration * this.elements.loopBar.offsetLeft) /
          this.elements.totalBar.offsetWidth
      );

      if (
        this.settings.loopEndMillisecond < this.settings.loopStartMillisecond
      ) {
        this.settings.loopEndMillisecond = this.settings.loopStartMillisecond;
        this.elements.loopBar.style.width = `0px`;
        this.elements.runningBar.style.width = `0px`;
      }

      this.elements.loopEndTime.innerHTML = this.settings.loopEndMillisecond;
      this.elements.loopStartTime.innerHTML = this.settings.loopStartMillisecond;

      if (
        this.settings.loopStartMillisecond >
        this.clip.runTimeInfo.currentMillisecond
      ) {
        this.settings.loopJourney = true;
      }
    };

    const onMouseUpLoopStart = e => {
      this.resizeLoop = false;

      e.preventDefault();
      if (this.settings.loopJourney) {
        this.handleDragStart();
        this.handleDrag(this.elements.runningBar.offsetWidth);
        this.handleDragEnd();
        this.settings.loopJourney = false;
      }

      this.elements.loopBar.style.left =
        (this.elements.loopBar.offsetLeft /
          this.elements.totalBar.offsetWidth) *
          100 +
        `%`;

      this.elements.loopBar.style.width =
        (this.elements.loopBar.offsetWidth /
          this.elements.totalBar.offsetWidth) *
          100 +
        `%`;

      this.settings.loopStartMillisecond = Math.round(
        (this.clip.duration * this.elements.loopBar.offsetLeft) /
          this.elements.totalBar.offsetWidth
      );

      this.elements.runningBar.style.width =
        (this.elements.runningBar.offsetWidth /
          this.elements.loopBar.offsetWidth) *
          100 +
        `%`;
      removeListener(`mouseup`, onMouseUpLoopStart, false);
      removeListener(`touchend`, onMouseUpLoopStart, false);
      removeListener(`mousemove`, onCursorMoveLoopStart, false);
      removeListener(`touchmove`, onCursorMoveLoopStart, false);
      this.elements.loopBar.addEventListener(`mousedown`, onMouseDown, false);
      this.elements.loopBar.addEventListener(
        `touchstart`,
        onMouseDown,
        {
          passive: true
        },
        false
      );

      if (this.settings.playAfterResize) {
        if (this.clip.state === `idle`) {
          let loopms;
          if (this.clip.speed >= 0) {
            loopms = this.settings.loopStartMillisecond + 1;
          } else {
            loopms = this.settings.loopEndMillisecond - 1;
          }
          this.settings.needsUpdate = true;
          this.clip.stop();
          this.journey = timeCapsule.startJourney(this.clip);
          this.journey.station(loopms);
          this.journey.destination();
          this.clip.play();
        } else if (this.clip.state === `completed`) {
          let loopms;
          if (this.clip.speed >= 0) {
            loopms = this.settings.loopStartMillisecond + 1;
          } else {
            loopms = this.settings.loopEndMillisecond - 1;
          }
          this.settings.needsUpdate = true;
          this.clip.stop();
          this.journey = timeCapsule.startJourney(this.clip);
          this.journey.station(loopms);
          this.journey.destination();
          this.clip.play();
        } else {
          this.clip.resume();
        }
        this.settings.playAfterResize = false;
      }
    };

    const onMouseDownLoopStart = e => {
      this.resizeLoop = true;

      e.preventDefault();
      this.settings.needsUpdate = true;

      if (this.clip.state === `playing`) {
        this.clip.wait();
        this.settings.playAfterResize = true;
      }

      this.elements.loopBar.removeEventListener(
        `mousedown`,
        onMouseDown,
        false
      );
      this.elements.loopBar.removeEventListener(
        `touchstart`,
        onMouseDown,
        false
      );
      onCursorMoveLoopStart(e);
      addListener(`mouseup`, onMouseUpLoopStart, false);
      addListener(`touchend`, onMouseUpLoopStart, false);
      addListener(`mousemove`, onCursorMoveLoopStart, false);
      addListener(`touchmove`, onCursorMoveLoopStart, false);
    };

    this.elements.loopBarStart.addEventListener(
      `mousedown`,
      onMouseDownLoopStart,
      false
    );
    this.elements.loopBarStart.addEventListener(
      `touchstart`,
      onMouseDownLoopStart,
      {
        passive: true
      },
      false
    );

    const onCursorMoveLoopEnd = e => {
      e.preventDefault();
      const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
      const viewportOffset = this.elements.totalBar.getBoundingClientRect();
      let positionX = clientX - viewportOffset.left;

      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > this.elements.totalBar.offsetWidth) {
        positionX = this.elements.totalBar.offsetWidth;
      }

      if (
        this.elements.runningBar.offsetWidth +
          this.elements.loopBar.offsetLeft >
        positionX
      ) {
        this.elements.runningBar.style.width =
          positionX - this.elements.loopBar.offsetLeft + `px`;
      }

      if (this.settings.loopLastPositionXPxls - positionX < 0) {
        this.elements.loopBar.style.width =
          Math.abs(this.settings.loopLastPositionXPxls - positionX) + `px`;
      } else {
        this.elements.loopBar.style.left = positionX + `px`;
        this.settings.loopLastPositionXPxls = positionX;
      }

      this.settings.loopEndMillisecond = Math.round(
        (this.clip.duration *
          ((parseFloat(this.elements.loopBar.style.left) || 0) +
            parseFloat(this.elements.loopBar.style.width))) /
          this.elements.totalBar.offsetWidth
      );
      if (
        this.settings.loopStartMillisecond > this.settings.loopEndMillisecond
      ) {
        this.settings.loopStartMillisecond = this.settings.loopEndMillisecond;
        this.settings.loopJourney = true;
      }
      this.elements.loopEndTime.innerHTML = this.settings.loopEndMillisecond;
      this.elements.loopStartTime.innerHTML = this.settings.loopStartMillisecond;
    };

    const onMouseUpLoopEnd = e => {
      this.resizeLoop = false;
      e.preventDefault();
      this.elements.runningBar.style.width =
        (this.elements.runningBar.offsetWidth /
          this.elements.loopBar.offsetWidth) *
          100 +
        `%`;

      this.elements.loopBar.style.left =
        (this.elements.loopBar.offsetLeft /
          this.elements.totalBar.offsetWidth) *
          100 +
        `%`;

      this.elements.loopBar.style.width =
        (this.elements.loopBar.offsetWidth /
          this.elements.totalBar.offsetWidth) *
          100 +
        `%`;

      this.settings.loopStartMillisecond = Math.round(
        (this.clip.duration * this.elements.loopBar.offsetLeft) / 100
      );

      if (this.settings.loopJourney) {
        this.handleDragStart();
        this.handleDrag(this.elements.runningBar.offsetWidth);
        this.handleDragEnd();
        this.settings.loopJourney = false;
      }
      removeListener(`mouseup`, onMouseUpLoopEnd, false);
      removeListener(`touchend`, onMouseUpLoopEnd, false);
      removeListener(`mousemove`, onCursorMoveLoopEnd, false);
      removeListener(`touchmove`, onCursorMoveLoopEnd, false);
      this.elements.loopBar.addEventListener(`mousedown`, onMouseDown, false);
      this.elements.loopBar.addEventListener(
        `touchstart`,
        onMouseDown,
        {
          passive: true
        },
        false
      );

      if (this.settings.playAfterResize) {
        if (this.clip.state === `idle`) {
          let loopms;
          if (this.clip.speed >= 0) {
            loopms = this.settings.loopStartMillisecond + 1;
          } else {
            loopms = this.settings.loopEndMillisecond - 1;
          }
          this.settings.needsUpdate = true;
          this.clip.stop();
          this.journey = timeCapsule.startJourney(this.clip);
          this.journey.station(loopms);
          this.journey.destination();
          this.clip.play();
        } else if (this.clip.state === `completed`) {
          let loopms;
          if (this.clip.speed >= 0) {
            loopms = this.settings.loopStartMillisecond + 1;
          } else {
            loopms = this.settings.loopEndMillisecond - 1;
          }
          this.settings.needsUpdate = true;
          this.clip.stop();
          this.journey = timeCapsule.startJourney(this.clip);
          this.journey.station(loopms);
          this.journey.destination();
          this.clip.play();
        } else {
          this.clip.resume();
        }
        this.settings.playAfterResize = false;
      }
    };

    const onMouseDownLoopEnd = e => {
      this.resizeLoop = true;
      this.settings.needsUpdate = true;

      if (this.clip.state === `playing`) {
        this.clip.wait();
        this.settings.playAfterResize = true;
      }
      e.preventDefault();
      this.elements.runningBar.style.width =
        this.elements.runningBar.offsetWidth + `px`;

      this.elements.loopBar.style.left =
        this.elements.loopBar.offsetLeft + `px`;

      this.elements.loopBar.style.width =
        this.elements.loopBar.offsetWidth + `px`;
      this.elements.loopBar.removeEventListener(
        `mousedown`,
        onMouseDown,
        false
      );
      this.elements.loopBar.removeEventListener(
        `touchstart`,
        onMouseDown,
        false
      );
      onCursorMoveLoopEnd(e);
      addListener(`mouseup`, onMouseUpLoopEnd, false);
      addListener(`touchend`, onMouseUpLoopEnd, false);
      addListener(`mousemove`, onCursorMoveLoopEnd, false);
      addListener(`touchmove`, onCursorMoveLoopEnd, false);
    };

    this.elements.loopBarEnd.addEventListener(
      `mousedown`,
      onMouseDownLoopEnd,
      false
    );
    this.elements.loopBarEnd.addEventListener(
      `touchstart`,
      onMouseDownLoopEnd,
      {
        passive: true
      },
      false
    );

    // only on desctop devices
    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      const loopBarMouseInOut = () => {
        if (!this.options.preview) {
          return;
        }
        elid(`${this.name}-hover-display`).classList.toggle(`m-fadeOut`);
        elid(`${this.name}-hover-display`).classList.toggle(`m-fadeIn`);

        if (elid(`${this.name}-hover-display`).className.includes(`m-fadeIn`)) {
          this.previewJourney = hoverTimeCapsule.startJourney(this.previewClip);
        } else {
          this.previewJourney.destination();
        }
        this.elements.loopBar.onmousemove = loopBarMouseMove;
      };

      const loopBarAddListeners = () => {
        if (!this.options.preview) {
          return;
        }
        loopBarMouseInOut();
        this.elements.loopBar.onmouseover = this.elements.loopBar.onmouseout = loopBarMouseInOut;
        this.elements.loopBar.onmousemove = loopBarMouseMove;
        removeListener(`mouseup`, loopBarAddListeners, false);
        removeListener(`touchend`, loopBarAddListeners, false);
        removeListener(`mousemove`, loopBarMouseMove, false);
        removeListener(`touchmove`, loopBarMouseMove, false);
      };

      this.elements.loopBar.onmouseover = this.elements.loopBar.onmouseout = loopBarMouseInOut;

      this.elements.loopBar.onmousedown = () => {
        if (!this.options.preview) {
          return;
        }
        this.elements.loopBar.onmouseover = this.elements.loopBar.onmouseout = null;
        this.elements.loopBar.onmousemove = null;
        addListener(`mouseup`, loopBarAddListeners, false);
        addListener(`touchend`, loopBarAddListeners, false);
        addListener(`mousemove`, loopBarMouseMove, false);
        addListener(`touchmove`, loopBarMouseMove, false);
      };
      this.elements.loopBar.onmouseup = () => {
        if (!this.options.preview) {
          return;
        }
        removeListener(`mouseup`, loopBarAddListeners, false);
        removeListener(`touchend`, loopBarAddListeners, false);
        removeListener(`mousemove`, loopBarMouseMove, false);
        removeListener(`touchmove`, loopBarMouseMove, false);
        this.elements.loopBar.onmouseover = this.elements.loopBar.onmouseout = loopBarMouseInOut;
        this.elements.loopBar.onmousemove = loopBarMouseMove;
      };

      const loopBarMouseMove = e => {
        const clientX = e.clientX;
        const viewportOffset = this.elements.loopBar.getBoundingClientRect();
        if (
          clientX - viewportOffset.left + this.settings.loopLastPositionXPxls >
            this.settings.loopLastPositionXPxls +
              this.elements.loopBar.offsetWidth &&
          !this.resizeLoop
        ) {
          elid(
            `${this.name}-hover-millisecond`
          ).innerHTML = this.settings.loopEndMillisecond;
          return;
        } else if (clientX - viewportOffset.left < 0 && !this.resizeLoop) {
          elid(
            `${this.name}-hover-millisecond`
          ).innerHTML = this.settings.loopStartMillisecond;
          return;
        }

        let positionX =
          clientX - viewportOffset.left + this.settings.loopLastPositionXPxls;

        if (positionX < 0) {
          positionX = 0;
        }

        let left =
          positionX - elid(`${this.name}-hover-display`).offsetWidth / 2;

        if (left < 0) {
          left = 0;
        } else if (
          left + elid(`${this.name}-hover-display`).offsetWidth >
          this.elements.totalBar.offsetWidth
        ) {
          left =
            this.elements.totalBar.offsetWidth -
            elid(`${this.name}-hover-display`).offsetWidth;
        }

        const ms = Math.round(
          (positionX / this.elements.totalBar.offsetWidth) * this.clip.duration
        );
        if (this.options.preview) {
          this.previewJourney.station(ms);
        }

        elid(`${this.name}-hover-millisecond`).innerHTML = ms;
        elid(`${this.name}-hover-display`).style.left = left + `px`;
      };
    }

    el(`body`)[0].addEventListener(`click`, e => {
      if (e.target.className === `${this.name}-speed-value`) {
        let speedDisplay = e.target.dataset.speedValue - 0;
        this.clip.executionSpeed = e.target.dataset.speedValue;
        this.clip.speed == 1
          ? (speedDisplay = `Normal`)
          : (speedDisplay = this.clip.speed);
        this.elements.speedCurrent.innerHTML = speedDisplay;

        const step = 1 / (this.options.speedValues.length - 1);

        const positionY = (e.target.dataset.zone * step - 1) * -1 * 128.5;

        elid(`${this.name}-speed-cursor`).style.top = positionY + `px`;
      }
    });
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
    const css = confStyle(theme, this.name);
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

    const step = 1 / 8;

    const positionY = (targetZone * step - 1) * -1 * 128.5;

    elid(`${this.name}-speed-cursor`).style.top = positionY + `px`;
  }

  createPreviewDisplay() {
    const definition = this.clip.exportState({ unprocessed: true });

    definition.props.host = elid(`${this.name}-hover-display`);
    this.previewClip = MC.ClipFromDefinition(definition, this.clipClass);
    const previewClip = this.previewClip.props.host.getElementsByTagName(
      `iframe`
    )[0];

    previewClip.style.position = `absolute`;

    previewClip.style.zIndex = 1;
    this.setPreviewDimentions();
    this.setPreviewDimentions();
  }

  setPreviewDimentions() {
    const clip = this.clip.props.host.getElementsByTagName(`iframe`)[0];
    const previewClip = this.previewClip.props.host.getElementsByTagName(
      `iframe`
    )[0];

    const clipWidth = clip.offsetWidth;

    const clipHeight = clip.offsetHeight;

    const previewRatio = 0.25;

    let previewWidth = clipWidth * previewRatio;

    // max width is 300
    if (
      previewWidth >
      parseFloat(elid(`${this.name}-hover-display`).style.maxWidth)
    ) {
      previewWidth = parseFloat(
        elid(`${this.name}-hover-display`).style.maxWidth
      );
    }

    elid(`${this.name}-hover-display`).style.width = previewWidth + `px`;

    const previewHeight = (clipHeight / clipWidth) * previewWidth;

    elid(`${this.name}-hover-display`).style.height = previewHeight + `px`;

    const scaleY = previewHeight / clipHeight;
    const scaleX = previewWidth / clipWidth;

    previewClip.style.transform = `scale(${scaleX},${scaleY})`;
    previewClip.style.transformOrigin = `center bottom`;
    previewClip.style.boxSizing = `border-box`;

    // check if width of iframe is percentage
    if (this.clip.props.containerParams.width.includes(`%`)) {
      if (
        previewWidth / previewRatio - 2 / previewRatio >
        parseFloat(elid(`${this.name}-hover-display`).style.maxWidth)
      ) {
        previewClip.style.width = `298px`;
      } else {
        previewClip.style.width =
          previewWidth / previewRatio - 2 / previewRatio + `px`;
      }
    }

    if (this.clip.props.containerParams.height.includes(`%`)) {
      if (
        previewWidth / previewRatio - 2 / previewRatio >
        parseFloat(elid(`${this.name}-hover-display`).style.maxWidth)
      ) {
        previewClip.style.height = (clipHeight / clipWidth) * 300 - 2 + `px`;
      } else {
        previewClip.style.height =
          previewHeight / previewRatio - 2 / previewRatio + `px`;
      }
    }
  }
}

module.exports = Player;
