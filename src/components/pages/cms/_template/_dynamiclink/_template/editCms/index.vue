<template>
    <div class="editcms-wrap">
        <div class="text-window-wrap-out">
            <div class="text-window-wrap-in">
                <div
                    class="text-window"
                    v-bind:style="{
                        width: data.width,
                        height: data.height
                    }"
                >
                    <div
                        v-bind:style="data.height | txtheight(txtpArr)"
                        v-for="(txt, index) in txtpArr"
                        :key="index"
                        class="txtp-wrap"
                    >
                        <p class="txtp" v-bind:style="txtpStyle">
                            {{ txt }}
                        </p>
                    </div>
                </div>
                <nav>
                    <p
                        v-for="(count, index) in data.pages"
                        :key="index"
                        @click="changePage(index)"
                        :class="{ checked: pageCount === index }"
                    >
                        {{ index + 1 }}
                    </p>
                </nav>
            </div>
        </div>
        <div class="cmsinfos-wrap">
            <p>所处位置：{{ data.title }} {{ data.station }}</p>
            <p>运行状态：{{ data.status }}</p>
            <p>发布时间：</p>
        </div>
        <div class="tools-nav">
            <select
                name=""
                id=""
                v-model="textInfo.fontFamily"
                @change="resetTextInfo"
            >
                <option value="">字体</option>
                <option value="microsoft yahei">黑体</option>
            </select>
            <select name="" id="" v-model="textInfo.fontSize">
                <option value="">字号</option>
                <option value="16">16px</option>
                <option value="24">24px</option>
                <option value="32">32px</option>
            </select>
            <!-- <i></i>
            <i></i>
            <i></i> -->
            <i class="text-color" v-bind:style="textInfo.color | changeStyle">
                <i class="text-yellow" @click="changeColor('yellow')"></i>
                <i class="text-red" @click="changeColor('red')"></i>
                <i class="text-green" @click="changeColor('green')"></i>
            </i>
            <select
                name=""
                id=""
                v-model="textInfo.display"
                @change="resetTextInfo"
            >
                <option value="">显示方式</option>
                <option value="1">立即显示</option>
            </select>
            <select
                name=""
                id=""
                v-model="textInfo.interval"
                @change="resetTextInfo"
            >
                <option value="">时间间隔</option>
                <option value="3">3'</option>
                <option value="5">5'</option>
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
                width="400"
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
                        property="station"
                        label="位置"
                    ></el-table-column>
                    <el-table-column
                        width="100"
                        property="type"
                        label="型号"
                    ></el-table-column>
                    <el-table-column
                        width="300"
                        property="status"
                        label="状态"
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
                fontFamily: "microsoft yahei",
                fontSize: "16",
                display: "1",
                interval: "3",
                color: "yellow"
            },
            txt: "",
            txtpArr: [],
            txtpStyle: {},
            pageCount: null,
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
            cmslist: state => state.cms.cmsList,
            cmsModelList: state => state.cms.cmsModelList
        })
    },
    methods: {
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
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        remixInfos(info) {
            this.pageData = { ...this.data }
            const size = info.size.split("×")
            info.width = size[0] + "px"
            info.height = size[1] + "px"
            if (!this.pageCount) {
                this.pageCount = 0
                this.remixCmsList()
            }
        },
        resetInfos() {
            if (this.pageCount === null) {
                return
            }
            this.txt = ""
            const data = this.data.pages[this.pageCount]
            data.map(page => (this.txt += page.text + "\n"))
            this.textInfo = {
                fontFamily: data[0].fontfamily,
                fontSize: data[0].fontsize,
                display: this.data.display,
                interval: this.data.interval,
                color: data[0].color
            }
            this.resetTextInfo()
            this.resetTxt()
        },
        resetTextInfo() {
            if (this.pageCount === null) {
                return
            }
            const textInfo = { ...this.textInfo }
            const fontsize = textInfo.fontSize + "px"
            const fontfamily = textInfo.fontFamily
            const color = textInfo.color
            this.txtpStyle = {
                "font-size": fontsize,
                color: color,
                "font-family": fontfamily,
                "line-height": fontsize
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
        resetTxt() {
            if (this.pageCount === null) {
                return
            }
            this.txtpArr = []
            const txtArr = this.txt.split("\n")
            for (let i = 0; i < txtArr.length; i++) {
                const txt = txtArr[i].replace(/(^\s*)|(\s*$)/g, "")
                if (txt.length === 0) {
                    txtArr.splice(i, 1)
                    i--
                }
            }
            this.txtpArr = [...txtArr]
        },
        changePage(index) {
            this.resetCmsText()
            this.pageCount = index
        },
        addPage() {
            this.resetCmsText()
            const emptyPage = [
                {
                    text: "",
                    fontsize: "16",
                    fontfamily: "microsoft yahei",
                    color: "#ffff00",
                    x: 0,
                    y: 0,
                    space: 0
                }
            ]
            this.pageData.pages.push(emptyPage)
            this.pageCount = this.pageData.pages.length - 1
        },
        delPage() {
            this.pageData.pages.splice(this.pageCount, 1)
            this.resetInfos()
            this.resetTextInfo()
        },
        remixCmsList() {
            this.newCmslist = []
            const list = [...this.cmsGroupList]
            for (let i = 0, l = list.length; i < l; i++) {
                for (let j = 0, jl = list[i].list.length; j < jl; j++) {
                    if (this.pageData.size === list[i].list[j].size) {
                        // if (
                        //     list[i].list[j].orgId !== this.pageData.orgId &&
                        //     list[i].list[j].devId !== this.pageData.devId
                        // ) {
                        this.newCmslist.push({
                            id:
                                list[i].list[j].orgId +
                                "×" +
                                list[i].list[j].devId,
                            station: list[i].list[j].station,
                            type: list[i].list[j].size,
                            status: list[i].list[j].status
                        })
                        // }
                    }
                }
            }
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
        sendCmsList() {
            this.resetCmsText()
            const pages = [...this.pageData.pages]
            const list = []
            list[0] = {
                orgId: this.pageData.orgId,
                devId: this.pageData.devId,
                display: this.pageData.display,
                interval: this.pageData.interval,
                pages: [...pages]
            }
            this.multipleSelection.forEach(station => {
                const ids = station.id.split("×")
                list.push({
                    orgId: ids[0],
                    devId: ids[1],
                    display: this.pageData.display,
                    interval: this.pageData.interval,
                    pages: [...pages]
                })
            })
            this.$store.dispatch("postCmsInfos", list).then(res => {
                this.$store.dispatch("getCmsInfo")
            })
        },
        changeColor(color) {
            this.textInfo.color = color
        },
        resetCmsGroupList() {
            this.cmsGroupList = []
            this.cmslist.map(cms => {
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
        },
        changeStyle(item) {
            return { "background-color": item }
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
                this.resetInfos()
                this.resetModelList()
            },
            immediate: true
        },
        dialogStatus: {
            handler(val) {
                this.clearInfos(val)
            }
        },
        cmslist: {
            handler(val) {
                this.resetCmsGroupList(val)
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
                color: #fff;
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
            i.text-yellow {
                background-color: yellow;
                border-radius: 3px 0 0 3px;
                left: -37px;
                border-right: none;
            }
            i.text-red {
                background-color: red;
                left: -5px;
                border-left: none;
                border-right: none;
            }
            i.text-green {
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
