<template>
  <div class="">
    <input
      type="file"
      ref="input"
      multiple
      class="up-files"
      @change="inputFilesChange"
    />
  </div>
</template>

<script>
export default {
  name: "UpLoadFile",
  data() {
    return {};
  },
  components: {},
  methods: {
    inputFilesChange(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped></style>
