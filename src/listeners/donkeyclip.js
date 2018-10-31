module.exports = _this => {
  _this.elements.donkeyclipButton.addEventListener(`click`, () => {
    const u = create_UUID();
    const popupDC = window.open(`https://donkeyclip.com?u=${u}`);
    const definition = _this.clip.exportState({ unprocessed: true });
    const clipClass = _this.clipClass;
    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event) {
      if (event.data === u) {
        popupDC.postMessage(JSON.stringify({ definition, clipClass, u }), "*");
      }
    }
  });
};

function create_UUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
