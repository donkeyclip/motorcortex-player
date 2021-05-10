import { addListener, el, elFirstClass, elid } from "../helpers";

export default (_this) => {
  function handleFullScreenChange() {
    _this.elements.mcPlayer.classList.toggle(`full-screen`);
    _this.clip.props.host.classList.toggle(`full-screen`);
    if (_this.options.preview) {
      _this.setPreviewDimentions();
    }
  }
  addListener("fullscreenchange", handleFullScreenChange);
  addListener("webkitfullscreenchange", handleFullScreenChange);
  addListener("mozfullscreenchange", handleFullScreenChange);
  addListener("MSFullscreenChange", handleFullScreenChange);

  // el("body")[0].addEventListener("click", (e) => {
  //   if (e.target.className === `${_this.name}-speed-value`) {
  //     _this.clip.executionSpeed = e.target.dataset.speedValue;
  //     const speedDisplay = _this.clip.speed == 1 ? "Normal" : _this.clip.speed;
  //     _this.elements.speedCurrent.innerHTML = speedDisplay;

  //     const step = 1 / (_this.options.speedValues.length - 1);

  //     const positionY =
  //       -(e.target.dataset.zone * step - 1) *
  //       ((_this.options.speedValues.length - 1) * 16);

  //     elFirstClass(_this.elements.mcPlayer,`--mcp-speed-cursor`).style.top = `${positionY}px`;
  //   }
  // });
};
