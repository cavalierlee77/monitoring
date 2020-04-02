<template>
  <div :ref="'panelwidth' + Xindex" :class="'wrapper' + Xindex">
    <header>{{ Xindex + 1 }}/{{ Xsum }}</header>
    <!-- 用于切换车辆查验数据展示组件 -->
    <keep-alive>
      <component :is="current_view" :checkdata="car_check_data" @action="set">
        <template #platenumber_search>
          <!-- v-slot插槽中插入车牌检索组件 -->
          <pl-search-panel
            :checkdata="car_check_data"
            @action="getTrafficInfoByPnTime"
            @resetPlateNumber="resetPlateNumber"
          >
          </pl-search-panel>
        </template>
      </component>
    </keep-alive>
    <!-- 车牌检索结果展示面板 -->
    <result-panel :visible="visible" @action="_setVisible" :poprverwidth="wi">
      <template #resultdata>
        <!-- 第一个插槽中存放检索结果表格 -->
        <xu-table
          :TableHeight="400"
          :HeadList="detailHeaderList"
          :DataList="TrafficInfoByPnTime"
          :seletcvisible="false"
          :operateLabel="'选择'"
          @action="selectTraffic"
        >
        </xu-table>
      </template>
      <template #rf>
        <!-- 第二个插座中存入用于定位的元素 -->
        <div class="referance_line" v-popover:popover></div>
      </template>
    </result-panel>
    <!-- 图片视频数据展示面板 -->
    <pic-panel
      ref="picturePanel"
      :Xcol="4"
      :show_upload_icon="true"
      :picture_video_data="picture_video_data"
      @action="setPicList"
    >
    </pic-panel>
    <!-- 审核时间线展示审核数据 -->
    <time-line-panel :time_line_data="time_line_data"> </time-line-panel>
    <!-- 提交操作按钮组件 -->
    <summit-btn-panel v-if="btnvisible" @action="summit"></summit-btn-panel>
  </div>
</template>

<script>
import { mix } from "../_js/_mixins";
import { mapState, mapGetters } from "vuex";

export default {
  name: "",
  mixins: [mix],
  props: {
    Xindex: {
      type: Number,
      default: function() {
        return {};
      }
    },
    Xsum: {
      type: Number,
      default: function() {
        return {};
      }
    },
    panelItem: {
      type: Object,
      default: function() {
        return {};
      }
    },
    dialogVisible: {
      type: Boolean,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      picture_video_src: [
        "picSource",
        "otherPics",
        "driLicenseCopyPics",
        "truckHeadPics",
        "stationMasterPics"
      ],
      car_check_data: {},
      picture_video_data: [],
      time_line_data: [],
      current_view: "GreenCar",
      visible: false,
      btnvisible: true,
      wi: 0,
      picture_list: [],
      file_name_list: ""
    };
  },
  components: {
    GreenCar: () =>
      import(
        /* webpackChunkName: "check" */ "./subpanel/datapanel/greencar.vue"
      ),
    TruckCar: () =>
      import(
        /* webpackChunkName: "check" */ "./subpanel/datapanel/truckcar.vue"
      ),
    MilitaryCar: () =>
      import(
        /* webpackChunkName: "check" */ "./subpanel/datapanel/militarycar.vue"
      ),
    DisasterCar: () =>
      import(
        /* webpackChunkName: "check" */ "./subpanel/datapanel/disastercar.vue"
      ),
    CombineHarvCar: () =>
      import(
        /* webpackChunkName: "check" */ "./subpanel/datapanel/combineharvcar.vue"
      ),
    PicPanel: () =>
      import(
        /* webpackChunkName: "check" */ "../../../common/preview/picpanel"
      ),
    TimeLinePanel: () =>
      import(
        /* webpackChunkName: "check" */ "../../../common/timelinepanel.vue"
      ),
    SummitBtnPanel: () =>
      import(
        /* webpackChunkName: "check" */ "./subpanel/picpanel/summitbtnpanel.vue"
      ),
    PlSearchPanel: () =>
      import(
        /* webpackChunkName: "check" */ "./subpanel/picpanel/plsearchpanel.vue"
      ),
    ResultPanel: () =>
      import(
        /* webpackChunkName: "check" */ "./subpanel/picpanel/resultpanel.vue"
      ),
    XuTable: () =>
      import(/* webpackChunkName: "check" */ "../../../common/XuTable.vue")
  },
  computed: {
    ...mapState({
      nowTab: state => state.check.nowTab,
      cartabs: state => state.check.checktabs,
      alurl: state => state.alurl,
      txurl: state => state.txurl,
      TBucket: state => state.TBucket,
      TRegion: state => state.TRegion,
      TrafficInfoByPnTime: state => state.check.TrafficInfoByPnTime
    }),
    ...mapGetters(["NowSubMenu", "detailHeaderList"])
  },
  beforeMount() {
    this.getPanelWidth();
  },
  mounted() {
    this._firstRefash();
  },
  methods: {
    _firstRefash() {
      this.btnvisible = true;
      this.cartabs.forEach(item =>
        item.ename === this.nowTab ? (this.current_view = this.nowTab) : ""
      );
      this.car_check_data = this.panelItem;
      this.time_line_data = this._setTimelineData(this.panelItem);
      this.picture_video_data = this.setPictureVideoUrl(
        this.panelItem,
        this.picture_video_src,
        this.alurl
      );
    },
    // 动态获取当前面板宽度
    getPanelWidth() {
      this.$nextTick(function() {
        this.wi = this.$el.offsetWidth - 50;
        const self = this;
        window.onresize(function() {
          self.wi = self.$el.offsetWidth - 50;
        });
      });
    },
    // 处理视频图片路径方法
    setPictureVideoUrl(data, src, prefix) {
      if (!data) return;
      let url = [];
      for (let i = 1; i < src.length; i++) {
        if (!data[src[i]]) continue;
        url = url.concat(data[src[i]].split(";"));
      }
      if (data[src[0]] === "1" && url.length > 0) {
        url = url.map(item => prefix + item);
      }
      if (data[src[0]] === "2" && url.length > 0) {
        url = url.map(item =>
          item.slice(item.length - 4, item.length) === ".mp4"
            ? prefix + item + "?sign=" + data.sign
            : prefix + item + "!sl?sign=" + data.sign
        );
      }
      return url;
    },
    // 处理时间线数据
    _setTimelineData(data) {
      return [
        {
          timelineList: {
            查验时间: data.checkTime,
            查验员: data.checkorName,
            查验结论: data.isGcTrunckName
          },
          listKeyData: {},
          iscomplete: true
        }
      ];
    },
    // 切换车牌检索数据展示面板的显隐
    _setVisible() {
      this.visible = !this.visible;
    },
    // 车牌检索方法
    getTrafficInfoByPnTime(val) {
      const self = this;
      const formData = {
        plateNumber: val,
        exitTime: this.car_check_data.checkTime,
        exitCode: this.car_check_data.tollOrgid
      };
      this.$store.dispatch("getTrafficInfoByPnTime", formData).then(function() {
        self._setVisible();
      });
    },
    resetPlateNumber(val) {
      this.car_check_data.plateNumber = val.plateNumber;
      this.car_check_data.tollPlateNumber = val.tollPlateNumber;
    },
    set(val) {
      const ccd = this.car_check_data;
      for (const key in val) {
        for (const k in ccd) {
          if (key === k) {
            ccd[k] = val[key];
          }
        }
      }
    },
    // 将检索结果赋给当前条数据
    selectTraffic(val) {
      const _left = [
        "tollPlateNumber",
        "exitTollId",
        "tollId",
        "entryStatName",
        "enteName",
        "entryDate",
        "enteDate",
        "exitLane",
        "lane",
        "exitDate",
        "amountReceivable",
        "receiveAmount",
        "wholeTruckWeight",
        "tollKeyId",
        "goodsName"
      ];
      const _right = [
        "carExitcodeRecognize",
        "tollId",
        "tollId",
        "enteStationName",
        "enteStationName",
        "enteDate",
        "enteDate",
        "lane",
        "lane",
        "exitDate",
        "totalFare",
        "tollFare",
        "totalWeight",
        "id",
        "goodsName"
      ];
      const forArr = this.array_to_object(_left, _right);
      this.object_copy(forArr, val[0], this.car_check_data);
      this._setVisible();
    },
    // 提交方法
    summit(val) {
      const cc = val;
      // 切换查询车型
      switch (this.nowTab) {
        // 绿通
        case "GreenCar":
          cc.urllocal = "jlgcstat/verify/updateAndVerifyCheckRecordV2";
          cc.urlremote = "jlgcstat/verify/updateAndVerifyCheckRecordV2";
          cc.urldrop = "/verify/setCheckRecordStatus";
          if (val.abd) {
            this.dropThisCar(cc);
          } else {
            this.updateGreen(cc);
          }
          break;
        // 集装箱
        case "TruckCar":
          cc.urllocal = "jlgcstat/otherverify/updateAndVerifyContainer";
          cc.urlremote = "otherverify/updateAndVerifyContainer";
          cc.urldrop = "/otherverify/setContainerStatus";
          if (val.abd) {
            this.dropThisCar(cc);
          } else {
            this.updateOther(cc);
          }
          break;
        // 军警
        case "MilitaryCar":
          cc.urllocal = "jlgcstat/otherverify/updateAndVerifyMilitary";
          cc.urlremote = "otherverify/updateAndVerifyMilitary";
          cc.urldrop = "/otherverify/setMilitaryStatus";
          if (val.abd) {
            this.dropThisCar(cc);
          } else {
            this.updateOther(cc);
          }
          break;
        // 救援抢险
        case "DisasterCar":
          cc.urllocal = "jlgcstat/otherverify/updateAndVerifyDisasterRelief";
          cc.urlremote = "otherverify/updateAndVerifyDisasterRelief";
          cc.urldrop = "/otherverify/setDisasterStatus";
          if (val.abd) {
            this.dropThisCar(cc);
          } else {
            this.updateOther(cc);
          }
          break;
        // 联合收割机
        case "CombineHarvCar":
          cc.urllocal = "jlgcstat/otherverify/updateAndVerifyCombine";
          cc.urlremote = "otherverify/updateAndVerifyCombine";
          cc.urldrop = "/otherverify/setCombineHarvStatus";
          if (val.abd) {
            this.dropThisCar(cc);
          } else {
            this.updateOther(cc);
          }
          break;
        default:
          break;
      }
    },
    // 提交绿通车数据方法
    updateGreen(val) {
      const self = this;
      const Fm = new FormData();
      const config = {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      };
      const _json = {};

      _json.checkId = this.car_check_data.checkId;
      _json.plateNumber = this.car_check_data.plateNumber;
      _json.tollPlateNumber = this.car_check_data.tollPlateNumber;
      _json.wholeTruckWeight = this.car_check_data.wholeTruckWeight;
      _json.amountReceivable = this.car_check_data.amountReceivable;
      _json.goodsName = this.car_check_data.goodsName;
      _json.verifySuggest = val.desc;
      _json.truckHeadPics = this.file_name_list;
      _json.tollKeyId = this.car_check_data.tollKeyId;
      if (val.pass) {
        _json.verifySuggestSelect = "查验合格";
        _json.verifyStatus = "3";
      } else {
        _json.verifySuggestSelect = "查验不合格";
        _json.verifyStatus = "2";
      }

      Fm.append("data", JSON.stringify(_json));
      // 本地
      // this.$axios
      //   .post(val.urllocal, Fm, config)
      //   .then(res => {
      // 云上
      this.$axios
        .post(val.urlremote, Fm, config)
        .then(res => {
          if (res.data.resultCode === "100") {
            self.btnvisible = false;
            self.updatePic();
            // 此action用于将刷新标志置为true
            this.$emit("action");
            this.$message.success("提交成功");
          } else {
            this.$message.error("提交失败");
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(function(error) {
          self.$router.push("/");
        });
    },
    // 提交其他车辆数据方法
    updateOther(val) {
      const self = this;
      let json = {};
      // 组织json
      switch (this.nowTab) {
        // 绿通
        case "GreenCar":
          json = {};
          break;
        // 集装箱
        case "TruckCar":
          json.checkId = this.car_check_data.checkId;
          json.plateNumber = this.car_check_data.plateNumber;
          json.tollPlateNumber = this.car_check_data.tollPlateNumber;
          json.wholeTruckWeight = this.car_check_data.wholeTruckWeight;
          json.amountReceivable = this.car_check_data.amountReceivable;
          json.verifySuggest = val.desc;
          json.truckHeadPics = this.file_name_list;
          json.tollKeyId = this.car_check_data.tollKeyId;
          json.boxTypeCode = this.car_check_data.boxTypeCode;
          json.boxSize = this.car_check_data.boxSize;
          json.driverName = this.car_check_data.driverName;
          json.driverPhoneNumber = this.car_check_data.driverPhoneNumber;
          if (val.pass) {
            json.verifySuggestSelect = "查验合格";
            json.verifyStatus = "3";
          } else {
            json.verifySuggestSelect = "查验不合格";
            json.verifyStatus = "2";
          }
          break;
        // 军警
        case "MilitaryCar":
          json.checkId = this.car_check_data.checkId;
          json.plateNumber = this.car_check_data.plateNumber;
          json.tollPlateNumber = this.car_check_data.tollPlateNumber;
          json.wholeTruckWeight = this.car_check_data.wholeTruckWeight;
          json.amountReceivable = this.car_check_data.amountReceivable;
          json.verifySuggest = val.desc;
          json.truckHeadPics = this.file_name_list;
          json.tollKeyId = this.car_check_data.tollKeyId;
          json.designNtion = this.car_check_data.designNtion;
          json.driverName = this.car_check_data.driverName;
          json.driverPhoneNumber = this.car_check_data.driverPhoneNumber;
          if (val.pass) {
            json.verifySuggestSelect = "查验合格";
            json.verifyStatus = "3";
          } else {
            json.verifySuggestSelect = "查验不合格";
            json.verifyStatus = "2";
          }
          break;
        // 救援抢险
        case "DisasterCar":
          json.checkId = this.car_check_data.checkId;
          json.plateNumber = this.car_check_data.plateNumber;
          json.tollPlateNumber = this.car_check_data.tollPlateNumber;
          json.wholeTruckWeight = this.car_check_data.wholeTruckWeight;
          json.amountReceivable = this.car_check_data.amountReceivable;
          json.verifySuggest = val.desc;
          json.truckHeadPics = this.file_name_list;
          json.tollKeyId = this.car_check_data.tollKeyId;
          json.driverName = this.car_check_data.driverName;
          json.driverPhoneNumber = this.car_check_data.driverPhoneNumber;
          if (val.pass) {
            json.verifySuggestSelect = "查验合格";
            json.verifyStatus = "3";
          } else {
            json.verifySuggestSelect = "查验不合格";
            json.verifyStatus = "2";
          }
          break;
        // 联合收割机
        case "CombineHarvCar":
          json.checkId = this.car_check_data.checkId;
          json.plateNumber = this.car_check_data.plateNumber;
          json.tollPlateNumber = this.car_check_data.tollPlateNumber;
          json.wholeTruckWeight = this.car_check_data.wholeTruckWeight;
          json.amountReceivable = this.car_check_data.amountReceivable;
          json.verifySuggest = val.desc;
          json.truckHeadPics = this.file_name_list;
          json.tollKeyId = this.car_check_data.tollKeyId;
          json.jobId = this.car_check_data.jobId;
          json.driverName = this.car_check_data.driverName;
          json.driverPhoneNumber = this.car_check_data.driverPhoneNumber;
          if (val.pass) {
            json.verifySuggestSelect = "查验合格";
            json.verifyStatus = "3";
          } else {
            json.verifySuggestSelect = "查验不合格";
            json.verifyStatus = "2";
          }
          break;
        default:
          break;
      }
      this.$api.post(val.urlremote, json, res => {
        if (res.resultCode === "100") {
          self.btnvisible = false;
          self.updatePic();
          this.$emit("action");
          this.$message.success("提交成功");
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    // 废弃当前车辆查验信息
    dropThisCar(val) {
      const self = this;
      const json = {
        checkId: this.car_check_data.checkId, // 查验记录主键
        verifyStatus: "5" // 废弃状态
      };
      this.$api.post(val.urldrop, json, res => {
        if (res.resultCode === "100") {
          self.btnvisible = false;
          this.$emit("action");
          this.$message.success("提交成功");
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    // 组织文件列表&&文件名称
    setPicList(val) {
      // 图片列表
      this.picture_list = val;
      // 图片名称
      this.file_name_list = "";
      this.picture_list.forEach(item => {
        this.file_name_list += item.name + ";";
      });
      this.file_name_list = this.file_name_list.substring(
        0,
        this.file_name_list.length - 1
      );
    },
    // 上传图片
    updatePic() {
      const self = this;
      const org = this.car_check_data.orgId;
      const COS = require("cos-js-sdk-v5");
      const cos = new COS({
        getAuthorization: function(options, callback) {
          self.$api.post(
            "authen/getAuthen",
            {
              bucket: options.Bucket,
              region: options.Region
            },
            function(data) {
              const res = JSON.parse(data.resultData);
              // eslint-disable-next-line standard/no-callback-literal
              callback({
                TmpSecretId: res.data.credentials.tmpSecretId,
                TmpSecretKey: res.data.credentials.tmpSecretKey,
                XCosSecurityToken: res.data.credentials.sessionToken,
                ExpiredTime: res.data.expiredTime
              });
            }
          );
        }
      });
      const nowDate = this.car_check_data.checkTime
        .replace(/[^0-9]/gi, "")
        .substring(0, 8);
      if (this.picture_list.length > 0) {
        for (var k = 0; k < this.picture_list.length; k++) {
          cos.putObject(
            {
              Bucket: this.TBucket /* 必须 */,
              Region: this.TRegion /* 必须 */,
              Key:
                "/" +
                nowDate +
                "/" +
                org +
                "/" +
                this.picture_list[k].name /* 必须 */,
              StorageClass: "STANDARD",
              Body: this.picture_list[k], // 上传文件对象
              onProgress: function(progressData) {
                console.log(JSON.stringify(progressData));
              }
            },
            function(err, data) {
              console.log(err || data);
              self.$refs.picturePanel.cleanUpFiles();
            }
          );
        }
      }
    }
  },
  watch: {
    panelItem: {
      handler(val, oldval) {
        this._firstRefash();
      },
      immediate: true,
      deep: true
    },
    dialogVisible(val) {
      if (!val) {
        this.visible = val;
      }
    }
  }
};
</script>

<style scoped>
header {
  border-bottom: 1px solid #000;
  font-size: 16px;
  font-weight: 700;
}
div[class*="wrapper"] {
  margin-bottom: 20px;
}
.referance_line {
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #fff;
}
</style>
