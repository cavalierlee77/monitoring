<template>
  <div 
    class="vechicle-search-wrapper">
    <el-row
      :gutter="20">
      <el-col 
        :span="8" 
        :offset="3">
        <div
          class="vechicle-search-item">
          <label>车牌号码
          </label>
          <el-input
            style="width: 220px;" 
            v-model="plateNumber" 
            placeholder="请输入车牌号码">
          </el-input>
        </div>
      </el-col>
      <el-col 
        :span="8">
        <div
          class='vechicle-search-item'>
          <label>状态
          </label>
          <el-select 
            v-model="verifyStatus" 
            placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col 
        :span="5"
        class='vechicle-search-item'>
        <div
          class="vechicle-search-item">
          <el-button 
            type="primary" 
            plain
            icon="el-icon-search"
            @click="vechicleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: '',
  data() {
      return {
        plateNumber: '',
        verifyStatus: '',
        options: [{
          label: '未查验',
          value: '1'
        },{
          label: '未通过',
          value: '2'
        },{
          label: '通过',
          value: '3'
        }]
      }
  },
  components: {},
  mounted() {
    //this.$nextTick(() => {
      //初始化查询条件
      this.initQueryConditions();
    //})
  },
  computed: {
    ...mapState({
      queryConditions: state => state.wechatVechicle.queryConditions ,
    }),
  },
  methods: {
    initQueryConditions: function(){
      this.plateNumber = this.queryConditions.plateNumber;
      this.verifyStatus = this.queryConditions.verifyStatus;
    },
    vechicleSearch: function(){
      let queryConditions = {
        'plateNumber': this.plateNumber,
        'verifyStatus': this.verifyStatus,
      }
      this.$store.commit('resetQueryConditions', queryConditions);
      this.$store.dispatch('getWechatVechicleInfos');
    }
  },
}
</script>

<style scoped>
.vechicle-search-wrapper  {
  padding-top: 10px;
  padding-bottom: 10px;
  /* display: grid;
  grid-template-columns: 40%  40% 20%; */
}
.vechicle-search-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.vechicle-search-item label {
  width: 120px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
