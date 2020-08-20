"use strict"
const path = require("path")
const utils = require("./utils")
const config = require("../config")
const vueLoaderConfig = require("./vue-loader.conf")
const webpack = require("webpack")

function resolve(dir) {
    return path.join(__dirname, "..", dir)
}

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        // "babel-polyfill":"babel-polyfill",
        app: "./src/main.js"
    },
    output: {
        path: config.build.assetsRoot,
        filename: "[name].[hash:7].js",
        publicPath:
            process.env.NODE_ENV === "production"
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src"),
            "@pages": resolve("src/components/pages"),
            "@common": resolve("src/components/common"),
            "@static": resolve("static")
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderConfig
            },
            {
                test: /\.js$/, // 使用babel解析js
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            // 预设
                            "@babel/preset-env"
                        ],
                        plugins: [
                            // 提案中语法 装饰器 解析
                            // eslint-disable-next-line quote-props
                            [
                                "@babel/plugin-proposal-decorators",
                                { legacy: true }
                            ],
                            // 提案中语法 类属性 解析
                            // eslint-disable-next-line quote-props
                            [
                                "@babel/plugin-proposal-class-properties",
                                { loose: true }
                            ],
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include: path.resolve(__dirname, "src"),
                exclude: [/node_modules/, /node_config/]
            },
            {
                test: /\.sass$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.html$/, // 处理html中img src中的图片
                use: "html-withimg-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/, // 处理各种类型文件 可以处理 webp
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            quality: 75,
                            limit: 1024,
                            name: utils.assetsPath("images/[hash:7]" + ".[ext]")
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty"
    },
    plugins: [
        new webpack.ProvidePlugin({
            Popper: ["popper.js", "default"]
        })
    ]
}
