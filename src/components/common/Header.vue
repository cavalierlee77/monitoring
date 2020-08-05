<template>
    <div class="mainpage_header">
        <div class="x_mainpage_title">
            <h2 class="x_mainpage_Ctitle">{{ Ctitle }}</h2>
            <p class="x_mainpage_Etitle">{{ Etitle }}</p>
        </div>
        <div class="fcontainer">
            <p>{{ userName }}</p>
            <i class="exit" @click="loginOut"></i>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    created() {
        if (window.localStorage.getItem("users")) {
            this.userName = JSON.parse(
                window.localStorage.getItem("users")
            ).userName
        } else {
            window.localStorage.setItem("users", JSON.stringify(this.userInfo))
            this.userName = this.userInfo.userName
        }
        //     console.log(JSON.parse(window.localStorage.getItem("list")))
        //     this.$store.replaceState(
        //         Object.assign(
        //             {},
        //             this.$store.state,
        //             JSON.parse(window.localStorage.getItem("list"))
        //         )
        //     )
        // }
        // window.addEventListener("beforeunload", () => {
        //     window.localStorage.setItem(
        //         "list",
        //         JSON.stringify(this.$store.state)
        //     )
        // })
    },
    // beforeDestroy() {
    //     // 页面销毁时,断开连接
    //     window.localStorage.removeItem("users")
    // },
    data() {
        return {
            Ctitle: "内蒙古公交投综合信息管理系统",
            // Etitle: "vehicle Integrated management software",
            Etitle: "",
            userName: ""
        }
    },
    mounted() {},
    computed: {
        ...mapState({
            userInfo: state => state.common.userInfo
        })
    },
    methods: {
        loginOut() {
            this.$router.push("/")
        }
    }
}
</script>

<style scoped lang="scss">
@import "@pages/cms/_css/commonStyle.scss";
/* 头部标题部分 */
.mainpage_header {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .x_mainpage_title {
        background-color: $frame-header;
        height: 100%;
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        // margin-left: 32px;
        // .x_mainpage_logo {
        //     position: relative;
        //     margin: 0 auto;
        //     margin-top: 10px;
        //     vertical-align: middle;
        //     width: 52px;
        //     height: 52px;
        //     background-image: url(../../../static/img/greenLogo.png);
        //     background-repeat: no-repeat;
        //     background-size: 90%;
        // }
        .x_mainpage_Ctitle {
            position: relative;
            // margin-top: 10px;
            // height: 32px;
            font-size: 20px;
            font-weight: 600;
            color: $frame-text-color;
        }
        .x_mainpage_Etitle {
            position: relative;
            color: $frame-text-color;
            font-family: Georgia, serif;
            font-size: 13px;
            // height: 36px;
        }
    }
    .fcontainer {
        background-color: $frame-header;
        font-size: 16px;
        color: $frame-text-color;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        .exit {
            cursor: pointer;
            width: 26px;
            height: 26px;
            mask-image: url(../../../static/img/logout.svg);
            mask-size: 26px;
            background-color: $frame-text-color;
            margin-left: 48px;
            margin-right: 48px;
            transition: all 400ms ease;
            &:hover {
                background-color: $header-text-color;
                transition: all 400ms ease;
            }
        }
    }
}
</style>
