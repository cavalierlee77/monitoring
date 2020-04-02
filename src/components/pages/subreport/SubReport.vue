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
    <query-box
      @action="selWithDate"
      @changeDl="changeDialog"
      @changeRadio="radioChange"
    ></query-box>
    <div class="date-bar"></div>
    <car-tabs :cdata="cartabs" @action="ChangeTabs"></car-tabs>
    <div :style="{ height: (reTableHeight[reportType] || tableHeight) + 'px' }">
      <div></div>
      <i-table
        :TableHeight="reTableHeight[reportType] || tableHeight"
        :HeadList="HeadList[reportType]"
        :DataList="reSubReportData[reportType] || []"
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
        selDate: { beginTime: "", endTime: "" },
        reportType: "stat",
        HeadList: [],
        page: [],
        reportData: [],
        reSubReportData: {},
        reTableHeight: {},
        excelChecked: [],
        excelSpecial: [],
        sheetPartName: {
          stat: "统计",
          detail: "详细"
        }
      };
    },
    components: {
      CarTabs: () =>
        import(/* webpackChunkName: "common" */ "../../common/Tabs.vue"),
      iDialog: () =>
        import(/* webpackChunkName: "common" */ "../../common/XuDialog.vue"),
      XuPagination: () =>
        import(
          /* webpackChunkName: "common" */ "../../common/XuPagination.vue"
        ),
      iTable: () =>
        import(/* webpackChunkName: "common" */ "../../common/XuTable.vue"),
      QueryBox: () =>
        import(
          /* webpackChunkName: "subreport" */ "./_template/_querybox/Querybox"
        ),
      ExcelDetails: () =>
        import(
          /* webpackChunkName: "subreport" */ "./_template/_querybox/Details"
        )
    },
    computed: {
      ...mapState({
        cartabs: state => state.subreport.cartabs,
        tableHeight: state => state.common.layoutHgt - 184,
        reportdata: state => state.subreport.reportData,
        subReportData: state => state.subreport.subReportData,
        exceldata: state => state.subreport.ExcelData,
        nowTab: state => state.subreport.nowTab,
        subRepRelevance: state => state.subreport.repRelevance
      })
    },
    methods: {
      ChangeTabs(val) {
        this.$store.commit("setRepNowTab", val);
        this.getSubReportData(this.selDate);
      },
      ChangePage(val) {
        this.$store.commit("setRepNowPage", val);
        this.getSubReportData(this.selDate);
      },
      selWithDate(val) {
        this.selDate = Object.assign(val);
        this.getSubReportData(val);
      },
      getSubReportData(val) {
        const fm = this.setSelectData(val);
        this.$store.dispatch("getSubReportData", fm);
      },
      getSubReportAllRole() {
        this.$store.dispatch("getSubReportAllRole");
      },
      changeDialog(val) {
        this.excelSelData = this.setSelectData(val);
        this.excelSelData.pageSize = 100;
        // this.excelSelData.pageSize = 65535;
        this.dialogToggle();
      },
      radioChange(val) {
        this.reportType = val;
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
        this.$store.commit("clearSubRepExcelData");
        this.excelChecked = ichecked;
        this.excelSpecial = ispecial;
        ichecked.forEach(type => {
          this.$store.dispatch("getSubRepExcelData", { fmdata, type });
        });
      },
      downloadReady(val) {
        const checkedKeys = Object.keys(val);
        if (
          checkedKeys.length !== 0 &&
          checkedKeys.length === this.excelChecked.length
        ) {
          for (const key in val) {
            const data = val[key];
            if (Object.keys(data.data).length !== 2) {
              return;
            }
          }
          let _ready = true;
          this.excelChecked.forEach(type => {
            if (
              !this.exceldata[type.name] ||
              this.exceldata[type.name].ready == false
            ) {
              _ready = false;
            }
          });
          if (_ready === true) {
            this.downloadExcel();
          }
        }
      },
      downloadExcel() {
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
        const sheetPartNames = [];
        sheetNames.forEach(name => {
          Object.values(this.sheetPartName).forEach(part => {
            sheetPartNames.push(name + part);
          });
        });
        if (this.excelSpecial.length > 0 && this.downExcData["绿通车辆"]) {
          this.downExcData = this.specialFn(
            this.downExcData,
            this.excelSpecial
          );
        }
        exportJsonToExcelSheets(this.downExcData, sheetPartNames);
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
      setDefaultExcData(header, sheetName, colWid, sumLetter, dataType) {
        const { exheader, filterVal } = this.getExcelHeader(header);
        let title = sheetName + "情况统计表";
        if (this.$store.state.common.loginUser.orgName) {
          title = this.$store.state.common.loginUser.orgName + title;
        }
        const ExcelData = this.exceldata[sheetName].data[dataType];
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
          ExcSheetName: sheetName + this.sheetPartName[dataType],
          ExcTimerange: _date,
          ExcSumLetter: sumLetter
        };
        this.downExcData[sheetName + this.sheetPartName[dataType]] = _json;
      },
      setGreenCarExcelData() {
        const _header = this.$store.state.subreport.GreenCarHeaderList;
        // const colWid = [];
        const sheetName = "绿通车辆";
        const sumLetter = "G";
        this.checkedSheetsName.push(sheetName);
        Object.entries(_header).forEach(([key, header]) => {
          const colWid = [];
          Object.values(header).forEach(item => {
            colWid.push(item.wid);
          });
          this.setDefaultExcData(header, sheetName, colWid, sumLetter, key);
        });
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
      },
      resetDefaultData() {
        const _type = this.nowTab || "GreenCar";
        const tabType = this.subRepRelevance[_type];
        this.HeadList = this.$store.state.subreport[tabType.header];
        this.page = this.$store.state.subreport[tabType.page];
      },
      resetSubReportData(val) {
        this.reSubReportData = { ...val };
      },
      resetTableHeight(val) {
        this.reTableHeight = {
          stat: this.tableHeight,
          detail: this.tableHeight - 1
        };
      }
    },
    mounted() {
      this.getSubReportAllRole();
      // this.getSubReportData();
      this.resetDefaultData();
      this.resetTableHeight();
      setTimeout(() => {
        this.resetTableHeight();
      }, 10);
    },
    watch: {
      subReportData: {
        handler(val) {
          this.resetSubReportData(val);
        },
        immediate: true,
        deep: true
      },
      exceldata: {
        handler(val, oldVal) {
          this.downloadReady(val);
        },
        deep: true
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
