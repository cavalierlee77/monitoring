<template>
  
    <div>
        <el-table
      :data="GreentableData"
      border
      style="width: 100%">
      <el-table-column
        prop="late3"
        label="延迟"
        width="100">
      </el-table-column>
      <el-table-column
        prop="lateTime3"
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
        prop="time3"
        label="数据最新更新时间"
        width="200">
      </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: 'UpdateTime',
    components: {
    },
    data() {
      return {
        //绿通车表格
        GreentableData: [     
        ],
        
      };

    },
    mounted(){
        this.getStation()
        .then((data) => {
            data.forEach(item => {
                this.getGreenHistoryData(item)
                .then((data) => {
                    this.setGreenTable(data);                  
                    this.Contrast3(data);
                })
                
            })
        });        
    },   
    methods: {
      //获取收费站
      getStation(){
        let p = new Promise((resolve, reject) => {
          let jsondata = {}; 
          this.$api.post("comm/getAllTolls", jsondata, res => {
              if (res.resultCode === '100') {
                  resolve(res.resultData)
              }
              else{
                  reject();
              }
          });
        })
        return p;
      },
      //获取截止时间
      getGreenHistoryData(item){
          let p = new Promise((resolve, reject) => {
            var jsondata = {           
              orgid: item.orgId,//机构编号。选填项              
            };                //查验绿通车过车记录查询
            this.$api.post("operation/getMaxTollTimeByOrgId", jsondata, res => {
                if (res.resultCode === '100') {
                    resolve(res.resultData);
                }
                else{
                    reject();
                }
            });
          })
          return p;
      },      
      //联合收割机带入
      setGreenTable(data){
        let state3 = this.Contrast3(data);
        this.GreentableData.push({
         late3: state3[0],
         lateTime3: state3[1],
         id1: data.orgId,
         name1: data.orgName,
         time3: data.combineHarvMaxTollTime,
        })
        this.GreentableData = this.GreentableData.sort((a, b) => {
        	return a.id1 - b.id1
        })
      },
      //联合收割机对比
	  Contrast3(data){
	      var d1 = Date.now();
		  var d2 =  (new Date(data.combineHarvMaxTollTime)).getTime();
		  var d3 = 5  ; 
		  var d4 = (d1 - d2)/ 1000 / 60 / 60;//两个时间相差的小时数 
		 // console.log(d1);
		 // console.log(d2);
		 // console.log(d4);
		  if (d4 < d3){
		  	return [`<span style='color:blue'>正常</span>`,d4.toFixed(2)]
		  }
		  else{
		  	return [`<span style='color:red'>有延迟</span>`,d4.toFixed(2)]
		  }
	  }, 
	}
};

</script>

<style scoped>
.el-table-column{
  background:blue;
  vertical-align:middle;
}
</style> 