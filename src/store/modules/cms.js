import Vue from "vue"
import api from "../../../static/js/MyAxios.js"
import direction from "./cmsDirection"
import edit from "./cmsEdit"

const state = {
    ...direction.state, // 字典
    ...edit.state,
    title: "情报板展示", //
    // titleRount: [
    //     {
    //         title: "情报板管理",
    //         url: "list",
    //         children: [
    //             {
    //                 title: "情报板编辑",
    //                 url: "edit"
    //             },
    //             {
    //                 title: "情报板详情",
    //                 url: "detail"
    //             }
    //         ]
    //     }
    // ],
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
        { 所在线路: "roadName" },
        { 所在路段: "routeLineName" },
        { 具体位置: "stationInfo" },
        { 所在桩号: "devicePegNo" },
        { 品牌名称: "manufacturer" },
        // { 类型: "cmsTypeDesc" },
        { 像素尺寸: "cmsSizeDesc" },
        { 显示颜色: "cmsColorDesc" },
        { 情报板IP: "" }
        // { 串口服务器: "" },
        // { 端口号: "" }
    ],
    devVarTypeIds: [], // 设备下发控制（id）字典表
    sendBackList: [], // 下发返回信息列表
    checkList: { default: [] },
    checkListEmpty: {},
    errorDev: [],
    // statusDesc: [{ 状态: ["正常", "离线", "故障"] }],
    statusDesc: ["在线", "离线"],
    unableSelOptions: [],
    selStatusList: [],
    statusDescMap: {}
}

// getters
const getters = {}

// actions
const actions = {
    ...edit.actions,
    getDirections({ commit }) {
        return new Promise((resolve, reject) => {
            const url = "/Monitor-Graph/cms/getDeviceVarTypeInfo"
            api.post(url, {}, res => {
                if (res.resultCode === "100") {
                    commit("setDevVarTypeIds", res.resultData)
                    resolve()
                } else {
                    reject(res.resultMag)
                }
            })
        })
    },
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
            api.post(
                posturl,
                fmdata,
                res => {
                    if (res.resultCode === "100") {
                        resolve(res)
                    } else {
                        reject(res)
                    }
                },
                err => {
                    resolve(err)
                }
            )
        })
    }
}

// mutations
const mutations = {
    ...edit.mutations,
    setUnableSelOptions(state, data) {
        state.unableSelOptions = [...data]
    },
    setDevVarTypeIds(state, data) {
        data.forEach(dev => {
            if (dev.operateMode !== 1) {
                state.devVarTypeIds.push(dev)
            }
        })
    },
    setDynamicLink(state, data) {
        state.dynamicUrl = data
    },
    setCmsId(state, data) {
        state.cmsId = data
    },
    setDevInfos(state, data) {
        state.devInfoList = [...breakList(data)]
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
                const array = state.statusMap[list.orgId + "×" + list.devId]
                for (let i = 0; i < array.length; i++) {
                    if (array[i].devVarTypeId === list.devVarTypeId) {
                        _include = true
                        if (list.devVarLastValue === "1") {
                            Vue.set(array[i], "collCtrTime", list.collCtrTime)
                            Vue.set(
                                array[i],
                                "devVarLastValue",
                                list.devVarLastValue
                            )
                        } else if (list.devVarLastValue === "0") {
                            array.splice(i, 1)
                        }
                        break
                    }
                }
                if (!_include) {
                    if (list.devVarLastValue === "1") {
                        state.statusMap[list.orgId + "×" + list.devId].push(
                            list
                        )
                    }
                }
            } else {
                Vue.set(state.statusMap, list.orgId + "×" + list.devId, [])
                if (list.devVarLastValue === "1") {
                    Vue.set(state.statusMap, list.orgId + "×" + list.devId, [
                        { ...list }
                    ])
                }
            }
        })
        this.commit("setStatueDesc")
    },
    setStatueDesc(state, data) {
        Object.entries(state.statusMap).forEach(([k, v]) => {
            const statusDescList = v.map(dev => dev.devVarTypeDesc)
            const statusDesc = {}
            statusDesc.list = [...statusDescList]
            if (statusDescList.length > 0) {
                if (statusDescList.includes("通讯故障")) {
                    statusDesc.desc = "离线"
                    statusDesc.status = "中断"
                    statusDesc.warning = false
                    statusDesc.statusFlag = false
                } else {
                    statusDesc.desc = "在线"
                    statusDesc.status = "警告"
                    statusDesc.warning = true
                    statusDesc.statusFlag = true
                }
                statusDesc.flag = false
                this.commit("setErrorDev", k)
            } else if (statusDescList.length === 0) {
                statusDesc.desc = "在线"
                statusDesc.status = "正常"
                statusDesc.flag = true
                statusDesc.statusFlag = true
                this.commit("delErrorDev", k)
            }
            Vue.set(state.statusDescMap, k, { ...statusDesc })
        })
    },
    setDevCount(state, data) {
        state.devCount = data
    },
    setModelList(state, data) {
        state.cmsModelList = [...data, ...state.cmsModelList]
    },
    // 情报板设备信息重新组装
    remixCmsList(state, val) {
        this.commit("setDevCount", val.length)
        val.forEach(dev => {
            state.devMap = {
                ...state.devMap,
                [dev.orgId + "×" + dev.deviceId]: dev
            }
        })
        state.cmsList = Object.keys(state.devMap)
    },
    // 情报板节目单信息重新组装
    remixCmsInfo(state, val) {
        val.forEach(info => {
            state.cmsMap = {
                ...state.cmsMap,
                [info.orgId + "×" + info.deviceId]: info
            }
        })
    },
    CleanSendBack(state, data) {
        state.sendBackList = []
    },
    sendBack(state, data) {
        state.sendBackList = [...state.sendBackList, ...data]
        this.commit("resetPlaylist", data)
    },
    resetPlaylist(state, data) {
        data.forEach(info => {
            state.cmsMap[info.id].data = info.list
        })
    },
    setCheckList(state, data) {
        Object.entries(data).map(([ok, ov]) => {
            if (!state.checkList[ok]) {
                state.checkList = { ...state.checkList, [ok]: {} }
            }
            Object.entries(ov).map(([ik, iv]) => {
                if (iv.length > 0) {
                    if (!state.checkList[ok][ik]) {
                        state.checkList[ok] = {
                            ...state.checkList[ok],
                            [ik]: []
                        }
                    }
                    state.checkList[ok][ik] = [...iv]
                } else if (iv.length === 0) {
                    if (state.checkList[ok][ik]) {
                        delete state.checkList[ok][ik]
                    }
                }
            })
            if (Object.entries(state.checkList[ok]).length > 0) {
                // state.checkListEmpty = false
                Vue.set(state.checkListEmpty, ok, false)
            } else {
                // state.checkListEmpty = true
                Vue.set(state.checkListEmpty, ok, true)
            }
        })
        // Object.entries(data).map(([k, v]) => {
        //     if (v.length > 0) {
        //         if (!state.checkList.k) {
        //             state.checkList = { ...state.checkList, [k]: [] }
        //         }
        //         state.checkList[k] = [...v]
        //     } else if (v.length === 0) {
        //         if (state.checkList[k]) {
        //             delete state.checkList[k]
        //         }
        //     }
        // })
        // if (Object.entries(state.checkList).length > 0) {
        //     state.checkListEmpty = false
        // } else {
        //     state.checkListEmpty = true
        // }
    },
    setErrorDev(state, data) {
        if (!state.errorDev.includes(data)) {
            state.errorDev.push(data)
        }
    },
    delErrorDev(state, data) {
        const i = state.errorDev.findIndex(dev => dev === data)
        if (i >= 0) {
            state.errorDev.splice(i, 1)
        }
    }
}

function breakList(obj) {
    obj.forEach(dev => {
        const devInf = dev.deviceName.replace(/\s+/g, " ").split(" ")
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
