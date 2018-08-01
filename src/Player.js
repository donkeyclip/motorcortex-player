const MC = require("@kissmybutton/motorcortex");
const helper = new MC.Helper();
const timeCapsule = new MC.TimeCapsule();
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
    this.speedValues = [-4, -2, -1, -0.5, 0, 0.5, 1, 2, 4];
    this.playSVG = `
      <svg width="100%" height="100%" viewBox="0 0 36 36" >
          <path id="play-icon"  data-state="paused"  d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" />
      </svg>
    `;

    this.pauseSVG = `
      <svg width="100%" height="100%" viewBox="0 0 36 36" >
          <path id="pause-icon" data-state="playing" d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" />
      </svg>
    `;

    this.replaySVG = `
      <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
            <path d="M5356.3,4203.8c-1247.8-153.1-2324.2-811.3-3000.7-1839.7c-379.4-578.2-596.5-1209-660.5-1933.4l-27.4-294.8H883.9c-431.9,0-783.9-6.9-783.9-18.3c0-9.2,477.6-493.7,1062.7-1078.7l1062.7-1062.7L3288.1-961.1C3873.1-376,4350.8,108.5,4350.8,117.6c0,11.4-356.5,18.3-790.7,18.3h-793l18.3,189.7C2831,876.3,2991,1338,3288.1,1779.1C4122.3,3026.9,5706,3472.5,7065.8,2841.8C7639.4,2578.9,8197,2035,8487.3,1461.4C8581,1274,8709,896.9,8754.7,666.1c48-246.8,54.8-811.3,9.1-1055.8C8567.3-1491.3,7788-2394,6720.7-2750.5c-315.4-107.4-541.6-139.4-941.6-139.4c-287.9,0-415.9,11.4-598.8,50.3c-523.3,112-973.6,335.9-1371.2,681c-75.4,68.6-148.5,123.4-160,123.4c-9.1,0-187.4-169.1-393.1-374.8c-434.2-434.2-420.5-363.4-105.1-628.5c852.4-710.7,1972.3-1055.8,3046.4-937c1627.2,176,2977.8,1257,3489.8,2790.4c457.1,1368.9,169.1,2843-777,3969.7C8322.7,3484,7417.8,4000.4,6503.6,4160.4C6197.4,4213,5619.2,4235.8,5356.3,4203.8z"/>
            <path d="M4990.7,124.5c0-1503.8,4.6-1794,32-1778c16,9.1,505.1,413.6,1085.6,895.8C7113.8,78.8,7161.8,122.2,7122.9,161c-80,75.4-2109.4,1757.5-2120.8,1757.5C4995.3,1918.5,4990.7,1111.8,4990.7,124.5z"/>
        </g></g>
      </svg>
    `;

    this.settingsSVG = `
      <svg width="100%" height="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 268.765 268.765" style="enable-background:new 0 0 268.765 268.765;" xml:space="preserve">
      <g id="Settings">
        <g>
          <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M267.92,119.461c-0.425-3.778-4.83-6.617-8.639-6.617
            c-12.315,0-23.243-7.231-27.826-18.414c-4.682-11.454-1.663-24.812,7.515-33.231c2.889-2.641,3.24-7.062,0.817-10.133
            c-6.303-8.004-13.467-15.234-21.289-21.5c-3.063-2.458-7.557-2.116-10.213,0.825c-8.01,8.871-22.398,12.168-33.516,7.529
            c-11.57-4.867-18.866-16.591-18.152-29.176c0.235-3.953-2.654-7.39-6.595-7.849c-10.038-1.161-20.164-1.197-30.232-0.08
            c-3.896,0.43-6.785,3.786-6.654,7.689c0.438,12.461-6.946,23.98-18.401,28.672c-10.985,4.487-25.272,1.218-33.266-7.574
            c-2.642-2.896-7.063-3.252-10.141-0.853c-8.054,6.319-15.379,13.555-21.74,21.493c-2.481,3.086-2.116,7.559,0.802,10.214
            c9.353,8.47,12.373,21.944,7.514,33.53c-4.639,11.046-16.109,18.165-29.24,18.165c-4.261-0.137-7.296,2.723-7.762,6.597
            c-1.182,10.096-1.196,20.383-0.058,30.561c0.422,3.794,4.961,6.608,8.812,6.608c11.702-0.299,22.937,6.946,27.65,18.415
            c4.698,11.454,1.678,24.804-7.514,33.23c-2.875,2.641-3.24,7.055-0.817,10.126c6.244,7.953,13.409,15.19,21.259,21.508
            c3.079,2.481,7.559,2.131,10.228-0.81c8.04-8.893,22.427-12.184,33.501-7.536c11.599,4.852,18.895,16.575,18.181,29.167
            c-0.233,3.955,2.67,7.398,6.595,7.85c5.135,0.599,10.301,0.898,15.481,0.898c4.917,0,9.835-0.27,14.752-0.817
            c3.897-0.43,6.784-3.786,6.653-7.696c-0.451-12.454,6.946-23.973,18.386-28.657c11.059-4.517,25.286-1.211,33.281,7.572
            c2.657,2.89,7.047,3.239,10.142,0.848c8.039-6.304,15.349-13.534,21.74-21.494c2.48-3.079,2.13-7.559-0.803-10.213
            c-9.353-8.47-12.388-21.946-7.529-33.524c4.568-10.899,15.612-18.217,27.491-18.217l1.662,0.043
            c3.853,0.313,7.398-2.655,7.865-6.588C269.044,139.917,269.058,129.639,267.92,119.461z M134.595,179.491
            c-24.718,0-44.824-20.106-44.824-44.824c0-24.717,20.106-44.824,44.824-44.824c24.717,0,44.823,20.107,44.823,44.824
            C179.418,159.385,159.312,179.491,134.595,179.491z"/>
        </g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      </svg>
    `;

    this.arrowRightSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 50 80" xml:space="preserve">
        <polyline fill="none" stroke="#000000" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" points="
      0.375,0.375 45.63,38.087 0.375,75.8 "/>
      </svg>
    `;

    this.arrowLeftSVG = `
      <svg width="100%" height="100%" viewBox="0 0 50 80" xml:space="preserve">
        <polyline fill="none" stroke="#000000" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" points="
      45.63,75.8 0.375,38.087 45.63,0.375 "/>
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
    this.statusButton.innerHTML = this.playSVG;
    this.indicator = document.createElement("span");
    this.indicator.id = "mc-player-indicator";
    this.indicator.innerHTML = "Idle";
    this.indicator.style.visibility = "hidden";

    this.statusButton.appendChild(this.indicator);

    // time display
    this.timeDisplay = document.createElement("div");
    this.timeDisplay.id = "mc-player-time-display";
    this.currentTime = document.createElement("span");
    this.currentTime.innerHTML = 0;
    this.timeSeperator = document.createElement("span");
    this.timeSeperator.innerHTML = "/";
    this.totalTime = document.createElement("span");
    this.totalTime.innerHTML = this.clip.duration;

    this.settingsButton = document.createElement("div");
    this.settingsButton.id = "mc-player-settings-btn";
    this.settingsButton.innerHTML = this.settingsSVG;

    this.settingsMainPanel = document.createElement("div");
    this.settingsMainPanel.id = "mc-player-settings-panel";
    this.settingsMainPanel.className = "m-fadeOut";
    this.settingsPanel = document.createElement("ul");

    this.settingsShowIndicator = document.createElement("li");

    this.settingsShowIndicator.id = "mc-player-settings-indicator";
    this.settingsShowIndicator.innerHTML = `
      <label>Show indicator</label>
      <label class="switch settings-switch">
        <input id="mc-player-show-indicator-checkbox" type="checkbox">
        <span class="slider round"></span>
      </label>
    `;

    this.settingsPanel.appendChild(this.settingsShowIndicator);
    this.settingsMainPanel.appendChild(this.settingsPanel);

    this.settingsSpeed = document.createElement("li");

    let speedDisplay;
    this.clip.speed === 1
      ? (speedDisplay = "Normal")
      : (speedDisplay = this.clip.speed);
    this.settingsSpeed.id = "mc-player-settings-speed";
    this.speedCurrent = document.createElement("span");
    this.speedCurrent.id = "mc-player-speed-current";
    this.speedCurrent.innerHTML = speedDisplay;

    this.settingsSpeed.innerHTML = `
      <label>Speed</label>
      <div class="mc-player-speed-btn">${this.arrowRightSVG}</div>
    `;

    this.settingsSpeed.appendChild(this.speedCurrent);
    this.settingsPanel.appendChild(this.settingsSpeed);

    this.settingsSpeedPanel = document.createElement("ul");
    this.settingsSpeedPanelTitle = document.createElement("li");
    this.settingsSpeedPanelTitle.innerHTML = `
      <div class="mc-player-speed-btn">${this.arrowLeftSVG}</div>
      <label id=mc-player-speed-runtime>Speed</label>`;
    this.settingsSpeedPanel.appendChild(this.settingsSpeedPanelTitle);

    this.settingsSpeedPanelValue = document.createElement("li");
    this.settingsSpeedPanelValue.className = "no-hover";

    this.speedBar = document.createElement("div");
    this.speedBar.id = "mc-player-speed-value-bar";
    this.speedBar.innerHTML = `
        <div class="mc-player-speed-value-step" id="mc-player-speed-cursor">
          <div></div>
        </div>
        <div class="mc-player-speed-value-step"></div>
        <div class="mc-player-speed-value-step"></div>
        <div class="mc-player-speed-value-step"></div>
        <div class="mc-player-speed-value-step"></div>
        <div class="mc-player-speed-value-step"></div>
        <div class="mc-player-speed-value-step"></div>
        <div class="mc-player-speed-value-step"></div>
        <div class="mc-player-speed-value-step"></div>
        <div class="mc-player-speed-value-step"></div>
      `;

    this.settingsSpeedPanelValue.appendChild(this.speedBar);

    this.speedValue = document.createElement("div");
    this.speedValue.id = "mc-player-speed-value";
    this.speedValue.innerHTML = `
        <div class="mc-player-speed-value" data-speed-value="4.0" data-zone="8">4</div>
        <div class="mc-player-speed-value" data-speed-value="2.0" data-zone="7">2</div>
        <div class="mc-player-speed-value" data-speed-value="1.0" data-zone="6">Normal</div>
        <div class="mc-player-speed-value" data-speed-value="0.5" data-zone="5">0.5</div>
        <div class="mc-player-speed-value" data-speed-value="0.0" data-zone="4">0</div>
        <div class="mc-player-speed-value" data-speed-value="-0.5" data-zone="3">-0.5</div>
        <div class="mc-player-speed-value" data-speed-value="-1.0" data-zone="2">-1</div>
        <div class="mc-player-speed-value" data-speed-value="-2.0" data-zone="1">-2</div>
        <div class="mc-player-speed-value" data-speed-value="-4.0" data-zone="0">-4</div>
      `;

    this.settingsSpeedPanelValue.appendChild(this.speedValue);
    this.settingsSpeedPanel.appendChild(this.settingsSpeedPanelValue);
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
    this.controls.appendChild(this.settingsButton);

    this.mcPlayer.appendChild(this.controls);
    this.mcPlayer.appendChild(this.settingsMainPanel);

    this.clip.props.host.appendChild(this.mcPlayer);

    // style of player to head
    const css = `
      #mc-player {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left:0px;
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
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
        display: table;
        text-align: center;
        width: auto;
        height: 34px;
        position: absolute;
        left: 45px;
        bottom: 0px;
        color: black;
      }
      #mc-player-time-display span {
        display:table-cell;
        vertical-align:middle;
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
        text-align:center;
      }

      #mc-player-settings-btn{
        opacity:0.8;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 40px;
        height: 15px;
        position: absolute;
        right: 0px;
        bottom: 5px;
        margin: 10px 5px 5px 5px;
      }

      .mc-player-speed-btn{
        position:relative;
        opacity:0.8;
        width: 10px;
        height: 10px;
        display:inline-block;
      }

      #mc-player-settings-panel {
        position: absolute;
        background-color:whitesmoke;
        color: black;
        bottom: 5px;
        right: 5px;
        width: 164px;
        height: 72px;
        padding: 5px;
        margin: 0px;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        transition: all 0.3s ease;
      }

      #mc-player-speed-value-bar{
        position:relative;
        width: 5px;
        background-color:#666;
        display:inline-block;
        box-sizing:border-box;
        height: 144px;
        float:left;
      }

      #mc-player-speed-value-bar:hover {
        cursor:pointer;
      }

      #mc-player-speed-cursor {
        position:absolute;
        background-color:red;
        top:0px;
        left:0px;
      }

      #mc-player-speed-cursor div {
        position:absolute;
        background-color:red;
        left:-2.5px;
        top:-4px;
        width:10px;
        height:10px;
        border-radius:5px;
      }

      #mc-player-speed-cursor:hover {
        cursor:pointer;
      }

      .mc-player-speed-value-step{
        width: 15px;
        background-color:#666;
        display:inline-block;
        box-sizing:border-box;
        height: 2px;
        margin-top:7px;
        margin-bottom:7px;
        float:left;
      }

      #mc-player-speed-value {
        display:inline-block;
        box-sizing:border-box;
        height: 144px;
        text-align:left;
      }

      .mc-player-speed-value {
        box-sizing:border-box;
        height: 16px;
        font-size: 12px;
      }

      #mc-player-indicator {
        font-size: 10px;
        position: relative;
        bottom: 14px;
        color: black;
      }

      #mc-player-settings-panel.mc-player-settings-speed-panel {
        width: 80px;
        height: 195px;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        transition: all 0.3s ease;
      }

      #mc-player-settings-panel.mc-player-settings-speed-panel .mc-player-speed-btn {
        float:left;
      }

      .mc-player-settings-speed-panel ul:first-child {
        text-align:right;
      }

      #mc-player-speed-current{
        float:right;
        padding-right:10px
      }

      #mc-player-settings-panel .mc-player-speed-btn {
        float:right;
      }

      #mc-player-settings-panel ul {
        width: 100%;
        margin:0px;
        padding:0px;
        overflow: hidden;
      }

      #mc-player-settings-panel.mc-player-settings-speed-panel ul li {
        min-width:70px;
      }
      #mc-player-settings-panel ul li.no-hover:hover {
        background-color:transparent;
        cursor: default;
      }

      div.mc-player-speed-value:hover {
        background-color:rgba(200,200,200,0.5);
        cursor: pointer;
      }

      #mc-player-settings-panel ul li {
        position:relative;
        width: 100%;
        min-width: 154px;
        list-style-type: none;
        margin: 0px;
        padding:5px;
      }
      
      #mc-player-settings-panel ul li label{
        margin: 0px;
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 35px;
        height: 18px;
      }

      .switch input {display:none;}

      .settings-switch {
        float: right;
      }
      .settings-switch:after {
        clear:both;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 1px;
        bottom: 1px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }

      input:checked + .slider {
        background-color: red;
      }

      input:focus + .slider {
        box-shadow: 0 0 1px red;
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(16px);
        -ms-transform: translateX(16px);
        transform: translateX(16px);
      }

      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }

      .slider.round:before {
        border-radius: 50%;
      }


      .m-fadeOut {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s linear 300ms, opacity 300ms;
      }

      .m-fadeIn {
        visibility: visible;
        opacity: 0.8;
        transition: visibility 0s linear 0s, opacity 300ms;
      }

      #mc-player-settings-panel ul li:hover  {
        background-color:rgba(200,200,200,0.5);
        cursor: pointer;
      }

      #mc-player-settings-panel ul li label:hover  {
        cursor: pointer;
      }

      #mc-player-loopbar:hover{
        cursor:pointer;
      }
      
      #mc-player-status-btn:hover{
        cursor:pointer;
      }

      #mc-player-settings-btn:hover{
        cursor:pointer;
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

      #mc-player-settings-speed:hover .mc-player-speed-btn {
       opacity:1;
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

       #mc-player-settings-btn:hover {
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
      (millisecond / this.clip.duration) * 100 + "%";
    this.currentTime.innerHTML = millisecond;
  }

  eventBroadcast(eventName, meta) {
    if (eventName === "state-change") {
      if (meta.newState === "waiting") {
        this.statusButton.innerHTML = this.playSVG;
        this.statusButton.appendChild(this.indicator);
        this.indicator.innerHTML = "Waiting";
      } else if (meta.newState === "playing") {
        this.statusButton.innerHTML = this.pauseSVG;
        this.statusButton.appendChild(this.indicator);
        this.indicator.innerHTML = "Playing";
      } else if (meta.newState === "completed") {
        this.currentTime.innerHTML = this.clip.duration;
        this.statusButton.innerHTML = this.replaySVG;
        this.statusButton.appendChild(this.indicator);
        this.indicator.innerHTML = "Completed";
      } else if (meta.newState === "transitional") {
        this.statusButton.innerHTML = this.playSVG;
        this.statusButton.appendChild(this.indicator);
        this.indicator.innerHTML = "Transitional";
      } else if (meta.newState === "idle") {
        this.statusButton.innerHTML = this.playSVG;
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
    this.runningBar.style.width =
      (millisecond / this.clip.duration) * 100 + "%";
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
      this.settingsMainPanel.classList.toggle("m-fadeOut");
      this.settingsMainPanel.classList.toggle("m-fadeIn");
    };

    this.settingsSpeed.onclick = this.settingsSpeedPanelTitle.onclick = e => {
      e.preventDefault();
      this.settingsMainPanel.classList.toggle("mc-player-settings-speed-panel");
      const includesClass = this.settingsMainPanel.className.includes(
        "mc-player-settings-speed-panel"
      );
      if (includesClass) {
        this.settingsMainPanel.removeChild(this.settingsPanel);
        this.settingsMainPanel.appendChild(this.settingsSpeedPanel);
      } else {
        this.settingsMainPanel.removeChild(this.settingsSpeedPanel);
        this.settingsMainPanel.appendChild(this.settingsPanel);
      }
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
      document.removeEventListener("touchmove", onCursorMove, true);
      this.handleDragEnd();
    };
    const onMouseDown = e => {
      e.preventDefault();
      this.handleDragStart();
      onCursorMove(e);
      document.addEventListener("mouseup", onMouseUp, true);
      document.addEventListener("mousemove", onCursorMove, true);
      document.addEventListener("touchmove", onCursorMove, true);
    };

    this.loopBar.addEventListener("mousedown", onMouseDown, true);
    const onCursorMoveSpeedBar = e => {
      e.preventDefault();
      const viewportOffset = this.speedBar.getBoundingClientRect();
      let positionY = e.clientY - viewportOffset.top;
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
      document.removeEventListener("mouseup", onMouseUpSpeedBar, true);
      document.removeEventListener("mousemove", onCursorMoveSpeedBar, true);
      document.removeEventListener("touchmove", onCursorMoveSpeedBar, true);
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
      document.addEventListener("mouseup", onMouseUpSpeedBar, true);
      document.addEventListener("mousemove", onCursorMoveSpeedBar, true);
      document.addEventListener("touchmove", onCursorMoveSpeedBar, true);
    };

    this.speedBar.addEventListener("mousedown", onMouseDownSpeedBar, true);

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
      return arrayOfValues[botLimitIndex].toFixed(1) + "0";
    }
    const limitZonePercentage = (currentPercentage / step) % 1;
    const limitZoneLength = Math.abs(
      arrayOfValues[botLimitIndex] - arrayOfValues[botLimitIndex + 1]
    );

    const realZoneSpeed = limitZonePercentage * limitZoneLength;
    const realSpeed = (realZoneSpeed + arrayOfValues[botLimitIndex]).toFixed(1);
    return realSpeed;
  }
}

module.exports = Player;
