import { mapState } from "vuex"
import proxy from "@/store/constant/clouldConfig"
const ConnectWebSocket = {
    data() {
        return {
            connectTimeout: ""
        }
    },
    computed: {
        ...mapState({
            reconnectError: state => state.commonTools.socket.reconnectError
        }),
        socketId: () => window.localStorage.getItem("socketid")
    },
    methods: {
        initializeWebSocket() {
            // 监听socket  心跳包信息
            this.$options.sockets.onmessage = res => {
                // res.data为服务端返回的数据
                const data = JSON.parse(res.data)
                if (data.webInfoType === "connect_heartbeat") {
                    this.$socket.send("get_heartbeat_success")
                }
            }
        },
        reconnect() {
            if (this.reconnectError) {
                this.$disconnect()
                const socketUrl = proxy.websocketPath[proxy.pattern]
                    ? proxy.websocketPath[proxy.pattern]
                    : window.config_.websocketPath
                this.connectTimeout = setTimeout(() => {
                    this.$connect(socketUrl + this.socketId)
                    this.$store.commit("resetReconnectError", false)
                }, 5000)
            } else {
                this.$store.commit("resetReconnectError")
                this.clearConnectTimeout()
            }
        },
        clearConnectTimeout() {
            try {
                clearTimeout(this.connectTimeout)
            } catch (error) {
                // console.log(error)
            }
        }
    },
    mounted() {
        const socketUrl = proxy.websocketPath[proxy.pattern]
            ? proxy.websocketPath[proxy.pattern]
            : window.config_.websocketPath
        this.$connect(socketUrl + this.socketId)
        // 建立socket链接
        // console.log("建立socket链接")
        this.initializeWebSocket()
    },
    beforeDestroy() {
        // 页面销毁时,断开连接
        // console.log("页面销毁，断开socket连接")
        this.$disconnect()
    },
    watch: {
        reconnectError: {
            handler(val) {
                this.reconnect()
            }
        },
        immediate: true,
        deep: true
    }
}

export { ConnectWebSocket }
