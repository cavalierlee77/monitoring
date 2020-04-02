<template>
  <div class="">
    <header><i class="el-icon-info"></i> 查验信息</header>
    <el-form ref="form" label-position="left" label-width="120px">
      <el-row>
        <slot name="platenumber_search"></slot>
        <el-col :span="6">
          <div class="item_list">
            <label for="">货物名称</label>
            <el-select
              v-model="goodsName"
              filterable
              clearable
              remote
              @change="setCommitData($event, 'goodsName')"
              @clear="remoteMethod"
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in remoteList"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">收费员</label>
            <el-input
              v-model="exitTollId"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="item_list">
            <label for="">入口站</label>
            <el-input
              v-model="enteName"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">入口时间</label>
            <el-input
              v-model="enteDate"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">出口站</label>
            <el-input
              v-model="orgName"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">出口时间</label>
            <el-input
              v-model="exitDate"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="item_list">
            <label for="">应收金额</label>
            <el-input
              v-model="amountReceivable"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">计重</label>
            <el-input
              v-model="wholeTruckWeight"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">司机电话</label>
            <el-input
              v-model="driverPhoneNumber"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "GreenCar",
  props: {
    checkdata: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      goodsName: "",
      exitTollId: "",
      enteName: "",
      enteDate: "",
      orgName: "",
      exitDate: "",
      amountReceivable: "",
      wholeTruckWeight: "",
      driverPhoneNumber: "",
      loading: false,
      curGoodList: [],
      remoteList: []
    };
  },
  components: {},
  mounted() {
    this.setNowGoodsList();
  },
  computed: {},
  methods: {
    setCommitData(options, name) {
      const opt = new Object();
      opt[name] = options;
      this.$emit("action", opt);
    },
    setNowGoodsList() {
      this.curGoodList = this.$store.state.check.goodsList;
      this.remoteList = this.curGoodList;
    },
    remoteMethod(query) {
      if (query && query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.remoteList = this.curGoodList.filter(item => {
            const py = this.$PinYinHelper.toPinYin(item.value)[0].toLowerCase();
            return (
              py.indexOf(query.toLowerCase()) > -1 ||
              item.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
          });
        }, 200);
      } else {
        this.remoteList = [];
        this.remoteList = this.curGoodList;
      }
    }
  },
  watch: {
    checkdata: {
      handler(val, oldval) {
        this.goodsName = val.goodsName;
        this.exitTollId = val.exitTollId;
        this.enteName = val.enteName;
        this.enteDate = val.enteDate;
        this.orgName = val.orgName;
        this.exitDate = val.exitDate;
        this.amountReceivable = val.amountReceivable;
        this.wholeTruckWeight = val.wholeTruckWeight;
        this.driverPhoneNumber = val.driverPhoneNumber;
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
.item_list {
  padding: 10px 0px 10px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.item_list label {
  position: relative;
  display: inline-block;
  width: 120px;
  text-align: left;
  padding-left: 20px;
}
.item_list .el-select {
  width: 100%;
}
</style>
