<template>
    <div class="header-inwrap">
        <section class="header-top">
            <button
                class="p-button"
                type="round"
                size="mini"
                @click="handleMenuItemClick"
            >
                <i class="el-icon-back"></i>
                <span>返回</span>
            </button>
            <span>{{ title }}</span>
            <!-- <bread-crumb separator="el-icon-arrow-right">
                <bread-item itemLink="list">情报板管理</bread-item>
                <bread-item>情报板编辑</bread-item>
            </bread-crumb> -->
        </section>
    </div>
</template>

<script>
// import { mapState } from "vuex"
export default {
    data() {
        return {}
    },
    // components: {
    //     BreadCrumb: () =>
    //         import(
    //             /* webpackChunkName: 'cms' */ "./../../../_fragments/BreadCrumb/breadCrumb"
    //         )
    // },
    props: {
        title: {
            type: String,
            default: () => "情报板"
        }
    },
    methods: {
        handleMenuItemClick() {
            this.$store.commit("setDynamicLink", "list")
        }
    }
    // computed: {
    //     ...mapState({
    //         titleRount: state => {
    //             const titles = state.cms.titleRount
    //             const crumbs = function(arr) {
    //                 const childArr = arr.map(title => {
    //                     let _child = [[]]
    //                     if (title.children) {
    //                         _child = [...crumbs(title.children)]
    //                     }
    //                     _child.map(child =>
    //                         child.unshift({
    //                             title: title.title,
    //                             url: title.url
    //                         })
    //                     )
    //                     return _child
    //                 })
    //                 return childArr
    //             }
    //             const titleArr = [...crumbs(titles)]
    //             return titleArr
    //         }
    //     })
    // }
}
</script>
<style lang="scss" scoped>
@import "@pages/cms/_css/button.scss";
@import "@pages/cms/_css/buttonIcon.scss";
@import "@pages/cms/_css/commonStyle.scss";
.header-inwrap {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    section.header-top {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        > span {
            display: flex;
            height: 100%;
            align-items: center;
            font-size: 18px;
            letter-spacing: 2px;
            color: $header-text-color;
            font-weight: 100;
            margin-left: 10px;
        }
        > div {
            margin-left: 10px;
        }
    }
}
</style>
