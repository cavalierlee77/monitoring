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
                v-if="!playlist === false"
            >
                <el-carousel-item
                    v-for="(page, index) in playlist"
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
    props: {
        infos: {
            type: Object
        },
        playlist: {
            type: Array
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
