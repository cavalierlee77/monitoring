<template>
    <component :is="component" :data="data" v-if="component" />
</template>
<script>
export default {
    name: "dynamic-link",
    props: ["data", "type"],
    data() {
        return {
            component: null
        }
    },
    computed: {
        loader() {
            if (!this.type) {
                return null
            }
            return () => import(`./_template/${this.type}`)
        }
    },
    methods: {
        reloader() {
            this.loader()
                .then(() => {
                    this.component = () => this.loader()
                })
                .catch(() => {
                    this.component = () => import("./_template/default")
                })
        }
    },
    mounted() {
        this.reloader()
    },
    watch: {
        type: {
            handler(val) {
                this.reloader()
            }
        }
    }
}
</script>
