export function trigger(_this) {
  const elFullScreen = _this.clip.props.host.className.includes("full-screen");

  if (_this.clip.props.host !== _this.options.host) {
    if (!elFullScreen) {
      _this.clip.props.host.appendChild(_this.elements.mcPlayer);
    } else {
      _this.options.host.appendChild(_this.elements.mcPlayer);
    }
  }

  elFullScreen
    ? _this.exitFullscreen()
    : _this.launchIntoFullscreen(_this.clip.props.host);
}

export function add(_this) {
  _this.elements.fullScreenButton.onclick = () => trigger(_this);
}
