<template>
<div class="echarts-panel-c-wraper">
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-c-number-main">{{paneldata.title1}}
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-c-center">
                <div class="echarts-panel-c-title-main">{{paneldata.title2}}</div>
                <div class="echarts-panel-c-number-percent">￥{{paneldata.dt1}}</div>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-c-center">
                <div class="echarts-panel-c-title-main">{{paneldata.title3}}</div>
                <div class="echarts-panel-c-number-percent" style="color:red">{{paneldata.dt2}}辆</div>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-c-center">
                <div class="echarts-panel-c-title-main">{{paneldata.title4}}</div>
                <div class="echarts-panel-c-number-percent" style="color:red">{{paneldata.dt3}}辆</div>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-c-center">
                <div class="echarts-panel-c-title-main">{{paneldata.title5}}</div>
                <div class="echarts-panel-c-number-percent">{{paneldata.dt4}}辆</div>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-c-center">
                <div class="echarts-panel-c-title-main">{{paneldata.title6}}</div>
                <div class="echarts-panel-c-number-percent">{{paneldata.dt5}}辆</div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import arrow from "./arrow.vue" 
export default {
    props: {
        paneldata: {
            type: Object,
            default: function() {
                return {

                }
            }
        },
    },
    components: {
        arrow
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
.echarts-panel-c-wraper {
    margin-top: 54px;
    height: 426px;
    border: 1px solid #e5e9f2;
    border-radius: 1px;
    padding: 10px 10px 10px 10px;
}
.echarts-panel-c-middle {
    text-align: center;
}
.echarts-panel-c-middle div {
    display:inline-block;
}
.echarts-panel-c-title-main {
    text-align: left;
    display: inline-block;
    width: 150px;
    padding-left: 20px;
    padding-right: 10px;
    font-size: 14px;
    font-weight: 500;
    margin-left: 5px;
}
.echarts-panel-c-number {
    text-align: center;
}
.echarts-panel-c-number-main {
    font-size: 16px;
    font-weight: 700;
}
.echarts-panel-c-number-percent {
    display: inline-block;
    width: 60px;
    text-align: right;
    font-size: 16px;
    font-weight: 500;
    margin-right: 10px;
}
.echarts-panel-c-abnormality-rate {
}
.echarts-panel-c-month {
}
.echarts-panel-c-day {
}
.echarts-panel-c-footer {
    text-align: center;
    margin-top: 20px;
}
.echarts-panel-c-footer div {
    display: inline-block;
}
.echarts-panel-c-footer-title {
    margin-right: 5px;
    font-weight: 500;
}
.el-icon-info {
    float: right;
}
.echarts-panel-c-center {
    padding: 10px 0px 10px 0px;
    text-align: center;
}
.el-row {
    margin-bottom: 5px;
}
</style>
