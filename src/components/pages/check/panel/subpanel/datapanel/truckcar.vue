<template>
    <div class="">
        <header>
            <i class="el-icon-info"></i>   查验信息
        </header>     
        <el-form ref="form" label-position="left" label-width="120px">
            <el-row>
                <slot name="platenumber_search"></slot>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">入口站</label>
                        <el-input v-model="enteName"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>  
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">入口时间</label>
                        <el-input v-model="enteDate"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">出口车道</label>
                        <el-input v-model="lane"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">出口时间</label>
                        <el-input v-model="exitDate"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">应收金额</label>
                        <el-input v-model="amountReceivable"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">实收金额</label>
                        <el-input v-model="receiveAmount"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">计重</label>
                        <el-input v-model="wholeTruckWeight"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">收费员</label>
                        <el-input v-model="tollId"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">箱体代码</label>
                        <el-input v-model="boxTypeCode"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">箱体尺寸</label>
                        <el-input v-model="boxSize"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">司机姓名</label>
                        <el-input v-model="driverName"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item_list">
                        <label for="">司机电话</label>
                        <el-input v-model="driverPhoneNumber"  suffix-icon="el-icon-view" readonly></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'TruckCar',
    props: {
        checkdata: {
            type: Object,
            default: function(){
                return {}
            }
        }
    },
    data() {
        return {
            enteName:'',
            enteDate:'',
            lane:'',
            exitDate:'',
            amountReceivable:'',
            receiveAmount:'',
            wholeTruckWeight:'',
            tollId:'',
            boxTypeCode:'',
            boxSize:'',
            driverName:'',
            driverPhoneNumber:'',
        }
    },
    components: {},
    methods: {
        setCommitData(options, name){
            let opt = new Object();
            opt[name] = options;
            this.$emit('action', opt)
        },
    },
    watch: {
        checkdata:{
            handler(val, oldval) {
                this.enteName = val.entryStatName
                this.enteDate = val.entryDate
                this.lane = val.lane
                this.exitDate = val.exitDate
                this.amountReceivable = val.amountReceivable
                this.receiveAmount = val.receiveAmount
                this.wholeTruckWeight = val.wholeTruckWeight
                this.tollId = val.tollId
                this.boxTypeCode = val.boxTypeCode
                this.boxSize = val.boxSize
                this.driverName = val.driverName
                this.driverPhoneNumber = val.driverPhoneNumber
            },
            immediate: true,
            deep:true
        },
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
