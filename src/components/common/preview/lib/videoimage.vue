<!-- pictpanel主体显示部分 -->
<template>
  <div class="ul-padding">
    <i-list
      :src="[...jpgUrl, ...pngUrl]"
      :iconType="true"
      :width="width"
      :col="col"
      :lazy="lazy"
      @reFetch="reFetch"
      @preview="preview"
    ></i-list>
    <i-list
      :src="addImgUrl"
      :iconType="false"
      :width="width"
      :col="col"
      :lazy="lazy"
      @deleteItem="deleteItem"
      @preview="preview"
    ></i-list>
    <v-list
      :src="mp4Url"
      :iconType="true"
      :width="width"
      :col="col"
      :lazy="lazy"
      @reFetch="reFetch"
    ></v-list>
    <v-list
      :src="addVidUrl"
      :iconType="false"
      :width="width"
      :col="col"
      :lazy="lazy"
      @deleteItem="deleteItem"
    ></v-list>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    src: {
      type: Array,
      default: function() {
        return [];
      }
    },
    srcAdd: {
      type: Object,
      default: function() {
        return {};
      }
    },
    col: {
      type: Number,
      default: function() {
        return 0;
      }
    }
  },
  data() {
    return {
      lazy: false,
      width: 0,
      jpgUrl: [],
      pngUrl: [],
      mp4Url: [],
      addImgUrl: [],
      addVidUrl: []
    };
  },
  components: {
    IList: () => import("./ilist"),
    VList: () => import("./vlist")
  },
  beforeMount() {
    this.getPanelWidth();
  },
  mounted() {},
  methods: {
    // 获取panel宽度
    getPanelWidth() {
      this.$nextTick(function() {
        this.width = this.$el.offsetWidth - 102;
        const self = this;
        window.onresize(function() {
          self.width = self.$el.offsetWidth - 102;
        });
      });
    },
    // 重新获取图片
    reFetch(e) {
      this.filterUrl(e, this.jpgUrl, this.pngUrl, this.mp4Url);
    },
    // 过滤数组为url添加随机数后缀
    filterUrl(url, ...args) {
      args.some(i => {
        if (i.indexOf(url) !== -1) {
          i.splice(i.indexOf(url), 1, url + "?" + Math.random(7));
          return true;
        }
      });
    },
    // 删除图片
    deleteItem(e) {
      this.$emit("deleteItem", e);
    },
    // 处理url后缀 suffix 前缀 postfix
    parseSuffix(arr, prefix) {
      const obj = {};
      prefix.forEach(i => {
        const s = i.substring(0, 3);
        obj[i] = [];
        arr.forEach(j => {
          if (j.indexOf(s) > 0 || j.indexOf(s.toUpperCase()) > 0)
            obj[i].push(j);
        });
      });
      return obj;
    },
    preview(e) {
      this.$emit("preview", e);
    }
  },
  watch: {
    src: {
      handler: function(val) {
        this.lazy = false;
        const prefix = ["jpgUrl", "pngUrl", "mp4Url"];
        if (val && val.length > 0) {
          const obj = this.parseSuffix(val, prefix);
          prefix.forEach(_ => (this[_] = obj[_]));
        } else {
          prefix.forEach(_ => (this[_] = []));
        }
      },
      immediate: true,
      deep: true
    },
    srcAdd: {
      handler: function(val) {
        if (val !== {}) {
          this.addImgUrl = val.image;
          this.addVidUrl = val.video;
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
.ul-padding {
  padding: 0px 0px 0px 20px;
}
.piclist {
  margin: 2px 2px;
  border-radius: 2px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition-duration: 0.5s;
  display: inline-block;
  padding: 5px 5px 5px 5px;
  background-color: #fff;
}
.piclist video {
  object-fit: fill;
}
</style>
