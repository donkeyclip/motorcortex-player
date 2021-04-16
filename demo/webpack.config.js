const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./demo/index.js",
  resolve: {
    extensions: [".js"],
    modules: [path.resolve("./"), "node_modules"],
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    watchContentBase: true,
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: false,
    hot: false,
    contentBase: "./demo",
  },
};
