<template>
    <div class="editcms-wrap">
        <div class="text-window-wrap-out">
            <div class="text-window-wrap-in">
                <div class="text-window" v-bind:style="wrapStyle">
                    <div
                        v-for="(txt, index) in txtArr"
                        v-bind:style="txtStyle"
                        :key="index"
                        class="txtp-wrap"
                    >
                        <p class="txtp">
                            {{ txt }}
                        </p>
                    </div>
                </div>
                <nav>
                    <p
                        v-for="(count, index) in pageList"
                        :key="index"
                        @click="changePage(index)"
                        :class="{
                            checked: parseInt(pageCount) === parseInt(index)
                        }"
                    >
                        {{ parseInt(index) + 1 }}
                    </p>
                </nav>
            </div>
        </div>
        <div class="tools-nav">
            <select
                name=""
                id=""
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
            <select
                name=""
                id=""
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
            <i class="text-color" v-bind:style="changeStyle(textInfo.color)">
                <i
                    :class="'text-' + k"
                    v-for="({ k }, index) in dirColor"
                    :key="index"
                    @click="changeColor(k)"
                ></i>
            </i>
            <select
                name=""
                id=""
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
            <select
                name=""
                id=""
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
            <i class="el-icon-picture"></i>
        </div>
        <div class="text-wrap">
            <textarea name="" id="" v-model="txt"></textarea>
        </div>
        <div class="btns-wrap">
            <p @click="addPage">
                <span>增加条目</span>
            </p>
            <p @click="delPage">
                <span>删除条目</span>
            </p>
            <p @click="sendCmsList">
                <span>发布</span>
            </p>
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
                    height="250"
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
                    <!-- <el-table-column
                        width="300"
                        property="status"
                        label="状态"
                    ></el-table-column> -->
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
                        >确定</el-button
                    >
                </div>
                <p slot="reference">追加情报板</p>
            </el-popover>
            <el-popover
                placement="top"
                title="模板列表"
                width="500"
                trigger="click"
            >
                <el-table
                    :data="remixModelList"
                    height="250"
                    border
                    style="width: 100%"
                >
                    <el-table-column prop="txt" label="节目单">
                    </el-table-column>
                    <el-table-column prop="" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-popover
                                placement="right"
                                width="400"
                                trigger="hover"
                            >
                                <div class="text-window-wrap-in">
                                    <div
                                        class="text-window"
                                        v-bind:style="{
                                            width: scope.row.width,
                                            height: scope.row.height
                                        }"
                                    >
                                        <div
                                            v-bind:style="
                                                scope.row.height
                                                    | txtheight(
                                                        scope.row.txtpArr
                                                    )
                                            "
                                            v-for="(txt, index) in scope.row
                                                .txtpArr"
                                            :key="index"
                                            class="txtp-wrap"
                                        >
                                            <p
                                                class="txtp"
                                                v-bind:style="
                                                    scope.row.txtpStyle
                                                "
                                            >
                                                {{ txt }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <span
                                    class="modelListTableSpan"
                                    slot="reference"
                                    >查看</span
                                >
                            </el-popover>
                            <span
                                class="modelListTableSpan"
                                @click="useModel(scope.row)"
                                >使用</span
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <p slot="reference">使用模板</p>
            </el-popover>
        </div>
    </div>
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
            cmsGroupList: []
        }
    },
    props: {
        data: {
            type: Object
        }
    },
    computed: {
        ...mapState({
            dialogStatus: state => state.commonTools.dialogStatus,
            cmsList: state => state.cms.cmsList,
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
            dirShowColor: state => state.cms.directionShowColor,
            dirShowFontFamily: state => state.cms.directionShowFontFamily,
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
                }))
        }),
        userId: () => JSON.parse(window.localStorage.getItem("users")).userId
    },
    methods: {
        remixInfos() {
            console.log(this.data)
            this.pageData = { ...this.data }
            this.pageList = [...this.data.data.itemList]
            this.setPageInfos()
            this.setPageStyle()
            this.setTxtArr()

            // this.textInfo
            // const size = info.size.split("×")
            // info.width = size[0] + "px"
            // info.height = size[1] + "px"

            // if (!this.pageCount) {
            //     this.pageCount = 0
            //     this.remixCmsList()
            // }
        },
        setPageInfos() {
            const lists = this.pageList[this.pageCount].wordList
            this.txtArr = []
            this.txtArr.push(...lists.map(list => list.wc))
            this.wrapStyle = {
                color: this.dirShowColor[this.pageList[this.pageCount].fc],
                "font-family": this.dirShowFontFamily[
                    this.pageList[this.pageCount].fn
                ],
                "font-size": this.pageList[this.pageCount].fs + "px",
                width: this.data.width,
                height: this.data.height,
                "letter-spacing": "0px"
            }
            let pCount = 1
            if (
                this.pageList[this.pageCount].wordList &&
                this.pageList[this.pageCount].wordList.length > 0
            ) {
                pCount = this.pageList[this.pageCount].wordList.length
            }
            this.txtStyle = {
                height: parseInt(this.data.height) / pCount + "px",
                "line-height": parseInt(this.data.height) / pCount + "px"
            }
        },
        setPageStyle() {
            const _style = this.pageList[this.pageCount]
            this.textInfo = {
                fontFamily: _style.fn,
                fontSize: _style.fs,
                display: _style.mode,
                interval: _style.delay,
                color: _style.fc
            }
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

            this.txtStyle.height =
                this.data.data.dph / this.txtArr.length + "px"
            this.txtStyle["line-height"] =
                this.data.data.dph / this.txtArr.length + "px"
        },
        resetTextInfo() {
            if (this.pageCount === null) {
                return
            }
            const textInfo = { ...this.textInfo }
            const fontsize = textInfo.fontSize + "px"
            const fontfamily = textInfo.fontFamily
            const color = textInfo.color

            this.txtStyle["font-size"] = fontsize
            this.txtStyle["font-family"] = this.dirShowFontFamily[fontfamily]
            this.txtStyle.color = this.dirShowColor[color]
        },
        changeColor(color) {
            this.textInfo.color = color
            this.resetTextInfo()
        },
        saveCmsChange() {
            const page = this.pageList[this.pageCount]

            page.delay = this.textInfo.interval
            page.fc = this.textInfo.color
            page.fn = this.textInfo.fontFamily
            page.fs = this.textInfo.fontSize
            page.mode = this.textInfo.display
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
        },
        changePage(index) {
            this.saveCmsChange()
            this.pageCount = index
        },
        addPage() {
            this.saveCmsChange()
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
        delPage() {
            this.pageList.splice(this.pageCount, 1)
            this.pageCount--
            if (this.pageCount < 0) {
                this.pageCount = 0
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
            const list = [...this.cmsList]
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
            this.saveCmsChange()
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
                        dph: page.data.dph,
                        dpt: page.data.dpt,
                        dpw: page.data.dpw,
                        itemList: this.pageList
                    }
                }
                sendArr.push(sendData)
            })
            this.$store.dispatch("postCmsInfos", sendArr).then(() => {
                this.$store.commit("setDialogStatus", false)
            })
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
        }
    },
    filters: {
        txtheight(item, val) {
            const txtHeight =
                val.length === 0 ? item : parseFloat(item) / val.length + "px"
            return { height: txtHeight }
        }
    },
    watch: {
        data: {
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
                // this.resetModelList()
            },
            immediate: true
        },
        dialogStatus: {
            handler(val) {
                // this.clearInfos(val)
            }
        },
        cmsList: {
            handler(val) {
                this.setModelList(val)
            },
            immediate: true,
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
$basic-color: rgb(156, 169, 177);
.text-window-wrap-in {
    background-color: rgb(124, 124, 124);
    position: relative;
    width: 100%;
    height: 144px;
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-top: -30px;

    .text-window {
        position: relative;
        background-color: rgb(54, 54, 54);
        padding: 4px;
        .txtp-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            .txtp {
                // color: #fff;
            }
        }
    }
    nav {
        position: absolute;
        bottom: 4px;
        right: 4px;
        background-color: #fff;
        display: flex;
        padding-left: 1px;
        p {
            width: 26px;
            height: 20px;
            font-size: 14px;
            color: #fff;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
            margin-right: 1px;
            background-color: #000;
            transition: background-color 600ms ease;

            &:hover {
                background-color: rgba(64, 192, 179, 0.8);
                transition: background-color 600ms ease;
            }
        }
        p.checked {
            background-color: rgba(64, 192, 179, 0.8);
        }
    }
}
.editcms-wrap {
    .text-window-wrap-out {
        width: 100%;
        position: relative;
        .text-window-wrap-in {
            margin-top: -30px;
        }
    }

    .cmsinfos-wrap {
        position: relative;
        padding: 10px 0;
        p {
            height: 20px;
            line-height: 20px;
            color: $basic-color;
            font-size: 14px;
        }
    }

    .tools-nav {
        position: relative;
        z-index: 9;
        display: flex;
        background-color: $basic-color;
        height: 36px;
        align-items: center;
        > * {
            margin-left: 12px;
        }
        select {
            height: 24px;
            font-size: 14px;
            color: #555;
            border: 1px solid #333;
            max-width: 100px;
            outline: none;
        }
        > i {
            display: block;
            position: relative;
            width: 22px;
            height: 22px;
            border: 1px solid #333;
            border-radius: 3px;
            cursor: pointer;
            font-size: 22px;
        }

        .text-color {
            background-color: yellow;

            &:hover > i {
                opacity: 1;
                width: 32px;
                height: 32px;
                transition: opacity 400ms ease 100ms;
            }

            i {
                width: 0px;
                height: 0px;
                border: 1px solid #333;
                bottom: -34px;
                position: absolute;
                display: block;
                opacity: 0;
                transition: all 0ms ease 300ms;
            }
            i.text-y {
                background-color: yellow;
                border-radius: 3px 0 0 3px;
                left: -37px;
                border-right: none;
            }
            i.text-r {
                background-color: red;
                left: -5px;
                border-left: none;
                border-right: none;
            }
            i.text-g {
                background-color: green;
                border-radius: 0 3px 3px 0;
                left: 27px;
                border-left: none;
            }
        }
    }

    .text-wrap {
        display: flex;
        textarea {
            // width: 100%;
            height: 72px;
            position: relative;
            resize: none;
            border: 1px solid $basic-color;
            outline: none;
            padding: 10px;
            flex-basis: 100%;
            font-size: 16px;
            color: #333;
        }
    }

    .btns-wrap {
        position: relative;
        display: flex;
        align-items: center;
        height: 50px;
        width: 100%;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: -20px;
        p {
            width: 92px;
            height: 30px;
            line-height: 30px;
            border: 1px solid $basic-color;
            border-radius: 3px;
            text-align: center;
            cursor: pointer;
            font-size: 15px;
            &:hover {
                box-shadow: 0 0 4px rgba(67, 255, 236, 0.7);
                border-color: rgb(64, 192, 179);
                transition: all 400ms ease;
                color: #fff;
                background-color: rgba(64, 192, 179, 0.8);
            }
        }
    }
}
.modelListTableSpan {
    cursor: pointer;
    &:hover {
        color: rgb(64, 192, 179);
        transition: color 400ms ease;
    }
}
</style>
