<template>
    <div class="wrap-text">
        <div
            class="text-window"
            v-bind:style="{
                width: dev.width,
                height: dev.height
            }"
        >
            <el-carousel
                :width="dev.width"
                :height="dev.height"
                indicator-position="outside"
                arrow="never"
                v-if="!playList === false"
            >
                <el-carousel-item
                    v-for="(page, index) in playList"
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
import { mapState } from "vuex"
export default {
    data() {
        return {
            playList: [],
            dev: {},
            cms: {}
        }
    },
    props: {
        cmsId: {
            type: String
        }
    },
    computed: {
        ...mapState({
            devMap: state => state.cms.devMap,
            cmsMap: state => state.cms.cmsMap,
            dirColor: state => state.cms.directionShowColor,
            dirFontFamily: state => state.cms.directionShowFontFamily,
            dirFontSize: state => state.cms.directionFontSize
        })
    },
    methods: {
        remixDev() {
            const size = this.dev.cmsSizeDesc.split("×")
            this.dev.width = size[0] + "px"
            this.dev.height = size[1] + "px"
        },
        remixCms() {
            if (this.cms) {
                try {
                    this.playList = JSON.parse(this.cms.data)
                    this.playList.forEach(item => {
                        const ph = this.playList.dph / item.wordList.length
                        item.wordList.forEach(word => {
                            word.pstyle = {
                                height: ph + "px",
                                top: word.wy + "px",
                                left: word.wx + "px",
                                "letter-spacing": 0 + "px",
                                "font-size": this.dirFontSize[item.fs] + "px",
                                color: this.dirColor[item.fc],
                                "font-family": this.dirFontFamily[item.fn],
                                "line-height": this.dirFontSize[item.fs] + "px"
                            }
                        })
                    })
                } catch (error) {
                    console.log(this.cms.deviceId)
                }
            }
        },
        resetDev() {
            this.dev = this.devMap[this.cmsId]
            this.cms = this.cmsMap[this.cmsId]
            this.remixDev()
            this.remixCms()
        }
    },
    watch: {
        cmsMap: {
            handler(val) {
                if (Object.keys(val).length > 0) {
                    this.resetDev()
                }
            },
            immediate: true,
            deep: true
        },
        cmsId: {
            handler() {
                this.resetDev()
            }
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
    .el-carousel__button {
        width: 8px;
        height: 8px;
        border-radius: 20px;
    }
    .el-carousel__indicator.is-active button {
        width: 20px;
    }
}
</style>
