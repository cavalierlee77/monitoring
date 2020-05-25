<template>
    <div class="basicInfo-wrap">
        <div class="cmsinfos-wrap">
            <p>所处位置：{{ data.title }} {{ data.station }}</p>
            <p>运行状态：{{ data.status }}</p>
            <p>发布时间：</p>
            <p>情报板：{{ data.size }}</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    props: {
        data: {
            type: Object
        }
    }
}
</script>
<style lang="scss" scoped>
$basic-color: rgb(156, 169, 177);
.basicInfo-wrap {
    .cmsinfos-wrap {
        position: relative;
        padding: 10px 0;
        p {
            height: 20px;
            line-height: 20px;
            color: $basic-color;
            font-size: 14px;
        }
    }
}
</style>
