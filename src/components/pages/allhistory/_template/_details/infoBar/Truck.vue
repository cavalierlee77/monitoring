<template>
    <section>
        <header>
            <i class="el-icon-info"></i>   查验信息
        </header>     
        <el-form ref="form" label-position="left" label-width="120px">
            <el-row>
            	<el-col :span="6">
    			    <div class="item_list">
    			        <label for="">查验车牌</label>
    			        <el-input 
    			        v-model="information.plateNumber"  
    			        suffix-icon="el-icon-edit"
    			        class='inner_reset'
    			        ></el-input>
    			    </div>
    			</el-col>
    			<el-col :span="6">
    			    <div class="item_list">
    			        <label for="">收费车牌</label>
    			        <el-input 
    			        v-model="information.tollPlateNumber"  
    			        suffix-icon="el-icon-edit"
    			        @keyup.enter.native="action"></el-input>
    			    </div>
    			</el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">箱体尺寸</label>
                        <el-input v-model="information.boxSize"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>  
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">箱体代码</label>
                        <el-input v-model="information.boxTypeCode"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">入口站</label>
                        <el-input v-model="information.entryStatName"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>  
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">入口时间</label>
                        <el-input v-model="information.entryDate"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">出口站</label>
                        <el-input v-model="information.orgName"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">出口时间</label>
                        <el-input v-model="information.exitDate"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">应收金额</label>
                        <el-input v-model="information.amountReceivable"  suffix-icon="el-icon-edit"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">实收金额</label>
                        <el-input v-model="information.receiveAmount"  suffix-icon="el-icon-edit"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">优惠金额</label>
                        <el-input v-model="information.discountAmount"  suffix-icon="el-icon-edit"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">审核状态</label>
                        <el-select v-model="information.verifyStatusName">
        		    		<el-option label="待审核" value="1"></el-option>
        		    		<el-option label="核查不通过" value="2"></el-option>
        		    		<el-option label="核查通过" value="3"></el-option>
        		    		<el-option label="废弃" value="4"></el-option>
        		    	</el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
            	<el-col :span="6">
                    <div class="item_list">
                        <label for="">收费员</label>
                        <el-input v-model="information.tollId"  suffix-icon="el-icon-edit"></el-input>
                    </div>
                </el-col>
            	<el-col :span="6">
                    <div class="item_list">
                        <label for="">司机姓名</label>
                        <el-input v-model="information.driverName"  suffix-icon="el-icon-edit"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">司机电话</label>
                        <el-input v-model="information.driverPhoneNumber"  suffix-icon="el-icon-edit"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </section>
</template>

<script>

export default {
    name: 'inputs',
    props: {
        infoData: {
            type: Object,
            default: function(){

            }
        },
    },
    data() {
        return {
        		information: {		
        			plateNumber: '',
        		    tollPlateNumber: '',
        		    exitTollId: '',
        		    entryStatName: '',                    
        		    entryDate: '',
        		    orgName: '',
        		    exitDate: '',
        		    amountReceivable: '',
        		    receiveAmount: '',
        		    driverPhoneNumber: '',
        		    verifyStatusName: '',
        		    checkId: '',

                    boxSize:'',
                    boxTypeCode:'',
                    discountAmount:'',
                    tollId:'',
                    driverName:'',
        		},
        	    loading: false,
        	    curGoodList: [],
        	    remoteList: []
        	}
        	    //做一个大类，然后监控这个类，数据改变时触发 toChange
        
    },
    mounted() {
    	//his.setNowGoodsList()
    },
    methods: {
    	action(query){
            this.$emit('action', query.target.value)
        },
        setCommitData(options, name){
            let opt = new Object();
            opt[name] = options;
            this.$emit('action', opt)
        },
        //setNowGoodsList(){
        //    console.log(this.infoData)
        //},
        remoteMethod(query) {
            if (query && query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.remoteList = this.curGoodList.filter(item => {
                        let py = this.$PinYinHelper.toPinYin(item.value)[0].toLowerCase();
                        return (py.indexOf(query.toLowerCase()) > -1) ||
                            (item.value.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    });
                }, 200);
            } else {
                this.remoteList = [];
                this.remoteList = this.curGoodList;
            }
        },
	},
	watch: {
		infoData:{
            handler(val, oldval) {
                this.information.plateNumber = val.plateNumber
                this.information.tollPlateNumber = val.tollPlateNumber
                this.information.goodsName = val.goodsName
                this.information.exitTollId = val.exitTollId
                this.information.entryStatName = val.entryStatName
                this.information.entryDate = val.entryDate
                this.information.orgName = val.orgName
                this.information.exitDate = val.exitDate
                this.information.amountReceivable = val.amountReceivable
                this.information.receiveAmount = val.receiveAmount
                this.information.driverPhoneNumber= val.driverPhoneNumber
                this.information.verifyStatusName= val.verifyStatus

                this.information.boxSize = val.boxSize
                this.information.boxTypeCode = val.boxTypeCode
                this.information.discountAmount = val.discountAmount
                this.information.tollId = val.tollId
                this.information.driverName = val.driverName
            },
            immediate: true,
            deep: true
        },
        //plateNumber(val){
        //    this.$emit('resetPlateNumber', {
        //        plateNumber: val,
        //        tollPlateNumber: val
        //    })
        //    this.tollPlateNumber = val;
        //},
        //tollPlateNumber(val){
        //    this.$emit('resetPlateNumber', {
        //        plateNumber: this.plateNumber,
        //        tollPlateNumber: val
        //    })
        //},
        information:{
        	handler(val, oldval){
        		this.$emit('changeInformation',{
        			checkId: this.infoData.checkId,
        			plateNumber: this.information.plateNumber,
        			tollPlateNumber: this.information.tollPlateNumber,
            	    exitTollId: this.information.exitTollId,
            	    entryStatName: this.information.entryStatName ,
            	    entryDate: this.information.entryDate ,
            	    orgName: this.information.orgName,
            	    exitDate: this.information.exitDate ,
            	    amountReceivable: this.information.amountReceivable,
            	    receiveAmount: this.information.receiveAmount,
            	    driverPhoneNumber: this.information.driverPhoneNumber,
            	    verifyStatus: this.information.verifyStatusName,

                    boxSize: this.information.boxSize,
                    boxTypeCode: this.information.boxTypeCode,
                    discountAmount: this.information.discountAmount,
                    tollId: this.information.tollId,
                    driverName: this.information.driverName,
        		})
        		//this.information.tollPlateNumber = this.information.plateNumber;
        	},
        	immediate: true,
            deep: true
        }
	}
}
</script>
<style scoped>
    header {
        padding: 10px 10px 10px 10px;
        font-size: 16px;
        font-weight: 700;
    }
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










