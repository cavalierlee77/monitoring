<template>
  <div class="wechat-wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    vehicleLayout: () =>
      import(/* webpackChunkName: "wechat" */ "./layout/vechicleLayout.vue"),
    billLayout: () =>
      import(/* webpackChunkName: "wechat" */ "./layout/billLayout")
  }
};
</script>

<style scoped></style>
