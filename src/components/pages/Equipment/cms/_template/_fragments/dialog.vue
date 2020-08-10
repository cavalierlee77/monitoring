<template>
    <el-dialog
        :title="dialogInfos.title"
        :visible.sync="dialogVisible"
        :width="dialogInfos.width"
        :before-close="handleClose"
    >
        <dynamic-link :data="data" :type="type" />
    </el-dialog>
</template>
<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            dialogVisible: false,
            type: "",
            data: {}
        }
    },
    computed: {
        ...mapState({
            dialogStatus: state => state.commonTools.dialogStatus,
            dialogType: state => state.commonTools.dialogType,
            dialogData: state => state.commonTools.dialogData,
            dialogInfos: state => state.commonTools.dialogInfos
        })
    },
    components: {
        DynamicLink: () =>
            import(/* webpackChunkName: "cms" */ "./../_dynamiclink")
    },
    methods: {
        changeDialogStatus(val) {
            this.dialogVisible = val
        },
        changeDialogType(val) {
            this.type = val
        },
        changeDialogData(val) {
            this.data = val
        },

        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(_ => {
                    done()
                    this.$store.commit("setDialogStatus", false)
                })
                .catch(_ => {})
        },
        dialogClose() {
            this.$store.commit("setDialogStatus", false)
        }
    },
    watch: {
        dialogStatus: {
            handler(val) {
                this.changeDialogStatus(val)
            },
            immediate: true
        },
        dialogType: {
            handler(val, oldval) {
                this.changeDialogType(val)
            },
            immediate: true
        },
        dialogData: {
            handler(val, oldval) {
                this.changeDialogData(val)
            },
            immediate: true,
            deep: true
        }
    }
}
</script>
