"use strict";

module.exports = {
  el: function el(selector) {
    return document.querySelectorAll(selector);
  },
  elid: function elid(id) {
    return document.getElementById(id);
  },
  eltag: function eltag(tag) {
    return document.getElementsByTagName(tag);
  },
  elcreate: function elcreate(tag) {
    return document.createElement(tag);
  },
  addListener: function addListener() {
    var _document;

    return (_document = document).addEventListener.apply(_document, arguments);
  },
  removeListener: function removeListener() {
    var _document2;

    return (_document2 = document).removeEventListener.apply(_document2, arguments);
  }
};