<template>
    <div class="wrap-cms">
        <section>
            <header>
                <div class="infos">
                    <span>{{ cmsinfo.title }}</span>
                    <span>{{ cmsinfo.station }}</span>
                </div>
                <div class="types">
                    <span>{{ cmsinfo.type }}</span>
                </div>
            </header>
            <text-window :infos="cmsinfo"></text-window>
        </section>
        <aside>
            <p>
                <span>{{ cmsinfo.status }}</span>
            </p>
            <p @click="cmsInfo(cmsinfo, `basicInfo`)">
                <i class="el-icon-document"></i>
            </p>
            <p @click="cmsInfo(cmsinfo, `editCms`)">
                <i class="el-icon-edit"></i>
            </p>
            <p><i class="el-icon-star-off"></i></p>
        </aside>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    components: {
        TextWindow: () => import(/* webpackChunkName: "cms" */ "./textwindow")
    },
    props: {
        cmsinfo: {
            type: Object
        }
    },
    methods: {
        cmsInfo(info, type) {
            const dialogInfos = {
                title: info.title + " " + info.station + " " + info.type,
                width: "600px"
            }
            this.$store.commit("setDialogStatus", true)
            this.$store.commit("setDialogData", info)
            this.$store.commit("setDialogType", type)
            this.$store.commit("setDialogInfos", dialogInfos)
        }
    },
    watch: {
        cmsinfo: {
            handler(val) {
                // console.log(val)
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
$cmswindow-height: 36px;
$cmswindow-footer-height: 30px;
$border-color: rgb(209, 209, 209);
$hc-r: 7;
$hc-g: 219;
$hc-b: 219;
.wrap-cms {
    width: 48%;
    margin-right: 1%;
    margin-top: 10px;
    border: 1px solid $border-color;
    display: flex;
    flex-direction: row;
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    > section {
        flex-grow: 1;
        transition: all 240ms ease;
        > header {
            height: $cmswindow-height;
            line-height: $cmswindow-height;
            padding: 0 18px;
            display: flex;
            justify-content: space-between;
            background-color: rgb(255, 255, 255);

            .infos {
                margin-right: 12px;
                font-size: 16px;
                color: #707070;
            }
            .types {
                margin-right: 0px;
                font-size: 12px;
                color: #0f4ec2;
                span {
                    // border: 1px solid rgb(143, 141, 228);
                    padding: 1px 2px;
                    background-color: rgb(143, 141, 228);
                    color: #fff;
                }
            }
            .status {
                color: rgb(65, 173, 101);
            }
        }
    }

    &:hover {
        box-shadow: 0 0 12px rgba($hc-r, $hc-g, $hc-b, 0.3);
        border: 1px solid rgba($hc-r, $hc-g, $hc-b, 0.3);
        transition: all 240ms ease;
    }

    > aside {
        width: 50px;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        p {
            flex-grow: 1;
            border: 1px solid $border-color;
            transition: all 240ms ease;
            box-sizing: border-box;
            margin-bottom: -1px;
            margin-right: -1px;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:first-of-type {
                border-top: none;
            }
            &:hover {
                box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1) inset;
                transition: all 240ms ease;
                z-index: 9;
                > i {
                    color: rgba(7, 219, 219, 0.7);
                    transition: all 240ms ease;
                }
            }

            i {
                font-size: 24px;
                color: $border-color;
                transition: all 240ms ease;
            }
            > span {
                color: rgb(65, 173, 101);
            }
        }
    }
}
</style>
