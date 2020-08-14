import Vue from "vue"
export default {
    state: {
        editDynamicUrl: "",
        textInfo: {},
        txt: "",
        editTextInfo: {},
        editTxt: "",
        multipleSelection: [],
        multipleSelectionX: [],
        sendHistory: [],
        successIds: [],
        failureIds: [],
        listName: "default",
        editTextareaTips: ""
    },
    mutations: {
        setEditDynamicLink(state, data) {
            state.editDynamicUrl = data
        },
        setTextInfo(state, data) {
            state.textInfo = { ...data }
        },
        setTxt(state, data) {
            state.txt = data
        },
        setEditTextInfo(state, data) {
            state.editTextInfo = { ...data }
        },
        setEditTxt(state, data) {
            state.editTxt = data
        },
        setMultipleSelection(state, data) {
            state.multipleSelectionX = [...data]
            const _arr = []
            data.forEach(val => {
                _arr.push(val.data)
            })
            state.multipleSelection = [..._arr]
        },
        setSendHistory(state, data) {
            state.sendHistory = [...data]
        },
        setEditTextareaTips(state, data) {
            state.editTextareaTips = data
        },
        cleanSendIds(state) {
            state.successIds = []
            state.failureIds = []
        },
        setSendSuccessIds(state, data) {
            state.successIds = [...new Set([...state.successIds, ...data])]
        },
        setSendFailureIds(state, data) {
            state.failureIds = [...new Set([...state.failureIds, ...data])]
        },
        setCheckName(state, data) {
            state.listName = data
            if (!state.checkList[data]) {
                Vue.set(state.checkList, data, [])
            }
        },
        clearByCheckName(state, data) {
            if (state.checkList[data]) {
                Vue.set(state.checkList, data, [])
            }
        }
    },
    getters: {},
    actions: {}
}
