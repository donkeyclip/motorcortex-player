let timeout = setTimeout(() => {}, 0);
export function trigger(_this) {
  clearTimeout(timeout);
  _this.elements.playPausePanel.classList.remove("animate");
  _this.elements.playPausePanel.classList.add("hide");

  _this.elements.playPausePanel.classList.remove("hide");
  _this.elements.playPausePanel.classList.add("remove-animation");
  _this.elements.playPausePanel.classList.remove("remove-animation");
  if (_this.clip.runTimeInfo.state !== "playing") {
    _this.play();
    _this.addPlayIcon();
  } else {
    _this.pause();
    _this.addPauseIcon();
  }
  _this.elements.playPausePanel.classList.add("animate");
  timeout = setTimeout(() => {
    _this.elements.playPausePanel.classList.remove("animate");
    _this.elements.playPausePanel.classList.add("hide");
  }, 800);
}

export function add(_this) {
  _this.elements.pointerEventPanel.onclick = () => trigger(_this);
}
