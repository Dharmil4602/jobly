const path = require("path");
const copyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/index.tsx"),
  },
  module: {
    rules: [
      // Seperate rule for css files
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      // Seperate rule for typescript files
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_APP_BACKEND_URL": JSON.stringify("http://localhost:5000"),
    }),
    // new webpack.DefinePlugin({
    //   "process.env": { REACT_APP_BACKEND_URL: "http://localhost:5000" },
    // }),
    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "../", "extension/build"),
        },
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "../", "extension/build"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".js", ".ts"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../", "extension/build"),
  },
  devtool: "inline-source-map", // Should be removed during production
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        // title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
