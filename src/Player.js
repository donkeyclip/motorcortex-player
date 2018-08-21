const MC = require("@kissmybutton/motorcortex");
const helper = new MC.Helper();
const timeCapsule = new MC.TimeCapsule();
const confThemes = require("./themes");
const confStyle = require("./style");
const svg = require("./svg");
const playerHTML = require("./playerHTML");
/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident (such as a Scene or a Clip)
 * can both privide info regarding their timing state but also provide an interface for interacting /
 * altering the timing of it
 */
class Player {
  constructor(options) {
    this.id = options.id || helper.getAnId(); // timer id
    this.clip = options.clip; // host to apply the timer
    this.speedValues = [-4, -2, -1, -0.5, 0, 0.5, 1, 2, 4];
    this.requestingLoop = false;
    this.loopLastPositionXPxls = 0;
    this.playAfterLoopResize = false;
    this.loopLastPositionXPercentage = 0;
    this.journey = null;
    this.loopJourney = false;
    this.needsUpdate = true;
    this.loopStartMillisecond = 0;
    this.loopEndMillisecond = this.clip.duration;
    this.theme = options.theme || "transparent on-top";

    // set clip position to relative
    this.clip.props.host.style.position = "relative";

    // create the timer controls main div
    this.mcPlayer = elcreate("div");
    this.mcPlayer.id = "mc-player";
    this.mcPlayer.innerHTML = playerHTML({ svg });
    elid(this.clip.props.host.id).appendChild(this.mcPlayer);

    this.totalBar = elid("mc-player-totalbar");
    this.loopBar = elid("mc-player-loopbar");
    this.runningBar = elid("mc-player-runningbar");
    this.speedBar = elid("mc-player-speed-value-bar");
    this.speedBarHelper = elid("mc-player-speed-value-helperbar");
    this.indicator = elid("mc-player-indicator");
    this.currentTime = elid("mc-player-time-current");
    this.timeSeparator = elid("mc-player-time-separator");
    this.timeDisplay = elid("mc-player-time-display");
    this.totalTime = elid("mc-player-time-total");
    this.statusButton = elid("mc-player-status-btn");
    this.settingsShowIndicator = elid("mc-player-settings-indicator");
    this.settingsButton = elid("mc-player-settings-btn");
    this.loopButton = elid("mc-player-loop-btn");
    this.settingsSpeedButtonShow = elid("mc-player-settings-speed-show");
    this.settingsSpeedButtonHide = elid("mc-player-settings-speed-hide");
    this.fullScreenButton = elid("mc-player-full-screen-btn");
    this.settingsPanel = elid("mc-player-settings-panel");
    this.settingsMainPanel = elid("mc-player-main-settings");
    this.settingsSpeedPanel = elid("mc-player-speed-settings");
    this.speedCurrent = elid("mc-player-speed-current");
    this.loopBarStart = elid("mc-player-loopbar-start");
    this.loopBarEnd = elid("mc-player-loopbar-end");

    this.currentTime.innerHTML = 0;
    this.totalTime.innerHTML = this.clip.duration;
    this.timeSeparator.innerHTML = "/";
    this.settingsSpeedPanel.style.display = "none";
    this.settingsPanel.classList.add("m-fadeOut");
    this.indicator.style.visibility = "hidden";
    this.indicator.innerHTML = "Idle";

    this.settingsSpeedPanel
      .getElementsByTagName("li")[1]
      .classList.add("no-hover");

    this.loopBarStart.style.left = "0%";
    this.loopBarEnd.style.left = "100%";
    this.loopBarStart.classList.add("m-fadeOut");
    this.loopBarEnd.classList.add("m-fadeOut");

    this.setSpeed();
    this.setTheme();
    this.subscribeToTimer();
    this.subscribeToEvents();
    this.addEventListeners();
  }

  millisecondChange(millisecond) {
    if (!this.needsUpdate) {
      this.clip.wait();
      return 1;
    }
    const duration = this.clip.duration;

    // zero value if style.left is null
    const loopBarLeftPercentage =
      parseFloat(this.loopBar.style.left) / 100 || 0;

    const loopBarWidth = this.loopBar.offsetWidth;

    const localMillisecond = millisecond - duration * loopBarLeftPercentage;

    const localDuration = (duration / this.totalBar.offsetWidth) * loopBarWidth;
    if (
      millisecond >= this.loopEndMillisecond &&
      this.loopButton.className.includes("svg-selected")
    ) {
      this.needsUpdate = false;
      setTimeout(() => {
        this.journey = timeCapsule.startJourney(this.clip);
        this.journey.station(this.loopStartMillisecond + 1);
        this.journey.destination();
        this.clip.resume();
        this.needsUpdate = true;
      }, 0);
      return 1;
    } else if (
      millisecond <= this.loopStartMillisecond &&
      this.loopButton.className.includes("svg-selected")
    ) {
      this.needsUpdate = false;
      setTimeout(() => {
        this.journey = timeCapsule.startJourney(this.clip);
        this.journey.station(this.loopEndMillisecond - 1);
        this.journey.destination();
        this.clip.resume();
        this.needsUpdate = true;
      }, 0);
      return 1;
    } else if (millisecond >= this.loopEndMillisecond) {
      this.needsUpdate = false;
      setTimeout(() => {
        this.journey = timeCapsule.startJourney(this.clip);
        this.journey.station(this.loopEndMillisecond);
        this.journey.destination();
        this.clip.wait();
      }, 0);
      this.runningBar.style.width = "100%";
      this.currentTime.innerHTML = this.loopEndMillisecond;
      return 1;
    } else if (millisecond <= this.loopStartMillisecond) {
      this.needsUpdate = false;
      setTimeout(() => {
        this.journey = timeCapsule.startJourney(this.clip);
        this.journey.station(this.loopStartMillisecond);
        this.journey.destination();
        this.clip.wait();
      }, 0);
      this.runningBar.style.width = "100%";
      this.currentTime.innerHTML = this.loopStartMillisecond;
      return 1;
    }

    this.runningBar.style.width =
      (localMillisecond / localDuration) * 100 + "%";

    this.currentTime.innerHTML = millisecond;
  }

  eventBroadcast(eventName, meta) {
    if (eventName === "state-change") {
      if (meta.newState === "waiting") {
        this.statusButton.innerHTML = svg.playSVG;
        this.statusButton.appendChild(this.indicator);
        this.indicator.innerHTML = "Waiting";
      } else if (meta.newState === "playing") {
        this.statusButton.innerHTML = svg.pauseSVG;
        this.statusButton.appendChild(this.indicator);
        this.indicator.innerHTML = "Playing";
      } else if (meta.newState === "completed") {
        this.currentTime.innerHTML = this.clip.duration;
        this.statusButton.innerHTML = svg.replaySVG;
        this.statusButton.appendChild(this.indicator);
        this.indicator.innerHTML = "Completed";
      } else if (meta.newState === "transitional") {
        this.statusButton.innerHTML = svg.playSVG;
        this.statusButton.appendChild(this.indicator);
        this.indicator.innerHTML = "Transitional";
      } else if (meta.newState === "idle") {
        this.statusButton.innerHTML = svg.playSVG;
        this.statusButton.appendChild(this.indicator);
        this.indicator.innerHTML = "Idle";
      }
    } else if (eventName === "attribute-rejection") {
      helper.log(
        "Attributes",
        meta.attributes,
        "have been rejected from animation with id " + meta.animationID
      );
    } else if (eventName === "animation-rejection") {
      helper.log(
        "Animation " +
          meta.animationID +
          " has been rejected as all attributes of it overlap on specific elements because of existing animations"
      );
    } else if (eventName === "duration-change" && this.needsUpdate) {
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
    this.needsUpdate = true;
    this.journey = timeCapsule.startJourney(this.clip);
  }

  handleDrag(loopBarPositionX) {
    const duration = this.clip.duration;

    let loopBarPercentageLeft;

    if (this.loopBar.style.left.includes("px")) {
      loopBarPercentageLeft =
        parseFloat(this.loopBar.style.left) / this.totalBar.offsetWidth || 0;
    } else {
      loopBarPercentageLeft = parseFloat(this.loopBar.style.left) / 100 || 0;
    }

    const totalBarPositionX =
      loopBarPositionX + this.totalBar.offsetWidth * loopBarPercentageLeft;

    const millisecond = Math.round(
      (duration * totalBarPositionX) / this.totalBar.offsetWidth
    );

    this.currentTime.innerHTML = millisecond;

    this.runningBar.style.width =
      (loopBarPositionX / this.loopBar.offsetWidth) * 100 + "%";

    this.journey.station(millisecond);
  }

  handleDragEnd() {
    this.journey.destination();
  }

  addEventListeners() {
    /* 
    * Play - pause - replay interactions
    */

    this.statusButton.onclick = e => {
      e.preventDefault();
      if (this.clip.state === "playing") {
        this.clip.wait();
      } else if (this.clip.state === "waiting") {
        this.clip.resume();
      } else if (this.clip.state === "idle") {
        this.clip.play();
      } else if (this.clip.state === "completed") {
        // this.clip.stop()
        this.journey = timeCapsule.startJourney(this.clip);
        this.journey.station(0);
        this.journey.destination();
        this.clip.play();
      }
    };

    this.settingsShowIndicator.onclick = e => {
      e.preventDefault();
      const checkbox = elid("mc-player-show-indicator-checkbox");
      if (checkbox.checked) {
        checkbox.checked = false;
        this.indicator.style.visibility = "hidden";
        this.statusButton.style.margin = "10px 5px 5px 5px";
        this.statusButton.style.height = "25px";
        this.statusButton.style.width = "45px";
        this.timeDisplay.style.left = "50px";
      } else {
        checkbox.checked = true;
        this.indicator.style.visibility = "visible";
        this.statusButton.style.margin = "10px 5px 12px 5px";
        this.statusButton.style.width = "55px";
        this.timeDisplay.style.left = "60px";
        this.statusButton.style.height = "18px";
      }
    };

    this.settingsButton.onclick = e => {
      e.preventDefault();
      this.settingsPanel.classList.toggle("m-fadeOut");
      this.settingsPanel.classList.toggle("m-fadeIn");
    };

    this.settingsSpeedButtonShow.onclick = this.settingsSpeedButtonHide.onclick = e => {
      e.preventDefault();
      this.settingsPanel.classList.toggle("mc-player-settings-speed-panel");
      const includesClass = this.settingsPanel.className.includes(
        "mc-player-settings-speed-panel"
      );
      if (includesClass) {
        this.settingsMainPanel.style.display = "none";
        this.settingsSpeedPanel.style.display = "block";
      } else {
        this.settingsSpeedPanel.style.display = "none";
        this.settingsMainPanel.style.display = "block";
      }
    };

    const onCursorMove = e => {
      e.preventDefault();
      const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
      const viewportOffset = this.loopBar.getBoundingClientRect();
      let positionX = clientX - viewportOffset.left;
      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > this.loopBar.offsetWidth) {
        positionX = this.loopBar.offsetWidth;
      }

      this.handleDrag(positionX);
    };

    const onMouseUp = e => {
      e.preventDefault();
      removeListener("mouseup", onMouseUp, false);
      removeListener("touchend", onMouseUp, false);
      removeListener("mousemove", onCursorMove, false);
      removeListener("touchmove", onCursorMove, false);
      this.handleDragEnd();
    };
    const onMouseDown = e => {
      e.preventDefault();
      this.handleDragStart();
      onCursorMove(e);
      addListener("mouseup", onMouseUp, false);
      addListener("touchend", onMouseUp, false);
      addListener("mousemove", onCursorMove, false);
      addListener("touchmove", onCursorMove, false);
    };

    this.loopBar.addEventListener("mousedown", onMouseDown, false);
    this.loopBar.addEventListener(
      "touchstart",
      onMouseDown,
      {
        passive: true
      },
      false
    );

    const onCursorMoveSpeedBar = e => {
      e.preventDefault();
      const viewportOffset = this.speedBar.getBoundingClientRect();
      const clientY = e.clientY || ((e.touches || [])[0] || {}).clientY;
      let positionY = clientY - viewportOffset.top;
      positionY -= 8;
      if (positionY < 0) {
        positionY = 0;
      } else if (positionY > this.speedBar.offsetHeight - 15.5) {
        positionY = this.speedBar.offsetHeight - 15.5;
      }

      // show speed
      const percentage = (positionY / 128.5 - 1) * -1;
      const step = 1 / 8;
      const speed = this.calculateSpeed(step, this.speedValues, percentage);
      elid("mc-player-speed-runtime").innerHTML = speed + "0";
      elid("mc-player-speed-cursor").style.top = positionY + "px";
      this.clip.executionSpeed = speed;
    };

    const onMouseUpSpeedBar = e => {
      e.preventDefault();
      removeListener("mouseup", onMouseUpSpeedBar, false);
      removeListener("touchend", onMouseUpSpeedBar, false);
      removeListener("mousemove", onCursorMoveSpeedBar, false);
      removeListener("touchmove", onCursorMoveSpeedBar, false);
      elid("mc-player-speed-runtime").innerHTML = "Speed";
      let speedDisplay;
      this.clip.speed == 1
        ? (speedDisplay = "Normal")
        : (speedDisplay = this.clip.speed);

      this.speedCurrent.innerHTML = speedDisplay;
    };
    const onMouseDownSpeedBar = e => {
      e.preventDefault();
      onCursorMoveSpeedBar(e);
      addListener("mouseup", onMouseUpSpeedBar, false);
      addListener("touchend", onMouseUpSpeedBar, false);
      addListener("mousemove", onCursorMoveSpeedBar, false);
      addListener("touchmove", onCursorMoveSpeedBar, false);
    };

    this.speedBarHelper.addEventListener(
      "mousedown",
      onMouseDownSpeedBar,
      false
    );
    this.speedBarHelper.addEventListener(
      "touchstart",
      onMouseDownSpeedBar,
      {
        passive: true
      },
      false
    );

    this.fullScreenButton.addEventListener("click", () => {
      const elFullScreen = this.clip.props.host.className.includes(
        "full-screen"
      );
      elFullScreen
        ? this.exitFullscreen()
        : this.launchIntoFullscreen(this.clip.props.host);
      this.clip.props.host.classList.toggle("full-screen");
    });

    this.loopButton.onclick = () => {
      this.loopButton.classList.toggle("svg-selected");
      this.loopBarStart.classList.toggle("m-fadeOut");
      this.loopBarEnd.classList.toggle("m-fadeOut");
      this.loopBarStart.classList.toggle("m-fadeIn");
      this.loopBarEnd.classList.toggle("m-fadeIn");
      this.needsUpdate = true;
    };

    elid("mc-player-controls").onmouseover = () => {
      if (!this.loopButton.className.includes("svg-selected")) {
        return;
      }
      this.loopBarStart.classList.remove("m-fadeOut");
      this.loopBarEnd.classList.remove("m-fadeOut");
      this.loopBarStart.classList.add("m-fadeIn");
      this.loopBarEnd.classList.add("m-fadeIn");
    };
    elid("mc-player-controls").onmouseout = () => {
      if (!this.loopButton.className.includes("svg-selected")) {
        return;
      }
      this.loopBarStart.classList.add("m-fadeOut");
      this.loopBarEnd.classList.add("m-fadeOut");
      this.loopBarStart.classList.remove("m-fadeIn");
      this.loopBarEnd.classList.remove("m-fadeIn");
    };

    const onCursorMoveLoopStart = e => {
      e.preventDefault();
      const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
      const viewportOffset = this.totalBar.getBoundingClientRect();
      let positionX = Math.round(clientX - viewportOffset.left);
      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > this.totalBar.offsetWidth) {
        positionX = this.totalBar.offsetWidth;
      }

      const loopBarDeltaX = positionX - this.loopLastPositionXPxls || 0;
      const runningBarWidthInPxls = this.runningBar.offsetWidth - loopBarDeltaX;

      this.loopBar.style.left = positionX + "px";

      if (
        parseFloat(this.loopBar.style.width) - loopBarDeltaX + positionX >
        this.totalBar.offsetWidth
      ) {
        this.loopBar.style.width = "0px";
        this.runningBar.style.width = "0px";
      } else {
        this.loopBar.style.width =
          parseFloat(this.loopBar.style.width) - loopBarDeltaX + "px";
        this.runningBar.style.width = runningBarWidthInPxls + "px";
      }
      this.loopLastPositionXPxls = positionX;

      // const checkRightLimit =
      //   parseFloat(this.loopBar.style.left) +
      //   this.loopBar.offsetWidth -
      //   parseFloat(elid("mc-player-loopbar-end-time").style.right);

      const loopTimeWidth =
        parseFloat(elid("mc-player-loopbar-start-time").style.left) +
        elid("mc-player-loopbar-start-time").offsetWidth +
        elid("mc-player-loopbar-end-time").offsetWidth -
        parseFloat(elid("mc-player-loopbar-end-time").style.right);

      const loopTimePosition = loopTimeWidth - this.loopBar.offsetWidth;

      if (
        this.loopBar.offsetWidth <
        elid("mc-player-loopbar-start-time").offsetWidth +
          elid("mc-player-loopbar-end-time").offsetWidth
      ) {
        elid("mc-player-loopbar-start-time").style.left =
          "-" + loopTimePosition / 2 + "px";
        elid("mc-player-loopbar-end-time").style.right =
          "-" + loopTimePosition / 2 + "px";
      } else {
        elid("mc-player-loopbar-start-time").style.left = "0px";
        elid("mc-player-loopbar-end-time").style.right = "0px";
      }

      if (
        this.loopJourney === false &&
        positionX >=
          this.runningBar.offsetWidth + parseFloat(this.loopBar.style.left)
      ) {
        this.loopJourney = true;
      }

      this.loopStartMillisecond = Math.round(
        (this.clip.duration * parseFloat(this.loopBar.style.left)) /
          this.totalBar.offsetWidth
      );

      this.loopEndMillisecond = Math.round(
        (this.clip.duration *
          ((parseFloat(this.loopBar.style.left) || 0) +
            parseFloat(this.loopBar.style.width))) /
          this.totalBar.offsetWidth
      );

      elid("mc-player-loopbar-end-time").innerHTML = this.loopEndMillisecond;
      elid(
        "mc-player-loopbar-start-time"
      ).innerHTML = this.loopStartMillisecond;
    };

    const onMouseUpLoopStart = e => {
      e.preventDefault();
      if (this.loopJourney) {
        this.handleDragStart();
        this.handleDrag(this.runningBar.offsetWidth);
        this.handleDragEnd();
        this.loopJourney = false;
      }

      this.loopLastPositionXPercentage =
        this.loopLastPositionXPxls / this.loopBar.offsetWidth;

      const runningBarWidthPercentage =
        (this.runningBar.offsetWidth / this.loopBar.offsetWidth) * 100 + "%";

      this.loopBar.style.left =
        (parseFloat(this.loopBar.style.left) / this.totalBar.offsetWidth) *
          100 +
        "%";

      this.loopBar.style.width =
        (parseFloat(this.loopBar.style.width) / this.totalBar.offsetWidth) *
          100 +
        "%";

      this.loopStartMillisecond = Math.round(
        (this.clip.duration * parseFloat(this.loopBar.style.left)) / 100
      );

      this.loopEndMillisecond = Math.round(
        (this.clip.duration *
          ((parseFloat(this.loopBar.style.left) || 0) +
            parseFloat(this.loopBar.style.width))) /
          100
      );

      this.runningBar.style.width = runningBarWidthPercentage;
      removeListener("mouseup", onMouseUpLoopStart, false);
      removeListener("touchend", onMouseUpLoopStart, false);
      removeListener("mousemove", onCursorMoveLoopStart, false);
      removeListener("touchmove", onCursorMoveLoopStart, false);
      this.loopBar.addEventListener("mousedown", onMouseDown, false);
      this.loopBar.addEventListener(
        "touchstart",
        onMouseDown,
        {
          passive: true
        },
        false
      );

      if (this.playAfterLoopResize) {
        this.clip.resume();
        this.playAfterLoopResize = false;
      }
    };

    const onMouseDownLoopStart = e => {
      e.preventDefault();
      this.needsUpdate = true;

      if (this.clip.state === "playing") {
        this.clip.wait();
        this.playAfterLoopResize = true;
      }
      this.loopBar.style.width = this.loopBar.offsetWidth + "px";

      if (
        this.loopLastPositionXPxls -
          this.loopLastPositionXPercentage * this.loopBar.offsetWidth >
          1 ||
        this.loopLastPositionXPercentage * this.loopBar.offsetWidth -
          this.loopLastPositionXPxls >
          1
      ) {
        this.loopLastPositionXPxls =
          this.loopLastPositionXPercentage * this.loopBar.offsetWidth;
      }

      this.loopBar.removeEventListener("mousedown", onMouseDown, false);
      this.loopBar.removeEventListener("touchstart", onMouseDown, false);
      onCursorMoveLoopStart(e);
      addListener("mouseup", onMouseUpLoopStart, false);
      addListener("touchend", onMouseUpLoopStart, false);
      addListener("mousemove", onCursorMoveLoopStart, false);
      addListener("touchmove", onCursorMoveLoopStart, false);
    };

    this.loopBarStart.addEventListener(
      "mousedown",
      onMouseDownLoopStart,
      false
    );
    this.loopBarStart.addEventListener(
      "touchstart",
      onMouseDownLoopStart,
      {
        passive: true
      },
      false
    );

    const onCursorMoveLoopEnd = e => {
      e.preventDefault();

      const clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
      const viewportOffset = this.totalBar.getBoundingClientRect();
      let positionX = Math.round(clientX - viewportOffset.left);
      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > this.totalBar.offsetWidth) {
        positionX = this.totalBar.offsetWidth;
      }

      if (
        this.loopJourney === false &&
        positionX <=
          this.runningBar.offsetWidth +
            (parseFloat(this.loopBar.style.left) || 0)
      ) {
        this.loopJourney = true;
      }

      if (
        this.runningBar.offsetWidth +
          (parseFloat(this.loopBar.style.left) || 0) >
        positionX
      ) {
        this.runningBar.style.width =
          positionX - parseFloat(this.loopBar.style.left) + "px";
      }

      if (this.loopLastPositionXPxls - positionX < 0) {
        this.loopBar.style.width =
          Math.abs(this.loopLastPositionXPxls - positionX) + "px";
      } else {
        this.loopBar.style.left = positionX + "px";
        this.loopLastPositionXPxls = positionX;
      }

      this.loopStartMillisecond = Math.round(
        (this.clip.duration * parseFloat(this.loopBar.style.left)) /
          this.totalBar.offsetWidth
      );

      this.loopEndMillisecond = Math.round(
        (this.clip.duration *
          ((parseFloat(this.loopBar.style.left) || 0) +
            parseFloat(this.loopBar.style.width))) /
          this.totalBar.offsetWidth
      );

      const loopTimeWidth =
        parseFloat(elid("mc-player-loopbar-start-time").style.left) +
        elid("mc-player-loopbar-start-time").offsetWidth +
        elid("mc-player-loopbar-end-time").offsetWidth -
        parseFloat(elid("mc-player-loopbar-end-time").style.right);

      const loopTimePosition = loopTimeWidth - this.loopBar.offsetWidth;

      if (
        this.loopBar.offsetWidth <
        elid("mc-player-loopbar-start-time").offsetWidth +
          elid("mc-player-loopbar-end-time").offsetWidth
      ) {
        elid("mc-player-loopbar-start-time").style.left =
          "-" + loopTimePosition / 2 + "px";
        elid("mc-player-loopbar-end-time").style.right =
          "-" + loopTimePosition / 2 + "px";
      } else {
        elid("mc-player-loopbar-start-time").style.left = "0px";
        elid("mc-player-loopbar-end-time").style.right = "0px";
      }

      elid("mc-player-loopbar-end-time").innerHTML = this.loopEndMillisecond;
      elid(
        "mc-player-loopbar-start-time"
      ).innerHTML = this.loopStartMillisecond;
    };

    const onMouseUpLoopEnd = e => {
      e.preventDefault();
      this.runningBar.style.width =
        (this.runningBar.offsetWidth / this.loopBar.offsetWidth) * 100 + "%";

      this.loopBar.style.left =
        ((parseFloat(this.loopBar.style.left) || 0) /
          this.totalBar.offsetWidth) *
          100 +
        "%";

      this.loopBar.style.width =
        (parseFloat(this.loopBar.style.width) / this.totalBar.offsetWidth) *
          100 +
        "%";

      this.loopLastPositionXPercentage =
        this.loopLastPositionXPxls / this.loopBar.offsetWidth;

      this.loopStartMillisecond = Math.round(
        (this.clip.duration * parseFloat(this.loopBar.style.left)) / 100
      );

      this.loopEndMillisecond = Math.round(
        (this.clip.duration *
          ((parseFloat(this.loopBar.style.left) || 0) +
            parseFloat(this.loopBar.style.width))) /
          100
      );

      if (this.loopJourney) {
        this.handleDragStart();
        this.handleDrag(this.runningBar.offsetWidth);
        this.handleDragEnd();
        this.loopJourney = false;
      }
      removeListener("mouseup", onMouseUpLoopEnd, false);
      removeListener("touchend", onMouseUpLoopEnd, false);
      removeListener("mousemove", onCursorMoveLoopEnd, false);
      removeListener("touchmove", onCursorMoveLoopEnd, false);
      this.loopBar.addEventListener("mousedown", onMouseDown, false);
      this.loopBar.addEventListener(
        "touchstart",
        onMouseDown,
        {
          passive: true
        },
        false
      );

      if (this.playAfterLoopResize) {
        this.clip.resume();
        this.playAfterLoopResize = false;
      }
    };

    const onMouseDownLoopEnd = e => {
      this.needsUpdate = true;

      if (this.clip.state === "playing") {
        this.clip.wait();
        this.playAfterLoopResize = true;
      }
      e.preventDefault();
      this.runningBar.style.width = this.runningBar.offsetWidth + "px";

      this.loopBar.style.left =
        ((parseFloat(this.loopBar.style.left) || 0) / 100) *
          this.totalBar.offsetWidth +
        "px";

      if (
        this.loopLastPositionXPxls -
          this.loopLastPositionXPercentage * this.loopBar.offsetWidth >
          1 ||
        this.loopLastPositionXPercentage * this.loopBar.offsetWidth -
          this.loopLastPositionXPxls >
          1
      ) {
        this.loopLastPositionXPxls =
          this.loopLastPositionXPercentage * this.loopBar.offsetWidth;
      }

      this.loopBar.style.width = this.loopBar.offsetWidth + "px";
      this.loopBar.removeEventListener("mousedown", onMouseDown, false);
      this.loopBar.removeEventListener("touchstart", onMouseDown, false);
      onCursorMoveLoopEnd(e);
      addListener("mouseup", onMouseUpLoopEnd, false);
      addListener("touchend", onMouseUpLoopEnd, false);
      addListener("mousemove", onCursorMoveLoopEnd, false);
      addListener("touchmove", onCursorMoveLoopEnd, false);
    };

    this.loopBarEnd.addEventListener("mousedown", onMouseDownLoopEnd, false);
    this.loopBarEnd.addEventListener(
      "touchstart",
      onMouseDownLoopEnd,
      {
        passive: true
      },
      false
    );

    el("body")[0].addEventListener("click", e => {
      if (e.target.className === "mc-player-speed-value") {
        let speedDisplay = e.target.dataset.speedValue - 0;
        this.clip.executionSpeed = e.target.dataset.speedValue;
        this.clip.speed == 1
          ? (speedDisplay = "Normal")
          : (speedDisplay = this.clip.speed);
        this.speedCurrent.innerHTML = speedDisplay;

        const step = 1 / (this.speedValues.length - 1);

        const positionY = (e.target.dataset.zone * step - 1) * -1 * 128.5;

        elid("mc-player-speed-cursor").style.top = positionY + "px";
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
      return "0.0";
    }
    return realSpeed;
  }

  launchIntoFullscreen(element) {
    this.mcPlayer.classList.toggle("full-screen");
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
    this.mcPlayer.classList.toggle("full-screen");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  setTheme() {
    if (!this.theme.includes("on-top")) {
      this.theme += " position-default";
      // replace multiple spaces with one space
      this.theme.replace(/\s\s+/g, " ");
    }

    const theme = {};
    for (const i in this.theme.split(" ")) {
      const confTheme = confThemes(this.theme.split(" ")[i]);
      for (const q in confTheme) {
        theme[q] = confTheme[q];
      }
    }
    const css = confStyle(theme);

    const style = elcreate("style");

    style.styleSheet
      ? (style.styleSheet.cssText = css)
      : style.appendChild(document.createTextNode(css));

    // append player style to document
    eltag("head")[0].appendChild(style);
  }

  setSpeed() {
    let currentSpeed;
    this.clip.speed == 1
      ? (currentSpeed = "Normal")
      : (currentSpeed = this.clip.speed);
    this.speedCurrent.innerHTML = currentSpeed;

    const targetZone = (() => {
      for (let i = 0; i < this.speedValues.length - 1; i++) {
        if (
          this.speedValues[i] <= this.clip.speed &&
          this.speedValues[i + 1] > this.clip.speed
        ) {
          return (
            i +
            Math.abs(
              (this.clip.speed - this.speedValues[i]) /
                (this.speedValues[i] - this.speedValues[i + 1])
            )
          );
        }
      }
    })();

    const step = 1 / 8;

    const positionY = (targetZone * step - 1) * -1 * 128.5;

    elid("mc-player-speed-cursor").style.top = positionY + "px";
  }
}

const el = selector => document.querySelectorAll(selector);
const elid = id => document.getElementById(id);
const eltag = tag => document.getElementsByTagName(tag);
const elcreate = tag => document.createElement(tag);
const addListener = function() {
  return document.addEventListener(...arguments);
};
const removeListener = function() {
  return document.removeEventListener(...arguments);
};

module.exports = Player;
