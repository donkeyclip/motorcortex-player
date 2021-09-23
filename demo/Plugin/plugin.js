import { Effect } from "@donkeyclip/motorcortex";
window.x = 0;
export default class Anime extends Effect {
  onGetContext() {
    // window.unblock = () => {
    //   window.x = 1;
    //   this.unblock();
    // };
  }
  onProgress(f) {
    // if (!window.x) this.setBlock();
    return (this.element.style.left = f * 10 * this.targetValue + "px");
  }
}
