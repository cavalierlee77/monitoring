<template>
  <div class="rooter">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/main/usermanager' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="10" :offset="6">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="用户帐号" prop="loginId">
            <el-input v-if="!isEdit" v-model="form.loginId"></el-input>
            <el-input v-if="isEdit" v-model="form.loginId" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item label="所属机构">
            <el-select  v-model="form.orgId">
              <el-option v-for="item in org" :key="item.orgId" :value="item.orgId" :label="item.orgName"></el-option>
            </el-select >
          </el-form-item>
          <el-form-item label="岗位名称">
            <el-select v-model="form.roleId">
              <el-option v-for="item in userRole" :key="item.roleId" :value="item.roleId" :label="item.roleName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="备注">
            <el-input v-model="form.memo" type="textarea"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button v-if="!isEdit" type="primary" @click="submit">提交</el-button>
            <el-button v-if="isEdit" type="primary" @click="update">修改</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      required: true,
      default: true
    },
    editUserKey: {
      type: Object,
      default: function() {
        return {

        }
      }
    },
    org: {
      type: Array,
      default: function() {
        return {

        }
      }
    },
    userRole: {
      type: Array,
      default: function() {
        return {

        }
      }
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if(this.form.confirmPassword != ""){
          this.$refs.form.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validateConfirmPassword = (rule, value, callback) => {
      console.log(this);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      title: "新建用户",
      provinces: [],
      userStatuses: [],
      form: {
        loginId: "",
        password: "",
        confirmPassword: "",
        orgId: "",
        roleId: "",
        userName: "",
        memo: ""
      },
      rules: {
        id: [
          {
            required: true,
            message: "请输入用户帐户",
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur",
            required: true
          }
        ],
        confirmPassword: [
          {
            validator: validateConfirmPassword,
            trigger: "blur",
            required: true
          }
        ],
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit: function() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this._submitData();
        }
      });
    },
    update: function(){
      this.$refs.form.validate(valid => {
        if (valid) {
          this._updateData();
        }
      });
    },
    cancel: function() {
      this.$emit("cancel");
    },
    _submitData: function() {
      var param = {
        //userkeyid : 12, //用户主键，新增用户不需要给该字段赋值
        loginId: this.form.loginId, //用户账号
        userName: this.form.userName, //用户名字
        password: this.form.password, //用户密码
        orgId: this.form.orgId, //用户所属省份
        roleId: this.form.roleId, //用户状态
        //remark: this.form.memo //备注
      };
      let desc = "添加用户";
      // if (this.isEdit == true) {
      //   desc = "编辑用户";
      //   param["userkeyid"] = this.editUserKeyId;
      //   //param["abc"]="1234";
      // }
      this.$api.post(
        "user/insertBaseUser",
        param,
        res => {
          this.$message({
            message: desc + "成功"
          });
          this.$emit("submit");
        },
        () => {
          this.$message(desc + "失败");
        }
      );
    },
    _updateData: function() {
      var param = {
        //userkeyid : 12, //用户主键，新增用户不需要给该字段赋值
        loginId: this.form.loginId, //用户账号
        userName: this.form.userName, //用户名字
        password: this.form.password, //用户密码
        orgId: this.form.orgId, //用户所属省份
        roleId: this.form.roleId, //用户状态
        //remark: this.form.memo //备注
      };
      let desc = "添加用户";
      // if (this.isEdit == true) {
      //   desc = "编辑用户";
      //   param["userkeyid"] = this.editUserKeyId;
      //   //param["abc"]="1234";
      // }
      this.$api.post(
        "user/updateBaseUser",
        param,
        res => {
          this.$message({
            message: desc + "成功"
          });
          this.$emit("submit");
        },
        () => {
          this.$message(desc + "失败");
        }
      );
    },
    edit(){
      if(this.isEdit){
        this.form.loginId = this.editUserKey.userId;
        this.form.password = this.editUserKey.password;
        this.form.confirmPassword = this.editUserKey.password;
        this.form.orgId = this.editUserKey.orgId;
        this.form.roleId = this.editUserKey.roleId;
        this.form.userName = this.editUserKey.userName;
      }     
    }
    // _queryUser: function(self) {
    //   let url = "user/getUser/" + self.editUserKeyId;
    //   let encodeUrl = encodeURI(url);
    //   self.$api.get(encodeUrl, null, res => {
    //     var user = res.resultData;
    //     self.form.id = user.userid;
    //     self.form.name = user.username;
    //     self.form.password = user.password;
    //     self.form.confirmPassword = user.password;
    //     self.form.ownProvince = user.provincekeyid;
    //     self.form.userStatus = user.userstatus;
    //     self.form.memo = user.remark;
    //   });
    // }
  },
  mounted() {
    this.edit();
    // this.$api.post(
    //   "user/getUserBasicInfos",
    //   null,
    //   res => {
    //     if (res.resultData != null) {
    //       this.provinces = res.resultData.provinces;
    //       this.userStatuses = res.resultData.userstatuss;
    //       if (this.isEdit == true) {
    //       } else {
    //         if (this.provinces != null) {
    //           this.form.ownProvince = this.provinces[0].provinceKeyId;
    //         }
    //         if (this.userStatuses != null) {
    //           this.form.userStatus = this.userStatuses[0].dicId;
    //         }
    //       }
    //     }
    //     if (this.isEdit == true) {
    //       this._queryUser(this);
    //     }
    //   },
    //   () => {}
    // );
  },
  watch:{
    
  }
};
</script>

<style scoped>
.rooter {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 10px;
  padding-left: 10px;
  background: white;
}

.el-form {
  margin-top: 10px;
  margin-right: 10px;
}
</style>


