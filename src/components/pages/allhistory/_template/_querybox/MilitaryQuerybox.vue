<template>
    <section>
        <el-form ref='form' label-width='85px'>
            <el-row>
                <el-col :span='7' :offset='3'>
                    <el-form-item label="收费站名称">
                        <el-select v-model="SelData.station" placeholder="请选择收费站" >
        		    	<el-option label="全部" value=" " ></el-option>              	
                        <el-option v-for="item in stationList" :key="item.orgId" :value="item.orgId" :label="item.orgName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="车牌号码">
                        <el-input v-model="SelData.plateNumber" placeholder="请输入车牌号码" suffix-icon="el-icon-edit" class='el-input-a'></el-input>
                    </el-form-item>          
                </el-col>
                <el-col :span='5' :offset="2">
                    <el-button type='primary' plain icon='el-icon-search' @click='onSearch'>检索</el-button>
                    <span class='change-querytype' v-on:click='changeQueryType()'>
                        {{changeQueryTypeFlag.iName}}<i :class='changeQueryTypeFlag.iClass'></i>
                    </span>
                </el-col>
            </el-row>
            <el-row v-if='queryType'>
                <el-col :span='7' :offset='3'>
                    <el-form-item label='部队番号'>
                        <el-input v-model='SelData.designation' placeholder='请输入车牌号码' suffix-icon='el-icon-edit' class='el-input-a'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='7'>
                    <el-form-item label="时间范围" class="demonstration">
                        <el-date-picker
                            v-model="timeData"
                            type="datetimerange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if='queryType'>
                <el-col :span='7' :offset='3'>
                    <el-form-item label='审核状态'>
                        <i-selector v-model='SelData.examineType' vname='examineType' :options='verifyStatusList' @change='iSelectorChange'></i-selector>
                    </el-form-item>
                </el-col>
                <el-col :span='7'>
                    <el-form-item label='金额范围'>
                        <el-col :span='11' class='charge-mix'>
                            <el-input v-model='SelData.minCharge' placeholder='最低金额' suffix-icon='el-icon-edit' class='charge-mix'></el-input>
                        </el-col>
                        <el-col class='line charge-middle' :span='2'>-</el-col>
                        <el-col :span='11' class='charge-max'>
                            <el-input v-model='SelData.maxCharge' placeholder='最高金额' suffix-icon='el-icon-edit' class='charge-max'></el-input>
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

export default {
    name: 'querybox',
    props: {
        
    },
    data() {
        return {
            loading: false,
            stations:'',
            timeData:'',
            SelData: {
                stations:'',
                examineType: '',
                designation: '',
                minCharge: '',
                maxCharge: ''
            },
            queryType: false,
            changeQueryTypeFlag: {
                iClass: 'el-icon-arrow-down',
                iName: '展开'
            },
            pickerOptions: {
              shortcuts: [{
                text: '提前一天',
                onClick(picker) {
                  const end = picker.maxDate;
                  const start = picker.minDate;
                  start.setTime(start.getTime()- 3600 * 1000 * 24 * 1);
                  end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                  picker.$emit('pick', [start, end]);
                }
              },{
                text: '昨天',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 1-start.getHours()*3600*1000-start.getMinutes()*60*1000-start.getSeconds()*1000);
                  end.setTime(end.getTime()-end.getHours()*3600*1000-end.getMinutes()*60*1000-end.getSeconds()*1000);
                  picker.$emit('pick', [start, end]);
                  // console.log(picker);
                }
              },{
                text: '往后一天',
                onClick(picker) {
                  const end = picker.maxDate;
                  const start = picker.minDate;
                  start.setTime(start.getTime()+ 3600 * 1000 * 24 * 1);
                  end.setTime(end.getTime() + 3600 * 1000 * 24 * 1);
                  picker.$emit('pick', [start, end]);
                }
              },{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7-start.getHours()*3600*1000-start.getMinutes()*60*1000-start.getSeconds()*1000);
                  end.setTime(end.getTime()-end.getHours()*3600*1000-end.getMinutes()*60*1000-end.getSeconds()*1000);
                  picker.$emit('pick', [start, end]);
                }
              },{
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30-start.getHours()*3600*1000-start.getMinutes()*60*1000-start.getSeconds()*1000);
                  end.setTime(end.getTime()-end.getHours()*3600*1000-end.getMinutes()*60*1000-end.getSeconds()*1000);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
        }
    },
    components: {
        DatePicker,
        iSelector
    },
    mounted() {
        this.checkQueryHei();
    },
    computed: {
        ...mapState({
        	stationList: state => state.allhistory.stationList,
            verifyStatusList: state => state.history.statusList,
        })        
    },
    methods: {
        datePickerChange: function(val, name) {
            this.SelData[name] = val;
        },
        iSelectorChange: function(val, name){
            this.SelData[name] = val;
        },
        onSearch(){
            let val = this.SelData;
            let [cc1 = new Date('1970'), cc2 = new Date()] = this.timeData;
            let _data = {
                orgId: val.station,
                beginTime: new Date(cc1).format('yyyy-MM-dd hh:mm:ss'),
                endTime: new Date(cc2).format('yyyy-MM-dd hh:mm:ss'),
                designation: val.designation,
                minCharge: val.minCharge,
                maxCharge: val.maxCharge,
                verifyStatus: val.examineType
            };
            this.$emit('action', _data);
        },
        changeQueryType(){
            this.queryType = !this.queryType;
            if(!this.queryType){
                this.resetQueryData();
                this.$emit('changeHei', 0);
                this.changeQueryTypeFlag.iClass = 'el-icon-arrow-down';
                this.changeQueryTypeFlag.iName = '展开';
            } else {
                this.$emit('changeHei', 144);
                this.changeQueryTypeFlag.iClass = 'el-icon-arrow-up';
                this.changeQueryTypeFlag.iName = '收起';
            }
        },
        checkQueryHei(){
            this.$emit('changeHei', 0, 'MilitaryCar');
        },
        resetQueryData(){
            this.$set(this.SelData, 'examineType', '');
            this.$set(this.SelData, 'designation', '');
            this.$set(this.SelData, 'minCharge', '');
            this.$set(this.SelData, 'maxCharge', '');
        }
	}
}
</script>
<style scoped>
    @import '../../_css/Query.css';
</style>







