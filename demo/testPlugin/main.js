const TestIncident = require("./TestIncident");

module.exports = {
  npm_name: "@kissmybutton/test-plugin",
  incidents: [
    {
      exportable: TestIncident,
      name: "TestIncident"
    }
  ]
};
