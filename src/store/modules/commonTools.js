import dialog from "./tools/dialog"
import commWebsocket from "./tools/websocket"
const state = {
    ...dialog.state,
    ...commWebsocket.state
}
const mutations = {
    ...dialog.mutations,
    ...commWebsocket.mutations
}
const getters = {
    ...dialog.getters,
    ...commWebsocket.getters
}
const actions = {
    ...dialog.actions,
    ...commWebsocket.actions
}
export default {
    state,
    getters,
    actions,
    mutations
}
