<template>
  <div class="panelindex">
    <span>第{{ index }}条/共{{ total }}条</span>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    index: {
      type: Number,
      default: function() {
        return 1;
      }
    },
    total: {
      type: Number,
      default: function() {
        return 1;
      }
    }
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped>
.panelindex {
  border-bottom: 1px solid #000;
  font-size: 16px;
  font-weight: 700;
}
</style>
