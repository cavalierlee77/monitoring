<template>
    <div class="addModel-wrap">
        <div
            class="text-window-wrap-out"
            v-for="(cmsType, index) in cmsTypeList"
            :key="index"
            @click="changeType(index)"
            :class="{ typeChecked: typeNav === index }"
        >
            <div class="text-window-wrap-in">
                <div
                    class="text-window"
                    v-bind:style="{
                        width: cmsType.width,
                        height: cmsType.height
                    }"
                >
                    <div
                        v-bind:style="
                            cmsType.height | txtheight(cmsType.txtpArr)
                        "
                        v-for="(txt, index) in cmsType.txtpArr"
                        :key="index"
                        class="txtp-wrap"
                    >
                        <p class="txtp" v-bind:style="cmsType.txtpStyle">
                            {{ txt }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="tools-nav">
            <select
                name=""
                id=""
                v-model="cmsTypeList[typeNav].textInfo.fontFamily"
                @change="resetTextInfo"
            >
                <option value="">字体</option>
                <option value="microsoft yahei">黑体</option>
            </select>
            <select
                name=""
                id=""
                v-model="cmsTypeList[typeNav].textInfo.fontSize"
                @change="resetTextInfo"
            >
                <option value="">字号</option>
                <option value="16">16px</option>
                <option value="24">24px</option>
                <option value="32">32px</option>
            </select>

            <i class="text-color">
                <input type="checkbox" />
                <i class="text-yellow"></i>
                <i class="text-red"></i>
                <i class="text-green"></i>
            </i>
            <select
                name=""
                id=""
                v-model="cmsTypeList[typeNav].textInfo.display"
                @change="resetTextInfo"
            >
                <option value="">显示方式</option>
                <option value="1">立即显示</option>
            </select>
            <select
                name=""
                id=""
                v-model="cmsTypeList[typeNav].textInfo.interval"
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
            <p @click="savePage">
                <span>保存</span>
            </p>
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

            visible: false,
            multipleSelection: [],
            cmsTypeList: [],
            typeNav: 0
        }
    },
    computed: {
        ...mapState({
            cmslist: state => state.cms.cmsGroupList
        })
    },
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
            this.cmsTypeList[this.typeNav].txt = this.txt
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
        savePage() {
            const postModelList = []
            this.cmsTypeList.forEach(type => {
                if (type.txt !== "") {
                    postModelList.push(type)
                }
            })
            this.$store.dispatch("postModelList", postModelList)
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
                            // model: "",
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
.addModel-wrap {
    .text-window-wrap-out {
        width: 100%;
        position: relative;
        opacity: 0.5;
        .text-window-wrap-in {
            background-color: rgb(124, 124, 124);
            position: relative;
            width: 100%;
            height: 144px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 0px;
            margin-bottom: 1px;

            .text-window {
                position: relative;
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
    }

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
        margin-top: -1px;
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
        justify-content: flex-end;
        margin-top: 0px;
        margin-bottom: -8px;
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
