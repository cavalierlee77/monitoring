<template>
  <div class="">
    <div class="cut_time_info">
      <div class="left">
        <i class="el-icon-info"></i>
        <p>收费信息截止时间 : {{ TollCutOffTime }}</p>
      </div>
      <div class="right">
        <i class="el-icon-refresh" @click="getcheckdata"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState({
      TollCutOffTime: state => state.check.TollCutOffTime
    })
  },
  mounted() {
    this.$store.commit("setchkNowSubMenu", "offLimitsList");
    this.$emit("action");
  },
  methods: {
    getcheckdata() {
      this.$emit("action");
    }
  }
};
</script>

<style scoped>
.cut_time_info {
  margin: 0;
  background-color: #f0f9eb;
  color: #67c23a;
  font-size: 15px;
  width: 100%;
  padding: 8px 16px;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  vertical-align: middle;
  transition: opacity 0.2s;
  margin-bottom: 10px;
}
.cut_time_info .left {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cut_time_info .right {
  cursor: pointer;
  font-size: 20px;
  float: right;
}
.cut_time_info p {
  margin: 0px 20px 0px 10px;
}
</style>
