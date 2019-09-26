const TestIncident = require("./TestIncident");

module.exports = {
  name: "@kissmybutton/test-plugin",
  incidents: [
    {
      exportable: TestIncident,
      name: "TestIncident"
    }
  ]
};
