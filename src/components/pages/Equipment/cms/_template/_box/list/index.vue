<template>
    <el-container class="container-outwrap">
        <el-header class="header-outwrap" height="100px">
            <cms-header></cms-header>
        </el-header>
        <el-main class="main-outwrap" v-bind:style="{ height: frameheight }">
            <cms-list></cms-list>
        </el-main>
    </el-container>
</template>

<script>
// import { mapState } from "vuex"
import { InitializeWebSocket } from "@/assets/mixins/InitializeWebSocket.js"
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
    mixins: [InitializeWebSocket],
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

            this.$store.commit("setUnableSelOptions", [])
        },
        resetFrameHeight() {
            this.frameheight =
                parseFloat(this.clientHeight) -
                parseFloat(this.headerHeight) -
                parseFloat(this.frameHeight) +
                "px"
        },
        // 依据map得到情报板列表
        resetLists() {
            this.cmsList = Object.values(this.cmsMap)
            this.$store.commit("setCmsList", this.cmsList)
        }
    },
    mounted() {
        this.$store.commit("setCheckName", "list")
        // this.initializeWebSocket()
        this.getBasicInfos()
        // 计算高度
        this.clientHeight = `${document.documentElement.clientHeight}`
        this.headerHeight = document.querySelector(".el-header").style.height
        this.frameHeight = document.querySelector(
            ".header-outwrap"
        ).style.height
        this.resetFrameHeight()
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
