<template>
    <div class="wrapper">
        <el-container>
            <el-header style="height:72px;" class="wrapper-header">
                <div ref="_header">
                    <my-header></my-header>
                </div>
            </el-header>
            <el-container>
                <el-aside width="180px" class="wrapper-aside">
                    <left-menu
                        v-bind:style="{ height: height + 'px' }"
                    ></left-menu>
                </el-aside>
                <el-main class="wrapper-main">
                    <transition name="move" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    components: {
        MyHeader: () =>
            import(/* webpackChunkName: "entryapp" */ "../common/Header"),
        LeftMenu: () =>
            import(/* webpackChunkName: "entryapp" */ "../common/LeftMenu")
    },
    mounted: function() {
        const self = this
        this.$store.dispatch("getHeight")
        this.$store.dispatch("getMainWindowHeight")
        window.onresize = function() {
            self.$store.dispatch("getHeight")
            self.$store.dispatch("getMainWindowHeight")
        }
    },
    computed: {
        ...mapState({
            height: state => state.common.windowHgt
        })
    },
    methods: {}
}
</script>

<style scoped lang="scss">
.wrapper {
    height: 100%;
    width: 100%;
    .wrapper-header {
        padding: 0;
        height: 72px;
        box-shadow: 178px 3px 5px rgba(0, 0, 0, 0.3);
        z-index: 8;
    }

    .wrapper-aside {
        z-index: 9;
        box-shadow: 3px 0 5px rgba(0, 0, 0, 0.3);
        background-color: rgb(49, 49, 49);
    }

    .wrapper-main {
        padding: 0px;
        background-color: #eff1f4;
        position: relative;
    }
}

.clear {
    zoom: 1;
}
.clear:after {
    content: "";
    display: block;
    clear: both;
}
</style>
