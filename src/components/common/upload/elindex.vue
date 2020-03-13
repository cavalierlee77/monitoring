<template>
  <div class="">
    <el-upload
      class="upload-demo"
      accept=".xlsx,.xls"
      ref="upload"
      action="http://139.129.111.60:8080/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="handleSucess"
      :on-error="handleError"
      :http-request="action"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
        >数据上传</el-button
      >
    </el-upload>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "ElUpLoadFile",
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    clearUploadedImage() {
      this.$refs.upload.clearFiles();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSucess(e) {
      console.log("sss");
      this.$message("上传成功" + e.resultMsg);
    },
    handleError(e) {
      console.log("ooo");
      this.$message("上传失败" + e.resultMsg);
    },
    action(e) {
      const self = this;
      const formdata = new FormData();
      formdata.append(e.file.name, e.file);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post("jlgcstat/operation/uploadExcel", formdata, config)
        .then(function(res) {
          if (res.data.resultCode === "100") {
            self.$notify({
              title: "提示",
              message: "上传成功",
              type: "success",
              duration: 0
            });
            self.clearUploadedImage();
          } else {
            self.$notify.error({
              title: "错误",
              message: res.data.resultMsg,
              duration: 0
            });
          }
        })
        .catch(function(error) {
          self.$message.error(error);
        });
    }
  }
};
</script>

<style scoped>
.upload-demo {
  text-align: center;
}
</style>
