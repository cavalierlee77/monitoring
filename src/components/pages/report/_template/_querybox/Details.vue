<template>
    <section>
        <div class='wrapper'>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedTypes" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="types in boxTypes" :label="types" :key="types.val" :value='types.val'>{{types.name}}</el-checkbox>
            </el-checkbox-group>
            <el-row class='Exc-special-wrap'>
                <el-col :span='24'>
                    <b>绿通车辆货物定向筛选</b>
                </el-col>
                <el-col :span="24">
                    <el-checkbox-group v-model="specialTypes">
                        <el-checkbox v-for="types in specialType" :label="types" :key="types.val" :value='types.val'>{{types.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class='Exc-btn-wrap'>
                    <el-button type="primary" plain icon="el-icon-search" v-on:click="exportExcel" class='Exc-btn'>确认并导出</el-button>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'iDetail',
    props: {
        detTitle: {
            type: String,
            default: function(){

            }
        }
    },
    data() {
        return {
            checkAll: false,
            checkedTypes: [],
            specialTypes: [],
            boxTypes: [],
            isIndeterminate: true,
            specialType: [
                {name: '家畜肉和家禽肉', val: '家畜肉和家禽肉'}
            ]
        }
    },
    components: {
        
    },
    mounted() {
        this.setInputData();
    },
    computed: {
        ...mapState({
            typeOptions: state => {
                let _data = state.report.repRelevance;
                return Object.keys(_data).map((key) => {
                    return {
                        name: _data[key].cnName, 
                        val: key
                    }
                });
            },
        })
    },
    methods: {
        setInputData(){
            this.checkedTypes = this.typeOptions.concat();
            this.boxTypes = this.typeOptions.concat();
        },
        handleCheckAllChange(val) {
            this.checkedTypes = val ? this.typeOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.boxTypes.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.boxTypes.length;
        },
        exportExcel(){
            let [ichecked, ispecial] = [this.checkedTypes, this.specialTypes];
            this.$emit('exportExcel', {ichecked, ispecial});
        }
    },
    watch: {
        
    }
}
</script>
<style scoped>
    header {
        font-size: 16px;
    }
    div[class*=wrapper] {
        margin-bottom: 20px;
    }
    .Exc-btn-wrap {
        text-align: center;
    }
    .Exc-btn {
        margin: 70px auto 0;
    }
    .Exc-special-wrap {
        margin-top: 50px;
    }
</style>










