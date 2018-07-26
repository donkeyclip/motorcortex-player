"use strict";

const _createClass = (function() {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

const MC = require("@kissmybutton/motorcortex");
const MCAnimateDefinition = require("@kissmybutton/motorcortex-animate");
const MCAnimate = MC.loadPlugin(MCAnimateDefinition);
const charming = require("charming");

const Textillate = (function(_MC$Group) {
  _inherits(Textillate, _MC$Group);

  function Textillate() {
    const attrs =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const props =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Textillate);

    const _this = _possibleConstructorReturn(
      this,
      (Textillate.__proto__ || Object.getPrototypeOf(Textillate)).call(
        this,
        attrs,
        props
      )
    );

    _this.configurations = {
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
        callback: function callback() {}
      },
      out: {
        effect: "hinge",
        delayScale: 1.5,
        delay: 50,
        sync: false,
        reverse: false,
        shuffle: false,
        callback: function callback() {}
      },
      // autoStart: true, // provided by the motorcortex clip
      inEffects: [],
      outEffects: ["hinge"],
      callback: function callback() {},
      type: attrs.splitType || "word"
    };
    return _this;
  }

  _createClass(Textillate, [
    {
      key: "onGetContext",
      value: function onGetContext() {
        const type = this.configurations.type;

        const splitRegex = type === "char" ? undefined : /(\s+)/;
        const isInEffect = this.isInEffect(this.attrs.type);
        const isOutEffect = this.isOutEffect(this.attrs.type);

        for (const i in this.elements) {
          if (!this.elements[i].getAttribute("aria-label")) {
            charming(this.elements[i], { splitRegex: splitRegex });
          }
          const childDivs = this.elements[i].getElementsByTagName("span");

          for (let q = 0; q < childDivs.length; q++) {
            childDivs[q].style.display = "inline-block";

            isInEffect ? (childDivs[q].style.opacity = 0) : null;

            isOutEffect ? (childDivs[q].style.opacity = 1) : null;

            childDivs[q].innerHTML = childDivs[q].innerHTML.replace(
              " ",
              "&nbsp;"
            );

            const animate = new MCAnimate.Animate(
              { type: this.attrs.type },
              {
                duration: this.props.duration / childDivs.length,
                selector: ".char" + (q + 1)
              }
            );

            this.addIncident(
              animate,
              (this.props.duration / childDivs.length) * q
            );
          }

          // this.elements[i].innerHTML = this.elements[i].getAttribute("aria-label");

          // create a programmatic incident to make the element as it was before charming
          // const restateElementStart = new MC.ProgrammaticIncident({
          //   command: {
          //     forwards: () => {
          //       console.log("Start forwards")
          //       // split text with charming
          //       charming(this.elements[i], { splitRegex });
          //     },
          //     backwards: () => {
          //       console.log("Start backwards")
          //       // reset element text
          //       this.elements[i].innerHTML = this.elements[i].getAttribute("aria-label");
          //     }
          //   }
          // });

          // const restateElementEnd = new MC.ProgrammaticIncident({
          //   command: {
          //     forwards: () =>{
          //       console.log("End forwards")
          //       // reset element text
          //       this.elements[i].innerHTML = this.elements[i].getAttribute("aria-label");
          //     },
          //     backwards: ()=>{
          //       console.log("End backwards")
          //       charming(this.elements[i], { splitRegex });
          //     }
          //   }
          // });
          // this.addIncident(restateElementStart,1)
          // this.addIncident(restateElementEnd,this.props.duration)
        }
      }
    },
    {
      key: "isInEffect",
      value: function isInEffect(effect) {
        const inEffects = this.configurations.inEffects;

        return /In/.test(effect) || inEffects.indexOf(effect) >= 0;
      }
    },
    {
      key: "isOutEffect",
      value: function isOutEffect(effect) {
        const outEffects = this.configurations.outEffects;

        return /Out/.test(effect) || outEffects.indexOf(effect) >= 0;
      }
    }
  ]);

  return Textillate;
})(MC.Group);

module.exports = Textillate;
