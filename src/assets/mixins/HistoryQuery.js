import { mapState } from "vuex"
const QueryMixins = {
    created() {},
    computed: {
        ...mapState({
            nowTab: state => state.history.nowTab,
            queryHei: state =>
                state.history.nowTab
                    ? state.history.hisRelevance[state.history.nowTab].queryHei
                    : state.history.hisRelevance.GreenCar.queryHei
        })
    },
    methods: {
        changeQueryType() {
            this.queryType = !this.queryType
            if (!this.queryType) {
                this.resetQueryData()
                this.$emit("changeHei", 0)
                this.changeQueryTypeFlag.iClass = "el-icon-arrow-down"
                this.changeQueryTypeFlag.iName = "展开"
            } else {
                this.$emit("changeHei", this.queryHei)
                this.changeQueryTypeFlag.iClass = "el-icon-arrow-up"
                this.changeQueryTypeFlag.iName = "收起"
            }
        }
    }
}

export { QueryMixins }
