const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const sentryScript = `<script src="https://browser.sentry-cdn.com/5.11.0/bundle.min.js" integrity="sha384-jbFinqIbKkHNg+QL+yxB4VrBC0EAPTuaLGeRT0T+NfEV89YC6u1bKxHLwoo+/xxY" crossorigin="anonymous">
</script>`;

const sentry = `
<script>
  (function () {
    Sentry.init({ dsn: 'https://8a2ec92cad9a4e6592cc152c03b31457@sentry.io/1878945' });
  })();
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
        sentryScript: devMode ? "" : sentryScript,
        sentry: devMode ? "" : sentry
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
      historyApiFallback: true,

      proxy: {
        "/api": {
          target: "http://localhost:4000",
          pathRewrite: { "^/api": "" }
        }
      }
    }
  };
};
