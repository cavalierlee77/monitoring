<template>
<div class="data-echarts-wraper">
    <el-row :gutter="5">
        <el-col :span="6"><data-panel-a :paneldata="row1"></data-panel-a></el-col>
        <el-col :span="6"><data-panel-a :paneldata="row2"></data-panel-a></el-col>
        <el-col :span="6"><data-panel-a :paneldata="row3"></data-panel-a></el-col>
        <el-col :span="6"><data-panel-b :paneldata="row4"></data-panel-b></el-col>
    </el-row>
    <el-row :gutter="5">
        <el-col :span="18">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="减免金额" name="first">
                    <data-panel-bar-f-c :activeName='activeName'></data-panel-bar-f-c>
                </el-tab-pane>
                <el-tab-pane label="收费车次VS查验车次" name="second">
                    <data-panel-bar-c-c :activeName='activeName'></data-panel-bar-c-c>
                </el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="6">
            <data-panel-c :paneldata="row5"></data-panel-c>
        </el-col>
    </el-row>
    <el-row :gutter="5">
        <el-col :span="12">
            <div class="pie-title">货物种类分析</div>
            <data-panel-pie-g-t></data-panel-pie-g-t>
        </el-col>
        <el-col :span="12">
            <div class="pie-title">货物季节性分析</div>
            <data-panel-pie-g-s></data-panel-pie-g-s>
        </el-col>
    </el-row>
    <el-row :gutter="5">
        <el-col :span="24">
            <div class="pie-title">绿通繁忙度分析(辆)</div>
            <data-panel-line></data-panel-line>
        </el-col>
    </el-row>
</div>
</template>

<script>
import DataPanelA from "./subpage/panelA.vue";
import DataPanelB from "./subpage/panelB.vue";
import DataPanelC from "./subpage/panelC.vue";
import DataPanelBarFC from "./subpage/PanelBarFC.vue";
import DataPanelBarCC from "./subpage/PanelBarCC.vue";
import DataPanelPieGT from "./subpage/PanelPieGT.vue";
import DataPanelPieGS from "./subpage/PanelPieGS.vue";
import DataPanelLine from "./subpage/PanelLine.vue";         
export default {
    components: {
        DataPanelA,
        DataPanelB,
        DataPanelC,
        DataPanelBarFC,
        DataPanelBarCC,
        DataPanelPieGT,
        DataPanelPieGS,
        DataPanelLine
    },
    data () {
        return {
            row1:{
                title1:'总减免金额(元)',
                TR:126560,
                title2:'日均:',
                DA:7910,
                title3:'上月日均:',
                LMDA:8888,
                title4:'日均减免金额环比',
                CP: 2,
                DAAOR:'11%'
            },
            row2:{
                title1:'收费总减免车次(辆)',
                TR:9527,
                title2:'日均:',
                DA:595,
                title3:'上月日均:',
                LMDA:669,
                title4:'日均减免车次环比',
                CP: 2,
                DAAOR:'11%'
            },
            row3:{
                title1:'总查验车次(辆)',
                TR:9580,
                title2:'日均:',
                DA:599,
                title3:'上月日均:',
                LMDA:673,
                title4:'日均查验车次环比',
                CP: 2,
                DAAOR:'11%'
            },
            row4:{
                title1:'总异常车次(辆)',
                TR:53,
                title2:'异常率:',
                AR:'5.18%',
                title3:'审核通过',
                PC:2,
                title4:'废弃',
                AB:51
            },
            row5:{
                title1:'昨日绿通数据统计',
                title2:'收费总减免金额:',
                dt1: 1500,
                title3:'收费总减免车次:',
                dt2: 150,
                title4:'绿通查验车次:',
                dt3: 153,
                title5:'审核不通过车次:',
                dt4: 13,
                title6:'废弃车次:',
                dt5: 3
            },
            activeName: 'first'
      }
    },
    mounted(){
    },
    methods: {
        handleClick(tab, event) {
            //console.log(tab.paneName);
        }
    }
};
</script>

<style scoped>
.data-echarts-wraper {
   /* background-color: #0e131a;*/
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
   /* color: #fff;*/
}
.el-row {
    margin-bottom: 5px;
}
.bg-purple {
    border: 1px solid #e5e9f2;
}
.grid-content {
    border-radius: 1px;
    min-height: 36px;
}
.pie-title {
    line-height: 40px;
}
</style>
