<template>
    <section class="cms-edit-main-inwrap">
        <header>
            <div class="in-header-left">
                <p>播放表详情</p>
            </div>
            <div class="in-header-right">
                <div class="btns-wrap">
                    <button
                        class="p-button"
                        type="round"
                        size="normal"
                        @click="addPage"
                    >
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>新增条目</span>
                    </button>
                    <!-- <button class="p-button" type="round" size="normal">
                        <i class="el-icon-document-copy"></i>
                        <span>从模板导入条目</span>
                    </button>
                    <button class="p-button" type="round" size="normal">
                        <i class="el-icon-time"></i>
                        <span>从发布历史导入条目</span>
                    </button> -->
                    <button
                        class="p-button"
                        type="round"
                        size="normal"
                        @click="addToBox"
                    >
                        <i class="icon-custom icon-addto"></i>
                        <span>追加情报板</span>
                    </button>
                    <button
                        class="p-button"
                        type="round"
                        size="normal"
                        @click="sendCmsList"
                    >
                        <i class="icon-custom icon-send"></i>
                        <span>发布</span>
                    </button>
                </div>
            </div>
        </header>
        <section class="cms-edit-main">
            <div
                class="playlist-wrap"
                :style="{
                    height: inFrameHeight
                }"
            >
                <div class="windows-wrap-in">
                    <div
                        class="player-wrap"
                        v-for="(count, index) in pageList"
                        :key="index"
                        @click="changePage(index)"
                        :class="{
                            checked: parseInt(pageCount) === parseInt(index)
                        }"
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
                            <p class="delete-btn">
                                <span @click.stop="delPage(index)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                    <!-- 用于填补单数情报板带来的样式问题 -->
                    <div
                        class="player-wrap"
                        v-bind:style="{
                            height: parseInt(wrapStyle.height) + 60 + 'px'
                        }"
                        v-if="pageList.length % 2 === 1"
                    ></div>
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
            remixModelList: [],
            data: {},
            sendHistory: [],
            sendTimeout: {},
            inFrameHeight: "0px",
            sendFlag: true
        }
    },
    props: {
        frameheight: {
            type: String
        }
    },
    components: {
        EditDynamic: () =>
            import(/* webpackChunkName: "cms" */ "./_dynamiclink")
    },
    computed: {
        ...mapState({
            cmsModelList: state => state.cms.cmsModelList,
            dirShowColor: state => state.cms.directionShowColor,
            dirShowFontFamily: state => state.cms.directionShowFontFamily,
            dirShowFontSize: state => state.cms.directionFontSize,
            cmsList: state => state.cms.cmsList,
            devInfoList: state => state.cms.devInfoList,
            devMap: state => state.cms.devMap,
            cmsMap: state => state.cms.cmsMap,
            statusMap: state => state.cms.statusMap,
            cmsId: state => state.cms.cmsId,
            sendBackList: state => state.cms.sendBackList,
            editTextInfo: state => state.cms.editTextInfo,
            editTxt: state => state.cms.editTxt,
            multipleSelection: state => state.cms.multipleSelection,
            isConnected: state => state.commonTools.socket.isConnected
        }),
        userId: () => JSON.parse(window.localStorage.getItem("users")).userId
    },
    methods: {
        resetFrameHeight() {
            if (document.body.clientWidth >= 1660) {
                this.asideWidth = "360px"
                this.inFrameHeight =
                    parseInt(this.frameheight) - 60 - 24 * 2 + "px"
            } else {
                this.asideWidth = "240px"
                this.inFrameHeight =
                    parseInt(this.frameheight) - 60 - 24 * 2 + "px"
            }
        },
        remixInfos() {
            this.data = this.devMap[this.cmsId]
            this.pageCount = 0
            // this.multipleSelection = []
            this.sendStatusBtn = false
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
            this.resetInfos()
        },
        resetInfos() {
            this.setPageInfos()
            this.setPageStyle()
            this.setTxtArr()
            this.$store.commit("setTextInfo", this.textInfo)
            this.$store.commit("setTxt", this.txt)
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
            this.txtArr = []
            const txtArr = this.txt.split("\n")
            for (let i = 0; i < txtArr.length; i++) {
                txtArr[i] = txtArr[i].replace(/(^\s*)|(\s*$)/g, "")
                if (txtArr[i].length === 0) {
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
            const _list = this.pageList[this.pageCount].wordList
            const _newlist = [..._list]
            this.$set(this.pageList[this.pageCount], "wordList", _newlist)
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
        addToBox() {
            this.$store.commit("setEditDynamicLink", "AddToBox")
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
        sendCmsList() {
            if (!this.beforeSendCheckStatus()) {
                return
            }
            this.resetInfos()
            const pageList = this.beforeSendRemixPageList()
            const sendArr = this.beforeSendRemixSendArr(pageList)
            this.$store.commit("setEditDynamicLink", "SendResultBox")
            // clear something
            this.$store.commit("CleanSendBack")
            this.$store.commit("cleanSendIds")
            //
            this.sendFlag = false
            this.$store
                .dispatch("postCmsInfos", sendArr)
                .then(res => {
                    this.sendingCallBack(res)
                    this.$store.commit("setSendHistory", this.sendHistory)
                })
                .catch(res => {
                    this.sendingFailure(res)
                })
            this.sendStart()
            this.$store.commit("setSendHistory", this.sendHistory)
        },
        beforeSendRemixPageList() {
            const pageList = JSON.parse(JSON.stringify(this.pageList))
            pageList.forEach(page => {
                page.delay = parseInt(page.delay)
                page.fs = parseInt(page.fs)
                page.mode = parseInt(page.mode)
                page.wordList.forEach(word => {
                    delete word.pstyle
                })
            })
            return pageList
        },
        beforeSendRemixSendArr(pageList) {
            const sendArr = []
            const multipleSelection = [...this.multipleSelection]
            multipleSelection.unshift({ ...this.pageData })
            this.sendHistory = []
            multipleSelection.forEach(page => {
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
                    processStatus: ""
                })
            })
            return sendArr
        },
        beforeSendCheckStatus() {
            let checkResult = true
            if (!this.sendFlag) {
                alert("请等待本次发布流程结束后，再尝试。")
                checkResult = false
            }
            if (this.isConnected !== true) {
                alert("服务器断开！")
                checkResult = false
            }
            return checkResult
        },
        sendStart() {
            this.sendHistory.forEach(send => {
                send.processStatus = "开始下发"
            })
        },
        sendingCallBack(res) {
            this.sendHistory.forEach(send => {
                if (send.processStatus === "开始下发") {
                    if (res.resultCode === "100") {
                        send.processStatus = "发送中..."
                        this.$set(this.sendTimeout, send.cmsId, "")
                        this.sendTimeout[send.cmsId] = setTimeout(() => {
                            send.processStatus = "下发超时！"
                        }, 10000)
                    } else if (res.status) {
                        if ([500, 504].includes(res.status)) {
                            send.processStatus = "下发失败，服务器出错！"
                        }
                    } else {
                        send.processStatus = "下发失败！"
                    }
                }
            })
        },
        sendingFailure(res) {
            this.sendHistory.forEach(send => {
                if (send.processStatus === "开始下发") {
                    send.processStatus = "下发失败！"
                }
                this.$store.commit("setSendFailureIds", send.cmsId)
            })
        },
        uploadSendSteps() {
            this.sendBackList.forEach(b => {
                for (const s of this.sendHistory) {
                    if (s.cmsId === b.id) {
                        clearTimeout(this.sendTimeout[s.cmsId])
                        delete this.sendTimeout[s.cmsId]
                        if (Object.keys(this.sendTimeout).length === 0) {
                            this.sendFlag = true
                        }
                        s.processStatus = b.returnMessage
                        if (b.returnCode === "000000") {
                            this.$store.commit("setSendSuccessIds", [b.id])
                        }
                        if (b.returnCode === "111111") {
                            this.$store.commit("setSendFailureIds", [b.id])
                        }
                        break
                    }
                }
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
        sendStatusShow() {
            if (this.sendHistory.length === 0) {
                this.sendStatusBtn = false
                return
            }
            this.sendStatusBtn = !this.sendStatusBtn
        },
        cleanMultipleSelection() {
            this.$store.commit("setMultipleSelection", [])
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
    beforeDestroy() {
        this.cleanMultipleSelection()
    },
    watch: {
        cmsId: {
            handler(val) {
                this.remixInfos(val)
                this.setModelList()
            },
            immediate: true
        },
        editTxt: {
            handler(val, oldval) {
                this.txt = val
                this.resetTxt(val, oldval)
            }
        },
        editTextInfo: {
            handler(val) {
                this.textInfo = { ...val }
                this.resetTextInfo()
            },
            deep: true
        },
        pageCount: {
            handler() {
                this.resetInfos()
            },
            immediate: true
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
    flex-grow: 1;
    // border-top-left-radius: 5px;
    // border-bottom-left-radius: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    > header {
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: rgba($wbc-r, $wbc-g, $wbc-b, $wbc-a);
        .in-header-left {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 24px;
            > p {
                margin-right: 8px;
                color: $frame-text-color;
                font-weight: 600;
                font-size: 18px;
            }
        }
        .in-header-right {
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
        .playlist-wrap {
            overflow-y: auto;

            .windows-wrap-in {
                width: 86%;
                @media screen and (max-width: 1660px) {
                    width: 96%;
                }
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                align-items: center;
                flex-wrap: wrap;
                padding: 12px;
                margin: 0 auto;

                .player-wrap {
                    // width: 45%;
                    width: 386px;
                    position: relative;
                    transition: all 240ms ease;
                    margin-top: 24px;
                    min-height: 134px;
                    @media screen and (max-width: 1660px) {
                        margin-top: 12px;
                    }
                    &:nth-of-type(odd) {
                        margin-right: 24px;
                        @media screen and (max-width: 1660px) {
                        }
                    }
                    @media screen and (max-width: 1660px) {
                        &:nth-of-type(even) {
                            // margin-right: 0px;
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
                            box-shadow: 0 1px 2px -2px rgba($hc-r, $hc-g, $hc-b, 0.16),
                                0 3px 6px 0 rgba($hc-r, $hc-g, $hc-b, 0.12),
                                0 5px 12px 4px rgba($hc-r, $hc-g, $hc-b, 0.09);
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
                                background-color: rgba($hc-r, $hc-g, $hc-b, 1);
                            }
                        }
                    }

                    // .play-sort {
                    //     display: block;
                    //     width: 40px;
                    //     height: 40px;
                    //     position: absolute;
                    //     border: 1px solid #777;
                    //     border-radius: 100%;
                    //     box-shadow: 0 0 10px rgba(3, 3, 3, 0.1);
                    //     box-sizing: border-box;
                    //     > i {
                    //         display: block;
                    //         mask-size: 100%;
                    //         width: 100%;
                    //         height: 100%;
                    //         background-color: #ccc;
                    //     }
                    // }
                    // .player-index {
                    //     border: 2px solid $border-color;
                    //     width: 30px;
                    //     height: 30px;
                    //     border-radius: 100%;
                    //     text-align: center;
                    //     line-height: 26px;
                    //     font-size: 24px;
                    //     font-weight: 600;
                    //     color: $border-color;
                    //     margin: 8px 0 0 16px;
                    //     box-sizing: border-box;
                    //     position: relative;
                    //     z-index: 3;
                    // }
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
                                    transition: all $transition-time ease;
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
                        .add-window {
                            background-color: rgba(255, 255, 255, 1);
                        }
                    }
                    // .play-insert {
                    //     position: absolute;
                    //     width: 30px;
                    //     height: 30px;
                    //     top: 0;
                    //     bottom: 0;
                    //     margin: auto;
                    //     left: -17px;
                    //     display: flex;
                    //     justify-content: flex-end;
                    //     align-items: center;
                    //     .insert-wrap {
                    //         width: 30px;
                    //         height: 30px;
                    //         border-radius: 100%;
                    //         .icon-add {
                    //             display: block;
                    //             width: 100%;
                    //             height: 100%;
                    //             mask-size: 100%;
                    //             mask-repeat: no-repeat;
                    //             background-color: rgba(222, 222, 222, 1);
                    //             cursor: pointer;
                    //         }
                    //     }
                    //     &:hover {
                    //         z-index: 9;
                    //         .icon-add {
                    //             background-color: rgba($hc-r, $hc-g, $hc-b, 1);
                    //         }
                    //     }
                    // }

                    &.checked {
                        .player {
                            transition: all $transition-time ease;
                            opacity: 1;
                        }
                        .player-wrap-in {
                            box-shadow: 0 1px 2px -2px rgba($hc-r, $hc-g, $hc-b, 0.16),
                                0 3px 6px 0 rgba($hc-r, $hc-g, $hc-b, 0.12),
                                0 5px 12px 4px rgba($hc-r, $hc-g, $hc-b, 0.09);
                            border: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
                            transition: all $transition-time ease;
                        }
                        .player-index {
                            border-color: rgba($hc-r, $hc-g, $hc-b, 0.9);
                            background-color: rgba($hc-r, $hc-g, $hc-b, 0.5);
                            color: #fff;
                            text-shadow: 2px 2px 0px
                                rgba($hc-r, $hc-g, $hc-b, 1);
                            transition: all $transition-time ease;
                        }
                    }
                }
            }
            // .add-btn {
            //     width: 90%;
            //     height: 140px;
            //     display: flex;
            //     justify-content: center;
            //     align-items: center;
            //     transition: all $transition-time ease;
            //     .text-window {
            //         position: relative;
            //         background-color: rgba($ibc-r, $ibc-g, $ibc-b, 0.3);
            //         padding: 4px;
            //         display: flex;
            //         justify-content: center;
            //         align-items: center;
            //         i {
            //             width: 60px;
            //             height: 60px;
            //             font-size: 60px;
            //             font-weight: 100;
            //             mask-size: 100%;
            //             background-color: #ddd;
            //             transition: all 300ms ease;
            //         }
            //     }
            // }
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
