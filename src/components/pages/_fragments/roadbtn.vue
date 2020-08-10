<template>
    <div v-on:click="clickBtn(btn.id)" class="tem-btn">
        <span>{{ btn.name }}</span>
    </div>
</template>
<script>
export default {
    props: {
        btn: {
            type: Object,
            default: {}
        }
        // btnclick: {}
    },
    methods: {
        clickBtn: function(id) {
            this.$emit("btnclick", id)
        }
    }
}
</script>
<style lang="scss" scoped>
$btn-height: 28px;
$btn-wight: 90px;

.tem-btn {
    height: $btn-height;
    width: $btn-wight;
    text-align: center;
    line-height: $btn-height;
    position: relative;
    border: 1px solid rgb(12, 54, 50);
    box-sizing: border-box;
    border-radius: 3px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    cursor: pointer;
    transition: all 400ms ease;

    &:hover {
        box-shadow: 0 0 4px rgba(67, 255, 236, 0.7);
        border-color: rgb(64, 192, 179);
        transition: all 400ms ease;
        color: #fff;
        background-color: rgba(64, 192, 179, 0.8);
    }
}
</style>
