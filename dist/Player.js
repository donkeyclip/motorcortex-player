"use strict";

const _createClass = (function() {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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

const Player = (function() {
  function Player(options) {
    _classCallCheck(this, Player);

    this.id = options.id || helper.getAnId(); // timer id
    this.clip = options.clip; // host to apply the timer
    this.speedValues = [-4, -2, -1, -0.5, 0, 0.5, 1, 2, 4];
    this.playSVG =
      '\n      <svg width="100%" height="100%" viewBox="0 0 36 36" >\n          <path id="play-icon"  data-state="paused"  d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" />\n      </svg>\n    ';

    this.pauseSVG =
      '\n      <svg width="100%" height="100%" viewBox="0 0 36 36" >\n          <path id="pause-icon" data-state="playing" d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" />\n      </svg>\n    ';

    this.replaySVG =
      '\n      <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">\n        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>\n        <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">\n            <path d="M5356.3,4203.8c-1247.8-153.1-2324.2-811.3-3000.7-1839.7c-379.4-578.2-596.5-1209-660.5-1933.4l-27.4-294.8H883.9c-431.9,0-783.9-6.9-783.9-18.3c0-9.2,477.6-493.7,1062.7-1078.7l1062.7-1062.7L3288.1-961.1C3873.1-376,4350.8,108.5,4350.8,117.6c0,11.4-356.5,18.3-790.7,18.3h-793l18.3,189.7C2831,876.3,2991,1338,3288.1,1779.1C4122.3,3026.9,5706,3472.5,7065.8,2841.8C7639.4,2578.9,8197,2035,8487.3,1461.4C8581,1274,8709,896.9,8754.7,666.1c48-246.8,54.8-811.3,9.1-1055.8C8567.3-1491.3,7788-2394,6720.7-2750.5c-315.4-107.4-541.6-139.4-941.6-139.4c-287.9,0-415.9,11.4-598.8,50.3c-523.3,112-973.6,335.9-1371.2,681c-75.4,68.6-148.5,123.4-160,123.4c-9.1,0-187.4-169.1-393.1-374.8c-434.2-434.2-420.5-363.4-105.1-628.5c852.4-710.7,1972.3-1055.8,3046.4-937c1627.2,176,2977.8,1257,3489.8,2790.4c457.1,1368.9,169.1,2843-777,3969.7C8322.7,3484,7417.8,4000.4,6503.6,4160.4C6197.4,4213,5619.2,4235.8,5356.3,4203.8z"/>\n            <path d="M4990.7,124.5c0-1503.8,4.6-1794,32-1778c16,9.1,505.1,413.6,1085.6,895.8C7113.8,78.8,7161.8,122.2,7122.9,161c-80,75.4-2109.4,1757.5-2120.8,1757.5C4995.3,1918.5,4990.7,1111.8,4990.7,124.5z"/>\n        </g></g>\n      </svg>\n    ';

    this.settingsSVG =
      '\n      <svg width="100%" height="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n         viewBox="0 0 268.765 268.765" style="enable-background:new 0 0 268.765 268.765;" xml:space="preserve">\n      <g id="Settings">\n        <g>\n          <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M267.92,119.461c-0.425-3.778-4.83-6.617-8.639-6.617\n            c-12.315,0-23.243-7.231-27.826-18.414c-4.682-11.454-1.663-24.812,7.515-33.231c2.889-2.641,3.24-7.062,0.817-10.133\n            c-6.303-8.004-13.467-15.234-21.289-21.5c-3.063-2.458-7.557-2.116-10.213,0.825c-8.01,8.871-22.398,12.168-33.516,7.529\n            c-11.57-4.867-18.866-16.591-18.152-29.176c0.235-3.953-2.654-7.39-6.595-7.849c-10.038-1.161-20.164-1.197-30.232-0.08\n            c-3.896,0.43-6.785,3.786-6.654,7.689c0.438,12.461-6.946,23.98-18.401,28.672c-10.985,4.487-25.272,1.218-33.266-7.574\n            c-2.642-2.896-7.063-3.252-10.141-0.853c-8.054,6.319-15.379,13.555-21.74,21.493c-2.481,3.086-2.116,7.559,0.802,10.214\n            c9.353,8.47,12.373,21.944,7.514,33.53c-4.639,11.046-16.109,18.165-29.24,18.165c-4.261-0.137-7.296,2.723-7.762,6.597\n            c-1.182,10.096-1.196,20.383-0.058,30.561c0.422,3.794,4.961,6.608,8.812,6.608c11.702-0.299,22.937,6.946,27.65,18.415\n            c4.698,11.454,1.678,24.804-7.514,33.23c-2.875,2.641-3.24,7.055-0.817,10.126c6.244,7.953,13.409,15.19,21.259,21.508\n            c3.079,2.481,7.559,2.131,10.228-0.81c8.04-8.893,22.427-12.184,33.501-7.536c11.599,4.852,18.895,16.575,18.181,29.167\n            c-0.233,3.955,2.67,7.398,6.595,7.85c5.135,0.599,10.301,0.898,15.481,0.898c4.917,0,9.835-0.27,14.752-0.817\n            c3.897-0.43,6.784-3.786,6.653-7.696c-0.451-12.454,6.946-23.973,18.386-28.657c11.059-4.517,25.286-1.211,33.281,7.572\n            c2.657,2.89,7.047,3.239,10.142,0.848c8.039-6.304,15.349-13.534,21.74-21.494c2.48-3.079,2.13-7.559-0.803-10.213\n            c-9.353-8.47-12.388-21.946-7.529-33.524c4.568-10.899,15.612-18.217,27.491-18.217l1.662,0.043\n            c3.853,0.313,7.398-2.655,7.865-6.588C269.044,139.917,269.058,129.639,267.92,119.461z M134.595,179.491\n            c-24.718,0-44.824-20.106-44.824-44.824c0-24.717,20.106-44.824,44.824-44.824c24.717,0,44.823,20.107,44.823,44.824\n            C179.418,159.385,159.312,179.491,134.595,179.491z"/>\n        </g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      <g>\n      </g>\n      </svg>\n    ';

    this.arrowRightSVG =
      '\n      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 50 80" xml:space="preserve">\n        <polyline fill="none" stroke="#000000" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" points="\n      0.375,0.375 45.63,38.087 0.375,75.8 "/>\n      </svg>\n    ';

    this.arrowLeftSVG =
      '\n      <svg width="100%" height="100%" viewBox="0 0 50 80" xml:space="preserve">\n        <polyline fill="none" stroke="#000000" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" points="\n      45.63,75.8 0.375,38.087 45.63,0.375 "/>\n      </svg> \n    ';

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
    this.settingsShowIndicator.innerHTML =
      '\n      <label>Show indicator</label>\n      <label class="switch settings-switch">\n        <input id="mc-player-show-indicator-checkbox" type="checkbox">\n        <span class="slider round"></span>\n      </label>\n    ';

    this.settingsPanel.appendChild(this.settingsShowIndicator);
    this.settingsMainPanel.appendChild(this.settingsPanel);

    this.settingsSpeed = document.createElement("li");

    let speedDisplay = void 0;
    this.clip.speed === 1
      ? (speedDisplay = "Normal")
      : (speedDisplay = this.clip.speed);
    this.settingsSpeed.id = "mc-player-settings-speed";
    this.speedCurrent = document.createElement("span");
    this.speedCurrent.id = "mc-player-speed-current";
    this.speedCurrent.innerHTML = speedDisplay;

    this.settingsSpeed.innerHTML =
      '\n      <label>Speed</label>\n      <div class="mc-player-speed-btn">' +
      this.arrowRightSVG +
      "</div>\n    ";

    this.settingsSpeed.appendChild(this.speedCurrent);
    this.settingsPanel.appendChild(this.settingsSpeed);

    this.settingsSpeedPanel = document.createElement("ul");
    this.settingsSpeedPanelTitle = document.createElement("li");
    this.settingsSpeedPanelTitle.innerHTML =
      '\n      <div class="mc-player-speed-btn">' +
      this.arrowLeftSVG +
      "</div>\n      <label id=mc-player-speed-runtime>Speed</label>";
    this.settingsSpeedPanel.appendChild(this.settingsSpeedPanelTitle);

    this.settingsSpeedPanelValue = document.createElement("li");
    this.settingsSpeedPanelValue.className = "no-hover";

    this.speedBar = document.createElement("div");
    this.speedBar.id = "mc-player-speed-value-bar";
    this.speedBar.innerHTML =
      '\n        <div class="mc-player-speed-value-step" id="mc-player-speed-cursor">\n          <div></div>\n        </div>\n        <div class="mc-player-speed-value-step"></div>\n        <div class="mc-player-speed-value-step"></div>\n        <div class="mc-player-speed-value-step"></div>\n        <div class="mc-player-speed-value-step"></div>\n        <div class="mc-player-speed-value-step"></div>\n        <div class="mc-player-speed-value-step"></div>\n        <div class="mc-player-speed-value-step"></div>\n        <div class="mc-player-speed-value-step"></div>\n        <div class="mc-player-speed-value-step"></div>\n      ';

    this.settingsSpeedPanelValue.appendChild(this.speedBar);

    this.speedValue = document.createElement("div");
    this.speedValue.id = "mc-player-speed-value";
    this.speedValue.innerHTML =
      '\n        <div class="mc-player-speed-value" data-speed-value="4.0" data-zone="8">4</div>\n        <div class="mc-player-speed-value" data-speed-value="2.0" data-zone="7">2</div>\n        <div class="mc-player-speed-value" data-speed-value="1.0" data-zone="6">Normal</div>\n        <div class="mc-player-speed-value" data-speed-value="0.5" data-zone="5">0.5</div>\n        <div class="mc-player-speed-value" data-speed-value="0.0" data-zone="4">0</div>\n        <div class="mc-player-speed-value" data-speed-value="-0.5" data-zone="3">-0.5</div>\n        <div class="mc-player-speed-value" data-speed-value="-1.0" data-zone="2">-1</div>\n        <div class="mc-player-speed-value" data-speed-value="-2.0" data-zone="1">-2</div>\n        <div class="mc-player-speed-value" data-speed-value="-4.0" data-zone="0">-4</div>\n      ';

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
    const css =
      '\n      #mc-player {\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        top: 0px;\n        left:0px;\n        -webkit-touch-callout:none;\n        -webkit-user-select:none;\n        -moz-user-select:none;\n        -ms-user-select:none;\n        user-select:none;\n      }\n\n      #mc-player-controls {\n        box-shadow: inset 0px -20px 40px 5px white;\n        position: absolute;\n        bottom: -40px;\n        left: 0px;\n        width: 100%;\n        height: 40px;\n      }\n\n      #mc-player-totalbar {\n        width: calc(100% - 20px);\n        height: 5px;\n        margin: 0px 10px 0px 10px;\n        background-color: #505056;\n        position: absolute;\n        top: 0px;\n        left: 0px;\n      }\n\n      #mc-player-loopbar{\n        position: absolute;\n        height:100%;\n        top: 0px;\n        left:0px;\n        right: 0px;\n        background-color: #808086;\n      }\n\n      #mc-player-runningbar {\n        position: relative;\n        width: 0px;\n        height:100%;\n        background-color: red;\n      }\n\n      #mc-player-cursor {\n        right: 0px;\n        top:  0px;\n        width: 0px;\n        height: 0px;\n        position: absolute;\n        background-color: red;\n        border-radius: 10px;\n        z-index: 1;\n      }\n\n      #mc-player-time-display {\n        display: table;\n        text-align: center;\n        width: auto;\n        height: 34px;\n        position: absolute;\n        left: 45px;\n        bottom: 0px;\n        color: black;\n      }\n      #mc-player-time-display span {\n        display:table-cell;\n        vertical-align:middle;\n      }\n\n      #mc-player-status-btn{\n        opacity:0.8;\n        background-repeat: no-repeat;\n        background-size: 100% 100%;\n        width: 40px;\n        height: 25px;\n        position: absolute;\n        left: 0px;\n        bottom: 0px;\n        margin: 10px 5px 5px 5px;\n        text-align:center;\n      }\n\n      #mc-player-settings-btn{\n        opacity:0.8;\n        background-repeat: no-repeat;\n        background-size: 100% 100%;\n        width: 40px;\n        height: 15px;\n        position: absolute;\n        right: 0px;\n        bottom: 5px;\n        margin: 10px 5px 5px 5px;\n      }\n\n      .mc-player-speed-btn{\n        position:relative;\n        opacity:0.8;\n        width: 10px;\n        height: 10px;\n        display:inline-block;\n      }\n\n      #mc-player-settings-panel {\n        position: absolute;\n        background-color:whitesmoke;\n        color: black;\n        bottom: 5px;\n        right: 5px;\n        width: 164px;\n        height: 72px;\n        padding: 5px;\n        margin: 0px;\n        -webkit-transition: all 0.3s ease;\n        -moz-transition: all 0.3s ease;\n        transition: all 0.3s ease;\n      }\n\n      #mc-player-speed-value-bar{\n        position:relative;\n        width: 5px;\n        background-color:#666;\n        display:inline-block;\n        box-sizing:border-box;\n        height: 144px;\n        float:left;\n      }\n\n      #mc-player-speed-value-bar:hover {\n        cursor:pointer;\n      }\n\n      #mc-player-speed-cursor {\n        position:absolute;\n        background-color:red;\n        top:0px;\n        left:0px;\n      }\n\n      #mc-player-speed-cursor div {\n        position:absolute;\n        background-color:red;\n        left:-2.5px;\n        top:-4px;\n        width:10px;\n        height:10px;\n        border-radius:5px;\n      }\n\n      #mc-player-speed-cursor:hover {\n        cursor:pointer;\n      }\n\n      .mc-player-speed-value-step{\n        width: 15px;\n        background-color:#666;\n        display:inline-block;\n        box-sizing:border-box;\n        height: 2px;\n        margin-top:7px;\n        margin-bottom:7px;\n        float:left;\n      }\n\n      #mc-player-speed-value {\n        display:inline-block;\n        box-sizing:border-box;\n        height: 144px;\n        text-align:left;\n      }\n\n      .mc-player-speed-value {\n        box-sizing:border-box;\n        height: 16px;\n        font-size: 12px;\n      }\n\n      #mc-player-indicator {\n        font-size: 10px;\n        position: relative;\n        bottom: 14px;\n        color: black;\n      }\n\n      #mc-player-settings-panel.mc-player-settings-speed-panel {\n        width: 80px;\n        height: 195px;\n        -webkit-transition: all 0.3s ease;\n        -moz-transition: all 0.3s ease;\n        transition: all 0.3s ease;\n      }\n\n      #mc-player-settings-panel.mc-player-settings-speed-panel .mc-player-speed-btn {\n        float:left;\n      }\n\n      .mc-player-settings-speed-panel ul:first-child {\n        text-align:right;\n      }\n\n      #mc-player-speed-current{\n        float:right;\n        padding-right:10px\n      }\n\n      #mc-player-settings-panel .mc-player-speed-btn {\n        float:right;\n      }\n\n      #mc-player-settings-panel ul {\n        width: 100%;\n        margin:0px;\n        padding:0px;\n        overflow: hidden;\n      }\n\n      #mc-player-settings-panel.mc-player-settings-speed-panel ul li {\n        min-width:70px;\n      }\n      #mc-player-settings-panel ul li.no-hover:hover {\n        background-color:transparent;\n        cursor: default;\n      }\n\n      div.mc-player-speed-value:hover {\n        background-color:rgba(200,200,200,0.5);\n        cursor: pointer;\n      }\n\n      #mc-player-settings-panel ul li {\n        position:relative;\n        width: 100%;\n        min-width: 154px;\n        list-style-type: none;\n        margin: 0px;\n        padding:5px;\n      }\n      \n      #mc-player-settings-panel ul li label{\n        margin: 0px;\n      }\n\n      .switch {\n        position: relative;\n        display: inline-block;\n        width: 35px;\n        height: 18px;\n      }\n\n      .switch input {display:none;}\n\n      .settings-switch {\n        float: right;\n      }\n      .settings-switch:after {\n        clear:both;\n      }\n\n      .slider {\n        position: absolute;\n        cursor: pointer;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: #ccc;\n        -webkit-transition: .4s;\n        transition: .4s;\n      }\n\n      .slider:before {\n        position: absolute;\n        content: "";\n        height: 16px;\n        width: 16px;\n        left: 1px;\n        bottom: 1px;\n        background-color: white;\n        -webkit-transition: .4s;\n        transition: .4s;\n      }\n\n      input:checked + .slider {\n        background-color: red;\n      }\n\n      input:focus + .slider {\n        box-shadow: 0 0 1px red;\n      }\n\n      input:checked + .slider:before {\n        -webkit-transform: translateX(16px);\n        -ms-transform: translateX(16px);\n        transform: translateX(16px);\n      }\n\n      /* Rounded sliders */\n      .slider.round {\n        border-radius: 34px;\n      }\n\n      .slider.round:before {\n        border-radius: 50%;\n      }\n\n\n      .m-fadeOut {\n        visibility: hidden;\n        opacity: 0;\n        transition: visibility 0s linear 300ms, opacity 300ms;\n      }\n\n      .m-fadeIn {\n        visibility: visible;\n        opacity: 0.8;\n        transition: visibility 0s linear 0s, opacity 300ms;\n      }\n\n      #mc-player-settings-panel ul li:hover  {\n        background-color:rgba(200,200,200,0.5);\n        cursor: pointer;\n      }\n\n      #mc-player-settings-panel ul li label:hover  {\n        cursor: pointer;\n      }\n\n      #mc-player-loopbar:hover{\n        cursor:pointer;\n      }\n      \n      #mc-player-status-btn:hover{\n        cursor:pointer;\n      }\n\n      #mc-player-settings-btn:hover{\n        cursor:pointer;\n      }\n\n      #mc-player-controls:hover #mc-player-cursor {\n        right:-8px;\n        top: -5px;\n        width:16px;\n        height:16px;\n        -webkit-transition: all 0.3s ease;\n        -moz-transition: all 0.3s ease;\n        transition: all 0.3s ease;\n      }\n\n      #mc-player-cursor:active {\n        right:-8px;\n        top: -5px;\n        width:16px;\n        height:16px;\n        -webkit-transition: all 0.3s ease;\n        -moz-transition: all 0.3s ease;\n        transition: all 0.3s ease;\n      }\n\n      #mc-player-loopbar:active #mc-player-cursor{\n        right:-8px;\n        top: -5px;\n        width:16px;\n        height:16px;\n        -webkit-transition: all 0.3s ease;\n        -moz-transition: all 0.3s ease;\n        transition: all 0.3s ease;\n      }\n\n      #mc-player-settings-speed:hover .mc-player-speed-btn {\n       opacity:1;\n        -webkit-transition: all 0.3s ease;\n        -moz-transition: all 0.3s ease;\n        transition: all 0.3s ease;\n      }\n\n      #mc-player-status-btn:hover {\n       opacity:1;\n        -webkit-transition: all 0.3s ease;\n        -moz-transition: all 0.3s ease;\n        transition: all 0.3s ease;\n      }\n\n       #mc-player-settings-btn:hover {\n       opacity:1;\n        -webkit-transition: all 0.3s ease;\n        -moz-transition: all 0.3s ease;\n        transition: all 0.3s ease;\n      }\n    ';

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

  _createClass(Player, [
    {
      key: "millisecondChange",
      value: function millisecondChange(millisecond) {
        this.runningBar.style.width =
          (millisecond / this.clip.duration) * 100 + "%";
        this.currentTime.innerHTML = millisecond;
      }
    },
    {
      key: "eventBroadcast",
      value: function eventBroadcast(eventName, meta) {
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
    },
    {
      key: "subscribeToEvents",
      value: function subscribeToEvents() {
        // helper.error('Timer is subscirbing to the clips events');
        this.clip.subscribeToEvents(this.id, this.eventBroadcast.bind(this));
      }
    },
    {
      key: "subscribeToTimer",
      value: function subscribeToTimer() {
        // helper.log('Timer is subscirbing to the clips timer', 'notice');
        this.clip.subscribe(this.id, this.millisecondChange.bind(this));
      }
    },
    {
      key: "handleDragStart",
      value: function handleDragStart() {
        journey = timeCapsule.startJourney(this.clip);
      }
    },
    {
      key: "handleDrag",
      value: function handleDrag(positionX) {
        const millisecond = Math.round(
          (this.clip.duration * positionX) / this.totalBar.offsetWidth
        );
        this.currentTime.innerHTML = millisecond;
        this.runningBar.style.width =
          (millisecond / this.clip.duration) * 100 + "%";
        journey.station(millisecond);
      }
    },
    {
      key: "handleDragEnd",
      value: function handleDragEnd() {
        journey.destination();
      }
    },
    {
      key: "addEventListeners",
      value: function addEventListeners() {
        const _this = this;

        this.statusButton.onclick = function(e) {
          e.preventDefault();
          if (_this.clip.state === "playing") {
            _this.clip.wait();
          } else if (_this.clip.state === "waiting") {
            _this.clip.resume();
          } else if (_this.clip.state === "idle") {
            _this.clip.play();
          } else if (_this.clip.state === "completed") {
            journey = timeCapsule.startJourney(_this.clip);
            journey.station(0);
            journey.destination();
            _this.clip.play();
          }
        };

        this.settingsShowIndicator.onclick = function(e) {
          e.preventDefault();
          const checkbox = document.getElementById(
            "mc-player-show-indicator-checkbox"
          );
          if (checkbox.checked) {
            checkbox.checked = false;
            _this.indicator.style.visibility = "hidden";
            _this.statusButton.style.margin = "10px 5px 5px 5px";
            _this.statusButton.style.height = "25px";
            _this.statusButton.style.width = "45px";
            _this.timeDisplay.style.left = "50px";
          } else {
            checkbox.checked = true;
            _this.indicator.style.visibility = "visible";
            _this.statusButton.style.margin = "10px 5px 12px 5px";
            _this.statusButton.style.width = "55px";
            _this.timeDisplay.style.left = "60px";
            _this.statusButton.style.height = "18px";
          }
        };

        this.settingsButton.onclick = function(e) {
          e.preventDefault();
          _this.settingsMainPanel.classList.toggle("m-fadeOut");
          _this.settingsMainPanel.classList.toggle("m-fadeIn");
        };

        this.settingsSpeed.onclick = this.settingsSpeedPanelTitle.onclick = function(
          e
        ) {
          e.preventDefault();
          _this.settingsMainPanel.classList.toggle(
            "mc-player-settings-speed-panel"
          );
          const includesClass = _this.settingsMainPanel.className.includes(
            "mc-player-settings-speed-panel"
          );
          if (includesClass) {
            _this.settingsMainPanel.removeChild(_this.settingsPanel);
            _this.settingsMainPanel.appendChild(_this.settingsSpeedPanel);
          } else {
            _this.settingsMainPanel.removeChild(_this.settingsSpeedPanel);
            _this.settingsMainPanel.appendChild(_this.settingsPanel);
          }
        };

        const onCursorMove = function onCursorMove(e) {
          e.preventDefault();
          const viewportOffset = _this.totalBar.getBoundingClientRect();
          let positionX = e.clientX - viewportOffset.left;
          if (positionX < 0) {
            positionX = 0;
          } else if (positionX > _this.totalBar.offsetWidth) {
            positionX = _this.totalBar.offsetWidth;
          }

          _this.handleDrag(positionX);
        };

        const onMouseUp = function onMouseUp(e) {
          e.preventDefault();
          document.removeEventListener("mouseup", onMouseUp, true);
          document.removeEventListener("mousemove", onCursorMove, true);
          document.removeEventListener("touchmove", onCursorMove, true);
          _this.handleDragEnd();
        };
        const onMouseDown = function onMouseDown(e) {
          e.preventDefault();
          _this.handleDragStart();
          onCursorMove(e);
          document.addEventListener("mouseup", onMouseUp, true);
          document.addEventListener("mousemove", onCursorMove, true);
          document.addEventListener("touchmove", onCursorMove, true);
        };

        this.loopBar.addEventListener("mousedown", onMouseDown, true);
        const onCursorMoveSpeedBar = function onCursorMoveSpeedBar(e) {
          e.preventDefault();
          const viewportOffset = _this.speedBar.getBoundingClientRect();
          let positionY = e.clientY - viewportOffset.top;
          positionY -= 8;
          if (positionY < 0) {
            positionY = 0;
          } else if (positionY > _this.speedBar.offsetHeight - 15.5) {
            positionY = _this.speedBar.offsetHeight - 15.5;
          }

          // show speed
          const percentage = (positionY / 128.5 - 1) * -1;
          const step = 1 / 8;
          const speed = _this.calculateSpeed(
            step,
            _this.speedValues,
            percentage
          );
          document.getElementById("mc-player-speed-runtime").innerHTML =
            speed + "0";
          _this.clip.executionSpeed = speed;
          document.getElementById("mc-player-speed-cursor").style.top =
            positionY + "px";
        };

        const onMouseUpSpeedBar = function onMouseUpSpeedBar(e) {
          e.preventDefault();
          document.removeEventListener("mouseup", onMouseUpSpeedBar, true);
          document.removeEventListener("mousemove", onCursorMoveSpeedBar, true);
          document.removeEventListener("touchmove", onCursorMoveSpeedBar, true);
          document.getElementById("mc-player-speed-runtime").innerHTML =
            "Speed";
          let speedDisplay = void 0;
          _this.clip.speed == 1
            ? (speedDisplay = "Normal")
            : (speedDisplay = _this.clip.speed);

          _this.speedCurrent.innerHTML = speedDisplay;
        };
        const onMouseDownSpeedBar = function onMouseDownSpeedBar(e) {
          e.preventDefault();
          onCursorMoveSpeedBar(e);
          document.addEventListener("mouseup", onMouseUpSpeedBar, true);
          document.addEventListener("mousemove", onCursorMoveSpeedBar, true);
          document.addEventListener("touchmove", onCursorMoveSpeedBar, true);
        };

        this.speedBar.addEventListener("mousedown", onMouseDownSpeedBar, true);

        document.querySelector("body").addEventListener("click", function(e) {
          if (e.target.className === "mc-player-speed-value") {
            let speedDisplay = e.target.dataset.speedValue - 0;
            _this.clip.executionSpeed = e.target.dataset.speedValue;
            _this.clip.speed == 1
              ? (speedDisplay = "Normal")
              : (speedDisplay = _this.clip.speed);
            _this.speedCurrent.innerHTML = speedDisplay;

            const step = 1 / (_this.speedValues.length - 1);
            const positionY = (e.target.dataset.zone * step - 1) * -1 * 128.5;

            document.getElementById("mc-player-speed-cursor").style.top =
              positionY + "px";
          }
        });
      }
    },
    {
      key: "calculateSpeed",
      value: function calculateSpeed(step, arrayOfValues, currentPercentage) {
        const botLimitIndex = Math.floor(currentPercentage / step);
        if (botLimitIndex === arrayOfValues.length - 1) {
          return arrayOfValues[botLimitIndex].toFixed(1) + "0";
        }
        const limitZonePercentage = (currentPercentage / step) % 1;
        const limitZoneLength = Math.abs(
          arrayOfValues[botLimitIndex] - arrayOfValues[botLimitIndex + 1]
        );

        const realZoneSpeed = limitZonePercentage * limitZoneLength;
        const realSpeed = (
          realZoneSpeed + arrayOfValues[botLimitIndex]
        ).toFixed(1);
        return realSpeed;
      }
    }
  ]);

  return Player;
})();

module.exports = Player;
