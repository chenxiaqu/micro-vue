module.exports = {
  publicPath: "./",
  devServer: {
    port: 3000,
    // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: `micro-vue`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_micro-vue`,
    },
  },
};
