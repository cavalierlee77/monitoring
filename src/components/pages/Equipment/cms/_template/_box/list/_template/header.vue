<template>
    <div class="header-inwrap">
        <section class="header-top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>情报板管理</el-breadcrumb-item>
                <el-breadcrumb-item>播放表展示</el-breadcrumb-item>
            </el-breadcrumb>
        </section>
        <section class="header-middle">
            <span v-on:mouseover="showSettings" v-on:mouseout="hideSettings">{{
                title
            }}</span>
            <div class="header-infos" v-if="settings">
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
                    <p @click="CheckCmsFn">{{ CheckCmsTitle }}</p>
                </el-popover>
            </div>
        </section>
        <section class="header-bottom">
            <div class="btn-wrap">
                <!-- <button class="p-button" type="round" size="mini">
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
                </button> -->
                <el-popover placement="bottom" width="800" trigger="click">
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
            <query-box
                :width="400"
                :resultArr="resultArr"
                @pressKeyFn="pressKeyFn"
            ></query-box>
        </section>
    </div>
</template>
<script>
import { mapState } from "vuex"
import { CheckBoxMixins } from "@/assets/mixins/CheckBox.js"
import { CheckCmsMixins } from "@/assets/mixins/settings-CheckCms.js"
export default {
    name: "",
    data() {
        return {
            resultArr: [],
            settings: false,
            settingsTimeout: ""
        }
    },
    mixins: [CheckBoxMixins, CheckCmsMixins],
    computed: {
        ...mapState({
            title: state => state.cms.title,
            devCount: state => state.cms.devCount,
            errorDev: state => state.cms.errorDev,
            devInfoList: state => state.cms.devInfoList
        })
    },
    components: {
        QueryBox: () =>
            import(
                /* webpackChunkName: "cms" */ "@pages/_fragments/querybox.vue"
            )
    },
    methods: {
        showSettings() {
            this.settingsTimeout = setTimeout(() => {
                this.settings = true
            }, 10000)
        },
        hideSettings() {
            clearTimeout(this.settingsTimeout)
        },
        handleMenuItemClick(key, keyPath) {
            this.$store.commit("setDynamicLink", "model")
        },
        pressKeyFn(res) {
            const type = typeof res
            if (type === "object") {
                Object.entries(res).forEach(([k, v]) => {
                    if (k === "clickList") {
                        this.clickList(v)
                    }
                })
            }
            if (type === "string") {
                this.selectFunc(res)
            }
        },
        clickList(dev) {
            this.$store.commit("setCmsId", dev.id)
            this.$store.commit("setDynamicLink", "detail")
        },
        selectFunc(str) {
            this.resultArr = []
            if (str !== "") {
                this.resultArr = []
                this.devInfoList.forEach(dev => {
                    if (dev.deviceName.includes(str)) {
                        this.resultArr.push({
                            show: dev.deviceName,
                            id: dev.mapId
                        })
                    }
                })
            }
        }
    },
    watch: {}
}
</script>
<style lang="scss" scoped>
@import "@pages/Equipment/cms/_css/button.scss";
@import "@pages/Equipment/cms/_css/buttonIcon.scss";
@import "@pages/Equipment/cms/_css/commonStyle.scss";
@import "@pages/Equipment/cms/_css/query.scss";

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
    }
    section.header-middle {
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
