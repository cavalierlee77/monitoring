<template>
  <div class="mainpage_header">
    <el-row :gutter="20" style="margin-right: 0px;margin-right: 0px;">
      <el-col :span="20" style="padding-left: 0px;padding-right: 0px;">
        <div class="x_mainpage_title">
          <el-row>
            <el-col :span="2">
              <div class="x_mainpage_logo"></div>
            </el-col>
            <el-col :span="22">
              <el-row>
                <h2 class="x_mainpage_Ctitle">{{ Ctitle }}</h2>
              </el-row>
              <el-row>
                <p class="x_mainpage_Etitle">{{ Etitle }}</p>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4" style="padding-left: 0px;padding-right: 0px;">
        <div class="fcontainer">
          <p>{{ loginUser.userName }}</p>
          <i class="exit" @click="loginOut"></i>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Ctitle: "吉林省绿通车辆综合管理软件",
      Etitle: "Jilin Green channel vehicle Integrated management software"
    };
  },
  mounted: function() {},
  computed: {
    ...mapState({
      loginUser: state => state.common.loginUser
    })
  },
  methods: {
    loginOut() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
/* 头部标题部分 */
.x_mainpage_title {
  background-color: #00b89b;
  height: 72px;
  position: relative;
  z-index: 1;
}
.x_mainpage_logo {
  position: relative;
  margin: 0 auto;
  margin-top: 10px;
  vertical-align: middle;
  width: 52px;
  height: 52px;
  background-image: url(../../../static/img/greenLogo.png);
  background-repeat: no-repeat;
  background-size: 90%;
}
.x_mainpage_Ctitle {
  position: relative;
  margin-top: 10px;
  float: left;
  height: 32px;
  font-size: 24px;
  font-weight: normal;
  color: rgb(255, 255, 255);
  letter-spacing: 6px;
  margin-bottom: 0px;
}
.x_mainpage_Etitle {
  position: relative;
  float: left;
  color: white;
  font-family: Georgia, serif;
  font-size: 13px;
  height: 36px;
  letter-spacing: 2.2px;
  margin-bottom: 0px;
}

.fcontainer {
  background-color: #00b89b;
  font-size: 16px;
  color: #fff;
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.exit {
  cursor: pointer;
  width: 26px;
  height: 26px;
  background-image: url(../../../static/img/logout.svg);
  background-size: 26px;
}
</style>
