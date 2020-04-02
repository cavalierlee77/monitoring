<template>
<div class="echarts-panel-line-wraper">
    <el-row>
        <el-col :span="24">
            <time-line></time-line>
            <div class="echarts-panel-line-main">
                <div id="myChartL" :style="{width: '100%', height: '400px'}"></div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import TimeLine from "./TimeLine.vue"
export default {
    props: {
        paneldata: {
            type: Object,
            default: function() {
                return {

                }
            }
        }
    },
    components: {
        TimeLine
    },
    data () {
        return {
      }
    },
    mounted(){
        this.drawLine();
    },
    methods: {
        drawLine(){
            let myChartL = this.$echarts.init(document.getElementById('myChartL'))
            // 绘制图表
            var colors = ['#5793f3', '#d14a61', '#675bba'];
            myChartL.setOption({
                title: { 
                    text: '',
                    textStyle:{
            　　　　fontSize:16
                    } 
                },
                color: colors,
                legend: {
                    x : 'center',
                    y : 'top',
                    data:['昨日','今日']
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    x: 'left',
                    feature: {
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时', '24时']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '昨日',
                    data: [820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330],
                    type: 'line'
                },
                {
                    name: '今日',
                    data: [720, 1032, 501, 934, 1090, 1530, 1520, 720, 1032, 501, 934, 1090, 1530, 1520, 720, 1032, 501, 934, 1090, 1530, 1520, 934, 1090],
                    type: 'line'
                }]
            });
        }
    },
    watch: {
    }
};
</script>

<style scoped>
.echarts-panel-line-wraper {
    border: 1px solid #e5e9f2;
    border-radius: 1px;
    padding: 10px 10px 10px 10px;
}
.echarts-panel-line-main {

}
.el-row {
    margin-bottom: 5px;
}
</style>
