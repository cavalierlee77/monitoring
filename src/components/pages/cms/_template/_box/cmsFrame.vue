<template>
    <div class="cms-frame">
        <section v-if="lastlist.length > 0">
            <header>最后发布</header>
            <div class="wrap-cms">
                <cms-window
                    v-for="(cms, index) in lastlist"
                    :key="index"
                    :cmsinfo="cms"
                ></cms-window>
                <div class="wrap-all"></div>
            </div>
        </section>
        <section v-for="(area, index) in cmsGroupList" :key="index">
            <header>
                <span>{{ area.title }}</span>
            </header>
            <div class="wrap-cms">
                <cms-window
                    v-for="(cms, index) in area.list"
                    :key="index"
                    :cmsinfo="cms"
                ></cms-window>
                <div class="wrap-all"></div>
            </div>
        </section>
        <custom-dialog></custom-dialog>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    created() {
        if (window.localStorage.getItem("list")) {
            this.$store.replaceState(
                Object.assign(
                    {},
                    this.$store.state,
                    JSON.parse(window.localStorage.getItem("list"))
                )
            )
        }

        window.addEventListener("beforeunload", () => {
            window.localStorage.setItem(
                "list",
                JSON.stringify(this.$store.state)
            )
        })
    },
    data() {
        return {
            lastlist: [],
            dialogStatus: false,
            cmsGroupList: []
        }
    },
    computed: {
        ...mapState({
            cmsList: state => state.cms.cmsList
        })
    },
    components: {
        CmsWindow: () =>
            import(/* webpackchunkName: "cms" */ "./../_fragments/cms"),
        CustomDialog: () =>
            import(/* webpackchunkName: "tools" */ "./../_fragments/dialog")
    },
    methods: {
        tempManagement() {
            const dialogInfos = {
                title: "模板管理",
                width: "50%"
            }
            this.$store.commit("setDialogStatus", true)
            this.$store.commit("setDialogData", {})
            this.$store.commit("setDialogType", "tempManagement")
            this.$store.commit("setDialogInfos", dialogInfos)
        },
        remixCmsGroupList() {
            this.cmsList.map(cms => {
                let i = 0
                const l = this.cmsGroupList.length
                for (; i < l; i++) {
                    if (this.cmsGroupList[i].title === cms.road) {
                        this.cmsGroupList[i].list.push(cms)
                        break
                    }
                }
                if (i === l) {
                    this.cmsGroupList[i] = {
                        title: cms.road,
                        list: [cms]
                    }
                }
            })
        }
    },
    mounted() {},
    watch: {
        cmsList: {
            handler(val) {
                console.log(val)
                this.remixCmsGroupList()
            },
            immediate: true,
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
$section-header-height: 36px;
$btc-r: 7;
$btc-g: 219;
$btc-b: 219;
.cms-frame {
    > header {
        border-bottom: 1px solid #ddd;
        height: 32px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .btns {
            width: 30px;
            .frame-btn {
                font-size: 30px;
                padding-top: 0;
            }
        }
    }
    .wrap-cms {
        display: flex;
        flex-wrap: wrap;
    }
    section {
        header {
            height: $section-header-height;
            // line-height: $section-header-height;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            span {
                display: block;
                height: 18px;
                line-height: 2px;
                font-size: 18px;
                color: rgba($btc-r, $btc-g, $btc-b, 0.7);
                padding: 0 8px;
                border: 10px solid rgba(255, 255, 255, 0);
                border-left-color: rgba($btc-r, $btc-g, $btc-b, 0.5);
                box-sizing: border-box;
                text-shadow: -1px 1px 2px rgba(0, 0, 0, 0.3);
            }
        }
    }
}
</style>
