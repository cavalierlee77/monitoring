<template>
  <div class="">
    <xu-table
      :TableHeight="59 + 48 * mkList.length"
      :HeadList="HeaderList"
      :DataList="mkList"
      :seletcvisible="false"
      :actionvisible="false"
      :operateLabel="'标记'"
    >
    </xu-table>
    <div class="" style="padding: 30px 0px 5px 0px;">
      <el-row style="text-align: center;">
        <el-col :span="12">
          <el-button size="medium" type="success" @click="markup"
            >确定</el-button
          >
        </el-col>
        <el-col :span="12">
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "",
  props: {
    tablelist: {
      type: Array,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      mkList: []
    };
  },
  components: {
    XuTable: () =>
      import(/* webpackChunkName: "check" */ "../../../common/XuTable.vue")
  },
  computed: {
    ...mapState({}),
    ...mapGetters(["HeaderList"])
  },
  methods: {
    markup() {
      for (let i = 0; i < this.mkList.length; i++) {
        const jsondata = {
          keyId: this.mkList[i].keyId, // 收费记录主键
          isSpecial: "1" // 特殊情况状态
        };
        this.$api.post("verify/setTruckSpecialStatus", jsondata, res => {
          if (res.resultCode == "100") {
            this.$message.success("成功");
          } else {
            this.$message.error("失败");
          }
        });
      }
      this.$emit("action", true);
    },
    cancel() {
      this.$emit("action", false);
    }
  },
  watch: {
    tablelist: {
      handler(val, oldval) {
        this.mkList = val;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped></style>
