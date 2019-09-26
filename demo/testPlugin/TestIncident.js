const MC = require("@kissmybutton/motorcortex");
const { MonoIncident } = MC.API;

class TestIncident extends MonoIncident {
  onProgress(progress /*, millisecond*/) {
    const delta = this.targetValue - this.initialValues[this.attributeKey];
    const value = this.initialValues[this.attributeKey] + delta * progress;
    this.element.setAttribute(this.attributeKey, value);
  }

  getScratchValue() {
    const attribute = this.attributeKey;
    if (this.mcid) {
      return this.targetValue;
    }
    const element = this.element;
    if (element === null) {
      return null;
    }
    const val = element.getAttribute(attribute);
    if (val === null || val === "") {
      return 0;
    } else {
      return parseInt(val);
    }
  }
}

module.exports = TestIncident;
