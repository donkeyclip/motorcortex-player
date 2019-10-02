module.exports = _this => {
  _this.elements.statusButton.onclick = e => {
    e.preventDefault();
    // console.log(_this.clip);
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
    //not working below this
    else if (_this.clip.runTimeInfo.state === `idle`) {
      if (_this.clip.speed >= 0) {
        _this.clip.play();
        _this.settings.needsUpdate = true;
      } else {
        _this.createJourney(_this.clip, _this.settings.loopEndMillisecond - 1, {
          before: "pause",
          after: "play"
        });
        _this.settings.needsUpdate = true;
      }
    } else if (_this.clip.runTimeInfo.state === `completed`) {
      if (_this.clip.speed >= 0) {
        _this.createJourney(_this.clip, 0, {
          before: "pause",
          after: "play"
        });
        _this.settings.needsUpdate = true;
      } else {
        _this.createJourney(_this.clip, _this.settings.loopEndMillisecond - 1, {
          before: "pause",
          after: "play"
        });
        _this.settings.needsUpdate = true;
      }
    }
    return false;
  };
};
