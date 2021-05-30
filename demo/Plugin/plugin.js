import { Effect } from "@kissmybutton/motorcortex";

export default class Anime extends Effect {
  onProgress(f) {
    return (this.element.style.left = f * this.targetValue + "px");
  }
}
