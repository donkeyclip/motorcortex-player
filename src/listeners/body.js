import { addListener } from "../helpers";

export default (_this) => {
  function handleFullScreenChange() {
    _this.elements.mcPlayer.classList.toggle(`full-screen`);
    _this.clip.props.host.classList.toggle(`full-screen`);
  }
  addListener("fullscreenchange", handleFullScreenChange);
  addListener("webkitfullscreenchange", handleFullScreenChange);
  addListener("mozfullscreenchange", handleFullScreenChange);
  addListener("MSFullscreenChange", handleFullScreenChange);
};
