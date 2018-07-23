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
      type: attrs.splitType || "word"
    };
  }

  onGetContext() {
    const { type } = this.configurations;
    const splitRegex = type === "char" ? undefined : /(\s+)/;

    const isInEffect = this.isInEffect(this.attrs.type);
    const isOutEffect = this.isOutEffect(this.attrs.type);

    for (const i in this.elements) {
      charming(this.elements[i], { splitRegex });
      const childDivs = this.elements[i].getElementsByTagName("span");

      for (let q = 1; q <= childDivs.length; q++) {
        childDivs[q - 1].style.display = "inline-block";

        isInEffect ? (childDivs[q - 1].style.opacity = 0) : null;

        isOutEffect ? (childDivs[q - 1].style.opacity = 1) : null;

        childDivs[q - 1].innerHTML = childDivs[q - 1].innerHTML.replace(
          " ",
          "&nbsp;"
        );

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

  isInEffect(effect) {
    const { inEffects } = this.configurations;
    return /In/.test(effect) || inEffects.indexOf(effect) >= 0;
  }

  isOutEffect(effect) {
    const { outEffects } = this.configurations;
    return /Out/.test(effect) || outEffects.indexOf(effect) >= 0;
  }
}

module.exports = Textillate;
