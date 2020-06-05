<template>
    <el-container class="cms-edit-wrap">
        <el-header class="cms-edit-header-outwrap" height="40px">
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
            class="cms-edit-container-outwrap"
            v-bind:style="{ height: frameheight }"
        >
            <el-aside class="cms-edit-aside-outwrap" width="360px">
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
            <el-main class="cms-edit-main-outwrap">
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
                                >屏 当前为第<span>{{
                                    parseInt(pageCount) + 1
                                }}</span
                                >屏
                            </p>
                            <div class="btns-wrap">
                                <button
                                    class="p-button"
                                    type="round"
                                    size="mini"
                                >
                                    <i class="el-icon-warning-outline"></i>
                                    <span>预留</span>
                                </button>
                                <el-popover
                                    placement="top"
                                    title="情报板列表"
                                    width="600"
                                    trigger="click"
                                    v-model="visible"
                                >
                                    <el-table
                                        :data="newCmslist"
                                        @selection-change="
                                            handleSelectionChange
                                        "
                                        tooltip-effect="dark"
                                        height="285"
                                        ref="multipleTable"
                                    >
                                        <el-table-column
                                            type="selection"
                                            width="55"
                                        >
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
                                        <i
                                            class="el-icon-circle-plus-outline"
                                        ></i>
                                        <span>追加情报板</span>
                                    </button>
                                </el-popover>
                                <button
                                    class="p-button"
                                    type="round"
                                    size="mini"
                                    @click="resetAllCmsData"
                                >
                                    <i class="icon-custom icon-resetall"></i>
                                    <span>全部重置</span>
                                </button>
                                <button
                                    class="p-button"
                                    type="round"
                                    size="mini"
                                >
                                    <i class="icon-custom icon-clean"></i>
                                    <span>全部清空</span>
                                </button>
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
                        <div class="cms-edit-main-left">
                            <aside>
                                <ul>
                                    <li
                                        v-for="(count, index) in pageList"
                                        :key="index"
                                        @click="changePage(index)"
                                        :class="{
                                            checked:
                                                parseInt(pageCount) ===
                                                parseInt(index)
                                        }"
                                    >
                                        {{ parseInt(index) + 1 }}
                                    </li>
                                </ul>
                            </aside>
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
                                            @click="changePage(index)"
                                            :class="{
                                                checked:
                                                    parseInt(pageCount) ===
                                                    parseInt(index)
                                            }"
                                            v-bind:style="{
                                                height:
                                                    parseInt(wrapStyle.height) +
                                                    40 +
                                                    'px'
                                            }"
                                        >
                                            <p class="delete-btn">
                                                <span
                                                    @click.stop="delPage(index)"
                                                >
                                                    <i></i>
                                                    <i></i>
                                                </span>
                                            </p>
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
                                                class="text-window"
                                                @click="addPage"
                                                v-bind:style="wrapStyle"
                                            >
                                                <i class="icon-add"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cms-edit-main-right">
                            <div class="triangle"></div>
                            <div class="edit-tools">
                                <header>
                                    <div class="tools-header">
                                        <span>快捷操作：</span>
                                        <button
                                            class="p-button"
                                            type="round"
                                            size="mini"
                                        >
                                            <i
                                                class="icon-custom icon-clean"
                                            ></i>
                                            <span>清空当前屏</span>
                                        </button>
                                        <button
                                            class="p-button"
                                            type="round"
                                            size="mini"
                                            @click="resetCmsData"
                                            v-if="
                                                JSON.parse(this.pageList4Reset)
                                                    .itemList.length > pageCount
                                            "
                                        >
                                            <i
                                                class="icon-custom icon-reset"
                                            ></i>
                                            <span>重置当前屏</span>
                                        </button>
                                    </div>
                                    <div class="tools-header">
                                        <span>快捷填充：</span>
                                        <button
                                            class="p-button"
                                            type="round"
                                            size="mini"
                                        >
                                            <i
                                                class="el-icon-document-copy"
                                            ></i>
                                            <span>模板</span>
                                        </button>
                                        <button
                                            class="p-button"
                                            type="round"
                                            size="mini"
                                        >
                                            <i class="el-icon-time"></i>
                                            <span>历史发布</span>
                                        </button>
                                    </div>
                                </header>
                                <section class="tools-btn">
                                    <div>
                                        <span>字体：</span>
                                        <select
                                            v-model="textInfo.fontFamily"
                                            @change="resetTextInfo"
                                        >
                                            <option value="">-字体-</option>
                                            <option
                                                v-for="({ k, v },
                                                index) in dirFontFamily"
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
                                                v-for="({ k, v },
                                                index) in dirFontSize"
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
                                                v-for="({ k, v },
                                                index) in dirColor"
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
                                                v-for="({ k, v },
                                                index) in dirMode"
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
                                                v-for="({ k, v },
                                                index) in dirDelay"
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

            visible: false,
            newCmslist: [],
            multipleSelection: [],
            remixModelList: [],
            sendInfos: [],
            cmsGroupList: [],
            frameheight: "",
            clientHeight: "",
            headerHeight: "",
            frameHeight: "",
            title: "情报板编辑",
            defStr: "default",
            data: {}
        }
    },
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
            cmsId: state => state.cms.cmsId
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
        this.$options.sockets.onmessage = res => {
            // res.data为服务端返回的数据
            const data = JSON.parse(res.data)
            this.socketMsg = data
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
            this.pageList = [...this.pageType.itemList]
            this.pageList4Reset = this.cmsMap[this.cmsId].data
            this.remixPageList()
            this.setPageInfos()
            this.setPageStyle()
            this.setTxtArr()
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
                        "line-height": this.dirShowFontSize[item.fs] + "px"
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
                page.wordList[index].wc = txt
                page.wordList[index].wx =
                    (parseInt(this.data.width) -
                        txt.length * parseInt(this.textInfo.fontSize)) /
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
                            txt.length * parseInt(this.textInfo.fontSize)) /
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
            this.pageCount = index
        },
        addPage() {
            const emptyPage = {
                delay: 3,
                fc: "r",
                fn: "s",
                fs: 32,
                graphList: [],
                mode: 1,
                wordList: []
            }

            this.pageList.push(emptyPage)
            this.pageCount = this.pageList.length - 1
            this.txtArr = []
        },
        delPage(index) {
            if (this.pageCount >= index) {
                this.pageCount--
                if (this.pageCount < 0) {
                    this.pageCount = 0
                }
            }
            this.setPageInfos()
            this.setPageStyle()
            this.setTxtArr()
            this.pageList.splice(index, 1)
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
            console.log(this.newCmslist)
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        sendCmsList() {
            this.pageList.forEach(page => {
                page.delay = parseInt(page.delay)
                page.fs = parseInt(page.fs)
                page.mode = parseInt(page.mode)
                page.wordList.forEach(word => {
                    delete word.pstyle
                })
            })
            this.multipleSelection.unshift(this.pageData)
            const sendArr = []
            this.multipleSelection.forEach(page => {
                const sendData = {
                    useId: this.userId + "",
                    orgId: page.orgId + "",
                    devId: page.deviceId + "",
                    devVarTypeId: page.deviceVarTypeId + "",
                    devVarValue: "",
                    playList: {
                        dph: this.pageType.dph,
                        dpt: this.pageType.dpt,
                        dpw: this.pageType.dpw,
                        itemList: this.pageList
                    }
                }
                sendArr.push(sendData)
            })
            this.$store.dispatch("postCmsInfos", sendArr).then(() => {
                // do something
            })
        },
        changeDev(dev) {
            const cmsId = dev.orgId + "×" + dev.deviceId
            this.$store.commit("setCmsId", cmsId)
            this.remixInfos()
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

        calculateLocation({
            width,
            height,
            textlength,
            total,
            index,
            fontsize,
            letterspace = 0
        }) {
            const perheight = parseInt(height) / total
            const x = parseInt(
                (parseInt(width) -
                    textlength * parseInt(fontsize) -
                    letterspace * (textlength - 1)) /
                    2
            )
            const y = parseInt(
                perheight * index + (perheight - parseInt(fontsize)) / 2
            )
            return { x, y }
        },
        resetCmsText() {
            this.pageData.display = this.textInfo.display
            this.pageData.interval = this.textInfo.interval
            const page = this.pageData.pages[this.pageCount]
            const txtp = this.txtpArr
            txtp.forEach((txt, index) => {
                if (!page[index]) {
                    page[index] = {}
                }
                page[index].fontsize = this.textInfo.fontSize
                page[index].fontfamily = this.textInfo.fontFamily
                page[index].color = this.textInfo.color
                page[index].text = this.txtpArr[index]
                const { x, y } = this.calculateLocation({
                    width: this.pageData.width,
                    height: this.pageData.height,
                    textlength: this.txtpArr[index].length,
                    total: this.txtpArr.length,
                    index: index,
                    fontsize: this.textInfo.fontSize
                })
                page[index].x = x
                page[index].y = y
                page[index].space = 0
            })
        },
        clearInfos(val) {
            if (!val) {
                this.pageCount = null
            } else {
                this.pageCount = 0
            }
        },
        resetModelList() {
            this.remixModelList = []
            this.cmsModelList.forEach(model => {
                if (this.pageData.size === model.type) {
                    this.remixModelList.push(model)
                }
            })
        },
        resetCmsGroupList() {
            this.cmsGroupList = []
            this.cmsList.map(cms => {
                let i = 0
                const l = this.cmsGroupList.length
                for (; i < l; i++) {
                    if (this.cmsGroupList[i].title === cms.road) {
                        this.cmsGroupList[i].list.push(cms)
                        break
                    }
                }
                if (i === l) {
                    this.cmsGroupList[i] = {
                        title: cms.road,
                        list: [cms]
                    }
                }
            })
            this.remixCmsList()
        },
        // 处理socket数据
        remixSocketMsg(val) {
            if (val) {
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
    // filters: {
    //     txtheight(item, val) {
    //         const txtHeight =
    //             val.length === 0 ? item : parseFloat(item) / val.length + "px"
    //         return { height: txtHeight }
    //     }
    // },
    watch: {
        cmsId: {
            handler(val) {
                this.remixInfos(val)
            },
            immediate: true,
            deep: true
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
            handler(val) {
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
$outwrap-borderline-color: #ddd;
$header-text-color: #07dbdb;
$border-color: rgb(209, 209, 209);
$hc-r: 7;
$hc-g: 219;
$hc-b: 219;
$transition-time: 240ms;
.cms-edit-wrap {
    background-color: #fff;
    .cms-edit-header-outwrap {
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
    .cms-edit-aside-outwrap {
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
    .cms-edit-main-outwrap {
        background-color: #ddd;
        display: flex;
        padding: 8px 0 0 8px;
        .cms-edit-main-inwrap {
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

            .cms-edit-main {
                flex-grow: 1;
                background-color: rgba(255, 255, 255, 1);
                display: flex;
                flex-direction: row;
                .cms-edit-main-left {
                    width: 550px;
                    background-color: #fff;
                    display: flex;
                    flex-direction: row;
                    aside {
                        width: 60px;
                        display: flex;
                        justify-content: flex-end;
                        align-items: flex-start;
                        ul {
                            padding: 15px 0;
                            border-radius: 15px;
                            margin-left: 6px;
                            border: 1px solid #ccc;
                            width: 30px;
                            min-height: 200px;
                            background-color: rgba(75, 58, 224, 0.8);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            margin-top: 22px;
                            li {
                                height: 30px;
                                line-height: 30px;
                                text-align: center;
                                color: #fff;
                                font-size: 16px;
                                cursor: pointer;
                                list-style: none;
                                border: 1px solid rgba(255, 255, 255, 0);
                                box-sizing: border-box;
                                transition: all $transition-time ease;
                                &:hover {
                                    border-color: rgba(255, 255, 255, 0.5);
                                    box-shadow: 0 0 15px
                                        rgba(255, 255, 255, 0.5) inset;
                                    transition: all $transition-time ease;
                                }
                            }
                            li.checked {
                                background-color: rgb(134, 104, 48);
                            }
                        }
                    }

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
                                    .delete-btn {
                                        position: absolute;
                                        z-index: 9;
                                        top: 0;
                                        left: 0;
                                        width: 0px;
                                        opacity: 0;
                                        height: 100%;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        transition: all $transition-time ease;
                                        span {
                                            display: block;
                                            position: relative;
                                            width: 20px;
                                            height: 20px;
                                            border: 1px solid #aaa;
                                            border-radius: 100%;
                                            i {
                                                display: block;
                                                position: absolute;
                                                width: 60%;
                                                height: 1px;
                                                margin: auto;
                                                top: 0;
                                                bottom: 0;
                                                left: 0;
                                                right: 0;
                                                background-color: #aaa;
                                                transition: all 500ms ease;
                                            }
                                            &:hover {
                                                border-color: rgb(240, 50, 50);
                                                i {
                                                    background-color: rgb(
                                                        240,
                                                        50,
                                                        50
                                                    );
                                                    transition: all 500ms ease;
                                                }
                                                i:first-child {
                                                    transform: rotate(315deg);
                                                }
                                                i:last-child {
                                                    transform: rotate(405deg);
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
                                    &:hover {
                                        .delete-btn {
                                            opacity: 1;
                                            width: 50px;
                                            transition: all $transition-time
                                                ease;
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
                                        cursor: pointer;
                                        position: relative;
                                        background-color: whitesmoke;
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

                                    &:hover {
                                        .text-window {
                                            box-shadow: 0 0 12px
                                                rgba($hc-r, $hc-g, $hc-b, 0.3);
                                            transition: all $transition-time
                                                ease;
                                            i {
                                                background-color: rgba(
                                                    205,
                                                    243,
                                                    218,
                                                    0.7
                                                );
                                                transition: all 300ms ease;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .cms-edit-main-right {
                    flex-grow: 1;
                    position: relative;
                    .triangle {
                        position: absolute;
                        z-index: 19;
                        width: 10px;
                        height: 10px;
                        transform: rotate(45deg);
                        background-color: rgba($hc-r, $hc-g, $hc-b, 1);
                        box-shadow: 0 0 12px rgba($hc-r, $hc-g, $hc-b, 0.3);
                        border: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
                        left: 74.5px;
                        top: 100px;
                    }

                    .edit-tools {
                        display: block;
                        position: absolute;
                        width: 400px;
                        height: auto;
                        border-radius: 5px;
                        box-shadow: 0 0 12px rgba($hc-r, $hc-g, $hc-b, 0.3);
                        border: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
                        top: 30px;
                        left: 80px;
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
                            border-bottom: 1px solid
                                rgba($hc-r, $hc-g, $hc-b, 0.3);
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
                            height: 120px;
                            display: flex;
                            flex-direction: column;
                            flex-wrap: wrap;
                            > div {
                                width: 50%;
                                height: 40px;
                                display: flex;
                                align-items: center;
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
                            height: 100px;
                            width: 100%;
                            display: flex;
                            textarea {
                                flex-grow: 1;
                                position: relative;
                                resize: none;
                                border: none;
                                outline: none;
                                padding: 10px;
                                flex-basis: 100%;
                                font-size: 16px;
                                color: #333;
                                background-color: rgba(255, 255, 255, 0.6);
                                &:focus {
                                    background-color: rgba(255, 255, 255, 0.9);
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
