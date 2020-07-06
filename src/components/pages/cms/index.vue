<template>
    <div class="cms-wrap">
        <dynamic-link></dynamic-link>
    </div>
</template>

<script>
export default {
    components: {
        DynamicLink: () =>
            import(
                /* webpackChunkName: "cms" */ "./../cms/_template/_dynamiclink"
            )
    },
    data() {
        return {
            // type: "list"
        }
    },
    created() {
        this.$store.commit("setDynamicLink", "list")
    },
    beforeDestroy() {
        // 页面销毁时,断开连接
        console.log("页面销毁，断开websocket连接")
        this.$disconnect()
    }
}
</script>
<style lang="scss" scoped>
$outwrap-borderline-color: #ddd;
.cms-wrap {
    margin: 8px;
    border: 1px solid $outwrap-borderline-color;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    overflow: hidden;
}
</style>
