import { el, elid } from "../helpers";

export default (_this) => {
  document.addEventListener("fullscreenchange", () => {
    _this.elements.mcPlayer.classList.toggle(`full-screen`);
    _this.clip.props.host.classList.toggle(`full-screen`);
    if (_this.options.preview) {
      _this.setPreviewDimentions();
    }
  });
  document.addEventListener("webkitfullscreenchange", () => {
    _this.elements.mcPlayer.classList.toggle(`full-screen`);
    _this.clip.props.host.classList.toggle(`full-screen`);
    if (_this.options.preview) {
      _this.setPreviewDimentions();
    }
  });
  document.addEventListener("mozfullscreenchange", () => {
    _this.elements.mcPlayer.classList.toggle(`full-screen`);
    _this.clip.props.host.classList.toggle(`full-screen`);
    if (_this.options.preview) {
      _this.setPreviewDimentions();
    }
  });
  document.addEventListener("MSFullscreenChange", () => {
    _this.elements.mcPlayer.classList.toggle(`full-screen`);
    _this.clip.props.host.classList.toggle(`full-screen`);
    if (_this.options.preview) {
      _this.setPreviewDimentions();
    }
  });
  el(`body`)[0].addEventListener(`click`, (e) => {
    if (e.target.className === `${_this.name}-speed-value`) {
      let speedDisplay;
      _this.clip.executionSpeed = e.target.dataset.speedValue;
      _this.clip.speed == 1
        ? (speedDisplay = `Normal`)
        : (speedDisplay = _this.clip.speed);
      _this.elements.speedCurrent.innerHTML = speedDisplay;

      const step = 1 / (_this.options.speedValues.length - 1);

      const positionY =
        (e.target.dataset.zone * step - 1) *
        -1 *
        ((_this.options.speedValues.length - 1) * 16);

      elid(`${_this.name}-speed-cursor`).style.top = positionY + `px`;
    }
  });
};
