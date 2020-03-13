import Vue from 'vue'
import Vuex from 'vuex'
import Cms from './modules/cms'
// import Check from './modules/check.js'
import Common from './modules/common'
// import Report from './modules/report.js'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {
			UserName: ''
		},
		mainheight: 100
	},
	mutations: {},
	actions: {},
	modules: {
		Common,
		// Check,
		Cms
		// Report
	}
})
