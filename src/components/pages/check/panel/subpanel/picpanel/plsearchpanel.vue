<template>
<div>
    <el-col :span="6">
        <div class="item_list">
            <label for="">查验车牌</label>
            <el-input 
            v-model="plateNumber"  
            suffix-icon="el-icon-edit"
            ></el-input>
        </div>
    </el-col>
    <el-col :span="6">
        <div class="item_list">
            <label for="">收费车牌</label>
            <el-input 
            v-model="tollPlateNumber"  
            suffix-icon="el-icon-edit"
            @keyup.enter.native="action"></el-input>
        </div>
    </el-col>
</div>
</template>

<script>
export default {
    name: '',
    props: {
        checkdata: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {
            plateNumber: '',
            tollPlateNumber: ''
        }
    },
    components: {

    },
    methods: {
        action(query){
            this.$emit('action', query.target.value)
        }
    },
    watch: {
        checkdata:{
            handler(val, oldval) {
                this.plateNumber = val.plateNumber || '';
                this.tollPlateNumber = val.tollPlateNumber || '';
            },
            immediate: true,
            deep:true
        },
        plateNumber(val){
            this.$emit('resetPlateNumber', {
                plateNumber: val,
                tollPlateNumber: val
            })
            this.tollPlateNumber = val;
        },
        tollPlateNumber(val){
            this.$emit('resetPlateNumber', {
                plateNumber: this.plateNumber,
                tollPlateNumber: val
            })
        }
    }
}
</script>

<style scoped>
.item_list {
    padding: 10px 0px 10px 0px;
    display: flex;
    justify-content: flex-start;
    align-items:center;
}
.item_list label{
    position: relative;
    display: inline-block;
    width: 120px;
    text-align: left;
    padding-left: 20px;
}
.item_list .el-select {
    width: 100%;
}
</style>
