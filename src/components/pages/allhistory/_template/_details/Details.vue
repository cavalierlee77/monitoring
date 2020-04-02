<!--绿通查验信息界面-->
<template>
  <section>
    <div class="wrapper">
      <header>{{ detTitle }}</header>
      <inputs-box
        :is="current_view"
        :infoData="iDetail"
        @changeInformation="changeInformation"
      >
      </inputs-box>
      <pic-mov
        ref="rest"
        :Xcol="4"
        :show_upload_icon="true"
        :picture_video_data="picture_video_data"
        @action="setPicList"
      >
      </pic-mov>
      <timeline :time_line_data="time_line_data"></timeline>
      <change-button @save="save" @cancel="cancel"></change-button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import GreenCar from "./infoBar/Green";
import TruckCar from "./infoBar/Truck";
import MilitaryCar from "./infoBar/Military";
import DisasterCar from "./infoBar/Disaster";
import CombineHarvCar from "./infoBar/CombineHarv";

import PicMov from "../../../../common/preview/picpanel";
import Timeline from "../../../../common/timelinepanel";
import ChangeButton from "./changebutton";

export default {
  name: "iDetail",
  props: {
    iDetail: {
      type: Object,
      default: function() {}
    },
    detTitle: {
      type: String,
      default: function() {}
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
      green_change: {},
      car_check_data: {},
      picture_video_data: [],
      time_line_data: [],
      picture_list: [],
      file_name_list: "",
      current_view: "GreenCar",
      visible: false,
      btnvisible: true,
      numm: 0
    };
  },
  components: {
    GreenCar,
    TruckCar,
    MilitaryCar,
    DisasterCar,
    CombineHarvCar,

    // InputsBox,
    PicMov,
    Timeline,
    ChangeButton
  },
  mounted() {
    this._firstRefash();
  },
  computed: {
    ...mapState({
      nowTab: state => state.allhistory.nowTab,
      cartabs: state => state.allhistory.cartabs,
      inputList: state => {
        const _type = state.allhistory.nowTab;
        let _inputList = "GreenCarInpRel";
        if (_type) {
          _inputList = state.allhistory.hisRelevance[_type].selRelevance;
        }
        return state.allhistory[_inputList];
      },
      alurl: state => state.alurl,
      txurl: state => state.txurl,
      TBucket: state => state.ABucket,
      TRegion: state => state.ARegion
    })
  },
  methods: {
    _firstRefash() {
      this.btnvisible = true;
      this.current_view = this.nowTab;
    },

    changeInformation(val) {
      this.green_change = val;
    },

    save(val) {
      const self = this.green_change;
      this.$store.dispatch("saveImportent", self);
      this.updatePic();
      this.$emit("action");
      this.$refs.rest.rest();
    },
    cancel(val) {
      this.$emit("action");
      this.$refs.rest.rest();
    },
    // 处理视频图片路径方法
    setPictureVideoUrl(data, src, prefix) {
      if (!data) return;
      let url = [];
      for (let i = 1; i < src.length; i++) {
        if (!data[src[i]]) continue;
        url = url.concat(data[src[i]].split(";"));
      }
      if (data[src[0]] == "1" && url.length > 0) {
        url = url.map(item => prefix + item + "?" + Math.random());
      }
      if (data[src[0]] == "2" && url.length > 0) {
        url = url.map(item =>
          item.slice(item.length - 4, item.length) == ".mp4"
            ? prefix + item + "?sign=" + data.sign + "?" + Math.random()
            : prefix + item + "!sl?sign=" + data.sign + "?" + Math.random()
        );
      }
      return url;
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
      this.green_change.truckHeadPics = this.file_name_list;
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
          // console.log( k +1)
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
            }
          );
        }
      }
    },
    setTimelineData(val) {
      this.time_line_data = [
        {
          timelineList: {
            查验时间: val.checkTime,
            查验员: val.checkorName,
            查验结论: val.isGcTrunckName
          },
          listKeyData: {},
          iscomplete: true
        }
      ];
      const _time_line_data = val.verifySuggestList.map(item => {
        let _iscomplete;
        if (item.verifyStatus == 3) _iscomplete = true;
        if (item.verifyStatus == 2) _iscomplete = false;
        const _object = new Object();
        _object["审核时间"] = item.verifyTime;
        _object[item.roleName] = item.verifyOperatorName;
        _object["审核结论"] = item.verifySuggestSelect;
        return {
          timelineList: _object,
          listKeyData: item,
          iscomplete: _iscomplete
        };
      });
      this.time_line_data = this.time_line_data.concat(_time_line_data);
    }
  },
  watch: {
    iDetail: {
      handler(val, oldval) {
        const _self = this;
        _self.cartabs.forEach(item => {
          if (item.ename == _self.nowTab) {
            _self.currentView = _self.nowTab;
          }
        });
        this.picture_video_data = [];
        this.picture_video_data = this.setPictureVideoUrl(
          val,
          this.picture_video_src,
          this.alurl
        );
        this.car_check_data = val;
        console.log(val);
        this.setTimelineData(val);
        this._firstRefash();
      },
      immediate: true
      // deep: true
    }
  }
};
</script>
<style scoped>
header {
  border-bottom: 1px solid #000;
  font-size: 16px;
}
div[class*="wrapper"] {
  margin-bottom: 20px;
}
</style>
