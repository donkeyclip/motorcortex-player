module.exports = (theme, name) => {
  const themes = {
    default: {
      "settings-background-color": "whitesmoke",
      "hms-background-color": "whitesmoke",
      "background-color": "whitesmoke",
      "grad-height": "0px",
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
      "preview-border": "1px solid rgba(0,0,0,1)",
      border: "1px solid rgba(255,255,255,0.2)",
      "controls-border": "none",
      "svg-selected-color": "red"
    },
    dark: {
      "settings-background-color": "black",
      "hms-background-color": "black",
      "background-color": "black",
      "grad-height": "0px",
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
      "preview-border": "1px solid rgba(0,0,0,1)",
      border: "1px solid rgba(255,255,255,0.2)",
      "controls-border": "none",
      "svg-selected-color": "red"
    },
    whiteGold: {
      "settings-background-color": "white",
      "hms-background-color": "white",
      "background-color": "white",
      "grad-height": "0px",
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
      "preview-border": "1px solid rgba(0,0,0,1)",
      border: "1px solid rgba(255,255,255,0.2)",
      "controls-border": "none",
      "svg-selected-color": "red"
    },
    darkGold: {
      "settings-background-color": "black",
      "hms-background-color": "black",
      "background-color": "black",
      "grad-height": "0px",
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
      "preview-border": "1px solid rgba(0,0,0,1)",
      border: "1px solid rgba(255,255,255,0.2)",
      "controls-border": "none",
      "svg-selected-color": "red"
    },
    transparent: {
      "background-color": "transparent",
      "settings-background-color": "rgba(0,0,0,0.5)",
      "hms-background-color": "rgba(0,0,0,0.5)",
      "preview-border": "1px solid rgba(0,0,0,1)",
      color: "white",
      "grad-height": "60px",
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
      border: "1px solid rgba(255,255,255,0.1)",
      "controls-border": "1px solid rgba(255,255,255,0.1)",
      "svg-selected-color": "red"
    },
    "mc-green": {
      "background-color": "#141416",
      "settings-background-color": "rgba(0,0,0,0.5)",
      "hms-background-color": "rgba(0,0,0,0.5)",
      "preview-border": "1px solid rgba(0,0,0,1)",
      color: "#999",
      "grad-height": "60px",
      "svg-color": "#999",
      "loopbar-color": "rgba(0,184,139,0.2)",
      "loopbar-boundaries-color": "#00b88b",
      "totalbar-color": "rgba(255, 255, 255, 0.11)",
      "speedbar-color": "#666",
      "runningbar-color": "#00b88b",
      "cursor-color": "#00b88b",
      "speedbar-cursor-color": "#00b88b",
      "button-opacity": "0.8",
      "hover-color": "rgba(0,184,139,0.2)",
      "slider-off-color": "#ccc",
      "slider-on-color": "#00b88b",
      border: "1px solid rgba(255,255,255,0.1)",
      "controls-border": "1px solid #151515",
      "svg-selected-color": "#00b88b",
      "loopbar-boundaries-style": `
        transform: translate(-50%,-37%);
        position: absolute;
        width: 18px;
        background-color: #00b88b;
        height: 18px;
        border-radius: 10px;
        z-index: 40;
        position: absolute;
        width: 18px;
        background-color: #00b88b;
        height: 18px;
        border-radius: 10px;
        z-index: 40;
        width: 18px;
        height: 9px;
        border-radius: 100%;
        top: 1.5px;
    `,
      "loopbar-boundaries-style::before": `
            width: 16px;
        height: 5px;
        background: #00b88b;
        border-radius: 100%;
        display: block;
        content: "";
        position: relative;
        left: -2px;
        top: 2px;
    `,
      "loopbar-boundaries-style::after": `
        width: 14px;
        height: 11px;
        border-radius: 100%;
        background: #00b88b;
        content: "";
        display: block;
        position: relative;
        top: -6px;
        left: 5px;
    `,
      "theme-style": `
        #${name}-loopbar-start {
            left: -9px !important;
            transform: rotate(180deg);
            top: -2px;
        }
    `
    },
    "mc-blue": {
      "background-color": "#141416",
      "settings-background-color": "rgba(0,0,0,0.5)",
      "hms-background-color": "rgba(0,0,0,0.5)",
      "preview-border": "1px solid rgba(0,0,0,1)",
      color: "#999",
      "grad-height": "60px",
      "svg-color": "#999",
      "loopbar-color": "rgba(0,153,225,0.2)",
      "loopbar-boundaries-color": "#0099e1",
      "totalbar-color": "rgba(255, 255, 255, 0.11)",
      "speedbar-color": "#666",
      "runningbar-color": "#0099e1",
      "cursor-color": "#0099e1",
      "speedbar-cursor-color": "#0099e1",
      "button-opacity": "0.8",
      "hover-color": "rgba(0,184,139,0.2)",
      "slider-off-color": "#ccc",
      "slider-on-color": "#0099e1",
      border: "1px solid rgba(255,255,255,0.1)",
      "controls-border": "1px solid #151515",
      "svg-selected-color": "#0099e1",
      "loopbar-boundaries-style": `
        transform: translate(-50%,-37%);
        position: absolute;
        width: 18px;
        background-color: #0099e1;
        height: 18px;
        border-radius: 10px;
        z-index: 40;
        position: absolute;
        width: 18px;
        background-color: #0099e1;
        height: 18px;
        border-radius: 10px;
        z-index: 40;
        width: 18px;
        height: 9px;
        border-radius: 100%;
        top: 1.5px;
    `,
      "loopbar-boundaries-style::before": `
            width: 16px;
        height: 5px;
        background: #0099e1;
        border-radius: 100%;
        display: block;
        content: "";
        position: relative;
        left: -2px;
        top: 2px;
    `,
      "loopbar-boundaries-style::after": `
        width: 14px;
        height: 11px;
        border-radius: 100%;
        background: #0099e1;
        content: "";
        display: block;
        position: relative;
        top: -6px;
        left: 5px;
    `,
      "theme-style": `
        #${name}-loopbar-start {
            left: -9px !important;
            transform: rotate(180deg);
            top: -2px;
        }
    `
    },
    "on-top": {
      "background-height": "100%",
      "pointer-event-panel-height": "calc(100% - 45px)",
      "controls-bottom": "0px",
      "settings-panel-bottom": "45px",
      "controls-position": "0px"
    },
    "position-default": {
      "background-height": "calc(100% - 40px)",
      "pointer-event-panel-height": "calc(100% - 40px)",
      "controls-bottom": "-0px",
      "settings-panel-bottom": "45px",
      "controls-position": "40px"
    }
  };

  return themes[theme];
};
