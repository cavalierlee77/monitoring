export default {
  TabsArray: [
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
  // 绿通车辆
  GreenCar: [
    {
      label: "车牌号码",
      name: "plateNumber",
      hide: false
    },
    {
      label: "出口站",
      name: "orgName",
      hide: false
    },
    {
      label: "出口时间",
      name: "exitDate",
      hide: false
    },
    {
      label: "查验时间",
      name: "checkTime",
      hide: false
    },
    {
      label: "货物种类",
      name: "goodsName",
      hide: false
    },
    {
      label: "应收金额",
      name: "amountReceivable",
      hide: false
    }
  ],
  // 集装箱车辆
  TruckCar: [],
  // 联合收割机
  CombineHarvCar: [],
  // 军警车辆
  MilitaryCar: [],
  // 消防、其他
  DisasterCar: []
};
