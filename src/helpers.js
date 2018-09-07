module.exports = {
  el: selector => document.querySelectorAll(selector),
  elid: id => document.getElementById(id),
  eltag: tag => document.getElementsByTagName(tag),
  elcreate: tag => document.createElement(tag),
  addListener: function() {
    return document.addEventListener(...arguments);
  },
  removeListener: function() {
    return document.removeEventListener(...arguments);
  }
};
