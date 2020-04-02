<template>
  <div 
    class="wechat-bill-layout" >
    <!-- 弹出审核面板 -->
    <xu-dialog 
      :dialogVisible="dialogVisible" 
      @action='toggleDialog' 
      :title="'车辆信息详情'">
      <!-- 查验数据审核面板 -->
      <xu-bill-item
        v-for="(item,index) in selectRowsList"
        :index="index"
        :totalNum="selectRowsList.length"
        :key="index"
        :item="item">
      </xu-bill-item>
    </xu-dialog>
    <!-- 车辆Tabs -->
    <!-- tab标签 -->
    <xu-tabs 
      :cdata='tabList'>
    </xu-tabs>
    <section
      :style="{ height: height+ 32 + 'px' }">
      <!-- 数据列表 -->
      <xu-table 
        :TableHeight="height" 
        :HeadList="wechatBillHeaderList" 
        :DataList="tableItemLists" 
        @action="selectRows">
      </xu-table>
      <!-- 分页 -->
      <xu-pagination 
        @action='switchPage' 
        :page="wechatBillPage">
      </xu-pagination>
    </section>
  </div>
</template>

<script>
import { mixMethods } from '../mixin/mixin.js'
//引入组件
import xuPagination from '../../../common/XuPagination.vue'
import xuDialog from '../../../common/XuDialog.vue'
import xuTable from '../../../common/XuTable.vue'
import xuBillItem from '../panelItem/subItem/billItem'
import xuTabs from '../../../common/Tabs.vue'

import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: '',
  mixins: [mixMethods],
  data() {
    return {
      dialogVisible: false,
      selectRowsList: []
    }
  },
  components: {
    //注册组件
    xuPagination,
    xuDialog,
    xuTable,
    xuBillItem,
    xuTabs
  },
  computed: {
    ...mapState({
      height: state => state.common.layoutHgt - 32 ,
      tabList: state => state.wechatBill.tabList ,
      tableItemList: state => state.wechatBill.tableItemList
    }),
    ...mapGetters([
      'wechatBillHeaderList',
      'wechatBillPage'
    ]),
    tableItemLists: function(){
      return this.covertStatus(this.tableItemList)
    }
  },
  mounted() {
    //初始化data
    this.getWechatBills()
  },
  methods: {
    //调用store中getWechatVechicleInfos方法获取数据
    ...mapActions([
      'getWechatBills',
    ]),
    //切换dialog
    toggleDialog(){
      this.dialogVisible = !this.dialogVisible;
    },
    switchPage(){

    },
    //选择行数据
    selectRows(e){
      this.toggleDialog();
      this.selectRowsList = e
    }
  },
}
</script>

<style scoped>
.wechat-bill-layout {
  background-color: #fff;
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px;
}

</style>
