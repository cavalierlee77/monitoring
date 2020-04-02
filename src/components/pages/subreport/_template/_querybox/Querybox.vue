<template>
  <section>
    <el-form ref="form" label-width="70px">
      <el-row>
        <el-col :span="6" :offset="1" v-if="nowTab === 'GreenCar'">
          <el-form-item label="分局角色">
            <i-selector
              v-model="SelData.role"
              vname="role"
              :options="reReportRoleInfo"
              @change="iSelectorChange"
            ></i-selector>
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
      <el-row>
        <el-col :span="7" :offset="0">
          <el-form-item label="报表类型">
            <el-radio-group
              v-model="reportShow"
              size="medium"
              v-on:change="radioChange"
            >
              <el-radio-button label="stat">审查统计表</el-radio-button>
              <el-radio-button label="detail">审查明细表</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from "vuex";

  export default {
    name: "querybox",
    props: {},
    data() {
      return {
        SelData: {
          startDate: "",
          endDate: "",
          role: ""
        },
        reportShow: "stat",
        reReportRoleInfo: []
      };
    },
    components: {
      DatePicker: () => import("../../../../common/DatePicker"),
      iSelector: () => import("../../../../common/iSelector")
    },
    mounted() {},
    computed: {
      ...mapState({
        nowTab: state => state.subreport.nowTab,
        reportRoleInfo: state => state.subreport.reportRoleInfo
      })
    },
    methods: {
      datePickerChange(val, name) {
        this.SelData[name] = val;
      },
      iSelectorChange(val, name) {
        this.SelData[name] = val;
      },
      radioChange(val, name) {
        this.$emit("changeRadio", this.reportShow);
      },
      resetReportRoleInfo(val) {
        let _arr = [];
        _arr.push({ id: "", name: "全部" });
        for (const iterator of val) {
          _arr.push({
            id: iterator.roleId,
            name: iterator.roleName
          });
        }
        this.reReportRoleInfo = _arr;
      },
      getSelDate() {
        let val = this.SelData;
        let _date = {
          beginTime: "",
          endTime: "",
          role: ""
        };
        if (val.startDate) {
          _date.beginTime = new Date(val.startDate).format(
            "yyyy-MM-dd hh:mm:ss"
          );
        }
        if (val.endDate) {
          _date.endTime = new Date(val.endDate).format("yyyy-MM-dd hh:mm:ss");
        }
        if (val.role) {
          _date.role = val.role;
        }
        return _date;
      },
      onSearch() {
        let _date = this.getSelDate();
        this.$emit("action", _date);
      },
      exportExcel() {
        let _date = this.getSelDate();
        this.$emit("changeDl", _date);
      }
    },
    watch: {
      reportRoleInfo: {
        handler(val) {
          this.resetReportRoleInfo(val);
        }
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
