import Vue from "vue"
import Vuex from "vuex"
import constant from "./constant/index"
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        // 常量
        leftMenus: constant.leftMenus,
        alurl: "http://liufeng-1257802238.picbj.myqcloud.com",
        txurl: "http://jllt-1256929003.picbj.myqcloud.com",
        // userInfo: {
        //     curOrgName: "",
        //     curUserName: "",
        //     roleName: ""
        // },
        mainheight: 100,
        page: {
            currentPage: 1,
            ppagesize: 50,
            total: 0
        }
    }, // this.$store.state.***
    mutations: {
        // 获取窗口高度
        getMainHeight(state, data) {
            state.mainheight = data
        },
        setLoginUserInfo(state, data) {
            state.userInfo.curOrgName = data.user.orgName
            state.userInfo.curUserName = data.user.userName
            state.userInfo.roleName = data.user.roleName
        }
    }, // this.$store.commit('方法名称','按需传递的唯一参数')
    getters: {
        mainheight(state) {
            return state.mainheight
        }
    } // this.$store.getters.***
})
