const { createUID } = require("../helpers");
module.exports = _this => {
  _this.elements.donkeyclipButton.addEventListener(`click`, () => {
    const u = createUID();
    const popupDC = window.open(`https://donkeyclip.com?u=${u}`);
    const definition = _this.clip.exportDefinition();
    const clipClass = _this.clipClass;
    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event) {
      if (event.data === u) {
        popupDC.postMessage(JSON.stringify({ definition, clipClass, u }), "*");
      }
    }
  });
};
