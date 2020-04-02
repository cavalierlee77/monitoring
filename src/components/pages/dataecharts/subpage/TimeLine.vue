<template>
<div class="echarts-time-line-wraper">
    <ul class="echarts-time-line-ul">
        <li class="li-color-green">日</li>
        <li>月</li>
        <li>年</li>
    </ul>
</div>
</template>
<script> 
export default {
    props: {
        // demo: {
        //     type: String,
        //     default: function() {
        //         return {

        //         }
        //     }
        // },
    },
    data () {
        return {
      }
    },
    mounted(){
        this.bindDom();
    },
    methods: {
        bindDom() {
            let lidom = $('.echarts-time-line-ul li');
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
        }
    }
};
</script>

<style scoped>
.echarts-time-line-wraper {
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
