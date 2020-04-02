import api from '../../../../static/js/MyAxios.js'
let axios = require('axios')
const state = {
  tabList: [
    {
      cname: '绿通车辆',
      ename: 'GreenCar',
      active: true,
      count: 0
    }
  ],
  currentTab: 'GreenCar',
  pageStorage:{
    'GreenCar': {
      pageSize: 100,
      currentPage: 1,
      Total: 0
    }
  },
  queryConditions: {
    plateNumber: '',
    verifyStatus: ''
  },
  detailsItem: {
    'GreenCar': {
      'labelInputItem': [{
          'zh': '车牌号码',
          'en': 'plateNumber'
        }, {
          'zh': '车主姓名',
          'en': 'vehicleOwner'
        }, {
          'zh': '车主电话',
          'en': 'vehicleTel'
        }, {
          'zh': '轴数',
          'en': 'axisnum'
        },{
          'zh': '核定载质量',
          'en': 'approvedload'
        },{
          'zh': '整备载质量',
          'en': 'unladenmass'
        },{
          'zh': '车厢类型',
          'en': 'carriagetype'
        }, {
          'zh': '注册时间',
          'en': 'createtime'
        }],
      'colCount': 4,
      'pictureNameList': ['carheadpic', 'carsidepic', 'cartailpic', 'drivinglicensepic']
    }
  },
  tableItemList: [],
  wechatheaderList: {
    'GreenCar': [{
        label: '车牌号码',
        name: 'plateNumber',
        hide: false
      }, {
        label: '车主姓名',
        name: 'vehicleOwner',
        hide: false
      }, {
        label: '车主电话',
        name: 'vehicleTel',
        hide: false
      }, {
        label: '注册时间',
        name: 'createtime',
        hide: false
      }, {
        label: '轴数',
        name: 'axisnum',
        hide: false
      }, {
        label: '状态',
        name: 'carVerifyStatus',
        hide: false
    }]
  }
}

const getters = {
  wechatVechicleHeaderList: (state) => {
    return state['wechatheaderList'][state.currentTab]
  },
  wechatVechiclePage: (state) => {
    return state['pageStorage'][state.currentTab]
  },
  wechatVechicledetailsItem: (state) => {
    return state['detailsItem'][state.currentTab]
  }
}

const actions = {
  //async写法(待用)
  async actionA({ commit }) {
    //commit('gotData', await getData())
  },
  getWechatVechicleInfos({ commit, state }){
    //组织查询条件
    let jsondata = {
      pageSize: state['pageStorage'][state.currentTab].pageSize,  
      currentPage: state['pageStorage'][state.currentTab].currentPage, 
      plateNumber: state['queryConditions'].plateNumber,
      verifyStatus: state['queryConditions'].verifyStatus
    }
    return new Promise((resolve, reject) => {
      api.post('wechat/getWechatVechicleInfosByPage', jsondata, res => {
        if (res.resultCode == "100") {
          commit('setPageTotals', res.page.rows || 0);
          commit('setWechatVechicleList', res.resultData)
          resolve(res.resultData);
        } else {
          commit('setPageTotals', 0);
          commit('setWechatVechicleList', [])
          reject(res.resultMsg);
        }
      });
    })
  },
  verifyWechatVechicle({ commit, state }, jsondata){
    commit('changeVechicleData', jsondata)
    let data = {
      'keyid': jsondata.keyid,
      'verifyUserCode': jsondata.verifyUserCode,
      'verifyStatus': jsondata.verifyStatus
    }
    return new Promise((resolve,reject)=> {
      api.post('wechat/verifyVehicle',data, res=>  {
        if (res.resultCode == "100") {
          resolve(res.resultData);
        } else {
          reject(res.resultMsg);
        }
      })
    })
  }
}

const mutations = {
  //设置table数据
  setWechatVechicleList(state, data){
    state.tableItemList = data;
  },
  setPageTotals(state, data){
    //设置总条数
    state['pageStorage'][state.currentTab].Total = data;
    //设置badge
    state['tabList'][0].count = data;
  },
  //提交后修改数据
  changeVechicleData(state, data){
    let index = state.tableItemList.findIndex(item=>{
      return item['keyId'] == data.keyid
    });
    state.tableItemList[index].verifyUserName = data.verifyUserName;
    state.tableItemList[index].verifyTime = data.verifyTime;
    state.tableItemList[index].carVerifyStatus = data.verifyStatus;
  },
  resetQueryConditions(state, data){
    Object.assign(state.queryConditions, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}