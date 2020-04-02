<template>
    <el-popover
        ref="popover"
        placement="bottom"
        :width="poprverwidth"
        trigger="manual"
        v-model="isvisible">
        <div  @click="close" style="text-align: right; margin: 0; padding-bottom: 10px; cursor: pointer;">
            <i class="el-icon-close" style="font-size: 20px;"></i>
        </div>
        <slot name="resultdata"></slot>
        <slot name="rf" slot="reference">
        </slot>
    </el-popover>
</template>

<script>
export default {
    name: '',
    props: {
        visible: {
            type: Boolean,
            default:function () {
                return {}
            }
        },
        poprverwidth: {
            type: Number,
            default:function () {
                return 500
            }
        }
    },
    data() {
        return {
            isvisible: false
        }
    },
    components: {},
    methods: {
        close(){
            this.$emit('action');
        }
    },
    watch: {
        visible(val){
            this.isvisible = val;
        }
    }
}
</script>

<style scoped>
</style>
