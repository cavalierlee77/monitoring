import api from "../../../static/js/MyAxios.js";
const axios = require("axios");
const state = {
  checkdata: [],
  subMenu: "addedCheckList",
  nowTab: "GreenCar",
  checktabs: [
    {
      cname: "绿通车辆",
      ename: "GreenCar",
      active: true,
      count: 0
    },
    {
      cname: "集装箱车辆",
      ename: "TruckCar",
      active: false,
      count: 0
    },
    {
      cname: "联合收割机",
      ename: "CombineHarvCar",
      active: false,
      count: 0
    },
    {
      cname: "军警车辆",
      ename: "MilitaryCar",
      active: false,
      count: 0
    },
    {
      cname: "消防、其他",
      ename: "DisasterCar",
      active: false,
      count: 0
    }
  ],
  goodsList: [],
  TollCutOffTime: "",
  TrafficInfoByPnTime: [],
  GreenCarpage: {
    // 绿通
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  TruckCarpage: {
    // 集装箱
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  MilitaryCarpage: {
    // 军警
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  DisasterCarpage: {
    // 救援抢险
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  CombineHarvCarpage: {
    // 其他
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  defaultPage: {
    // 默认
    currentPage: 1,
    pageSize: 50,
    Total: 0
  },
  TollGreenCarHeaderList: [
    {
      label: "车牌号码",
      name: "carExitcodeRecognize",
      hide: false
    },
    {
      label: "收费员编号",
      name: "tollId",
      hide: false
    },
    {
      label: "收费站",
      name: "exitStationName",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "货物名称",
      name: "goodsName",
      hide: false
    },
    {
      label: "应收金额",
      name: "totalFare",
      hide: false
    },
    {
      label: "状态",
      name: "unanimousStatusName",
      hide: false
    }
  ],
  TollTruckCarHeaderList: [
    {
      label: "车牌号码",
      name: "carExitcodeRecognize",
      hide: false
    },
    {
      label: "收费员编号",
      name: "tollId",
      hide: false
    },
    {
      label: "收费站",
      name: "exitStationName",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "应收金额",
      name: "totalFare",
      hide: false
    },
    {
      label: "状态",
      name: "unanimousStatusName",
      hide: false
    }
  ],
  TollMilitaryCarHeaderList: [
    {
      label: "车牌号码",
      name: "carExitcodeRecognize",
      hide: false
    },
    {
      label: "收费员编号",
      name: "tollId",
      hide: false
    },
    {
      label: "收费站",
      name: "exitStationName",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "应收金额",
      name: "totalFare",
      hide: false
    },
    {
      label: "状态",
      name: "unanimousStatusName",
      hide: false
    }
  ],
  TollCombineHarvCarHeaderList: [
    {
      label: "车牌号码",
      name: "carExitcodeRecognize",
      hide: false
    },
    {
      label: "收费员编号",
      name: "tollId",
      hide: false
    },
    {
      label: "收费站",
      name: "exitStationName",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "应收金额",
      name: "totalFare",
      hide: false
    },
    {
      label: "状态",
      name: "unanimousStatusName",
      hide: false
    }
  ],
  TollDisasterCarHeaderList: [
    {
      label: "车牌号码",
      name: "carExitcodeRecognize",
      hide: false
    },
    {
      label: "收费员编号",
      name: "tollId",
      hide: false
    },
    {
      label: "收费站",
      name: "exitStationName",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "应收金额",
      name: "totalFare",
      hide: false
    },
    {
      label: "状态",
      name: "unanimousStatusName",
      hide: false
    }
  ],
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
  ],
  detailGreenCarHeaderList: [
    {
      label: "车牌号码",
      name: "carExitcodeRecognize",
      hide: false
    },
    {
      label: "入口站",
      name: "enteStationName",
      hide: false
    },
    {
      label: "入口时间",
      name: "enteDate",
      hide: false
    },
    {
      label: "出口车道",
      name: "lane",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "应收金额",
      name: "totalFare",
      hide: false
    },
    {
      label: "计重",
      name: "totalWeight",
      hide: false
    },
    {
      label: "货物名称",
      name: "goodsName",
      hide: false
    },
    {
      label: "收费员",
      name: "tollId",
      hide: false
    }
  ],
  detailTruckCarHeaderList: [
    {
      label: "车牌号码",
      name: "carExitcodeRecognize",
      hide: false
    },
    {
      label: "入口站",
      name: "enteStationName",
      hide: false
    },
    {
      label: "入口时间",
      name: "enteDate",
      hide: false
    },
    {
      label: "出口车道",
      name: "lane",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "应收金额",
      name: "totalFare",
      hide: false
    },
    {
      label: "实收金额",
      name: "tollFare",
      hide: false
    },
    {
      label: "计重",
      name: "totalWeight",
      hide: false
    },
    {
      label: "收费员",
      name: "tollId",
      hide: false
    }
  ],
  detailMilitaryCarHeaderList: [
    {
      label: "车牌号码",
      name: "carExitcodeRecognize",
      hide: false
    },
    {
      label: "入口站",
      name: "enteStationName",
      hide: false
    },
    {
      label: "入口时间",
      name: "enteDate",
      hide: false
    },
    {
      label: "出口车道",
      name: "lane",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "应收金额",
      name: "totalFare",
      hide: false
    },
    {
      label: "计重",
      name: "totalWeight",
      hide: false
    },
    {
      label: "收费员",
      name: "tollId",
      hide: false
    }
  ],
  detailCombineHarvCarHeaderList: [
    {
      label: "车牌号码",
      name: "carExitcodeRecognize",
      hide: false
    },
    {
      label: "入口站",
      name: "enteStationName",
      hide: false
    },
    {
      label: "入口时间",
      name: "enteDate",
      hide: false
    },
    {
      label: "出口车道",
      name: "lane",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "应收金额",
      name: "totalFare",
      hide: false
    },
    {
      label: "收费员",
      name: "tollId",
      hide: false
    }
  ],
  detailDisasterCarHeaderList: [
    {
      label: "车牌号码",
      name: "carExitcodeRecognize",
      hide: false
    },
    {
      label: "入口站",
      name: "enteStationName",
      hide: false
    },
    {
      label: "入口时间",
      name: "enteDate",
      hide: false
    },
    {
      label: "出口车道",
      name: "lane",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "应收金额",
      name: "totalFare",
      hide: false
    },
    {
      label: "收费员",
      name: "tollId",
      hide: false
    }
  ]
};

// getters
const getters = {
  // 参数顺序不能变化
  HeaderList: (state, getters) => {
    if (getters.NowSubMenu === "addedTollList") {
      return state["Toll" + state.nowTab + "HeaderList"];
    } else {
      return state[state.nowTab + "HeaderList"];
    }
  },
  detailHeaderList: state => {
    return state["detail" + state.nowTab + "HeaderList"];
  },
  page: state => {
    return state[state.nowTab + "page"];
  },
  NowSubMenu: state => {
    const def = {
      // 默认
      currentPage: 1,
      pageSize: 50,
      Total: 0
    };
    state.GreenCarpage = def;
    state.TruckCarpage = def;
    state.MilitaryCarpage = def;
    state.DisasterCarpage = def;
    state.CombineHarvCarpage = def;
    return state.subMenu;
  }
};

// actions
const actions = {
  getchkcheckdata({ commit, state, getters }, fmdata) {
    let posturl = "";
    // 切换查询车型
    switch (state.nowTab) {
      // 绿通
      case "GreenCar":
        posturl = "verify/getUnVerifyCheckRecordsV3";
        break;
      // 集装箱
      case "TruckCar":
        posturl = "otherverify/getUnVerifyContainerRecords";
        break;
      // 军警
      case "MilitaryCar":
        posturl = "otherverify/getUnVerifyMilitaryRecords";
        break;
      // 救援抢险
      case "DisasterCar":
        posturl = "otherverify/getUnVerifyDisasterRelief";
        break;
      // 联合收割机
      case "CombineHarvCar":
        posturl = "otherverify/getUnVerifyCombineRecords";
        break;
      default:
        posturl = "verify/getUnVerifyCheckRecordsV3";
        break;
    }
    switch (getters.NowSubMenu) {
      case "addedCheckList":
        fmdata.queryType = "1";
        break;
      case "offLimitsList":
        fmdata.queryType = "2";
        break;
      case "addedTollList":
        fmdata.queryType = "3";
        break;
      default:
        fmdata.queryType = "1";
        break;
    }

    commit("setchkcheckdata", []);
    commit("setchkTollOffTime", "");
    return new Promise((resolve, reject) => {
      api.post(posturl, fmdata, res => {
        if (res.resultCode == "100") {
          // console.log(getters.NowSubMenu, state.subMenu)
          if (
            res.resultData[getters.NowSubMenu] &&
            res.resultData[getters.NowSubMenu] != null
          ) {
            commit("setchkcheckdata", res.resultData[getters.NowSubMenu]);
            commit("setchkTollOffTime", res.resultData.tollCutOffTime);
            commit("setTabsCount", res.resultData);
            commit("setchkTotal", res.page.rows);
            resolve();
          }
        } else {
        }
      });
    });
  },
  getchkGoodsList({ commit }) {
    return new Promise((resolve, reject) => {
      const cc = [];
      api.post("comm/getGoodList", {}, res => {
        if (res.resultCode === "100") {
          res.resultData.forEach(item => {
            let index = 0;
            item.map(item => {
              index += 1;
              cc.push({
                key: index,
                letter: item.initialLetter,
                value: item.greenThreeName
              });
            });
          });
          commit("setchkGoodsList", cc);
          resolve();
        } else {
        }
      });
    });
  },
  getTrafficInfoByPnTime({ commit }, fmdata) {
    return new Promise((resolve, reject) => {
      api.post("TrafficInfo/getTrafficInfoByPnTime", fmdata, res => {
        if (res.resultCode === "100") {
          commit("setTrafficInfoByPnTime", []);
          commit("setTrafficInfoByPnTime", res.resultData);
          resolve();
        } else {
        }
      });
    }).catch(function(reason) {
      console.log("catch:", reason);
    });
  }
};

// mutations
const mutations = {
  setchkcheckdata(state, data) {
    state.checkdata = data;
  },
  setchkTollOffTime(state, data) {
    state.TollCutOffTime = data;
  },
  setchkNowTab(state, data) {
    state.nowTab = data;
  },
  setchkNowSubMenu(state, data) {
    state.subMenu = data;
  },
  setchkNowPage(state, data) {
    // 切换查询车型
    switch (state.nowTab) {
      // 绿通
      case "GreenCar":
        state.GreenCarpage.currentPage = data.currentPage;
        state.GreenCarpage.pageSize = data.pageSize;
        break;
      // 集装箱
      case "TruckCar":
        state.TruckCarpage.currentPage = data.currentPage;
        state.TruckCarpage.pageSize = data.pageSize;
        break;
      // 军警
      case "MilitaryCar":
        state.MilitaryCarpage.currentPage = data.currentPage;
        state.MilitaryCarpage.pageSize = data.pageSize;
        break;
      // 救援抢险
      case "DisasterCar":
        state.DisasterCarpage.currentPage = data.currentPage;
        state.DisasterCarpage.pageSize = data.pageSize;
        break;
      // 联合收割机
      case "CombineHarvCar":
        state.CombineHarvCarpage.currentPage = data.currentPage;
        state.CombineHarvCarpage.pageSize = data.pageSize;
        break;
      default:
        state.defaultPage.currentPage = data.currentPage;
        state.defaultPage.pageSize = data.pageSize;
        break;
    }
  },
  setchkTotal(state, data) {
    // 切换查询车型
    switch (state.nowTab) {
      // 绿通
      case "GreenCar":
        state.GreenCarpage.Total = data;
        break;
      // 集装箱
      case "TruckCar":
        state.TruckCarpage.Total = data;
        break;
      // 军警
      case "MilitaryCar":
        state.MilitaryCarpage.Total = data;
        break;
      // 救援抢险
      case "DisasterCar":
        state.DisasterCarpage.Total = data;
        break;
      // 联合收割机
      case "CombineHarvCar":
        state.CombineHarvCarpage.Total = data;
        break;
      default:
        state.defaultPage.Total = data;
        break;
    }
  },
  setchkGoodsList(state, data) {
    state.goodsList = data;
  },
  setTrafficInfoByPnTime(state, data) {
    state.TrafficInfoByPnTime = data;
  },
  setTabsCount(state, data) {
    state.checktabs.map(item => {
      item.count = 0;
      switch (item.ename) {
        // 绿通
        case "GreenCar":
          item.count = data.greenChannelCnt;
          break;
        // 集装箱
        case "TruckCar":
          item.count = data.containerCnt;
          break;
        // 军警
        case "MilitaryCar":
          item.count = data.militaryCnt;
          break;
        // 救援抢险
        case "DisasterCar":
          item.count = data.disasterCnt;
          break;
        // 联合收割机
        case "CombineHarvCar":
          item.count = data.combineHarvCnt;
          break;
        default:
          break;
      }
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
