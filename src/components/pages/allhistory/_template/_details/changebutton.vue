<!--查验信息按键-->
<template>
    <div class="" style="padding: 5px 0px 5px 0px;">
        <el-row style="text-align: center;">
            <el-col :span="12">
                <el-button size="medium" 
                icon="el-icon-edit"
                type="success"
                @click="save">保    存</el-button>
            </el-col>
            <el-col :span="12">
                <el-button size="medium" 
                icon="el-icon-check"
                type="info"
                @click="miss">取    消</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            visible: false,
            desc: ''
        }
    },
    components: {},
    methods: {
        save(){
            let status = {
                desc: '保存修改',
                save: true,
                abd: false
            }
            this.$emit('save', status);
        },
        miss(){
            this.$emit('cancel', status);
            
        }, 
    }
}
</script>

<style scoped>
</style>
