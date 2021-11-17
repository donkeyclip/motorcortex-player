export default (_this) => {
  window.addEventListener("wheel", (e) => {
    const multiplier = e.deltaY < 0 ? -1 : 1;
    let newPosition =
      _this.clip.runTimeInfo.currentMillisecond +
      _this.clip.duration * 0.1 * multiplier;
    if (newPosition > _this.clip.duration) newPosition = _this.clip.duration;
    if (newPosition < 0) newPosition = 0;

    _this.createJourney(newPosition);
  });
};
