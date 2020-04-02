import config from "./constants.js";
import api from "../../../../static/js/MyAxios.js";
import { Message } from "element-ui";
const state = {
  TabsArray: config.TabsArray,
  HeaderList: config.GreenCar,
  // 稽查管理用分页
  InspectionManagementPage: {
    currentPage: 1,
    pageSize: 50,
    total: 0
  },
  // 稽查管理检索条件
  InspectionManagementSearch: {
    subSelected: "",
    beginTime: "",
    endTime: "",
    goods: "",
    plateNumber: "",
    minCharge: "",
    maxCharge: "",
    verifyStatus: "",
    orgId: ""
  },
  InspectionManagementDataList: []
};

// getters
const getters = {};

// actions
const actions = {
  // 获取车辆信息列表
  getInspectionManagementVehicleList({ commit, state }) {
    // 组织查询条件
    const queryOptions = {
      pageSize: state.InspectionManagementPage.pageSize,
      currentPage: state.InspectionManagementPage.currentPage
    };
    return new Promise((resolve, reject) => {
      api.post(
        "/subcheck/getSubUnVerifyCheckRecords",
        queryOptions,
        res => {
          if (res.resultCode === "100") {
            commit(
              "setInspectionManagementInspectionManagementDataList",
              res.resultData
            );
            commit("setInspectionManagementPageTotal", res.page.rows);
            resolve(res.resultData);
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  },
  commitInspectionManagementVehicle({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "subverify/subSubmitVerifySuggest",
        data,
        res => {
          if (res.resultCode === "100") {
            Message.success("成功");
            dispatch("getInspectionManagementVehicleList");
            resolve("sucess");
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  }
};

// mutations
const mutations = {
  setInspectionManagementInspectionManagementDataList(state, data) {
    state.InspectionManagementDataList = data;
  },
  setInspectionManagementPagePage(state, data) {
    state.InspectionManagementPage.currentPage = data;
  },
  setInspectionManagementPageSize(state, data) {
    state.InspectionManagementPage.pageSize = data;
  },
  setInspectionManagementPageTotal(state, data) {
    state.InspectionManagementPage.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
