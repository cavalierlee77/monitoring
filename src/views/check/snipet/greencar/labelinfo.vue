<template>
  <div class="" style="padding-bottom: 20px">
    <header><i class="el-icon-info"></i> 审核意见</header>
    <div class="radio">
      <el-radio-group v-model="radio">
        <el-radio :label="'查验合格'">查验合格</el-radio>
        <el-radio :label="'图片缺失'">图片缺失</el-radio>
        <el-radio :label="'图片不清晰'">图片不清晰</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      radio: "查验合格"
    };
  },
  components: {},
  methods: {
    init() {
      this.radio = "查验合格";
    }
  },
  watch: {
    radio: {
      handler: function(v) {
        this.$emit("setLabel", v);
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
