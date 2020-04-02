<template>
  <div class="step-panel-wrapper" style="padding-bottom: 20px">
    <div class="row">
      <div class="col-12">
        <header><i class="el-icon-info"></i> 审核时间轴</header>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="hidscrolled">
          <div class="VivaTimeline">
            <div class="events" v-for="(item, index) in stepLabel" :key="index">
              <div class="events-body">
                <ul>
                  <li>人员 : {{ item.name }}</li>
                  <li>角色 : {{ item.role }}</li>
                  <li>时间 : {{ item.checktime }}</li>
                  <li>状态 : {{ item.verifyStatusName }}</li>
                  <li>意见 : {{ item.isGcTrunckName }}</li>
                  <li>意见描述 : {{ item.verifySuggest }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepPanel",
  props: {
    stepLabel: {
      type: Array,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  mounted: function() {},
  methods: {}
};
</script>

<style scoped>
ul,
li {
  list-style-type: none;
}
header {
  padding: 10px 10px 10px 10px;
  font-size: 16px;
  font-weight: 700;
}
.step-panel-wrapper header {
  font-size: 16px;
  padding: 5px 0px 5px 0px;
  font-weight: 600;
}
.VivaTimeline {
  padding-left: 20px;
  bottom: 0;
}
.events {
  padding: 10px 10px 10px 10px;
  border: 1px solid #e0e0e0;
  display: inline-block;
}
</style>
