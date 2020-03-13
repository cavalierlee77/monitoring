import api from '../../../static/js/MyAxios.js'

const state = {
	reportData: [],
	ExcelData: {},
	nowTab: '',
	repRelevance: {},
	road: []
}

// getters
const getters = {}

// actions
const actions = {
	getRepReportData({ commit, state }, fmdata) {
		const posturl = state.repRelevance[state.nowTab].posturl
		commit('setRepReportData', [])
		return new Promise((resolve, reject) => {
			api.post(posturl, fmdata, res => {
				if (res.resultCode == '100') {
					commit('setRepTotal', res.page.rows)
					commit('setRepReportData', res.resultData)
					resolve()
				} else {
					reject()
				}
			})
		})
	},
	getRepExcelData({ commit, state }, { fmdata, type }) {
		const posturl = state.repRelevance[type.val].posturl
		commit('clearRepExcelData')
		return new Promise((resolve, reject) => {
			api.post(posturl, fmdata, res => {
				if (res.resultCode == '100') {
					const data = res.resultData
					commit('setRepExcelData', { type, data })
					resolve()
				} else {
					reject()
				}
			})
		})
	}
}

// mutations
const mutations = {
	setRepReportData(state, data) {
		state.reportData = data
	},
	clearRepExcelData() {
		state.ExcelData = []
	},
	setRepExcelData(state, { type, data }) {
		state.ExcelData[type.name] = {
			ready: true,
			data: data
		}
	},
	setRepTotal(state, data) {
		state[state.repRelevance[state.nowTab].page].Total = data
	},
	setRepNowTab(state, data) {
		state.nowTab = data
	},
	setRepNowPage(state, data) {
		state[state.repRelevance[state.nowTab].page].currentPage = data.currentPage
		state[state.repRelevance[state.nowTab].page].pageSize = data.pageSize
	},
	setRepStatusList(state, data) {
		state.statusList = data
	},
	setRepGoodsList(state, data) {
		state.goodsList = data
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
