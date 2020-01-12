const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const path = require("path");

const GA = `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-129566070-3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-129566070-3');
</script>
`;

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";

  return {
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
        favicon: "src/assets/favicon.png",
        GA: devMode ? "" : GA
      }),

      new MiniCssExtractPlugin({
        filename: devMode ? "main.css" : "main.[hash].css",
        chunkFilename: devMode ? "main.[id].css" : "main.[id].[hash].css"
      })

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
};
