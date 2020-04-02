<template>
  <div class="" style="padding-bottom: 20px">
    <header><i class="el-icon-info"></i> 查验信息</header>
    <el-form ref="form" label-position="left" label-width="120px">
      <el-row>
        <el-col :span="6">
          <div class="item_list">
            <label for="">收费车牌</label>
            <el-input
              v-model="obj.plateNumber"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">入口站</label>
            <el-input
              v-model="obj.enteName"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">入口时间</label>
            <el-input
              v-model="obj.enteDate"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">出口站</label>
            <el-input
              v-model="obj.orgName"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="item_list">
            <label for="">出口时间</label>
            <el-input
              v-model="obj.exitDate"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">出口车道</label>
            <el-input
              v-model="obj.exitLane"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">出口收费员</label>
            <el-input
              v-model="obj.exitTollId"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">货物名称</label>
            <el-input
              v-model="obj.goodsName"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="item_list">
            <label for="">轴数</label>
            <el-input
              v-model="obj.axisNum"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">计重(吨)</label>
            <el-input
              v-model="obj.wholeTruckWeight"
              suffix-icon="el-icon-view"
              readonly
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item_list">
            <label for="">减免金额(元)</label>
            <el-input
              v-model="obj.amountReceivable"
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
export default {
  name: "",
  props: {
    obj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      innerList: {}
    };
  },
  components: {}
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
