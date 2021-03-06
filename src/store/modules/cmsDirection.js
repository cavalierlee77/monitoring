export default {
    state: {
        directionColor: {
            y: "黄",
            r: "红",
            g: "绿"
        },
        directionShowColor: {
            y: "yellow",
            r: "red",
            g: "green"
        },
        directionFontFamily: {
            h: "黑体",
            s: "宋体",
            k: "楷体"
        },
        directionShowFontFamily: {
            h: "SimHei",
            s: "SimSun",
            k: "KaiTi"
        },
        directionFontSize: {
            16: 16,
            24: 24,
            32: 32,
            48: 48,
            64: 64
        },
        directionMode: {
            1: "立即显示",
            2: "左移",
            // 3: "右移",
            4: "上移"
            // 5: "下移"
        },
        directionDelay: {
            3: "3秒",
            5: "5秒"
        },
        directionSocketMagType: {
            devCtrReturn: "下发节目单返回信息",
            connect_success: "socket链接状态信息",
            statusDataReturn: "设备状态信息列表"
        },
        selectDir: {
            roadName: "路线",
            routeLineName: "路段",
            devicePositionDesc: "位置",
            deviceDirectDesc: "方向",
            cmsTypeDesc: "类型",
            manufacturer: "品牌",
            status: "状态"
        },
        statusDesc: ["在线", "离线"]
    },
    mutations: {},
    getters: {},
    actions: {}
}
