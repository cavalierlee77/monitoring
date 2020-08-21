<template>
    <div class="cms-frame">
        <section v-for="(area, index) in cmsGroupList" :key="index">
            <header>
                <span>{{ area.title }}</span>
            </header>
            <div class="wrap-cms">
                <cms-window
                    v-for="(mid, index) in area.list"
                    :key="index"
                    :cmsId="mid"
                ></cms-window>
            </div>
        </section>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    // created() {
    //     if (window.localStorage.getItem("list")) {
    //         console.log(JSON.parse(window.localStorage.getItem("list")))
    //         this.$store.replaceState(
    //             Object.assign(
    //                 {},
    //                 this.$store.state,
    //                 JSON.parse(window.localStorage.getItem("list"))
    //             )
    //         )
    //     }
    //     window.addEventListener("beforeunload", () => {
    //         window.localStorage.setItem(
    //             "list",
    //             JSON.stringify(this.$store.state)
    //         )
    //     })
    // },
    data() {
        return {
            lastlist: [],
            dialogStatus: false,
            cmsGroupList: [],
            selStatusList: [],
            goingTodo: "remixCmsGroupList"
        }
    },
    computed: {
        ...mapState({
            cmsList: state => state.cms.cmsList,
            devInfoList: state => state.cms.devInfoList,
            devMap: state => state.cms.devMap,
            cmsMap: state => state.cms.cmsMap,
            statusMap: state => state.cms.statusMap,
            statusDescMap: state => state.cms.statusDescMap,
            checkList: state => state.cms.checkList[state.cms.listName],
            checkListEmpty: state =>
                state.cms.checkListEmpty[state.cms.listName],
            listName: state => state.cms.listName
        })
    },
    components: {
        CmsWindow: () =>
            import(/* webpackchunkName: "cms" */ "@pages/_fragments/cms")
    },
    methods: {
        remixCmsGroupList(...types) {
            this.selStatusList = []
            this.cmsGroupList = []
            types.push("roadName")
            this.devInfoList.forEach(cms => {
                if (
                    (this.statusDescMap[cms.mapId] &&
                        this.selStatusList.includes(
                            this.statusDescMap[cms.mapId].desc
                        )) ||
                    this.selStatusList.length === 0
                ) {
                    let i = 0
                    const l = this.cmsGroupList.length
                    for (; i < l; i++) {
                        if (this.cmsGroupList[i].title === cms.roadName) {
                            if (
                                !this.cmsGroupList[i].list.includes(cms.mapId)
                            ) {
                                this.cmsGroupList[i].list.push(cms.mapId)
                                break
                            }
                        }
                    }
                    if (i === l) {
                        this.cmsGroupList.push({
                            title: cms.roadName,
                            list: [cms.mapId]
                        })
                    }
                }
            })
        },
        remixCheckList() {
            const checkList = this.checkList
            let _statusStr = ""
            if (checkList.status) {
                this.selStatusList = [...checkList.status]
                delete checkList.status
                this.selStatusList.forEach(str => {
                    _statusStr += str
                })
                if (this.selStatusList.length > 1) {
                    _statusStr = "(" + _statusStr + ")"
                }
            } else {
                this.selStatusList = []
            }
            const _devList = [...this.devInfoList]
            let _selStr = ""
            let _newDevList = []
            _newDevList = _devList
                .filter(dev => {
                    let f = true
                    Object.entries(checkList).forEach(([k, v]) => {
                        f = f && v.includes(dev[k])
                    })
                    if (f) {
                        return dev
                    }
                })
                .map(dev => dev.mapId)
            Object.entries(checkList).forEach(([k, v], index) => {
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
                if (parseInt(index) + 1 < Object.entries(checkList).length) {
                    _selStr += " - "
                }
            })
            if (_statusStr !== "") {
                _selStr += " - "
            }
            _selStr += _statusStr
            if (
                _newDevList &&
                _newDevList.length > 0 &&
                this.selStatusList.length > 0
            ) {
                _newDevList = this.remixCheckListByStatus(_newDevList)
            }
            this.selStr = _selStr
            this.cmsGroupList = []
            this.cmsGroupList.push({
                title: _selStr,
                list: [..._newDevList]
            })
        },
        remixCheckListByStatus(list) {
            const filterList = []
            list.forEach(dev => {
                if (this.statusDescMap[dev]) {
                    if (
                        this.selStatusList.includes(
                            this.statusDescMap[dev].desc
                        )
                    ) {
                        filterList.push(dev)
                    }
                }
            })
            return filterList
        },
        buildList(val = false, oldVal = undefined, todo = false) {
            if (!todo) {
                if (
                    !this.checkListEmpty &&
                    typeof this.checkListEmpty !== "undefined"
                ) {
                    this.goingTodo = "remixCheckList"
                }
                if (val === true && typeof oldVal !== "undefined") {
                    this.goingTodo = "remixCmsGroupList"
                }
            }
            if (this.devInfoList.length > 0) {
                this[this.goingTodo]()
            }
        }
    },
    watch: {
        cmsList: {
            handler(val) {
                this.buildList()
            },
            deep: true
        },
        checkList: {
            handler(val) {
                this.buildList()
            },
            immediate: true,
            deep: true
        },
        checkListEmpty: {
            handler(val, oldVal) {
                if (val === true) {
                    this.buildList(val, oldVal)
                }
            }
        },
        devInfoList: {
            handler(val) {
                if (val.length > 0) {
                    this.buildList(false, undefined, true)
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
$section-header-height: 36px;
$btc-r: 7;
$btc-g: 219;
$btc-b: 219;
.cms-frame {
    padding: 16px 24px 24px;
    background-color: #fff;
    border-radius: 5px;
    > header {
        border-bottom: 1px solid #ddd;
        height: 32px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .btns {
            width: 30px;
            .frame-btn {
                font-size: 30px;
                padding-top: 0;
            }
        }
    }
    .wrap-cms {
        display: flex;
        flex-wrap: wrap;
    }
    section {
        header {
            height: $section-header-height;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            span {
                display: block;
                height: 18px;
                line-height: 2px;
                font-size: 18px;
                color: rgba($btc-r, $btc-g, $btc-b, 0.7);
                padding: 0 8px;
                border: 10px solid rgba(255, 255, 255, 0);
                border-left-color: rgba($btc-r, $btc-g, $btc-b, 0.5);
                box-sizing: border-box;
                text-shadow: -1px 1px 2px rgba(0, 0, 0, 0.3);
            }
        }
    }
}
</style>
