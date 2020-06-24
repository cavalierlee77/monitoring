<template>
    <section class="cms-detail-main-inwrap">
        <header>
            <div class="in-header-top">
                <p>
                    {{ pageData.roadName }}
                    {{ pageData.stationInfo }}
                </p>
            </div>
            <div class="in-header-bottom">
                <div class="btns-wrap">
                    <button
                        class="p-button"
                        type="round"
                        size="mini"
                        @click="editCms"
                    >
                        <i class="el-icon-edit"></i>
                        <span>编辑</span>
                    </button>
                    <button
                        class="p-button"
                        type="round"
                        size="mini"
                        @click="reloadDev"
                    >
                        <i class="icon-custom icon-reset"></i>
                        <span>重启</span>
                    </button>
                </div>
            </div>
        </header>
        <section class="cms-detail-main">
            <div class="cms-detail-main-left">
                <p v-for="([k, v], index) in cmsDetailEntries" :key="index">
                    <span>{{ k }}：</span><span>{{ pageData[v] }}</span>
                </p>
                <p>
                    <span>当前状态：</span>
                    <span>{{ statusList.desc }}</span>
                </p>
                <p>
                    <span>故障描述：</span>
                    <span v-for="status in statusList.list" :key="status"
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
                <p>
                    <span>发布时间：</span>
                    <span></span>
                </p>
            </div>
            <div class="cms-detail-main-right">
                <div class="playlist-wrap-in">
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
                                    <div
                                        class="text-window"
                                        v-bind:style="wrapStyle"
                                    >
                                        <div
                                            v-for="(txt,
                                            index) in count.wordList"
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
                                <p class="player-index">
                                    {{ parseInt(index) + 1 }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
                state.cms.cmsDetailEntries.map(a => Object.entries(a)[0])
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
        },
        editCms() {
            this.$store.commit("setCmsId", this.pageData.mapId)
            this.$store.commit("setDynamicLink", "edit")
        },
        reloadDev() {}
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
            justify-content: flex-end;
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
        flex-direction: column;
        .cms-detail-main-right {
            width: 100%;
            background-color: #fff;
            display: flex;
            flex-direction: row;

            .playlist-wrap-in {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;

                .windows-wrap-in {
                    width: 80%;
                    @media screen and (max-width: 1660px) {
                        width: 96%;
                    }
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    flex-wrap: wrap;
                    padding: 12px;

                    .player-wrap {
                        width: 45%;
                        min-width: 384px;
                        min-height: 80px;
                        position: relative;
                        transition: all 240ms ease;
                        margin-top: 22px;
                        min-height: 134px;
                        @media screen and (max-width: 1660px) {
                            margin-top: 12px;
                        }
                        &:nth-of-type(odd) {
                            margin-left: 5%;
                            @media screen and (max-width: 1660px) {
                                margin-left: 2%;
                            }
                        }
                        @media screen and (max-width: 1660px) {
                            &:nth-of-type(even) {
                                margin-left: 4px;
                            }
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
                            // box-shadow: 0 0 18px rgba(0, 0, 0, 0.1);
                            &:hover {
                                border: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
                                box-shadow: 0 0 12px
                                    rgba($hc-r, $hc-g, $hc-b, 0.2);
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
                            text-shadow: 2px 2px 0px
                                rgba($hc-r, $hc-g, $hc-b, 1);
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

        .cms-detail-main-left {
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 20px;

            > p {
                width: 40%;
                height: 17px;
                font-size: 15px;
                color: #777;
                margin-top: 8px;
                border-left: 3px solid rgb(49, 180, 255);
                text-indent: 8px;
                border-radius: 3px;
                display: flex;
                align-items: center;
                &:nth-child(odd) {
                    margin-left: 10%;
                }
                span:first-of-type {
                    display: block;
                    width: 100px;
                }
            }
        }
    }
}
</style>
