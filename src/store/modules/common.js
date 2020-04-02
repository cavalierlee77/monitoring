import api from "../../../static/js/MyAxios.js";
import constant from "../constant/index";

const state = {
  layoutHgt: 0,
  cartabs: constant.ctabs,
  leftMenus: constant.zhanjileftMenus,
  loginUser: {}
};

// getters
const getters = {};

// actions
const actions = {
  // 调整窗口高度
  getHeight({ commit }) {
    const winHeight = window.innerHeight;
    const headerHeight = 166;
    const height = winHeight - headerHeight;
    commit("setHeight", height);
  },
  // 获取登录用户信息
  getUserInfo({ commit }, fmdata) {
    return new Promise((resolve, reject) => {
      api.post("login/login", fmdata, res => {
        if (res.resultCode === "100") {
          commit("setUserInfo", res.resultData.user);
          resolve(res.resultData);
        } else {
          reject(res.resultMsg);
        }
      });
    });
  }
};

// mutations
const mutations = {
  setHeight(state, data) {
    state.layoutHgt = data;
  },
  setUserInfo(state, data) {
    state.loginUser = data;
  },
  changeMenu(state, data) {
    if (data === "2") {
      state.leftMenus = constant.zhanjileftMenus;
    } else {
      state.leftMenus = constant.fenjuleftMenus;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
