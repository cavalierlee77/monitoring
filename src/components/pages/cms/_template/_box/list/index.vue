<template>
    <el-container class="container-outwrap">
        <el-header class="header-outwrap" height="80px">
            <cms-header></cms-header>
        </el-header>
        <el-main class="main-outwrap" v-bind:style="{ height: frameheight }">
            <cms-list></cms-list>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            frameheight: "",
            clientHeight: "",
            headerHeight: "",
            frameHeight: "",
            cmsList: [],
            awaitStatus: [],
            socketMsg: {}
        }
    },
    components: {
        CmsList: () =>
            import(/* webpackChunkName: "cms" */ "./_template/frame"),
        CmsHeader: () =>
            import(/* webpackChunkName: "cms" */ "./_template/header")
    },
    methods: {
        getBasicInfos() {
            // 获取字典表
            this.$store.dispatch("getDirections")
            // 获取情报板基本信息
            this.$store.dispatch("postDevInfo")
            // 获取情报板播放表
            this.$store.dispatch("postPlaylist")
        },
        resetFrameHeight() {
            this.frameheight =
                parseFloat(this.clientHeight) -
                parseFloat(this.headerHeight) -
                parseFloat(this.frameHeight) -
                20 +
                "px"
        },
        // 依据map得到情报板列表
        resetLists() {
            this.cmsList = Object.values(this.cmsMap)
            this.$store.commit("setCmsList", this.cmsList)
        },
        // 处理socket数据
        remixSocketMsg(val) {
            if (val.webInfoType) {
                if (val.webInfoType === "statusDataReturn") {
                    this.$store.commit("setStatusInfos", val.devVarInfoList)
                }
                if (val.webInfoType === "devCtrReturn") {
                    console.log(val)
                    this.$store.dispatch("postPlaylist")
                }
            }
        }
    },
    mounted() {
        this.getBasicInfos()
        // 计算高度
        this.clientHeight = `${document.documentElement.clientHeight}`
        this.headerHeight = document.querySelector(".el-header").style.height
        this.frameHeight = document.querySelector(
            ".header-outwrap"
        ).style.height
        this.resetFrameHeight()

        // 建立socket链接
        this.$connect("ws://10.21.2.33:8000/websocket/12312")
        // 监听socket
        this.$options.sockets.onmessage = res => {
            // res.data为服务端返回的数据
            const data = JSON.parse(res.data)
            this.socketMsg = data
        }

        window.onresize = function temp() {
            this.clientHeight = `${document.documentElement.clientHeight}`
            this.headerHeight = document.querySelector(
                ".el-header"
            ).style.height
            this.frameHeight = document.querySelector(
                ".header-outwrap"
            ).style.height
            this.resetFrameHeight()
        }
    },
    watch: {
        socketMsg: {
            handler(val) {
                this.remixSocketMsg(val)
            },
            immediate: true,
            deep: true
        },
        cmsMap: {
            handler(val) {
                this.resetLists(val)
            },
            deep: true
        }
    }
}
</script>

<style scoped lang="scss">
$outwrap-borderline-color: #ddd;

.header-outwrap {
    background-color: #fff;
    border-bottom: 1px solid $outwrap-borderline-color;
    box-sizing: border-box;
}
</style>
