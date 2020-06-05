import api from "../../../static/js/MyAxios.js"
import constant from "../constant/index"

const state = {
    layoutHgt: 0,
    windowHgt: 0,
    cartabs: constant.ctabs,
    leftMenus: constant.leftMenus,
    userInfo: {}
}

// getters
const getters = {}

// actions
const actions = {
    // 调整窗口高度
    getHeight({ commit }) {
        const winHeight = window.innerHeight
        const headerHeight = 166
        const height = winHeight - headerHeight
        commit("setHeight", height)
    },
    getMainWindowHeight({ commit }) {
        const winHeight = window.innerHeight
        const headerHeight = 72
        const height = winHeight - headerHeight
        commit("setMainWindowHeight", height)
    },
    // 获取登录用户信息
    doLogin({ commit }, fmdata) {
        return new Promise((resolve, reject) => {
            api.post("/Monitor-Graph/login/login", fmdata, res => {
                if (res.resultCode === "100") {
                    commit("setUserInfo", res.resultData)
                    resolve(res.resultData)
                } else {
                    reject(res.resultMsg)
                }
            })
        })
    }
}

// mutations
const mutations = {
    setHeight(state, data) {
        state.layoutHgt = data
    },
    setMainWindowHeight(state, data) {
        state.windowHgt = data
    },
    setUserInfo(state, data) {
        state.userInfo.userId = data.userId
        state.userInfo.userName = data.userName
        state.userInfo.orgName = data.orgName
    },
    changeMenu(state, data) {
        if (data === "2") {
            state.leftMenus = constant.zhanjileftMenus
        } else {
            state.leftMenus = constant.fenjuleftMenus
        }
        state.leftMenus = constant.leftMenus
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
