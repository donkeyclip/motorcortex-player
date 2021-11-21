export default (_this) => {
  window.addEventListener("wheel", _this.stepper.bind(_this));
};
