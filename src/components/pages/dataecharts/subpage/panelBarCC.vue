<template>
<div class="echarts-panel-bar-cc-wraper">
    <el-row>
        <el-col :span="24">
            <time-period-a :demo="panelname"></time-period-a>
            <div class="echarts-panel-bar-cc-main">
                <div id="myChartCC" :style="{width: '100%', height: '400px'}"></div>
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
            panelname: 'cc'
      }
    },
    mounted(){
    },
    methods: {
        drawLine(){
            let myChartCC = this.$echarts.init(document.getElementById('myChartCC'))
            // 绘制图表
            var colors = ['#5793f3', '#d14a61', '#675bba'];
            myChartCC.setOption({
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
                    data:['收费车次','查验车次']
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
                },
                yAxis: [{
                    type: 'value',
                    name: '收费车次',
                    position: 'left',
                    axisLabel: {
                        formatter: '{value} 辆'
                    },
                    axisLine: {
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                },
                {
                    type: 'value',
                    name: '查验车次',
                    position: 'right',
                    axisLabel: {
                        formatter: '{value} 辆'
                    },
                    axisLine: {
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                }],
                series: [{
                    name: '收费车次',
                    type: 'bar',
                    barWidth : 25,
                    data: [1140, 1990, 3590, 980, 990, 1990, 7000, 1980, 3500, 7980, 999, 1980]
                },
                {
                    name: '查验车次',
                    type: 'bar',
                    barWidth : 25,
                    data: [1150, 2000, 3600, 1000, 1000, 2000, 7500, 2000, 3600, 8000, 1000, 2000]
                }]
            });
        }
    },
    watch: {
        activeName(val){
            if(val == 'second'){
                this.drawLine();
            }
        }
    }
};
</script>

<style scoped>
.echarts-panel-bar-cc-wraper {
    border: 1px solid #e5e9f2;
    border-radius: 1px;
    padding: 10px 10px 10px 10px;
}
.echarts-panel-bar-cc-main {

}
.el-row {
    margin-bottom: 5px;
}
</style>
