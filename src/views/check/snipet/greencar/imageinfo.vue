<template>
  <div class="" style="padding-bottom: 20px">
    <pic-panel :Xcol="4" :picture_video_data="arr"> </pic-panel>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    arr: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {
    PicPanel: () =>
      import(
        /* webpackChunkName: "subcheck" */ "../../../../components/common/preview/picpanel"
      )
  }
};
</script>

<style scoped></style>
