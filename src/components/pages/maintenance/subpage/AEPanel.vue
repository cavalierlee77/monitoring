<template>  
<div class="add-edit-panel-wrapper">
  <div class="row">
    <div class="col-12">
      <header class='listNum'>{{label}}:{{index}}/{{total}}</header>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <header class='lstyle'>文本数据</header>
    </div>
  </div>
	<el-form :model="formdata" :rules="rules" ref="ruleForm" label-width="100px">
    <div class="row">
      <div class="col-4" v-if='label == "添加页面"'>
        <el-form-item label="收费站名称" prop='orgId'>
          <el-select  v-model="formdata.orgId" class="gslt" clearable @visible-change='getCheckorList(formdata.orgId)'>
            <el-option v-for="item in orglist" :key="item.value" :value="item.value" :label="item.name"></el-option>
          </el-select >
        </el-form-item>
      </div>
      <div class="col-4" v-if='label == "添加页面"'>
        <el-form-item label="查验人员" prop='checkor'>
          <el-select  v-model="formdata.checkor" class="gslt" clearable>
            <el-option v-for="item in checkorlist" :key="item.userId" :value="item.userId" :label="item.userName"></el-option>
          </el-select >
        </el-form-item>
      </div>
      <div class="col-4" v-if='label == "添加页面"'>
        <el-form-item label="查验时间" prop='checkTime'>
          <el-date-picker
            v-model="formdata.checkTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <el-form-item label="车牌号码" prop='plateNumber'>
          <el-input v-model="formdata.plateNumber" placeholder="请输入车牌号码"></el-input>
        </el-form-item>
      </div>
      <div class="col-4">
        <el-form-item label="车牌颜色" prop='plateColor'>
          <el-input v-model="formdata.plateColor" placeholder="请输入车牌颜色"></el-input>
        </el-form-item>
      </div>
      <div class="col-4">
        <el-form-item label="司机电话" prop='driverPhoneNumber'>
          <el-input v-model="formdata.driverPhoneNumber" placeholder="请输入司机电话号码"></el-input>
        </el-form-item>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <el-form-item label="货物名称" prop='goodsName'>
          <el-select
            class="gslt"
            v-model="formdata.goodsName"
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
      <div class="col-4">
        <el-form-item label="计重(吨)" prop='wholeTruckWeight'>
          <el-input v-model="formdata.wholeTruckWeight" placeholder="请输入重量"></el-input>
        </el-form-item>
      </div>
      <div class="col-4">
        <el-form-item label="应收金额(元)" prop='amountReceivable'>
          <el-input v-model="formdata.amountReceivable" placeholder="请输入应收金额"></el-input>
        </el-form-item>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <el-form-item label="查验结论" prop='isGcTrunck'>
          <el-select class='gslt'  v-model="formdata.isGcTrunck">
            <el-option v-for="item in isGcTrunckList" :key="item.value" :value="item.value" :label="item.address"></el-option>
          </el-select >
        </el-form-item>
      </div>
      <div class="col-4">
        <el-form-item label="审核状态" prop='verifyStatus'>
          <el-select class='gslt'  v-model="formdata.verifyStatus">
            <el-option v-for="item in restaurants" :key="item.value" :value="item.value" :label="item.address"></el-option>
          </el-select >
        </el-form-item>
      </div>
      <!-- <div class="col-4">
        <el-form-item label="审核意见" prop='verifySuggestSelect'>
          <el-select class='gslt'  v-model="formdata.verifySuggestSelect">
            <el-option v-for="item in verifySuggestSelectList" :key="item" :value="item" :label="item"></el-option>
          </el-select >
        </el-form-item>
      </div> -->
    </div>
  </el-form>
  <div class="row">
    <div class="col-12">
      <header for="" class='lstyle'>图片添加</header>
    </div>
    <div class="col-12">
      <pic @updateFileList='updateFileList' :editPicList='editPicList'></pic>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <header for="" class='lstyle'>操作按钮</header>
    </div>
    <div class="col-4" style='text-align: center'>
      <el-button @click="submitForm('ruleForm')" size="small" type="primary" plain>保存</el-button>
    </div>
    <div class="col-4" style='text-align: center'>
      <el-button @click="resetForm('ruleForm')" size="small" type="info" plain>重置</el-button>
    </div>
    <div class="col-4" style='text-align: center'>
      <el-button @click="close" size="small" type="info" plain>取消</el-button>
    </div>
  </div>
</div>
</template>
<script> 
import Pic from './Pic.vue'
import {that} from '../../../../main.js'
export default {
  props:{
    index: {
      type: Number,
      default: function(){
        return {

        }
      }
    },
    total: {
      type: Number,
      default: function(){
        return {

        }
      }
    },
    label: {
      type: String,
      default: function(){
        return {

        }
      }
    },
    editrowdata: {
      type: Object,
      default: function(){
        return {

        }
      }
    }
  },
  components: {
    Pic
  },
  data: function() {
    return	{
      //存储桶、区域
      Bucket:'jllt-1256929003',
      Region:'ap-beijing',
      // Bucket:'liufeng-1257802238',
      // Region:'ap-beijing',
      //上传数据对象
      formdata: {
        checkId: '',
        orgId: '',
        checkor: '',
        checkTime: '',
        plateNumber: '',
        plateColor: '',
        driverPhoneNumber: '',
        isGcTrunck: '',
        goodsName: '',
        wholeTruckWeight: '',
        amountReceivable: '',
        verifyStatus: '',
        //verifySuggestSelect: '',
        truckHeadPics: ''
      },
      editPicList: [],
      //表单校验提示
      rules: {
        orgId: [
          { required: true, message: '请选择收费站名称', trigger: 'change' }
        ],
        checkor: [
          { required: true, message: '请选择查验人员', trigger: 'change' }
        ],
        checkTime: [
          {  required: true, message: '请选择查验时间', trigger: 'change' }
        ],
        plateNumber: [
          { required: true, message: '请输入车牌号码', trigger: 'blur' },
        ],
        plateColor: [
          { required: true, message: '请输入车牌颜色', trigger: 'blur' },
        ],
        driverPhoneNumber: [
          { required: true, message: '请输入司机手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        isGcTrunck: [
          { required: true, message: '请选择查验结论', trigger: 'change' }
        ],
      },
      //收费站列表
      orglist: [],
      //查验人员列表
      checkorlist: [],
      //货物列表
      goodsList: [],
      list: [],
      //图片列表
      picFileList: [],
      loading: false,
      //查验结论
      isGcTrunckList: [{
        value: '1',
        address: '重量合格' 
      },{
        value: '2',
        address: '容积合格' 
      },{
        value: '3',
        address: '重量不合格' 
      },{
        value: '4',
        address: '容积不合格' 
      },{
        value: '5',
        address: '夹带其他' 
      },{
        value: '6',
        address: '其他' 
      }],
      //审核状态列表
      restaurants: [{
        value: '1',
        address: '待审核' 
      },{
        value: '2',
        address: '不通过'
      },{
        value: '3',
        address: '通过'
      }],
      //审核意见
      verifySuggestSelectList: [
      '查验合格','图片缺失','图片不清晰'
      ]
    }
  },
  methods:{
    submitForm(formName) {
      //有bug、时间单独验证
      this.$refs[formName].validate((valid) => {
        let self = this;
        if (valid) {
          if(self.formdata.checkTime && self.formdata.checkTime != ''){
            if(self.label === '添加页面'){
              self.uploadinfo();
            }else{
              self.uploadeditinfo();
            }
          }else{
            return false;
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    //获取查验人员列表
    getCheckorList(val){
      let self = this
      this.$api.post("user/getCheckUsers", { orgId: val }, res => {
        self.errorInfo ="";
        if (res.resultCode == "100") {
          this.checkorlist = [];
          for(var i = 0; i < res.resultData.length; i++){
            var rest = {
              value:"",
              name:""
            };
            rest.userId = res.resultData[i].userId;
            rest.userName = res.resultData[i].userName;
            self.checkorlist[i] = rest;
          }
        }
      });
    },
    //获取货物名称列表
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
    //上传修改信息
    uploadeditinfo(){
      let self = this;
      this.$api.post("webcheck/updateCheckRecord", self.formdata, res => {
        if (res.resultCode == "100") {
          self.$message.success('成功');
          self.$emit('close');
        }
        else{
          self.$message.error('失败');
        }
      });
    },
    //上传信息到后台
    uploadinfo(){
      let self = this;
      let FD = new FormData();
      let data = {};
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      data = self.formdata;
      let str = '';
      if(self.picFileList.length > 0){
        str = self.picFileList[0].name+';'
        for(let i = 1;i < self.picFileList.length; i++){
          str += self.picFileList[i].name+';';
        };
      };
      data.otherPics = str;
      FD.append('data',JSON.stringify(data));
      //本地
      //this.$axios.post("jlgcstat/check/saveCheckRecordV2", FD, config).then((res) => { 
      //云上  
      this.$axios.post("check/saveCheckRecordV2", FD, config).then((res) => {
        if (res.data.resultCode == "100") {
          self.$message.success('成功');
          self.uploadcos(self.formdata.orgId,self.formdata.checkTime);
          self.$emit('close');
        }
        else{
          self.$message.error('失败');
        }
      }).catch(function (error) {
          _this.$router.push('/')
      });
    },
    //上传图片到对象存储
    uploadcos(orgid,checktime){
      let self = this;
      let COS = require('cos-js-sdk-v5');
      let cos = new COS({
        getAuthorization: function (options, callback) {
          // 异步获取签名
          self.$api.post('authen/getAuthen', {
            bucket: options.Bucket,
            region: options.Region,
          }, function (data) {
            let msg = JSON.parse(data.resultData);
            callback({
              TmpSecretId: msg.data.credentials.tmpSecretId, 
              TmpSecretKey: msg.data.credentials.tmpSecretKey, 
              XCosSecurityToken: msg.data.credentials.sessionToken, 
              ExpiredTime: msg.data.expiredTime,
            });
          });
        }
      });
      let nowdate = checktime.replace(/[^0-9]/ig,"").substring(0,8);
      if(this.picFileList.length > 0){
        for(var k = 0;k < this.picFileList.length; k++){
          cos.putObject({
            Bucket: this.Bucket, /* 必须 */
            Region: this.Region, /* 必须 */
            Key: '/'+nowdate+'/'+orgid+'/'+this.picFileList[k].name, /* 必须 */
            StorageClass: 'STANDARD',
            Body: this.picFileList[k], //上传文件对象
            onProgress: function(progressData) {
              console.log(JSON.stringify(progressData));
            }
          }, function(err, data) {
              console.log(err || data);
          }); 
        }
      };
    },
    updateFileList(val){
      this.picFileList = val;
    },
    //关闭页面
    close(){
      this.$emit('close');
    }
    //获取审核状态列表
    // getCommParamdic(){
    //   let self = this
    //   this.$api.post("comm/getCommParamdic", { groupType:'VerifyStatus', haveSelAll:1 }, res => {
    //     if (res.resultCode == "100") {
    //       if( res.resultData.length){
    //         this.restaurants = [];
    //         for(let i = 0; i < res.resultData.length; i++){
    //           let rest = {
    //             value:"",
    //             address:""
    //           };
    //           rest.value = res.resultData[i].dicID;
    //           rest.address = res.resultData[i].dicName;
    //           self.restaurants[i] = rest;
    //         }
    //       } 
    //      }else{
    //       self.errorInfo = res.resultMsg;
    //     }
    //  }); 
    // },
	},
  computed: {
    // formdata: function () {
    //   if(this.editrowdata != ''){
    //     return {
    //       checkId: this.editrowdata.checkId,
    //       orgId: this.editrowdata.orgId,
    //       checkor: this.editrowdata.checkor,
    //       checkTime: this.editrowdata.checkTime,
    //       plateNumber: this.editrowdata.plateNumber,
    //       plateColor: this.editrowdata.plateColor,
    //       driverPhoneNumber: this.editrowdata.driverPhoneNumber,
    //       isGcTrunck: this.editrowdata.isGcTrunck,
    //       goodsName: this.editrowdata.goodsName,
    //       wholeTruckWeight: this.editrowdata.wholeTruckWeight,
    //       amountReceivable: this.editrowdata.amountReceivable,
    //       verifyStatus: this.editrowdata.verifyStatus,
    //       verifySuggestSelect: this.editrowdata.verifySuggestSelect,
    //     };
    //   }else{
    //     return {
    //       checkId: '',
    //       orgId: '',
    //       checkor: '',
    //       checkTime: '',
    //       plateNumber: '',
    //       plateColor: '',
    //       driverPhoneNumber: '',
    //       isGcTrunck: '',
    //       goodsName: '',
    //       wholeTruckWeight: '',
    //       amountReceivable: '',
    //       verifyStatus: '',
    //       verifySuggestSelect: '',
    //     }
    //   }
    // }
  },
	mounted: function() {
    //获取货物名称
    this.getGoodsList();
    //获取收费站列表
    this.getOrgList();
    //获取查验人员列表
    // this.getCheckorList();
    //获取审核状态列表
    //this.getCommParamdic();
	},
	watch:{
    // props 监听***
    'label':{
　　  immediate:true,
      handler:function(){
      }
    },
    'editrowdata':{
      immediate:true,
      handler:function(){
        if(!this.editrowdata.em){
          this.getCheckorList(this.editrowdata.orgId);
          this.formdata = {
            checkId: this.editrowdata.checkId,
            orgId: this.editrowdata.orgId,
            checkor: this.editrowdata.checkor,
            checkTime: this.editrowdata.checkTime,
            plateNumber: this.editrowdata.plateNumber,
            plateColor: this.editrowdata.plateColor,
            driverPhoneNumber: this.editrowdata.driverPhoneNumber,
            isGcTrunck: this.editrowdata.isGcTrunck,
            goodsName: this.editrowdata.goodsName,
            wholeTruckWeight: this.editrowdata.wholeTruckWeight,
            amountReceivable: this.editrowdata.amountReceivable,
            verifyStatus: this.editrowdata.verifyStatus,
            //verifySuggestSelect: this.editrowdata.verifySuggestSelect,
          };
          for(let i = 0;i< this.editrowdata.picdata.length; i++){
            this.editPicList.push({
              value: this.editrowdata.picdata[i],
              name: "List"+i
            })
          }
          
        }
      }
    }
	}
};
</script>

<style scoped>
.add-edit-panel-wrapper {
  display: block;
  padding: 0px 0px 5px 0px;
  margin: 10px 0px 10px 0px;
}
.lstyle {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
}
.listNum {
  padding: 10px 10px 10px 10px;
 /*  margin: 10px 10px 10px 10px; */
  font-weight: 500px;
  font-size: 20px;
  box-sizing: border-box;
  /* border-radius: 4px; */
  background-color: #F56C6C;
  color: #fff;
}
</style>
