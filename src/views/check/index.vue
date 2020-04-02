<template>
  <div class="layout">
    <!-- 弹出层 -->
    <base-dialog
      :dialogVisible="dialogVisible"
      @action="toggle"
      :title="'查验信息详情'"
    >
      <div v-for="(item, index) in panelList" :key="index * Math.random()">
        <component
          :is="'GreenCarPanel'"
          :obj="item"
          :index="index + 1"
          :total="panelList.length"
          @removeItem="removeFromPanelList"
        />
      </div>
      <!-- 查验数据审核面板 -->
    </base-dialog>
    <!-- 表单数据项 -->
    <car-tabs :cdata="TabsArray" @action="switchTabs"></car-tabs>
    <div :style="{ height: height - 22 + 'px' }">
      <!-- 数据列表 -->
      <xu-table
        :TableHeight="height - 20"
        :HeadList="HeaderList"
        :DataList="InspectionManagementDataList"
        @action="selectItem"
      />
    </div>
    <!-- 分页 -->
    <base-pagination
      :page="page.currentPage"
      :total="page.total"
      :pageSize="page.pageSize"
      @changeSize="changeSize"
      @changeCurPage="changeCurPage"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      panelList: []
    };
  },
  components: {
    CarTabs: () =>
      import(/* webpackChunkName: "subcheck" */ "../../components/common/Tabs"),
    BasePagination: () =>
      import(
        /* webpackChunkName: "subcheck" */ "../../components/common/pagination/basepagination"
      ),
    XuTable: () =>
      import(
        /* webpackChunkName: "subcheck" */ "../../components/common/XuTable"
      ),
    BaseDialog: () =>
      import(
        /* webpackChunkName: "subcheck" */ "../../components/common/XuDialog.vue"
      ),
    GreenCarPanel: () =>
      import(/* webpackChunkName: "subcheck" */ "./vehicle/greencarpanel")
  },
  mounted() {
    this.getInspectionManagementVehicleList();
  },
  computed: {
    ...mapState({
      height: state => state.common.layoutHgt - 32,
      page: state => state.InspectionManagement.InspectionManagementPage,
      InspectionManagementDataList: state =>
        state.InspectionManagement.InspectionManagementDataList,
      HeaderList: state => state.InspectionManagement.HeaderList,
      TabsArray: state => state.InspectionManagement.TabsArray
    })
  },
  methods: {
    ...mapActions({
      getInspectionManagementVehicleList: "getInspectionManagementVehicleList"
    }),
    switchTabs() {},
    // 审核结束后移除数据
    removeFromPanelList(e) {
      this.panelList.splice(
        this.panelList.findIndex(i => i.checkId === e),
        1
      );
      if (this.panelList.length <= 0) {
        this.toggle();
      }
    },
    selectItem(e) {
      this.toggle();
      this.panelList = e;
    },
    changeSize(e) {
      this.$store.commit("setInspectionManagementPageSize", e);
      this.getInspectionManagementVehicleList();
    },
    changeCurPage(e) {
      this.$store.commit("setInspectionManagementPagePage", e);
      this.getInspectionManagementVehicleList();
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    }
  }
};
</script>

<style scoped>
.layout {
  background-color: #fff;
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px;
}
</style>
