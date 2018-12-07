module.exports = (theme, name, options) => `
.background {
  background-color: black;
  width:100%;
  height:${theme["background-height"]};;
  position:absolute;
  top:0px;
  left:0px;
  z-index:-2000;
}

.full-screen #${name}-controls {
  position:fixed;
  left:0px;
  bottom:0px;
}

.full-screen #${name}-settings-panel {
  position:fixed;
  bottom: 45px;
}

.svg {
  fill: ${theme["svg-color"]};
  stroke: ${theme["svg-color"]};
}

.pointer-event-panel {
  height: ${theme["pointer-event-panel-height"]};
}
#${name}-pointer-event-panel{
  width:100%;
  position:absolute;
  z-index:100;
}
#${name}-listener-helper{
  width:100%;
  height:calc( 100% - 45px );
  position:absolute;
  z-index:110;
}
.svg-selected svg{
  fill: ${theme["svg-selected-color"]};
  stroke: ${theme["svg-selected-color"]};
}
#${name}-hover-display{
    border: ${theme["preview-border"]};
    max-width:300px;
    display: flex;
    overflow:hidden;
    background-color: black;
    position: absolute;
    bottom: 14px;
    left: 0px;
    align-items: flex-end;
    justify-content: center;
}

#${name}-hover-millisecond {
  background-color: ${theme["hms-background-color"]};
  padding:3px;
  height:18px;
  margin:0px;
  line-height:12px;
  font-size:10px;
  text-align: center;
  min-width:20px;
  max-width:100px;
  z-index:2;
}
#${name},
#${name} ::before,
#${name} ::after,
#${name} div,
#${name} p,
#${name} span,
#${name} ul,
#${name} li {
  font-weight: 400;
  line-height: 1.9 !important;
  color: ${theme["color"]};
  font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif;
  box-sizing:border-box;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#${name} {
  line-height: 1.9;
  font-size: 12px;
  overflow:hidden;
  height: calc(100% + ${theme["controls-position"]});
  width:100%;
  position: absolute;
  top: 0px;
  left: 0px;
  
}

#${name}-settings-speed-hide {
  text-align:right;
}

.grad {
  background-image: linear-gradient(
    rgba(100,100,100,00.01),
    rgba(100,100,100,00.02),
    rgba(100,100,100,00.03),
    rgba(100,100,100,0.04),
    rgba(100,100,100,0.05),
    rgba(0,0,0,0.06),
    rgba(0,0,0,0.07),
    rgba(0,0,0,0.08),
    rgba(0,0,0,0.09),
    rgba(0,0,0,0.1),
    rgba(0,0,0,0.2),
    rgba(0,0,0,0.3),
    rgba(0,0,0,0.4),
    rgba(0,0,0,0.4),
    rgba(0,0,0,0.5),
    rgba(0,0,0,0.6),
    rgba(0,0,0,0.7),
    rgba(0,0,0,0.8),
    rgba(0,0,0,0.9),
    rgba(0,0,0,1)
  );
  position:absolute;
  width:100%;
  height:${theme["grad-height"]};
  left:0px;
  bottom:0px;
}

#${name}-controls {
  touch-action: none;
  background-color: ${theme["background-color"]};
  border: ${theme["controls-border"]};
  position: absolute;
  bottom: ${theme["controls-bottom"]};
  left: 0px;
  width: 100%;
  height: 40px;
  z-index:100;
}

#${name}-totalbar {
  width: calc(100% - 20px);
  height: 5px;
  margin: 0px 10px 0px 10px;
  background-color: #505056;
  position: relative;
  top: 0px;
  left: 0px;
}

#${name}-loopbar {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background-color: ${theme["loopbar-color"]};
}

.${name}-loop-boundaries {
  transform:translate(-50%,-37%);
  position:absolute;
  width:18px;
  background-color:${theme["loopbar-color"]};
  height:18px;
  border-radius:10px;
  z-index:40;
}

#${name}-helperbar {
  position: absolute;
  height: 20px;
  top: -10px;
  left: 0px;
  right: 0px;
  z-index:2;
}

#${name}-runningbar {
  position: relative;
  width: 0px;
  max-width:100%;
  height: 100%;
  background-color: ${theme["runningbar-color"]};
}

#${name}-cursor {
  transform:translate(50%,-36%);
  right: 0px;
  top: 0px;
  width: 0px;
  height: 0px;
  position: absolute;
  background-color: ${theme["cursor-color"]};
  border-radius: 10px;
  z-index: 5;
}

#${name}-left-controls {
  display:inline-block;
  width:200px;
  height:35px;
}
#${name}-time-display {
  display: table;
  text-align: center;
  width: auto;
  height: 34px;
  position: absolute;
  left: 90px;
  -webkit-transition: left 0.1s ease;
  -moz-transition: left 0.1s ease;
  transition: left 0.1s ease;
}

#${name}-time-display span {
  display: table-cell;
  vertical-align: middle;
}

#${name}-status-btn {
  opacity: ${theme["button-opacity"]};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 40px;
  height: 25px;
  position: absolute;
  overflow:visible;
  left: 0px;
  bottom: 0px;
  margin: 10px 5px 5px 5px;
  text-align: center;
  z-index:3;
}

#${name}-volume {
  opacity: ${theme["button-opacity"]};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 45px;
  bottom: 5px;
  margin: 10px 5px 5px 5px;
  text-align: center;
  z-index:3;
}
#${name}-volume-btn {
  width: 20px;
  height: 15px;
}

#${name}-volumebar {
  width: 0px;
  height: 3px;
  background-color: ${theme["loopbar-color"]};
  position:absolute;
  left:25px;
  bottom:6px;
  -webkit-transition: left 0.1s ease;
  -moz-transition: left 0.1s ease;
  transition: left 0.1s ease;
}

#${name}-volumebar-helper {
  position: absolute;
  width: 0px;
  height: 15px;
  left:25px;
  bottom:0px;
  z-index:10;
}

#${name}-volumebar-active {
  position: relative;
  width: 0%;
  height: 100%;
  background-color: ${theme["color"]};
  position:relative;
  left:0px;
  bottom:0px;
}

#${name}-volume-cursor {
  transform:translate(50%,-36%);
  right: 0px;
  top: 0px;
  width: 0px;
  height: 0px;
  position: absolute;
  background-color: ${theme["color"]};
  border-radius: 10px;
  z-index: 5;
}

.${name}-loopbar-time {
  width:auto;
  height:12px;
  background-color:${theme["background-color"]};
  line-height:10px;
  font-size:10px;
}

#${name}-loop-time {
  margin: 7px;
}

#${name}-dc-btn {
    opacity: 0.8;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 20px;
    height: 15px;
    margin: 7px 10px 5px 0px;
    transform: scale(1.5,1.5);
}

#${name}-loop-btn {
  opacity: ${theme["button-opacity"]};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  margin: 10px 5px 5px 5px;
}


#${name}-settings-btn {
  opacity: ${theme["button-opacity"]};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  margin: 10px 5px 5px 5px;
}

#${name}-full-screen-btn {
  opacity: ${theme["button-opacity"]};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  margin: 10px 5px 5px 5px;
}

.${name}-speed-btn {
  position: relative;
  opacity: ${theme["button-opacity"]};
  width: 10px;
  height: 10px;
  display: inline-block;
}

#${name}-settings-panel {
  touch-action: none;
  box-sizing: border-box;
  position: absolute;
  z-index:101;
  background-color: ${theme["settings-background-color"]};
  bottom: ${theme["settings-panel-bottom"]};
  border: ${theme["border"]};
  right: 5px;
  width: 164px;
  height: 175px;
  padding: 5px;
  margin: 0px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.${name}-mc-right-controls {
  float: right;
}

.${name}-hide {
  display:none !important;
}

#${name}-speed-value-bar {
  position: relative;
  width: 5px;
  background-color: ${theme["speedbar-color"]};
  display: inline-block;
  box-sizing: border-box;
  height: ${options.speedValues.length * 16}px;
  float: left;
  margin-right:15px;
}

#${name}-speed-value-helperbar {
  position: absolute;
  width: 25px;
  height: ${options.speedValues.length * 16}px;
  float: left;
  left: -5px;
  z-index:10;
}


#${name}-speed-value-bar:hover,
#${name}-speed-value-helperbar {
  cursor: pointer;
}

#${name}-volumebar:hover,
#${name}-volumebar-helper:hover,
#${name}-volume-btn:hover,
#${name}-volumebar:active,
#${name}-volumebar-helper:active,
#${name}-volume-btn:active {
  cursor:pointer;
}

#${name}-speed-cursor {
  position: absolute;
  background-color: ${theme["speedbar-cursor-color"]};
  top: 0px;
  left: 0px;
}

#${name}-speed-cursor div {
  position: absolute;
  background-color: ${theme["speedbar-cursor-color"]};
  left: -2.5px;
  top: -4px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
}

#${name}-speed-cursor:hover {
  cursor: pointer;
}

.${name}-speed-value-step {
  width: 16px;
  background-color: ${theme["speedbar-color"]};
  display: inline-block;
  box-sizing: border-box;
  height: 2px;
  margin-top: 7px;
  margin-bottom: 7px;
  float: left;
}

#${name}-speed-value {
  display: inline-block;
  box-sizing: border-box;
  height: ${options.speedValues.length * 16}px;
  text-align: left;
}

.${name}-speed-value {
  box-sizing: border-box;
  height: 16px;
  font-size: 12px;
}

#${name}-indicator {
  font-size: 8px !important;
  position: relative;
  bottom: 15px;
  color: ${theme["color"]};
  white-space: nowrap;
}

#${name}-speed-settings {
  height: ${options.speedValues.length * 16 + 32 + 10 - 2}px;
}

#${name}-speed-settings li.no-hover { 
  height: ${options.speedValues.length * 16 + 10 - 2}px; 
}
#${name}-settings-panel.${name}-settings-speed-panel {
  overflow: hidden;
  width: 80px;
  height: ${options.speedValues.length * 16 + 32 + 20}px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#${name}-settings-panel.${name}-settings-speed-panel .${name}-speed-btn {
  float: left;
}

.${name}-settings-speed-panel ul:first-child {
  text-align: right;
}

#${name}-speed-current {
  float: right;
  padding-right: 10px
}

#${name}-settings-panel .${name}-speed-btn {
  float: right;
}

#${name}-settings-panel ul {
  width: 100%;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}

#${name}-settings-panel.${name}-settings-speed-panel ul li {
  min-width: 70px;
}

#${name}-settings-panel ul li.no-hover:hover {
  background-color: transparent;
  cursor: default;
}

div.${name}-speed-value:hover {
  background-color: ${theme["hover-color"]};
  cursor: pointer;
}

#${name}-settings-panel ul li {
  position: relative;
  width: 100%;
  min-width: 154px;
  list-style-type: none;
  margin: 0px;
  padding: 5px;
}

#${name}-settings-panel ul li label {
  margin: 0px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 35px;
  height: 18px;
}

.switch input {
  display: none;
}

.settings-switch {
  float: right;
}

.settings-switch:after {
  clear: both;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme["slider-off-color"]};
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

input:checked+.slider {
  background-color: ${theme["slider-on-color"]};
}

input:focus+.slider {
  box-shadow: 0 0 1px ${theme["slider-on-color"]};
}

input:checked+.slider:before {
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
  opacity: 1;
  transition: visibility 0s linear 0s, opacity 300ms;
}

#${name}-settings-panel ul li:hover {
  background-color: ${theme["hover-color"]};
  cursor: pointer;
}

#${name}-settings-panel ul li label:hover {
  cursor: pointer;
}

#${name}-loopbar:hover {
  cursor: pointer;
}

#${name}-status-btn:hover {
  cursor: pointer;
}

#${name}-controls:active #${name}-cursor,
#${name}-controls:hover #${name}-cursor  {
  width: 16px;
  height: 16px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#${name}-volume .${name}-volume-cursor-transition {
  width: 12px;
  height: 12px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#${name}-volume .${name}-volume-width-transition
 {
  width: 50px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#${name}-time-display.${name}-time-width-transition {
  left: 140px;
  -webkit-transition: left 0.3s ease;
  -moz-transition: left 0.3s ease;
  transition: left 0.3s ease;
}

#${name}-settings-speed:hover .${name}-speed-btn {
  opacity: 1;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#${name}-status-btn:hover {
  opacity: 1;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#${name}-loop-btn:hover,
#${name}-dc-btn:hover
 {
  cursor: pointer;
  opacity: 1;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
#${name}-settings-btn:hover {
  cursor: pointer;
  opacity: 1;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#${name}-full-screen-btn:hover {
  cursor: pointer;
  opacity: 1;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}`;
