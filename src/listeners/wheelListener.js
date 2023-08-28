import { addListenerWithElement } from "../helpers";

const passive = {
  passive: true,
};

export default (_this) => {
  // initialize wheelseek options

  addListenerWithElement(window, "wheel", (e) => {
    _this.stepper(e.deltaY);
  });
  addListenerWithElement(
    window,
    "touchmove",
    (e) => {
      const currentY = e.touches[0].clientY;
      _this.lastY ??= currentY;
      const delta = -(currentY - _this.lastY);
      _this.stepper(delta);
      _this.lastY = currentY;
    },
    passive
  );
  addListenerWithElement(
    window,
    "touchend",
    () => {
      _this.lastY = null;
    },
    passive
  );
  addListenerWithElement(
    window,
    "touchstart",
    () => {
      _this.cancelAnimation();
      _this.lastY = null;
    },
    passive
  );
};
