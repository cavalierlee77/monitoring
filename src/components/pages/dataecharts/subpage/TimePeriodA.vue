<template>
<div class="echarts-time-period-a-wraper">
    <ul :class="'echarts-time-period-ul-'+demo">
        <li class="li-color-green">近12月</li>
        <li>去年</li>
        <li>近30日</li>
        <li>上月</li>
    </ul>
</div>
</template>
<script> 
export default {
    props: {
        demo: {
            type: String,
            default: function() {
                return {

                }
            }
        },
    },
    data () {
        return {
           periodA:{
                start: "",
                end: ""    
           }
      }
    },
    mounted(){
        this.bindDom();
        this.getDate();
    },
    methods: {
        bindDom() {
            let lidom = $('.echarts-time-period-ul-'+this.demo+' li');
            lidom.bind("click","li",function(){ 
                let hasclass = $(this).hasClass("li-color-green");
                if(hasclass){

                }else{
                    lidom.each(function(){
                        $(this).removeClass('li-color-green');
                    });
                    $(this).addClass("li-color-green");
                };
                console.log($(this)[0].innerText);
              });
        },
        getDate() {
            let curDate = new Date();
            let preDate = new Date(curDate.getTime() - 24*60*60*1000);
            let preThirtyDate = new Date(curDate.getTime() - 30*24*60*60*1000);
            let lastMonthDate = new Date(curDate.setMonth(curDate.getMonth()-1));
            let twelveMonthDate = new Date(curDate.setMonth(curDate.getMonth()-12));
            let lastyearDate = new Date(curDate.setFullYear(curDate.getFullYear()-1));
            //当天时间
            console.log(curDate);
            //前一天时间 
            console.log(preDate);
            //近30天时间 
            console.log(preThirtyDate);
            //近一月 
            console.log(lastMonthDate.getMonth()+1);
            //近12月 
            console.log(twelveMonthDate.getMonth()+1);
            //去年
            console.log(lastyearDate.getFullYear()+1);
            // let year=myDate.getFullYear();
            // let month=myDate.getMonth()+1;
            // let date=myDate.getDate(); 
            // let h=myDate.getHours();       //获取当前小时数(0-23)
            // let m=myDate.getMinutes();     //获取当前分钟数(0-59)
            // let s=myDate.getSeconds();
            // let nowdate=year+'-'+this.getNow(month)+"-"+this.getNow(date)+" "+this.getNow(h)+':'+this.getNow(m)+":"+this.getNow(s);
        },
        getNow(s) {
            return s < 10 ? '0' + s: s;
        }
    }
};
</script>

<style scoped>
.echarts-time-period-a-wraper {
    position: absolute;
    right: 0px;
    z-index: 9999;
}
ul {
    float: right;
    list-style-type:none;
}
ul li{
    float: left;
    padding: 0px 10px 0px 10px;
}
.li-color-green {
    color: #409EFF;
}
</style>
