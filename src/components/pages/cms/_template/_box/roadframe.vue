<template>
    <div class="roadframe-wrap">
        <section v-for="(road, index) in roadList" :key="index">
            <header>{{ road.headerName }}</header>
            <div class="section-main">
                <div
                    class="scetion-btn-wrap"
                    v-for="(type, index) in road.list"
                    :key="index"
                >
                    <road-btn
                        :btn="type"
                        :btnclick="changeSearchType"
                    ></road-btn>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import { mapState } from "vuex"

export default {
    data() {
        return {
            roadList: [
                {
                    headerName: "线路",
                    list: [
                        {
                            name: "G16",
                            id: 16
                        },
                        {
                            name: "G306",
                            id: 306
                        },
                        {
                            name: "G15",
                            id: 15
                        }
                    ]
                },
                {
                    headerName: "路段",
                    list: [
                        {
                            name: "G166",
                            id: 166
                        },
                        {
                            name: "G3016",
                            id: 3016
                        },
                        {
                            name: "G175",
                            id: 175
                        },
                        {
                            name: "G65",
                            id: 65
                        },
                        {
                            name: "G25",
                            id: 25
                        }
                    ]
                },
                {
                    headerName: "位置",
                    list: [
                        {
                            name: "主线",
                            id: 0
                        },
                        {
                            name: "前站广场",
                            id: 1
                        },
                        {
                            name: "隧道",
                            id: 2
                        }
                    ]
                },
                {
                    headerName: "方向",
                    list: [
                        {
                            name: "上行",
                            id: 3
                        },
                        {
                            name: "下行",
                            id: 4
                        }
                    ]
                },
                {
                    headerName: "类型",
                    list: [
                        {
                            name: "门架型",
                            id: 5
                        },
                        {
                            name: "F型",
                            id: 6
                        },
                        {
                            name: "T型",
                            id: 7
                        }
                    ]
                }
            ]
        }
    },
    props: {},
    computed: {
        ...mapState({
            cmslist: state => state.cms.cmsGroupList
        })
    },
    components: {
        RoadBtn: () =>
            import(/* webpackChunkName: "cms" */ "../_fragments/roadbtn")
    },
    methods: {
        changeSearchType(id) {}
    }
}
</script>
<style lang="scss" scoped>
$section-header-height: 50px;

$default-text-indent: 12px;

$header-text-color: rgb(64, 192, 179);

.roadframe-wrap {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ddd;
    box-sizing: border-box;

    header {
        height: $section-header-height;
        line-height: $section-header-height;
        text-indent: $default-text-indent;
        color: $header-text-color;
    }
    .section-main {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .scetion-btn-wrap {
            position: relative;
            width: 99px;
            height: 36px;
        }
    }
}
</style>
