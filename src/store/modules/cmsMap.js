// import Vue from "vue"
export default {
    state: {
        latestMapId: "",
        latestCheckInput: ""
    },
    mutations: {
        setLatestMapId(state, data) {
            state.latestMapId = data
        },
        setLatestCheckInput(state, data) {
            state.latestCheckInput = data
        }
    },
    getters: {},
    actions: {}
}
