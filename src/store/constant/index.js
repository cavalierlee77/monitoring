export default {
  ctabs: [
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
  zhanjileftMenus: [
    {
      title: "审核信息",
      hasChild: true,
      index: "main/checklayout",
      imgClass: "el-icon-edit-outline",
      hot: false,
      child: [
        {
          title: "等待审核信息",
          index: "main/checklayout/unchecktable"
        },
        {
          title: "新增查验信息",
          index: "main/checklayout/newchecktable"
        },
        {
          title: "新增收费信息",
          index: "main/checklayout/newtolltable"
        }
      ]
    },
    // {
    //     title: "车辆管理",
    //     hasChild: true,
    //     index: "main/wechat",
    //     imgClass: "el-icon-edit-outline",
    //     hot: false,
    //     child: [{
    //       title: "注册车辆审核",
    //       index: "main/wechat/wechatVechicle",
    //     }, {
    //       title: "申报运单管理",
    //         index: "main/wechat/wechatBill",
    //     }]
    // },
    {
      title: "历史查询",
      hasChild: false,
      index: "main/historylayout",
      imgClass: "el-icon-view",
      hot: false
    },
    {
      title: "报表打印",
      hasChild: false,
      index: "main/reportpage",
      imgClass: "el-icon-printer",
      hot: false
    },
    {
      title: "数据上传",
      hasChild: false,
      index: "main/enclosure",
      imgClass: "el-icon-document-add",
      hot: false
    },
    {
      title: "用户管理",
      hasChild: false,
      index: "main/usermanager",
      imgClass: "el-icon-setting",
      hot: false
    },
    {
      title: "数据维护",
      hasChild: false,
      index: "main/maintenance",
      imgClass: "icon-data_statics",
      hot: true
    }
  ],
  fenjuleftMenus: [
    {
      title: "稽查管理",
      hasChild: false,
      index: "main/BranchOfficeInspectionManagement",
      imgClass: "el-icon-edit-outline",
      hot: false
    },
    {
      title: "历史查询",
      hasChild: false,
      index: "main/subhistorylayout",
      imgClass: "el-icon-view",
      hot: false
    },
    {
      title: "报表打印",
      hasChild: false,
      index: "main/SubReport",
      imgClass: "el-icon-printer",
      hot: false
    },
    {
      title: "用户管理",
      hasChild: false,
      index: "main/BranchOfficeUserManagement",
      imgClass: "el-icon-setting",
      hot: false
    }
  ]
};
