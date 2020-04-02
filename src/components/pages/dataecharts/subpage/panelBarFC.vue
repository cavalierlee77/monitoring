<template>
<div class="echarts-panel-bar-fc-wraper">
    <el-row>
        <el-col :span="24">
            <time-period-a :demo="panelname"></time-period-a>
            <div class="echarts-panel-bar-fc-main">
                <div id="myChartFC" :style="{width: '100%', height: '400px'}"></div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import TimePeriodA from "./TimePeriodA.vue"
export default {
    props: {
        paneldata: {
            type: Object,
            default: function() {
                return {

                }
            }
        },
        activeName: {
            type: String,
            default: function() {
                return {

                }
            }
        }
    },
    components: {
        TimePeriodA
    },
    data () {
        return {
            panelname: 'fc'
      }
    },
    mounted(){
        this.drawLine();
    },
    methods: {
        drawLine(){
            let myChartFC = this.$echarts.init(document.getElementById('myChartFC'))
            // 绘制图表
            var colors = ['#5793f3', '#d14a61'];
            myChartFC.setOption({
                title: { 
                    text: '',
                    textStyle:{
            　　　　fontSize:16
                    } 
                },
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                toolbox: {
                    x: 'left',
                    y: 'top',
                    feature: {
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data:['减免金额']
                },
                xAxis: {
                    data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
                },
                yAxis: {
                    type: 'value',
                    name: '',
                    axisLabel: {
                        formatter: '{value} 元'
                    },
                    axisLine: {
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                },
                series: [{
                    name: '减免金额',
                    type: 'bar',
                    barWidth : 25,
                    data: [1150, 2000, 3600, 1000, 1000, 2000, 7500, 2000, 3600, 8000, 1000, 2000]
                }]
            });
        }
    },
    watch: {
        activeName(val){
            if(val == 'first'){
                this.drawLine();
            }
        }
    }
};
</script>

<style scoped>
.echarts-panel-bar-fc-wraper {
    border: 1px solid #e5e9f2;
    border-radius: 1px;
    padding: 10px 10px 10px 10px;
}
.echarts-panel-bar-fc-main {

}
.el-row {
    margin-bottom: 5px;
}
</style>
