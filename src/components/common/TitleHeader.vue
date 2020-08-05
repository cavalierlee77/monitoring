<!-- panel面板中段落的header 2019-11-12 -->
<template>
    <div class="">
        <header>
            <i class="el-icon-info"></i> {{ title }}
            <i class="el-icon-edit-outline click-icon" v-if="showIcon"></i>
            <slot></slot>
        </header>
    </div>
</template>

<script>
export default {
    name: "",
    props: {
        // 控制文件编辑图标显示
        showIcon: {
            type: Boolean,
            default: function() {
                return false
            }
        },
        // 段落header
        title: {
            type: String,
            default: function() {
                return ""
            }
        }
    },
    data() {
        return {}
    },
    methods: {},
    components: {}
}
</script>

<style scoped>
header {
    padding: 10px 10px 10px 10px;
    font-size: 16px;
    font-weight: 700;
}
.click-icon {
    position: absolute;
    font-size: 30px;
    right: 30px;
    cursor: pointer;
}
.up-files {
    opacity: 0;
    cursor: pointer;
    width: 30px;
    right: 30px;
    position: absolute;
}
</style>
