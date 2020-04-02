<template>
  
    <div>
        <el-table
      :data="GreentableData"
      border
      style="width: 100%">
      <el-table-column
       
        label="延迟"
        width="100">
        <template slot-scope="scope">
          <span style='color:blue' v-if='scope.row.lateTime1 < 4'>正常</span>
          <span style='color:red' v-if='scope.row.lateTime1 >= 4'>有延迟</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="lateTime1"
        label="延迟时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="id1"
        label="代号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name1"
        label="收费站名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="time1"
        label="数据最新更新时间"
        width="200">
      </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: 'UpdateTime',
    props:{
      ContainerTime: {

      }

    },
    components: {
    },
    data() {
      return {
        //绿通车表格
       
        
      };

    },
    mounted(){
                      
    }, 
    computed:{
      GreentableData: function(){
        // console.log(this.ContainerTime);
        let _GreentableData=[];
        for (let i = 0; i < this.ContainerTime.length; i++) {
          let state1 = this.Contrast1(this.ContainerTime[i].maxTollTime);
          // console.log(state1);
          _GreentableData.push({
            // late1: state1[0],
            lateTime1: state1 ,
            id1: this.ContainerTime[i].orgId,
            name1: this.ContainerTime[i].orgName,
            time1: this.ContainerTime[i].maxTollTime,
          })
        }
        // _GreentableData = _GreentableData.sort((a, b) => {
        //   return a.id1 - b.id1 
        // })
        return  _GreentableData;
      },
    } ,
    watch:{
      ContainerTime(){
      }

    } ,
    methods: {
      station(){
        // console.log(this.GreenTime)
      } ,

      //绿通车带入
      // setGreenTable(data){ 
      // // console.log(this.aaa);       
      //   for (var i = 0; i < this.aaa.length; i++) {
      //     let state1 = this.Contrast1(this.aaa[i].gcMaxTollTime);
      //     // console.log(state1);
      //     this.GreentableData.push({
      //       // late1: state1[0],
      //       lateTime1: state1 ,
      //       id1: this.aaa[i].orgId,
      //       name1: this.aaa[i].orgName,
      //       time1: this.aaa[i].gcMaxTollTime,
      //     })
      //   }
      //   this.GreentableData = this.GreentableData.sort((a, b) => {
      //   	return a.id1 - b.id1 
      //   })
      // },
      //绿通对比
	  Contrast1(data){
	    var d1 = Date.now();
		  var d2 =  (new Date(data)).getTime();
		  var d3 = 4; 
		  var d4 = (d1 - d2)/ 1000 / 60 / 60;//两个时间相差的小时数 
		 // console.log(d1);
		 // console.log(d2);
		 // console.log(d4);
		  if (d4 < d3){
		  	return d4.toFixed(2);
		  }
		  else{
		  	return d4.toFixed(2);
		  }
	  }, 
	}
};

</script>

<style>
.el-table-column{
  background:blue;
  vertical-align:middle;
}
</style> 