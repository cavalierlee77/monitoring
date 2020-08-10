<template>
    <div
        class="query-wrap"
        type="round"
        size="mini"
        :class="{ checked: checkflag && checkflagSub }"
        :style="{ width: width + 'px' }"
    >
        <i class="icon-custom icon-query" @click="selectFn"></i>
        <input
            type="text"
            placeholder="请输入搜索内容"
            v-on:focus="checkFocus"
            v-on:blur="checkBlur"
            @keyup="whichKeyup($event)"
            @keydown="whichKeydown($event)"
            v-model="inputModel"
        />
        <div></div>
        <section class="query-result">
            <p
                v-for="(dev, index) in resultArr"
                :key="index"
                @click.stop="clickListFn($event, dev)"
                :class="{ checked: index + 1 === defaultIndex }"
                @mouseover="defaultIndex = index + 1"
                @mouseout="defaultIndex = 0"
            >
                {{ dev.show }}
            </p>
        </section>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            checkflag: false,
            checkflagSub: false,
            inputModel: "",
            defaultIndex: 0,
            temporary: 0
        }
    },
    props: {
        width: {
            type: Number,
            default: () => 400
        },
        pressKeyFn: {
            type: Function
        },
        resultArr: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        checkFocus() {
            this.checkflag = true
        },
        checkBlur() {
            setTimeout(() => {
                this.checkflag = false
            }, 200)
        },
        selectFn() {
            this.defaultIndex = 0
            this.temporary = 0
            this.selectlist()
        },
        selectlist() {
            this.$emit("pressKeyFn", this.inputModel)
        },
        clickListFn(e, dev) {
            e.stopPropagation()
            this.$emit("pressKeyFn", {
                clickList: this.resultArr[this.defaultIndex - 1]
            })
        },
        checkArrEmpty() {
            if (this.resultArr.length > 0) {
                this.checkflagSub = true
            } else {
                this.checkflagSub = false
            }
        },
        whichKeyup(ev) {
            if (ev.keyCode === 38) {
                this.temporary--
            }
            if (ev.keyCode === 40) {
                this.temporary++
            }
            if (this.temporary < 0) {
                this.temporary = this.resultArr.length
            }
            if (this.temporary > this.resultArr.length) {
                this.temporary = 1
            }
            this.defaultIndex = this.temporary
            if (ev.keyCode === 13) {
                if (this.defaultIndex === 0) {
                    this.$emit("pressKeyFn", this.inputModel)
                } else {
                    this.$emit("pressKeyFn", {
                        clickList: this.resultArr[this.defaultIndex - 1]
                    })
                }
            }
        },
        whichKeydown(ev) {
            // console.log(ev.keyCode)
        }
    },
    watch: {
        inputModel: {
            handler() {
                this.selectFn()
            }
        },
        resultArr: {
            handler() {
                this.checkArrEmpty()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/cms/_css/query.scss";
@import "@pages/cms/_css/buttonIcon.scss";
</style>
