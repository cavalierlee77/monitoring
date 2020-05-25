import dialog from "./tools/dialog"

const state = {
    ...dialog.state
}
const mutations = {
    ...dialog.mutations
}
const getters = {
    ...dialog.getters
}
const actions = {
    ...dialog.actions
}

export default {
    state,
    getters,
    actions,
    mutations
}
