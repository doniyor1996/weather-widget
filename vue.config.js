// const resolve = dir => require("path").join(__dirname, dir);

module.exports = {
  transpileDependencies: ["vue-echarts", "resize-detector"],
  publicPath: "/",
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
  // chainWebpack: config => {
  //   config.resolve.alias.set("@", resolve("src"));
  // },
  devServer: {
    port: 8080
  },
  runtimeCompiler: true
};
