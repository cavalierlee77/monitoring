<template>
  <div class=""></div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.$store.commit("setchkNowSubMenu", "addedTollList");
    this.$emit("action");
  },
  methods: {}
};
</script>

<style scoped></style>
