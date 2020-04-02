<template>
  <div class="edge" :style="{ height: height + 'px' }">
    <!-- <div>haahahaahah</div> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="绿通车" name="first">
        <Green :GreenTime="GreenTime"></Green>
      </el-tab-pane>
      <el-tab-pane label="集装箱" name="second">
        <Container :ContainerTime="ContainerTime"></Container>
      </el-tab-pane>
      <el-tab-pane label="联合收割机" name="third">
        暂无信息
        <!--<Harvester></Harvester>-->
      </el-tab-pane>
      <el-tab-pane label="军警" name="fourth">
        <Military :MilitaryTime="MilitaryTime"></Military>
      </el-tab-pane>
      <el-tab-pane label="消防、其他" name="Fifth">
        暂无信息
        <!--<Disaster></Disaster>-->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  components: {
    Green: () =>
      import(/* webpackChunkName: "operation" */ "./UpdateTime/Green.vue"),
    Container: () =>
      import(/* webpackChunkName: "operation" */ "./UpdateTime/Container.vue"),
    Harvester: () =>
      import(/* webpackChunkName: "operation" */ "./UpdateTime/Harvester.vue"),
    Military: () =>
      import(/* webpackChunkName: "operation" */ "./UpdateTime/Military.vue"),
    Disaster: () =>
      import(/* webpackChunkName: "operation" */ "./UpdateTime/Disaster.vue")
  },
  data() {
    return {
      activeName: "first",
      stationId: [],

      GreenTime: [],
      ContainerTime: [],

      MilitaryTime: []
    };
  },
  mounted() {
    this.getStation();
  },
  computed: {
    ...mapState({
      height: state => state.common.layoutHgt + 50
    })
  },
  methods: {
    handleClick(tab, event) {},
    // 获取收费站
    getStation() {
      this.$api.post("comm/getAllTolls", {}, res => {
        if (res.resultCode === "100") {
          for (var i = 0; i < res.resultData.length; i++) {
            // console.log(res.resultData[i].orgId);
            this.stationId.push(res.resultData[i].orgId);
            this.stationId = this.stationId.sort((a, b) => {
              return a - b;
            });
          }
          let cc = {};
          let str = "";
          this.stationId.forEach(item => {
            str += item + ",";
          });
          str = str.substring(0, str.length - 1);
          cc = str;
          // console.log(cc)
          this.getHistoryData(cc);
        } else {
        }
      });
    },
    // 获取截止时间
    getHistoryData(data) {
      var jsondata = {
        orgidList: data // 机构编号。选填项
      };
      // console.log(jsondata) ;               //查验绿通车过车记录查询
      this.$api.post("operation/getMaxTollTimeByOrgIdList", jsondata, res => {
        if (res.resultCode === "100") {
          var stationMore = res.resultData;
          // console.log(stationMore);
          this.GreenTime = stationMore.carTypeList[0].tollTimeList;
          this.ContainerTime = stationMore.carTypeList[1].tollTimeList;

          this.MilitaryTime = stationMore.carTypeList[2].tollTimeList;
        } else {
        }
      });
    },
    // 绿通车带入
    setTable(data) {}
  }
};
</script>
<style type="text/css">
.edge {
  height: 90%;
  margin: 10px 8px 0 8px;
  padding: 15px;
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
</style>
