const path = require("path");
const copyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  mode: "development",
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
    new copyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "public"), to: path.resolve(__dirname, "../", "extension/build") },
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
    filename: "bundle.js",
    path: path.resolve(__dirname, "../", "extension/build")
  },
  devtool: "inline-source-map", // Should be removed during production
};
