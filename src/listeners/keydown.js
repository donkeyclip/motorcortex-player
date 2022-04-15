import { playPauseIconFunctionality } from "../helpers";
export function add(_this) {
  _this.elements.context.onkeydown = (e) => {
    switch (e.code) {
      case "Space": {
        playPauseIconFunctionality(_this);
        break;
      }
      case "ArrowRight": {
        _this.goToMillisecond(_this.clip.runTimeInfo.currentMillisecond + 5000);
        break;
      }
      case "ArrowLeft": {
        _this.goToMillisecond(_this.clip.runTimeInfo.currentMillisecond - 5000);
        break;
      }
    }
  };
}
