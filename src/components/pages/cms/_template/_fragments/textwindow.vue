<template>
    <div class="wrap-text">
        <div
            class="text-window"
            v-bind:style="{
                width: infos.width,
                height: infos.height
            }"
        >
            <el-carousel
                :width="infos.width"
                :height="infos.height"
                indicator-position="outside"
                arrow="never"
            >
                <el-carousel-item
                    v-for="(page, index) in infos.pages"
                    :key="index"
                >
                    <div
                        v-bind:style="infos.height | txtheight(page)"
                        v-for="(txt, index) in page"
                        :key="index"
                    >
                        <p class="txt-p" v-bind:style="txt | settxtp">
                            {{ txt.text }}
                        </p>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    components: {},
    props: {
        infos: {
            type: Object
        }
    },
    methods: {
        remixInfos(info) {
            const size = info.size.split("×")
            info.width = size[0] + "px"
            info.height = size[1] + "px"
        }
    },
    filters: {
        txtheight(item, val) {
            const txtHeight =
                val.length === 0 ? item : parseFloat(item) / val.length + "px"
            return { height: txtHeight }
        },
        settxtp(item) {
            const txttop = item.y + "px"
            const txtleft = item.x + "px"
            const txtletterspace = item.space + "px"
            const fontsize = item.fontsize + "px"
            const fontfamily = item.fontfamily
            const color = item.color
            return {
                top: txttop,
                left: txtleft,
                "letter-spacing": txtletterspace,
                "font-size": fontsize,
                color: color,
                "font-family": fontfamily,
                "line-height": fontsize
            }
        }
    },
    watch: {
        infos: {
            handler(val) {
                this.remixInfos(val)
            },
            immediate: true,
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
.wrap-text {
    background-color: rgba(255, 255, 255, 1);
    position: relative;
    width: 100%;
    height: 144px;
    display: flex;
    justify-content: center;
    align-items: center;

    .text-window {
        position: relative;
        position: relative;
        background-color: rgb(54, 54, 54);
        padding: 6px;

        .txt-p {
            color: #fff;
            position: absolute;
            width: 100%;
        }
    }
}
</style>
