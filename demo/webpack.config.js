const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname),

  entry: "./index.js",

  output: {
    path: path.resolve(__dirname, "./"),
    // the output bundle
    filename: "./bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    host: "127.0.0.1",
    port: 8090,
    historyApiFallback: false,
    hot: true,
    static: path.join(__dirname),
  },
};
