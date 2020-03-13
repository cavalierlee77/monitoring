<template>
    <el-date-picker
        v-model="dateModel"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions">
    </el-date-picker>
</template>

<script>

export default {
    name: 'datepicker',
    props: {
        value: {
            default: false
        },
        vname: {
            default: false
        }
    },
    data() {
        return {
            pickerOptions: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
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
                    }
                ]
            },
            dateModel: ''
        }
    },
    methods: {
        validateDate () {
            try {
                this.$emit('change', this.dateModel, this.vname)
            } catch (e) {
                this.$emit('error', true)  
            }
        }
    },
    watch: {
        dateModel: function () {
            this.validateDate()
        }
    }
}
</script>



