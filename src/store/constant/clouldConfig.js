module.exports = {
  // 腾讯云
  txurl: "http://liufeng-1257802238.picbj.myqcloud.com",
  alurl: "http://jllt-1256929003.picbj.myqcloud.com",
  proxy: {
    "/jlgcstat/**": {
      target: "http://118.89.219.230:8080/",
      changeOrigin: true,
      secure: false
    },

    "/jlgcsubstat/**": {
      target: "http://118.89.219.230:8080/",
      changeOrigin: true,
      secure: false
    },
    // "/jlgcsubstat/**": {
    //   target: "http://139.129.111.60:8080/",
    //   changeOrigin: true,
    //   secure: false
    // },
    "/jlgreenchannelv13/**": {
      target: "http://124.235.153.50:9080/",
      changeOrigin: true,
      secure: false
    }
  },
  assetsPublicPath: "jlgcsubstat/",
  ABucket: "jllt-1256929003",
  ARegion: "ap-beijing",
  TBucket: "jllt-1256929003",
  TRegion: "ap-beijing"
  // txurl: "http://jllt-1256929003.picbj.myqcloud.com",
  // alurl: "http://liufeng-1257802238.picbj.myqcloud.com",
  // proxy: {
  //   "/jlgcstat/**": {
  //     target: "http://139.129.111.60:8080/",
  //     changeOrigin: true,
  //     secure: false
  //   },
  //   "/jlgcsubstat/**": {
  //     target: "http://139.129.111.60:8080/",
  //     changeOrigin: true,
  //     secure: false
  //   },
  //   "/jlgreenchannelv13/**": {
  //     target: "http://124.235.153.50:9080/",
  //     changeOrigin: true,
  //     secure: false
  //   }
  // },
  // TBucket: "liufeng-1257802238",
  // TRegion: "ap-beijing"
};
