"use strict";

const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

const env = process.env.NODE_ENV === require("../config/prod.env");
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      MiniCssExtract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[hash:7].js"),
    chunkFilename: utils.assetsPath("js/[name].[hash:7].js")
  },
  optimization: {
    // 优化项
    runtimeChunk: {
      name: "manifest"
    },
    minimizer: [
      // 优化js
      new TerserPlugin({
        extractComments: /exceljs/i,
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      // 优化css//需要搭配cssnano=>postcss.config.js中文件
      new OptimizeCssAssetsPlugin({})
    ],
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 5
        },
        vue: {
          test: /vue.esm.js/,
          chunks: "initial",
          name: "enter",
          enforce: true
        },
        corejs: {
          test: /core-js/,
          chunks: "all",
          name: "enter",
          enforce: true
        },
        xlsx: {
          test: /exceljs[\\/]dist[\\/]es5[\\/]xlsx/,
          chunks: "all",
          name: "xlsx",
          enforce: true
        },
        doc: {
          test: /exceljs[\\/]dist[\\/]es5[\\/]doc/,
          chunks: "all",
          name: "doc",
          enforce: true
        },
        eutils: {
          test: /exceljs[\\/]dist[\\/]es5[\\/]utils/,
          chunks: "all",
          name: "eutils",
          enforce: true
        },
        ecsv: {
          test: /exceljs[\\/]dist[\\/]es5[\\/]csv/,
          chunks: "all",
          name: "ecsv",
          enforce: true
        },
        elementcommon: {
          test: /_element-ui@2.12.0@element-ui[\\/]lib[\\/]element-ui.common.js/,
          chunks: "initial",
          name: "elementcommon",
          enforce: true
        },
        // elementlib: {
        //   test: /_element-ui@2.12.0@element-ui[\\/]lib/,
        //   chunks: "initial",
        //   name: "elementlib",
        //   enforce: true
        // },
        zrender: {
          test: /_zrender@4.1.1@zrender[\\/]lib/,
          chunks: "initial",
          name: "zrender",
          enforce: true
        },
        moment: {
          test: /moment/,
          chunks: "initial",
          name: "moment",
          enforce: true
        },
        elliptic: {
          test: /elliptic/,
          chunks: "all",
          name: "elliptic",
          enforce: true
        },
        pako: {
          test: /pako/,
          chunks: "all",
          name: "pako",
          enforce: true
        },
        jszip: {
          test: /jszip/,
          chunks: "all",
          name: "jszip",
          enforce: true
        },
        vuex: {
          test: /vuex.esm.js/,
          chunks: "all",
          name: "enter",
          enforce: true
        },
        xlsxStyleFull: {
          test: /_xlsx-style@0.8.13@xlsx-style[\\/]dist[\\/]xlsx.full.min.js/,
          chunks: "all",
          name: "xlsxStyleFull",
          enforce: true
        },
        xlsxStyleCore: {
          test: /_xlsx-style@0.8.13@xlsx-style[\\/]dist[\\/]xlsx.core.min.js/,
          chunks: "all",
          name: "xlsxStyleCore",
          enforce: true
        },
        jquery: {
          test: /_jquery@3.4.1@jquery[\\/]dist/,
          chunks: "all",
          name: "jquery",
          enforce: true
        },
        echatsStyle: {
          test: /_echarts@4.4.0@echarts/,
          chunks: "all",
          name: "echatsStyle",
          enforce: true
        },
        vuerouter: {
          test: /vue-router.esm.js/,
          chunks: "all",
          name: "enter",
          enforce: true
        },
        coo: {
          test: /element-ui.common.js/,
          chunks: "all",
          name: "coo",
          enforce: true
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new HtmlWebpackPlugin({
      filename:
        process.env.NODE_ENV === "testing" ? "index.html" : config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: "none",
      hash: true,
      favicon: "./favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: devMode
        ? "static/css/[name].css"
        : "static/css/[name].[hash:7].css",
      chunkFilename: devMode
        ? "static/css/[name].css"
        : "static/css/[name].[hash:7].css"
    }),
    // 打包体积优化，详细分布查看插件
    new VueLoaderPlugin()
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
