import Test from "./plugin";
export default {
  npm_name: "@donkeyclip/test-plugin",
  version: "0.0.0",
  incidents: [
    {
      exportable: Test,
      name: "Test",
    },
  ],
};
