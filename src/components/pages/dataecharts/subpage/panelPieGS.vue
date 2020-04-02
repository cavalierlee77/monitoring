<template>
<div class="echarts-panel-pie-gs-wraper">
    <el-row>
        <el-col :span="24">
            <time-season></time-season>
            <div class="echarts-panel-pie-gs-main">
                <div id="myChartGS" :style="{width: '100%', height: '400px'}"></div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import TimeSeason from "./TimeSeason.vue"
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
        TimeSeason
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
            let myChartGS = this.$echarts.init(document.getElementById('myChartGS'))
            // 绘制图表
            var colors = ['#5793f3', '#d14a61', '#675bba'];
            myChartGS.setOption({
                title: { 
                    text: '',
                    textStyle:{
            　　　　fontSize:16
                    } 
                },
                //color: colors,
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}次 ({d}%)"
                },
                legend: {
                    x : 'right',
                    y : 'center',
                    orient: 'vertical',
                    data:['新鲜蔬菜','新鲜水果','鲜活水产品','活的畜禽','新鲜肉蛋奶','其他']
                },
                toolbox: {
                    x: 'left',
                    show : true,
                    feature : {
                        mark : {show: true},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series: [{
                    name:'详细数据:',
                    type:'pie',
                    radius : [30, 110],
                    center : ['50%', '50%'],
                    roseType : 'area',
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data:[
                        {value:3600, name:'新鲜蔬菜'},
                        {value:2000, name:'新鲜水果'},
                        {value:1600, name:'鲜活水产品'},
                        {value:1000, name:'活的畜禽'},
                        {value:1000, name:'新鲜肉蛋奶'},
                        {value:900, name:'其他'}
                    ]
                }]
            });
        }
    },
    watch: {
    }
};
</script>

<style scoped>
.echarts-panel-pie-gs-wraper {
    border: 1px solid #e5e9f2;
    border-radius: 1px;
    padding: 10px 10px 10px 10px;
}
.echarts-panel-pie-gs-main {

}
.el-row {
    margin-bottom: 5px;
}
</style>
