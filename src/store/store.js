import Vue from "vue"
import Vuex from "vuex"
import constant from "./constant/index"
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        // 常量
        ctabs: constant.ctabs,
        leftMenus: constant.leftMenus,
        alurl: "http://liufeng-1257802238.picbj.myqcloud.com",
        txurl: "http://jllt-1256929003.picbj.myqcloud.com",
        userInfo: {
            curOrgName: "",
            curUserName: "",
            roleName: ""
        },
        mainheight: 100,
        page: {
            currentPage: 1,
            ppagesize: 50,
            total: 0
        },
        searchdata: {
            stationMasterMark: "",
            beginTime: "",
            endTime: "",
            goods: "",
            plateNumber: "",
            minCharge: "",
            maxCharge: "",
            verifyStatus: "",
            orgId: ""
        },
        // 审核查验页面数据
        // 审核页面分页数据
        car_check_truck_page: {
            currentPage: 1,
            pagesize: 50,
            total: 0
        },
        car_check_green_page: {
            currentPage: 1,
            pagesize: 50,
            total: 0
        },
        // 待审核查验记录
        bigtruck_addedCheckList: [],
        // 范围外查验记录
        bigtruck_offLimitsList: [],
        // 新增收费记录
        bigtruck_addedTollList: [],
        // 历史查询页面数据
        history_green: [],
        history_truck: [],
        car_history_truck_page: {
            currentPage: 1,
            pagesize: 50,
            total: 0
        },
        car_history_green_page: {
            currentPage: 1,
            pagesize: 50,
            total: 0
        },
        car_history_green_formData: {
            verifyStatus: "",
            plateNumber: "",
            maxCharge: "",
            minCharge: "",
            goods: "",
            beginTime: "",
            endTime: "",
            stationMasterMark: ""
        },
        car_history_truck_formData: {
            verifyStatus: "",
            plateNumber: "",
            maxCharge: "",
            minCharge: "",
            beginTime: "",
            endTime: ""
        },
        // 报表打印页面数据
        repGreenFormdata: {
            plateNumber: "",
            maxCharge: "",
            minCharge: "",
            goods: "",
            beginTime: "",
            endTime: ""
        },
        repTruckFormdata: {
            beginTime: "",
            endTime: ""
        },
        car_report_truck_page: {
            currentPage: 1,
            pagesize: 50,
            total: 0
        },
        car_report_green_page: {
            currentPage: 1,
            pagesize: 50,
            total: 0
        },
        report_green: [],
        report_truck: []
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
        },
        // 添加集装箱车记录
        addbac(state, data) {
            // 待审核查验记录
            state.bigtruck_addedCheckList = []
            state.bigtruck_addedCheckList = data
        },
        addbol(state, data) {
            // 范围外查验记录
            state.bigtruck_offLimitsList = []
            state.bigtruck_offLimitsList = data
        },
        addbat(state, data) {
            // 新增收费记录
            state.bigtruck_addedTollList = []
            state.bigtruck_addedTollList = data
        },
        addhisgreen(state, data) {
            // 绿通历史数据
            state.history_green = []
            state.history_green = data
        },
        addhistruck(state, data) {
            // 集装箱历史数据
            state.history_truck = []
            state.history_truck = data
        },

        // ------------报表页面方法-------------------
        addrepgreen(state, data) {
            // 绿通报表数据
            state.report_green = []
            state.report_green = data
        },
        addreptruck(state, data) {
            // 集装箱报表数据
            state.report_truck = []
            state.report_truck = data
        },
        addRepGreenTimeRange(state, data) {
            // 报表绿通页查询时间范围
            state.repGreenFormdata.beginTime = data[0]
            state.repGreenFormdata.endTime = data[1]
        },
        addRepTruckTimeRange(state, data) {
            // 报表集装箱页查询时间范围
            state.repTruckFormdata.beginTime = data[0]
            state.repTruckFormdata.endTime = data[1]
        },
        addRepGreenFormdata(state, data) {
            // 报表绿通页查询条件更新
            state.repGreenFormdata = data
        },
        addRepTruckFormdata(state, data) {
            // 报表集装箱页查询条件更新
            state.repTruckFormdata = data
        },
        // ------------endddddddddd-------------------
        // 添加搜索项内容
        addSearchOptions(state, data) {
            state.searchdata.stationMasterMark = data.stationMasterMark
            state.searchdata.beginTime = data.beginTime
            state.searchdata.endTime = data.endTime
            state.searchdata.goods = data.goods
            state.searchdata.plateNumber = data.plateNumber
            state.searchdata.minCharge = data.minCharge
            state.searchdata.maxCharge = data.maxCharge
            state.searchdata.verifyStatus = data.verifyStatus
            state.searchdata.orgId = data.orgId
        },
        // 添加审核页面分页数据
        addcar_check_truck_pagedata(state, data) {
            state.car_check_truck_page.currentPage = data.currentPage
            state.car_check_truck_page.pagesize = data.pagesize
        },
        addcar_check_truck_pagedata_total(state, data) {
            state.car_check_truck_page.total = data
        },
        addcar_check_green_pagedata(state, data) {
            state.car_check_green_page.currentPage = data.currentPage
            state.car_check_green_page.pagesize = data.pagesize
        },
        addcar_check_green_pagedata_total(state, data) {
            state.car_check_green_page.total = data
        },
        // 添加历史查询页面分页数据
        addcar_history_truck_formdata(state, data) {
            state.car_history_truck_formData = data
        },
        addcar_history_green_formdata(state, data) {
            state.car_history_green_formData = data
        },
        addcar_history_truck_pagedata(state, data) {
            state.car_history_truck_page.currentPage = data.currentPage
            state.car_history_truck_page.pagesize = data.pagesize
        },
        addcar_history_truck_pagedata_total(state, data) {
            state.car_history_truck_page.total = data
        },
        addcar_history_green_pagedata(state, data) {
            state.car_history_green_page.pagesize = data.pagesize
            state.car_history_green_page.currentPage = data.currentPage
        },
        addcar_history_green_pagedata_total(state, data) {
            state.car_history_green_page.total = data
        },
        // 添加报表页面分页数据
        addcar_report_truck_pagedata(state, data) {
            state.car_report_truck_page.currentPage = data.currentPage
            state.car_report_truck_page.pagesize = data.pagesize
        },
        addcar_report_truck_pagedata_total(state, data) {
            state.car_report_truck_page.total = data
        },
        addcar_report_green_pagedata(state, data) {
            state.car_report_green_page.currentPage = data.currentPage
            state.car_report_green_page.pagesize = data.pagesize
        },
        addcar_report_green_pagedata_total(state, data) {
            state.car_report_green_page.total = data
        },
        // 添加当前页
        addCurrentPage(state, data) {
            state.page.currentPage = data
        },
        // 添加页面大小
        addPageSize(state, data) {
            state.page.ppagesize = data
        },
        // 添加总条数
        addTotal(state, data) {
            state.page.total = data
        }
    }, // this.$store.commit('方法名称','按需传递的唯一参数')
    getters: {
        mainheight(state) {
            return state.mainheight
        },
        bigtruck_addedCheckList(state) {
            return state.bigtruck_addedCheckList
        },
        bigtruck_offLimitsList(state) {
            return state.bigtruck_addedCheckList
        },
        bigtruck_addedTollList(state) {
            return state.bigtruck_addedCheckList
        }
    } // this.$store.getters.***
})
