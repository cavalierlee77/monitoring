import api from "../../../../static/js/MyAxios.js";
const axios = require("axios");
const state = {
  tabList: [
    {
      cname: "绿通车辆",
      ename: "GreenCar",
      active: true,
      count: 0
    }
  ],
  currentTab: "GreenCar",
  pageStorage: {
    GreenCar: {
      pageSize: 100,
      currentPage: 1,
      Total: 0
    }
  },
  queryConditions: {
    plateNumber: "",
    verifyStatus: "",
    stationId: ""
  },
  detailsItem: {
    GreenCar: {
      labelInputItem: [
        {
          zh: "车牌号码",
          en: "plateNumber"
        },
        {
          zh: "车主姓名",
          en: "vehicleOwner"
        },
        {
          zh: "车主电话",
          en: "vehicleTel"
        },
        {
          zh: "轴数",
          en: "axisnum"
        },
        {
          zh: "核定载质量",
          en: "approvedload"
        },
        {
          zh: "整备载质量",
          en: "unladenmass"
        },
        {
          zh: "车厢类型",
          en: "carriagetype"
        },
        {
          zh: "注册时间",
          en: "createtime"
        }
      ],
      colCount: 4,
      pictureNameList: [
        "carheadpic",
        "carsidepic",
        "cartailpic",
        "drivinglicensepic",
        "loadBeforPic",
        "loadingPic",
        "loadAfterPic"
      ]
    }
  },
  tableItemList: [],
  wechatheaderList: {
    GreenCar: [
      {
        label: "车牌号码",
        name: "plateNumber",
        hide: false
      },
      {
        label: "车主姓名",
        name: "vehicleOwner",
        hide: false
      },
      {
        label: "车主电话",
        name: "vehicleTel",
        hide: false
      },
      {
        label: "申报时间",
        name: "createtime",
        hide: false
      },
      {
        label: "入口站",
        name: "entryStationName",
        hide: false
      },
      {
        label: "货物名称",
        name: "goodName",
        hide: false
      },
      {
        label: "状态",
        name: "carVerifyStatus",
        hide: false
      }
    ]
  }
};

const getters = {
  wechatBillHeaderList: state => {
    return state.wechatheaderList[state.currentTab]
  },
  wechatBillPage: state => {
    return state.pageStorage[state.currentTab]
  },
  wechatBilldetailsItem: state => {
    return state.detailsItem[state.currentTab]
  }
};

const actions = {
  // async写法(待用)
  async actionA({ commit }) {
    // commit('gotData', await getData())
  },
  getWechatBills({ commit, state }) {
    // 组织查询条件
    const jsondata = {
      pageSize: state.pageStorage[state.currentTab].pageSize,
      currentPage: state.pageStorage[state.currentTab].currentPage,
      stationId: state.queryConditions.stationId,
      plateNumber: state.queryConditions.plateNumber,
      verifyStatus: state.queryConditions.verifyStatus
    };
    return new Promise((resolve, reject) => {
      api.post("/wechat/getWechatBillByPage", jsondata, res => {
        if (res.resultCode == "100") {
          commit("setPageTotals", res.page.rows || 0);
          commit("setWechatBillList", res.resultData);
          resolve(res.resultData);
        } else {
          commit("setPageTotals", 0);
          commit("setWechatBillList", []);
          reject(res.resultMsg);
        }
      });
    });
  }
};

const mutations = {
  // 设置table数据
  setWechatBillList(state, data) {
    state.tableItemList = data;
  },
  setPageTotals(state, data) {
    // 设置总条数
    state.pageStorage[state.currentTab].Total = data;
    // 设置badge
    state.tabList[0].count = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
