<template>
    <div class="wrapper">
        <el-container>
            <el-aside width="180px" class="wrapper-aside">
                <header class="aside-header">
                    <i class="x_mainpage_logo"></i>
                    <span>{{ asideTital }}</span>
                </header>
                <left-menu v-bind:style="{ height: height + 'px' }"></left-menu>
            </el-aside>
            <el-container>
                <el-header class="wrapper-header">
                    <my-header></my-header>
                </el-header>
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
// import LeftMenus from "@/store/constant/index.js"
export default {
    created() {
        if (!window.localStorage.getItem("socketid")) {
            const S5 = this.setSocketId()
            window.localStorage.setItem("socketid", S5)
        }

        // const defaultShowPageUrl = LeftMenus.leftMenus[0].child[0].index
        // this.$router.push(defaultShowPageUrl)
        this.$router.push("/main/equipment/cms")
        // this.$router.push({ path: "/main/equipment/map" })
    },
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
            height: state => state.common.windowHgt,
            asideTital: state => state.common.asideTital
        })
    },
    methods: {
        setSocketId() {
            const S5 =
                Math.floor(Math.random() * 10000 + 1) +
                new Date().format("hhmmssS")
            return S5
        }
    }
}
</script>

<style scoped lang="scss">
.wrapper {
    height: 100%;
    width: 100%;
    .wrapper-header {
        padding: 0 24px;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        z-index: 8;
    }

    .wrapper-aside {
        z-index: 9;
        background-color: #001529;
    }

    .wrapper-main {
        padding: 0px;
        background-color: #eff1f4;
        position: relative;
    }
    .aside-header {
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: rgba(255, 255, 255, 0.9);
        font-size: 20px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        i.x_mainpage_logo {
            display: block;
            position: relative;
            width: 30px;
            height: 30px;
            background-image: url(../../../static/img/greenLogo.png);
            background-repeat: no-repeat;
            background-size: 100%;
            margin-right: 8px;
        }
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
