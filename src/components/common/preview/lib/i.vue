<template>
  <div class="i-image">
    <slot v-if="loading" name="placeholder">
      <div class="el-image__placeholder iloading"></div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="el-image__error ierror">{{ t("el.image.error") }}</div>
    </slot>
    <img v-else class="li-img" :src="src" @click="preview" />
  </div>
</template>

<script>
import { on, off, getScrollContainer, isInContainer } from "../utils/dom";
import { isString, isHtmlElement } from "../utils/types";
import throttle from "throttle-debounce/throttle";
export default {
  name: "",
  props: {
    lazy: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    src: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      show: false,
      loading: true,
      error: false
    };
  },
  components: {},
  mounted() {
    this.addLazyLoadListener();
  },
  beforeDestroy() {
    this.removeLazyLoadListener();
  },
  watch: {
    src(val) {
      if (val && val.length > 0) {
        this.loading = true;
        this.show = false;
        this.addLazyLoadListener();
        this.error = false;
      }
    },
    show: {
      handler: function(val) {
        val && this.loadImage();
      },
      immediate: true
    }
  },
  methods: {
    // 下载图片
    loadImage() {
      this.loading = true;
      this.error = false;

      let img = new Image();
      img.onload = e => this.handleLoad(e, img);
      img.onerror = this.handleError.bind(this);

      img.src = this.src;
      img = null;
    },
    // 下载完成
    handleLoad(e, img) {
      this.loading = false;
    },
    // 错误处理
    handleError(e) {
      this.loading = false;
      this.error = true;
      this.$emit("error", e);
    },
    handleLazyLoad() {
      if (isInContainer(this.$el, this._scrollContainer)) {
        setTimeout(() => (this.show = true), 0);
        this.removeLazyLoadListener();
      }
    },
    addLazyLoadListener() {
      const { scrollContainer } = this;
      let _scrollContainer = null;

      if (isHtmlElement(scrollContainer)) {
        _scrollContainer = scrollContainer;
      } else if (isString(scrollContainer)) {
        _scrollContainer = document.querySelector(scrollContainer);
      } else {
        _scrollContainer = getScrollContainer(this.$el);
      }
      if (_scrollContainer) {
        this._scrollContainer = _scrollContainer;
        this._lazyLoadHandler = throttle(200, this.handleLazyLoad);
        on(_scrollContainer, "scroll", this._lazyLoadHandler);
        this.handleLazyLoad();
      }
    },
    removeLazyLoadListener() {
      const { _scrollContainer, _lazyLoadHandler } = this;

      if (this.$isServer || !_scrollContainer || !_lazyLoadHandler) return;

      off(_scrollContainer, "scroll", _lazyLoadHandler);
      this._scrollContainer = null;
      this._lazyLoadHandler = null;
    },
    preview(e) {
      this.$emit("preview", e.target.src);
    }
  }
};
</script>

<style scoped>
.i-image {
  position: relative;
  width: inherit;
  height: inherit;
}
.li-img {
  position: relative;
  top: -15px;
  display: block;
  height: inherit;
  width: inherit;
}
.iloading {
  background: url(../static/loading.gif) no-repeat 49.9% 47%;
}
.ierror {
  background: url(../static/error.jpg) no-repeat 49.9% 47%;
}
</style>
