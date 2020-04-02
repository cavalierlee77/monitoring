<template>
  <div class="layout clear">
    <i-dialog
      :dialogVisible="dialogVisible"
      @action="dialogToggle"
      :diaStyle="diaStyle"
      :title="diaTitle"
    >
      <excel-details @exportExcel="getExcelData"></excel-details>
    </i-dialog>
    <query-box @action="selWithDate" @changeDl="changeDialog"></query-box>
    <div class="date-bar"></div>
    <car-tabs :cdata="cartabs" @action="ChangeTabs"></car-tabs>
    <div :style="{ height: height + 'px' }">
      <div></div>
      <i-table
        :TableHeight="height"
        :HeadList="HeadList"
        :DataList="reportdata"
        :seletcvisible="false"
        :actionvisible="false"
      ></i-table>
    </div>
    <xu-pagination
      @action="ChangePage"
      :page="page"
      :sortable="'false'"
    ></xu-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      excel: false,
      excelTypes: [],
      selectData: {},
      excelSelData: {},
      downExcData: {},
      diaStyle: {
        top: "100px",
        width: "750px"
      },
      diaTitle: "请选择导出项",
      checkedSheetsName: [],
      selDate: { beginTime: "", endTime: "" }
    };
  },
  components: {
    CarTabs: () =>
      import(/* webpackChunkName: "report" */ "../../common/Tabs.vue"),
    iDialog: () =>
      import(/* webpackChunkName: "report" */ "../../common/XuDialog.vue"),
    XuPagination: () =>
      import(/* webpackChunkName: "report" */ "../../common/XuPagination.vue"),
    iTable: () =>
      import(/* webpackChunkName: "report" */ "../../common/XuTable.vue"),
    QueryBox: () =>
      import(/* webpackChunkName: "report" */ "./_template/_querybox/Querybox"),
    ExcelDetails: () =>
      import(/* webpackChunkName: "report" */ "./_template/_querybox/Details")
  },
  computed: {
    ...mapState({
      cartabs: state => state.report.cartabs,
      height: state => state.common.layoutHgt - 114,
      reportdata: state => state.report.reportData,
      exceldata: state => state.report.ExcelData,
      nowTab: state => state.report.nowTab,
      HeadList: state => {
        const _type = state.report.nowTab;
        let _headerList = "GreenCarHeaderList";
        if (_type) {
          _headerList = state.report.repRelevance[_type].header;
        }
        return state.report[_headerList];
      },
      tabType: state => {
        const _type = state.report.nowTab;
        if (_type) {
          return state.report.repRelevance[_type];
        }
        return state.report.repRelevance.GreenCar;
      }
    }),
    page: function() {
      return this.$store.state.report[this.tabType.page];
    }
  },
  methods: {
    ChangeTabs(val) {
      this.$store.commit("setRepNowTab", val);
      this.getReportData(this.selDate);
    },
    ChangePage(val) {
      this.$store.commit("setRepNowPage", val);
      this.getReportData(this.selDate);
    },
    selWithDate(val) {
      this.selDate = Object.assign(val);
      this.getReportData(val);
    },
    getReportData(val) {
      const fm = this.setSelectData(val);
      this.$store.dispatch("getRepReportData", fm);
    },
    changeDialog(val) {
      this.excelSelData = this.setSelectData(val);
      this.excelSelData.pageSize = 65535;
      this.dialogToggle();
    },
    setSelectData(val = {}) {
      return {
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage,
        queryType: "1",
        ...val
      };
    },
    dialogToggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    getExcelData({ ichecked, ispecial }) {
      const fmdata = this.excelSelData;
      ichecked.forEach(type =>
        this.$store.dispatch("getRepExcelData", { fmdata, type })
      );
      let _n = 0;
      const _timer = setInterval(() => {
        _n++;
        if (this.exceldata && typeof this.exceldata === "object") {
          let _ready = true;
          ichecked.forEach(type => {
            if (!this.exceldata[type.name] || !this.exceldata[type.name].ready)
              _ready = false;
          });
          if (_ready) {
            this.downloadExcel(ispecial);
            clearInterval(_timer);
          }
        }
        if (_n === 40) {
          clearInterval(_timer);
        }
      }, 300);
    },
    downloadExcel(ispecial) {
      this.checkedSheetsName = [];
      const { exportJsonToExcelSheets } = require("@/vendor/Export2Excel");
      const setExcFnJson = {
        绿通车辆: "setGreenCarExcelData",
        集装箱车辆: "setTruckCarExcelData",
        联合收割机: "setCombineHarvCarExcelData",
        军警车辆: "setMilitaryCarExcelData",
        "消防、其他": "setDisasterCarExcelData"
      };
      const self = this;
      Object.keys(this.exceldata).forEach(key => self[setExcFnJson[key]]());
      const sheetNames = Object.keys(setExcFnJson).filter(key =>
        self.checkedSheetsName.includes(key)
      );
      if (ispecial.length > 0 && this.downExcData["绿通车辆"]) {
        this.downExcData = this.specialFn(this.downExcData, ispecial);
      }
      exportJsonToExcelSheets(this.downExcData, sheetNames);
      this.dialogToggle();
    },
    specialFn(data, contrast) {
      data["绿通车辆"].ExcData = data["绿通车辆"].ExcData.filter(
        excdata => excdata.goodsName === contrast[0].val
      );
      return data;
    },
    getExcelHeader(val) {
      const exheader = {};
      val.forEach(h => (exheader[h.name] = h.label));
      const filterVal = val.map(h => h.name);
      return { exheader, filterVal };
    },
    setDefaultExcData(header, sheetName, colWid, sumLetter) {
      const { exheader, filterVal } = this.getExcelHeader(header);
      let title = sheetName + "情况统计表";
      if (this.$store.state.common.loginUser.orgName)
        title = this.$store.state.common.loginUser.orgName + title;
      const ExcelData = this.exceldata[sheetName].data;
      const _date = {
        begin: this.excelSelData.beginTime,
        end: this.excelSelData.endTime
      };
      const _json = {
        ExcTitle: title,
        ExcData: ExcelData,
        ExcHeader: exheader,
        ExcFilterVal: filterVal,
        ExcColWid: colWid,
        ExcSheetName: sheetName,
        ExcTimerange: _date,
        ExcSumLetter: sumLetter
      };
      this.downExcData[sheetName] = _json;
    },
    setGreenCarExcelData() {
      const _header = this.$store.state.report.GreenCarHeaderList;
      const colWid = [125, 170, 210, 210, 100, 140, 130, 170, 150];
      const sheetName = "绿通车辆";
      const sumLetter = "G";
      this.checkedSheetsName.push(sheetName);
      this.setDefaultExcData(_header, sheetName, colWid, sumLetter);
    },
    setTruckCarExcelData() {
      const _header = this.$store.state.report.TruckCarHeaderList;
      const colWid = [
        125,
        170,
        210,
        210,
        90,
        90,
        90,
        110,
        110,
        120,
        120,
        120,
        110,
        140
      ];
      const sheetName = "集装箱车辆";
      const sumLetter = "K";
      this.checkedSheetsName.push(sheetName);
      this.setDefaultExcData(_header, sheetName, colWid, sumLetter);
    },
    setCombineHarvCarExcelData() {
      const _header = this.$store.state.report.CombineHarvCarHeaderList;
      const colWid = [125, 170, 210, 210, 100, 130, 120, 170, 150];
      const sheetName = "联合收割机";
      const sumLetter = "G";
      this.checkedSheetsName.push(sheetName);
      this.setDefaultExcData(_header, sheetName, colWid, sumLetter);
    },
    setMilitaryCarExcelData() {
      const _header = this.$store.state.report.MilitaryCarHeaderList;
      const colWid = [125, 170, 210, 100, 130, 120, 170, 150];
      const sheetName = "军警车辆";
      const sumLetter = "F";
      this.checkedSheetsName.push(sheetName);
      this.setDefaultExcData(_header, sheetName, colWid, sumLetter);
    },
    setDisasterCarExcelData() {
      const _header = this.$store.state.report.DisasterCarHeaderList;
      const colWid = [125, 170, 210, 210, 100, 120, 170, 150];
      const sheetName = "消防、其他";
      const sumLetter = "F";
      this.checkedSheetsName.push(sheetName);
      this.setDefaultExcData(_header, sheetName, colWid, sumLetter);
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
.date-bar {
  position: absolute;
  width: 100%;
  height: 10px;
  background-color: #eff1f4;
  left: 0;
  top: 84px;
}
.exc-dia {
  margin-top: 30px;
}
</style>
