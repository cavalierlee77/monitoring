import Vue from 'vue'
import Vuex from 'vuex'
import constant from './constant/index'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		ctabs: constant.ctabs,
		leftMenu: constant.leftMenu,
		userInfo: {
			curOrgName: '',
			curUserName: '',
			roleName: ''
		},
		mainheight: 100,
		page: {
			currentPage: 1,
			ppagesize: 50,
			total: 0
		},
		searchdata: {
			stationMasterMark: '',
			beginTime: '',
			endTime: '',
			goods: '',
			plateNumber: '',
			minCharge: '',
			maxCharge: '',
			verifyStatus: '',
			orgId: ''
		},
		report: []
	},
	mutations: {
		getMainHeight(state, data) {
			state.mainheight = data
		},
		setLoginUserInfo(state, data) {
			state.userInfo.curOrgName = data.user.orgName
			state.userInfo.curUserName = data.user.userName
			state.userInfo.roleName = data.user.roleName
		},
		addbac(state, data) {
			state.bigtruck_addedCheckList = []
			state.bigtruck_addedCheckList = data
		},
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

		addCurrentPage(state, data) {
			state.page.currentPage = data
		},
		addPageSize(state, data) {
			state.page.ppagesize = data
		},
		addTotal(state, data) {
			state.page.total = data
		}
	},
	getters: {
		mainheight(state) {
			return state.mainheight
		}
	}
})
