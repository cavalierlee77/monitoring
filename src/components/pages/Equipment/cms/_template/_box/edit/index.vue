<template>
    <el-container class="cms-edit-wrap">
        <el-header class="cms-edit-header-outwrap" height="80px">
            <edit-header :title="title"></edit-header>
        </el-header>
        <el-container
            class="cms-edit-container-outwrap"
            v-bind:style="{ height: frameheight }"
        >
            <el-main class="cms-edit-main-outwrap">
                <edit-main :frameheight="frameheight"></edit-main>
                <edit-dynamic></edit-dynamic>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    created() {
        this.$store.commit("setEditDynamicLink", "EditBox")
    },
    data() {
        return {
            title: "播放表编辑与发布",
            socketMsg: {},
            frameheight: "",
            clientHeight: "",
            headerHeight: "",
            frameHeight: "",
            asideWidth: "0px",
            inFrameHeight: "0px"
        }
    },
    computed: {},
    components: {
        EditHeader: () =>
            import(/* webpackChunkName: "cms" */ "./_template/header"),
        EditAside: () =>
            import(/* webpackChunkName: "cms" */ "./_template/aside"),
        EditMain: () =>
            import(/* webpackChunkName: "cms" */ "./_template/main"),
        EditDynamic: () =>
            import(/* webpackChunkName: "cms" */ "./_template/_dynamiclink")
    },
    mounted() {
        this.load()
        this.$store.commit("setUnableSelOptions", [])
        this.$options.sockets.onmessage = res => {
            const data = JSON.parse(res.data)
            this.socketMsg = { ...data }
        }
    },
    methods: {
        resetFrameHeight() {
            this.frameheight =
                parseFloat(this.clientHeight) -
                parseFloat(this.headerHeight) -
                parseFloat(this.frameHeight) +
                "px"
        },
        load() {
            this.clientHeight = `${document.documentElement.clientHeight}`
            this.headerHeight = document.querySelector(
                ".el-header"
            ).style.height
            this.frameHeight = document.querySelector(
                ".cms-edit-header-outwrap"
            ).style.height
            this.resetFrameHeight()
            window.onresize = function temp() {
                this.clientHeight = `${document.documentElement.clientHeight}`
                this.headerHeight = document.querySelector(
                    ".el-header"
                ).style.height
                this.frameHeight = document.querySelector(
                    ".cms-edit-header-outwrap"
                ).style.height
                this.frameheight =
                    parseFloat(this.clientHeight) -
                    parseFloat(this.headerHeight) -
                    parseFloat(this.frameHeight) +
                    "px"
            }
        },
        // 处理socket数据
        remixSocketMsg() {
            const val = { ...this.socketMsg }
            if (val) {
                if (val.webInfoType === "statusDataReturn") {
                    this.$store.commit("setStatusInfos", val.devVarInfoList)
                }
                if (val.webInfoType === "devCtrReturn") {
                    const plArr = []
                    val.devVarInfoList.forEach(info => {
                        plArr.push({
                            id: info.orgId + "×" + info.devId,
                            list: info.devVarLastValue,
                            returnCode: val.returnState.returnCode,
                            returnMessage: val.returnState.returnMessage
                        })
                    })
                    this.$store.commit("sendBack", plArr)
                }
            }
        }
    },
    watch: {
        socketMsg: {
            handler(val) {
                this.remixSocketMsg(val)
            },
            immediate: true,
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/Equipment/cms/_css/button.scss";
@import "@pages/Equipment/cms/_css/buttonIcon.scss";
@import "@pages/Equipment/cms/_css/query.scss";
@import "@pages/Equipment/cms/_css/commonStyle.scss";
.cms-edit-wrap {
    background-color: #fff;
    .cms-edit-header-outwrap {
        background-color: #fff;
        border-bottom: 1px solid $outwrap-borderline-color;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .cms-edit-main-outwrap {
        background-color: #f3f3f3;
        display: flex;
        padding: 24px;
    }
}
</style>
