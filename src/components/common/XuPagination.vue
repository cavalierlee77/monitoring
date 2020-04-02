<template>
  <div class="xu-pg">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="Xpage.currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="Xpage.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="Xpage.Total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    page: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      Xpage: {
        currentPage: 1,
        pageSize: 50,
        Total: 0
      }
    };
  },
  components: {},
  methods: {
    handleSizeChange(val) {
      const nowPage = {
        currentPage: this.Xpage.currentPage,
        pageSize: val
      };
      this.$emit("action", nowPage);
    },
    handleCurrentChange(val) {
      const nowPage = {
        currentPage: val,
        pageSize: this.Xpage.pageSize
      };
      this.$emit("action", nowPage);
    }
  },
  watch: {
    page: {
      handler(val, oldval) {
        this.Xpage.currentPage = val.currentPage;
        this.Xpage.pageSize = val.pageSize;
        this.Xpage.Total = val.Total;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
.xu-pg {
  margin-top: 7px;
  margin-bottom: -7px;
  float: right;
}
</style>
