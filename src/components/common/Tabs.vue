<template>
    <div class="">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                :name="item.ename"
                v-for="(item, index) in nowdata"
                :key="index + new Date()"
            >
                <span slot="label"
                    >{{ item.cname }}
                    <span v-if="item.count >= 0">({{ item.count }})</span></span
                >
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: "",
    props: {
        cdata: {
            type: Array,
            default: function() {
                return {}
            }
        }
    },
    data() {
        return {
            activeName: "",
            nowdata: []
        }
    },
    mounted() {
        this.nowdata = this.cdata
        this.nowdata.forEach(item => {
            if (item.active) {
                this.activeName = item.ename
                this.$emit("action", item.ename)
            }
        })
    },
    components: {},
    methods: {
        handleClick(tab, event) {
            this.$emit("action", tab.name)
        }
    },
    watch: {
        cdata: {
            handler(val, oldval) {
                this.nowdata = val
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style scoped></style>
