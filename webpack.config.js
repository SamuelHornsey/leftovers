const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const path = require("path");

const devMode = process.env.NODE_ENV === "production";

module.exports = {
  // entry file - starting point for the app
  entry: "./src/index.js",

  // where to dump the output of a production build
  output: {
    path: path.join(__dirname, "dist"),
    filename: devMode ? "bundle.js" : "bundle.[hash].js"
  },

  module: {
    rules: [
      {
        test: /\.jsx?/i,
        loader: "babel-loader"
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: { minimize: true }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/assets/favicon.png"
    }),

    new MiniCssExtractPlugin({
      filename: devMode ? "main.css" : "main.[hash].css",
      chunkFilename: devMode ? "main.[id].css" : "main.[id].[hash].css"
    }),

    // new WorkboxPlugin.GenerateSW()
  ],

  // enable Source Maps
  devtool: "source-map",

  devServer: {
    // serve up any static files from src/
    contentBase: path.join(__dirname, "src"),

    // enable gzip compression:
    compress: true,

    // enable pushState() routing, as used by preact-router et al:
    historyApiFallback: true
  }
};
