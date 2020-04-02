<template>
  <section class="label_input_wrapper">
    <header>
      <i class="el-icon-info"></i>   查验信息
    </header>
    <div
      class="grid"
      v-bind:style="{gridTemplateColumns: 'repeat('+ col +', 25%)'}">
      <div
        class="grid-item"
        v-for="(item, index) in supperArray"
        :key="index">
        <label for="">{{item.key}}</label>
        <el-input 
          v-model="item.value"  
          suffix-icon="el-icon-view" 
          readonly>
        </el-input>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: '',
  props: {
    supperArray: {
      type: Array,
      value: []
    },
    col: {
      type: Number,
      value: 0
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  components: {

  }
}
</script>

<style scoped>
header {
  padding: 10px 10px 10px 10px;
  font-size: 16px;
  font-weight: 700;
}

.grid {
  display: grid;
}
.grid-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0px 10px 0px;
}

.grid-item label {
  width: 120px;
  padding-left: 20px;
}
</style>
