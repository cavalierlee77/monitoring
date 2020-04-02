import api from "../../../static/js/MyAxios.js";
import { Message } from "element-ui";
const state = {
  // 稽查管理用分页
  BranchOfficeUserManagementPage: {
    currentPage: 1,
    pageSize: 50,
    total: 0
  },
  // 稽查管理检索条件
  BranchOfficeUserManagementSearch: {},
  BranchOfficeUserManagementDataList: [],
  BranchOfficeRoleList: [],
  BranchOfficeOrgidList: []
};

// getters
const getters = {};

// actions
const actions = {
  getBranchOfficeUserManagementList({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.post(
        "/user/getAllUsers",
        {
          currentPage: state.BranchOfficeUserManagementPage.currentPage,
          pageSize: state.BranchOfficeUserManagementPage.pageSize
        },
        res => {
          if (res.resultCode === "100") {
            commit("setBranchOfficeUserManagementDataList", res.resultData);
            commit("setBranchOfficeUserManagementPageTotal", res.page.rows);
            resolve(res.resultData);
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  },
  getBranchOfficeRoleList({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.post(
        "/comm/getAllRole",
        {},
        res => {
          if (res.resultCode === "100") {
            commit("setBranchOfficeRoleList", res.resultData);
            resolve(res.resultData);
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  },
  getBranchOfficeOrgidList({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.post(
        "/comm/getSubStats",
        {},
        res => {
          if (res.resultCode === "100") {
            commit("setBranchOfficeOrgidList", res.resultData);
            resolve(res.resultData);
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  },
  commitUserInfo({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      const url =
        data.flag === "add" ? "/user/insertBaseUser" : "user/updateBaseUser";
      const label = data.flag === "add" ? "添加用户信息" : "编辑用户信息";
      api.post(
        url,
        data.data,
        res => {
          if (res.resultCode === "100") {
            resolve(res.resultData);
            Message.success(label + "成功");
            dispatch("getBranchOfficeUserManagementList");
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
  setBranchOfficeUserManagementDataList(state, data) {
    state.BranchOfficeUserManagementDataList = data;
  },
  setBranchOfficeUserManagementPage(state, data) {
    state.BranchOfficeUserManagementPage.currentPage = data;
  },
  setBranchOfficeUserManagementPageSize(state, data) {
    state.BranchOfficeUserManagementPage.pageSize = data;
  },
  setBranchOfficeUserManagementPageTotal(state, data) {
    state.BranchOfficeUserManagementPage.total = data;
  },
  setBranchOfficeRoleList(state, data) {
    state.BranchOfficeRoleList = data;
  },
  setBranchOfficeOrgidList(state, data) {
    state.BranchOfficeOrgidList = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
