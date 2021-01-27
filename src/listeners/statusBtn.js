module.exports = (_this) => {
  _this.elements.statusButton.onclick = (e) => {
    e.preventDefault();
    if (_this.clip.runTimeInfo.state === `playing`) {
      _this.clip.pause();
    } else if (
      _this.clip.runTimeInfo.state === `paused` ||
      _this.clip.runTimeInfo.state === `idle` ||
      _this.clip.runTimeInfo.state === `transitional` ||
      _this.clip.runTimeInfo.state === `armed`
    ) {
      _this.clip.play();
    }
    return false;
  };
};
