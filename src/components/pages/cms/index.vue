<template>
    <div class="cms-wrap">
        <dynamic-link></dynamic-link>
    </div>
</template>

<script>
import { mapState } from "vuex"
import proxy from "@/store/constant/clouldConfig"
export default {
    data() {
        return {
            connectTimeout: "",
            ff: false
        }
    },
    computed: {
        ...mapState({
            reconnectError: state => state.commonTools.socket.reconnectError
        }),
        socketId: () => window.localStorage.getItem("socketid")
    },
    components: {
        DynamicLink: () =>
            import(
                /* webpackChunkName: "cms" */ "./../cms/_template/_dynamiclink"
            )
    },
    created() {
        this.$store.commit("setDynamicLink", "list")
        this.$connect(proxy.websocketPath[proxy.pattern] + this.socketId)
        // 建立socket链接
        console.log("建立socket链接")
        this.initializeWebSocket()
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
                this.connectTimeout = setTimeout(() => {
                    this.$connect(
                        proxy.websocketPath[proxy.pattern] + this.socketId
                    )
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
    beforeDestroy() {
        // 页面销毁时,断开连接
        console.log("页面销毁，断开socket连接")
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
</script>
<style lang="scss" scoped>
$outwrap-borderline-color: #ddd;
.cms-wrap {
    overflow: hidden;
}
</style>
