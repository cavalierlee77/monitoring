import api from '../../../static/js/MyAxios'

const state = {
	RoadList: [],
	CmsList: []
}

// getters
const getters = {}

// actions
const actions = {
	getRoadList({ commit, state }: any, fmdata: any) {
		const posturl = state.hisRelevance[state.nowTab].posturl
		commit('setRoadList', [])
		return new Promise((resolve, reject) => {
			api.post(
				posturl,
				fmdata,
				(res: any) => {
					if (res.resultCode == '100') {
						commit('setRoadList', res.resultData)
						resolve()
					} else {
						reject()
					}
				},
				(err: any) => {}
			)
		})
	},
	getCmsList({ commit, state }: any) {
		const posturl = state.hisRelevance[state.nowTab].posturl
		commit('setCmsList', [])
		return new Promise((resolve, reject) => {
			api.post(
				posturl,
				{},
				(res: any) => {
					if (res.resultCode == '100') {
						const cmsList = res.resultData.map((status: any) => {
							return {
								color: status.color,
								size: status.size,
								text: status.text,
								x: status.x,
								y: status.y,
								family: status.family
							}
						})
						commit('setCmsList', cmsList)
						resolve()
					} else {
						reject()
					}
				},
				(err: any) => {}
			)
		})
	}
}

// mutations
const mutations = {
	setRoadList(state: any, data: any) {
		state.RoadList = data
	},
	setCmsList(state: any, data: any) {
		state.CmsList = data
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
