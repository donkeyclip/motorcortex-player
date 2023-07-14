export default (_this) => {
  function handleFullScreenChange() {
    _this.elements.mcPlayer.classList.toggle(`full-screen`);
    _this.clip.props.host.classList.toggle(`full-screen`);
  }
  _this.document.addEventListener("fullscreenchange", handleFullScreenChange);
  _this.document.addEventListener(
    "webkitfullscreenchange",
    handleFullScreenChange
  );
  _this.document.addEventListener(
    "mozfullscreenchange",
    handleFullScreenChange
  );
  _this.document.addEventListener("MSFullscreenChange", handleFullScreenChange);
};
