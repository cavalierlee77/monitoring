<template> 
<div>
  <header class='lstyle'>数据列表</header>
  <el-table
    ref="multipleTable"
    :data="dataList"
    tooltip-effect="dark"
    style="width: 100%"
    @row-click='toggleSelectionForCell'
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection">
    </el-table-column>
    <el-table-column
      fit
      stripe
      :label="item.label"
      :prop="item.name"
      sortable v-for='(item,index) in dataHeadList' v-if='!item.hide' :key='index'>
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      label="其他">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top" >
          <p v-for='item in dataHeadList' class="pop" v-if='item.hide'>{{item.label}} : {{ judge(item.name,scope.row) }}</p>
          <!-- <p>车牌颜色: {{ scope.row.plateColor }}</p>
          <p>司机电话: {{ scope.row.driverPhoneNumber }}</p>
          <p>审核意见: {{ scope.row.verifySuggestSelect }}</p> -->
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">展开</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <!--
    <el-table-column
      prop="orgName"
      label="机构">
    </el-table-column> 
    <el-table-column
      prop="checkorName"
      label="查验人员">
    </el-table-column>
    <el-table-column
      prop="checkTime"
      label="查验时间">
    </el-table-column>
    <el-table-column
      prop="plateNumber"
      label="车牌号码">
    </el-table-column>
    <el-table-column
      prop="plateColor"
      label="车牌颜色">
    </el-table-column>
    <el-table-column
      prop="driverPhoneNumber"
      label="司机电话">
    </el-table-column>
    <el-table-column
      prop="goodsName"
      label="货物名称">
    </el-table-column>
    <el-table-column
      prop="isGcTrunck"
      label="查验结论">
    </el-table-column>
    <el-table-column
      prop="wholeTruckWeight"
      label="计重(吨)">
    </el-table-column>
    <el-table-column
      prop="amountReceivable"
      label="应收金额(元)">
    </el-table-column>
    <el-table-column
      prop="verifyStatus"
      label="审核状态">
    </el-table-column>
    <el-table-column
      prop="verifySuggestSelect"
      label="审核意见"
      show-overflow-tooltip>
    </el-table-column> -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <!-- <el-button @click="toggleSelection([data[1], data[2]])">切换第二、第三行的选中状态</el-button> -->
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
</div> 
</template>
<script> 

export default {
  props:{
    dataList: {
      type: Array,
      default: function(){
        return {

        }
      }
    },
    dataHeadList: {
      type: Array,
      default: function(){
        return {

        }
      }
    }
  },
  data: function() {
    return	{
      multipleSelection: []
    }
  },
  methods:{
    //切换行选定状态方法
    toggleSelectionForCell(rows) {
      if ([rows]) {
        [rows].forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //切换行选定状态方法
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //取消已选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //编辑行,数据提交到父组件
    handleEdit(index, row) {
      if((row != '') && (this.multipleSelection.length == 0)){
        this.$emit('editrows',[row]);
      }else{
        this.$emit('editrows',this.multipleSelection);
      }
    },
    //删除行*待用
    handleDelete(index, row) {
      console.log(index, row);
    },
    //展开项匹配处理
    judge(it,sc){
      let a = '';
      for(let key in sc){
        if(it == key){
          a = sc[key];
        }
      }
      return a; 
    }
	},
	mounted: function() {
		
	},
  computed:{
    cc: function(){
      return 'scope.row.'
    }
  },
	watch:{
	 
	}
};
</script>

<style scoped>
.lstyle {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
}
.pop{
  margin-bottom: 10px;
}
.el-table .cell {
  white-space: nowrap;
}
.el-table th>.cell {
  white-space: nowrap;
}
</style>
