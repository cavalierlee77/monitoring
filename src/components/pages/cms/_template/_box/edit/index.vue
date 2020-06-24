<template>
    <el-container class="cms-edit-wrap">
        <el-header class="cms-edit-header-outwrap" height="40px">
            <edit-header :title="title"></edit-header>
        </el-header>
        <el-container
            class="cms-edit-container-outwrap"
            v-bind:style="{ height: frameheight }"
        >
            <el-aside :width="asideWidth">
                <edit-aside :secHei="parseInt(frameheight)"></edit-aside>
            </el-aside>
            <el-main class="cms-edit-main-outwrap">
                <edit-main :frameheight="frameheight"></edit-main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    created() {
        if (document.body.clientWidth >= 1660) {
            this.asideWidth = "360px"
        } else {
            this.asideWidth = "240px"
        }
    },
    data() {
        return {
            title: "情报板编辑",
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
        EditMain: () => import(/* webpackChunkName: "cms" */ "./_template/main")
    },
    mounted() {
        this.load()
        this.$options.sockets.onmessage = res => {
            // res.data为服务端返回的数据
            const data = JSON.parse(res.data)
            this.socketMsg = { ...data }
            console.log(data)
        }
    },
    methods: {
        resetFrameHeight() {
            this.frameheight =
                parseFloat(this.clientHeight) -
                parseFloat(this.headerHeight) -
                parseFloat(this.frameHeight) -
                20 +
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
                    parseFloat(this.frameHeight) -
                    20 +
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
                            list: info.devVarLastValue
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
@import "@pages/cms/_css/button.scss";
@import "@pages/cms/_css/buttonIcon.scss";
@import "@pages/cms/_css/query.scss";
@import "@pages/cms/_css/commonStyle.scss";
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
        background-color: #ddd;
        display: flex;
        padding: 8px 0 0 8px;
    }
}
</style>
