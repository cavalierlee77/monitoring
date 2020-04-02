<template>
<div class="echarts-time-season-wraper">
    <ul class="echarts-time-season-ul">
        <li class="li-color-green">春季</li>
        <li>夏季</li>
        <li>秋季</li>
        <li>冬季</li>
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
            let lidom = $('.echarts-time-season-ul li');
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
.echarts-time-season-wraper {
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
