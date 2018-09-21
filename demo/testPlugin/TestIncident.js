const MC = require("@kissmybutton/motorcortex");
const { TimedIncident } = MC;

class TestIncident extends TimedIncident {
  onProgress(progress /*, millisecond*/) {
    for (let i = 0; i < this.elements.length; i++) {
      for (const attr in this.attrs.animatedAttrs) {
        const delta = this.attrs.animatedAttrs[attr] - this.initialValues[attr];
        const value = this.initialValues[attr] + delta * progress;
        this.elements[i].setAttribute(attr, value);
      }
    }
  }

  getScratchValue(mcid, attribute) {
    // console.log(this.props.mcid)
    if (this.props.mcid) {
      return this.attrs[attribute];
    }
    const element = this.getElementByMCID(mcid);
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
