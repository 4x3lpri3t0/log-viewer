const webpack = require("webpack");
const config = require("./config.json");

const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const base_url = "/";

  return {
    resolve: {
      fallback: {
        fs: false,
        tls: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
      },
    },

    entry: "./src/index.jsx",
    devServer: { historyApiFallback: true },
    mode: "development",
    module: {
      rules: [
        {
          test: [/\.js$/, /\.jsx$/],
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/react",
                [
                  "@babel/preset-env",
                  {
                    targets: "> 0.25%, not dead",
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        base: base_url,
      }),
      // new CopyPlugin([{ from: "assets/", to: "assets/" }]),
      new webpack.DefinePlugin({
        WP_CONF_BASE_URL: JSON.stringify(base_url),
        WP_CONF_REMOTE_DB_URL: JSON.stringify(config.remote_db_url_dev),
        WP_CONF_REMOTE_DB_NAME: JSON.stringify(config.remote_db_name_dev),
      }),
    ],
  };
};
