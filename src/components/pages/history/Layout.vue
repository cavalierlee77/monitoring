<template>
  <div class="layout clear">
    <i-dialog
      :title="'查验信息详情'"
      :dialogVisible="dialogVisible"
      @action="dialogToggle"
    >
      <checked-details
        v-for="(checked, index) in checkedList"
        :key="index"
        :iDetail="checked"
        :detTitle="index + 1 + ' / ' + checkedList.length"
      ></checked-details>
    </i-dialog>
    <car-tabs :cdata="cartabs" @action="ChangeTabs"></car-tabs>
    <green-qb
      v-show="nowTab == 'GreenCar'"
      @action="getHistoryData"
      @changeHei="changeQueryHeight"
    ></green-qb>
    <truck-qb
      v-show="nowTab == 'TruckCar'"
      @action="getHistoryData"
      @changeHei="changeQueryHeight"
    ></truck-qb>
    <combineHarv-qb
      v-show="nowTab == 'CombineHarvCar'"
      @action="getHistoryData"
      @changeHei="changeQueryHeight"
    ></combineHarv-qb>
    <military-qb
      v-show="nowTab == 'MilitaryCar'"
      @action="getHistoryData"
      @changeHei="changeQueryHeight"
    ></military-qb>
    <disaster-qb
      v-show="nowTab == 'DisasterCar'"
      @action="getHistoryData"
      @changeHei="changeQueryHeight"
    ></disaster-qb>
    <div
      :style="{
        height:
          height -
          (resizeQueryHeight[nowTab] ? resizeQueryHeight[nowTab] : 0) +
          'px'
      }"
    >
      <div></div>
      <i-table
        :TableHeight="
          height - (resizeQueryHeight[nowTab] ? resizeQueryHeight[nowTab] : 0)
        "
        :HeadList="HeadList"
        :DataList="historydata"
        @action="getCheckedData"
      ></i-table>
    </div>
    <xu-pagination @action="ChangePage" :page="page"></xu-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      resizeQueryHeight: {},
      dialogVisible: false,
      checkedList: [],
      selData: {}
    };
  },
  components: {
    CarTabs: () =>
      import(/* webpackChunkName: "history" */ "../../common/Tabs.vue"),
    iDialog: () =>
      import(/* webpackChunkName: "history" */ "../../common/XuDialog.vue"),
    XuPagination: () =>
      import(/* webpackChunkName: "history" */ "../../common/XuPagination.vue"),
    iTable: () =>
      import(/* webpackChunkName: "history" */ "../../common/XuTable.vue"),
    GreenQb: () =>
      import(
        /* webpackChunkName: "history" */ "./_template/_querybox/GreenQuerybox.vue"
      ),
    TruckQb: () =>
      import(
        /* webpackChunkName: "history" */ "./_template/_querybox/TruckQuerybox.vue"
      ),
    CombineHarvQb: () =>
      import(
        /* webpackChunkName: "history" */ "./_template/_querybox/CombineHarvQuerybox.vue"
      ),
    MilitaryQb: () =>
      import(
        /* webpackChunkName: "history" */ "./_template/_querybox/MilitaryQuerybox.vue"
      ),
    DisasterQb: () =>
      import(
        /* webpackChunkName: "history" */ "./_template/_querybox/DisasterQuerybox.vue"
      ),
    CheckedDetails: () =>
      import(/* webpackChunkName: "history" */ "./_template/_details/Details")
  },
  computed: {
    ...mapState({
      cartabs: state => state.history.cartabs,
      height: state => state.common.layoutHgt - 114,
      historydata: state => state.history.historyData,
      nowTab: state => state.history.nowTab,
      tabType: state =>
        state.history.nowTab
          ? state.history.hisRelevance[state.history.nowTab]
          : state.history.hisRelevance.GreenCar,
      HeadList: state =>
        state.history.nowTab
          ? state.history[
              state.history.hisRelevance[state.history.nowTab].header
            ]
          : state.history.GreenCarHeaderList
    }),
    page: function() {
      return this.$store.state.history[this.tabType.page];
    }
  },
  methods: {
    ChangeTabs(val) {
      this.$store.commit("setHisNowTab", val);
      if (Object.is(this.selData[val], undefined)) {
        this.selData[val] = { beginTime: "", endTime: "" };
      }
      this.getHistoryData(this.selData[val]);
    },
    ChangePage(val) {
      this.$store.commit("setHisNowPage", val);
      this.getHistoryData(this.selData[this.nowTab]);
    },
    getHistoryData(val = {}) {
      for (const [k, v] of Object.entries(val)) {
        if (
          Object.is(this.selData[this.nowTab][k], undefined) ||
          !Object.is(this.selData[this.nowTab][k], v)
        ) {
          const _page = { currentPage: 1, pageSize: this.page.pageSize };
          this.$store.commit("setHisNowPage", _page);
          break;
        }
      }
      this.selData[this.nowTab] = Object.assign({}, val);
      const fm = {
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage,
        queryType: "1",
        ...val
      };
      this.$store.dispatch("getHisHistoryData", fm);
    },
    changeQueryHeight(val = 0, tab = this.nowTab) {
      this.$set(this.resizeQueryHeight, this.nowTab, val);
    },
    getCheckedData(val) {
      this.checkedList = val.concat();
      this.dialogToggle();
    },
    dialogToggle() {
      this.dialogVisible = !this.dialogVisible;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.layout {
  background-color: #fff;
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px;
}
.cut_time_info {
  margin: 0;
  background-color: #f0f9eb;
  color: #67c23a;
  font-size: 15px;
  width: 100%;
  padding: 8px 16px;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  vertical-align: middle;
  transition: opacity 0.2s;
  margin-bottom: 10px;
}
.cut_time_info .left {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cut_time_info .right {
  cursor: pointer;
  font-size: 20px;
  float: right;
}
.cut_time_info p {
  margin: 0px 20px 0px 10px;
}
</style>
