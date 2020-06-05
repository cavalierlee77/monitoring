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
            s: "宋体",
            h: "黑体",
            k: "楷体"
        },
        directionShowFontFamily: {
            s: "SimSun",
            h: "SimHei",
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
        }
    },
    mutations: {},
    getters: {},
    actions: {}
}
