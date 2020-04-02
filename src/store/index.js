import Vue from "vue";
import Vuex from "vuex";
import check from "./modules/check.js";
import common from "./modules/common.js";
import history from "./modules/history.js";
import subhistory from "./modules/subhistory.js";
import report from "./modules/report.js";
import InspectionManagement from "./modules/views/index.js";
import BranchOfficeUserManagement from "./modules/BranchOfficeUserManagement.js";
import subreport from "./modules/subreport.js";
const config = require("./constant/clouldConfig");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isFlag: "2",
    // 常量
    txurl: config.txurl,
    alurl: config.alurl,
    ABucket: config.ABucket,
    ARegion: config.ARegion,
    TBucket: config.TBucket,
    TRegion: config.TRegion,
    userInfo: {
      curOrgName: "",
      curUserName: "",
      roleName: ""
    },
    mainheight: 100
  },
  mutations: {
    changeIsFlag(state, data) {
      state.isFlag = data;
    }
  },
  modules: {
    common,
    check,
    history,
    report,
    InspectionManagement,
    subreport,
    subhistory,
    BranchOfficeUserManagement
  }
});
