<template>
<div class="echarts-panel-wraper">
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-title-main">{{paneldata.title1}}
                <i class="el-icon-info"></i>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-number">
                <div class="echarts-panel-number-main">{{paneldata.TR}}</div>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-middle">
                <div class="echarts-panel-title-main">{{paneldata.title2}}</div>
                <div class="echarts-panel-number-percent">{{paneldata.DA}}</div>
                <div class="echarts-panel-title-main">{{paneldata.title3}}</div>
                <div class="echarts-panel-number-percent">{{paneldata.LMDA}}</div>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-footer">
                <div class="echarts-panel-footer-title">{{paneldata.title4}}</div>
                <arrow :arrowdata="paneldata.CP"></arrow>
                <div class="echarts-panel-footer-number">{{paneldata.DAAOR}}</div>
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
.echarts-panel-wraper {
    border: 1px solid #e5e9f2;
    border-radius: 1px;
    padding: 10px 10px 10px 10px;
}
.echarts-panel-middle {
    text-align: center;
}
.echarts-panel-middle div {
    display:inline-block;
}
.echarts-panel-title-main {
    font-size: 14px;
    font-weight: 500;
    margin-left: 5px;
}
.echarts-panel-number {
    text-align: center;
}
.echarts-panel-number-main {
    display: inline-block;
    font-size: 30px;
    font-weight: 500;
}
.echarts-panel-number-percent {
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
}
.echarts-panel-abnormality-rate {
}
.echarts-panel-month {
}
.echarts-panel-day {
}
.echarts-panel-footer {
    text-align: center;
    margin-top: 20px;
}
.echarts-panel-footer div {
    display: inline-block;
}
.echarts-panel-footer-title {
    margin-right: 5px;
    font-weight: 500;
}
.el-icon-info {
    float: right;
}
.el-row {
    margin-bottom: 5px;
}
</style>
