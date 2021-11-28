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
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: false,
    hot: true,
    static: path.join(__dirname),
  },
};
