<template>
  <section>
    <el-form ref="form" label-width="70px">
      <query-input :inputData="queryInput"></query-input>
      <!-- <el-row>
        <el-col :span="7" :offset="5">
          <el-form-item label="开始时间">
            <date-picker
              v-if="false"
              v-model="SelData.startDate"
              vname="startDate"
              @change="datePickerChange"
              class="date-input"
            ></date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="结束时间">
            <date-picker
              v-model="SelData.endDate"
              vname="endDate"
              @change="datePickerChange"
              class="date-input"
            ></date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button
            type="primary"
            plain
            icon="el-icon-search"
            @click="onSearch"
            >检索</el-button
          >
          <span class="change-querytype" v-on:click="changeQueryType()">
            {{ changeQueryTypeFlag.iName
            }}<i :class="changeQueryTypeFlag.iClass"></i>
          </span>
        </el-col>
      </el-row>
      <el-row v-if="queryType">
        <el-col :span="7" :offset="5">
          <el-form-item label="收费站">
            <i-selector
              v-model="SelData.stations"
              vname="stations"
              :options="reStationList"
              @change="iSelectorChange"
            ></i-selector>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="岗位">
            <i-selector
              v-model="SelData.post"
              vname="post"
              :options="postList"
              @change="iSelectorChange"
            ></i-selector>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="queryType">
        <el-col :span="7" :offset="5">
          <el-form-item label="车牌号码">
            <el-input
              v-model="SelData.plateNumber"
              placeholder="请输入车牌号码"
              suffix-icon="el-icon-edit"
              class="el-input-a"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="货物名称">
            <fuzzy-selector
              v-model="SelData.goods"
              vname="goods"
              :libraryData="goodsList"
            ></fuzzy-selector>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="queryType">
        <el-col :span="7" :offset="5">
          <el-form-item label="审核状态">
            <i-selector
              v-model="SelData.examineType"
              vname="examineType"
              :options="reVerifyStatusList"
              @change="iSelectorChange"
            ></i-selector>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="金额范围">
            <el-col :span="11" class="charge-mix">
              <el-input
                v-model="SelData.minCharge"
                placeholder="最低金额"
                suffix-icon="el-icon-edit"
                class="charge-mix"
              ></el-input>
            </el-col>
            <el-col class="line charge-middle" :span="2">-</el-col>
            <el-col :span="11" class="charge-max">
              <el-input
                v-model="SelData.maxCharge"
                placeholder="最高金额"
                suffix-icon="el-icon-edit"
                class="charge-max"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row> -->
    </el-form>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { QueryMixins } from "../../../../../assets/mixins/HistoryQuery";

export default {
  name: "querybox",
  mixins: [QueryMixins],
  props: {},
  data() {
    return {
      loading: false,
      goodsLikeList: [],
      SelData: {
        startDate: "",
        endDate: "",
        stations: "",
        post: "",
        examineType: "",
        goods: "",
        plateNumber: "",
        minCharge: "",
        maxCharge: ""
      },
      queryType: false,
      changeQueryTypeFlag: {
        iClass: "el-icon-arrow-down",
        iName: "展开"
      },
      reVerifyStatusList: [],
      reStationList: [],
      queryInput: [
        {
          title: "开始时间",
          type: "date",
          model: "startDate",
          className: "date-input"
        },
        {
          title: "结束时间",
          type: "date",
          model: "endDate",
          className: "date-input"
        },
        {
          title: "车牌号码",
          // type: "input",
          // model: "plateNumber",
          // className: "el-input-a"
          string: `<el-input
              v-model="SelData.plateNumber"
              placeholder="请输入车牌号码"
              suffix-icon="el-icon-edit"
              class="el-input-a"
            ></el-input>`
        }
      ]
    };
  },
  components: {
    DatePicker: () =>
      import(/* webpackChunkName: "common" */ "../../../../common/DatePicker"),
    iSelector: () =>
      import(/* webpackChunkName: "common" */ "../../../../common/iSelector"),
    FuzzySelector: () =>
      import(
        /* webpackChunkName: "common" */ "../../../../common/FuzzySelector"
      ),
    QueryInput: () => import(/* common */ "../../../../common/Querybox")
  },
  mounted() {
    this.getVerifyStatus();
    this.getSubStationList();
    this.getGoodsList();
    this.checkQueryHei();
  },
  computed: {
    ...mapState({
      stationList: state => state.subhistory.stationList,
      postList: state => state.subhistory.postList,
      verifyStatusList: state => state.subhistory.statusList,
      goodsList: state => state.subhistory.goodsList
    })
  },
  methods: {
    getVerifyStatus() {
      this.$store.dispatch("getSubHisStatusList");
    },
    getSubStationList() {
      this.$store.dispatch("getSubStationList");
    },
    getSubPostList() {
      this.$store.dispatch("getSubStationList");
    },
    getGoodsList() {
      this.$store.dispatch("getSubHisGoodsList");
    },
    datePickerChange: function(val, name) {
      this.SelData[name] = val;
    },
    iSelectorChange: function(val, name) {
      this.SelData[name] = val;
    },
    fuzzySelectorChange: function(val, name) {
      this.SelData[name] = val;
    },
    onSearch() {
      const val = this.SelData;
      const _data = {
        beginTime: "",
        endTime: "",
        goods: val.goods,
        plateNumber: val.plateNumber,
        minCharge: val.minCharge,
        maxCharge: val.maxCharge,
        verifyStatus: val.examineType,
        orgId: val.stations
      };
      if (val.startDate)
        _data.beginTime = new Date(val.startDate).format("yyyy-MM-dd hh:mm:ss");
      if (val.endDate)
        _data.endTime = new Date(val.endDate).format("yyyy-MM-dd hh:mm:ss");
      for (const iterator of this.postList) {
        if (iterator.id !== "") _data[iterator.id] = "";
      }
      if (val.post !== "") _data[val.post] = "1";
      console.log(_data);
      this.$emit("action", _data);
    },
    checkQueryHei() {
      this.$emit("changeHei", 0, "GreenCar");
    },
    resetQueryData() {
      this.$set(this.SelData, "examineType", "");
      this.$set(this.SelData, "goods", "");
      this.$set(this.SelData, "minCharge", "");
      this.$set(this.SelData, "maxCharge", "");
    },
    resetVerifyStatusList(val) {
      this.reVerifyStatusList = val.map(item => ({
        id: item.dicID,
        name: item.dicName
      }));
    },
    resetStationList(val) {
      const list = [];
      for (const iterator of val) {
        list.push({
          id: iterator.orgId,
          name: iterator.orgName
        });
      }
      list.unshift({ id: "", name: "全部" });
      this.reStationList = list;
    }
  },
  watch: {
    verifyStatusList: {
      handler(val, oldVal) {
        this.resetVerifyStatusList(val);
      }
    },
    stationList: {
      handler(val) {
        this.resetStationList(val);
      }
    }
  }
};
</script>
<style scoped>
@import "../../_css/Query.css";
</style>
