"use strict";

module.exports = function (_this) {
  _this.elements.donkeyclipButton.addEventListener("click", function () {
    var u = create_UUID();
    var popupDC = window.open("https://donkeyclip.com?u=".concat(u));

    var definition = _this.clip.exportState({
      unprocessed: true
    });

    var clipClass = _this.clipClass;
    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event) {
      if (event.data === u) {
        popupDC.postMessage(JSON.stringify({
          definition: definition,
          clipClass: clipClass,
          u: u
        }), "*");
      }
    }
  });
};

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}