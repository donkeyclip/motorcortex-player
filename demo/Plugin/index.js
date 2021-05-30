import Test from "./plugin";
export default {
  npm_name: "@kissmybutton/test-plugin",
  version: "0.0.0",
  incidents: [
    {
      exportable: Test,
      name: "Test",
    },
  ],
};
