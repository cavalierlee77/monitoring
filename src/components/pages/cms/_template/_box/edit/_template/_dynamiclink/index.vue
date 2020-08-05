<template>
    <div class="component-wrap">
        <component :is="component" v-if="component" />
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    name: "edit-dynamic-link",
    data() {
        return {
            component: null
        }
    },
    computed: {
        ...mapState({
            editDynamicUrl: state => state.cms.editDynamicUrl
        }),
        loader() {
            if (!this.editDynamicUrl) {
                return null
            }
            return () => import(`./_template/${this.editDynamicUrl}`)
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
        editDynamicUrl: {
            handler(val) {
                this.reloader()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.component-wrap {
    width: 566px;
    margin-left: 24px;
    // border-top-right-radius: 5px;
    // border-bottom-right-radius: 5px;
    border-radius: 5px;
    // overflow: hidden;
    background-color: #fff;
}
</style>
