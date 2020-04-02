<template>
  <div class="dialog">
    <el-dialog
      ref="dia"
      class="dialog-reset"
      :top="diaStyle.top"
      :title="title"
      :visible.sync="DV"
      :width="diaStyle.width"
      center
      :before-close="handleClose"
      append-to-body
    >
      <div slot="title" class="dialog-title">{{ title }}</div>
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    dialogVisible: {
      type: Boolean,
      default: function() {
        return {};
      }
    },
    title: {
      type: String,
      default: function() {
        return "审核数据项";
      }
    },
    diaStyle: {
      type: Object,
      default: function() {
        return {
          top: "0",
          width: "80%"
        };
      }
    }
  },
  data() {
    return {
      DV: false
    };
  },
  components: {},
  methods: {
    // 关闭模态框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("action");
          done();
        })
        .catch(_ => {});
    }
  },
  watch: {
    dialogVisible(val) {
      this.DV = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-title {
  font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi,
    sans-serif;
  font-size: 20px;
  font-weight: 700;
}
.dialog-reset /deep/ {
  .el-dialog__body {
    padding-top: 0px;
  }
}
</style>
