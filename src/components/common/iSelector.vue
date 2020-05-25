<template>
    <el-select v-model="dateModel" class="forFull" clearable>
        <el-option
            v-for="option in options"
            :key="option.id"
            :value="option.id"
            :label="option.name"
        ></el-option>
    </el-select>
</template>

<script>
export default {
    name: "iSelector",
    props: {
        value: {
            default: function() {}
        },
        options: {
            type: Array,
            default: function() {}
        },
        vname: {
            default: function() {}
        }
    },
    data() {
        return {
            dateModel: ""
        }
    },
    methods: {
        validateDate() {
            try {
                this.$emit("change", this.dateModel, this.vname)
            } catch (e) {
                this.$emit("error", true)
            }
        }
    },
    watch: {
        dateModel: function() {
            this.validateDate()
        }
    }
}
</script>
