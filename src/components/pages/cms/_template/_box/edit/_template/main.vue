<template>
    <section class="cms-edit-main-inwrap">
        <header>
            <div class="in-header-top">
                <p>
                    {{ pageData.roadName }}
                    {{ pageData.stationInfo }}
                </p>
            </div>
            <div class="in-header-bottom">
                <p>
                    共<span>{{ pageList.length }}</span
                    >屏 当前为第<span>{{ parseInt(pageCount) + 1 }}</span
                    >屏
                </p>
                <div class="btns-wrap">
                    <el-popover
                        placement="bottom"
                        width="600"
                        trigger="manual"
                        v-model="sendStatusBtn"
                    >
                        <section class="send-status">
                            <div class="send-status-wrap send-status-title">
                                <span></span>
                                <p>
                                    <i class="icon-computer"></i>
                                    <i class="icon-serve"></i>
                                    <i class="icon-device"></i>
                                </p>
                            </div>
                            <div
                                class="send-status-wrap"
                                v-for="(stat, index) in sendHistory"
                                :key="index"
                            >
                                <span>{{ stat.cmsName }}</span>
                                <el-steps
                                    :active="stat.active"
                                    :finish-status="stat.finishStatus"
                                    :process-status="stat.processStatus"
                                >
                                    <el-step></el-step>
                                    <el-step></el-step>
                                    <el-step></el-step>
                                </el-steps>
                            </div>
                        </section>
                        <button
                            class="p-button"
                            type="round"
                            size="mini"
                            slot="reference"
                            @click="sendStatusShow"
                        >
                            <i class="el-icon-circle-plus-outline"></i>
                            <span>发布状态</span>
                        </button>
                    </el-popover>
                    <el-popover
                        placement="top"
                        title="情报板列表"
                        width="600"
                        trigger="click"
                        v-model="visible"
                    >
                        <el-table
                            :data="newCmslist"
                            @selection-change="handleSelectionChange"
                            tooltip-effect="dark"
                            height="285"
                            ref="multipleTable"
                        >
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column
                                width="150"
                                property="orgName"
                                label="机构"
                            ></el-table-column>
                            <el-table-column
                                property="deviceName"
                                label="位置"
                            ></el-table-column>
                        </el-table>
                        <div style="text-align: right; margin: 0">
                            <el-button
                                size="mini"
                                type="text"
                                @click="toggleSelection()"
                                >重置</el-button
                            >
                            <el-button
                                type="primary"
                                size="mini"
                                @click="visible = false"
                                >关闭</el-button
                            >
                        </div>
                        <button
                            class="p-button"
                            type="round"
                            size="mini"
                            slot="reference"
                        >
                            <i class="el-icon-circle-plus-outline"></i>
                            <span>追加情报板</span>
                        </button>
                    </el-popover>
                    <!-- <button
                        class="p-button"
                        type="round"
                        size="mini"
                        @click="resetAllCmsData"
                    >
                        <i class="icon-custom icon-resetall"></i>
                        <span>全部重置</span>
                    </button>
                    <button class="p-button" type="round" size="mini">
                        <i class="icon-custom icon-clean"></i>
                        <span>全部清空</span>
                    </button> -->
                    <button
                        class="p-button"
                        type="round"
                        size="mini"
                        @click="sendCmsList"
                    >
                        <i class="icon-custom icon-send"></i>
                        <span>发布</span>
                    </button>
                </div>
            </div>
        </header>
        <section class="cms-edit-main">
            <div class="cms-edit-main-top">
                <div
                    class="playlist-wrap"
                    :style="{
                        height: inFrameHeight
                    }"
                >
                    <div class="playlist-wrap-in">
                        <div class="windows-wrap-in">
                            <div
                                class="player-wrap"
                                v-for="(count, index) in pageList"
                                :key="index"
                                @click="changePage(index)"
                                :class="{
                                    checked:
                                        parseInt(pageCount) === parseInt(index)
                                }"
                                v-bind:style="{
                                    height:
                                        parseInt(wrapStyle.height) + 60 + 'px'
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
                                    <p class="delete-btn">
                                        <span @click.stop="delPage(index)">
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </p>
                                    <p class="player-index">
                                        {{ parseInt(index) + 1 }}
                                    </p>
                                </div>

                                <div
                                    class="play-insert"
                                    @click="addPage(index)"
                                >
                                    <p class="insert-wrap">
                                        <i class="icon-add"></i>
                                    </p>
                                </div>
                            </div>
                            <div
                                class="player-wrap"
                                v-bind:style="{
                                    height:
                                        parseInt(wrapStyle.height) + 60 + 'px'
                                }"
                                @click="addPage"
                            >
                                <div class="player-wrap-in">
                                    <div class="player">
                                        <div
                                            class="add-btn"
                                            v-bind:style="{
                                                height:
                                                    parseInt(wrapStyle.height) +
                                                    40 +
                                                    'px'
                                            }"
                                        >
                                            <div
                                                class="text-window add-window"
                                                v-bind:style="wrapStyle"
                                            >
                                                <i class="icon-add"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cms-edit-main-bottom">
                <div class="edit-tools">
                    <section class="tools-btn">
                        <div>
                            <span>字体：</span>
                            <select
                                v-model="textInfo.fontFamily"
                                @change="resetTextInfo"
                            >
                                <option value="">-字体-</option>
                                <option
                                    v-for="({ k, v }, index) in dirFontFamily"
                                    :value="k"
                                    :key="index"
                                    >{{ v }}</option
                                >
                            </select>
                        </div>
                        <div>
                            <span>字号：</span>
                            <select
                                v-model="textInfo.fontSize"
                                @change="resetTextInfo"
                            >
                                <option value="">-字号-</option>
                                <option
                                    v-for="({ k, v }, index) in dirFontSize"
                                    :value="k"
                                    :key="index"
                                    >{{ v }}px</option
                                >
                            </select>
                        </div>
                        <div>
                            <span>颜色：</span>
                            <select
                                v-model="textInfo.color"
                                @change="resetTextInfo"
                            >
                                <option value="">-颜色-</option>
                                <option
                                    v-for="({ k, v }, index) in dirColor"
                                    :value="k"
                                    :key="index"
                                    >{{ v }}</option
                                >
                            </select>
                        </div>
                        <div>
                            <span>出字方式：</span>
                            <select
                                v-model="textInfo.display"
                                @change="resetTextInfo"
                            >
                                <option value="">-显示方式-</option>
                                <option
                                    v-for="({ k, v }, index) in dirMode"
                                    :value="k"
                                    :key="index"
                                    >{{ v }}</option
                                >
                            </select>
                        </div>
                        <div>
                            <span>停留时间：</span>
                            <select
                                v-model="textInfo.interval"
                                @change="resetTextInfo"
                            >
                                <option value="">-时间间隔-</option>
                                <option
                                    v-for="({ k, v }, index) in dirDelay"
                                    :value="k"
                                    :key="index"
                                    >{{ v }}</option
                                >
                            </select>
                        </div>
                    </section>
                    <section class="tools-text">
                        <textarea v-model="txt"></textarea>
                    </section>
                </div>
                <div class="edit-convenience">
                    <div class="tools-header">
                        <span>快捷填充：</span>
                        <div>
                            <button class="p-button" type="round" size="mini">
                                <i class="el-icon-document-copy"></i>
                                <span>模板</span>
                            </button>
                            <button class="p-button" type="round" size="mini">
                                <i class="el-icon-time"></i>
                                <span>历史发布</span>
                            </button>
                        </div>
                    </div>
                    <div class="tools-header">
                        <span>快捷操作：</span>
                        <div>
                            <button class="p-button" type="round" size="mini">
                                <i class="icon-custom icon-clean"></i>
                                <span>清空</span>
                            </button>
                            <button
                                class="p-button"
                                type="round"
                                size="mini"
                                @click="resetCmsData"
                                v-if="
                                    JSON.parse(this.pageList4Reset).itemList
                                        .length > pageCount
                                "
                            >
                                <i class="icon-custom icon-reset"></i>
                                <span>重置</span>
                            </button>
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
    data() {
        return {
            textInfo: {
                fontFamily: "s",
                fontSize: "16",
                display: "0",
                interval: "3",
                color: "yellow"
            },
            txt: "",
            txtArr: [],
            wrapStyle: {},
            txtStyle: {},
            pageCount: 0,
            pageData: {},
            pageList: [],
            pageList4Reset: "",
            visible: false,
            sendStatusBtn: false,
            newCmslist: [],
            multipleSelection: [],
            remixModelList: [],
            data: {},
            sendHistory: [],
            inFrameHeight: "0px"
        }
    },
    props: {
        frameheight: {
            type: String
        }
    },
    created() {},
    computed: {
        ...mapState({
            cmsModelList: state => state.cms.cmsModelList,
            dirColor: state =>
                Object.entries(state.cms.directionColor).map(([k, v]) => ({
                    k,
                    v
                })),
            dirFontFamily: state =>
                Object.entries(state.cms.directionFontFamily).map(([k, v]) => ({
                    k,
                    v
                })),
            dirFontSize: state =>
                Object.entries(state.cms.directionFontSize).map(([k, v]) => ({
                    k,
                    v
                })),
            dirMode: state =>
                Object.entries(state.cms.directionMode).map(([k, v]) => ({
                    k,
                    v
                })),
            dirDelay: state =>
                Object.entries(state.cms.directionDelay).map(([k, v]) => ({
                    k,
                    v
                })),
            dirShowColor: state => state.cms.directionShowColor,
            dirShowFontFamily: state => state.cms.directionShowFontFamily,
            dirShowFontSize: state => state.cms.directionFontSize,
            cmsList: state => state.cms.cmsList,
            devInfoList: state => state.cms.devInfoList,
            devMap: state => state.cms.devMap,
            cmsMap: state => state.cms.cmsMap,
            statusMap: state => state.cms.statusMap,
            cmsId: state => state.cms.cmsId,
            sendBackList: state => state.cms.sendBackList
        }),
        userId: () => JSON.parse(window.localStorage.getItem("users")).userId
    },
    mounted() {},
    methods: {
        resetFrameHeight() {
            if (document.body.clientWidth >= 1660) {
                this.asideWidth = "360px"
                this.inFrameHeight =
                    parseInt(this.frameheight) - 80 - 210 + "px"
            } else {
                this.asideWidth = "240px"
                this.inFrameHeight =
                    parseInt(this.frameheight) - 80 - 172 + "px"
            }
        },
        remixInfos() {
            this.data = this.devMap[this.cmsId]
            this.pageCount = 0
            this.pageData = { ...this.data }
            let cms = {}
            if (this.cmsMap[this.cmsId]) {
                cms = this.cmsMap[this.cmsId]
            } else {
                cms = this.haveEmptyPlaylist(this.pageData)
            }
            this.pageType = { ...JSON.parse(cms.data) }
            this.pageList = [...this.pageType.itemList]
            this.pageList4Reset = cms.data
            this.remixPageList()
            this.setPageInfos()
            this.setPageStyle()
            this.setTxtArr()
        },
        haveEmptyPlaylist(data) {
            const emptyPlaylist = {
                data: "",
                deviceId: data.deviceId,
                deviceVarTypeId: data.issuedTypeId,
                gatherTime: "",
                orgId: data.orgId,
                sendFlag: 1
            }
            const dataObj = {
                dph: 64,
                dpt: 1,
                dpw: 128,
                itemList: [
                    {
                        delay: 3,
                        fc: "r",
                        fn: "s",
                        fs: 32,
                        graphList: [],
                        mode: 1,
                        wordList: [
                            {
                                wc: "",
                                wx: 0,
                                wy: 0
                            }
                        ]
                    }
                ]
            }
            emptyPlaylist.data = JSON.stringify(dataObj)
            return emptyPlaylist
        },
        remixPageList() {
            this.pageList.forEach(item => {
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
            const lists = this.pageList[this.pageCount].wordList
            this.txtArr = []
            this.txtArr.push(...lists.map(list => list.wc))
            this.wrapStyle = {
                width: this.data.width,
                height: this.data.height
            }
        },
        setPageStyle() {
            const _style = this.pageList[this.pageCount]
            this.textInfo.fontFamily = _style.fn
            this.textInfo.fontSize = _style.fs
            this.textInfo.display = _style.mode
            this.textInfo.interval = _style.delay
            this.textInfo.color = _style.fc
        },
        setTxtArr() {
            this.txt = ""
            const data = this.pageList[this.pageCount].wordList
            data.map(page => (this.txt += page.wc + "\n"))
        },
        resetTxt() {
            // if (this.pageCount === null) {
            //     return
            // }
            this.txtArr = []
            const txtArr = this.txt.split("\n")
            for (let i = 0; i < txtArr.length; i++) {
                const txt = txtArr[i].replace(/(^\s*)|(\s*$)/g, "")
                if (txt.length === 0) {
                    txtArr.splice(i, 1)
                    i--
                }
            }
            this.txtArr = [...txtArr]
            this.saveCmsTextChange()
        },
        resetTextInfo() {
            if (this.pageCount === null) {
                return
            }
            this.saveCmsStyleChange()
        },
        saveCmsStyleChange() {
            const page = this.pageList[this.pageCount]

            page.delay = this.textInfo.interval
            page.fc = this.textInfo.color
            page.fn = this.textInfo.fontFamily
            page.fs = this.textInfo.fontSize
            page.mode = this.textInfo.display
            this.saveCmsTextChange()
        },
        saveCmsTextChange() {
            const page = this.pageList[this.pageCount]
            this.txtArr.forEach((txt, index) => {
                if (!page.wordList[index]) {
                    page.wordList[index] = {}
                }
                const len = getByteLen(txt)
                page.wordList[index].wc = txt
                page.wordList[index].wx =
                    (parseInt(this.data.width) -
                        (len / 2) * parseInt(this.textInfo.fontSize)) /
                    2
                page.wordList[index].wy =
                    (parseInt(this.data.height) / this.txtArr.length -
                        parseInt(this.textInfo.fontSize)) /
                        2 +
                    (parseInt(this.data.height) / this.txtArr.length) * index
                page.wordList[index].pstyle = {
                    color: this.dirShowColor[this.textInfo.color],
                    "font-family": this.dirShowFontFamily[
                        this.textInfo.fontFamily
                    ],
                    "font-size": this.textInfo.fontSize + "px",
                    height:
                        parseInt(this.data.height) / this.txtArr.length + "px",
                    left:
                        (parseInt(this.data.width) -
                            (len / 2) * parseInt(this.textInfo.fontSize)) /
                            2 +
                        "px",
                    "letter-spacing": "0" + "px",
                    "line-height":
                        parseInt(this.data.height) / this.txtArr.length + "px",
                    top:
                        (parseInt(this.data.height) / this.txtArr.length -
                            parseInt(this.textInfo.fontSize)) /
                            2 +
                        (parseInt(this.data.height) / this.txtArr.length) *
                            index +
                        "px"
                }
            })
            if (page.wordList.length > this.txtArr.length) {
                page.wordList.splice(
                    this.txtArr.length,
                    page.wordList.length - this.txtArr.length
                )
            }
        },
        changePage(index) {
            this.pageCount = +index
        },
        addPage(index) {
            let count = this.pageList.length
            if (typeof index === "number") {
                count = index
            }
            const emptyPage = {
                delay: 3,
                fc: "r",
                fn: "s",
                fs: 32,
                graphList: [],
                mode: 1,
                wordList: []
            }
            this.pageList.splice(count, 0, emptyPage)
            this.pageCount = count
            this.txtArr = []
        },

        delPage(index) {
            this.pageList.splice(index, 1)
            if (this.pageCount >= index) {
                this.pageCount--
                if (this.pageCount < 0) {
                    this.pageCount = 0
                }
            }
            if (this.pageList.length === 0) {
                this.addPage()
            }
            this.setPageInfos()
            this.setPageStyle()
            this.setTxtArr()
        },
        changeStyle(item) {
            return { "background-color": this.dirShowColor[item] }
        },
        setModelList() {
            this.newCmslist = []
            const list = [...this.devInfoList]
            list.forEach(dev => {
                if (dev.cmsSizeDesc === this.pageData.cmsSizeDesc) {
                    if (
                        dev.orgId !== this.pageData.orgId ||
                        dev.deviceId !== this.pageData.deviceId
                    ) {
                        this.newCmslist.push(dev)
                    }
                }
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        sendCmsList() {
            const pageList = JSON.parse(JSON.stringify(this.pageList))
            pageList.forEach(page => {
                page.delay = parseInt(page.delay)
                page.fs = parseInt(page.fs)
                page.mode = parseInt(page.mode)
                page.wordList.forEach(word => {
                    delete word.pstyle
                })
            })
            this.multipleSelection.unshift(this.pageData)
            const sendArr = []
            this.sendHistory = []
            this.multipleSelection.forEach(page => {
                const sendData = {
                    useId: this.userId + "",
                    orgId: page.orgId + "",
                    devId: page.deviceId + "",
                    devVarTypeId: page.issuedTypeId + "",
                    devVarValue: "",
                    playList: {
                        dph: this.pageType.dph,
                        dpt: this.pageType.dpt,
                        dpw: this.pageType.dpw,
                        itemList: pageList
                    }
                }
                sendArr.push(sendData)
                this.sendHistory.push({
                    cmsId: page.orgId + "×" + page.deviceId,
                    cmsName: this.devMap[page.orgId + "×" + page.deviceId]
                        .stationInfo,
                    finishStatus: "",
                    processStatus: "wait",
                    active: 0
                })
            })
            this.sendStatusBtn = true
            this.$store.dispatch("postCmsInfos", sendArr).then(res => {
                this.sendHistory.forEach(send => {
                    send.finishStatus = "success"
                    send.processStatus = "wait"
                    send.active = 2
                })
            })
            this.$store.commit("CleanSendBack")
            this.sendHistory.forEach(send => {
                send.finishStatus = "success"
                send.processStatus = "wait"
                send.active = 1
            })
        },
        resetAllCmsData() {
            this.pageList = JSON.parse(this.pageList4Reset)
            this.pageCount = 0
            this.setPageInfos()
            this.setPageStyle()
            this.setTxtArr()
        },
        resetCmsData() {
            const pageList4Reset = JSON.parse(this.pageList4Reset).itemList
            this.pageList[this.pageCount] = pageList4Reset[this.pageCount]
            this.setPageInfos()
            this.setPageStyle()
            this.setTxtArr()
        },
        uploadSendSteps() {
            const blist = this.sendBackList.map(s => s.id)
            this.sendHistory.forEach(send => {
                if (blist.includes(send.cmsId)) {
                    send.finishStatus = "success"
                    send.active = 3
                }
            })
        },
        sendStatusShow() {
            if (this.sendHistory.length === 0) {
                this.sendStatusBtn = false
                return
            }
            this.sendStatusBtn = !this.sendStatusBtn
        },

        // old↓
        useModel(val) {
            this.txtpArr = val.txtpArr
            this.txtpStyle = val.txtpStyle
            this.textInfo = val.textInfo
            this.txt = val.txt
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row)
                })
            } else {
                this.$refs.multipleTable.clearSelection()
            }
        },
        resetModelList() {
            this.remixModelList = []
            this.cmsModelList.forEach(model => {
                if (this.pageData.size === model.type) {
                    this.remixModelList.push(model)
                }
            })
        }
    },
    watch: {
        cmsId: {
            handler(val) {
                this.remixInfos(val)
            },
            immediate: true
        },
        txt: {
            handler(val, oldval) {
                this.resetTxt(val, oldval)
            },
            immediate: true
        },
        textInfo: {
            handler(val, oldval) {
                this.resetTextInfo(val, oldval)
            },
            deep: true
        },
        pageCount: {
            handler() {
                this.setPageInfos()
                this.setPageStyle()
                this.setTxtArr()
            },
            immediate: true
        },
        cmsList: {
            handler(val) {
                this.setModelList(val)
            },
            immediate: true,
            deep: true
        },
        sendBackList: {
            handler() {
                this.uploadSendSteps()
            },
            deep: true
        },
        frameheight: {
            handler() {
                this.resetFrameHeight()
            },
            immediate: true
        }
    }
}

function getByteLen(val) {
    var len = 0
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i)
        // eslint-disable-next-line no-control-regex
        if (a.match(/[^\x00-\xff]/gi) != null) {
            len += 2
        } else {
            len += 1
        }
    }
    return len
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
.cms-edit-main-inwrap {
    // background-image: url("~@/assets/cms/cmsbgp.webp");
    background-size: 100%;
    flex-grow: 1;
    border-top-left-radius: 5px;
    display: flex;
    flex-direction: column;
    > header {
        height: 80px;
        display: flex;
        flex-direction: column;
        background-color: rgba($wbc-r, $wbc-g, $wbc-b, $wbc-a);
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

    .cms-edit-main {
        flex-grow: 1;
        background-color: rgba($wbc-r, $wbc-g, $wbc-b, $wbc-a);
        display: flex;
        flex-direction: column;
        .cms-edit-main-top {
            flex-grow: 1;
            width: 100%;
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
                                box-shadow: 0 0 18px rgba(0, 0, 0, 0.1);
                                &:hover {
                                    border: 1px solid
                                        rgba($hc-r, $hc-g, $hc-b, 0.3);
                                    box-shadow: 0 0 12px
                                        rgba($hc-r, $hc-g, $hc-b, 0.2);
                                    transition: all $transition-time ease;
                                    .delete-btn {
                                        opacity: 1;
                                        width: 50px;
                                        transition: all $transition-time ease;
                                    }
                                }
                                &:hover ~ .play-insert {
                                    z-index: 9;
                                    .icon-add {
                                        background-color: rgba(
                                            $hc-r,
                                            $hc-g,
                                            $hc-b,
                                            1
                                        );
                                    }
                                }
                            }

                            .play-sort {
                                display: block;
                                width: 40px;
                                height: 40px;
                                position: absolute;
                                border: 1px solid #777;
                                border-radius: 100%;
                                box-shadow: 0 0 10px rgba(3, 3, 3, 0.1);
                                box-sizing: border-box;
                                > i {
                                    display: block;
                                    mask-size: 100%;
                                    width: 100%;
                                    height: 100%;
                                    background-color: #ccc;
                                }
                            }
                            .player-index {
                                border: 2px solid $border-color;
                                width: 30px;
                                height: 30px;
                                border-radius: 100%;
                                text-align: center;
                                line-height: 26px;
                                font-size: 24px;
                                font-weight: 600;
                                color: $border-color;
                                margin: 8px 0 0 16px;
                                box-sizing: border-box;
                                position: relative;
                                z-index: 3;
                            }
                            .delete-btn {
                                position: absolute;
                                z-index: 9;
                                top: 0;
                                right: 0;
                                width: 0px;
                                opacity: 0;
                                height: 100%;
                                display: flex;
                                justify-content: center;
                                align-items: flex-end;
                                transition: all $transition-time ease;
                                span {
                                    display: block;
                                    position: relative;
                                    width: 24px;
                                    height: 24px;
                                    border-radius: 100%;
                                    margin-bottom: 12px;
                                    margin-right: 10px;
                                    cursor: pointer;
                                    i {
                                        display: block;
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        font-size: 24px;
                                        color: #aaa;
                                        font-weight: 300;
                                        transition: all 500ms ease;
                                    }
                                    &:hover {
                                        i {
                                            color: rgb(240, 50, 50);
                                            transition: all $transition-time
                                                ease;
                                        }
                                    }
                                }
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
                                background-color: rgba(
                                    $ibc-r,
                                    $ibc-g,
                                    $ibc-b,
                                    1
                                );

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
                                .add-window {
                                    background-color: rgba(255, 255, 255, 1);
                                }
                            }
                            .play-insert {
                                position: absolute;
                                width: 30px;
                                height: 30px;
                                top: 0;
                                bottom: 0;
                                margin: auto;
                                left: -17px;
                                display: flex;
                                justify-content: flex-end;
                                align-items: center;
                                .insert-wrap {
                                    width: 30px;
                                    height: 30px;
                                    border-radius: 100%;
                                    .icon-add {
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                        mask-size: 100%;
                                        mask-repeat: no-repeat;
                                        background-color: rgba(
                                            222,
                                            222,
                                            222,
                                            1
                                        );
                                        cursor: pointer;
                                    }
                                }
                                &:hover {
                                    z-index: 9;
                                    .icon-add {
                                        background-color: rgba(
                                            $hc-r,
                                            $hc-g,
                                            $hc-b,
                                            1
                                        );
                                    }
                                }
                            }
                            &.checked {
                                .player {
                                    transition: all $transition-time ease;
                                    opacity: 1;
                                }
                                .player-wrap-in {
                                    border: 1px solid
                                        rgba($hc-r, $hc-g, $hc-b, 0.3);
                                    box-shadow: 0 0 12px
                                        rgba($hc-r, $hc-g, $hc-b, 0.2);
                                    transition: all $transition-time ease;
                                }
                            }
                            &.checked {
                                .player-wrap-in {
                                    // width: 378px;
                                    box-shadow: 0 0 12px
                                        rgba($hc-r, $hc-g, $hc-b, 0.3);
                                    border: 1px solid
                                        rgba($hc-r, $hc-g, $hc-b, 0.3);
                                    transition: all $transition-time ease;
                                }
                                .player-index {
                                    border-color: rgba(
                                        $hc-r,
                                        $hc-g,
                                        $hc-b,
                                        0.9
                                    );
                                    background-color: rgba(
                                        $hc-r,
                                        $hc-g,
                                        $hc-b,
                                        0.5
                                    );
                                    color: #fff;
                                    text-shadow: 2px 2px 0px
                                        rgba($hc-r, $hc-g, $hc-b, 1);
                                    transition: all $transition-time ease;
                                }
                            }
                        }
                    }
                    .add-btn {
                        width: 90%;
                        height: 140px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: all $transition-time ease;
                        .text-window {
                            position: relative;
                            background-color: rgba($ibc-r, $ibc-g, $ibc-b, 0.3);
                            padding: 4px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            i {
                                width: 60px;
                                height: 60px;
                                font-size: 60px;
                                font-weight: 100;
                                mask-size: 100%;
                                background-color: #ddd;
                                transition: all 300ms ease;
                            }
                        }
                    }
                }
            }
        }

        .cms-edit-main-bottom {
            position: relative;
            width: 100%;
            height: 210px;
            @media screen and (max-width: 1660px) {
                height: 172px;
            }
            display: flex;

            .edit-tools {
                flex-grow: 1;
                position: relative;
                min-width: 400px;
                height: 100%;
                border-top: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
                border-right: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
                box-sizing: border-box;
                background-color: rgba($hc-r, $hc-g, $hc-b, 0.2);
                overflow: hidden;
                > header {
                    position: relative;
                    z-index: 11;
                    display: flex;
                    justify-content: space-evenly;
                    flex-direction: column;
                    align-items: center;
                    height: 72px;
                    border-bottom: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
                    box-sizing: border-box;
                    > div.tools-header {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        width: 100%;
                        > * {
                            margin-left: 12px;
                        }
                        > span {
                            letter-spacing: 0;
                            font-size: 14px;
                            color: #999;
                        }
                    }
                }
                section.tools-btn {
                    position: relative;
                    z-index: 11;
                    height: 48px;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    @media screen and (max-width: 1660px) {
                        height: 72px;
                    }
                    > div {
                        width: 20%;
                        height: 48px;
                        display: flex;
                        align-items: center;
                        @media screen and (max-width: 1660px) {
                            width: 25%;
                            height: 36px;
                        }
                        span {
                            display: block;
                            width: 80px;
                            font-size: 15px;
                            text-align: right;
                        }
                        select {
                            flex-grow: 1;
                            margin-right: 12px;
                            height: 24px;
                            font-size: 14px;
                            color: #555;
                            border: 1px solid #aaa;
                            border-radius: 5px;
                            // max-width: 100px;
                            outline: none;
                        }
                    }
                }
                section.tools-text {
                    position: relative;
                    z-index: 11;
                    height: 160px;
                    width: 100%;
                    display: flex;
                    textarea {
                        flex-grow: 1;
                        position: relative;
                        resize: none;
                        border: none;
                        outline: none;
                        padding: 18px 36px;
                        flex-basis: 100%;
                        font-size: 16px;
                        color: #333;
                        background-color: rgba($hc-r, $hc-g, $hc-b, 0);
                        border-top: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
                        box-sizing: border-box;
                        &:focus {
                            background-color: rgba(255, 255, 255, 0.9);
                        }
                    }
                }
            }

            .edit-convenience {
                @media screen and (max-width: 1660px) {
                    width: 180px;
                }
                width: 300px;
                background-color: rgba($hc-r, $hc-g, $hc-b, 0.2);
                border-top: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
                box-sizing: border-box;
                .tools-header {
                    @media screen and (max-width: 1660px) {
                        flex-direction: column;
                        height: 80px;
                        align-items: flex-start;
                        > * {
                            margin-top: 10px;
                        }
                    }
                    display: flex;
                    height: 60px;
                    align-items: center;
                    > span {
                        width: 80px;
                        text-align: right;
                    }
                    > div {
                        display: flex;
                        align-items: center;
                        > button {
                            margin-left: 4px;
                        }
                    }
                }
            }
        }
    }
}

.send-status {
    .send-status-wrap {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        > span {
            display: block;
            width: 150px;
            overflow: hidden;
            height: 100%;
            line-height: 30px;
        }
        > div {
            flex-grow: 1;
            height: 24px;
        }
    }
    .send-status-title {
        margin-bottom: 10px;
        > span {
            font-size: 18px;
            color: $header-text-color;
        }
        > p {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            i {
                display: block;
                width: 28px;
                height: 28px;
                background-color: $header-text-color;
                mask-size: 100%;
            }
        }
    }
}
</style>
