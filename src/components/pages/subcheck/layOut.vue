<template>
  <div>
    <div class="layout" :style="{ height: height + 'px' }">
      测试mixins_demo
      <input v-focus="'苹果'" />
      <el-button @click="hello">点击</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 混入的使用，还可以在全局挂载
import { localMixins } from "./_js/_mixins.js";
export default {
  name: "",
  mixins: [localMixins],
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState({
      height: state => state.common.layoutHgt
    })
  },
  mounted() {}
};
</script>

<style scoped>
@import "./_css/_locales.css";
</style>
