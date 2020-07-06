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
            @keyup.enter="selectFn"
            v-model="inputModel"
        />
        <div></div>
        <section class="query-result">
            <p
                v-for="(dev, index) in resultArr"
                :key="index"
                @click.stop="checkId($event, dev.id)"
            >
                {{ dev.name }}
            </p>
        </section>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    components: {},
    data() {
        return {
            checkflag: false,
            checkflagSub: false,
            resultArr: [],
            inputModel: ""
        }
    },
    props: {
        width: {
            type: Number
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
            this.resultArr = []
            this.devInfoList.forEach(dev => {
                if (dev.deviceName.includes(this.inputModel)) {
                    this.resultArr.push({
                        name: dev.deviceName,
                        id: dev.mapId
                    })
                }
            })
        },
        checkId(e, id) {
            e.stopPropagation()
        },
        checkEmpty() {
            if (this.inputModel === "") {
                this.resultArr = []
            }
        },
        checkArrEmpty() {
            if (this.resultArr.length > 0) {
                this.checkflagSub = true
            } else {
                this.checkflagSub = false
            }
        }
    },
    computed: {
        ...mapState({
            devInfoList: state => state.cms.devInfoList
        })
    },
    watch: {
        inputModel: {
            handler() {
                this.checkEmpty()
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
