<template>
    <div class="cms-frame">
        <section v-for="(area, index) in cmsGroupList" :key="index">
            <header>
                <span>{{ area.title }}</span>
            </header>
            <div class="wrap-cms">
                <cms-window
                    v-for="(mid, index) in area.list"
                    :key="index"
                    :dev="devMap[mid]"
                    :status="statusMap[mid]"
                    :cms="cmsMap[mid]"
                ></cms-window>
            </div>
        </section>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    // created() {
    //     if (window.localStorage.getItem("list")) {
    //         console.log(JSON.parse(window.localStorage.getItem("list")))
    //         this.$store.replaceState(
    //             Object.assign(
    //                 {},
    //                 this.$store.state,
    //                 JSON.parse(window.localStorage.getItem("list"))
    //             )
    //         )
    //     }
    //     window.addEventListener("beforeunload", () => {
    //         window.localStorage.setItem(
    //             "list",
    //             JSON.stringify(this.$store.state)
    //         )
    //     })
    // },
    data() {
        return {
            lastlist: [],
            dialogStatus: false,
            cmsGroupList: []
        }
    },
    computed: {
        ...mapState({
            cmsList: state => state.cms.cmsList,
            devInfoList: state => state.cms.devInfoList,
            devMap: state => state.cms.devMap,
            cmsMap: state => state.cms.cmsMap,
            statusMap: state => state.cms.statusMap
        })
    },
    components: {
        CmsWindow: () =>
            import(
                /* webpackchunkName: "cms" */ "@pages/cms/_template/_fragments/cms"
            )
    },
    methods: {
        remixCmsGroupList(...types) {
            types.push("roadName")
            this.devInfoList.forEach(cms => {
                let i = 0
                const l = this.cmsGroupList.length
                for (; i < l; i++) {
                    if (this.cmsGroupList[i].title === cms.roadName) {
                        if (!this.cmsGroupList[i].list.includes(cms.mapId)) {
                            this.cmsGroupList[i].list.push(cms.mapId)
                            break
                        }
                    }
                }
                if (i === l) {
                    this.cmsGroupList.push({
                        title: cms.roadName,
                        list: [cms.mapId]
                    })
                }
            })
        }
    },
    watch: {
        cmsList: {
            handler(val) {
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
