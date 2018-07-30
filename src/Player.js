const MC = require("@kissmybutton/motorcortex");
const helper = new MC.Helper();
/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident (such as a Scene or a Clip)
 * can both privide info regarding their timing state but also provide an interface for interacting /
 * altering the timing of it
 */
class Player {
  constructor(options) {
    this.id = options.id || helper.getAnId(); // timer id
    this.status; // play - pause - transitioning
    this.cursor; // the cursor element
    this.totalBar; // the total time bar ( main bar )
    this.loopBar; // the loop bar ( child of main bar )
    this.runningBar; // the running bar ( child of loop bar)
    this.statusButton; // play - pause - transistioning button element
    this.currentTime = 0; // current time in millisecond
    this.totalTime = 0; // total time in milliseconds
    this.clip = options.clip; // host to apply the timer
    // this.subscribeToTimer();
    // this.subscribeToEvents();
    // this.afterRender();
    this.previousTimestamp = 0;
    this.cursorWidth = options.cursorWidth || 10;

    // set clip position to relative
    this.clip.props.host.style.position = "relative";

    // create the timer controls main div
    const mcPlayer = document.createElement("div");
    mcPlayer.id = "mc-player";
    mcPlayer.style.width = "100%";
    mcPlayer.style.height = "100%";
    // mcPlayer.style.backgroundColor = "red";
    // mcPlayer.style.opacity = 0.5;
    mcPlayer.style.position = "absolute";
    mcPlayer.style.desplay = "block";
    mcPlayer.style.top = "0px";
    mcPlayer.style.left = "0px";

    // create the timer controls div
    const controls = document.createElement("div");
    controls.id = "mc-player-controls";
    controls.style.position = "absolute";
    controls.style.left = "0px";
    controls.style.bottom = "0px";
    // controls.style.backgroundColor = "white";
    // controls.style.opacity = 0.5;
    controls.style.width = "100%";
    controls.style.height = "40px";

    // create the totalbar, running bar and loop bar
    const totalBar = document.createElement("div");
    totalBar.id = "mc-player-totalbar";
    totalBar.style.width = "calc(100% - 20px)";
    totalBar.style.height = "5px";
    totalBar.style.marginLeft = "10px";
    totalBar.style.marginRight = "10px";
    totalBar.style.position = "absolute";
    totalBar.style.top = "0px";
    totalBar.style.left = "0px";

    totalBar.style.backgroundColor = "blue";
    // totalBar.style.opacity = 0.5;

    const loopBar = document.createElement("div");
    loopBar.id = "mc-player-loopBar";
    loopBar.style.position = "absolute";
    loopBar.style.top = "0px";
    loopBar.style.left = "0px";
    loopBar.style.right = "0px";

    loopBar.style.backgroundColor = "grey";
    // loopBar.style.opacity = 0.5;

    const runningBar = document.createElement("div");
    runningBar.id = "mc-player-runningbar";
    runningBar.style.width = "0px";
    runningBar.style.height = "5px";
    runningBar.style.position = "relative";

    runningBar.style.backgroundColor = "red";

    const cursor = document.createElement("div");
    cursor.id = "mc-player-cursor";
    cursor.style.position = "absolute";
    // cursor.style.width = "16px";
    // cursor.style.height = "16px";
    cursor.style.borderRadius = "10px";
    cursor.style.backgroundColor = "red";

    runningBar.appendChild(cursor);
    // runningBar.style.opacity = 0.5;

    // status button
    const statusButton = document.createElement("div");
    statusButton.id = "mc-player-status-btn";
    statusButton.style.width = "45px";
    statusButton.style.height = "35px";
    statusButton.style.position = "absolute";
    statusButton.style.left = "0px";
    statusButton.style.bottom = "0px";
    statusButton.classList.add("play");
    // statusButton.style.backgroundColor = "black";
    // statusButton.style.opacity = 0.5;

    // time display
    const timeDisplay = document.createElement("div");
    timeDisplay.id = "mc-player-time-display";
    timeDisplay.style.width = "auto";
    timeDisplay.style.height = "35px";
    timeDisplay.style.lineHeight = "25px";
    timeDisplay.style.padding = "5px";
    timeDisplay.style.position = "absolute";
    timeDisplay.style.left = "45px";
    timeDisplay.style.bottom = "0px";
    // timeDisplay.style.backgroundColor = "orange";
    // timeDisplay.style.opacity = 0.5;
    timeDisplay.style.color = "black";

    const currentTime = document.createElement("span");
    currentTime.innerHTML = "0";
    const timeSeperator = document.createElement("span");
    timeSeperator.innerHTML = "/";
    const totalTime = document.createElement("span");
    totalTime.innerHTML = this.clip.duration;

    loopBar.appendChild(runningBar);
    totalBar.appendChild(loopBar);

    timeDisplay.appendChild(currentTime);
    timeDisplay.appendChild(timeSeperator);
    timeDisplay.appendChild(totalTime);

    controls.appendChild(totalBar);
    controls.appendChild(statusButton);
    controls.appendChild(timeDisplay);

    mcPlayer.appendChild(controls);
    this.clip.props.host.appendChild(mcPlayer);

    // style of player to head
    const css = `
    #mc-player-loopBar:hover{
      cursor:pointer;
    }
    #mc-player-status-btn:hover{
      cursor:pointer;
    }

    #mc-player-status-btn{
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    #mc-player-status-btn.play{
      background-image: url(https://png.icons8.com/metro/1600/play.png); 
    }

    #mc-player-status-btn.pause{
      background-image: url(http://www.free-icons-download.net/images/pause-button-icon-75379.png); 
    }

    #mc-player-controls {
     box-shadow: inset 0px -20px 40px 5px white;
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

    #mc-player-cursor {
      right:0px;
      top: 0px;
      width:0px;
      height:0px;
    }
    `;

    const style = document.createElement("style");
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    document
      .getElementById("mc-player-status-btn")
      .addEventListener("click", function(/*e*/) {
        if (this.className.includes("play")) {
          this.classList.remove("play");
          this.classList.add("pause");
        } else {
          this.classList.remove("pause");
          this.classList.add("play");
        }
      });

    document.getElementsByTagName("head")[0].appendChild(style);

    const move = e => {
      const viewportOffset = this.totalBar.getBoundingClientRect();
      let positionX = e.clientX - viewportOffset.left;
      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > this.totalBar.offsetWidth) {
        positionX = this.totalBar.offsetWidth;
      }

      this.handleDrag(e, null, positionX);
    };
    /* events fired on the draggable target */
    loopBar.addEventListener(
      "mousedown",
      e => {
        move(e);
        document.addEventListener("mousemove", move, true);
      },
      true
    );

    document.addEventListener("mouseup", (/*e*/) => {
      document.removeEventListener("mousemove", move, true);
    });

    this.id = options.id || helper.getAnId(); // timer id
    this.status; // play - pause - transitioning
    this.cursor = cursor; // the cursor element
    this.totalBar = totalBar; // the total time bar ( main bar )
    this.loopBar = loopBar; // the loop bar ( child of main bar )
    this.runningBar = runningBar; // the running bar ( child of loop bar)
    this.statusButton = statusButton; // play - pause - transistioning button element
    this.currentTime = currentTime; // current time in millisecond
    this.totalTime = totalTime; // total time in milliseconds
    this.clip = options.clip; // host to apply the timer
    // this.subscribeToTimer();
    // this.subscribeToEvents();
    // this.afterRender();
    this.previousTimestamp = 0;
    this.cursorWidth = options.cursorWidth || 10;
  }

  // millisecondChange(millisecond, state) {
  //   // helper.log(millisecond);
  //   this.cursor.style.left = `calc(${(millisecond * 100) /
  //     this.clip.duration}% - ${this.cursorWidth}px)`;
  //   this.leftSlot.innerHTML = millisecond;
  //   this.rightSlot.innerHTML = this.clip.duration - millisecond;
  // }

  // eventBroadcast(eventName, meta) {
  //   if (eventName === "state-change") {
  //     if (meta.newState === "waiting") {
  //       this.playButton.innerHTML = "Resume";
  //     } else if (meta.newState === "playing") {
  //       this.playButton.innerHTML = "Pause";
  //     } else if (meta.newState === "completed") {
  //       this.leftSlot.innerHTML = this.clip.duration;
  //       this.rightSlot.innerHTML = 0;
  //       this.playButton.innerHTML = "completed";
  //       helper.log(this.clip);
  //     } else if (meta.newState === "transitional") {
  //       this.playButton.innerHTML = "transitioning";
  //     } else if (meta.newState === "idle") {
  //       this.playButton.innerHTML = "Play";
  //     }
  //   } else if (eventName === "attribute-rejection") {
  //     helper.log(
  //       "Attributes",
  //       meta.attributes,
  //       "have been rejected from animation with id " + meta.animationID
  //     );
  //   } else if (eventName === "animation-rejection") {
  //     helper.log(
  //       "Animation " +
  //         meta.animationID +
  //         " has been rejected as all attributes of it overlap on specific elements because of existing animations"
  //     );
  //   } else if (eventName === "duration-change") {
  //     this.millisecondChange(
  //       this.clip.runTimeInfo.currentMillisecond,
  //       this.clip.state
  //     );
  //   }
  // }

  // subscribeToEvents() {
  //   // helper.error('Timer is subscirbing to the clips events');
  //   this.clip.subscribeToEvents(this.id, this.eventBroadcast.bind(this));
  // }

  // subscribeToTimer() {
  //   // helper.log('Timer is subscirbing to the clips timer', 'notice');
  //   this.clip.subscribe(this.id, this.millisecondChange.bind(this));
  // }

  // handleDragStart(event, pointer) {
  //   // helper.log('drag is starting', 'warning')
  //   journey = timeCapsule.startJourney(this.clip);
  // }

  handleDrag(event, pointer, positionX) {
    const millisecond = Math.round(
      (this.clip.duration * positionX) / this.totalBar.offsetWidth
    );
    this.currentTime.innerHTML = millisecond;
    this.runningBar.style.width = positionX + "px";
    // journey.station(millisecond);
  }

  // handleDragEnd(event, pointer) {
  //   //  Velocity.defaults.speed=1;
  //   // this.previousTimestamp is the target millisecond of the drag

  //   journey.destination();

  //   helper.log(this.clip.exportState());
  // }

  // afterRender() {
  //   const that = this;

  //   this.playButton.onclick = e => {
  //     if (that.clip.state === "playing") {
  //       that.clip.wait();
  //     } else if (that.clip.state === "waiting") {
  //       that.clip.resume();
  //     } else if (that.clip.state === "idle") {
  //       that.clip.play();
  //     }
  //   };

  //   const elem = document.querySelector("#time-cursor");
  //   const draggie = new Draggabilly(elem, {
  //     axis: "x",
  //     containment: ".bar"
  //   });

  //   draggie.on("dragStart", this.handleDragStart.bind(this));
  //   draggie.on("dragMove", (event, pointer) => {
  //     that.handleDrag(event, pointer, draggie.position);
  //   });
  //   draggie.on("dragEnd", this.handleDragEnd.bind(this));
  // }

  // render(container) {}
}

module.exports = Player;
