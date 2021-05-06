export default (config) => `
  <div
    class="--mc-player-pointer-event-panel"
    id="${config.name}-pointer-event-panel"
  ></div>
  <div
    class="--mc-player-pointer-event-panel"
    id="${config.name}-listener-helper"
  ></div>
  <div class="--mc-player-background"></div>
  <div id="${config.name}-controls" class="--mc-player-controls">
    <div class="--mc-player-grad"></div>
    <div id="${config.name}-totalbar" class="--mc-player-totalbar">
      <div id="${config.name}-hover-display" class="--mc-player-hover-display">
        <div id="${config.name}-hover-display-border" class="--mc-player-hover-display-border"> </div>
        <div id="${config.name}-hover-display-clip" class="--mc-player-hover-display-clip"> </div>
        <div id="${config.name}-hover-millisecond" class="--mc-player-hover-millisecond"></div>
      </div>
      <div id="${config.name}-loopbar" class="--mc-player-loopbar">
        <div
          class="${config.name}-loop-boundaries --mc-player-loopbar-start"
          id="${config.name}-loopbar-start"
        ></div>
        <div
          class="${config.name}-loop-boundaries --mc-player-loopbar-end"
          id="${config.name}-loopbar-end"
        ></div>
        <div id="${config.name}-helperbar" class="--mc-player-helperbar"></div>
        <div id="${config.name}-runningbar" class="--mc-player-runningbar">
          <div id="${config.name}-cursor" class="--mc-player-cursor"></div>
        </div>
      </div>
    </div>
    <div id="${config.name}-left-buttons" class="--mc-player-left-buttons">
      <div id="${config.name}-status-btn" class="--mc-player-status-btn">
        ${config.svg.playSVG}
        <span id="${config.name}-indicator" class="--mc-player-indicator"></span>
      </div>
      <div id="${config.name}-volume" class="--mc-player-volume">
        <div id="${config.name}-volume-btn" class="--mc-player-volume-btn">
          ${config.svg.volumeSVG}
        </div>
        <div id="${config.name}-volumebar-helper" class="--mc-player-volumebar-helper"></div>
        <div id="${config.name}-volumebar" class="--mc-player-volumebar">
            <div id="${config.name}-volumebar-active" class="--mc-player-volumebar-active">
              <div id="${config.name}-volume-cursor" class="--mc-player-volume-cursor"></div>
            </div>
        </div>
      </div>
      <div id="${config.name}-time-display" class="--mc-player-time-display">
        <span id="${config.name}-time-current" class="--mc-player-time-current"></span>
        <span id="${config.name}-time-separator" class="--mc-player-time-separator"></span>
        <span id="${config.name}-time-total" class="--mc-player-time-total"></span>
      </div>
    </div>
    <div id="${config.name}-right-buttons" class="--mc-player-right-buttons">
      <div
        id="${config.name}-loop-btn-container" class="--mc-player-loop-btn-container"
      >
        <div
          id="${config.name}-loop-btn" class="--mc-player-loop-btn"
        >${config.svg.loopSVG}</div>
        <div
          id="${config.name}-loop-time" class="--mc-player-loop-time"
        >
          <span
            id="${config.name}-loopbar-start-time"
            class="${config.name}-loopbar-time --mc-player-loopbar-start-time"
          ></span>
          <span>:</span>
          <span
            id="${config.name}-loopbar-end-time"
            class="${config.name}-loopbar-time --mc-player-loopbar-end-time"
          ></span>
        </div>
      </div>
      <div
        id="${config.name}-settings-btn" class="--mc-player-settings-btn"
      >${config.svg.settingsSVG}</div>
      <div
        id="${config.name}-dc-btn" class="--mc-player-dc-btn"
      >
        ${config.svg.dcSVG}
      </div>
      <div
        id="${config.name}-full-screen-btn" class="--mc-player-full-screen-btn"
      >${config.svg.fullScreenSVG}</div>
    </div>
  </div>
  <div id="${config.name}-settings-panel" class="--mc-player-settings-panel">
    <ul id="${config.name}-main-settings" class="--mc-player-main-settings">
      <li id="${config.name}-settings-pointer-events" class="--mc-player-settings-pointer-events">
        <label>Pointer Events</label>
        <label class="switch settings-switch">
          <input id="${config.name}-pointer-events-checkbox" class="--mc-player-pointer-events-checkbox" type="checkbox">
          <span class="slider round"></span>
        </label>
      </li>
      <li id="${config.name}-settings-preview" class="--mc-player-settings-preview">
        <label>Show Preview</label>
        <label class="switch settings-switch">
          <input id="${config.name}-show-preview-checkbox" class="--mc-player-show-preview-checkbox" type="checkbox">
          <span class="slider round"></span>
        </label>
      </li>
      <li id="${config.name}-settings-indicator" class="--mc-player-settings-indicator">
        <label>Show Indicator</label>
        <label class="switch settings-switch">
          <input id="${config.name}-show-indicator-checkbox" class="--mc-player-show-indicator-checkbox" type="checkbox">
          <span class="slider round"></span>
        </label>
      </li>
      <li id="${config.name}-settings-volume" class="--mc-player-settings-volume">
        <label>Show Volume</label>
        <label class="switch settings-switch">
          <input id="${config.name}-show-volume-checkbox" class="--mc-player-show-volume-checkbox" type="checkbox">
          <span class="slider round"></span>
        </label>
      </li>
      <li id="${config.name}-settings-speed-show" class="--mc-player-settings-speed-show">
        <label>Speed</label>
        <div class="${config.name}-speed-btn">${config.svg.arrowRightSVG}</div>
        <span id="${config.name}-speed-current" class="--mc-player-speed-current"></span>
      </li>
    </ul>
    <ul id="${config.name}-speed-settings" class="--mc-player-speed-settings">
      <li id="${config.name}-settings-speed-hide" class="--mc-player-settings-speed-hide">
        <div class="${config.name}-speed-btn">${config.svg.arrowLeftSVG}</div>
        <label id=${config.name}-speed-runtime" class="--mc-player-speed-runtime">Speed</label>
      </li>
      <li>
        <div id="${config.name}-speed-value-helperbar" class="--mc-player-speed-value-helperbar"></div>
        <div id="${config.name}-speed-value-bar" class="--mc-player-speed-value-bar">
          <div
            class="${config.name}-speed-value-step --mc-player-speed-cursor"
            id="${config.name}-speed-cursor"
          >
            <div></div>
          </div>
        </div>
        <div id="${config.name}-speed-value" class="--mc-player-speed-value">
        </div>
      </li>
    </ul>
  </div>
`.replace(/(?:\r\n|\r|\n)/g, "");
