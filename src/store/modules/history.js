import api from "../../../static/js/MyAxios.js";

const state = {
  historyData: [],
  statusList: [],
  goodsList: [],
  nowTab: "",
  hisRelevance: {
    GreenCar: {
      page: "GreenCarpage",
      header: "GreenCarHeaderList",
      posturl: "check/getCheckRecords",
      selRelevance: "GreenCarInpRel",
      queryHei: 144
    },
    TruckCar: {
      page: "TruckCarpage",
      header: "TruckCarHeaderList",
      posturl: "othercheck/getContainerRecords",
      selRelevance: "TruckCarInpRel",
      queryHei: 72
    },
    CombineHarvCar: {
      page: "CombineHarvCarpage",
      header: "CombineHarvCarHeaderList",
      posturl: "othercheck/getCombineHarvRecords",
      selRelevance: "CombineHarvCarInpRel",
      queryHei: 144
    },
    MilitaryCar: {
      page: "MilitaryCarpage",
      header: "MilitaryCarHeaderList",
      posturl: "othercheck/getMilitaryRecords",
      selRelevance: "MilitaryCarInpRel",
      queryHei: 144
    },
    DisasterCar: {
      page: "DisasterCarpage",
      header: "DisasterCarHeaderList",
      posturl: "othercheck/getDisasterRecords",
      selRelevance: "DisasterCarInpRel",
      queryHei: 72
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
  // 默认
  defaultPage: {
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  GreenCarInpRel: [
    { plateNumber: "查验车牌" },
    { tollPlateNumber: "收费车牌" },
    { enteName: "入口站" },
    { enteDate: "入口时间" },
    { exitLane: "出口车道" },
    { exitDate: "出口时间" },
    { amountReceivable: "应收金额" },
    { wholeTruckWeight: "计重" },
    { goodsName: "货物名称" },
    { exitTollId: "收费员" },
    { driverPhoneNumber: "司机电话" }
  ],
  TruckCarInpRel: [
    { plateNumber: "查验车牌" },
    { tollPlateNumber: "收费车牌" },
    { entryStatName: "入口站" },
    { entryDate: "入口时间" },
    { lane: "出口车道" },
    { exitDate: "出口时间" },
    { amountReceivable: "应收金额" },
    { boxSize: "箱体尺寸" },
    { boxTypeCode: "箱体代码" },
    { receiveAmount: "实收金额" },
    { discountAmount: "优惠金额" },
    { tollId: "收费员" },
    { driverName: "司机姓名" },
    { driverPhoneNumber: "司机电话" }
  ],
  CombineHarvCarInpRel: [
    { plateNumber: "查验车牌" },
    { tollPlateNumber: "收费车牌" },
    { entryStatName: "入口站" },
    { entryDate: "入口时间" },
    { lane: "出口车道" },
    { exitDate: "出口时间" },
    { amountReceivable: "应收金额" },
    { wholeTruckWeight: "计重" },
    { jobId: "作业证号" },
    { tollId: "收费员" },
    { driverPhoneNumber: "司机电话" }
  ],
  MilitaryCarInpRel: [
    { plateNumber: "查验车牌" },
    { tollPlateNumber: "收费车牌" },
    { entryStatName: "入口站" },
    { entryDate: "入口时间" },
    { lane: "出口车道" },
    { exitDate: "出口时间" },
    { amountReceivable: "应收金额" },
    { wholeTruckWeight: "计重" },
    { designation: "部队番号" },
    { tollId: "收费员" }
  ],
  DisasterCarInpRel: [
    { plateNumber: "查验车牌" },
    { tollPlateNumber: "收费车牌" },
    { entryStatName: "入口站" },
    { entryDate: "入口时间" },
    { lane: "出口车道" },
    { exitDate: "出口时间" },
    { amountReceivable: "应收金额" },
    { wholeTruckWeight: "计重" },
    { tollId: "收费员" }
  ],
  // 绿通
  GreenCarHeaderList: [
    {
      label: "车牌号码",
      name: "plateNumber",
      hide: false
    },
    {
      label: "查验人员",
      name: "checkorName",
      hide: false
    },
    {
      label: "收费站",
      name: "orgName",
      hide: false
    },
    {
      label: "查验时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "查验结论",
      name: "isGcTrunckName",
      hide: false
    },
    {
      label: "状态",
      name: "verifyStatusName",
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
      label: "查验人员",
      name: "checkorName",
      hide: false
    },
    {
      label: "收费站",
      name: "orgName",
      hide: false
    },
    {
      label: "查验时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "箱体尺寸",
      name: "boxSize",
      hide: false
    },
    {
      label: "箱体代码",
      name: "boxTypeCode",
      hide: false
    },
    {
      label: "状态",
      name: "verifyStatusName",
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
      label: "查验人员",
      name: "checkorName",
      hide: false
    },
    {
      label: "收费站",
      name: "orgName",
      hide: false
    },
    {
      label: "查验时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "作业证号",
      name: "jobId",
      hide: false
    },
    {
      label: "状态",
      name: "verifyStatusName",
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
      label: "查验人员",
      name: "checkorName",
      hide: false
    },
    {
      label: "收费站",
      name: "orgName",
      hide: false
    },
    {
      label: "查验时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "部队番号",
      name: "designNtion",
      hide: false
    },
    {
      label: "状态",
      name: "verifyStatusName",
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
      label: "查验人员",
      name: "checkorName",
      hide: false
    },
    {
      label: "收费站",
      name: "orgName",
      hide: false
    },
    {
      label: "查验时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "状态",
      name: "verifyStatusName",
      hide: false
    }
  ]
};

// getters
const getters = {};

// actions
const actions = {
  getHisHistoryData({ commit, state }, fmdata) {
    const posturl = state.hisRelevance[state.nowTab].posturl;
    commit("setHisHistoryData", []);
    return new Promise((resolve, reject) => {
      api.post(posturl, fmdata, res => {
        if (res.resultCode == "100") {
          commit("setHisHistoryData", res.resultData);
          commit("setHisTotal", res.page.rows);
          resolve();
        } else {
          reject();
        }
      });
    });
  },
  getHisStatusList({ commit }) {
    return new Promise((resolve, reject) => {
      api.post(
        "comm/getCommParamdic",
        { groupType: "VerifyStatus", haveSelAll: 1 },
        res => {
          if (res.resultCode == "100") {
            const _statusList = res.resultData.map(status => {
              return {
                name: status.dicName,
                id: status.dicID
              };
            });
            commit("setHisStatusList", _statusList);
            resolve();
          } else {
            reject();
          }
        }
      );
    });
  },
  getHisGoodsList({ commit }) {
    return new Promise((resolve, reject) => {
      api.post("comm/getGoodList", {}, res => {
        if (res.resultCode == "100") {
          let _index = 0;
          const _goodsArr = res.resultData.map((types, index1) =>
            types.map((type, index2) => {
              _index++;
              return {
                key: _index,
                value: type.greenThreeName,
                label: type.greenThreeName
              };
            })
          );
          const _goodsList = _goodsArr.reduce((prev, next, index, arr) =>
            prev.concat(next)
          );
          commit("setHisGoodsList", _goodsList);
          resolve();
        } else {
          self.errorInfo = res.resultMsg;
          reject();
        }
      });
    });
  }
};

// mutations
const mutations = {
  setHisHistoryData(state, data) {
    state.historyData = data;
  },
  setHisNowTab(state, data) {
    state.nowTab = data;
  },
  setHisNowPage(state, data) {
    state[state.hisRelevance[state.nowTab].page].currentPage = data.currentPage;
    state[state.hisRelevance[state.nowTab].page].pageSize = data.pageSize;
  },
  setHisTotal(state, data) {
    state[state.hisRelevance[state.nowTab].page].Total = data;
  },
  setHisStatusList(state, data) {
    state.statusList = data;
  },
  setHisGoodsList(state, data) {
    state.goodsList = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
