<template>
    <div>
        <el-menu
            :default-active="onRoutes"
            class="el-menu-vertical-demo"
            background-color="#00b4d8"
            text-color="#fff"
            active-text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
            @select="handleMenuItemClick"
            unique-opened
        >
            <template v-for="menuItem in leftMenus">
                <template v-if="menuItem.hasChild == false">
                    <el-menu-item
                        v-bind:index="menuItem.index"
                        v-show="!menuItem.hot"
                        :key="menuItem.index"
                    >
                        <i v-bind:class="[menuItem.imgClass]"></i>
                        <span slot="title">{{ menuItem.title }}</span>
                    </el-menu-item>
                </template>
                <template v-else>
                    <el-submenu
                        v-bind:index="menuItem.index"
                        :key="menuItem.index"
                    >
                        <template slot="title">
                            <i v-bind:class="[menuItem.imgClass]"></i>
                            <span>{{ menuItem.title }}</span>
                        </template>
                        <template v-for="subItem in menuItem.child">
                            <el-menu-item
                                v-bind:index="subItem.index"
                                :key="subItem.index"
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
@import "@pages/cms/_css/commonStyle.scss";

.el-menu-vertical-demo {
    height: 100%;
    /* margin-right: -1px; */
    background-color: $frame-aside;
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
