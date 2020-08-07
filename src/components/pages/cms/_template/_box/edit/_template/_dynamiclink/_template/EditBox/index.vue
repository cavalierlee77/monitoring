<template>
    <div class="cms-edit-box">
        <header>条目编辑</header>
        <div class="edit-tools">
            <section class="tools-btn">
                <div class="tools-btn-left">
                    <div>
                        <span>字体：</span>
                        <select
                            v-model="textInfo.fontFamily"
                            @change="resetTextInfo"
                        >
                            <option value="">-字体-</option>
                            <option
                                v-for="({ k, v }, index) in dirFontFamily"
                                :value="k"
                                :key="index"
                                >{{ v }}</option
                            >
                        </select>
                    </div>
                    <div>
                        <span>字号：</span>
                        <select
                            v-model="textInfo.fontSize"
                            @change="resetTextInfo"
                        >
                            <option value="">-字号-</option>
                            <option
                                v-for="({ k, v }, index) in dirFontSize"
                                :value="k"
                                :key="index"
                                >{{ v }}px</option
                            >
                        </select>
                    </div>
                    <div>
                        <span>颜色：</span>
                        <select
                            v-model="textInfo.color"
                            @change="resetTextInfo"
                        >
                            <option value="">-颜色-</option>
                            <option
                                v-for="({ k, v }, index) in dirColor"
                                :value="k"
                                :key="index"
                                >{{ v }}</option
                            >
                        </select>
                    </div>
                </div>
                <div class="tools-btn-right">
                    <div>
                        <span>出字方式：</span>
                        <select
                            v-model="textInfo.display"
                            @change="resetTextInfo"
                        >
                            <option value="">-显示方式-</option>
                            <option
                                v-for="({ k, v }, index) in dirMode"
                                :value="k"
                                :key="index"
                                >{{ v }}</option
                            >
                        </select>
                    </div>
                    <div>
                        <span>停留时间：</span>
                        <select
                            v-model="textInfo.interval"
                            @change="resetTextInfo"
                        >
                            <option value="">-时间间隔-</option>
                            <option
                                v-for="({ k, v }, index) in dirDelay"
                                :value="k"
                                :key="index"
                                >{{ v }}</option
                            >
                        </select>
                    </div>
                </div>
            </section>
            <section class="tools-text">
                <div class="textarea-tips">{{ tips }}</div>
                <textarea v-model="editTxt"></textarea>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            editTxt: ""
        }
    },
    computed: {
        ...mapState({
            dirColor: state =>
                Object.entries(state.cms.directionColor).map(([k, v]) => ({
                    k,
                    v
                })),
            dirFontFamily: state =>
                Object.entries(state.cms.directionFontFamily).map(([k, v]) => ({
                    k,
                    v
                })),
            dirFontSize: state =>
                Object.entries(state.cms.directionFontSize).map(([k, v]) => ({
                    k,
                    v
                })),
            dirMode: state =>
                Object.entries(state.cms.directionMode).map(([k, v]) => ({
                    k,
                    v
                })),
            dirDelay: state =>
                Object.entries(state.cms.directionDelay).map(([k, v]) => ({
                    k,
                    v
                })),
            textInfo: state => state.cms.textInfo,
            txt: state => state.cms.txt,
            tips: state => state.cms.editTextareaTips
        })
    },
    methods: {
        resetTextInfo() {
            this.$store.commit("setEditTextInfo", this.textInfo)
        },
        resetTxt() {
            this.$store.commit("setEditTxt", this.editTxt)
        },
        resetEditTxt() {
            this.editTxt = this.txt
        }
    },
    watch: {
        editTxt: {
            handler(val, oldVal) {
                if (val !== oldVal) {
                    this.resetTxt()
                }
            }
        },
        txt: {
            handler(val, oldVal) {
                if (val !== oldVal) {
                    this.resetEditTxt()
                }
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/cms/_css/button.scss";
@import "@pages/cms/_css/buttonIcon.scss";
@import "@pages/cms/_css/commonStyle.scss";
.cms-edit-box {
    position: relative;
    width: 100%;
    height: 100%;
    // height: 210px;
    // @media screen and (max-width: 1660px) {
    // height: 172px;
    // }
    display: flex;
    flex-direction: column;
    header {
        height: 54px;
        width: 566px;
        background-color: rgba(255, 255, 255, 0);
        border-bottom: 1px solid rgba(222, 222, 222, 1);
        font-size: 16px;
        line-height: 54px;
        text-indent: 32px;
        color: $frame-text-color;
    }

    .edit-tools {
        flex-grow: 1;
        position: relative;
        min-width: 400px;
        height: 100%;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0);
        overflow: hidden;
        > header {
            position: relative;
            z-index: 11;
            display: flex;
            justify-content: space-evenly;
            flex-direction: column;
            align-items: center;
            height: 72px;
            border-bottom: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
            box-sizing: border-box;
            > div.tools-header {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
                > * {
                    margin-left: 12px;
                }
                > span {
                    letter-spacing: 0;
                    font-size: 14px;
                    color: #999;
                }
            }
        }
        section.tools-btn {
            position: relative;
            z-index: 11;
            height: 144px;
            display: flex;
            flex-direction: row;
            > div {
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                &.tools-btn-left {
                    width: 66.6%;
                    > div {
                        width: 50%;
                        span {
                            width: 70px;
                        }
                    }
                }
                &.tools-btn-right {
                    width: 33.3%;
                    margin-right: 16px;
                    > div {
                        width: 100%;
                    }
                }
                > div {
                    height: 72px;
                    display: flex;
                    align-items: center;
                    @media screen and (max-width: 1660px) {
                        width: 25%;
                        height: 36px;
                    }
                    span {
                        display: block;
                        width: 90px;
                        font-size: 15px;
                        text-align: right;
                    }
                    select {
                        flex-grow: 1;
                        margin-right: 12px;
                        height: 24px;
                        font-size: 14px;
                        color: #555;
                        border: 1px solid #aaa;
                        border-radius: 5px;
                        // max-width: 100px;
                        outline: none;
                    }
                }
            }
        }
        section.tools-text {
            position: relative;
            z-index: 11;
            height: 160px;
            width: auto;
            margin: 0 32px;
            display: flex;
            flex-direction: column;
            margin-top: 36px;
            .textarea-tips {
                width: 100%;
                padding: 16px 0 0px;
                font-size: 14px;
                font-weight: 600;
                color: orangered;
                height: 32px;
            }
            textarea {
                flex-grow: 1;
                position: relative;
                resize: none;
                border: none;
                outline: none;
                padding: 18px 36px;
                flex-basis: 100%;
                font-size: 16px;
                color: #333;
                background-color: rgba($hc-r, $hc-g, $hc-b, 0);
                border: 1px solid rgba($hc-r, $hc-r, $hc-r, 0.3);
                box-sizing: border-box;
                &:focus {
                    background-color: rgba(255, 255, 255, 0.9);
                    border: 1px solid rgba($hc-r, $hc-g, $hc-b, 1);
                }
            }
        }
    }

    .edit-convenience {
        @media screen and (max-width: 1660px) {
            width: 180px;
        }
        width: 300px;
        background-color: rgba($hc-r, $hc-g, $hc-b, 0.2);
        border-top: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
        box-sizing: border-box;
        .tools-header {
            @media screen and (max-width: 1660px) {
                flex-direction: column;
                height: 80px;
                align-items: flex-start;
                > * {
                    margin-top: 10px;
                }
            }
            display: flex;
            height: 60px;
            align-items: center;
            > span {
                width: 80px;
                text-align: right;
            }
            > div {
                display: flex;
                align-items: center;
                > button {
                    margin-left: 4px;
                }
            }
        }
    }
}
</style>
