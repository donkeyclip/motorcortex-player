const { elid, addListener, removeListener } = require(`../helpers`);

const MC = require(`@kissmybutton/motorcortex`);

const hoverTimeCapsule = new MC.TimeCapsule();

module.exports = _this => {
  // only on desctop devices
  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    const loopBarMouseInOut = () => {
      if (!_this.options.preview) {
        return;
      }
      elid(`${_this.name}-hover-display`).classList.toggle(`m-fadeOut`);
      elid(`${_this.name}-hover-display`).classList.toggle(`m-fadeIn`);
      elid(`${_this.name}-hover-display`).classList.toggle(
        `${_this.name}-hide`
      );

      if (elid(`${_this.name}-hover-display`).className.includes(`m-fadeIn`)) {
        _this.previewJourney = hoverTimeCapsule.startJourney(_this.previewClip);
      } else {
        _this.previewJourney.destination();
      }
      _this.elements.loopBar.onmousemove = loopBarMouseMove;
    };

    const loopBarAddListeners = () => {
      if (!_this.options.preview) {
        return;
      }
      loopBarMouseInOut();
      _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;
      _this.elements.loopBar.onmousemove = loopBarMouseMove;
      removeListener(`mouseup`, loopBarAddListeners, false);
      removeListener(`touchend`, loopBarAddListeners, false);
      removeListener(`mousemove`, loopBarMouseMove, false);
      removeListener(`touchmove`, loopBarMouseMove, false);
    };

    _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;

    _this.elements.loopBar.onmousedown = () => {
      if (!_this.options.preview) {
        return;
      }
      _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = null;
      _this.elements.loopBar.onmousemove = null;
      addListener(`mouseup`, loopBarAddListeners, false);
      addListener(`touchend`, loopBarAddListeners, false);
      addListener(`mousemove`, loopBarMouseMove, false);
      addListener(`touchmove`, loopBarMouseMove, false);
    };
    _this.elements.loopBar.onmouseup = () => {
      if (!_this.options.preview) {
        return;
      }
      removeListener(`mouseup`, loopBarAddListeners, false);
      removeListener(`touchend`, loopBarAddListeners, false);
      removeListener(`mousemove`, loopBarMouseMove, false);
      removeListener(`touchmove`, loopBarMouseMove, false);
      _this.elements.loopBar.onmouseover = _this.elements.loopBar.onmouseout = loopBarMouseInOut;
      _this.elements.loopBar.onmousemove = loopBarMouseMove;
    };

    const loopBarMouseMove = e => {
      const clientX = e.clientX;
      const viewportOffset = _this.elements.loopBar.getBoundingClientRect();
      if (
        clientX - viewportOffset.left + _this.settings.loopLastPositionXPxls >
          _this.settings.loopLastPositionXPxls +
            _this.elements.loopBar.offsetWidth &&
        !_this.settings.resizeLoop
      ) {
        elid(`${_this.name}-hover-millisecond`).innerHTML =
          _this.settings.loopEndMillisecond;
        return;
      } else if (
        clientX - viewportOffset.left < 0 &&
        !_this.settings.resizeLoop
      ) {
        elid(`${_this.name}-hover-millisecond`).innerHTML =
          _this.settings.loopStartMillisecond;
        return;
      }

      let positionX =
        clientX - viewportOffset.left + _this.settings.loopLastPositionXPxls;

      if (positionX < 0) {
        positionX = 0;
      }

      let left =
        positionX - elid(`${_this.name}-hover-display`).offsetWidth / 2;

      if (left < 0) {
        left = 0;
      } else if (
        left + elid(`${_this.name}-hover-display`).offsetWidth >
        _this.elements.totalBar.offsetWidth
      ) {
        left =
          _this.elements.totalBar.offsetWidth -
          elid(`${_this.name}-hover-display`).offsetWidth;
      }

      const ms = Math.round(
        (positionX / _this.elements.totalBar.offsetWidth) * _this.clip.duration
      );
      if (_this.options.preview) {
        _this.previewJourney.station(ms);
      }

      elid(`${_this.name}-hover-millisecond`).innerHTML = ms;
      elid(`${_this.name}-hover-display`).style.left = left + `px`;
    };
  }
};
