module.exports = config => `
  <div
    class="pointer-event-panel"
    id="${config.name}-pointer-event-panel"
  ></div>
  <div
    class="pointer-event-panel"
    id="${config.name}-listener-helper"
  ></div>
  <div class="grad"></div>
  <div class="background"></div>
  <div id="${config.name}-controls">
    <div id="${config.name}-totalbar">
      <div id="${config.name}-hover-display">
        <div id="${config.name}-hover-millisecond"></div>
      </div>
      <div id="${config.name}-loopbar">
        <div
          class="${config.name}-loop-boundaries"
          id="${config.name}-loopbar-start"
        ></div>
        <div
          class="${config.name}-loop-boundaries"
          id="${config.name}-loopbar-end"
        ></div>
        <div id="${config.name}-helperbar"></div>
        <div id="${config.name}-runningbar">
          <div id="${config.name}-cursor"></div>
        </div>
      </div>
    </div>
    <div id="${config.name}-left-controls">
      <div id="${config.name}-status-btn">
        ${config.svg.playSVG}
        <span id="${config.name}-indicator"></span>
      </div>
      <div id="${config.name}-volume">
        <div id="${config.name}-volume-btn">
          ${config.svg.volumeSVG}
        </div>
        <div id="${config.name}-volumebar-helper"></div>
        <div id="${config.name}-volumebar">
            <div id="${config.name}-volumebar-active">
              <div id="${config.name}-volume-cursor"></div>
            </div>
        </div>
      </div>
      <div id="${config.name}-time-display">
        <span id="${config.name}-time-current"></span>
        <span id="${config.name}-time-separator"></span>
        <span id="${config.name}-time-total"></span>
      </div>
    </div>
    <div
      id="${config.name}-full-screen-btn"
      class="${config.name}-mc-right-controls"
    >${config.svg.fullScreenSVG}</div>
    <div
      id="${config.name}-settings-btn"
      class="${config.name}-mc-right-controls"
    >${config.svg.settingsSVG}</div>
    <div
      id="${config.name}-dc-btn"
      class="${config.name}-mc-right-controls"
    >
      ${config.svg.dcSVG}
    </div>
    <div
      id="${config.name}-loop-btn-container"
      class="${config.name}-mc-right-controls"
    >
      <div
        id="${config.name}-loop-btn"
        class="${config.name}-mc-right-controls"
      >${config.svg.loopSVG}</div>
      <div
        id="${config.name}-loop-time"
        class="${config.name}-mc-right-controls"
      >
        <span
          id="${config.name}-loopbar-start-time"
          class="${config.name}-loopbar-time"
        ></span>
        <span>:</span>
        <span
          id="${config.name}-loopbar-end-time"
          class="${config.name}-loopbar-time"
        ></span>
      </div>
    </div>

  </div>
  <div id="${config.name}-settings-panel">
    <ul id="${config.name}-main-settings">
      <li id="${config.name}-settings-pointer-events">
        <label>Pointer Events</label>
        <label class="switch settings-switch">
          <input id="${config.name}-pointer-events-checkbox" type="checkbox">
          <span class="slider round"></span>
        </label>
      </li>
      <li id="${config.name}-settings-preview">
        <label>Show Preview</label>
        <label class="switch settings-switch">
          <input id="${config.name}-show-preview-checkbox" type="checkbox">
          <span class="slider round"></span>
        </label>
      </li>
      <li id="${config.name}-settings-indicator">
        <label>Show Indicator</label>
        <label class="switch settings-switch">
          <input id="${config.name}-show-indicator-checkbox" type="checkbox">
          <span class="slider round"></span>
        </label>
      </li>
      <li id="${config.name}-settings-volume">
        <label>Show Volume</label>
        <label class="switch settings-switch">
          <input id="${config.name}-show-volume-checkbox" type="checkbox">
          <span class="slider round"></span>
        </label>
      </li>
      <li id="${config.name}-settings-speed-show">
        <label>Speed</label>
        <div class="${config.name}-speed-btn">${config.svg.arrowRightSVG}</div>
        <span id="${config.name}-speed-current"></span>
      </li>
    </ul>
    <ul id="${config.name}-speed-settings">
      <li id="${config.name}-settings-speed-hide">
        <div class="${config.name}-speed-btn">${config.svg.arrowLeftSVG}</div>
        <label id=${config.name}-speed-runtime>Speed</label>
      </li>
      <li>
        <div id="${config.name}-speed-value-helperbar"></div>
        <div id="${config.name}-speed-value-bar">
          <div
            class="${config.name}-speed-value-step"
            id="${config.name}-speed-cursor"
          >
            <div></div>
          </div>
        </div>
        <div id="${config.name}-speed-value">
        </div>
      </li>
    </ul>
  </div>
`;
