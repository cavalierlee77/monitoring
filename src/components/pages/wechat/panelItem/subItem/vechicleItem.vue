<template>
  <section class="vechicle_wrapper">
    <header>{{ index + 1 }}/{{ totalNum }}</header>
    <!-- 文本数据展示面板 -->
    <label-input
      :supperArray='textArray'
      :col="wechatVechicledetailsItem.colCount">
    </label-input>
    <!-- 图片视频数据展示面板 -->
    <pic-section
      :Xcol="4" 
      :picture_video_data="pictureArray">
    </pic-section>
    <!-- 审核时间线展示审核数据 -->
    <time-line-panel 
      :time_line_data="timeArray">
    </time-line-panel>
    <div
      v-if="item.carVerifyStatus == '未查验'" 
      class="wecha-vechicle-summit">
      <el-button size="medium" 
        icon="el-icon-check"
        type="success"
        @click="verifyWechatVechicle('3')">通    过
      </el-button>
      <el-button size="medium" 
        icon="el-icon-edit"
        type="info"
        @click="verifyWechatVechicle('2')">不通过
      </el-button>
    </div>  
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import picSection from '../../../../common/picpanel.vue'
import timeLinePanel from '../../../../common/timelinepanel.vue'
import labelInput from '../_components/labelInput.vue'

import { mixMethods } from '../../mixin/mixin.js'

export default {
  name: '',
  mixins: [mixMethods],
  props: {
    item: {
      type: Object,
      value: {

      }
    },
    index: {
      type: Number,
      value: 0
    },
    totalNum: {
      type: Number,
      value: 0
    }
  },
  data() {
    return {
    }
  },
  components: {
    picSection,
    timeLinePanel,
    labelInput
  },
  computed: {
    ...mapState({
      currentTab: state => state.wechatVechicle.currentTab,
      alurl: state => state.alurl,
      txurl: state => state.txurl,
      loginUser: state => state.common.loginUser 
    }),
    ...mapGetters([
      'wechatVechicledetailsItem',
    ]),
    textArray: function(){
      return this.parseTextArray(this.item, this.wechatVechicledetailsItem.labelInputItem)
    },
    pictureArray: function(){
      return this.parsePicArray(this.txurl, this.item, this.wechatVechicledetailsItem.pictureNameList)
    },
    timeArray: function(){
      return this.parseTimeArray(this.item)
    },
  },
  methods: {
    verifyWechatVechicle(status){
      let jsondata = {
        'keyid': this.item.keyId,
        'verifyUserCode': this.loginUser.userId,
        'verifyUserName':this.loginUser.userName,
        'verifyTime':new Date().format("yyyy-MM-dd hh:mm:ss"),
        'verifyStatus': status
      }
      this.$store.dispatch('verifyWechatVechicle', jsondata);
    },
  },
}
</script>

<style scoped>
.vechicle_wrapper{
  background-color: #fff;
}
.wecha-vechicle-summit {
  padding: 5px 0px 5px 0px;
  display:flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
header {
  border-bottom: 1px solid #000;
  font-size: 16px;
  font-weight: 700;
}
</style>
