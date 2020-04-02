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
                    <el-form-item label="货物名称">
                        <fuzzy-selector v-model='SelData.goods' vname='goods' :libraryData='goodsList'></fuzzy-selector>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="queryType">
                <el-col :span="7" :offset="5">
                    <el-form-item label="审核状态">
                        <i-selector v-model='SelData.examineType' vname='examineType' :options='verifyStatusList' @change='iSelectorChange'></i-selector>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="金额范围">
                        <el-col :span="11" class='charge-mix'>
                            <el-input v-model="SelData.minCharge" placeholder="最低金额" suffix-icon="el-icon-edit" class='charge-mix'></el-input>
                        </el-col>
                        <el-col class="line charge-middle" :span="2">-</el-col>
                        <el-col :span="11" class='charge-max'>
                            <el-input v-model="SelData.maxCharge" placeholder="最高金额" suffix-icon="el-icon-edit" class='charge-max'></el-input>
                        </el-col>
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
import FuzzySelector from '../../../../common/FuzzySelector'
import {QueryMixins} from '../../../../../assets/mixins/HistoryQuery'

export default {
    name: 'querybox',
    mixins: [QueryMixins],
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
                goods: '',
                plateNumber: '',
                minCharge: '',
                maxCharge: ''
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
        iSelector,
        FuzzySelector
    },
    mounted() {
        this.getVerifyStatus();
        this.getGoodsList();
        this.checkQueryHei();
    },
    computed: {
        ...mapState({
            verifyStatusList: state => state.history.statusList,
            goodsList: state => state.history.goodsList,
        })        
    },
    methods: {
        getVerifyStatus(){
            this.$store.dispatch('getHisStatusList');
        },
        getGoodsList(){
            this.$store.dispatch('getHisGoodsList');
        },
        datePickerChange: function(val, name) {
            this.SelData[name] = val;
        },
        iSelectorChange: function(val, name){
            this.SelData[name] = val;
        },
        fuzzySelectorChange: function(val, name){
            this.SelData[name] = val;
        },
        onSearch(){
            let val = this.SelData;
            let _data = {
                beginTime: '',
                endTime: '',
                goods: val.goods,
                plateNumber: val.plateNumber,
                minCharge: val.minCharge,
                maxCharge: val.maxCharge,
                verifyStatus: val.examineType
            };
            if(val.startDate)
                _data.beginTime = new Date(val.startDate).format('yyyy-MM-dd hh:mm:ss');
            if(val.endDate)
                _data.endTime = new Date(val.endDate).format('yyyy-MM-dd hh:mm:ss');
            this.$emit('action', _data);
        },
        checkQueryHei(){
            this.$emit('changeHei', 0, 'GreenCar');
        },
        resetQueryData(){
            this.$set(this.SelData, 'examineType', '');
            this.$set(this.SelData, 'goods', '');
            this.$set(this.SelData, 'minCharge', '');
            this.$set(this.SelData, 'maxCharge', '');
        }
    }
}
</script>
<style scoped>
    @import '../../_css/Query.css';
</style>




