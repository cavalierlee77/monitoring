module.exports = {
    // 腾讯云
    txurl: "http://liufeng-1257802238.picbj.myqcloud.com",
    alurl: "http://jllt-1256929003.picbj.myqcloud.com",
    proxy: {
        "/Monitor-Graph": {
            // target: "http://10.50.10.14:8080/",
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
    assetsPublicPath: "monitoring/",
    ABucket: "jllt-1256929003",
    ARegion: "ap-beijing",
    TBucket: "jllt-1256929003",
    TRegion: "ap-beijing"
}
