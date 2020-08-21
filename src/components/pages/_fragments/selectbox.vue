<template>
    <section class="select-box">
        <div v-for="(v, k) in SelectList" :key="k">
            <div v-if="checkAbleSeloption(v.titleKey)">
                <span>{{ k }}：</span>
                <div>
                    <input
                        type="checkbox"
                        @click="checkAll(v.titleKey)"
                        :checked="checkedAll[v.titleKey]"
                    />
                    <p>全部</p>
                </div>
                <div v-for="item in v.titleList" :key="item">
                    <input
                        type="checkbox"
                        @click="checkArr(v.titleKey)"
                        v-model="checkedArr[v.titleKey]"
                        :value="item"
                    />
                    <p>{{ item }}</p>
                </div>
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
            checkedArr: {},
            checkedAll: {}
        }
    },
    computed: {
        ...mapState({
            SelectList: state => {
                const devs = state.cms.devInfoList
                const selectDir = state.cms.selectDir
                const selectList = {}
                Object.keys(selectDir).forEach(k => {
                    selectList[k] = []
                })
                const keys = Object.keys(selectList)
                devs.forEach(dev => {
                    keys.forEach(key => {
                        if (selectList[key].includes(dev[key]) === false) {
                            if (dev[key]) {
                                selectList[key].push(dev[key])
                            }
                        }
                    })
                })
                selectList.status.push(...state.cms.statusDesc)
                const selList = {}
                Object.entries(selectDir).forEach(([k, v]) => {
                    selList[v] = { titleList: selectList[k], titleKey: k }
                })
                return selList
            },
            checkList: state => state.cms.checkList,
            listName: state => state.cms.listName,
            otherSelOptions: state => state.cms.statusDesc,
            unableSelOptions: state => state.cms.unableSelOptions
        })
    },
    methods: {
        setCheckList(k) {
            this.$store.commit("setCheckList", {
                [this.listName]: this.checkedArr
            })
        },
        resetAllSelectOption() {
            Object.keys(this.checkedArr).forEach(k => {
                this.checkedArr[k] = []
            })
            Object.keys(this.checkedArr).forEach(k => {
                this.checkedAll[k] = false
            })
        },
        setSelectOptions() {
            Object.entries(this.checkList[this.listName]).forEach(([k, v]) => {
                if (!this.checkedArr[k]) {
                    this.$set(this.checkedArr, k, [])
                }
                this.checkedArr[k].push(...v)
            })
        },
        setBaseCheckList() {
            Object.values(this.SelectList).forEach(v => {
                this.$set(this.checkedArr, v.titleKey, [])
            })
            Object.values(this.SelectList).forEach(v => {
                this.$set(this.checkedAll, v.titleKey, false)
            })
        },
        checkAbleSeloption(k) {
            return !this.unableSelOptions.includes(k)
        },
        checkAll(k) {
            this.checkedAll[k] = !this.checkedAll[k]
            for (const item of Object.values(this.SelectList)) {
                if (item.titleKey === k) {
                    if (this.checkedAll[k]) {
                        this.checkedArr[k] = [...item.titleList]
                    } else {
                        this.checkedArr[k] = []
                    }
                    break
                }
            }
        },
        checkArr(k) {
            setTimeout(() => {
                const _objSelectList = Object.values(this.SelectList)
                for (const osl of _objSelectList) {
                    if (osl.titleKey === k) {
                        if (
                            this.checkedArr[k].length === osl.titleList.length
                        ) {
                            this.checkedAll[k] = true
                        } else if (
                            this.checkedArr[k].length < osl.titleList.length
                        ) {
                            this.checkedAll[k] = false
                        }
                    }
                }
            }, 0)
        }
    },
    mounted() {
        setTimeout(() => {
            this.setBaseCheckList()
            this.setSelectOptions()
        }, 0)
    },
    watch: {
        checkedArr: {
            handler: function() {
                this.setCheckList()
            },
            deep: true
        },
        listName: {
            handler: function(val) {
                this.setBaseCheckList()
                this.setSelectOptions()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/Equipment/cms/_css/button.scss";
@import "@pages/Equipment/cms/_css/buttonIcon.scss";
@import "@pages/Equipment/cms/_css/commonStyle.scss";
.select-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    > div {
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
                margin-right: 36px;
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
                        color: rgb(255, 255, 255);
                        background-color: rgb(62, 145, 212);
                        font-weight: 600;
                        transition: all 400ms ease;
                    }
                }
                > p {
                    border: 1px solid rgba(222, 222, 222, 0);
                    border-radius: 3px;
                    padding: 2px 12px;
                    cursor: pointer;
                }
                &:hover > p {
                    color: rgb(62, 145, 212);
                    font-weight: 600;
                    transition: border-color 400ms ease, color 400ms ease;
                }
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
