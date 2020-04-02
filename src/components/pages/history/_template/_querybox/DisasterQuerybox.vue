<template>
    <section>
        <el-form ref="form" label-width="70px">
            <el-row>
                <el-col :span="7" :offset="5">
                    <el-form-item label="开始时间">
                        <date-picker v-model='SelData.startDate' vname='startDate' @change='datePickerChange' class='date-input'></date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="结束时间">
                        <date-picker v-model='SelData.endDate' vname='endDate' @change='datePickerChange' class='date-input'></date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" plain icon="el-icon-search" @click="onSearch">检索</el-button>
                    <span class='change-querytype' v-on:click='changeQueryType()'>
                        {{changeQueryTypeFlag.iName}}<i :class='changeQueryTypeFlag.iClass'></i>
                    </span>
                </el-col>
            </el-row>
            <el-row v-if="queryType">
                <el-col :span="7" :offset="5">
                    <el-form-item label="车牌号码">
                        <el-input v-model="SelData.plateNumber" placeholder="请输入车牌号码" suffix-icon="el-icon-edit" class='el-input-a'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="审核状态">
                        <i-selector v-model='SelData.examineType' vname='examineType' :options='verifyStatusList' @change='iSelectorChange'></i-selector>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import DatePicker from '../../../../common/DatePicker'
import iSelector from '../../../../common/iSelector'
import { QueryMixins } from '../../../../../assets/mixins/HistoryQuery'

export default {
    name: 'querybox',
    mixins: [ QueryMixins ],
    props: {
        
    },
    data() {
        return {
            loading: false,
            goodsLikeList: [],
            SelData: {
                startDate: '',
                endDate: '',
                examineType: '',
                plateNumber: '',
            },
            queryType: false,
            changeQueryTypeFlag: {
                iClass: 'el-icon-arrow-down',
                iName: '展开'
            }
        }
    },
    components: {
        DatePicker,
        iSelector
    },
    mounted() {
        this.getVerifyStatus();
        this.checkQueryHei();
    },
    computed: {
        ...mapState({
            verifyStatusList: state => state.history.statusList,
        })        
    },
    methods: {
        getVerifyStatus(){
            this.$store.dispatch('getHisStatusList');
        },
        datePickerChange: function(val, name) {
            this.SelData[name] = val;
        },
        iSelectorChange: function(val, name){
            this.SelData[name] = val;
        },
        onSearch(){
            let val = this.SelData;
            let _data = {
                beginTime: '',
                endTime: '',
                plateNumber: val.plateNumber,
                verifyStatus: val.examineType
            };
            if(val.startDate)
                _data.beginTime = new Date(val.startDate).format('yyyy-MM-dd hh:mm:ss');
            if(val.endDate)
                _data.endTime = new Date(val.endDate).format('yyyy-MM-dd hh:mm:ss');
            this.$emit('action', _data);
        },
        checkQueryHei(){
            this.$emit('changeHei', 0, 'DisasterCar');
        },
        resetQueryData(){
            this.$set(this.SelData, 'examineType', '');
            this.$set(this.SelData, 'plateNumber', '');
        }
	}
}
</script>
<style scoped>
    @import '../../_css/Query.css';
</style>











