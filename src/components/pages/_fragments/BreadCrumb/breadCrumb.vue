<template>
    <div>
        <slot></slot>
        {{ separator }}
    </div>
</template>

<script>
export default {
    components: {
        BreadItem: () => import(/* webpackChunkName:'cms' */ "./breadCrumbItem")
    },
    data() {
        return {}
    },
    props: {
        separator: {
            type: String
        }
    },
    computed: {},
    watch: {},
    methods: {}
}
</script>
<style lang="scss" scoped></style>
