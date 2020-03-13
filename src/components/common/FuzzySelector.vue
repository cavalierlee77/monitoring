<template>
  <el-select
    v-model="dateModel"
    class="forFull"
    filterable
    remote
    :clearable="true"
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
    @clear="remoteMethod"
  >
    >
    <el-option
      v-for="(item, index) in likeData"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  name: "FuzzySelector",
  props: {
    value: {
      default: false
    },
    libraryData: {
      type: Array,
      default: false
    },
    vname: {
      default: false
    }
  },
  data() {
    return {
      dateModel: "",
      loading: false,
      likeData: []
    };
  },
  watch: {
    dateModel: function() {
      this.validateDate();
    }
  },
  mounted() {
    this.setLikeData();
  },
  methods: {
    validateDate() {
      try {
        this.$emit("input", this.dateModel, this.vname);
        this.$emit("change", this.dateModel, this.vname);
      } catch (e) {
        this.$emit("error", true);
      }
    },
    setLikeData() {
      const _timer = setInterval(() => {
        if (this.libraryData.length > 0) {
          this.likeData = this.libraryData.concat();
          clearInterval(_timer);
        }
      }, 200);
    },
    remoteMethod(query) {
      if (query && query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.likeData = this.libraryData.filter(item => {
            var py = this.$PinYinHelper.toPinYin(item.label)[0].toLowerCase();
            return (
              py.indexOf(query.toLowerCase()) > -1 ||
              item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
          });
        }, 200);
      } else {
        this.likeData = [];
        this.likeData = this.libraryData.concat();
      }
    }
  }
};
</script>
