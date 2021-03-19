
const trigger = _this => {
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
};
module.exports = {
  trigger,
  add: _this => {
    _this.elements.fullScreenButton.onclick = () => trigger(_this);
  }
};
