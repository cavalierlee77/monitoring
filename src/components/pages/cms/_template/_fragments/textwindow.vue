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
                v-if="!list === false"
            >
                <el-carousel-item
                    v-for="(page, index) in list.itemList"
                    :key="index"
                >
                    <div
                        v-for="(word, index) in page.wordList"
                        v-bind:style="word.pstyle"
                        :key="index"
                        class="txt-p"
                    >
                        <p>
                            {{ word.wc }}
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
    // computed: {
    //     ...mapState({
    //         dirColor: state => state.cms.directionColor,
    //         dirFontFamily: state => state.cms.directionShowFontFamily,
    //         dirFontSize: state => state.cms.directionFontSize
    //     })
    // },
    components: {},
    props: {
        infos: {
            type: Object
        },
        list: {
            type: Object
        }
    },
    methods: {
        // remixInfos(info) {
        //     const size = info.cmsSizeDesc.split("×")
        //     info.width = size[0] + "px"
        //     info.height = size[1] + "px"
        //     if (info.data && JSON.stringify(info.data) !== "{}") {
        //         info.ph = info.data.dph / info.data.itemlist.length + "px"
        //         info.data.itemlist.fsDesc =
        //             this.dirFontSize[info.data.itemlist.fs] + "px"
        //         info.data.itemlist.fnDesc = this.dirFontFamily[
        //             info.data.itemlist.fn
        //         ]
        //         info.data.itemlist.fcDesc = this.dirColor[info.data.itemlist.fc]
        //     }
        // }
    },
    // filters: {
    //     txtheight(item, val) {
    //         const txtHeight =
    //             val.length === 0 ? item : parseFloat(item) / val.length + "px"
    //         return { height: txtHeight }
    //     },
    //     settxtp(pstyle, divstyle) {
    //         const txttop = pstyle.wy + "px"
    //         const txtleft = pstyle.wx + "px"
    //         const txtletterspace = 0 + "px"
    //         const fontsize = divstyle.fsDesc
    //         const fontfamily = divstyle.fnDesc
    //         const color = divstyle.fcDesc
    //         return {
    //             top: txttop,
    //             left: txtleft,
    //             "letter-spacing": txtletterspace,
    //             "font-size": fontsize,
    //             color: color,
    //             "font-family": fontfamily,
    //             "line-height": fontsize
    //         }
    //     }
    // },
    watch: {
        list: {
            handler(val) {
                // this.remixInfos(val)
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
            position: absolute;
            width: 100%;
        }
    }
}
</style>
