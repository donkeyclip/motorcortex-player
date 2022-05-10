export default (_this) => {
  _this.elements.donkeyclipButton.addEventListener("click", () => {
    const id = window.location.pathname.split("/").pop();
    const staging = window.location.host.includes("staging") ? "staging." : "";
    window.open(`https://${staging}donkeyclip.com/explore/donkeyclips/${id}`);
  });
};
