<template>
<div class="echarts-panel-b-wraper">
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-b-title-main">{{paneldata.title1}}
                <i class="el-icon-info"></i>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-b-number">
                <div class="echarts-panel-b-number-main">{{paneldata.TR}}</div>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-b-middle">
                <div class="echarts-panel-b-title-main">{{paneldata.title2}}</div>
                <div class="echarts-panel-b-number-percent">{{paneldata.AR}}</div>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-b-footer">
                <div class="echarts-panel-b-footer-title">{{paneldata.title3}}</div>
                <div class="echarts-panel-b-footer-number">{{paneldata.PC}}</div>
                <div class="echarts-panel-b-footer-title">{{paneldata.title4}}</div>
                <div class="echarts-panel-b-footer-number">{{paneldata.AB}}</div>
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
.echarts-panel-b-wraper {
    border: 1px solid #e5e9f2;
    border-radius: 1px;
    padding: 10px 10px 10px 10px;
}
.echarts-panel-b-middle {
    text-align: center;
}
.echarts-panel-b-middle div {
    display:inline-block;
}
.echarts-panel-b-title-main {
    font-size: 14px;
    font-weight: 500;
    margin-left: 5px;
}
.echarts-panel-b-number {
    text-align: center;
}
.echarts-panel-b-number-main {
    display: inline-block;
    font-size: 30px;
    font-weight: 500;
}
.echarts-panel-b-number-percent {
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
}
.echarts-panel-b-abnormality-rate {
}
.echarts-panel-b-month {
}
.echarts-panel-b-day {
}
.echarts-panel-b-footer {
    text-align: center;
    margin-top: 20px;
}
.echarts-panel-b-footer div {
    display: inline-block;
}
.echarts-panel-b-footer-title {
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
