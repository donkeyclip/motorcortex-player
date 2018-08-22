const themes = {
  default: {
    "background-color": "whitesmoke",
    color: "black",
    "svg-color": "black",
    "loopbar-color": "#808086",
    "speedbar-color": "#666",
    "runningbar-color": "red",
    "cursor-color": "red",
    "speedbar-cursor-color": "red",
    "button-opacity": "0.8",
    "hover-color": "rgba(200, 200, 200, 0.5)",
    "slider-off-color": "#ccc",
    "slider-on-color": "red",
    "settings-border": "1px solid rgba(255,255,255,0.2)",
    "controls-border": "none",
    "svg-selected-color": "red"
  },
  dark: {
    "background-color": "black",
    color: "white",
    "svg-color": "white",
    "loopbar-color": "#808086",
    "speedbar-color": "#666",
    "runningbar-color": "red",
    "cursor-color": "red",
    "speedbar-cursor-color": "red",
    "button-opacity": "0.8",
    "hover-color": "rgba(90, 90, 90, 0.5)",
    "slider-off-color": "#ccc",
    "slider-on-color": "red",
    "settings-border": "1px solid rgba(255,255,255,0.2)",
    "controls-border": "none",
    "svg-selected-color": "red"
  },
  whiteGold: {
    "background-color": "white",
    color: "#a17f1a",
    "svg-color": "#a17f1a",
    "loopbar-color": "#808086",
    "speedbar-color": "#666",
    "runningbar-color": "#a17f1a",
    "cursor-color": "#a17f1a",
    "speedbar-cursor-color": "#a17f1a",
    "button-opacity": "0.8",
    "hover-color": "rgba(200, 200, 200, 0.5)",
    "slider-off-color": "#ccc",
    "slider-on-color": "#a17f1a",
    "settings-border": "1px solid rgba(255,255,255,0.2)",
    "controls-border": "none",
    "svg-selected-color": "red"
  },
  darkGold: {
    "background-color": "black",
    color: "#a17f1a",
    "svg-color": "#a17f1a",
    "loopbar-color": "#808086",
    "speedbar-color": "#666",
    "runningbar-color": "#a17f1a",
    "cursor-color": "#a17f1a",
    "speedbar-cursor-color": "#a17f1a",
    "button-opacity": "0.8",
    "hover-color": "rgba(90, 90, 90, 0.5)",
    "slider-off-color": "#ccc",
    "slider-on-color": "#a17f1a",
    "settings-border": "1px solid rgba(255,255,255,0.2)",
    "controls-border": "none",
    "svg-selected-color": "red"
  },
  transparent: {
    "background-color": "transparent",
    color: "white",
    "svg-color": "white",
    "loopbar-color": "#808086",
    "speedbar-color": "#666",
    "runningbar-color": "red",
    "cursor-color": "red",
    "speedbar-cursor-color": "red",
    "button-opacity": "0.8",
    "hover-color": "rgba(200, 200, 200, 0.5)",
    "slider-off-color": "#ccc",
    "slider-on-color": "red",
    "settings-border": "1px solid rgba(255,255,255,0.1)",
    "controls-border": "1px solid rgba(255,255,255,0.1)",
    "svg-selected-color": "red"
  },
  "on-top": {
    "controls-bottom": "0px",
    "settings-panel-bottom": "45px",
    "controls-position": "0px"
  },
  "position-default": {
    "controls-bottom": "-40px",
    "settings-panel-bottom": "5px",
    "controls-position": "40px"
  }
};

module.exports = theme => themes[theme];
