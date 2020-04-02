<template>
  <div class="" style="padding: 5px 0px 5px 0px;">
    <el-row style="text-align: center;">
      <el-col :span="8">
        <el-button
          size="medium"
          icon="el-icon-check"
          type="success"
          @click="pass"
          >通 过</el-button
        >
      </el-col>
      <el-col :span="8">
        <el-popover placement="top" width="300" v-model="visible">
          <h3>审核不通过意见描述</h3>
          <div style="padding: 5px 5px 5px 5px">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入审核意见"
              v-model="desc"
            ></el-input>
          </div>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="unpass"
              >确定</el-button
            >
          </div>
          <el-button
            size="medium"
            icon="el-icon-edit"
            type="info"
            slot="reference"
            >不通过</el-button
          >
        </el-popover>
      </el-col>
      <el-col :span="8">
        <el-button
          size="medium"
          icon="el-icon-delete"
          type="danger"
          @click="drop"
          >废 弃</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      visible: false,
      desc: ""
    };
  },
  components: {},
  methods: {
    pass() {
      const status = {
        desc: "审核通过",
        pass: true,
        abd: false
      };
      this.$emit("action", status);
    },
    unpass() {
      this.visible = false;
      const status = {
        desc: this.desc,
        pass: false,
        abd: false
      };
      this.$emit("action", status);
    },
    drop() {
      this.$confirm("此操作将废弃该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const status = {
            desc: "",
            pass: false,
            abd: true
          };
          this.$emit("action", status);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消废弃"
          });
        });
    }
  }
};
</script>

<style scoped></style>
