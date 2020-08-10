<template>
    <el-container class="cms-detail-wrap">
        <el-header class="cms-detail-header-outwrap" height="80px">
            <edit-header :title="title"></edit-header>
        </el-header>
        <el-container
            class="cms-detail-container-outwrap"
            v-bind:style="{ height: frameheight }"
        >
            <!-- <el-aside :width="asideWidth">
                <edit-aside :secHei="parseInt(frameheight)"></edit-aside>
            </el-aside> -->
            <el-main class="cms-detail-main-outwrap">
                <detail-main></detail-main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    created() {
        // if (document.body.clientWidth >= 1660) {
        //     this.asideWidth = "360px"
        // } else {
        //     this.asideWidth = "240px"
        // }
    },
    data() {
        return {
            title: "情报板详情",
            frameheight: "",
            clientHeight: "",
            headerHeight: "",
            frameHeight: ""
        }
    },
    components: {
        EditHeader: () =>
            import(/* webpackChunkName: "cms" */ "./../edit/_template/header"),
        EditAside: () =>
            import(/* webpackChunkName: "cms" */ "./../edit/_template/aside"),
        DetailMain: () =>
            import(/* webpackChunkName: "cms" */ "./_template/main")
    },
    mounted() {
        this.load()
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
                ".cms-detail-header-outwrap"
            ).style.height
            this.resetFrameHeight()
            window.onresize = function temp() {
                this.clientHeight = `${document.documentElement.clientHeight}`
                this.headerHeight = document.querySelector(
                    ".el-header"
                ).style.height
                this.frameHeight = document.querySelector(
                    ".cms-detail-header-outwrap"
                ).style.height
                this.resetFrameHeight()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/Equipment/cms/_css/button.scss";
@import "@pages/Equipment/cms/_css/buttonIcon.scss";
@import "@pages/Equipment/cms/_css/query.scss";
$outwrap-borderline-color: #ddd;
.cms-detail-wrap {
    background-color: #fff;
    .cms-detail-header-outwrap {
        background-color: #fff;
        border-bottom: 1px solid $outwrap-borderline-color;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .cms-detail-main-outwrap {
        background-color: #ddd;
        display: flex;
        padding: 24px;
    }
}
</style>
