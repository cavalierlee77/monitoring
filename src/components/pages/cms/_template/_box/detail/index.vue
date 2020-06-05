<template>
    <el-container class="cms-detail-wrap">
        <el-header class="cms-detail-header-outwrap" height="40px">
            <div class="header-inwrap">
                <section class="header-top">
                    <span>{{ title }}</span>
                    <button
                        class="p-button"
                        type="round"
                        size="mini"
                        @click="handleMenuItemClick"
                    >
                        <i class="el-icon-back"></i>
                        <span>返回</span>
                    </button>
                </section>
            </div>
        </el-header>
        <el-container
            class="cms-detail-container-outwrap"
            v-bind:style="{ height: frameheight }"
        >
            <el-aside class="cms-detail-aside-outwrap" width="360px">
                <header>
                    <div class="query-wrap" type="round" size="mini">
                        <i class="icon-custom icon-query"></i>
                        <input type="text" placeholder="请输入搜索内容" />
                    </div>
                    <el-popover placement="bottom" width="800" trigger="click">
                        <button
                            slot="reference"
                            class="p-button"
                            type="round"
                            size="mini"
                        >
                            <i class="icon-custom icon-screen"></i>
                            <span>全部</span>
                        </button>
                        <select-box></select-box>
                    </el-popover>
                </header>
                <section
                    :style="{ height: parseInt(frameheight) - 80 - 24 + 'px' }"
                >
                    <p
                        v-for="(dev, index) in devInfoList"
                        :key="index"
                        :class="{
                            checked:
                                dev.orgId === pageData.orgId &&
                                dev.deviceId === pageData.deviceId
                        }"
                        @click="changeDev(dev)"
                    >
                        {{ dev.roadName }} {{ dev.stationInfo }}
                    </p>
                </section>
            </el-aside>
            <el-main class="cms-detail-main-outwrap">
                <section class="cms-detail-main-inwrap">
                    <header>
                        <div class="in-header-top">
                            <p>
                                {{ pageData.roadName }}
                                {{ pageData.stationInfo }}
                            </p>
                        </div>
                        <div class="in-header-bottom"></div>
                    </header>
                    <section class="cms-detail-main">
                        <div class="cms-detail-main-left">
                            <p
                                v-for="([k, v], index) in cmsDetailEntries"
                                :key="index"
                            >
                                <span>{{ k }}:</span
                                ><span>{{ pageData[v] }}</span>
                            </p>
                            <p>
                                <span>当前状态：</span>
                                <span>{{ statusList.desc }}</span>
                            </p>
                            <p>
                                <span>故障描述：</span>
                                <span
                                    v-for="status in statusList.list"
                                    :key="status"
                                    >{{ status }}
                                </span>
                            </p>
                            <p>
                                <span>节目单数：</span>
                                <span>{{ pageList.length }}条</span>
                            </p>
                            <p>
                                <span>播放周期：</span>
                                <span>{{ pageType.cycle }}秒</span>
                            </p>
                            <!-- <p>
                                <span>发布时间：</span>
                                <span>{{
                                    pageData.deviceVar[pageData.issuedTypeId]
                                        .deviceVarDateTime
                                }}</span>
                            </p> -->
                        </div>
                        <div class="cms-detail-main-right">
                            <div
                                class="playlist-wrap"
                                :style="{
                                    height: parseInt(frameheight) - 80 + 'px'
                                }"
                            >
                                <div class="playlist-wrap-in">
                                    <div class="windows-wrap-in">
                                        <div
                                            class="player-wrap"
                                            v-for="(count, index) in pageList"
                                            :key="index"
                                            v-bind:style="{
                                                height:
                                                    parseInt(wrapStyle.height) +
                                                    40 +
                                                    'px'
                                            }"
                                        >
                                            <div class="player">
                                                <div
                                                    class="text-window"
                                                    v-bind:style="wrapStyle"
                                                >
                                                    <div
                                                        v-for="(txt,
                                                        index) in count.wordList"
                                                        v-bind:style="
                                                            txt.pstyle
                                                        "
                                                        :key="index"
                                                        class="txtp-wrap"
                                                    >
                                                        <p class="txtp">
                                                            {{ txt.wc }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            wrapStyle: {},
            pageData: {},
            frameheight: "",
            clientHeight: "",
            headerHeight: "",
            frameHeight: "",
            title: "情报板详情",
            data: {},
            statusList: {}
        }
    },
    computed: {
        ...mapState({
            dirShowColor: state => state.cms.directionShowColor,
            dirShowFontFamily: state => state.cms.directionShowFontFamily,
            dirShowFontSize: state => state.cms.directionFontSize,
            devInfoList: state => state.cms.devInfoList,
            devMap: state => state.cms.devMap,
            cmsMap: state => state.cms.cmsMap,
            statusMap: state => state.cms.statusMap,
            cmsId: state => state.cms.cmsId,
            cmsDetailEntries: state =>
                state.cms.cmsDetailEntries.map(a => Object.entries(a)[0])
        }),
        userId: () => JSON.parse(window.localStorage.getItem("users")).userId
    },
    components: {
        SelectBox: () =>
            import(
                /* webpackChunkName: "cms" */ "@pages/cms/_template/_fragments/selectbox.vue"
            )
    },
    mounted() {
        this.load()
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
        },
        handleMenuItemClick() {
            this.$store.commit("setDynamicLink", "list")
        },
        remixInfos() {
            this.data = this.devMap[this.cmsId]
            this.pageData = { ...this.data }
            this.pageType = { ...JSON.parse(this.cmsMap[this.cmsId].data) }
            this.pageType.cycle = 0
            this.pageList = [...this.pageType.itemList]
            this.pageList4Reset = this.cmsMap[this.cmsId].data
            this.remixPageList()
            this.setPageInfos()
        },
        remixPageList() {
            this.pageList.forEach(item => {
                this.pageType.cycle += item.delay
                const ph = this.pageType.dph / item.wordList.length
                item.wordList.forEach(word => {
                    word.pstyle = {
                        height: ph + "px",
                        top: word.wy + "px",
                        left: word.wx + "px",
                        "letter-spacing": 0 + "px",
                        "font-size": this.dirShowFontSize[item.fs] + "px",
                        color: this.dirShowColor[item.fc],
                        "font-family": this.dirShowFontFamily[item.fn],
                        "line-height": this.dirShowFontSize[item.fs] + "px"
                    }
                })
            })
        },
        setPageInfos() {
            this.wrapStyle = {
                width: this.data.width,
                height: this.data.height
            }
        },
        changeDev(dev) {
            const cmsId = dev.orgId + "×" + dev.deviceId
            this.$store.commit("setCmsId", cmsId)
        },
        remixStatus(val) {
            if (this.statusMap[val]) {
                this.statusList.desc = ""
                this.statusList.flag = true
                this.statusList.list = []
                this.statusMap[val].forEach(status => {
                    const count = this.statusList.list.findIndex(
                        s => s === status.devVarTypeDesc
                    )
                    if (status.devVarLastValue !== "0") {
                        if (count < 0) {
                            this.statusList.list.push(status.devVarTypeDesc)
                        }
                    }
                    if (status.devVarLastValue === "0") {
                        if (count >= 0) {
                            this.statusList.list.splice(count, 1)
                        }
                    }
                })
                if (this.statusList.list.length > 0) {
                    this.statusList.desc = "故障"
                    this.statusList.flag = false
                } else if (this.statusList.list.length === 0) {
                    this.statusList.desc = "正常"
                    this.statusList.flag = true
                }
            }
        }
    },
    watch: {
        cmsId: {
            handler(val) {
                this.remixInfos(val)
                this.remixStatus(val)
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/cms/_css/button.scss";
@import "@pages/cms/_css/buttonIcon.scss";
@import "@pages/cms/_css/query.scss";
$outwrap-borderline-color: #ddd;
$header-text-color: #07dbdb;
$border-color: rgb(209, 209, 209);
$hc-r: 7;
$hc-g: 219;
$hc-b: 219;
$transition-time: 240ms;
.cms-detail-wrap {
    background-color: #fff;
    .cms-detail-header-outwrap {
        background-color: #fff;
        border-bottom: 1px solid $outwrap-borderline-color;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > span {
            font-size: 18px;
            letter-spacing: 2px;
            color: $header-text-color;
            font-weight: 100;
        }
        .header-inwrap {
            width: 100%;
            height: 100%;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            section.header-top {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                > span {
                    display: flex;
                    height: 100%;
                    align-items: center;
                    font-size: 18px;
                    letter-spacing: 2px;
                    color: $header-text-color;
                    font-weight: 100;
                }
            }
        }
    }
    .cms-detail-aside-outwrap {
        header {
            height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            > * {
                margin: 0 12px;
            }
        }
        section {
            position: relative;
            padding: 12px;
            overflow-y: auto;
            p {
                font-size: 14px;
                height: 22px;
                line-height: 22px;
                cursor: pointer;
                &:hover {
                    font-size: 15px;
                    font-weight: 600;
                    transition: all $transition-time ease;
                    color: rgba($hc-r, $hc-g, $hc-b, 1);
                }
                &.checked {
                    font-weight: 600;
                    color: rgba($hc-r, $hc-g, $hc-b, 1);
                }
            }
        }
    }
    .cms-detail-main-outwrap {
        background-color: #ddd;
        display: flex;
        padding: 8px 0 0 8px;
        .cms-detail-main-inwrap {
            flex-grow: 1;
            background-color: #fff;
            border-top-left-radius: 5px;
            display: flex;
            flex-direction: column;
            > header {
                height: 80px;
                display: flex;
                flex-direction: column;
                .in-header-top {
                    height: 40px;
                    display: flex;
                    align-items: center;

                    letter-spacing: 2px;
                    padding: 0 12px;
                    > p {
                        margin-right: 8px;
                        color: $header-text-color;
                        font-size: 18px;
                    }
                }
                .in-header-bottom {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    > p {
                        margin-left: 12px;
                        color: #777;
                        font-size: 14px;
                        > span {
                            color: $header-text-color;
                            font-size: 18px;
                        }
                    }
                    .btns-wrap {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        margin-right: 20px;
                        > * {
                            margin-left: 8px;
                        }
                    }
                }
            }

            .cms-detail-main {
                flex-grow: 1;
                background-color: rgba(255, 255, 255, 1);
                display: flex;
                flex-direction: row;
                .cms-detail-main-right {
                    flex-grow: 1;
                    background-color: #fff;
                    display: flex;
                    flex-direction: row;

                    .playlist-wrap {
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        overflow-y: auto;

                        .playlist-wrap-in {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                            align-items: center;
                            .windows-wrap-in {
                                width: 80%;
                                display: flex;
                                flex-direction: column;
                                justify-content: flex-start;
                                align-items: center;
                                padding: 12px;
                                .player-wrap {
                                    width: 90%;
                                    height: 140px;
                                    position: relative;
                                    transition: all $transition-time ease;
                                    .player {
                                        position: absolute;
                                        opacity: 0.9;
                                        z-index: 1;
                                        top: 0;
                                        bottom: 0;
                                        left: 0;
                                        right: 0;
                                        margin: 0;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;

                                        .text-window {
                                            position: relative;
                                            background-color: rgb(54, 54, 54);
                                            padding: 4px;
                                            .txtp-wrap {
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                .txtp {
                                                    height: 100%;
                                                }
                                            }
                                        }
                                    }
                                    &:hover,
                                    &.checked {
                                        .player {
                                            transition: all $transition-time
                                                ease;
                                            opacity: 1;
                                        }
                                        .text-window {
                                            box-shadow: 0 0 12px
                                                rgba($hc-r, $hc-g, $hc-b, 0.3);
                                            border: 1px solid
                                                rgba($hc-r, $hc-g, $hc-b, 0.3);
                                            transition: all $transition-time
                                                ease;
                                        }
                                    }
                                    &.checked {
                                        .player {
                                            transform: scale(1.15);
                                            transition: all $transition-time
                                                ease;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .cms-detail-main-left {
                    width: 550px;
                    position: relative;
                    display: flex;
                    flex-direction: column;

                    > p {
                    }
                }
            }
        }
    }
}
</style>
