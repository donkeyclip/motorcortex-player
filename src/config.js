module.exports = {
  // the players start name
  name: "mc-player",

  // set the players total name
  set playerName(name) {
    this.name += "-" + name;
  }
};
