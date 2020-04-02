<template>
  <div class='search-wrapper'>
    <header class='lstyle'>查询面板</header>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="" name="1">
        <el-form ref="form" :model="formdata" label-width="100px">
          <div class="row">
            <div class="col-4">
              <el-form-item label="机构">
                <el-select  v-model="formdata.orgId" class="gslt">
                  <el-option v-for="item in orglist" :key="item.value" :value="item.value" :label="item.name"></el-option>
                </el-select >
              </el-form-item>
            </div>
            <!-- <div class="col-4">
              <el-form-item label="查验人员">
                <el-select  v-model="formdata.stationMasterMark" class="gslt">
                  <el-option v-for="item in stmststatus" :key="item.value" :value="item.value" :label="item.status"></el-option>
                </el-select >
              </el-form-item>
            </div> -->
            <div class="col-4">
              <el-form-item label="车牌号码">
                <el-input v-model="formdata.plateNumber" placeholder="请输入车牌号码"></el-input>
              </el-form-item>
            </div>
            <div class="col-4">
              <el-form-item label="货物名称">
                <el-select
                  class="gslt"
                  v-model="formdata.goods"
                  filterable
                  remote
                  :clearable="true"
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in goodsList"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <el-form-item label="最小金额">
                <el-input v-model.lazy="formdata.minCharge" placeholder="请输入最小金额"></el-input>
              </el-form-item>
            </div>
            <div class="col-4">
               <el-form-item label="最大金额">
                <el-input v-model.lazy="formdata.maxCharge" placeholder="请输入最大金额"></el-input>
              </el-form-item>
            </div>
            <div class="col-4">
              <el-form-item label="站长审核">
                <el-select  v-model="formdata.stationMasterMark" class="gslt">
                  <el-option v-for="item in stmststatus" :key="item.value" :value="item.value" :label="item.status"></el-option>
                </el-select >
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="formdata.beginTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择开始时间">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="col-4">
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="formdata.endTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="请选择结束时间">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="col-4">
              <el-form-item label="审核状态">
                <el-select class='gslt'  v-model="formdata.verifyStatus">
                  <el-option v-for="item in restaurants" :key="item.value" :value="item.value" :label="item.address"></el-option>
                </el-select >
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="row">
          <div class="col-4">
          </div>
          <div class="col-4" style="text-align: center;">
            <a href="javascript:void(0);" class='genric-btn success-border' @click='getCheckRecords'>查询</a>
          </div>
          <div class="col-4">
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

export default {
  name: 'SearchPanel',
  data(){
    return {
      formdata: {
        stationMasterMark: '',
        beginTime: '',
        endTime: '',
        goods: '',
        plateNumber: '',
        minCharge: '',
        maxCharge: '',
        verifyStatus: '',
        orgId: '',
      },
      orglist: [],
      stmststatus: [],
      goodsList: [],
      list: [],
      restaurants: [],
      states:[],
      loading: false,
      activeNames: [],
    }
  },
  mounted:function(){
    //获取货物名称
    this.getGoodsList();
    //获取审核状态列表
    this.getCommParamdic();
    //初始化时检索
    this.getCheckRecords();
    //获取站长审核状态
    this.getStMasterSatus();
    //获取收费站列表
    this.getOrgList();
  },
  methods: {
    handleChange(val) {
      //console.log(val);
    },
    //首字母检索
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.goodsList = this.list.filter(item => {
            var py = this.$PinYinHelper.toPinYin(item.label)[0].toLowerCase();
            return (py.indexOf(query.toLowerCase()) > -1) || (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          });
        }, 200);
      } else {
        this.goodsList = [];
        this.goodsList = this.list;
      }
    },
    //获取站长远程稽查状态
    getStMasterSatus(){
      let self = this
      this.$api.post("comm/getCommParamdic", {groupType:'StationMasterMark',haveSelAll:1}, res => {
        self.errorInfo ="";
        if (res.resultCode == "100") {
          this.stmststatus = [];
          for(var i = 0; i < res.resultData.length; i++){
            var rest = {
              value:"",
              status:""
            };
            rest.value = res.resultData[i].dicID;
            rest.status = res.resultData[i].dicName;
            self.stmststatus[i] = rest;
          }
        }}
      );
    },
    //获取所有收费站信息
    getOrgList(){
      let self = this
      this.$api.post("comm/getAllTolls", {}, res => {
        self.errorInfo ="";
        if (res.resultCode == "100") {
          this.orglist = [];
          for(var i = 0; i < res.resultData.length; i++){
            var rest = {
              value:"",
              name:""
            };
            rest.value = res.resultData[i].orgId;
            rest.name = res.resultData[i].orgName;
            self.orglist[i] = rest;
          }
        }}
      );
    },
    //获取货物名称
    getGoodsList(){
      let self = this
      this.$api.post("comm/getGoodList", {}, res => {
        if (res.resultCode == "100") {
          self.states = [];
          let index = 0;
          for(let i = 0; i < res.resultData.length; i++){
            for(let j = 0;j < res.resultData[i].length; j++){
              index = index + 1;
              let mid = {
                key:"",
                value: "",
                label: ""
              };
              mid.key = index;
              mid.label = res.resultData[i][j].greenThreeName;
              mid.value = res.resultData[i][j].greenThreeName;
              self.goodsList.push(mid);
              self.states.push(mid);
            };
          };
          self.list = self.states.map(item => {
            return {key: item.key, value: item.value, label: item.label };
          });
        }else{
          self.errorInfo = res.resultMsg;
        }
      });  
    },
    //获取审核状态列表
    getCommParamdic(){
      let self = this
      this.$api.post("comm/getCommParamdic", { groupType:'VerifyStatus', haveSelAll:1 }, res => {
        if (res.resultCode == "100") {
          if( res.resultData.length){
            this.restaurants = [];
            for(let i = 0; i < res.resultData.length; i++){
              let rest = {
                value:"",
                address:""
              };
              rest.value = res.resultData[i].dicID;
              rest.address = res.resultData[i].dicName;
              self.restaurants[i] = rest;
            }
          } 
         }else{
          self.errorInfo = res.resultMsg;
        }
     }); 
    },
    //上传父组件查询未查验货物信息
    getCheckRecords(){
      //this.$store.commit('addSearchOptions',this.formdata);
      this.activeNames = [];
      this.$emit('getCheckRecords');
    }
  },
  watch:{
    formdata:{
      handler(val, oldVal){
        this.$store.commit('addSearchOptions',val);
      },
      deep:true
    }
  }
}
</script>

<style lang='scss'>
.search-wrapper {

}
.el-collapse {
  border-top: 0px;
}
.el-collapse-item__header {
  border-bottom: 0px;
}
.genric-btn.success-border {
  color: #4cd3e3;
  border: 1px solid #4cd3e3;
  background: #fff;
}
.genric-btn.success-border:hover {
  color: #fff;
  background: #4cd3e3;
  border: 1px solid transparent;
}
.genric-btn.radius {
  border-radius: 3px;
}
.genric-btn {
  margin: 10px 10px 10px 0px;//上右下左
}
a, a:focus, a:hover {
  text-decoration: none;
  outline: 0;
}
a:hover {
  color: #0056b3;
  text-decoration: underline;
}
.genric-btn {
  display: inline-block;
  outline: none;
  line-height: 40px;
  padding: 0 30px;
  font-size: 1.2em;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}
.el-input__inner {
  border-radius: 0px;
}
.el-select {
  //display: -webkit-box;
}

.lstyle {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
}
</style>
