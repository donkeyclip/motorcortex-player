const MC = require("@kissmybutton/motorcortex");
const helper = new MC.Helper();
const TimeCapsule = require("../node_modules/@kissmybutton/motorcortex/src/_coreUtils/TimeCapsule");
const timeCapsule = new TimeCapsule();
let journey = null;
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

    this.playBtnSVG = `
      <svg width="100%" height="100%" viewBox="0 0 36 36" >
          <path id="play-icon"  data-state="paused"  d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" />
      </svg>
    `;

    this.pauseBtnSVG = `
      <svg width="100%" height="100%" viewBox="0 0 36 36" >
          <path id="pause-icon" data-state="playing" d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" />
      </svg>
    `;

    this.replayBtnSVG = `
      <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
            <path d="M5356.3,4203.8c-1247.8-153.1-2324.2-811.3-3000.7-1839.7c-379.4-578.2-596.5-1209-660.5-1933.4l-27.4-294.8H883.9c-431.9,0-783.9-6.9-783.9-18.3c0-9.2,477.6-493.7,1062.7-1078.7l1062.7-1062.7L3288.1-961.1C3873.1-376,4350.8,108.5,4350.8,117.6c0,11.4-356.5,18.3-790.7,18.3h-793l18.3,189.7C2831,876.3,2991,1338,3288.1,1779.1C4122.3,3026.9,5706,3472.5,7065.8,2841.8C7639.4,2578.9,8197,2035,8487.3,1461.4C8581,1274,8709,896.9,8754.7,666.1c48-246.8,54.8-811.3,9.1-1055.8C8567.3-1491.3,7788-2394,6720.7-2750.5c-315.4-107.4-541.6-139.4-941.6-139.4c-287.9,0-415.9,11.4-598.8,50.3c-523.3,112-973.6,335.9-1371.2,681c-75.4,68.6-148.5,123.4-160,123.4c-9.1,0-187.4-169.1-393.1-374.8c-434.2-434.2-420.5-363.4-105.1-628.5c852.4-710.7,1972.3-1055.8,3046.4-937c1627.2,176,2977.8,1257,3489.8,2790.4c457.1,1368.9,169.1,2843-777,3969.7C8322.7,3484,7417.8,4000.4,6503.6,4160.4C6197.4,4213,5619.2,4235.8,5356.3,4203.8z"/>
            <path d="M4990.7,124.5c0-1503.8,4.6-1794,32-1778c16,9.1,505.1,413.6,1085.6,895.8C7113.8,78.8,7161.8,122.2,7122.9,161c-80,75.4-2109.4,1757.5-2120.8,1757.5C4995.3,1918.5,4990.7,1111.8,4990.7,124.5z"/>
        </g></g>
      </svg>
    `;
    // set clip position to relative
    this.clip.props.host.style.position = "relative";

    // create the timer controls main div
    this.mcPlayer = document.createElement("div");
    this.mcPlayer.id = "mc-player";

    // create the timer controls div
    this.controls = document.createElement("div");
    this.controls.id = "mc-player-controls";

    // create the totalbar
    this.totalBar = document.createElement("div");
    this.totalBar.id = "mc-player-totalbar";

    // create the loopbar
    this.loopBar = document.createElement("div");
    this.loopBar.id = "mc-player-loopbar";

    // create the runningbar
    this.runningBar = document.createElement("div");
    this.runningBar.id = "mc-player-runningbar";

    // create the bar cursor
    this.cursor = document.createElement("div");
    this.cursor.id = "mc-player-cursor";

    // create the status button ( play, pause, transitioning )
    this.statusButton = document.createElement("div");
    this.statusButton.id = "mc-player-status-btn";
    this.statusButton.innerHTML = this.playBtnSVG;
    // time display
    this.timeDisplay = document.createElement("div");
    this.timeDisplay.id = "mc-player-time-display";
    this.currentTime = document.createElement("span");
    this.currentTime.innerHTML = 0;
    this.timeSeperator = document.createElement("span");
    this.timeSeperator.innerHTML = "/";
    this.totalTime = document.createElement("span");
    this.totalTime.innerHTML = this.clip.duration;

    this.previousTimestamp = 0;

    // append elements to each other
    this.runningBar.appendChild(this.cursor);
    this.loopBar.appendChild(this.runningBar);
    this.totalBar.appendChild(this.loopBar);

    this.timeDisplay.appendChild(this.currentTime);
    this.timeDisplay.appendChild(this.timeSeperator);
    this.timeDisplay.appendChild(this.totalTime);

    this.controls.appendChild(this.totalBar);
    this.controls.appendChild(this.statusButton);
    this.controls.appendChild(this.timeDisplay);

    this.mcPlayer.appendChild(this.controls);
    this.clip.props.host.appendChild(this.mcPlayer);

    // style of player to head
    const css = `
    #mc-player {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left:0px;
    }

    #mc-player-controls {
     box-shadow: inset 0px -20px 40px 5px white;
     position: absolute;
     bottom: -40px;
     left: 0px;
     width: 100%;
     height: 40px;
    }

    #mc-player-totalbar {
      width: calc(100% - 20px);
      height: 5px;
      margin: 0px 10px 0px 10px;
      background-color: #505056;
      position: absolute;
      top: 0px;
      left: 0px;
    }

    #mc-player-loopbar{
      position: absolute;
      height:100%;
      top: 0px;
      left:0px;
      right: 0px;
      background-color: #808086;
    }

    #mc-player-runningbar {
      position: relative;
      width: 0px;
      height:100%;
      background-color: red;
    }

    #mc-player-cursor {
      right: 0px;
      top:  0px;
      width: 0px;
      height: 0px;
      position: absolute;
      background-color: red;
      border-radius: 10px;
      z-index: 1;
    }

    #mc-player-time-display {
      width: auto;
      height: 35px;
      line-height: 30px;
      padding: 5px;
      position: absolute;
      left: 45px;
      bottom: 0px;
      color: black;
    }

    #mc-player-status-btn{
      opacity:0.8;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 40px;
      height: 25px;
      position: absolute;
      left: 0px;
      bottom: 0px;
      margin: 10px 5px 5px 5px;
    }

    #mc-player-loopbar:hover{
      cursor:pointer;
    }
    #mc-player-status-btn:hover{
      cursor:pointer;
    }

    #mc-player-status-btn.play{
    }

    #mc-player-status-btn.pause{
    }

    #mc-player-controls:hover #mc-player-cursor {
      right:-8px;
      top: -5px;
      width:16px;
      height:16px;
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      transition: all 0.3s ease;
    }

    #mc-player-cursor:active {
      right:-8px;
      top: -5px;
      width:16px;
      height:16px;
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      transition: all 0.3s ease;
    }

    #mc-player-loopbar:active #mc-player-cursor{
      right:-8px;
      top: -5px;
      width:16px;
      height:16px;
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      transition: all 0.3s ease;
    }

    #mc-player-status-btn:hover {
     opacity:1;
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      transition: all 0.3s ease;
    }
    `;

    const style = document.createElement("style");
    style.styleSheet
      ? (style.styleSheet.cssText = css)
      : style.appendChild(document.createTextNode(css));

    // append player style to document
    document.getElementsByTagName("head")[0].appendChild(style);

    this.subscribeToTimer();
    this.subscribeToEvents();
    this.addEventListeners();
    this.previousTimestamp = 0;
  }

  millisecondChange(millisecond) {
    this.runningBar.style.width =
      (millisecond / this.clip.duration) * this.loopBar.offsetWidth + "px";
    this.currentTime.innerHTML = millisecond;
  }

  eventBroadcast(eventName, meta) {
    if (eventName === "state-change") {
      if (meta.newState === "waiting") {
        this.statusButton.innerHTML = this.playBtnSVG;
      } else if (meta.newState === "playing") {
        this.statusButton.innerHTML = this.pauseBtnSVG;
      } else if (meta.newState === "completed") {
        this.currentTime.innerHTML = this.clip.duration;
        this.statusButton.innerHTML = this.replayBtnSVG;
      } else if (meta.newState === "transitional") {
        this.statusButton.innerHTML = this.playBtnSVG;
      } else if (meta.newState === "idle") {
        this.statusButton.innerHTML = this.playBtnSVG;
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
    // helper.error('Timer is subscirbing to the clips events');
    this.clip.subscribeToEvents(this.id, this.eventBroadcast.bind(this));
  }

  subscribeToTimer() {
    // helper.log('Timer is subscirbing to the clips timer', 'notice');
    this.clip.subscribe(this.id, this.millisecondChange.bind(this));
  }

  handleDragStart() {
    journey = timeCapsule.startJourney(this.clip);
  }

  handleDrag(positionX) {
    const millisecond = Math.round(
      (this.clip.duration * positionX) / this.totalBar.offsetWidth
    );
    this.currentTime.innerHTML = millisecond;
    this.runningBar.style.width = positionX + "px";
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
        journey = timeCapsule.startJourney(this.clip);
        journey.station(0);
        journey.destination();
        this.clip.play();
      }
    };
    this.statusButton.ondblclick = e => {
      e.preventDefault();
    };
    const onCursorMove = e => {
      e.preventDefault();
      const viewportOffset = this.totalBar.getBoundingClientRect();
      let positionX = e.clientX - viewportOffset.left;
      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > this.totalBar.offsetWidth) {
        positionX = this.totalBar.offsetWidth;
      }

      this.handleDrag(positionX);
    };

    const onMouseUp = e => {
      e.preventDefault();
      document.removeEventListener("mouseup", onMouseUp, true);
      document.removeEventListener("mousemove", onCursorMove, true);
      this.handleDragEnd();
    };
    const onMouseDown = e => {
      e.preventDefault();
      this.handleDragStart();
      onCursorMove(e);
      document.addEventListener("mouseup", onMouseUp, true);
      document.addEventListener("mousemove", onCursorMove, true);
    };

    this.loopBar.addEventListener("mousedown", onMouseDown, true);
  }
}

module.exports = Player;
