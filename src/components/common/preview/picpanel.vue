<template>
  <div class="">
    <title-header :title="'查验图片/视频'" :showIcon="show_upload_icon">
      <input
        type="file"
        ref="input"
        multiple
        class="up-files"
        @change="inputFilesChange"
      />
    </title-header>
    <video-image
      :src="srcList"
      :srcAdd="filesUrlObj"
      :col="Xcol"
      @deleteItem="deleteItem"
      @preview="preview"
    ></video-image>
    <image-preview
      :urlList="previewSrcList"
      :currentSrc="currentSrc"
      v-if="previewShow"
      :on-close="closeViewer"
    ></image-preview>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    Xcol: {
      type: Number,
      default: function() {
        return 0;
      }
    },
    show_upload_icon: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    picture_video_data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      previewShow: false,
      srcList: [],
      previewSrcList: [],
      upFilesList: [],
      filesUrlObj: [],
      currentSrc: ""
    };
  },
  mounted() {},
  components: {
    TitleHeader: () => import("../TitleHeader"),
    VideoImage: () => import("./lib/VideoImage")
  },
  methods: {
    cleanUpFiles() {
      this.upFilesList = [];
    },
    // 文件input变化触发
    inputFilesChange(e) {
      this.upFilesList = this.parseFiles(e.target.files);
      this.clearInput();
    },
    // 解析input中类数组files
    parseFiles(e) {
      return [...e];
    },
    // 解析url,处理图片和视频
    parseUrl(e) {
      const obj = {
        image: [],
        video: []
      };
      [...e].forEach(_ => {
        const o = {};
        o.name = _.name;
        o.url = URL.createObjectURL(_);
        if (_.name.split(".").pop() === "mp4") {
          obj.video.push(_);
        } else {
          obj.image.push(_);
        }
      });
      return obj;
    },
    deleteItem(e) {
      this.upFilesList.splice(
        this.upFilesList.findIndex(_ => _.name === e.name),
        1
      );
    },
    // 初始化input file,每次选择完毕清空
    clearInput() {
      this.$refs.input.value = "";
    },
    preview(e) {
      console.log(this.srcList);
      this.currentSrc = e;
      this.previewShow = true;
    },
    closeViewer() {
      this.previewShow = false;
    }
  },
  watch: {
    // 接收已上传的图片视频,显示
    picture_video_data: {
      handler: function(val) {
        this.srcList = [];
        this.srcList = val;
        this.previewSrcList = [];
        if (val && val.length > 0) {
          val.forEach(i => {
            if (i.indexOf("mp4") > -1) {
            } else {
              this.previewSrcList.push(i);
            }
          });
        }
      },
      immediate: true,
      deep: true
    },
    // 上传文件数组控制url
    upFilesList: {
      handler: function(e) {
        this.filesUrlObj = this.parseUrl(e);
        this.$emit("action", this.upFilesList);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped></style>
