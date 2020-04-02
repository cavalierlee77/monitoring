import api from "../../../static/js/MyAxios.js";

const state = {
  reportData: [],
  ExcelData: {},
  nowTab: "",
  repRelevance: {
    GreenCar: {
      page: "GreenCarpage",
      header: "GreenCarHeaderList",
      posturl: "report/getCheckRecordsByCons",
      cnName: "绿通车辆"
    },
    TruckCar: {
      page: "TruckCarpage",
      header: "TruckCarHeaderList",
      posturl: "report/getContainersByCons",
      cnName: "集装箱车辆"
    },
    CombineHarvCar: {
      page: "CombineHarvCarpage",
      header: "CombineHarvCarHeaderList",
      posturl: "report/getCombineHarvByCons",
      cnName: "联合收割机"
    },
    MilitaryCar: {
      page: "MilitaryCarpage",
      header: "MilitaryCarHeaderList",
      posturl: "report/getMilitaryByCons",
      cnName: "军警车辆"
    },
    DisasterCar: {
      page: "DisasterCarpage",
      header: "DisasterCarHeaderList",
      posturl: "report/getDisasterByCons",
      cnName: "消防、其他"
    }
  },
  cartabs: [
    {
      cname: "绿通车辆",
      ename: "GreenCar",
      active: true,
      count: -1
    },
    {
      cname: "集装箱车辆",
      ename: "TruckCar",
      active: false,
      count: -1
    },
    {
      cname: "联合收割机",
      ename: "CombineHarvCar",
      active: false,
      count: -1
    },
    {
      cname: "军警车辆",
      ename: "MilitaryCar",
      active: false,
      count: -1
    },
    {
      cname: "消防、其他",
      ename: "DisasterCar",
      active: false,
      count: -1
    }
  ],
  // 绿通
  GreenCarpage: {
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  // 集装箱
  TruckCarpage: {
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  // 联合收割机
  CombineHarvCarpage: {
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  // 军警
  MilitaryCarpage: {
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  // 救援抢险及其他
  DisasterCarpage: {
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  // 绿通
  GreenCarHeaderList: [
    {
      label: "车牌号码",
      name: "plateNumber",
      hide: false
    },
    {
      label: "验货人",
      name: "checkorName",
      hide: false
    },
    {
      label: "入口站",
      name: "enteName",
      hide: false
    },
    {
      label: "时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "实际吨位",
      name: "totalWeight",
      hide: false
    },
    {
      label: "货物名称",
      name: "goodsName",
      hide: false
      // theadType: 'filters'
    },
    {
      label: "免费金额(元)",
      name: "amountReceivable",
      hide: false
    },
    {
      label: "出口收费员",
      name: "tollId",
      hide: false
    },
    {
      label: "联系方式",
      name: "driverPhoneNumber",
      hide: false
    }
  ],
  // 集装箱
  TruckCarHeaderList: [
    {
      label: "车牌号码",
      name: "plateNumber",
      hide: false
    },
    {
      label: "验货人",
      name: "checkorName",
      hide: false
    },
    {
      label: "入口站",
      name: "entryStatName",
      hide: false
    },
    {
      label: "时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "重量",
      name: "wholeTruckWeight",
      hide: false
    },
    {
      label: "车道",
      name: "lane",
      hide: false
    },
    {
      label: "轴数",
      name: "axisNum",
      hide: false
    },
    {
      label: "箱体代码",
      name: "boxTypeCode",
      hide: false
    },
    {
      label: "箱体尺寸",
      name: "boxSize",
      hide: false
    },
    {
      label: "应收金额(元)",
      name: "amountReceivable",
      hide: false
    },
    {
      label: "优惠金额(元)",
      name: "discountAmount",
      hide: false
    },
    {
      label: "实收金额(元)",
      name: "receiveAmount",
      hide: false
    },
    {
      label: "司机姓名",
      name: "driverName",
      hide: false
    },
    {
      label: "联系方式",
      name: "driverPhoneNumber",
      hide: false
    }
  ],
  // 联合收割机
  CombineHarvCarHeaderList: [
    {
      label: "车牌号码",
      name: "plateNumber",
      hide: false
    },
    {
      label: "验货人",
      name: "checkorName",
      hide: false
    },
    {
      label: "入口站",
      name: "entryStatName",
      hide: false
    },
    {
      label: "时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "实际吨位",
      name: "truckWeight",
      hide: false
    },
    {
      label: "作业证号",
      name: "jobId",
      hide: false
    },
    {
      label: "免费金额(元)",
      name: "discountAmount",
      hide: false
    },
    {
      label: "出口收费员",
      name: "tollId",
      hide: false
    },
    {
      label: "联系方式",
      name: "driverPhoneNumber",
      hide: false
    }
  ],
  // 军警
  MilitaryCarHeaderList: [
    {
      label: "车牌号码",
      name: "plateNumber",
      hide: false
    },
    {
      label: "验货人",
      name: "checkorName",
      hide: false
    },
    {
      label: "时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "实际吨位",
      name: "wholeTruckWeight",
      hide: false
    },
    {
      label: "部队番号",
      name: "designNtion",
      hide: false
    },
    {
      label: "免费金额(元)",
      name: "discountAmount",
      hide: false
    },
    {
      label: "出口收费员",
      name: "tollId",
      hide: false
    },
    {
      label: "联系方式",
      name: "driverPhoneNumber",
      hide: false
    }
  ],
  // 救援抢险及其他
  DisasterCarHeaderList: [
    {
      label: "车牌号码",
      name: "plateNumber",
      hide: false
    },
    {
      label: "验货人",
      name: "checkorName",
      hide: false
    },
    {
      label: "入口站",
      name: "entryStatName",
      hide: false
    },
    {
      label: "时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "实际吨位",
      name: "wholeTruckWeight",
      hide: false
    },
    {
      label: "免费金额(元)",
      name: "discountAmount",
      hide: false
    },
    {
      label: "出口收费员",
      name: "tollId",
      hide: false
    },
    {
      label: "联系方式",
      name: "driverPhoneNumber",
      hide: false
    }
  ]
};

// getters
const getters = {};

// actions
const actions = {
  getRepReportData({ commit, state }, fmdata) {
    const posturl = state.repRelevance[state.nowTab].posturl;
    commit("setRepReportData", []);
    return new Promise((resolve, reject) => {
      api.post(posturl, fmdata, res => {
        if (res.resultCode == "100") {
          commit("setRepTotal", res.page.rows);
          commit("setRepReportData", res.resultData);
          resolve();
        } else {
          reject();
        }
      });
    });
  },
  getRepExcelData({ commit, state }, { fmdata, type }) {
    const posturl = state.repRelevance[type.val].posturl;
    commit("clearRepExcelData");
    return new Promise((resolve, reject) => {
      api.post(posturl, fmdata, res => {
        if (res.resultCode == "100") {
          const data = res.resultData;
          commit("setRepExcelData", { type, data });
          resolve();
        } else {
          reject();
        }
      });
    });
  }
};

// mutations
const mutations = {
  setRepReportData(state, data) {
    state.reportData = data;
  },
  clearRepExcelData() {
    state.ExcelData = [];
  },
  setRepExcelData(state, { type, data }) {
    state.ExcelData[type.name] = {
      ready: true,
      data: data
    };
  },
  setRepTotal(state, data) {
    state[state.repRelevance[state.nowTab].page].Total = data;
  },
  setRepNowTab(state, data) {
    state.nowTab = data;
  },
  setRepNowPage(state, data) {
    state[state.repRelevance[state.nowTab].page].currentPage = data.currentPage;
    state[state.repRelevance[state.nowTab].page].pageSize = data.pageSize;
  },
  setRepStatusList(state, data) {
    state.statusList = data;
  },
  setRepGoodsList(state, data) {
    state.goodsList = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
