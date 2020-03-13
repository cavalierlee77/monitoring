<template>
  <section>
    <el-form ref="form" label-width="auto">
      <el-row v-for="(inputs, index) in reInputData" v-bind:key="index">
        <el-col
          :span="7"
          :offset="5"
          v-for="(innerinput, innerindex) in inputs"
          v-bind:key="innerindex"
        >
          <el-form-item :label="innerinput.title">
            <input-form :inputsInfo="innerinput"></input-form>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="7">
          <el-form-item label="...">
            <input-form></input-form>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :span="5">
          <el-button
            type="primary"
            plain
            icon="el-icon-search"
            @click="onSearch"
            >检索</el-button
          >
          <span class="change-querytype" v-on:click="changeQueryType()">
            {{ changeQueryTypeFlag.iName
            }}<i :class="changeQueryTypeFlag.iClass"></i>
          </span>
        </el-col> -->
      </el-row>
    </el-form>
  </section>
</template>

<script>
import InputForm from "./InputForm";

export default {
  name: "",
  props: {
    inputData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      reInputForm: []
    };
  },
  components: {
    InputForm
  },
  methods: {
    reInputData(val) {
      const newInpData = [];
      for (let i = 0, l = val.length; i < l; i++) {
        if (!newInpData[i % 2]) {
          newInpData[i % 2] = [];
        }
        newInpData[i % 2].push(val[i]);
      }
      this.reInputForm = newInpData;
    }
  },
  watch: {
    inputData: {
      handler(val) {
        this.reInputData(val);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style></style>
