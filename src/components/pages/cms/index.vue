<template>
    <div class="cms-wrap">
        <dynamic-link></dynamic-link>
    </div>
</template>

<script>
import proxy from "@/store/constant/clouldConfig"
export default {
    computed: {
        userId: () => JSON.parse(window.localStorage.getItem("users")).userId
    },
    components: {
        DynamicLink: () =>
            import(
                /* webpackChunkName: "cms" */ "./../cms/_template/_dynamiclink"
            )
    },
    created() {
        this.$store.commit("setDynamicLink", "list")
        this.$connect(proxy.websocketPath[proxy.pattern] + this.userId)
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
        }
    },
    beforeDestroy() {
        // 页面销毁时,断开连接
        console.log("页面销毁，断开socket连接")
        this.$disconnect()
    }
}
</script>
<style lang="scss" scoped>
$outwrap-borderline-color: #ddd;
.cms-wrap {
    overflow: hidden;
}
</style>
