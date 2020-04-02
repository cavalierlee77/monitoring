<template>  
<div>
  <div class="row">
    <div class="col-12">
      <div class='upload-btn upload-btn-card' @click.stop='clickInput'>
        <i class="el-icon-plus"></i>
        <input type="file" name="file" ref="fileinput" multiple="multiple"  @click.stop class="upload__input" @change='upFile'>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
    	<ul class="upload-list upload-list--picture-card">
        <li class="upload upload--picture-card" v-for='item in urlList'>
          <a data-magnify="gallery" :href="item.value" >
            <img class="upload-list__item-thumbnail" :src="item.value" >
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script> 
//import 'jquery.magnify/dist/jquery.magnify.css'
//import 'jquery.magnify/dist/jquery.magnify.js'

export default {
  props: {
    editPicList: {
      type: Array,
      default: function(){
        return {

        }
      }
    }
  },
  data: function() {
    return	{
      urlList: [],
      //文件列表
      fileList: [],
      //文件名称列表
      fileNameList: [],
    }
  },
  methods:{
    clickInput(){
      //添加文件
      let file = $(this.$refs.fileinput);
      file.click();
    },
    //处理文件
    upFile(){
      //input
      // let input_up = $(this.$refs.fileinput)[0];
      // input_up.value = '';
      //清空展示列表图片
      this.urlList = [];
      let files = $(this.$refs.fileinput)[0].files;
      if(files.length < 15 ){
        this.fileList = files;
        for(let i = 0; i< files.length; i++){
          this.fileNameList.push(files[i].name);
          this.urlList.push({
            value: URL.createObjectURL(files[i]),
            name: files[i].name
          });
        };
        this.$emit('updateFileList',this.fileList);
      }else{
        const h = this.$createElement;
        this.$notify({
        title: '消息提示',
        message: h('i', { style: 'color: teal'}, '最多允许添加十五张照片')
        });
      }
    },
	},
	mounted: function() {
		
	},
	watch:{
    'editPicList':{
　　  immediate:true,
      handler:function(){
        this.urlList = this.editPicList;
      }
    },
	}
};
</script>

<style scoped>
.upload-list{
  margin: 0;
  padding: 0;
  list-style: none;
}
.upload-list--picture-card {
  margin: 0;
  display: inline;
  vertical-align: top;
}
.upload-btn {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: none;
}
.upload-btn-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 3px;
  box-sizing: border-box;
  width: 104px;
  height: 32px;
  cursor: pointer;
  line-height: 32px;
  vertical-align: top;
}
.upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: none;
}
.upload--picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
}
.upload__input {
  display: none;
}
</style>
