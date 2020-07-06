<template>
    <div class="cms-edit-aside-outwrap">
        <header>
            <query-box></query-box>
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
        </header>
        <section :style="{ height: secHei - 80 - 24 + 'px' }">
            <p
                v-for="(dev, index) in devList"
                :key="index"
                :class="{
                    checked:
                        dev.orgId === ids.orgId && dev.deviceId === ids.deviceId
                }"
                @click="changeDev(dev)"
            >
                {{ dev.roadName }} {{ dev.stationInfo }}
            </p>
        </section>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    components: {
        SelectBox: () =>
            import(
                /* webpackChunkName: "cms" */ "@pages/cms/_template/_fragments/selectbox.vue"
            ),
        QueryBox: () =>
            import(
                /* webpackChunkName: "cms" */ "@pages/cms/_template/_fragments/querybox.vue"
            )
    },
    data() {
        return {
            ids: { deviceId: "", orgId: "" },
            devList: [],
            selStr: "全部"
        }
    },
    props: {
        secHei: {
            type: Number,
            default: () => 400
        }
    },
    computed: {
        ...mapState({
            cmsId: state => state.cms.cmsId,
            devInfoList: state => state.cms.devInfoList,
            checkList: state => state.cms.checkList,
            checkListEmpty: state => state.cms.checkListEmpty
        })
    },
    mounted() {
        this.resetDevList()
    },
    methods: {
        getIds(str) {
            const ids = str.split("×")
            this.ids.orgId = parseInt(ids[0])
            this.ids.deviceId = parseInt(ids[1])
        },
        changeDev(dev) {
            const cmsId = dev.orgId + "×" + dev.deviceId
            this.$store.commit("setCmsId", cmsId)
        },
        remixCheckList() {
            if (!this.checkListEmpty) {
                const _devList = [...this.devInfoList]
                let _selStr = ""
                this.devList = _devList.filter(dev => {
                    let f = true
                    Object.entries(this.checkList).forEach(([k, v]) => {
                        f = f && v.includes(dev[k])
                    })
                    if (f) {
                        return dev
                    }
                })
                Object.entries(this.checkList).forEach(([k, v], index) => {
                    if (v.length > 1) {
                        _selStr += "("
                    }
                    v.forEach((val, ind) => {
                        _selStr += val
                        if (parseInt(ind) + 1 < v.length) {
                            _selStr += ","
                        }
                    })
                    if (v.length > 1) {
                        _selStr += ")"
                    }
                    if (
                        parseInt(index) + 1 <
                        Object.entries(this.checkList).length
                    ) {
                        _selStr += " - "
                    }
                })
                this.selStr = _selStr
            }
        },
        resetDevList() {
            if (this.checkListEmpty) {
                this.devList = [...this.devInfoList]
                this.selStr = "全部"
            } else {
                this.remixCheckList()
            }
        }
    },
    watch: {
        cmsId: {
            handler(val) {
                this.getIds(val)
            },
            immediate: true
        },
        checkList: {
            handler(val) {
                this.remixCheckList()
            },
            deep: true
        },
        checkListEmpty: {
            handler(val) {
                this.resetDevList()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/cms/_css/button.scss";
@import "@pages/cms/_css/buttonIcon.scss";
@import "@pages/cms/_css/commonStyle.scss";
.cms-edit-aside-outwrap {
    header {
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        > * {
            margin: 0 12px;
        }
    }
    section {
        position: relative;
        padding: 12px;
        overflow-y: auto;
        p {
            font-size: 14px;

            line-height: 22px;
            cursor: pointer;
            @media screen and (max-width: 1660px) {
                height: auto;
            }
            @media screen and (min-width: 1660px) {
                height: 22px;
            }
            &:hover {
                font-size: 15px;
                font-weight: 600;
                transition: all $transition-time ease;
                color: rgba($hc-r, $hc-g, $hc-b, 1);
            }
            &.checked {
                font-weight: 600;
                color: rgba($hc-r, $hc-g, $hc-b, 1);
            }
        }
    }
}
</style>
