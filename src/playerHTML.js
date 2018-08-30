module.exports = config => `
  <div class="grad"></div>
  <div class="background"></div>
  <div id="mc-player-controls">
    <div id="mc-player-totalbar">
      <div id="mc-player-hover-display">
        <div id="mc-player-hover-millisecond"></div>
      </div>
      <div id="mc-player-loopbar">
        <div class="mc-player-loop-boundaries" id="mc-player-loopbar-start">
        </div>
        <div class="mc-player-loop-boundaries" id="mc-player-loopbar-end">
        </div>
        <div id="mc-player-helperbar"></div>
        <div id="mc-player-runningbar">
          <div id="mc-player-cursor"></div>
        </div>
      </div>
    </div>
    <div id="mc-player-status-btn">
      ${config.svg.playSVG}
      <span id="mc-player-indicator"></span>
    </div>
    <div id="mc-player-time-display">
      <span id="mc-player-time-current"></span>
      <span id="mc-player-time-separator"></span>
      <span id="mc-player-time-total"></span>
    </div>
    <div id="mc-player-loop-time">
      <span id="mc-player-loopbar-start-time" class="mc-player-loopbar-time"></span>
      <span>:</span>
      <span id="mc-player-loopbar-end-time" class="mc-player-loopbar-time"></span>
    </div>
    <div id="mc-player-loop-btn">${config.svg.loopSVG}</div>
    <div id="mc-player-settings-btn">${config.svg.settingsSVG}</div>
    <div id="mc-player-full-screen-btn">${config.svg.fullScreenSVG}</div>
  </div>
  <div id="mc-player-settings-panel">
    <ul id="mc-player-main-settings">
      <li id="mc-player-settings-indicator">
        <label>Show Indicator</label>
        <label class="switch settings-switch">
          <input id="mc-player-show-indicator-checkbox" type="checkbox">
          <span class="slider round"></span>
        </label>
      </li>
      <li id="mc-player-settings-speed-show">
        <label>Speed</label>
        <div class="mc-player-speed-btn">${config.svg.arrowRightSVG}</div>
        <span id="mc-player-speed-current"></span>
      </li>
    </ul>
    <ul id="mc-player-speed-settings">
      <li id="mc-player-settings-speed-hide">
        <div class="mc-player-speed-btn">${config.svg.arrowLeftSVG}</div>
        <label id=mc-player-speed-runtime>Speed</label>
      </li>
      <li>
        <div id="mc-player-speed-value-helperbar"></div>
        <div id="mc-player-speed-value-bar">
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
        </div>
        <div id="mc-player-speed-value">
          <div class="mc-player-speed-value" data-speed-value="4.0" data-zone="8">4</div>
          <div class="mc-player-speed-value" data-speed-value="2.0" data-zone="7">2</div>
          <div class="mc-player-speed-value" data-speed-value="1.0" data-zone="6">Normal</div>
          <div class="mc-player-speed-value" data-speed-value="0.5" data-zone="5">0.5</div>
          <div class="mc-player-speed-value" data-speed-value="0.0" data-zone="4">0</div>
          <div class="mc-player-speed-value" data-speed-value="-0.5" data-zone="3">-0.5</div>
          <div class="mc-player-speed-value" data-speed-value="-1.0" data-zone="2">-1</div>
          <div class="mc-player-speed-value" data-speed-value="-2.0" data-zone="1">-2</div>
          <div class="mc-player-speed-value" data-speed-value="-4.0" data-zone="0">-4</div>
        </div>
      </li>
    </ul>
  </div>
`;
