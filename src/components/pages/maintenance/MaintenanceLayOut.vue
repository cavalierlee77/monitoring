<template>
  <div class="maintenance-Wrapper">
    <div class="add-edit-panel" v-if="showPanel">
      <el-button @click="close" size="small">关闭{{ label }}</el-button>
      <a-e-panel
        @close="close"
        v-for="(item, index) in editdataList"
        :index="index + 1"
        :total="editdataList.length"
        :key="index"
        :editrowdata="item"
        :label="label"
      ></a-e-panel>
    </div>
    <div class="add-check-data-btn" v-if="!showPanel">
      <el-button @click="addBtn" size="small">添加查验信息</el-button>
    </div>
    <div class="search-panel" v-if="!showPanel">
      <search-panel @getCheckRecords="getCheckRecords"></search-panel>
    </div>
    <div class="data-table" v-if="!showPanel">
      <data-table
        @editrows="editrows"
        :dataList="dataList"
        :dataHeadList="dataHeadList"
      ></data-table>
    </div>
    <xu-pagination v-if="!showPanel"></xu-pagination>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      label: "",
      showPanel: false,
      dataList: [],
      editdataList: [],
      dataHeadList: [
        {
          label: "机构",
          name: "orgName",
          hide: false
        },
        {
          label: "查验人员",
          name: "checkorName",
          hide: true
        },
        {
          label: "查验时间",
          name: "checkTime",
          hide: false
        },
        {
          label: "车牌号码",
          name: "plateNumber",
          hide: false
        },
        {
          label: "车牌颜色",
          name: "plateColor",
          hide: true
        },
        {
          label: "司机电话",
          name: "driverPhoneNumber",
          hide: true
        },
        {
          label: "货物名称",
          name: "goodsName",
          hide: false
        },
        {
          label: "查验结论",
          name: "isGcTrunckName",
          hide: false
        },
        {
          label: "计重(吨)",
          name: "wholeTruckWeight",
          hide: true
        },
        {
          label: "应收金额(元)",
          name: "amountReceivable",
          hide: false
        },
        {
          label: "审核状态",
          name: "verifyStatusName",
          hide: false
        },
        {
          label: "审核意见",
          name: "verifySuggestSelect",
          hide: true
        }
      ]
    };
  },
  components: {
    // 注册模板
    searchPanel: () =>
      import(/* webpackChunkName: "maintenance" */ "./subpage/searchPanel"),
    AEPanel: () =>
      import(/* webpackChunkName: "maintenance" */ "./subpage/AEPanel"),
    DataTable: () =>
      import(/* webpackChunkName: "maintenance" */ "./subpage/DataTable"),
    XuPagination: () =>
      import(
        /* webpackChunkName: "maintenance" */ "../../common/XuPagination.vue"
      )
  },
  methods: {
    // 关闭页面
    close() {
      this.editdataList = [];
      this.label = "";
      this.showPanel = false;
    },
    // 添加查验信息,展开添加页面
    addBtn() {
      this.editdataList = [{ em: true }];
      this.label = "添加页面";
      this.showPanel = true;
    },
    // 修改查验数据,添加数据到修改页面
    editrows(val) {
      for (let i = 0; i < val.length; i++) {
        this.editdataList.push(val[i]);
      }
      this.label = "修改页面";
      this.showPanel = true;
    },
    // 获取查验记录
    getCheckRecords() {
      const self = this;
      const vuexformdata = {
        stationMasterMark: this.$store.state.page.stationMasterMark,
        pageSize: this.$store.state.page.ppagesize,
        currentPage: this.$store.state.page.currentPage,
        beginTime: this.$store.state.searchdata.beginTime,
        endTime: this.$store.state.searchdata.endTime,
        goods: this.$store.state.searchdata.goods,
        plateNumber: this.$store.state.searchdata.plateNumber,
        minCharge: this.$store.state.searchdata.minCharge,
        maxCharge: this.$store.state.searchdata.maxCharge,
        verifyStatus: this.$store.state.searchdata.verifyStatus,
        orgId: this.$store.state.searchdata.orgId
      };
      this.$api.post("webcheck/getCheckRecords", vuexformdata, res => {
        if (res.resultCode == "100") {
          const Initialdata = res.resultData;
          self.dataList = [];
          if (Initialdata.length > 0) {
            for (let i = 0; i < Initialdata.length; i++) {
              // 数组对象初始化
              self.dataList[i] = {};
              // 添加文本数据
              self.dataList[i] = {
                checkId: Initialdata[i].checkId,
                orgId: Initialdata[i].orgId,
                orgName: Initialdata[i].orgName,
                checkor: Initialdata[i].checkor,
                checkorName: Initialdata[i].checkorName,
                checkTime: Initialdata[i].checkTime,
                plateNumber: Initialdata[i].plateNumber,
                plateColor: Initialdata[i].plateColor,
                driverPhoneNumber: Initialdata[i].driverPhoneNumber,
                isGcTrunck: Initialdata[i].isGcTrunck,
                isGcTrunckName: Initialdata[i].isGcTrunckName,
                goodsName: Initialdata[i].goodsName,
                wholeTruckWeight: Initialdata[i].wholeTruckWeight,
                amountReceivable: Initialdata[i].amountReceivable,
                verifyStatus: Initialdata[i].verifyStatus,
                verifyStatusName: Initialdata[i].verifyStatusName
                // verifySuggestSelect: Initialdata[i].verifySuggestSelect,
              };
              self.dataList[i].picdata = [];
              // 服务器图片处理
              if (Initialdata[i].picSource == "1") {
                // 添加其他图片
                if (
                  Initialdata[i].otherPics &&
                  Initialdata[i].otherPics != ""
                ) {
                  const url1 = Initialdata[i].otherPics.split(";");
                  for (let k = 0; k < url1.length; k++) {
                    self.dataList[i].picdata.push(
                      self.$url + url1[k] + "?" + Math.random()
                    );
                  }
                }
                // 添加行驶证图片
                // if(Initialdata[i].driLicenseCopyPics && driLicenseCopyPics != ""){
                //   let url2 = Initialdata[i].driLicenseCopyPics;
                //   self.dataList[i].picdata.push(self.$url+url2+"?"+Math.random());
                // };
                if (
                  Initialdata[i].driLicenseCopyPics &&
                  Initialdata[i].driLicenseCopyPics != ""
                ) {
                  const url2 = Initialdata[i].driLicenseCopyPics.split(";");
                  for (let j = 0; j < url2.length; j++) {
                    self.dataList[i].picdata.push(
                      self.$url + url2[j] + "?" + Math.random()
                    );
                  }
                }
              } else {
                // 对象存储图片处理
                // 添加其他图片
                if (
                  Initialdata[i].otherPics &&
                  Initialdata[i].otherPics != ""
                ) {
                  const url1 = Initialdata[i].otherPics.split(";");
                  for (let ii = 0; ii < url1.length; ii++) {
                    self.dataList[i].picdata.push(
                      self.$csurl +
                        url1[ii] +
                        "!sl?sign=" +
                        Initialdata[i].sign +
                        "?" +
                        Math.random()
                    );
                  }
                }
                // 添加行驶证让图片
                if (
                  Initialdata[i].driLicenseCopyPics &&
                  Initialdata[i].driLicenseCopyPics != ""
                ) {
                  const url2 = Initialdata[i].driLicenseCopyPics;
                  self.dataList[i].picdata.push(
                    self.$csurl +
                      url2 +
                      "!sl?sign=" +
                      Initialdata[i].sign +
                      "?" +
                      Math.random()
                  );
                }
                // 添加站长审核图片
                if (
                  Initialdata[i].stationMasterPics &&
                  Initialdata[i].stationMasterPics != ""
                ) {
                  const url3 = Initialdata[i].stationMasterPics;
                  self.dataList[i].picdata.push(
                    self.$csurl +
                      url3 +
                      "!sl?sign=" +
                      Initialdata[i].sign +
                      "?" +
                      Math.random()
                  );
                }
              }
            }
          }
        } else {
        }
      });
    }
  },
  mounted: function() {
    this.getCheckRecords();
  }
};
</script>

<style scoped>
.maintenance-Wrapper {
  height: 100%;
  margin: 10px 10px 10px 10px;
  padding: 0px 10px 0px 10px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
}
.add-check-data-btn {
  position: relative;
  text-align: left;
  padding: 5px 0px 5px 0px;
}
.search-panel {
  position: relative;
}
</style>
