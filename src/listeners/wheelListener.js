export default (_this) => {
  window.addEventListener(
    "wheel",
    (e) => {
      _this.stepper(e.deltaY);
    },
    {
      passive: true,
    }
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      const currentY = e.touches[0].clientY;
      _this.lastY ??= currentY;
      const delta = -(currentY - _this.lastY);
      _this.stepper(delta * 1.5);
      _this.lastY = currentY;
    },
    { passive: true }
  );
  window.addEventListener(
    "touchend",
    () => {
      _this.lastY = null;
    },
    { passive: true }
  );
  window.addEventListener(
    "touchstart",
    () => {
      _this.cancelAnimation();
      _this.lastY = null;
    },
    { passive: true }
  );
};
