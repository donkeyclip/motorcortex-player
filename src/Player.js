const MC = require("@kissmybutton/motorcortex");
const helper = new MC.Helper();
const timeCapsule = new MC.TimeCapsule();
let journey = null;
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
    this.loopLastPositionXPercentage = 0;
    this.loopMillisecondStart = 0;
    this.loopJourney = false;
    this.theme = "transparent on-top";
    if (!this.theme.includes("on-top")) {
      this.theme += " position-default";
    }

    const theme = {};
    for (const i in this.theme.split(" ")) {
      const confTheme = confThemes(this.theme.split(" ")[i]);
      for (const q in confTheme) {
        theme[q] = confTheme[q];
      }
    }
    const css = confStyle(theme);
    // set clip position to relative
    this.clip.props.host.style.position = "relative";

    // create the timer controls main div
    this.mcPlayer = document.createElement("div");
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

    let currentSpeed;
    this.clip.speed == 1
      ? (currentSpeed = "Normal")
      : (currentSpeed = this.clip.speed);
    this.speedCurrent.innerHTML = currentSpeed;
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
    const style = document.createElement("style");
    style.styleSheet
      ? (style.styleSheet.cssText = css)
      : style.appendChild(document.createTextNode(css));

    this.loopBarStart.style.left = "0%";
    this.loopBarEnd.style.left = "100%";
    this.loopBarStart.classList.add("m-fadeOut");
    this.loopBarEnd.classList.add("m-fadeOut");

    // append player style to document
    document.getElementsByTagName("head")[0].appendChild(style);

    this.subscribeToTimer();
    this.subscribeToEvents();
    this.addEventListeners();
    this.previousTimestamp = 0;
  }

  millisecondChange(millisecond) {
    const duration = this.clip.duration;

    const loopBarLeftPercentage =
      this.loopBar.style.left.replace("%", "") / 100;

    const loopBarWidth = this.loopBar.offsetWidth;

    const localMillisecond = millisecond - duration * loopBarLeftPercentage;
    // const millisecondDelta = Math.abs(millisecond - localMillisecond);

    const localDuration = (duration / this.totalBar.offsetWidth) * loopBarWidth;

    // if(
    //   this.loopBarStart.className.includes("m-fadeIn") &&
    //   localMillisecond / localDuration > 1 &&
    //   !this.requestingLoop
    // ) {
    //   this.clip.stop();
    //   this.requestingLoop = true;
    //   journey = timeCapsule.startJourney(this.clip);
    //   journey.station(0);
    //   journey.destination();
    // }
    if (localMillisecond / localDuration > 1) {
      this.clip.stop();

      // journey = timeCapsule.startJourney(this.clip);
      // journey.station(0);
      // journey.destination();
      // console.log(this.clip)
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
    } else if (eventName === "duration-change") {
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
    journey = timeCapsule.startJourney(this.clip);
  }

  handleDrag(loopBarPositionX) {
    const duration = this.clip.duration;
    let loopBarPercentageLeft;
    if (this.loopBar.style.left.includes("px")) {
      loopBarPercentageLeft =
        this.loopBar.style.left.replace("px", "") / this.totalBar.offsetWidth;
    } else {
      loopBarPercentageLeft = this.loopBar.style.left.replace("%", "") / 100;
    }

    const totalBarPositionX =
      loopBarPositionX + this.totalBar.offsetWidth * loopBarPercentageLeft;

    const millisecond = Math.round(
      (duration * totalBarPositionX) / this.totalBar.offsetWidth
    );

    this.currentTime.innerHTML = millisecond;
    this.runningBar.style.width =
      (loopBarPositionX / this.loopBar.offsetWidth) * 100 + "%";
    journey.station(millisecond);
  }

  handleDragEnd() {
    journey.destination();
  }

  addEventListeners() {
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
        journey = timeCapsule.startJourney(this.clip);
        journey.station(0);
        journey.destination();
        this.clip.play();
      }
    };

    this.settingsShowIndicator.onclick = e => {
      e.preventDefault();
      const checkbox = document.getElementById(
        "mc-player-show-indicator-checkbox"
      );
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
      document.removeEventListener("mouseup", onMouseUp, false);
      document.removeEventListener("touchend", onMouseUp, false);
      document.removeEventListener("mousemove", onCursorMove, false);
      document.removeEventListener("touchmove", onCursorMove, false);
      this.handleDragEnd();
    };
    const onMouseDown = e => {
      e.preventDefault();
      this.handleDragStart();
      onCursorMove(e);
      document.addEventListener("mouseup", onMouseUp, false);
      document.addEventListener("touchend", onMouseUp, false);
      document.addEventListener("mousemove", onCursorMove, false);
      document.addEventListener("touchmove", onCursorMove, false);
    };

    this.loopBar.addEventListener("mousedown", onMouseDown, false);
    this.loopBar.addEventListener("touchstart", onMouseDown, false);

    const onCursorMoveSpeedBar = e => {
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
      document.getElementById("mc-player-speed-runtime").innerHTML =
        speed + "0";
      this.clip.executionSpeed = speed;
      document.getElementById("mc-player-speed-cursor").style.top =
        positionY + "px";
    };

    const onMouseUpSpeedBar = e => {
      e.preventDefault();
      document.removeEventListener("mouseup", onMouseUpSpeedBar, false);
      document.removeEventListener("touchend", onMouseUpSpeedBar, false);
      document.removeEventListener("mousemove", onCursorMoveSpeedBar, false);
      document.removeEventListener("touchmove", onCursorMoveSpeedBar, false);
      document.getElementById("mc-player-speed-runtime").innerHTML = "Speed";
      let speedDisplay;
      this.clip.speed == 1
        ? (speedDisplay = "Normal")
        : (speedDisplay = this.clip.speed);

      this.speedCurrent.innerHTML = speedDisplay;
    };
    const onMouseDownSpeedBar = e => {
      e.preventDefault();
      onCursorMoveSpeedBar(e);
      document.addEventListener("mouseup", onMouseUpSpeedBar, false);
      document.addEventListener("touchend", onMouseUpSpeedBar, false);
      document.addEventListener("mousemove", onCursorMoveSpeedBar, false);
      document.addEventListener("touchmove", onCursorMoveSpeedBar, false);
    };

    this.speedBarHelper.addEventListener(
      "mousedown",
      onMouseDownSpeedBar,
      false
    );
    this.speedBarHelper.addEventListener(
      "touchstart",
      onMouseDownSpeedBar,
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
      this.loopBarStart.classList.toggle("m-fadeOut");
      this.loopBarStart.classList.toggle("m-fadeIn");
      this.loopBarEnd.classList.toggle("m-fadeOut");
      this.loopBarEnd.classList.toggle("m-fadeIn");
    };

    const onCursorMoveLoopStart = e => {
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
        this.loopBar.style.width.replace("px", "") - loopBarDeltaX + positionX >
        this.totalBar.offsetWidth
      ) {
        this.loopBar.style.width = "0px";
        this.runningBar.style.width = "0px";
      } else {
        this.loopBar.style.width =
          this.loopBar.style.width.replace("px", "") - loopBarDeltaX + "px";
        this.runningBar.style.width = runningBarWidthInPxls + "px";
      }
      this.loopLastPositionXPxls = positionX;

      if (
        this.loopJourney === false &&
        positionX >=
          this.runningBar.offsetWidth +
            this.loopBar.style.left.replace("px", "") -
            0
      ) {
        this.loopJourney = true;
      }
    };

    const onMouseUpLoopStart = e => {
      if (this.loopJourney) {
        this.handleDragStart();
        this.handleDrag(this.runningBar.offsetWidth);
        this.handleDragEnd();
        this.loopJourney = false;
      }

      this.loopLastPositionXPercentage =
        this.loopLastPositionXPxls / this.loopBar.offsetWidth;

      e.preventDefault();
      this.loopMillisecondStart =
        (this.clip.duration * this.loopBar.style.left.replace("%", "")) / 100;
      const runningBarWidthPercentage =
        (this.runningBar.offsetWidth / this.loopBar.offsetWidth) * 100 + "%";

      this.loopBar.style.left =
        (this.loopBar.style.left.replace("px", "") /
          this.totalBar.offsetWidth) *
          100 +
        "%";

      this.loopBar.style.width =
        (this.loopBar.style.width.replace("px", "") /
          this.totalBar.offsetWidth) *
          100 +
        "%";

      this.runningBar.style.width = runningBarWidthPercentage;
      document.removeEventListener("mouseup", onMouseUpLoopStart, false);
      document.removeEventListener("touchend", onMouseUpLoopStart, false);
      document.removeEventListener("mousemove", onCursorMoveLoopStart, false);
      document.removeEventListener("touchmove", onCursorMoveLoopStart, false);
      this.loopBar.addEventListener("mousedown", onMouseDown, false);
      this.loopBar.addEventListener("touchstart", onMouseDown, false);
    };

    const onMouseDownLoopStart = e => {
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
      e.preventDefault();
      onCursorMoveLoopStart(e);
      document.addEventListener("mouseup", onMouseUpLoopStart, false);
      document.addEventListener("touchend", onMouseUpLoopStart, false);
      document.addEventListener("mousemove", onCursorMoveLoopStart, false);
      document.addEventListener("touchmove", onCursorMoveLoopStart, false);
    };

    this.loopBarStart.addEventListener(
      "mousedown",
      onMouseDownLoopStart,
      false
    );
    this.loopBarStart.addEventListener(
      "touchstart",
      onMouseDownLoopStart,
      false
    );

    const onCursorMoveLoopEnd = e => {
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
            this.loopBar.style.left.replace("px", "") -
            0
      ) {
        this.loopJourney = true;
      }

      if (
        this.runningBar.offsetWidth +
          Number(this.loopBar.style.left.replace("px", "")) >
        positionX
      ) {
        this.runningBar.style.width =
          positionX - Number(this.loopBar.style.left.replace("px", "")) + "px";
      }
      if (this.loopLastPositionXPxls - positionX < 0) {
        this.loopBar.style.width =
          Math.abs(this.loopLastPositionXPxls - positionX) + "px";
      } else {
        this.loopBar.style.left = positionX + "px";
        this.loopLastPositionXPxls = positionX;
      }
    };

    const onMouseUpLoopEnd = () => {
      this.runningBar.style.width =
        (this.runningBar.offsetWidth / this.loopBar.offsetWidth) * 100 + "%";
      this.loopBar.style.left =
        (this.loopBar.style.left.replace("px", "") /
          this.totalBar.offsetWidth) *
          100 +
        "%";
      this.loopBar.style.width =
        (this.loopBar.style.width.replace("px", "") /
          this.totalBar.offsetWidth) *
          100 +
        "%";

      this.loopLastPositionXPercentage =
        this.loopLastPositionXPxls / this.loopBar.offsetWidth;

      if (this.loopJourney) {
        this.handleDragStart();
        this.handleDrag(this.runningBar.offsetWidth);
        this.handleDragEnd();
        this.loopJourney = false;
      }
      document.removeEventListener("mouseup", onMouseUpLoopEnd, false);
      document.removeEventListener("touchend", onMouseUpLoopEnd, false);
      document.removeEventListener("mousemove", onCursorMoveLoopEnd, false);
      document.removeEventListener("touchmove", onCursorMoveLoopEnd, false);
      this.loopBar.addEventListener("mousedown", onMouseDown, false);
      this.loopBar.addEventListener("touchstart", onMouseDown, false);
    };

    const onMouseDownLoopEnd = e => {
      this.runningBar.style.width = this.runningBar.offsetWidth + "px";

      this.loopBar.style.left =
        (this.loopBar.style.left.replace("%", "") / 100) *
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
      e.preventDefault();
      onCursorMoveLoopEnd(e);
      document.addEventListener("mouseup", onMouseUpLoopEnd, false);
      document.addEventListener("touchend", onMouseUpLoopEnd, false);
      document.addEventListener("mousemove", onCursorMoveLoopEnd, false);
      document.addEventListener("touchmove", onCursorMoveLoopEnd, false);
    };

    this.loopBarEnd.addEventListener("mousedown", onMouseDownLoopEnd, false);
    this.loopBarEnd.addEventListener("touchstart", onMouseDownLoopEnd, false);

    document.querySelector("body").addEventListener("click", e => {
      if (e.target.className === "mc-player-speed-value") {
        let speedDisplay = e.target.dataset.speedValue - 0;
        this.clip.executionSpeed = e.target.dataset.speedValue;
        this.clip.speed == 1
          ? (speedDisplay = "Normal")
          : (speedDisplay = this.clip.speed);
        this.speedCurrent.innerHTML = speedDisplay;

        const step = 1 / (this.speedValues.length - 1);
        const positionY = (e.target.dataset.zone * step - 1) * -1 * 128.5;

        document.getElementById("mc-player-speed-cursor").style.top =
          positionY + "px";
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
}
const elid = id => document.getElementById(id);
// const elclass = className => document.getElementsByClassName(className);

module.exports = Player;
