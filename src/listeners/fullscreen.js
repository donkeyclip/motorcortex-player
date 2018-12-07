module.exports = _this => {
  _this.elements.fullScreenButton.addEventListener(`click`, () => {
    const elFullScreen = _this.clip.props.host.className.includes(
      `full-screen`
    );
    _this.clip.props.host !== _this.options.host && !elFullScreen
      ? _this.clip.props.host.appendChild(_this.elements.mcPlayer)
      : null;
    _this.clip.props.host !== _this.options.host && elFullScreen
      ? _this.options.host.appendChild(_this.elements.mcPlayer)
      : null;

    elFullScreen
      ? _this.exitFullscreen()
      : _this.launchIntoFullscreen(_this.clip.props.host);
    _this.clip.props.host.classList.toggle(`full-screen`);
  });
};
