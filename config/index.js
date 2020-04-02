const proxy = require("../src/store/constant/clouldConfig");
const path = require("path");

module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/" + proxy.assetsPublicPath,
    proxyTable: proxy.proxy,
    host: "localhost",
    port: 8080,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    devtool: "#eval-source-map",
    cacheBusting: false,
    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    // assetsPublicPath: "/",
    assetsPublicPath: "/" + proxy.assetsPublicPath,
    productionSourceMap: true,
    devtool: "#source-map",
    productionGzip: true,
    productionGzipExtensions: ["js", "css"],
    bundleAnalyzerReport: true
  }
};
