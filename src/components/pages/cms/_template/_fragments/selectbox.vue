<template>
    <section class="select-box">
        <div v-for="(v, k) in SelectList" :key="k">
            <span>{{ k }}</span>
            <div v-for="item in v.titleList" :key="item">
                <input
                    type="checkbox"
                    v-model="checkedArr[v.titleKey]"
                    :value="item"
                />
                <p>
                    {{ item }}
                </p>
            </div>
        </div>
        <p class="reset-wrap">
            <button
                class="p-button p-delete"
                type="round"
                size="mini"
                @click="resetAllSelectOption"
            >
                <i class="icon-custom icon-reset"></i>
                <span>全部重置</span>
            </button>
        </p>
    </section>
</template>
<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            checkedArr: {
                roadName: [],
                routeLineName: [],
                devicePositionDesc: [],
                deviceDirectDesc: [],
                cmsTypeDesc: []
            }
        }
    },
    computed: {
        ...mapState({
            SelectList: state => {
                const devs = state.cms.devInfoList
                const selectDir = {
                    roadName: "路线",
                    routeLineName: "路段",
                    devicePositionDesc: "位置",
                    deviceDirectDesc: "方向",
                    cmsTypeDesc: "类型"
                }
                const selectList = {}
                Object.keys(selectDir).forEach(sel => {
                    selectList[sel] = []
                })
                const keys = Object.keys(selectList)
                devs.forEach(dev => {
                    keys.forEach(key => {
                        if (selectList[key].includes(dev[key]) === false) {
                            selectList[key].push(dev[key])
                        }
                    })
                })
                const selList = {}
                Object.entries(selectDir).forEach(([k, v]) => {
                    selList[v] = { titleList: selectList[k], titleKey: k }
                })
                return selList
            }
        })
    },
    methods: {
        setCheckList() {
            this.$store.commit("setCheckList", this.checkedArr)
        },
        resetAllSelectOption() {
            this.checkedArr = {
                roadName: [],
                routeLineName: [],
                devicePositionDesc: [],
                deviceDirectDesc: [],
                cmsTypeDesc: []
            }
        }
    },
    watch: {
        checkedArr: {
            handler: function() {
                this.setCheckList()
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/cms/_css/button.scss";
@import "@pages/cms/_css/buttonIcon.scss";
@import "@pages/cms/_css/commonStyle.scss";
.select-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    > div {
        display: flex;
        align-items: center;
        height: 40px;
        > * {
            margin-right: 16px;
        }
        span {
            display: block;
            position: relative;
            width: 100px;
            text-align: right;
            color: rgb(62, 145, 212);
            font-size: 15px;
        }
        > div {
            position: relative;
            input {
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
                &:checked ~ p {
                    border-color: rgb(62, 145, 212);
                    color: rgb(62, 145, 212);
                    font-weight: 600;
                }
            }
            > p {
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 2px 12px;
            }
            &:hover > p {
                border-color: rgb(62, 145, 212);
                color: rgb(62, 145, 212);
                font-weight: 600;
                transition: border-color 400ms ease, color 400ms ease;
            }
        }
    }
    .reset-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 84px;
    }
}
</style>
