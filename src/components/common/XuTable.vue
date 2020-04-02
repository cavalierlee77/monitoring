<template>
  <el-table
    ref="multipleTable"
    :data="ReDataList"
    tooltip-effect="dark"
    stripe
    fit
    style="width: 100%"
    :height="TableHeight"
    @row-click="toggleSelectionForCell"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" v-if="seletcvisible"> </el-table-column>
    <template v-for="(item, index) in HeadList">
      <el-table-column
        v-if="!item.theadType || item.theadType === 'normal'"
        stripe
        fit
        :label="item.label"
        :prop="item.name"
        :sortable="sortable"
        :key="index"
      >
      </el-table-column>
      <el-table-column
        v-if="item.theadType && item.theadType === 'index'"
        stripe
        fit
        type="index"
        :label="item.label"
        :key="index"
      >
      </el-table-column>
      <el-table-column
        v-if="item.theadType && item.theadType === 'filters'"
        stripe
        fit
        :label="item.label"
        :prop="item.name"
        :sortable="sortable"
        :filters="[
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' }
        ]"
        :filter-method="filterHandler"
        :key="index"
      >
      </el-table-column>
    </template>

    <el-table-column label="操作" v-if="actionvisible">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click.stop="handleEdit(scope.$index, scope.row)"
          >{{ operateLabel }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  props: {
    TableHeight: {
      type: Number,
      default: function() {
        return {};
      }
    },
    DataList: {
      type: Array,
      default: function() {
        return {};
      }
    },
    HeadList: {
      type: Array,
      default: function() {
        return {};
      }
    },
    seletcvisible: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    operateLabel: {
      type: String,
      default: function() {
        return "详情";
      }
    },
    actionvisible: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    sortable: {
      type: Boolean,
      default: function() {
        return true;
      }
    }
  },
  data() {
    return {
      ReDataList: [],
      multipleSelection: []
    };
  },
  components: {},
  computed: {},
  methods: {
    //切换行选定状态方法
    toggleSelectionForCell(rows) {
      if ([rows]) {
        [rows].forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //取消已选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //编辑行,数据提交到父组件
    handleEdit(index, row) {
      if (row != "" && this.multipleSelection.length == 0) {
        this.$emit("action", [row]);
      } else {
        this.$emit("action", this.multipleSelection);
      }
    }
  },
  watch: {
    DataList: {
      handler(val, oldval) {
        this.ReDataList = val;
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
