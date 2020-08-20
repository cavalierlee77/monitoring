// 项目文件需要放在【Monitoring】根文件夹内
// 【mapImagePath】地图图层文件地址
// 【websocketPath】websocket地址
// 【Monitor-Graph】‘Monitor-Graph’请求地址
// 【collsvr】‘collsvr’请求地址
window.config_ = {
    mapImagePath: "http://" + "10.21.2.33" + "/MonitoringImages/",
    websocketPath: "ws://" + "15.64.168.35:8000" + "/websocket/",
    axiosUrl: {
        "Monitor-Graph": "http://" + "15.64.168.35:9090",
        collsvr: "http://" + "15.64.168.35:8000"
    }
}
