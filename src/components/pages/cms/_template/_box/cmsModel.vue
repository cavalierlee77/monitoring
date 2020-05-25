<template>
    <el-container class="cmsmodel-wrap">
        <el-header class="cmsmodel-header-outwrap" height="40px">
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
        </el-header>
        <el-main
            class="cmsmodel-main-outwrap"
            v-bind:style="{ height: frameheight }"
        >
            <section class="model-total">
                <div class="model-select-box">
                    <div class="buttons">
                        <el-popover
                            placement="right"
                            width="490"
                            trigger="click"
                        >
                            <add-model></add-model>
                            <button
                                slot="reference"
                                class="p-button"
                                type="round"
                                size="mini"
                            >
                                <i class="el-icon-circle-plus-outline"></i>
                                <span>添加</span>
                            </button>
                        </el-popover>
                        <button
                            class="p-button"
                            type="round"
                            size="mini"
                            @click="editModel"
                        >
                            <i class="el-icon-edit"></i>
                            <span>编辑</span>
                        </button>
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
                        <!-- <select-box></select-box> -->
                    </el-popover>
                </div>
                <div class="model-preview">
                    <div
                        class="text-window-wrap-in"
                        v-if="JSON.stringify(nowModelData) !== '{}'"
                    >
                        <div
                            class="text-window"
                            v-bind:style="{
                                width: nowModelData.width,
                                height: nowModelData.height
                            }"
                        >
                            <div
                                v-bind:style="
                                    nowModelData.height
                                        | txtheight(nowModelData.txtpArr)
                                "
                                v-for="(txt, index) in nowModelData.txtpArr"
                                :key="index"
                                class="txtp-wrap"
                            >
                                <p
                                    class="txtp"
                                    v-bind:style="nowModelData.txtpStyle"
                                >
                                    {{ txt }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="model-list">
                <el-table
                    :data="cmsModelList"
                    height="250"
                    border
                    style="width: 100%"
                >
                    <el-table-column prop="" label="标签" width="80">
                    </el-table-column>
                    <el-table-column prop="type" label="类型" width="80">
                    </el-table-column>
                    <el-table-column prop="txt" label="节目单">
                    </el-table-column>
                    <el-table-column
                        prop="txtpStyle.font-family"
                        label="字体"
                        width="64"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="txtpStyle.font-size"
                        label="字号"
                        width="64"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="txtpStyle.color"
                        label="颜色"
                        width="64"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="textInfo.display"
                        label="显示方式"
                        width="78"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="textInfo.interval"
                        label="出字时间"
                        width="78"
                    >
                    </el-table-column>
                    <el-table-column prop="" label="添加时间" width="78">
                    </el-table-column>
                    <el-table-column prop="" label="操作" width="176">
                        <template slot-scope="scope" class="model-operation">
                            <div class="model-operation">
                                <button
                                    class="p-button"
                                    type="round"
                                    size="mini"
                                    v-on:mouseover="checkmodel(scope.row)"
                                    v-if="!operationStatus"
                                >
                                    <i class="el-icon-document"></i>
                                    <span>查看</span>
                                </button>
                                <button
                                    class="p-button"
                                    type="round"
                                    size="mini"
                                    v-on:mouseover="checkmodel(scope.row)"
                                    v-on:click="checkmodel(scope.row)"
                                    v-if="operationStatus"
                                >
                                    <i class="el-icon-edit"></i>
                                    <span>修改</span>
                                </button>
                                <button
                                    class="p-button p-delete"
                                    type="round"
                                    size="mini"
                                    v-on:mouseover="checkmodel(scope.row)"
                                    v-on:click="checkmodel(scope.row)"
                                    v-if="operationStatus"
                                >
                                    <i class="el-icon-delete"></i>
                                    <span>删除</span>
                                </button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
        </el-main>
    </el-container>
</template>
<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            title: "模板管理",
            frameheight: "",
            clientHeight: "",
            headerHeight: "",
            frameHeight: "",
            tableHeight: "",
            remixModelList: [],
            nowModelData: {},
            operationStatus: false
        }
    },
    computed: {
        ...mapState({
            cmsModelList: state => state.cms.cmsModelList
        })
    },
    components: {
        AddModel: () =>
            import(/* webpackChunkName:"cms" */ "./../_fragments/modelAdd")
    },
    methods: {
        editModel() {
            this.operationStatus = !this.operationStatus
        },
        checkmodel(data) {
            this.nowModelData = data
        },
        handleMenuItemClick(key, keyPath) {
            this.$router.push("/main/cms")
        },
        resetFrameHeight() {
            this.frameheight =
                parseFloat(this.clientHeight) -
                parseFloat(this.headerHeight) -
                parseFloat(this.frameHeight) -
                20 +
                "px"
        },
        resetModelList() {
            this.remixModelList = []
            this.cmsModelList.forEach(model => {
                if (this.pageData.size === model.type) {
                    this.remixModelList.push(model)
                }
            })
        },
        useModel(val) {
            this.txtpArr = val.txtpArr
            this.txtpStyle = val.txtpStyle
            this.textInfo = val.textInfo
            this.txt = val.txt
        }
    },
    mounted() {
        this.clientHeight = `${document.documentElement.clientHeight}`
        this.headerHeight = document.querySelector(".el-header").style.height
        this.frameHeight = document.querySelector(
            ".cmsmodel-header-outwrap"
        ).style.height
        this.tableHeight =
            parseFloat(this.clientHeight) -
            parseFloat(this.headerHeight) -
            parseFloat(this.frameHeight) -
            20 -
            240 +
            "px"
        this.resetFrameHeight()
        window.onresize = function temp() {
            this.clientHeight = `${document.documentElement.clientHeight}`
            this.headerHeight = document.querySelector(
                ".el-header"
            ).style.height
            this.frameHeight = document.querySelector(
                ".cmsmodel-header-outwrap"
            ).style.height
            this.tableHeight =
                parseFloat(this.clientHeight) -
                parseFloat(this.headerHeight) -
                parseFloat(this.frameHeight) -
                20 -
                240 +
                "px"
            this.resetFrameHeight()
        }
    },
    filters: {
        txtheight(item, val) {
            const txtHeight =
                val.length === 0 ? item : parseFloat(item) / val.length + "px"
            return { height: txtHeight }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "./../../_css/button.scss";
@import "./../../_css/buttonIcon.scss";

$outwrap-borderline-color: #ddd;
.cmsmodel-wrap {
    margin: 8px;
    border: 1px solid $outwrap-borderline-color;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
    .cmsmodel-header-outwrap {
        background-color: #fff;
        border-bottom: 1px solid $outwrap-borderline-color;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > span {
            font-size: 18px;
            letter-spacing: 2px;
            color: #07dbdb;
            font-weight: 100;
        }
    }
    .cmsmodel-main-outwrap {
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        .model-total {
            position: relative;
            height: 200px;
            display: flex;
            flex-direction: row;
            flex-grow: 1;

            .model-select-box {
                width: 320px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                > * {
                    margin-bottom: 12px;
                }
                .buttons {
                    display: flex;
                    flex-direction: row;
                    > * {
                        margin-right: 10px;
                    }
                }
            }
            .model-preview {
                flex-grow: 1;
                border: 1px solid $outwrap-borderline-color;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 18px;
                border-radius: 5px;
                // box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.2);

                .text-window-wrap-in {
                    background-color: rgb(54, 54, 54);
                    padding: 6px;
                    text-align: center;
                }
            }
        }
        .model-list {
            flex-grow: 1;
        }
    }
}
.model-operation {
    display: flex;
    > button {
        margin-right: 8px;
    }
}
</style>
