import api from '../../../static/js/MyAxios.js'
const axios = require('axios')
const state = {}

// getters
const getters = {
	HeaderList: (state, getters) => {
		if (getters.NowSubMenu === 'addedTollList') {
			return state['Toll' + state.nowTab + 'HeaderList']
		} else {
			return state[state.nowTab + 'HeaderList']
		}
	},
	detailHeaderList: state => {
		return state['detail' + state.nowTab + 'HeaderList']
	},
	page: state => {
		return state[state.nowTab + 'page']
	},
	NowSubMenu: state => {
		const def = {
			// 默认
			currentPage: 1,
			pageSize: 50,
			Total: 0
		}
		state.GreenCarpage = def
		state.TruckCarpage = def
		state.MilitaryCarpage = def
		state.DisasterCarpage = def
		state.CombineHarvCarpage = def
		return state.subMenu
	}
}

// actions
const actions = {
	getTrafficInfoByPnTime({ commit }, fmdata) {
		return new Promise((resolve, reject) => {
			api.post('TrafficInfo/getTrafficInfoByPnTime', fmdata, res => {
				if (res.resultCode === '100') {
					commit('setTrafficInfoByPnTime', [])
					commit('setTrafficInfoByPnTime', res.resultData)
					resolve()
				} else {
				}
			})
		}).catch(function(reason) {
			console.log('catch:', reason)
		})
	}
}

// mutations
const mutations = {
	setchkcheckdata(state, data) {
		state.checkdata = data
	},
	setchkTollOffTime(state, data) {
		state.TollCutOffTime = data
	},
	setchkNowTab(state, data) {
		state.nowTab = data
	},
	setchkNowSubMenu(state, data) {
		state.subMenu = data
	},
	setTrafficInfoByPnTime(state, data) {
		state.TrafficInfoByPnTime = data
	},
	setTabsCount(state, data) {
		state.checktabs.map(item => {
			item.count = 0
		})
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
