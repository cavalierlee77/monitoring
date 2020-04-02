<template>
  <div class="">
    <header><i class="el-icon-info"></i> 审核时间</header>
    <div class="box">
      <div class="box-timeline">
        <ul class="text-center">
          <li v-for="(item, index) in time_line_data" :key="index">
            <div
              class="box-outside outside"
              :class="{
                blue: item.iscomplete == true,
                red: item.iscomplete == false
              }"
            >
              <div
                class="box-num1"
                :class="{ 'box-start': index == 0, 'box-mid': index != 0 }"
              ></div>
            </div>
            <section>
              <div
                class="item_list"
                v-for="(list, index) in item.timelineList"
                :key="index"
              >
                <label for="">{{ list.name }}:</label>
                <p>{{ list.value }}</p>
              </div>
            </section>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    time_line_data: {
      type: Array,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      wi: 0
    };
  },
  components: {},
  beforeMount() {
    this.getPanelWidth();
  },
  mounted() {},
  methods: {
    getPanelWidth() {
      this.$nextTick(function() {
        this.wi = this.$el.offsetWidth;
        const self = this;
        window.onresize(function() {
          self.wi = self.$el.offsetWidth;
        });
      });
    },
    resetLineData() {
      this.time_line_data.forEach(item => {
        item.timelineList = Object.keys(item.timelineList).map(key => {
          return {
            name: key,
            value: item.timelineList[key]
          };
        });
      });
    }
  },
  watch: {
    time_line_data: {
      handler(val, oldval) {
        this.resetLineData();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
header {
  padding: 10px 10px 10px 10px;
  font-size: 16px;
  font-weight: 700;
}
section {
  margin-top: 20px;
  margin-right: 20px;
}
.item_list {
  padding: 5px 0px 5px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.item_list label {
  position: relative;
  display: inline-block;
  text-align: left;
  padding-left: 20px;
  font-size: 14px;
}
.item_list p {
  position: relative;
  display: inline-block;
  text-align: left;
  padding-left: 10px;
  font-size: 14px;
}

.el-form-item {
  margin-bottom: 0px;
}
.box-timeline {
  overflow-x: auto;
}
.text-center {
  white-space: nowrap;
  height: 200px;
}
.box-timeline:hover .text-center {
  animation-play-state: paused;
}
@-webkit-keyframes move {
  0% {
    left: 0;
  }
  100% {
    left: -500px;
  }
}
@keyframes move {
  0% {
    left: 0;
  }
  100% {
    left: -500px;
  }
}
.box-timeline ul li {
  font-size: 14px;
  box-sizing: border-box;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  display: inline-table;
  list-style: none;
  font-size: 16px;
  color: #999;
  width: 270px;
  position: relative;
}
.box-timeline .outside {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  line-height: 18px;
  margin: 10px 20px auto;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.box {
  width: 100vw;
}
.blue {
  background-color: #3399ff;
}
.red {
  background-color: #ee1414;
}
.grey {
  background-color: #cac2c2;
}
.box-timeline .box-start:after {
  content: "";
  position: absolute;
  height: 2px;
  width: 137px;
  background-color: #d7d7d7;
  top: 18px;
  left: 38px;
  z-index: 3;
}
.box-timeline .box-mid:before {
  content: "";
  position: absolute;
  height: 2px;
  width: 137px;
  background-color: #d7d7d7;
  top: 18px;
  right: 250px;
  z-index: 2;
}
.box-timeline .box-mid:after {
  content: "";
  position: absolute;
  height: 2px;
  width: 137px;
  background-color: #d7d7d7;
  top: 18px;
  left: 38px;
  z-index: 2;
}
ul.text-center > li:last-of-type .box-mid:after {
  content: "- - - - - - - - - - - - -";
  position: absolute;
  width: 179px;
  font-size: 21px;
  color: #d7d7d7;
  background-color: #fff;
  top: 11px;
  right: 38px;
  z-index: 2;
}
.box-timeline .box-end:before {
  content: "- - - - - - - - - - -";
  position: absolute;
  width: 139px;
  font-size: 21px;
  color: #d7d7d7;
  background-color: #fff;
  top: 11px;
  right: 250px;
  z-index: 2;
}

.box-timeline div[class*="box-num"] {
  width: 14px;
  height: 14px;
  line-height: 14px;
  margin: 14px auto;
  border-radius: 50%;
  background-color: #fff;
  color: #fff;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 184, 155, 0.8);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 184, 155, 0.8);
  background-color: #555;
}
</style>
