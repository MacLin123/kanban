module.exports = {
  plugins: ["babel-plugin-react-compiler"],
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};
