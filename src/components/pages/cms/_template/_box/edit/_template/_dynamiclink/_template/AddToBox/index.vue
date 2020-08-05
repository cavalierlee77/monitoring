<template>
    <div class="cms-add-to-box">
        <header class="cms-add-to-box-header">
            <span>选择情报板</span
            ><button
                class="p-button"
                type="round"
                size="mini"
                @click="handleMenuItemClick"
            >
                <i class="el-icon-back"></i>
                <span>返回</span>
            </button>
        </header>
        <div class="cms-add-to-wrap" :style="{ height: listHeight }">
            <div class="cms-add-to-checkbox">
                <el-popover placement="left" width="800" trigger="click">
                    <button
                        slot="reference"
                        class="p-button"
                        type="round"
                        size="mini"
                    >
                        <i class="icon-custom icon-screen"></i>
                        <span>{{ selStr }}</span>
                    </button>
                    <select-box></select-box>
                </el-popover>
            </div>
            <div class="cms-add-to-list">
                <el-table
                    :data="newCmslist"
                    @selection-change="handleSelectionChange"
                    tooltip-effect="dark"
                    ref="multipleTable"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                        :selectable="checkSelectable"
                    >
                    </el-table-column>
                    <el-table-column property="deviceName" label="位置">
                    </el-table-column>
                    <el-table-column
                        property="deviceStatue"
                        label="状态"
                        width="100"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import { CheckBoxMixins } from "@/assets/mixins/CheckBox.js"
export default {
    data() {
        return {
            newCmslist: [],
            statusList: [],
            listHeight: "",
            multipleSelection: [],
            selStatusList: []
        }
    },
    mixins: [CheckBoxMixins],
    computed: {
        ...mapState({
            cmsId: state => state.cms.cmsId,
            devInfoList: state => state.cms.devInfoList,
            pageData: state => state.cms.devMap[state.cms.cmsId],
            statusMap: state => state.cms.statusMap,
            multipleSelectionX: state => state.cms.multipleSelectionX,
            statusDescMap: state => state.cms.statusDescMap,
            checkList: state => state.cms.checkList[state.cms.listName],
            checkListEmpty: state =>
                state.cms.checkListEmpty[state.cms.listName],
            listName: state => state.cms.listName
        })
    },
    components: {},
    mounted() {
        this.$store.commit("clearByCheckName", "edit")
        this.$store.commit("setCheckName", "edit")
        const clientHeight = `${document.documentElement.clientHeight}`
        const headerHeight = document.querySelector(".el-header").style.height
        this.listHeight =
            parseFloat(clientHeight) -
            parseFloat(headerHeight) -
            79 -
            24 -
            24 -
            55 +
            "px"
        this.toggleSelection()
    },
    methods: {
        toggleSelection() {
            const rows = [...this.multipleSelectionX]
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(
                    this.newCmslist[row.index]
                )
            })
        },
        checkSelectable(k, i) {
            if (k.deviceStatue === "离线" || k.deviceStatue === "获取中") {
                return false
            }
            return true
        },
        handleMenuItemClick() {
            this.$store.commit("setEditDynamicLink", "EditBox")
        },
        setModelList() {
            this.newCmslist = []
            const list = [...this.devInfoList]
            let listCount = 0
            list.forEach(dev => {
                if (dev.cmsSizeDesc === this.pageData.cmsSizeDesc) {
                    if (
                        dev.orgId !== this.pageData.orgId ||
                        dev.deviceId !== this.pageData.deviceId
                    ) {
                        const _status = this.statusDescMap[dev.mapId]
                        let _status_desc = ""
                        if (_status) {
                            _status_desc = _status.desc
                        } else {
                            _status_desc = "获取中"
                        }
                        this.newCmslist.push({
                            deviceName: dev.deviceName,
                            deviceStatue: _status_desc,
                            data: dev,
                            index: listCount,
                            mapId: dev.mapId
                        })
                        listCount++
                    }
                }
            })
            this.setModelListByChecked()
        },
        setModelListByChecked() {
            const checkList = this.checkList
            if (checkList.status) {
                this.selStatusList = [...checkList.status]
                delete checkList.status
            }
            if (this.checkListEmpty) {
                return
            }
            const _devList = [...this.newCmslist]
            let _newDevList = []
            _newDevList = _devList.filter(dev => {
                let f = true
                Object.entries(checkList).forEach(([k, v]) => {
                    f = f && v.includes(dev.data[k])
                })
                if (f) {
                    return dev
                }
            })
            if (
                _newDevList &&
                _newDevList.length > 0 &&
                this.selStatusList.length > 0
            ) {
                _newDevList = this.remixCheckListByStatus(_newDevList)
            }
            this.newCmslist = [..._newDevList]
        },
        remixCheckListByStatus(list) {
            let filterList = []
            filterList = this.newCmslist.filter(dev => {
                const f = this.selStatusList.includes(dev.deviceStatue)
                if (f) {
                    return dev
                }
            })
            return filterList
        },
        updateStatus() {
            const pool = Object.keys(this.statusDescMap)
            // let selStrPart = ""
            // if (this.selStr.length > 0) {
            //     selStrPart = " - "
            // }
            // this.selStr += selStrPart
            // let statusStr = ""
            // pool.forEach((str, index) => {
            //     statusStr += str
            //     if (index < pool.length - 1) {
            //         statusStr += ","
            //     }
            // })
            // if (pool.length > 1) {
            //     statusStr = "(" + statusStr + ")"
            // }
            // this.selStr += statusStr
            this.selStr = this.newCmslist.forEach(dev => {
                if (pool.includes(dev.mapId)) {
                    this.$set(
                        dev,
                        "deviceStatue",
                        this.statusDescMap[dev.mapId].desc
                    )
                }
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            this.$store.commit("setMultipleSelection", this.multipleSelection)
        }
    },
    watch: {
        cmsId: {
            handler(val) {
                this.setModelList()
            },
            immediate: true
        },
        statusDescMap: {
            handler() {
                this.updateStatus()
            },
            deep: true
        },
        checkList: {
            handler() {
                this.setModelList()
            },
            deep: true
        },
        checkListEmpty: {
            handler(val) {
                if (val === true) {
                    this.setModelList()
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/cms/_css/button.scss";
@import "@pages/cms/_css/buttonIcon.scss";
@import "@pages/cms/_css/commonStyle.scss";
.cms-add-to-box {
    position: relative;
    width: 566px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0);
    header {
        height: 54px;
        width: auto;
        background-color: rgba(255, 255, 255, 0);
        border-bottom: 1px solid rgba(222, 222, 222, 1);
        font-size: 16px;
        line-height: 54px;
        color: $frame-text-color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 32px;
    }
    > div.cms-add-to-wrap {
        display: flex;
        flex-direction: column;
        // height: 700px;
        .cms-add-to-checkbox {
            height: 48px;
            width: auto;
            padding: 0 32px;
            display: flex;
            align-items: center;
        }
        .cms-add-to-list {
            overflow-y: auto;
            flex-grow: 1;
            padding: 0 16px;
        }
    }
}
</style>
