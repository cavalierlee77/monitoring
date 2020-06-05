import api from "../../../static/js/MyAxios.js"
import direction from "./cmsDirection"

const state = {
    ...direction.state, // 字典
    title: "情报板管理", //
    devCount: 0, // 情报板数量
    devInfoList: [], // 原始基本信息列表
    cmsInfoList: [], // 播放表
    cmsStatusList: [], // 状态列表
    cmsModelList: [
        {
            type: "128×64",
            width: "128px",
            height: "64px",
            textInfo: {
                fontFamily: "microsoft yahei",
                fontSize: "32",
                display: "1",
                interval: "3",
                color: "yellow"
            },
            txt: "小心驾驶\n安全出行",
            txtpArr: ["小心驾驶", "安全出行"],
            txtpStyle: {
                color: "yellow",
                "font-family": "microsoft yahei",
                "font-size": "32px",
                "line-height": "32px"
            }
        },
        {
            type: "320×32",
            width: "320px",
            height: "32px",
            textInfo: {
                fontFamily: "microsoft yahei",
                fontSize: "32",
                display: "1",
                interval: "5",
                color: "red"
            },
            txt: "小心驾驶 安全出行",
            txtpArr: ["小心驾驶 安全出行"],
            txtpStyle: {
                color: "red",
                "font-family": "microsoft yahei",
                "font-size": "32px",
                "line-height": "32px"
            }
        },
        {
            type: "192×96",
            width: "192px",
            height: "96px",
            textInfo: {
                fontFamily: "microsoft yahei",
                fontSize: "24",
                display: "1",
                interval: "5",
                color: "green"
            },
            txt: "小心驾驶\n安全出行\n安全是生命之本\n违章是事故之源",
            txtpArr: [
                "小心驾驶",
                "安全出行",
                "安全是生命之本",
                "违章是事故之源"
            ],
            txtpStyle: {
                color: "green",
                "font-family": "microsoft yahei",
                "font-size": "24px",
                "line-height": "24px"
            }
        },
        {
            type: "128×64",
            width: "128px",
            height: "64px",
            textInfo: {
                fontFamily: "microsoft yahei",
                fontSize: "32",
                display: "1",
                interval: "3",
                color: "red"
            },
            txt: "小心驾驶\n安全出行",
            txtpArr: ["小心驾驶", "安全出行"],
            txtpStyle: {
                color: "red",
                "font-family": "microsoft yahei",
                "font-size": "32px",
                "line-height": "32px"
            }
        },
        {
            type: "320×32",
            width: "320px",
            height: "32px",
            textInfo: {
                fontFamily: "microsoft yahei",
                fontSize: "32",
                display: "1",
                interval: "5",
                color: "green"
            },
            txt: "小心驾驶 安全出行",
            txtpArr: ["小心驾驶 安全出行"],
            txtpStyle: {
                color: "green",
                "font-family": "microsoft yahei",
                "font-size": "32px",
                "line-height": "32px"
            }
        },
        {
            type: "192×96",
            width: "192px",
            height: "96px",
            textInfo: {
                fontFamily: "microsoft yahei",
                fontSize: "24",
                display: "1",
                interval: "5",
                color: "yellow"
            },
            txt: "小心驾驶\n安全出行\n安全是生命之本\n违章是事故之源",
            txtpArr: [
                "小心驾驶",
                "安全出行",
                "安全是生命之本",
                "违章是事故之源"
            ],
            txtpStyle: {
                color: "yellow",
                "font-family": "microsoft yahei",
                "font-size": "24px",
                "line-height": "24px"
            }
        }
    ],
    cmsList: [], // 修改后情报板基本信息列表
    cmsGroupList: [],
    devMap: {}, // 情报板map
    cmsMap: {}, // 播放表map
    statusMap: {}, // 状态map
    awaitInfos: [], // 播放表等待列表
    awaitStatus: {}, // 状态等待列表
    dynamicUrl: "", // 路由字符串
    cmsId: "", // 当前情报板id,
    cmsDetailEntries: [
        { 所在线路: "routeLineId" },
        { 所在路段: "routeLineName" },
        { 位置: "devicePositionDesc" },
        { 桩号: "devicePegNo" },
        { 厂家: "manufacturer" },
        { 类型: "cmsTypeDesc" },
        { 尺寸: "cmsSizeDesc" },
        { 颜色: "cmsColorDesc" },
        { 情报板IP: "" },
        { 串口服务器: "" },
        { 端口号: "" }
    ]
}

// getters
const getters = {}

// actions
const actions = {
    postModelList({ commit }, fmdata) {
        commit("setModelList", fmdata)
    },
    // 获取情报板基本信息
    postDevInfo({ commit }) {
        return new Promise((resolve, reject) => {
            const posturl = "/Monitor-Graph/cms/getCmsBasicInfos"
            api.post(posturl, {}, res => {
                if (res.resultCode === "100") {
                    commit("setDevInfos", res.resultData)
                    resolve()
                } else {
                    reject(res.resultMag)
                }
            })
        })
    },
    // 获取播放表
    postPlaylist({ commit }) {
        return new Promise((resolve, reject) => {
            const posturl = "/Monitor-Graph/cms/getCjxtGatherDataChr"
            api.post(posturl, {}, res => {
                if (res.resultCode === "100") {
                    commit("setCmsInfos", res.resultData)
                    resolve()
                } else {
                    reject(res.resultMag)
                }
            })
        })
    },
    // 情报板下发
    postCmsInfos({ commit }, fmdata) {
        return new Promise((resolve, reject) => {
            const posturl = "/collsvr/devInfoSend"
            api.post(posturl, fmdata, res => {
                console.log(res)
                if (res.resultCode === "100") {
                    // commit("setCmsInfos", res.resultData)
                    resolve()
                } else {
                    reject(res.resultMag)
                }
            })
        })
    }
}

// mutations
const mutations = {
    setDynamicLink(state, data) {
        state.dynamicUrl = data
    },
    setCmsId(state, data) {
        state.cmsId = data
    },
    setDevInfos(state, data) {
        state.devInfoList = breakList(data)
        this.commit("remixCmsList", data)
    },
    setCmsInfos(state, data) {
        state.cmsInfoList = data
        this.commit("remixCmsInfo", data)
    },
    setStatusInfos(state, data) {
        data.forEach(list => {
            if (
                state.statusMap[list.orgId + "×" + list.devId] &&
                state.statusMap[list.orgId + "×" + list.devId].length > 0
            ) {
                let _include = false
                state.statusMap[list.orgId + "×" + list.devId].forEach(
                    status => {
                        if (status.devVarTypeId === list.devVarTypeId) {
                            _include = true
                            Object.keys(status).forEach(key => {
                                status[key] = list[key]
                            })
                        }
                    }
                )
                if (!_include) {
                    state.statusMap[list.orgId + "×" + list.devId].push(list)
                }
            } else {
                state.statusMap[list.orgId + "×" + list.devId] = []
                state.statusMap[list.orgId + "×" + list.devId].push(list)
            }
        })
        // console.log(state.cmsStatusList)
        // this.commit("remixStatusInfo", data)
    },
    setDevCount(state, data) {
        state.devCount = data
    },
    setModelList(state, data) {
        state.cmsModelList = [...data, ...state.cmsModelList]
    },
    setCmsList(state, data) {
        state.cmsList = data
    },
    // 情报板设备信息重新组装
    remixCmsList(state, val) {
        this.commit("setDevCount", val.length)

        val.forEach(dev => {
            state.devMap[dev.orgId + "×" + dev.deviceId] = {}
            state.devMap[dev.orgId + "×" + dev.deviceId] = dev
        })
        // state.awaitInfos.forEach(info => {
        //     Object.entries(info).map(([key, value]) => {
        //         state.cmsMap[info.orgId + "×" + info.deviceId][
        //             key
        //         ] = checkPlaylistData(value)
        //     })
        // })
        // Object.entries(state.cmsStatusList).map(([key, value]) => {
        //     state.cmsMap[key].status = []
        //     state.cmsMap[key].status.push(...value)
        // })
        state.cmsList = Object.keys(state.devMap)
    },
    // 情报板节目单信息重新组装
    remixCmsInfo(state, val) {
        val.forEach(info => {
            state.cmsMap[info.orgId + "×" + info.deviceId] = {}
            state.cmsMap[info.orgId + "×" + info.deviceId] = info
        })
    }
    // remixStatusInfo(state, data) {
    //     data.forEach(list => {
    //         if (
    //             state.statusMap[list.orgId + "×" + list.devId] &&
    //             state.statusMap[list.orgId + "×" + list.devId].length > 0
    //         ) {
    //             let _include = false
    //             state.statusMap[list.orgId + "×" + list.devId].forEach(
    //                 status => {
    //                     if (status.devVarTypeId === list.devVarTypeId) {
    //                         _include = true
    //                         Object.keys(status).forEach(key => {
    //                             status[key] = list[key]
    //                         })
    //                     }
    //                 }
    //             )
    //             if (!_include) {
    //                 state.statusMap[list.orgId + "×" + list.devId].push(list)
    //             }
    //         } else {
    //             state.statusMap[list.orgId + "×" + list.devId] = []
    //             state.statusMap[list.orgId + "×" + list.devId].push(list)
    //         }
    //     })
    // }
}

function checkPlaylistData(data) {
    try {
        if (typeof data === "string" && typeof JSON.parse(data) === "object") {
            return JSON.parse(data)
        }
    } catch (e) {}
    return data
}

function breakList(obj) {
    obj.forEach(dev => {
        const devInf = dev.deviceName.split(" ")
        dev.manufacturer = devInf[2]
        dev.stationInfo = devInf[1]
        dev.mapId = dev.orgId + "×" + dev.deviceId
    })
    return obj
}

export default {
    state,
    getters,
    actions,
    mutations
}
