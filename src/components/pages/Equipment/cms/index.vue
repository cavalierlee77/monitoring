<template>
    <div class="cms-wrap">
        <dynamic-link></dynamic-link>
    </div>
</template>

<script>
import { ConnectWebSocket } from "@/assets/mixins/ConnectWebSocket.js"
export default {
    name: "",
    mixins: [ConnectWebSocket],
    components: {
        DynamicLink: () =>
            import(/* webpackChunkName: "cms" */ "./_template/_dynamiclink")
    },
    created() {
        this.$store.commit("setTillNowPage", "cms")
        let dynamicLink = "list"
        if (
            this.$route.query.path &&
            typeof this.$route.query.path === "string"
        ) {
            dynamicLink = this.$route.query.path
        }
        this.$store.commit("setDynamicLink", dynamicLink)
    }
}
</script>
<style lang="scss" scoped>
$outwrap-borderline-color: #ddd;
.cms-wrap {
    overflow: hidden;
}
</style>
