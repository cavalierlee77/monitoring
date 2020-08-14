module.exports = {
    pattern: "dev",
    // pattern: "prod",
    // pattern: "local",
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
    mapImagePath: {
        dev: "http://10.21.2.33/MonitoringImages/",
        pord: "",
        local: "http://10.21.2.33/MonitoringImages/"
    },
    assetsPublicPath: {
        dev: "monitoring/",
        prod: "Monitoring/",
        local: "Monitoring/"
    },
    websocketPath: {
        dev: "ws://10.21.2.33:8000/websocket/",
        prod: "ws://15.64.168.35:8000/websocket/",
        local: "ws://10.21.2.33:8000/websocket/"
    },
    axiosUrl: {
        dev: function(root, url) {
            return root
        },
        prod: function(root, url) {
            if (url.includes("Monitor-Graph")) {
                return "http://15.64.168.35:9090"
            } else if (url.includes("collsvr")) {
                return "http://15.64.168.35:8000"
            }
            return root
        },
        local: function(root, url) {
            if (url.includes("Monitor-Graph")) {
                return "http://10.21.2.33:80"
            } else if (url.includes("collsvr")) {
                return "http://10.21.2.33:8000"
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
