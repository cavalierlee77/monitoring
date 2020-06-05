// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index.js"
import "../static/js/common.js"

// websocket
import VueNativeSocket from "vue-native-websocket"

Vue.config.productionTip = false

export const that = new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
})

// main.js
// base.lkWebSocket为你服务端websocket地址
Vue.use(VueNativeSocket, "ws://10.50.10.144:8000/websocket/1231", {
    // 启用Vuex集成,store的值为你的vuex
    store: store,
    // 数据发送/接收使用使用json格式
    format: "json",
    // 开启自动重连
    reconnection: true,
    // 尝试重连的次数
    reconnectionAttempts: 3,
    // 重连间隔时间
    reconnectionDelay: 3000,
    // 手动链接
    connectManually: true,
    // 将数据进行序列化，由于启用了json格式的数据传输这里需要进行重写
    passToStoreHandler: function(eventName, event) {
        if (!eventName.startsWith("SOCKET_")) {
            return
        }
        let method = "commit"
        let target = eventName.toUpperCase()
        let msg = event
        if (this.format === "json" && event.data) {
            try {
                msg = JSON.parse(event.data)
                if (msg.mutation) {
                    target = [msg.namespace || "", msg.mutation]
                        .filter(e => !!e)
                        .join("/")
                } else if (msg.action) {
                    method = "dispatch"
                    target = [msg.namespace || "", msg.action]
                        .filter(e => !!e)
                        .join("/")
                }
            } catch (error) {}
        }
        this.store[method](target, msg)
        this.store.state.commonTools.socket.message = msg
    }
})
