// import api from "../../../static/js/MyAxios.js"

const state = {
    title: "情报板管理",
    devCount: 0,
    devInfoList: [],
    cmsInfoList: [],
    cmsStatusList: [],
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
    cmsList: [],
    cmsGroupList: []
}

// getters
const getters = {}

// actions
const actions = {
    getDevInfo({ commit }) {
        setTimeout(() => {
            const devInfoData = [
                {
                    road: "G16",
                    title: "赤峰",
                    orgId: "00",
                    devId: "00",
                    type: "通州电明",
                    station: "赤峰南收费站",
                    size: "128×64"
                },
                {
                    road: "G16",
                    title: "赤峰",
                    orgId: "00",
                    devId: "01",
                    type: "通州电明",
                    station: "赤峰南收费站",
                    size: "320×32"
                },
                {
                    road: "G306",
                    title: "赤承",
                    orgId: "02",
                    devId: "00",
                    type: "上海三思",
                    station: "赤承收费站",
                    size: "192×96"
                },
                {
                    road: "G15",
                    title: "赤峰",
                    orgId: "01",
                    devId: "00",
                    type: "通州电明",
                    station: "赤峰南收费站",
                    size: "192×96"
                },
                {
                    road: "G15",
                    title: "赤峰",
                    orgId: "01",
                    devId: "01",
                    type: "通州电明",
                    station: "赤峰南收费站",
                    size: "128×64"
                },
                {
                    road: "G15",
                    title: "赤峰",
                    orgId: "01",
                    devId: "02",
                    type: "通州电明",
                    station: "赤峰西收费站",
                    size: "128×64"
                }
            ]
            commit("setDevInfos", devInfoData)
        }, 2000)
    },
    getCmsInfo({ commit }) {
        setTimeout(() => {
            const cmsInfoData = [
                {
                    orgId: "00",
                    devId: "00",
                    display: "1",
                    interval: "5",
                    pages: [
                        [
                            {
                                text: "小心驾驶",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 0,
                                y: 0,
                                space: 0
                            },
                            {
                                text: "安全出行",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 0,
                                y: 33,
                                space: 0
                            }
                        ],
                        [
                            {
                                text: "安全出行",
                                fontsize: 24,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 12,
                                space: 2
                            },
                            {
                                text: "小心驾驶",
                                fontsize: 24,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 44,
                                space: 2
                            }
                        ]
                    ]
                },
                {
                    orgId: "00",
                    devId: "01",
                    display: "1",
                    interval: "3",
                    pages: [
                        [
                            {
                                text: "小心驾驶 出行平安",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 2,
                                y: 2,
                                space: 2
                            }
                        ]
                    ]
                },
                {
                    orgId: "02",
                    devId: "00",
                    display: "1",
                    interval: "3",
                    pages: [
                        [
                            {
                                text: "小心驾驶",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 32,
                                y: 8,
                                space: 0
                            },
                            {
                                text: "安全出行",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 32,
                                y: 56,
                                space: 0
                            }
                        ],
                        [
                            {
                                text: "小心驾驶",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ff0000",
                                x: 32,
                                y: 8,
                                space: 0
                            },
                            {
                                text: "安全出行",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ff0000",
                                x: 32,
                                y: 56,
                                space: 0
                            }
                        ]
                    ]
                },
                {
                    orgId: "01",
                    devId: "00",
                    display: "1",
                    interval: "3",
                    pages: [
                        [
                            {
                                text: "小心驾驶",
                                fontsize: 24,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 12,
                                space: 2
                            },
                            {
                                text: "安全出行",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 50,
                                space: 2
                            }
                        ],
                        [
                            {
                                text: "安全出行",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 12,
                                space: 2
                            },
                            {
                                text: "小心驾驶",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 44,
                                space: 2
                            }
                        ]
                    ]
                },
                {
                    orgId: "01",
                    devId: "01",
                    display: "1",
                    interval: "3",
                    pages: [
                        [
                            {
                                text: "小心驾驶",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 12,
                                space: 2
                            },
                            {
                                text: "安全出行",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 44,
                                space: 2
                            }
                        ],
                        [
                            {
                                text: "安全出行",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 12,
                                space: 2
                            },
                            {
                                text: "小心驾驶",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 44,
                                space: 2
                            }
                        ]
                    ]
                },
                {
                    orgId: "01",
                    devId: "02",
                    display: "1",
                    interval: "3",
                    pages: [
                        [
                            {
                                text: "小心驾驶",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 12,
                                space: 2
                            },
                            {
                                text: "安全出行",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 44,
                                space: 2
                            }
                        ],
                        [
                            {
                                text: "安全出行",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 12,
                                space: 2
                            },
                            {
                                text: "小心驾驶",
                                fontsize: 32,
                                fontfamily: "microsoft yahei",
                                color: "#ffff00",
                                x: 12,
                                y: 44,
                                space: 2
                            }
                        ]
                    ]
                }
            ]
            commit("setCmsInfos", cmsInfoData)
        }, 2000)
    },
    getStatusInfo({ commit }) {
        setTimeout(() => {
            const statusInfoData = [
                {
                    orgId: "00",
                    devId: "00",
                    status: "正常"
                },
                {
                    orgId: "00",
                    devId: "01",
                    status: "正常"
                },
                {
                    orgId: "02",
                    devId: "00",
                    status: "正常"
                },
                {
                    orgId: "01",
                    devId: "00",
                    status: "正常"
                },
                {
                    orgId: "01",
                    devId: "01",
                    status: "正常"
                },
                {
                    orgId: "01",
                    devId: "02",
                    status: "正常"
                }
            ]
            commit("setStatusInfos", statusInfoData)
        }, 2000)
    },
    postModelList({ commit }, fmdata) {
        commit("setModelList", fmdata)
    },
    postCmsInfos({ commit }, fmdata) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
                commit("setCmslist", fmdata)
            }, 4000)
            // api.post(posturl, fmdata, res => {
            //     if (res.resultCode == "100") {
            //         commit("setHisHistoryData", res.resultData)
            //         commit("setHisTotal", res.page.rows)
            //         resolve()
            //     } else {
            //         reject()
            //     }
            // })
        })
    }
}

// mutations
const mutations = {
    setDevInfos(state, data) {
        state.devInfoList = data
    },
    setCmsInfos(state, data) {
        state.cmsInfoList = data
    },
    setStatusInfos(state, data) {
        state.cmsStatusList = data
    },
    setDevCount(state, data) {
        state.devCount = data
    },
    setModelList(state, data) {
        state.cmsModelList = [...data, ...state.cmsModelList]
    },
    setCmslist(state, data) {
        const infoList = [...state.cmsInfoList]
        data.forEach(newInfo => {
            infoList.forEach(info => {
                if (
                    newInfo.orgId === info.orgId &&
                    newInfo.devId === info.devId
                ) {
                    info.interval = newInfo.interval
                    info.display = newInfo.display
                    info.pages.forEach((page, index) => {
                        Object.entries(newInfo.pages[index]).map(
                            ([key, val]) => {
                                page[key] = val
                            }
                        )
                    })
                }
            })
        })
        console.log("first")
        state.cmsInfoList = infoList
    },
    setCmsGroupList(state, data) {
        state.cmsGroupList = data
    },
    setCmsList(state, data) {
        state.cmsList = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
