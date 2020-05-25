<template>
    <div class="select-box">
        <el-select v-model="value1" placeholder="请选择" size="mini">
            <el-option label="item.label" value="item.value"> </el-option>
        </el-select>
        <el-select v-model="value2" placeholder="请选择" size="mini">
            <el-option label="item.label" value="item.value"> </el-option>
        </el-select>
        <el-select v-model="value3" placeholder="请选择" size="mini">
            <el-option label="item.label" value="item.value"> </el-option>
        </el-select>
        <el-select v-model="value4" placeholder="请选择" size="mini">
            <el-option label="item.label" value="item.value"> </el-option>
        </el-select>
        <el-select v-model="value5" placeholder="请选择" size="mini">
            <el-option label="item.label" value="item.value"> </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: ""
        }
    }
}
</script>
<style lang="scss" scoped>
.select-box {
    display: flex;
    justify-content: center;
    > * {
        margin: 0 8px;
    }
}
</style>
