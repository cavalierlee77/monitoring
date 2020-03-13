import api from '../../../static/js/MyAxios'
import constant from '../constant/index'

const state = {
	layoutHgt: 0,
	road: constant.road,
	leftMenus: constant.leftMenu,
	loginUser: {}
}

// getters
const getters = {}

// actions
const actions = {
	// 调整窗口高度
	getHeight({ commit }: any) {
		const winHeight = window.innerHeight
		const headerHeight = 166
		const height = winHeight - headerHeight
		commit('setHeight', height)
	},
	// 获取登录用户信息
	getUserInfo({ commit }: any, fmdata: any) {
		return new Promise((resolve, reject) => {
			api.post(
				'login/login',
				fmdata,
				(res: any) => {
					if (res.resultCode === '100') {
						commit('setUserInfo', res.resultData.user)
						resolve(res.resultData)
					} else {
						reject(res.resultMsg)
					}
				},
				(err: any) => {}
			)
		})
	}
}

// mutations
const mutations = {
	setHeight(state: any, data: any) {
		state.layoutHgt = data
	},
	setUserInfo(state: any, data: any) {
		state.loginUser = data
	},
	changeMenu(state: any) {
		state.leftMenus = constant.leftMenu
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
