<template>
    <component :is="component" v-if="component" />
</template>
<script>
import { mapState } from "vuex"
export default {
    name: "dynamic-link",
    data() {
        return {
            component: null
        }
    },
    computed: {
        ...mapState({
            dynamicUrl: state => state.cms.dynamicUrl
        }),
        loader() {
            if (!this.dynamicUrl) {
                return null
            }
            return () => import(`./../_box/${this.dynamicUrl}`)
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
        dynamicUrl: {
            handler(val) {
                this.reloader()
            }
        }
    }
}
</script>
