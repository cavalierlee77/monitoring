<template>
  <section>
    <el-form ref="form" label-width="70px">
      <el-row>
        <el-col :span="6" :offset="1" v-if="nowTab === 'GreenCar'">
          <el-form-item label="货物名称">
            <fuzzy-selector
              v-model="SelData.goods"
              vname="goods"
              :libraryData="goodsList"
            ></fuzzy-selector>
          </el-form-item>
        </el-col>
        <el-col
          :span="nowTab === 'GreenCar' ? 6 : 7"
          :offset="nowTab === 'GreenCar' ? 0 : 4"
        >
          <el-form-item label="开始时间">
            <date-picker
              v-model="SelData.startDate"
              vname="startDate"
              v-on:change="datePickerChange"
            ></date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="nowTab === 'GreenCar' ? 6 : 7">
          <el-form-item label="结束时间">
            <date-picker
              v-model="SelData.endDate"
              vname="endDate"
              v-on:change="datePickerChange"
            ></date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="nowTab === 'GreenCar' ? 0 : 1">
          <el-button
            type="primary"
            plain
            icon="el-icon-search"
            v-on:click="onSearch"
            >检索</el-button
          >
        </el-col>
        <el-col :span="1">
          <i class="excel" v-on:click="exportExcel"></i>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from "vuex";
  import DatePicker from "../../../../common/DatePicker";
  import FuzzySelector from "../../../../common/FuzzySelector";

  export default {
    name: "querybox",
    props: {},
    data() {
      return {
        SelData: {
          startDate: "",
          endDate: "",
          goods: ""
        }
      };
    },
    components: {
      DatePicker,
      FuzzySelector
    },
    mounted() {},
    computed: {
      ...mapState({
        nowTab: state => {
          console.log(state.report.nowTab);
          return state.report.nowTab;
        },
        goodsList: state => state.history.goodsList
      })
    },
    methods: {
      datePickerChange: function(val, name) {
        this.SelData[name] = val;
      },
      getSelDate() {
        let val = this.SelData;
        let _date = {
          beginTime: "",
          endTime: ""
        };
        if (val.startDate)
          _date.beginTime = new Date(val.startDate).format(
            "yyyy-MM-dd hh:mm:ss"
          );
        if (val.endDate)
          _date.endTime = new Date(val.endDate).format("yyyy-MM-dd hh:mm:ss");
        return _date;
      },
      onSearch() {
        let _date = this.getSelDate();
        this.$emit("action", _date);
      },
      exportExcel() {
        let _date = this.getSelDate();
        this.$emit("changeDl", _date);
      },
      fuzzySelectorChange: function(val, name) {
        this.SelData[name] = val;
      }
    }
  };
</script>
<style scoped>
  .el-row {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-input {
    width: 220px;
  }
  .charge-mix,
  .charge-max {
    width: 104px;
  }
  .charge-middle {
    width: 10px;
    text-align: center;
  }
  .change-querytype {
    margin-left: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #ccc;
    transition: color ease 240ms;
  }
  .change-querytype:hover {
    color: #409eff;
    transition: color ease 240ms;
  }
  .excel {
    background-image: url(../../../../../../static/img/Excel.svg);
    background-size: 36px;
    background-repeat: no-repeat;
    display: block;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }
</style>
