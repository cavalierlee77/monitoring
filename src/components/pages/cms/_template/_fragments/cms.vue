<template>
    <div class="wrap-cms">
        <section>
            <header>
                <div class="infos">
                    <!-- <span>{{ cmsinfo.deviceAddress }}</span> -->
                    <span>{{ dev.stationInfo }}</span>
                </div>
                <div class="types">
                    <span>{{ dev.manufacturer }}</span>
                </div>
            </header>
            <text-window :infos="dev" :list="playList"></text-window>
        </section>
        <aside>
            <p v-if="!statusList.flag">
                <el-popover placement="left" width="100" trigger="click">
                    <span slot="reference">{{
                        statusList.desc || "获取中"
                    }}</span>
                    <div>
                        <p
                            v-for="(status, index) in statusList.list"
                            :key="index"
                        >
                            {{ status }}
                        </p>
                    </div>
                </el-popover>
            </p>
            <p v-if="statusList.flag">
                <span>{{ statusList.desc || "获取中" }}</span>
            </p>
            <p @click="cmsInfos(`detail`)">
                <i class="el-icon-document"></i>
            </p>
            <p @click="cmsInfos(`edit`)">
                <i class="el-icon-edit"></i>
            </p>
            <p><i class="el-icon-star-off"></i></p>
        </aside>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            playList: {},
            statusList: {}
        }
    },
    components: {
        TextWindow: () => import(/* webpackChunkName: "cms" */ "./textwindow")
    },
    computed: {
        ...mapState({
            dirColor: state => state.cms.directionShowColor,
            dirFontFamily: state => state.cms.directionShowFontFamily,
            dirFontSize: state => state.cms.directionFontSize
        })
    },
    props: {
        dev: {
            type: Object
        },
        status: {
            type: Array
        },
        cms: {
            type: Object
        }
    },
    methods: {
        cmsInfos(type) {
            // if (!this.cmsinfo.data) {
            //     this.cmsinfo.data = []
            // }
            this.$store.commit("setCmsId", this.dev.mapId)
            this.$store.commit("setDynamicLink", type)
        },
        remixDev() {
            const size = this.dev.cmsSizeDesc.split("×")
            this.dev.width = size[0] + "px"
            this.dev.height = size[1] + "px"
        },
        remixCms() {
            if (this.cms) {
                this.playList = JSON.parse(this.cms.data)
                this.playList.itemList.forEach(item => {
                    const ph = this.playList.dph / item.wordList.length
                    item.wordList.forEach(word => {
                        word.pstyle = {
                            height: ph + "px",
                            top: word.wy + "px",
                            left: word.wx + "px",
                            "letter-spacing": 0 + "px",
                            "font-size": this.dirFontSize[item.fs] + "px",
                            color: this.dirColor[item.fc],
                            "font-family": this.dirFontFamily[item.fn],
                            "line-height": this.dirFontSize[item.fs] + "px"
                        }
                    })
                })
            }
        },
        remixStatus() {
            if (this.status) {
                this.statusList.desc = ""
                this.statusList.flag = true
                this.statusList.list = []
                this.status.forEach(status => {
                    const count = this.statusList.list.findIndex(
                        s => s === status.devVarTypeDesc
                    )
                    if (status.devVarLastValue !== "0") {
                        if (count < 0) {
                            this.statusList.list.push(status.devVarTypeDesc)
                        }
                    }
                    if (status.devVarLastValue === "0") {
                        if (count >= 0) {
                            this.statusList.list.splice(count, 1)
                        }
                    }
                })
                if (this.statusList.list.length > 0) {
                    this.statusList.desc = "故障"
                    this.statusList.flag = false
                } else if (this.statusList.list.length === 0) {
                    this.statusList.desc = "正常"
                    this.statusList.flag = true
                }
            }
        }
    },
    watch: {
        dev: {
            handler(val) {
                this.remixDev()
            },
            deep: true,
            immediate: true
        },
        cms: {
            handler(val) {
                this.remixCms()
            },
            deep: true,
            immediate: true
        },
        status: {
            handler(val) {
                this.remixStatus()
            },
            deep: true,
            immediate: true
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
$transition-time: 240ms;
.wrap-cms {
    @media screen and (max-width: 1660px) {
        width: 49%;
        &:nth-child(2n) {
            margin-right: 0;
        }
    }
    width: 32.5%;
    margin-right: 1%;
    margin-top: 10px;
    border: 1px solid $border-color;
    display: flex;
    flex-direction: row;
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    &:nth-child(3n) {
        margin-right: 0;
    }
    > section {
        flex-grow: 1;
        transition: all $transition-time ease;
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
        transition: all $transition-time ease;
        > aside {
            p {
                border-color: rgba($hc-r, $hc-g, $hc-b, 0.3);
                transition: all $transition-time ease;
            }
        }
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
            transition: all $transition-time ease;
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
                box-shadow: 0 0 8px 1px rgba($hc-r, $hc-g, $hc-b, 0.3) inset;
                transition: all $transition-time ease;
                z-index: 9;
                > i {
                    color: rgba(7, 219, 219, 0.7);
                    transition: all $transition-time ease;
                }
            }

            i {
                font-size: 24px;
                color: $border-color;
                transition: all $transition-time ease;
            }
            > span {
                color: rgb(65, 173, 101);
            }
        }
    }
}
</style>
