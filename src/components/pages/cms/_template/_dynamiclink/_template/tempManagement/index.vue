<template>
    <div class="model-wrap">
        <div class="btns-wrap">
            <el-popover placement="right" width="490" trigger="click">
                <add-model></add-model>
                <p slot="reference">添加</p>
            </el-popover>
        </div>
        <el-table :data="cmsModelList" height="250" border style="width: 100%">
            <el-table-column prop="type" label="类型" width="80">
            </el-table-column>
            <el-table-column prop="txt" label="节目单" width="400">
            </el-table-column>
            <el-table-column prop="" label="操作">
                <template slot-scope="scope">
                    <el-popover placement="right" width="400" trigger="hover">
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
                                            | txtheight(scope.row.txtpArr)
                                    "
                                    v-for="(txt, index) in scope.row.txtpArr"
                                    :key="index"
                                    class="txtp-wrap"
                                >
                                    <p
                                        class="txtp"
                                        v-bind:style="scope.row.txtpStyle"
                                    >
                                        {{ txt }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p slot="reference">查看</p>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
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

            visible: false,
            multipleSelection: [],
            cmsTypeList: [],
            typeNav: 0
        }
    },
    props: {},
    computed: {
        ...mapState({
            cmslist: state => state.cms.cmsGroupList,
            cmsModelList: state => state.cms.cmsModelList
        })
    },
    components: {
        AddModel: () => import(/* webpackChunkName:"cms" */ "./add")
    },
    mounted() {},
    methods: {
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
            console.log(this.multipleSelection)
        },
        changeType(index) {
            this.saveBeforeChangeType()
            this.typeNav = index
            this.txt = this.cmsTypeList[this.typeNav].txt
        },
        resetTextInfo() {
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
            this.cmsTypeList[this.typeNav].txtpStyle = {
                "font-size": fontsize,
                color: color,
                "font-family": fontfamily,
                "line-height": fontsize
            }
        },
        resetTxt() {
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
            this.cmsTypeList[this.typeNav].txtpArr = [...txtArr]
        },
        outBack() {
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
            console.log(emptyPage)
        },
        savePage() {
            console.log(this.cmsTypeList)
        },
        remixCmsList() {
            const list = [...this.cmslist]
            for (let i = 0, l = list.length; i < l; i++) {
                for (let j = 0, jl = list[i].list.length; j < jl; j++) {
                    if (
                        !this.cmsTypeList
                            .map(types => types.type)
                            .find(val => val === list[i].list[j].size)
                    ) {
                        this.cmsTypeList.push({
                            type: list[i].list[j].size,
                            width: list[i].list[j].size.split("×")[0] + "px",
                            height: list[i].list[j].size.split("×")[1] + "px",
                            model: "",
                            textInfo: { ...this.textInfo },
                            txt: "",
                            txtpArr: [],
                            txtpStyle: {}
                        })
                    }
                }
            }
        },
        saveBeforeChangeType() {
            this.cmsTypeList[this.typeNav].txt = this.txt
            this.cmsTypeList[this.typeNav].txtpArr = this.txtpArr
            this.cmsTypeList[this.typeNav].txtpStyle = this.txtpStyle
            this.cmsTypeList[this.typeNav].textInfo = this.textInfo
        },
        remixCmsData() {
            this.txt = this.cmsTypeList[this.typeNav].txt
            this.txtpArr = this.cmsTypeList[this.typeNav].txtpArr
            this.txtpStyle = this.cmsTypeList[this.typeNav].txtpStyle
            this.textInfo = this.cmsTypeList[this.typeNav].textInfo
        }
    },
    filters: {
        txtheight(item, val) {
            const txtHeight =
                val.length === 0 ? item : parseFloat(item) / val.length + "px"
            return { height: txtHeight }
        },
        settxtp(item) {
            const txttop = item.y + "px"
            const txtleft = item.x + "px"
            const txtletterspace = item.space + "px"
            const fontsize = item.fontsize + "px"
            const fontfamily = item.fontfamily
            const color = item.color
            return {
                top: txttop,
                left: txtleft,
                "letter-spacing": txtletterspace,
                "font-size": fontsize,
                color: color,
                "font-family": fontfamily,
                "line-height": fontsize
            }
        }
    },
    watch: {
        txt: {
            handler() {
                this.resetTxt()
            }
        },
        textInfo: {
            handler() {
                this.resetTextInfo()
            },
            deep: true
        },
        cmslist: {
            handler() {
                this.remixCmsList()
            },
            immediate: true,
            deep: true
        },
        typeNav: {
            handler() {
                this.remixCmsData()
            },
            immediate: true
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
    margin-top: 0px;
    margin-bottom: 0px;

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
}
.model-wrap {
    .typeChecked {
        opacity: 1;
    }

    .tools-nav {
        position: relative;
        z-index: 9;
        display: flex;
        background-color: $basic-color;
        height: 36px;
        align-items: center;
        margin-top: -31px;
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
        }

        .text-color {
            background-color: yellow;
            input {
                position: relative;
                display: block;
                opacity: 0;
                width: 100%;
                height: 100%;
                cursor: pointer;

                &:checked ~ i {
                    opacity: 1;
                    width: 22px;
                    height: 22px;
                    transition: opacity 400ms ease;
                }
            }

            i {
                width: 0px;
                height: 0px;
                border: 1px solid #333;
                bottom: -24px;
                position: absolute;
                display: block;
                opacity: 0;
            }
            i.text-yellow {
                background-color: yellow;
                border-radius: 3px 0 0 3px;
                left: -22px;
                border-right: none;
            }
            i.text-red {
                background-color: red;
                left: 0;
                border-left: none;
                border-right: none;
            }
            i.text-green {
                background-color: green;
                border-radius: 0 3px 3px 0;
                left: 22px;
                border-left: none;
            }
        }
    }

    .text-wrap {
        display: flex;
        textarea {
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
        margin-top: -20px;
        margin-bottom: 10px;
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
</style>
