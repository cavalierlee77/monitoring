<template>
    <div class="cms-result-box">
        <header class="cms-result-box-header">
            <span>发布状态</span
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
        <div class="cms-result-wrap" :style="{ height: listHeight }">
            <div class="cms-result-statistics">
                <div>
                    <span>总发布数</span>
                    <p>{{ sendHistory.length }}块</p>
                </div>
                <div>
                    <span>发布成功</span>
                    <p>{{ successCount }}块</p>
                </div>
                <div v-if="failureCount !== 0">
                    <span>发送失败</span>
                    <p>{{ failureCount }}块</p>
                </div>
            </div>
            <div class="cms-result-list">
                <el-table
                    :data="sendHistory"
                    tooltip-effect="dark"
                    ref="multipleTable"
                >
                    <el-table-column property="cmsName" label="位置">
                    </el-table-column>
                    <el-table-column
                        property="processStatus"
                        label="状态"
                        width="240"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            newCmslist: [],
            statusList: [],
            listHeight: ""
        }
    },
    computed: {
        ...mapState({
            sendHistory: state => state.cms.sendHistory,
            successCount: state => state.cms.successIds.length,
            failureCount: state => state.cms.failureIds.length
        })
    },
    components: {},
    mounted() {
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
    },
    methods: {
        handleMenuItemClick() {
            this.$store.commit("setEditDynamicLink", "EditBox")
        }
    },
    watch: {}
}
</script>
<style lang="scss" scoped>
@import "@pages/Equipment/cms/_css/button.scss";
@import "@pages/Equipment/cms/_css/buttonIcon.scss";
@import "@pages/Equipment/cms/_css/commonStyle.scss";
.cms-result-box {
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
    > div.cms-result-wrap {
        display: flex;
        flex-direction: column;
        // height: 700px;
        .cms-result-statistics {
            height: 120px;
            width: auto;
            padding: 0 32px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            > div {
                display: flex;
                flex-direction: column;
                align-items: center;
                span {
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 14px;
                    margin-bottom: 8px;
                }
                p {
                    color: rgba(0, 0, 0, 0.85);
                    font-size: 24px;
                }
            }
        }
        .cms-result-list {
            overflow-y: auto;
            flex-grow: 1;
            padding: 0 16px;
        }
    }
}
</style>
