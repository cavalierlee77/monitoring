<template>
  <div class="" style="padding-bottom: 20px">
    <header><i class="el-icon-info"></i> 审核意见描述</header>
    <div class="radio">
      <el-row>
        <el-col :span="24">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            v-model="verifySuggest"
          ></el-input>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      verifySuggest: "确认是绿通车"
    };
  },
  components: {},
  methods: {
    init() {
      this.verifySuggest = "确认是绿通车";
    }
  },
  watch: {
    verifySuggest: {
      handler: function(v) {
        this.$emit("setVerifySuggest", v);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
header {
  padding: 10px 10px 10px 10px;
  font-size: 16px;
  font-weight: 700;
}
.radio {
  padding: 10px 10px 10px 20px;
}
</style>
