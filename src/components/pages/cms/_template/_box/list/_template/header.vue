<template>
    <div class="header-inwrap">
        <section class="header-top">
            <span>{{ title }}</span>
            <div class="header-infos">
                <span
                    >总数：<span>{{ devCount }}</span></span
                >
                <span>故障：<span>0</span></span>
                <el-popover placement="bottom" trigger="click">
                    <button
                        slot="reference"
                        class="p-button"
                        type="round"
                        size="mini"
                    >
                        <i class="el-icon-setting"></i>
                        <span>设置</span>
                    </button>
                    <p @click="handleMenuItemClick">模板管理</p>
                </el-popover>
            </div>
        </section>
        <section class="header-bottom">
            <div class="btn-wrap">
                <button class="p-button" type="round" size="mini">
                    <i class="el-icon-star-on"></i>
                    <span>关注</span>
                </button>
                <button class="p-button" type="round" size="mini">
                    <i class="icon-custom icon-new"></i>
                    <span>最新发布</span>
                </button>
                <button class="p-button" type="round" size="mini">
                    <i class="el-icon-warning-outline"></i>
                    <span>故障</span>
                </button>
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
            </div>
            <div class="query-wrap" type="round" size="mini">
                <i class="icon-custom icon-query"></i>
                <input type="text" placeholder="请输入搜索内容" />
            </div>
        </section>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    name: "",
    data() {
        return {}
    },
    computed: {
        ...mapState({
            title: state => state.cms.title,
            devCount: state => state.cms.devCount
            // cmsList: state => state.cms.
        })
    },
    components: {
        SelectBox: () =>
            import(
                /* webpackChunkName: "cms" */ "@pages/cms/_template/_fragments/selectbox.vue"
            )
    },
    methods: {
        handleMenuItemClick(key, keyPath) {
            this.$store.commit("setDynamicLink", "model")
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/cms/_css/button.scss";
@import "@pages/cms/_css/buttonIcon.scss";
@import "@pages/cms/_css/query.scss";

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
            color: #07dbdb;
            font-weight: 100;
        }

        .header-infos {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            line-height: 24px;

            > span,
            p {
                margin-left: 12px;
                font-size: 12px;
                color: #9a9a9a;

                > span {
                    font-size: 16px;
                    color: #333;
                }
            }
        }
    }
    section.header-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .btn-wrap {
            display: flex;
            flex-direction: row;
            > * {
                margin-right: 8px;
            }
        }
    }
}
</style>
