<template>
  <div style="display: inline">
    <template v-for="(item, index) in src">
      <div class="li-item" :key="index">
        <i
          v-if="iconType"
          class="el-icon-refresh i-icon"
          @click="reFetch(item)"
        >
        </i>
        <i
          v-if="!iconType"
          class="el-icon-delete i-icon"
          @click="deleteItem(item)"
        >
        </i>
        <i-video :src="parseUrl(item)"></i-video>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    // panel总宽度
    width: {},
    // 每行item数量
    col: {},
    // 刷新或者删除
    iconType: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    lazy: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    src: {
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
    IVideo: () => import("./v")
  },
  methods: {
    parseUrl(e) {
      if (typeof e === "string") {
        return e;
      } else {
        return URL.createObjectURL(e);
      }
    },
    reFetch(e) {
      this.$emit("reFetch", e);
    },
    deleteItem(e) {
      this.$emit("deleteItem", e);
    }
  }
};
</script>

<style scoped>
.li-item {
  margin: 2px 2px;
  border-radius: 2px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition-duration: 0.5s;
  display: inline-block;
  padding: 20px 5px 5px 5px;
  background-color: #fff;
  height: calc(100vw * 0.8 / 5 + 0px);
  width: calc(100vw * 0.8 / 5 + 0px);
}

.i-icon {
  position: relative;
  top: -18px;
  color: red;
  float: right;
}
</style>
