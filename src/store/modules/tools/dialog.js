export default {
    state: {
        dialogStatus: false,
        dialogType: "",
        dialogData: {},
        dialogInfos: {}
    },
    mutations: {
        setDialogStatus(state, data) {
            state.dialogStatus = data
        },
        setDialogType(state, data) {
            state.dialogType = data
        },
        setDialogData(state, data) {
            state.dialogData = data
        },
        setDialogInfos(state, data) {
            state.dialogInfos = data
        }
    },
    getters: {},
    actions: {}
}
