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

const createUID = () => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx".replace(/[xy]/g, function(c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    const rand = Math.random() > 0.5;
    const str = (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    return rand ? str.toUpperCase() : str;
  });
  return uuid;
};
