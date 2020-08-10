import { mapState } from "vuex"
const CheckBoxMixins = {
    data() {
        return {
            selStr: "全部"
        }
    },
    computed: {
        ...mapState({
            checkList: state => state.cms.checkList[state.cms.listName],
            checkListEmpty: state =>
                state.cms.checkListEmpty[state.cms.listName]
        })
    },
    components: {
        SelectBox: () =>
            import(
                /* webpackChunkName: "cms" */ "@pages/_fragments/selectbox.vue"
            )
    },
    methods: {
        remixCheckList() {
            if (!this.checkListEmpty) {
                let _selStr = ""
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
                this.selStr = "全部"
            } else {
                this.remixCheckList()
            }
        }
    },
    watch: {
        checkList: {
            handler() {
                this.remixCheckList()
            },
            deep: true
        },
        checkListEmpty: {
            handler() {
                this.resetDevList()
            },
            immediate: true
        }
    }
}
export { CheckBoxMixins }
