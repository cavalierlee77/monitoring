<template>
  <div class="layout">
    <div :style="{ height: height + 'px' }">
      <!-- <up-load-file></up-load-file> -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>上传收费数据Excel文件</span>
          <i class="el-icon-info" @click="showInfo"></i>
        </div>
        <el-up-load-file></el-up-load-file>
      </el-card>
    </div>
    <el-dialog
      title="操作流程"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div v-html="info" class="upload-info"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      info: `<p style="margin-bottom: 10px">第一步：从票管系统里导出绿通车辆、集装箱车辆和联合收割机的收费数据保存为Excel文件，导出军车的收费数据保存为Excel文件，导出ETC集装箱收费数据保存为Excel文件。</p>
            <p style="margin-bottom: 10px">第二步：打开军车Excel文件，选择另存为把保存类型修改为*.xlsx,填写名称并保存。</p>
            <p style="margin-bottom: 10px">第三步：把上述的Excel文件分别通过绿通系统的《数据上传》功能上传至数据库。</p>
            <p style="margin-bottom: 10px">第四步：在《等待审核页面》按审核流程对相关信息进行审核。</p>
            <p style="margin-bottom: 10px">第五步：在《报表打印》中选择对应的时间范围，检索出查验数据导出Excel表，与相同时间收费数据进行比较核对是否一致。</p>`
    };
  },
  components: {
    UpLoadFile: () => import("../../common/upload/index"),
    ElUpLoadFile: () => import("../../common/upload/elindex")
  },
  computed: {
    ...mapState({
      height: state => state.common.layoutHgt + 35
    })
  },
  methods: {
    showInfo() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
.layout {
  background-color: #fff;
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px;
}
.box-card {
  width: 20rem;
}
.el-icon-info {
  float: right;
  font-size: 18px;
  color: #66b1ff;
}
.upload-info {
  font-size: 14px;
}
</style>
