window.configUrls = {
    assetsPublicPath: "Monitoring/",
    websocketPath: "ws://15.64.168.35:8000/websocket/1231",
    axiosUrl: function(root, url) {
        if (url.includes("Monitor-Graph")) {
            return "http://15.64.168.35:8000"
        } else if (url.includes("collsvr")) {
            return "http://15.64.168.35:9090"
        }
        return root
    }
}
