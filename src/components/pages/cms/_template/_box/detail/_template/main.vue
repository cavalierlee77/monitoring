<template>
    <section class="cms-detail-main-inwrap">
        <section class="cms-detail-main">
            <header>基本信息</header>
            <div class="cms-detail-main-infos">
                <p v-for="([k, v], index) in cmsDetailEntries" :key="index">
                    <span>{{ k }}：</span><span>{{ pageData[v] }}</span>
                </p>
                <p>
                    <span>当前状态：</span>
                    <span>{{ statusDesc.desc }}</span>
                </p>
                <!-- <p>
                    <span>故障描述：</span>
                    <span class="status-list">
                        <span v-for="status in statusList.list" :key="status">{{
                            status + " "
                        }}</span>
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
                <p>
                    <span>发布时间：</span>
                    <span></span>
                </p> -->
            </div>
            <footer>
                <header>其他操作</header>
                <div class="btns-wrap">
                    <div class="btns-wrap-in">
                        <button
                            class="p-button"
                            type="round"
                            size="mini"
                            @click="editCms"
                        >
                            <i class="el-icon-edit"></i>
                            <span>编辑</span>
                        </button>
                    </div>
                    <!-- <div class="btns-wrap-in">
                        <button
                            class="p-button"
                            type="round"
                            size="mini"
                            @click="restartDev"
                        >
                            <i class="icon-custom icon-reset"></i>
                            <span>重启</span>
                        </button>
                    </div>
                    <div class="btns-wrap-in">
                        <button
                            class="p-button"
                            type="round"
                            size="mini"
                            @click="reloadDev"
                        >
                            <i class="icon-custom icon-reset"></i>
                            <span>从情报板获取当前显示内容</span>
                        </button>
                    </div> -->
                </div>
            </footer>
        </section>
        <section class="cms-detail-windows">
            <header>节目单</header>
            <div class="windows-wrap-in">
                <div
                    class="player-wrap"
                    v-for="(count, index) in pageList"
                    :key="index"
                    v-bind:style="{
                        height: parseInt(wrapStyle.height) + 60 + 'px'
                    }"
                >
                    <div class="player-wrap-in">
                        <div class="player">
                            <div class="text-window" v-bind:style="wrapStyle">
                                <div
                                    v-for="(txt, index) in count.wordList"
                                    v-bind:style="txt.pstyle"
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
        </section>
        <!-- <section class="cms-detail-history">history</section> -->
    </section>
</template>

<script>
import { mapState } from "vuex"
export default {
    components: {},
    data() {
        return {
            wrapStyle: {},
            pageData: {},
            frameheight: "",
            clientHeight: "",
            headerHeight: "",
            frameHeight: "",
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
                state.cms.cmsDetailEntries.map(a => Object.entries(a)[0]),
            statusDesc: state => {
                const desc = state.cms.statusDescMap[state.cms.cmsId]
                if (!desc) {
                    return { desc: "获取中" }
                }
                return desc
            }
        }),
        userId: () => JSON.parse(window.localStorage.getItem("users")).userId
    },
    methods: {
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
                        "line-height": ph + "px"
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
        editCms() {
            if (
                this.statusDesc.desc === "中断" ||
                this.statusDesc.desc === "获取中"
            ) {
                return
            }
            this.$store.commit("setCmsId", this.pageData.mapId)
            this.$store.commit("setDynamicLink", "edit")
        },
        restartDev() {},
        reloadDev() {}
    },
    watch: {
        cmsId: {
            handler(val) {
                this.remixInfos(val)
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/cms/_css/button.scss";
@import "@pages/cms/_css/buttonIcon.scss";
@import "@pages/cms/_css/commonStyle.scss";
$wbc-r: 255;
$wbc-g: 255;
$wbc-b: 255;
$wbc-a: 1;
$ibc-r: 255;
$ibc-g: 255;
$ibc-b: 255;
.cms-detail-main-inwrap {
    flex-grow: 1;
    display: flex;
    > section {
        flex-grow: 1;
        margin-right: 24px;
        min-width: 300px;
        border-radius: 5px;
        overflow: hidden;
        &:last-of-type {
            margin-right: 0;
        }

        &.cms-detail-main {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            position: relative;
            header {
                background-color: rgba(255, 255, 255, 1);
                height: 60px;
                width: 100%;
                font-size: 16px;
                font-weight: 700;
                line-height: 60px;
                text-indent: 24px;
            }

            .cms-detail-main-infos {
                width: 100%;
                position: relative;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                border-radius: 5px;
                background-color: rgba(255, 255, 255, 1);

                > p {
                    width: auto;
                    height: 20px;
                    font-size: 15px;
                    color: #555;
                    margin-top: 16px;
                    display: flex;
                    align-items: center;
                    margin-left: 24px;

                    span {
                        &:first-of-type {
                            display: block;
                            width: 100px;
                            text-indent: 2px;
                        }
                        &.status-list {
                            display: flex;
                            flex-direction: column;
                        }
                    }
                }
            }

            footer {
                height: 200px;
                margin-top: 24px;
                border-radius: 5px;
                background-color: rgba(255, 255, 255, 1);
                display: flex;
                flex-direction: column;
                overflow-x: hidden;
                .btns-wrap {
                    flex-grow: 1;
                    display: flex;
                    flex-wrap: wrap;
                    .btns-wrap-in {
                        padding: 20px 30px;
                    }
                }
            }
        }

        &.cms-detail-windows {
            background-color: rgba(255, 255, 255, 1);
            display: flex;
            flex-direction: column;
            position: relative;
            width: 400px;
            align-items: center;
            overflow-y: auto;
            flex-grow: 1;
            position: relative;
            header {
                min-width: 400px;
                width: 100%;
                background-color: rgba(255, 255, 255, 1);
                height: 60px;
                font-size: 16px;
                font-weight: 700;
                line-height: 60px;
                text-indent: 24px;
            }
            .windows-wrap-in {
                width: 90%;
                @media screen and (max-width: 1660px) {
                    width: 100%;
                }
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                margin-top: 36px;
                margin-bottom: 12px;

                .player-wrap {
                    position: relative;
                    width: 100%;
                    min-width: 384px;
                    min-height: 134px;
                    margin-bottom: 24px;
                    transition: all 240ms ease;
                    @media screen and (max-width: 1660px) {
                        margin-bottom: 12px;
                    }

                    .player-wrap-in {
                        position: absolute;
                        width: 380px;
                        height: 100%;
                        margin: auto;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        border: 1px solid $border-color;
                        overflow: hidden;
                        border-radius: 6px;
                        &:hover {
                            border: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
                            box-shadow: 0 0 12px rgba($hc-r, $hc-g, $hc-b, 0.2);
                            transition: all $transition-time ease;
                        }
                    }
                    .player-index {
                        border: 2px solid rgba($hc-r, $hc-g, $hc-b, 0.9);
                        width: 30px;
                        height: 30px;
                        border-radius: 100%;
                        text-align: center;
                        line-height: 26px;
                        font-size: 24px;
                        font-weight: 600;
                        margin: 8px 0 0 16px;
                        box-sizing: border-box;
                        position: relative;
                        z-index: 3;
                        background-color: rgba($hc-r, $hc-g, $hc-b, 0.5);
                        color: #fff;
                        text-shadow: 2px 2px 0px rgba($hc-r, $hc-g, $hc-b, 1);
                    }
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
                        background-color: rgba($ibc-r, $ibc-g, $ibc-b, 1);

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
                }
            }
        }
    }
}
</style>
