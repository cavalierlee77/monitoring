<template>
  <div 
    class="wechat-vechicle-layout">
    <!-- 弹出审核面板 -->
    <xu-dialog 
      :dialogVisible="dialogVisible" 
      @action='toggleDialog' 
      :title="'车辆信息详情'">
      <!-- 查验数据审核面板 -->
      <xu-vechicle-item
        v-for="(item,index) in selectRowsList"
        :index="index"
        :totalNum="selectRowsList.length"
        :key="index"
        :item="item">
      </xu-vechicle-item>
    </xu-dialog>
    <!-- tab标签 -->
    <xu-tabs 
      :cdata='tabList'>
    </xu-tabs>
    <!-- 车辆Tabs -->
    <section 
      :style="{ height: height+ 32 + 'px' }">
      <xu-query></xu-query>
      <!-- 数据列表 -->
      <xu-table 
        :TableHeight="height - 60" 
        :HeadList="wechatVechicleHeaderList" 
        :DataList="tableItemLists" 
        @action="selectRows">
      </xu-table>
      <!-- 分页 -->
      <xu-pagination 
        @action='switchPage' 
        :page="wechatVechiclePage">
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
import xuVechicleItem from '../panelItem/subItem/vechicleItem'
import xuTabs from '../../../common/Tabs.vue'
import xuQuery from '../queryPanel/vechicleSearchPanel.vue'
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
    xuVechicleItem,
    xuTabs,
    xuQuery
  },
  computed: {
    ...mapState({
      height: state => state.common.layoutHgt -32 ,
      tabList: state => state.wechatVechicle.tabList ,
      tableItemList: state => state.wechatVechicle.tableItemList
    }),
    ...mapGetters([
      'wechatVechicleHeaderList',
      'wechatVechiclePage'
    ]),
    tableItemLists: function(){
      return this.covertStatus(this.tableItemList)
    }
  },
  mounted() {
    //初始化data
    this.getWechatVechicleInfos()
  },
  methods: {
    //调用store中getWechatVechicleInfos方法获取数据
    ...mapActions([
      'getWechatVechicleInfos',
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
.wechat-vechicle-layout {
  background-color: #fff;
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px;
}
</style>
