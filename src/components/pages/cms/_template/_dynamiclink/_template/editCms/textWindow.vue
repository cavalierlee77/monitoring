<template>
    <div class="text-window-wrap-in">
        <div
            class="text-window"
            v-bind:style="{
                width: data.width,
                height: data.height
            }"
        >
            <div
                v-bind:style="data.height | txtheight(txtpArr)"
                v-for="(txt, index) in txtpArr"
                :key="index"
                class="txtp-wrap"
            >
                <p class="txtp" v-bind:style="txtpStyle">
                    {{ txt }}
                </p>
            </div>
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
            type: Object,
            default: () => {}
        },
        txtpArr: []
    }
}
</script>
<style lang="scss" scoped>
.text-window-wrap-in {
    background-color: rgb(124, 124, 124);
    position: relative;
    width: 100%;
    height: 144px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;

    .text-window {
        position: relative;
        position: relative;
        background-color: rgb(54, 54, 54);
        padding: 4px;
        .txtp-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            .txtp {
                color: #fff;
            }
        }
    }
}
</style>
