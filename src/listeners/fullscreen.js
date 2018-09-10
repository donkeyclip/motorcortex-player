module.exports = _this => {
  _this.elements.fullScreenButton.addEventListener(`click`, () => {
    const elFullScreen = _this.clip.props.host.className.includes(
      `full-screen`
    );
    elFullScreen
      ? _this.exitFullscreen()
      : _this.launchIntoFullscreen(_this.clip.props.host);
    _this.clip.props.host.classList.toggle(`full-screen`);
  });
};
