<template>
  <div class="layout clear">
    <!-- 弹出审核面板 -->
    <xu-dialog
      :dialogVisible="dialogVisible"
      @action="togglePanel"
      :title="'查验信息详情'"
      v-if="NowSubMenu != 'addedTollList'"
    >
      <!-- 查验数据审核面板 -->
      <check-layout
        v-for="(item, index) in panelLists"
        :dialogVisible="dialogVisible"
        :panelItem="item"
        @action="refrashCheck"
        :key="index"
        :Xindex="index"
        :Xsum="Xsum"
      >
      </check-layout>
    </xu-dialog>
    <xu-dialog
      :dialogVisible="dialogVisible"
      @action="togglePanel"
      :title="'废弃数据项'"
      v-if="NowSubMenu == 'addedTollList'"
    >
      <!-- 收费数据审核面板 -->
      <toll-layout :tablelist="panelLists" @action="refrashToll"> </toll-layout>
    </xu-dialog>
    <!-- 车辆Tabs -->
    <car-tabs :cdata="cartabs" @action="ChangeTabs"></car-tabs>
    <div :style="{ height: height + 'px' }">
      <!-- 二级菜单路由 -->
      <router-view @action="getcheckdata"> </router-view>
      <!-- 数据列表 -->
      <xu-table
        :TableHeight="minheight"
        :HeadList="HeaderList"
        :DataList="checkdata"
        @action="setPanelData"
      >
      </xu-table>
    </div>
    <!-- 分页 -->
    <xu-pagination @action="ChangePage" :page="page"></xu-pagination>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "",
  data() {
    return {
      keyword: "ctabs",
      dialogVisible: false,
      refrashFlag: false,
      panelLists: [],
      Xsum: 0,
      content_height: 0
    };
  },
  components: {
    CarTabs: () =>
      import(/* webpackChunkName: "check" */ "../../common/Tabs.vue"),
    XuDialog: () =>
      import(/* webpackChunkName: "check" */ "../../common/XuDialog.vue"),
    CheckLayout: () =>
      import(/* webpackChunkName: "check" */ "./panel/checkLayout.vue"),
    TollLayout: () =>
      import(/* webpackChunkName: "check" */ "./panel/tollLayout.vue"),
    XuPagination: () =>
      import(/* webpackChunkName: "check" */ "../../common/XuPagination.vue"),
    XuTable: () =>
      import(/* webpackChunkName: "check" */ "../../common/XuTable.vue")
  },
  computed: {
    ...mapState({
      cartabs: state => state.check.checktabs,
      height: state => state.common.layoutHgt - 32,
      checkdata: state => state.check.checkdata,
      TollCutOffTime: state => state.check.TollCutOffTime,
      nowTab: state => state.check.nowTab
    }),
    ...mapGetters(["HeaderList", "page", "NowSubMenu"]),
    minheight() {
      return this.height - this.content_height;
    }
  },
  methods: {
    // 切换tabs,刷新数据
    ChangeTabs(val) {
      this.$store.commit("setchkNowTab", val);
      this.getcheckdata();
    },
    // 切换分页，查询当前页面数据
    ChangePage(val) {
      this.$store.commit("setchkNowPage", val);
      this.getcheckdata();
    },
    // 调用vuex中封装的接口,刷新数据
    getcheckdata() {
      const fm = {
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage
      };
      this.$store.dispatch("getchkcheckdata", fm);
    },
    // 获取选择的列表中的数据存入审核面板元数据中
    setPanelData(val) {
      this.panelLists = [];
      for (let i = 0; i < val.length; i++) {
        this.panelLists.push(val[i]);
      }
      this.Xsum = val.length;
      this.togglePanel();
    },
    // 切换审核面板显隐
    togglePanel() {
      this.dialogVisible = !this.dialogVisible;
    },
    // 标记是否存在数据提交
    refrashCheck(val) {
      // 标记模态框关闭后是否刷新数据
      this.refrashFlag = true;
    },
    // 标记收费数据后执行动作
    refrashToll(val) {
      if (val) {
        this.refrashFlag = true;
        this.togglePanel();
      } else {
        this.togglePanel();
      }
    }
  },
  mounted() {
    // 页面挂载时获取货物列表
    this.$store.dispatch("getchkGoodsList");
  },
  watch: {
    dialogVisible(val) {
      // 当有提交审核数据成功后在关闭模态框后刷新数据
      if (!this.dialogVisible && this.refrashFlag) {
        this.getcheckdata();
        this.refrashFlag = false;
      }
    },
    NowSubMenu(val) {
      val === "offLimitsList"
        ? (this.content_height = 49)
        : (this.content_height = 0);
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
