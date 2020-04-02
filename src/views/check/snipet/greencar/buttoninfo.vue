<template>
  <div class="" style="padding-bottom: 50px">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
    >
      <span>确认提交信息?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="action">确 定</el-button>
      </span>
    </el-dialog>
    <el-row v-if="isShow">
      <el-col :span="12" style="text-align: center"
        ><el-button type="success" @click="sucess"
          ><i class="el-icon-check"></i> 通过</el-button
        ></el-col
      >
      <el-col :span="12" style="text-align: center"
        ><el-button type="info" @click="failure"
          ><i class="el-icon-close"></i> 不通过</el-button
        ></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    isShow: {
      type: Boolean,
      default: function() {
        return true;
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      flag: true
    };
  },
  components: {},
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    sucess() {
      this.flag = true;
      this.dialogVisible = true;
    },
    failure() {
      this.flag = false;
      this.dialogVisible = true;
    },
    action() {
      this.$emit("action", this.flag);
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped></style>
