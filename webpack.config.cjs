const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    publicPath: "./",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.[jt]sx?$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(webp|svg|woff2)$/i, type: "asset/resource" },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  devServer: {
    host: "127.0.0.1",
    port: 8080,
  },
};
