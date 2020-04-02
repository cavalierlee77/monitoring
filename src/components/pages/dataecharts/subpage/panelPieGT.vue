<template>
<div class="echarts-panel-pie-gt-wraper">
    <el-row>
        <el-col :span="24">
            <div class="echarts-panel-pie-gt-main">
                <div id="myChartGT" :style="{width: '100%', height: '400px'}"></div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
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
    data () {
        return {
      }
    },
    mounted(){
        this.drawLine();
    },
    methods: {
        drawLine(){
            let myChartGT = this.$echarts.init(document.getElementById('myChartGT'))
            // 绘制图表
            var colors = ['#3AA0FF', '#36CBCB', '#4DCB73', '#1AFA29', '#F2637B', '#975FE4'];
            myChartGT.setOption({
                title: { 
                    text: '',
                    textStyle:{
            　　　　fontSize:16
                    } 
                },
                //color: colors,
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}次 ({d}%)",
                    position: ['40%', '45%']
                },
                legend: {
                    x: 'right',
                    y: 'center',
                    orient: 'vertical',
                    data:['新鲜蔬菜','新鲜水果','鲜活水产品','活的畜禽','新鲜肉蛋奶','其他']
                },
                toolbox: {
                    x: 'left',
                    feature: {
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                series: [{
                    name:'详细数据:',
                    type:'pie',
                    radius: ['50%', '65%'],
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
.echarts-panel-pie-gt-wraper {
    border: 1px solid #e5e9f2;
    border-radius: 1px;
    padding: 10px 10px 10px 10px;
}
.echarts-panel-pie-gt-main {

}
.el-row {
    margin-bottom: 5px;
}
</style>
