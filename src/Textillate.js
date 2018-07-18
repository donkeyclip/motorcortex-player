const MC = require("@kissmybutton/motorcortex");
const MCAnimateDefinition = require("@kissmybutton/motorcortex-animate");
const MCAnimate = MC.loadPlugin(MCAnimateDefinition);
const charming = require("charming");

class Textillate extends MC.Group {
  constructor(attrs = {}, props = {}) {
    super(attrs, props);
    this.configurations = {
      selector: ".texts",
      loop: false,
      // minDisplayTime: 2000, // change the millisectond of the animation added
      // initialDelay: 0, // change the millisecond of the animation added
      in: {
        effect: "fadeInLeftBig",
        delayScale: 1.5,
        delay: 50,
        sync: false,
        reverse: false,
        shuffle: false,
        callback: function() {}
      },
      out: {
        effect: "hinge",
        delayScale: 1.5,
        delay: 50,
        sync: false,
        reverse: false,
        shuffle: false,
        callback: function() {}
      },
      // autoStart: true, // provided by the motorcortex clip
      inEffects: [],
      outEffects: ["hinge"],
      callback: function() {},
      type: "word"
    };
  }

  onGetContext() {
    const splitRegex =
      this.configurations.type === "char" ? undefined : /(\s+)/;
    for (const i in this.elements) {
      charming(this.elements[i], { splitRegex });
      const childDivs = this.elements[i].getElementsByTagName("span");
      // console.log(childDivs )
      for (let q = 1; q <= childDivs.length; q++) {
        const animate = new MCAnimate.Animate(
          { type: this.attrs.type },
          {
            duration: this.props.duration / childDivs.length,
            selector: `.char${q}`
          }
        );
        this.addIncident(animate, (this.props.duration / childDivs.length) * q);
      }
    }
  }
}

module.exports = Textillate;
