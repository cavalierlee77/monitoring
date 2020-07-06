module.exports = {
    pattern: "dev",
    // pattern: "prod",
    proxy: {
        "/Monitor-Graph": {
            target: "http://10.21.2.33:80/",
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                "^/Monitor-Graph": "/Monitor-Graph"
            }
        },
        "/collsvr": {
            target: "http://10.21.2.33:8000/",
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                "^/collsvr": "/collsvr"
            }
        }
    },
    assetsPublicPath: {
        dev: "monitoring/",
        prod: "Monitoring/"
    },
    websocketPath: {
        dev: "ws://10.21.2.33:8000/websocket/1231",
        prod: "ws://192.168.1.20:8080/websocket/1231"
    },
    axiosUrl: {
        dev: function(root, url) {
            return root
        },
        prod: function(root, url) {
            if (url.includes("Monitor-Graph")) {
                return "http://192.168.1.20:8888"
            } else if (url.includes("collsvr")) {
                return "http://192.168.1.20:8080"
            }
            return root
        }
    },
    // 阿里云
    alurl: "http://jllt-1256929003.picbj.myqcloud.com",
    ABucket: "jllt-1256929003",
    ARegion: "ap-beijing",
    // 腾讯云
    txurl: "http://liufeng-1257802238.picbj.myqcloud.com",
    TBucket: "jllt-1256929003",
    TRegion: "ap-beijing"
}
