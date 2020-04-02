import Vue from "vue";
import Router from "vue-router";
import r from "./registercomponents";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "LoginPage",
      component: r.LoginPage
    },
    {
      path: "/main",
      component: r.MainPage,
      children: [
        {
          path: "checklayout",
          component: r.CheckLayout,
          children: [
            {
              path: "unchecktable",
              component: r.UnCheckTable
            },
            {
              path: "newchecktable",
              component: r.NewCheckTable
            },
            {
              path: "newtolltable",
              component: r.NewTollTable
            }
          ]
        },
        {
          path: "subchecklayout",
          component: r.SubCheckLayout
        },
        // {
        //   path: 'wechat',
        //   component: wechat,
        //   children: [{
        //     path: 'wechatVechicle',
        //     component: wechatVechicle
        //   }, {
        //     path: 'wechatBill',
        //     component: wechatBill
        //   }]
        // },
        {
          path: "historylayout",
          component: r.HistoryLayout
        },
        {
          path: "subhistorylayout",
          component: r.SubHistoryLayout
        },
        {
          path: "reportpage",
          component: r.ReportPage
        },
        {
          path: "enclosure",
          component: r.Enclosure
        },
        {
          path: "maintenance",
          component: r.Maintenance
        },
        {
          path: "usermanager",
          component: r.UserManagerPage
        },

        {
          path: "SubReport",
          component: r.SubReport
        },
        {
          path: "BranchOfficeInspectionManagement",
          component: r.BranchOfficeInspectionManagement
        },
        {
          path: "BranchOfficeUserManagement",
          component: r.BranchOfficeUserManagement
        }
      ]
    }
  ]
});
