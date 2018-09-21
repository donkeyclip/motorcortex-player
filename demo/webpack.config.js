const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname),

  entry: "./index.js",

  resolve: {
    extensions: [".js"],
    modules: [path.resolve("./"), "node_modules"]
  },
  output: {
    filename: "bundle.js",
    // the output bundle

    path: path.resolve(__dirname, "./" /*"./dist"*/)
  },

  devtool: "cheap-module-eval-source-map",
  mode: "development",

  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
            options: { sourceMap: true } // creates style nodes from JS strings
          },
          {
            loader: "css-loader",
            options: { sourceMap: true } // translates CSS into CommonJS
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true } // compiles Sass to CSS
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      Promise: "es6-promise",
      fetch:
        "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin()
    // do not emit compiled assets that include errors
  ],

  devServer: {
    watchContentBase: true, // initiate a page refresh if static content changes
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: false,
    hot: false,
    contentBase: "./demo"
  }
};
