export function exitFullscreen() {
  try {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } catch (e) {
    console.error(e);
  }
}

export function launchIntoFullscreen(element) {
  try {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  } catch (e) {
    console.error(e);
  }
}

export function trigger(_this) {
  const elFullScreen = _this.clip.props.host.className.includes("full-screen");

  if (_this.clip.props.host !== _this.options.host) {
    if (!elFullScreen) {
      _this.clip.props.host.appendChild(_this.elements.mcPlayer);
    } else {
      _this.options.host.appendChild(_this.elements.mcPlayer);
    }
  }

  elFullScreen ? exitFullscreen() : launchIntoFullscreen(_this.clip.props.host);
}

export function add(_this) {
  _this.elements.fullScreenButton.onclick = () => trigger(_this);
}
