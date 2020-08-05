import Vue from "vue"
import Vuex from "vuex"
import common from "./modules/common.js"
import commonTools from "./modules/commonTools.js"
import cms from "./modules/cms"
const config = require("./constant/clouldConfig")

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isFlag: "2",
        // 常量
        txurl: config.txurl,
        alurl: config.alurl,
        ABucket: config.ABucket,
        ARegion: config.ARegion,
        TBucket: config.TBucket,
        TRegion: config.TRegion,
        userInfo: {
            curOrgName: "",
            curUserName: "",
            roleName: ""
        },
        mainheight: 100
    },
    mutations: {
        changeIsFlag(state, data) {
            state.isFlag = data
        }
    },
    modules: {
        common,
        commonTools,
        cms
    }
})
