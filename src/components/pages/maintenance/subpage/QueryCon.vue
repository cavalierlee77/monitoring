<template>  
<div class="quemain">
	<el-collapse v-model="activeNames" @change="handleChange">
  	<el-collapse-item  name="1">
  		<template slot="title">
  			<div>
	  			<header>
					<span>查询条件</span>
				</header>
			</div>
    	</template>
	<div class="quecontent">
		<el-row>
      	<el-col :span="10" :offset="6">
	    <el-form label-width="80px">
	    	<!-- <el-row>
	    		<el-col :span="12"> -->
	        <el-form-item label="车牌号码">
            <el-input v-model="formData.plateNumber" prefix-icon=" " suffix-icon="el-icon-edit"  placeholder="请输入车牌号码"></el-input>
	        </el-form-item>
    			<el-form-item label="货物名称">
    				<el-select
    					class="gslt"
  				    v-model="good"
  				    filterable
  				    remote
              :clearable="true"
  				    placeholder="请输入关键词"
  				    :remote-method="remoteMethod"
  				    :loading="loading">
  				    <el-option
  				      v-for="item in options4"
  				      :key="item.key"
  				      :label="item.label"
  				      :value="item.value">
  				    </el-option>
  				  </el-select>
	        </el-form-item>
	        <el-form-item label="最小金额">
		        <el-input v-model="formData.minCharge"  prefix-icon=" " suffix-icon="el-icon-edit"   placeholder="请输入最小金额"></el-input>
  		    </el-form-item>
  		    <el-form-item label="最大金额">
		        <el-input v-model="formData.maxCharge" prefix-icon=" " suffix-icon="el-icon-edit"  placeholder="请输入最大金额"></el-input>
	        </el-form-item>
	        <el-form-item label="审核状态">
				    <el-select  v-model="formData.verifyStatus" class="slt">
              <el-option v-for="item in restaurants" :key="item.value" :value="item.value" :label="item.address"></el-option>
            </el-select >
	        </el-form-item>
	        <el-form-item label="开始时间">
		        <el-date-picker
    					v-model="formData.beginTime"
    					type="datetime"
    					value-format="yyyy-MM-dd HH:mm:ss"
    					placeholder="请选择开始时间">
    				</el-date-picker>
    			</el-form-item>
	        <el-form-item label="结束时间">
		        <el-date-picker
    					v-model="formData.endTime"
    					value-format="yyyy-MM-dd HH:mm:ss"
    					type="datetime"
    					placeholder="请选择结束时间">
    				</el-date-picker>
    			</el-form-item>
    			<el-form-item label="">
    	        	<el-button plain icon="el-icon-search" @click="onSearch">检索</el-button>
    	    </el-form-item>
	    </el-form>
	    </el-col>
	</el-row>
	</div>
	</el-collapse-item>
</el-collapse>
</div>
</template>
<script> 

export default {
    data: function() {
     return	{
     	options4: [],
     	list: [],
     	loading: false,
     	activeNames: [],
     	restaurants: [],
     	states:[],
     	good: "",
     	name: "",
        timeout:  null,
        jsond: {
      		groupType:"VerifyStatus",
      		haveSelAll:1
      	},
     	formData:{
     		verifyStatus:'',
     		plateNumber: "",
     		maxCharge:"",
     		minCharge:"",
     		checkStatus:"",
     		goods:"",
        	beginTime: '',
        	endTime: '',
     	},
     	options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '待审核'
        }, {
          value: '2',
          label: '不通过'
        }, {
          value: '3',
          label: '通过'
        }],
     	vehicleInfo: {},
     	pickerOptions1: {
          	disabledDate(time) {
            	return time.getTime() > Date.now();
          	},
          	shortcuts: [{
            text: '今天',
            onClick(picker) {
              	picker.$emit('pick', new Date());
              	console.log(new Date());
	            }
	        }, {
	            text: '昨天',
	            onClick(picker) {
	              const date = new Date();
	              date.setTime(date.getTime() - 3600 * 1000 * 24);
	              picker.$emit('pick', date);
	              
	            }
	        }, {
	            text: '一周前',
	            onClick(picker) {
	              const date = new Date();
	              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', date);
	            }
          	}]
        }
    };
    },
    methods:{
    	handleChange(val) {
        	//console.log(val);
      	},
	    onSearch(){
	    	this.formData.goods = this.good;
	    	this.$emit('onSearchData',this.formData);
	    },
	    handleSelect(item) {
	        
	    },
	    querySearchAsync(queryString, cb) {
        var restaurants = this.goodsNameList;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 10 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll(){
      	let self = this
      	this.$api.post("comm/getCommParamdic", this.jsond, res => {
           self.errorInfo ="";
           if (res.resultCode == "100") {
               if( res.resultData.length){
                	this.restaurants = [];
                	for(var i = 0; i < res.resultData.length; i++){
                		//console.log(1);
                		//console.log(res.resultData);
                		var rest = {
     						value:"",
     						address:""
     					};
                		rest.value = res.resultData[i].dicID;
                		rest.address = res.resultData[i].dicName;
                		self.restaurants[i] = rest;
                	}
               }	
              }
            else{
             self.errorInfo = res.resultMsg;
           }
        }); 
      },
      loadGoodsName(){
      	let self = this
      	this.$api.post("comm/getGoodList", this.jsond, res => {
           self.errorInfo ="";
           if (res.resultCode == "100") {
                	self.states = [];
                	var index = 0;
                	for(var i = 0; i < res.resultData.length; i++){
                		for(var j = 0;j < res.resultData[i].length; j++){
                			index = index + 1;
                			var mid = {
                				key:"",
                				value: "",
                				label: ""
                			};
                			mid.key = index;
                			//mid.label = res.resultData[i][j].initialLetter.toLowerCase();
                			mid.label = res.resultData[i][j].greenThreeName;
                			mid.value = res.resultData[i][j].greenThreeName;
                			//console.log(makePy(mid.value));
                			self.options4.push(mid);
                			self.states.push(mid);
                		};
                	};
                	//console.log(self.states);
                	self.list = self.states.map(item => {
				        return {key: item.key, value: item.value, label: item.label };
				      });
                	//console.log(this.states);
                	//console.log(this.list);

              }
            else{
             self.errorInfo = res.resultMsg;
           }
        }); 
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
            	 var py = this.$PinYinHelper.toPinYin(item.label)[0].toLowerCase();
            	 //console.log(py);
            	// console.log(query);
             //  if(py.indexOf(query.toLowerCase()) > -1){
             //  	return item.label;
             //  };
             return (py.indexOf(query.toLowerCase()) > -1) || (item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1);
            });
           // console.log(this.options4);
          }, 200);
        } else {
          this.options4 = [];
          this.options4 = this.list;
        }
      }
	},
	async mounted () {
		this.loadAll();
		this.loadGoodsName();
	},
	watch:{
	  good(val) {
	    this.options4 = this.list;
	  }
	}
};
</script>

<style scoped>
.quemain {
	background: white;
	font-size: 14px;
}
header {
	font-size: 14px;
	font-weight: 700;
	color: "#666666";
	padding: 10px 17px;
	border-bottom: 1px solid #ebeef5;
	text-align: left;
	box-sizing: border-box;
	background-color: white;
}
header span {
	margin: 0;
	padding: 0;
}
.slt {
	width: 100%;
}

.quecontent {
	font-size: 16px;
	color: #666666;
	background-color: white;
}
.quecontent .el-input{
	/*width:auto;*/
}
.quecontent {
	margin-top: 0px;
	margin-bottom: 0px;
}
.quecontent .el-form-item {
	margin-left: 25%;
	margin-bottom: 10px;
}
.quecontent .el-form-item .el-form-item__label {
	margin-bottom: 0px;
	width: 70px;
}
.quecontent .el-form-item .el-form-item__label {
	margin-left: 10px;
	width: 70px;
}
.searchButton{
}
</style>
