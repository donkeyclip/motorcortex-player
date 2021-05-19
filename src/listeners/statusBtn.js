export default (_this) => {
  _this.elements.statusButton.onclick = () => {
    switch (_this.clip.runTimeInfo.state) {
      case "playing":
        _this.clip.pause();
        break;

      case "paused":
      case "idle":
      case "transitional":
      case "armed":
        _this.clip.play();
        break;
    }

    return false;
  };
};
