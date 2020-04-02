<template>
<div class="echarts-arrow-wraper">
    <i class="el-icon-caret-top" v-if="arrowdata == 1"></i>
    <i class="el-icon-minus" v-if="arrowdata == 4"></i>
    <i class="el-icon-caret-bottom" v-if="arrowdata== 2"></i>
</div>
</template>
<!-- 1-up,2-down,4-keep -->
<script> 
export default {
    props: {
        arrowdata: {
            type: Number,
            default: function() {
                return {

                }
            }
        },
    },
    data () {
        return {
           
      }
    },
    mounted(){
    },
    methods: {
    }
};
</script>

<style scoped>
.el-icon-caret-top {
    color: #d81e06;
}
.el-icon-caret-bottom {
    color: #1afa29;
}
</style>
