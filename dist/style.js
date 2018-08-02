"use strict";

module.exports = function(theme) {
  return (
    "\n.full-screen #mc-player-controls {\n  position:fixed;\n  left:0px;\n  bottom:0px;\n}\n\n.full-screen #mc-player-settings-panel {\n  position:fixed;\n  bottom: 45px;\n}\n\n.svg {\n  fill: " +
    theme["svg-color"] +
    ";\n  stroke: " +
    theme["svg-color"] +
    ";\n}\n\n#mc-player {\n  color: " +
    theme["color"] +
    ";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n#mc-player-settings-speed-hide {\n  text-align:right;\n}\n#mc-player-controls {\n  background-color: " +
    theme["background-color"] +
    ";\n  border: " +
    theme["controls-border"] +
    ";\n  position: absolute;\n  bottom: " +
    theme["controls-bottom"] +
    ";\n  left: 0px;\n  width: 100%;\n  height: 40px;\n}\n\n#mc-player-totalbar {\n  width: calc(100% - 20px);\n  height: 5px;\n  margin: 0px 10px 0px 10px;\n  background-color: #505056;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n\n#mc-player-loopbar {\n  position: absolute;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  background-color: " +
    theme["loopbar-color"] +
    ";\n}\n\n#mc-player-helperbar {\n  position: absolute;\n  height: 20px;\n  top: -7px;\n  left: 0px;\n  right: 0px;\n  z-index:2;\n}\n\n#mc-player-runningbar {\n  position: relative;\n  width: 0px;\n  height: 100%;\n  background-color: " +
    theme["runningbar-color"] +
    ";\n}\n\n#mc-player-cursor {\n  right: 0px;\n  top: 0px;\n  width: 0px;\n  height: 0px;\n  position: absolute;\n  background-color: " +
    theme["cursor-color"] +
    ";\n  border-radius: 10px;\n  z-index: 1;\n}\n\n#mc-player-time-display {\n  display: table;\n  text-align: center;\n  width: auto;\n  height: 34px;\n  position: absolute;\n  left: 45px;\n  bottom: 0px;\n}\n\n#mc-player-time-display span {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n#mc-player-status-btn {\n  opacity: " +
    theme["button-opacity"] +
    ";\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  width: 40px;\n  height: 25px;\n  position: absolute;\n  left: 0px;\n  bottom: 0px;\n  margin: 10px 5px 5px 5px;\n  text-align: center;\n  z-index:3;\n}\n\n#mc-player-settings-btn {\n  opacity: " +
    theme["button-opacity"] +
    ";\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  width: 15px;\n  height: 15px;\n  position: absolute;\n  right: 30px;\n  bottom: 5px;\n  margin: 10px 5px 5px 5px;\n}\n\n#mc-player-full-screen-btn {\n  opacity: " +
    theme["button-opacity"] +
    ";\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  width: 15px;\n  height: 15px;\n  position: absolute;\n  right: 5px;\n  bottom: 5px;\n  margin: 10px 5px 5px 5px;\n}\n\n.mc-player-speed-btn {\n  position: relative;\n  opacity: " +
    theme["button-opacity"] +
    ";\n  width: 10px;\n  height: 10px;\n  display: inline-block;\n}\n\n#mc-player-settings-panel {\n  box-sizing: border-box;\n  position: absolute;\n  background-color: " +
    theme["background-color"] +
    ";\n  bottom: " +
    theme["settings-panel-bottom"] +
    ";\n  border: " +
    theme["settings-border"] +
    ";\n  right: 5px;\n  width: 164px;\n  height: 72px;\n  padding: 5px;\n  margin: 0px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#mc-player-speed-value-bar {\n  position: relative;\n  width: 5px;\n  background-color: " +
    theme["speedbar-color"] +
    ";\n  display: inline-block;\n  box-sizing: border-box;\n  height: 144px;\n  float: left;\n  margin-right:15px;\n}\n\n#mc-player-speed-value-helperbar {\n  position: absolute;\n  width: 25px;\n  height: 144px;\n  float: left;\n  left: -5px;\n  z-index:10;\n}\n\n\n#mc-player-speed-value-bar:hover,\n#mc-player-speed-value-helperbar {\n  cursor: pointer;\n}\n\n#mc-player-speed-cursor {\n  position: absolute;\n  background-color: " +
    theme["speedbar-cursor-color"] +
    ";\n  top: 0px;\n  left: 0px;\n}\n\n#mc-player-speed-cursor div {\n  position: absolute;\n  background-color: " +
    theme["speedbar-cursor-color"] +
    ";\n  left: -2.5px;\n  top: -4px;\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n}\n\n#mc-player-speed-cursor:hover {\n  cursor: pointer;\n}\n\n.mc-player-speed-value-step {\n  width: 15px;\n  background-color: " +
    theme["speedbar-color"] +
    ";\n  display: inline-block;\n  box-sizing: border-box;\n  height: 2px;\n  margin-top: 7px;\n  margin-bottom: 7px;\n  float: left;\n}\n\n#mc-player-speed-value {\n  display: inline-block;\n  box-sizing: border-box;\n  height: 144px;\n  text-align: left;\n}\n\n.mc-player-speed-value {\n  box-sizing: border-box;\n  height: 16px;\n  font-size: 12px;\n}\n\n#mc-player-indicator {\n  font-size: 10px;\n  position: relative;\n  bottom: 14px;\n  color: " +
    theme["color"] +
    ";\n}\n\n#mc-player-settings-panel.mc-player-settings-speed-panel {\n  overflow: hidden;\n  width: 80px;\n  height: 195px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#mc-player-settings-panel.mc-player-settings-speed-panel .mc-player-speed-btn {\n  float: left;\n}\n\n.mc-player-settings-speed-panel ul:first-child {\n  text-align: right;\n}\n\n#mc-player-speed-current {\n  float: right;\n  padding-right: 10px\n}\n\n#mc-player-settings-panel .mc-player-speed-btn {\n  float: right;\n}\n\n#mc-player-settings-panel ul {\n  width: 100%;\n  margin: 0px;\n  padding: 0px;\n  overflow: hidden;\n}\n\n#mc-player-settings-panel.mc-player-settings-speed-panel ul li {\n  min-width: 70px;\n}\n\n#mc-player-settings-panel ul li.no-hover:hover {\n  background-color: transparent;\n  cursor: default;\n}\n\ndiv.mc-player-speed-value:hover {\n  background-color: " +
    theme["hover-color"] +
    ";\n  cursor: pointer;\n}\n\n#mc-player-settings-panel ul li {\n  position: relative;\n  width: 100%;\n  min-width: 154px;\n  list-style-type: none;\n  margin: 0px;\n  padding: 5px;\n}\n\n#mc-player-settings-panel ul li label {\n  margin: 0px;\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 35px;\n  height: 18px;\n}\n\n.switch input {\n  display: none;\n}\n\n.settings-switch {\n  float: right;\n}\n\n.settings-switch:after {\n  clear: both;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: " +
    theme["slider-off-color"] +
    ';\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: "";\n  height: 16px;\n  width: 16px;\n  left: 1px;\n  bottom: 1px;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\ninput:checked+.slider {\n  background-color: ' +
    theme["slider-on-color"] +
    ";\n}\n\ninput:focus+.slider {\n  box-shadow: 0 0 1px " +
    theme["slider-on-color"] +
    ";\n}\n\ninput:checked+.slider:before {\n  -webkit-transform: translateX(16px);\n  -ms-transform: translateX(16px);\n  transform: translateX(16px);\n}\n\n\n/* Rounded sliders */\n\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n\n\n.m-fadeOut {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s linear 300ms, opacity 300ms;\n}\n\n.m-fadeIn {\n  visibility: visible;\n  opacity: 0.8;\n  transition: visibility 0s linear 0s, opacity 300ms;\n}\n\n#mc-player-settings-panel ul li:hover {\n  background-color: " +
    theme["hover-color"] +
    ";\n  cursor: pointer;\n}\n\n#mc-player-settings-panel ul li label:hover {\n  cursor: pointer;\n}\n\n#mc-player-loopbar:hover {\n  cursor: pointer;\n}\n\n#mc-player-status-btn:hover {\n  cursor: pointer;\n}\n\n\n#mc-player-controls:hover #mc-player-cursor {\n  right: -8px;\n  top: -5px;\n  width: 16px;\n  height: 16px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#mc-player-cursor:active {\n  right: -8px;\n  top: -5px;\n  width: 16px;\n  height: 16px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#mc-player-loopbar:active #mc-player-cursor {\n  right: -8px;\n  top: -5px;\n  width: 16px;\n  height: 16px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#mc-player-settings-speed:hover .mc-player-speed-btn {\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#mc-player-status-btn:hover {\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#mc-player-settings-btn:hover {\n  cursor: pointer;\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n#mc-player-full-screen-btn:hover {\n  cursor: pointer;\n  opacity: 1;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}"
  );
};
