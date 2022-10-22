export default (_this) => {
  _this.elements.donkeyclipButton.addEventListener("click", () => {
    const clipID = window.DonkeyClip?.clipId;
    const staging = window.location.host.includes("staging") ? "staging." : "";
    window.open(
      `https://${staging}donkeyclip.com/${clipID ? `explore/donkeyclips/${clipID}` : ""}`
    );
  });
};
