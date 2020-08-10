<template>
    <div class="aa">
        <el-menu
            :default-active="onRoutes"
            class="el-menu-vertical-demo"
            background-color="#001529"
            text-color="rgba(255, 255, 255, 0.9)"
            active-text-color="rgba(255, 208, 75, 1)"
            @open="handleOpen"
            @close="handleClose"
            @select="handleMenuItemClick"
            unique-opened
        >
            <template v-for="(menuItem, index) in leftMenus">
                <template v-if="menuItem.hasChild === false">
                    <el-menu-item
                        v-if="menuItem.hot"
                        :index="menuItem.index"
                        :key="index"
                    >
                        <i v-bind:class="[menuItem.imgClass]"></i>
                        <span slot="title">{{ menuItem.title }}</span>
                    </el-menu-item>
                </template>
                <template v-else>
                    <el-submenu :key="index" :index="index.toString()">
                        <template slot="title">
                            <i v-bind:class="[menuItem.imgClass]"></i>
                            <span>{{ menuItem.title }}</span>
                        </template>
                        <template v-for="(subItem, subIndex) in menuItem.child">
                            <el-menu-item
                                v-if="menuItem.hot && subItem.hot"
                                :index="subItem.index"
                                :key="subIndex"
                                >{{ subItem.title }}</el-menu-item
                            >
                        </template>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { mapState } from "vuex"

export default {
    data: function() {
        return {
            form: {}
        }
    },
    methods: {
        handleOpen(key, keyPath) {},
        handleClose(key, keyPath) {},
        handleMenuItemClick(key, keyPath) {
            this.$router.push("/" + key)
        }
    },
    created() {},
    mounted() {},
    computed: {
        onRoutes() {
            return this.$route.path.replace("/", "")
        },
        ...mapState({
            leftMenus: state => state.common.leftMenus
        })
    }
}
</script>

<style scoped lang="scss">
@import "../../../static/css/my-font-style.css";
@import "@pages/Equipment/cms/_css/commonStyle.scss";
.el-menu-vertical-demo {
    height: 100%;
    /* margin-right: -1px; */
    background-color: $frame-aside;
    border-right: none;
}
.barspan {
    color: red;
    float: right;
}
.el-badge .barspan {
    left: -20px;
}
.el-menu-item {
    background-color: rgba(255, 255, 255, 0);
}
.el-submenu .el-menu-item {
    min-width: 0px;
}
</style>
