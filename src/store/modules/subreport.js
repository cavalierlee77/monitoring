import api from "../../../static/js/MyAxios.js";

const state = {
  reportRoleInfo: [],
  subReportData: {},
  reportData: [],
  ExcelData: {},
  nowTab: "",
  repRelevance: {
    GreenCar: {
      page: "GreenCarpage",
      header: "GreenCarHeaderList",
      posturl: {
        stat: "report/getSubStatChecksVerifyStatistics",
        detail: "report/getSubQueryChecksRep"
      },
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
    pageSize: 100,
    Total: 0
  },
  // 集装箱
  TruckCarpage: {
    currentPage: 1,
    pageSize: 100,
    Total: 0
  },
  // 联合收割机
  CombineHarvCarpage: {
    currentPage: 1,
    pageSize: 100,
    Total: 0
  },
  // 军警
  MilitaryCarpage: {
    currentPage: 1,
    pageSize: 100,
    Total: 0
  },
  // 救援抢险及其他
  DisasterCarpage: {
    currentPage: 1,
    pageSize: 100,
    Total: 0
  },
  // 绿通
  GreenCarHeaderList: {
    stat: [
      {
        label: "序号",
        name: "id",
        hide: true,
        wid: 100,
        theadType: "index"
      },
      {
        label: "收费站",
        name: "orgName",
        hide: false,
        wid: 100
      },
      {
        label: "收费车流量",
        name: "tollNum",
        hide: false,
        wid: 100
      },
      {
        label: "查验车流量",
        name: "checksNum",
        hide: false,
        wid: 100
      },
      {
        label: "待稽查",
        name: "unVerifyNum",
        hide: false,
        wid: 100
      },
      {
        label: "稽查通过",
        name: "passNum",
        hide: false,
        wid: 100
        // theadType: 'filters'
      },
      {
        label: "稽查不通过",
        name: "noPassNum",
        hide: false,
        wid: 100
      }
    ],
    detail: [
      {
        label: "序号",
        name: "index",
        hide: true,
        wid: 100,
        theadType: "index"
      },
      {
        label: "出口收费站",
        name: "orgName",
        hide: false,
        wid: 100
      },
      {
        label: "出口时间",
        name: "exitDate",
        hide: false,
        wid: 100
      },
      {
        label: "车牌号码",
        name: "plateNumber",
        hide: false,
        wid: 100
      },
      {
        label: "入口收费站",
        name: "enteName",
        hide: false,
        wid: 100
      },
      {
        label: "货物名称",
        name: "goodsName",
        hide: false,
        wid: 100
      },
      {
        label: "优惠金额", // 应收金额
        name: "amountReceivable",
        hide: false,
        wid: 100
      },
      {
        label: "检察人员",
        name: "checkorName",
        hide: false,
        wid: 100
      },
      {
        label: "审核意见",
        name: "verifySuggest",
        hide: false,
        wid: 100
      },
      {
        label: "审核意见描述",
        name: "verifySuggestSelect",
        hide: false,
        wid: 100
      },
      {
        label: "审核人",
        name: "verifyOperatorName",
        hide: false,
        wid: 100
      }
    ]
  },
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
const getters = {};
// actions
const actions = {
  getSubReportAllRole({ commit }) {
    return new Promise((resolve, reject) => {
      api.post("comm/getAllRole", {}, res => {
        if (res.resultCode === "100") {
          commit("setSubReportAllRole", res.resultData);
          resolve();
        } else {
          reject(res);
        }
      });
    }).catch(() => {});
  },
  getSubReportData({ commit, state }, fm = {}) {
    const getPostData = (url, key) => {
      return new Promise((resolve, reject) => {
        api.post(url, fm, res => {
          if (res.resultCode === "100") {
            const _obj = {};
            _obj[key] = res.resultData.checkRecordList || res.resultData;
            commit("setSubReportData", _obj);
            resolve();
          } else {
            reject(res);
          }
        });
      });
    };
    const detailurl = state.repRelevance.GreenCar.posturl.detail;
    const staturl = state.repRelevance.GreenCar.posturl.stat;
    getPostData(detailurl, "detail");
    getPostData(staturl, "stat");
  },
  getRepReportData({ commit, state }, fmdata) {
    const posturl = state.repRelevance[state.nowTab].posturl;
    commit("setRepReportData", []);
    return new Promise((resolve, reject) => {
      api.post(posturl, fmdata, res => {
        if (res.resultCode === "100") {
          commit("setRepTotal", res.page.rows);
          commit("setRepReportData", res.resultData);
          resolve();
        } else {
          reject(res);
        }
      });
    });
  },
  async getSubRepExcelData({ commit, state }, { fmdata, type, postStatue }) {
    // const getExcelData = (url, key) => {
    //   return new Promise((resolve, reject) => {
    //     api.post(url, fmdata, res => {
    //       if (res.resultCode === "100") {
    //         const data = {};
    //         data[key] = res.resultData.checkRecordList || res.resultData;
    //         resolve(data);
    //       } else {
    //         reject(res);
    //       }
    //     });
    //   });
    // };
    // const detailurl = state.repRelevance.GreenCar.posturl.detail;
    // const staturl = state.repRelevance.GreenCar.posturl.stat;
    // const detailData = await getExcelData(detailurl, "detail");
    // const statData = await getExcelData(staturl, "stat");
    // const excelData = {
    //   detail: detailData,
    //   stat: statData
    // };
    // commit("setSubRepExcelData", { type, excelData });
    const getPostData = (url, key) => {
      return new Promise((resolve, reject) => {
        api.post(url, fmdata, res => {
          if (res.resultCode === "100") {
            const excelData = {};
            excelData[key] = res.resultData.checkRecordList || res.resultData;
            commit("setSubRepExcelData", { type, excelData });
            resolve({ type, excelData });
          } else {
            reject(res);
          }
        });
      });
    };
    const detailurl = state.repRelevance.GreenCar.posturl.detail;
    const staturl = state.repRelevance.GreenCar.posturl.stat;
    getPostData(detailurl, "detail");
    getPostData(staturl, "stat");
    // const posturl = state.repRelevance.GreenCar.posturl[postStatue];
    // return new Promise((resolve, reject) => {
    //   api.post(posturl, fmdata, res => {
    //     if (res.resultCode === "100") {
    //       const excelData = {};
    //       excelData[postStatue] =
    //         res.resultData.checkRecordList || res.resultData;
    //       resolve({ type, excelData, postStatue });
    //     } else {
    //       reject(res);
    //     }
    //   });
    // });
  }
};

// mutations
const mutations = {
  setSubReportAllRole(state, data) {
    state.reportRoleInfo = data;
  },
  setSubReportData(state, data) {
    state.subReportData = { ...state.subReportData, ...data };
  },
  setRepReportData(state, data) {
    state.reportData = data;
  },
  clearSubRepExcelData() {
    state.ExcelData = {};
  },
  setSubRepExcelData(state, { type, excelData }) {
    if (!state.ExcelData[type.name]) {
      state.ExcelData[type.name] = {};
    }
    state.ExcelData[type.name].ready = true;
    state.ExcelData[type.name].data = {
      ...state.ExcelData[type.name].data,
      ...excelData
    };
    const data = Object.assign({}, state.ExcelData);
    state.ExcelData = data;
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
