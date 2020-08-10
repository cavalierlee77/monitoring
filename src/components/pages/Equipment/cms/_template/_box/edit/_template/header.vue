<template>
    <div class="header-inwrap">
        <section class="header-top">
            <div>
                <span class="header-title">{{ title }}</span>
                <span>{{
                    dev.routeLineId +
                        " " +
                        dev.routeLineName +
                        " " +
                        dev.stationInfo
                }}</span>
            </div>
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
</template>

<script>
import { mapState } from "vuex"
export default {
    data() {
        return {}
    },
    props: {
        title: {
            type: String,
            default: () => "情报板"
        }
    },
    methods: {
        handleMenuItemClick() {
            this.$store.commit("setDynamicLink", "list")
        }
    },
    computed: {
        ...mapState({
            dev: state => state.cms.devMap[state.cms.cmsId]
        })
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/Equipment/cms/_css/button.scss";
@import "@pages/Equipment/cms/_css/buttonIcon.scss";
@import "@pages/Equipment/cms/_css/commonStyle.scss";
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
        align-items: center;
        height: 100%;
        > div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            > span {
                display: flex;
                height: 100%;
                align-items: center;
                font-size: 15px;
                color: $header-text-color;
                font-weight: 100;
                margin-left: 10px;
                &.header-title {
                    font-size: 20px;
                    letter-spacing: 2px;
                    color: $frame-text-color;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>
