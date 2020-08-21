import Vue from "vue"
export default {
    state: {
        socket: {
            // 连接状态
            isConnected: false,
            // 消息内容
            message: "",
            // 重新连接错误
            reconnectError: false
        }
    },
    mutations: {
        SOCKET_ONOPEN(state, event) {
            // 连接打开触发的函数
            Vue.prototype.$socket = event.currentTarget
            state.socket.isConnected = true
            // console.log("isConnected")
        },
        SOCKET_ONCLOSE(state, event) {
            // 连接关闭触发的函数
            state.socket.isConnected = false
            // console.log("ONCLOSE", event)
        },
        SOCKET_ONERROR(state, event) {
            // 连接发生错误触发的函数
            // console.error("ONERROR", state, event)
        },
        SOCKET_ONMESSAGE(state, message) {
            // 收到消息时触发的函数
            state.socket.message = message
        },
        SOCKET_RECONNECT(state, count) {
            // 重新连接触发的函数
            // console.info("RECONNECT", state, count)
        },
        SOCKET_RECONNECT_ERROR(state) {
            // 重新连接失败触发的函数
            state.socket.reconnectError = true
            // console.info("RECONNECTERROR", state)
        },
        resetReconnectError(state, data = false) {
            state.socket.reconnectError = data
        }
    },
    getters: {},
    actions: {
        customerAdded(context) {
            // 新连接添加函数
            console.log("action received: customerAdded")
            console.log(context)
        }
    }
}
