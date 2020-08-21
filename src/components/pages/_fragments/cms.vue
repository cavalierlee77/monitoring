<template>
    <div class="wrap-cms" v-if="checkStatus(statusList || false)">
        <section>
            <text-window :cmsId="cmsId"></text-window>
            <header>
                <div class="infos">
                    <span>{{ dev.stationInfo }}</span>
                </div>
                <div class="types">
                    <span>{{ dev.manufacturer }}</span>
                </div>
            </header>
        </section>
        <aside class="cms-aside">
            <p v-if="statusList.status">
                <el-popover
                    placement="left"
                    width="100"
                    trigger="click"
                    v-if="statusList.status !== '正常'"
                >
                    <span
                        slot="reference"
                        v-bind:class="{
                            'status-error': !statusList.warning,
                            'status-warning': statusList.warning
                        }"
                        >{{ statusList.status || "" }}</span
                    >
                    <div>
                        <p
                            v-for="(status, index) in statusList.list"
                            :key="index"
                        >
                            {{ status }}
                        </p>
                    </div>
                </el-popover>
                <span v-if="statusList.status === '正常'">{{
                    statusList.status
                }}</span>
            </p>
            <p v-if="!statusList.status">
                <span class="status-unload">获取中</span>
            </p>
            <p @click="cmsInfos(`detail`)">
                <i class="el-icon-document"></i>
            </p>
            <p @click="cmsInfos(`edit`, statusList.status)">
                <i class="el-icon-edit"></i>
            </p>
            <!-- <p><i class="el-icon-star-off"></i></p> -->
        </aside>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            statusList: {},
            dev: {},
            status: []
        }
    },
    components: {
        TextWindow: () => import(/* webpackChunkName: "cms" */ "./textwindow")
    },
    computed: {
        ...mapState({
            selStatusList: state => state.cms.selStatusList,
            statusDesc: state => state.cms.statusDescMap,
            devMap: state => state.cms.devMap,
            statusMap: state => state.cms.statusMap,
            tillNowPage: state => state.cms.tillNowPage
        })
    },
    props: {
        cmsId: {
            type: String
        }
    },
    methods: {
        checkStatus(status) {
            const _status = status.statusFlag || status
            const statusList = []
            if (this.selStatusList.includes("在线")) {
                statusList.push(true)
            }
            if (this.selStatusList.includes("离线")) {
                statusList.push(false)
            }
            if (statusList.length === 0) {
                return true
            }
            return statusList.includes(_status)
        },
        cmsInfos(type, status) {
            this.$store.commit("setCmsId", this.cmsId)
            this.$store.commit("setFromWhere", this.tillNowPage)
            if (this.tillNowPage === "map") {
                this.$router.push({
                    path: "/main/equipment/cms",
                    query: { path: type }
                })
            } else {
                this.$store.commit("setDynamicLink", type)
            }
        },
        setStatusList() {
            this.statusList = { ...this.statusDesc[this.cmsId] }
        },
        setDevInfos() {
            this.dev = this.devMap[this.cmsId]
            this.setStatusList()
        }
    },
    watch: {
        statusDesc: {
            handler() {
                this.setStatusList()
            },
            deep: true,
            immediate: true
        },
        cmsId: {
            handler() {
                this.setDevInfos()
                this.setStatusList()
            },
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
    @media screen and (min-width: 1660px) {
        &:nth-child(3n) {
            margin-right: 0;
        }
    }
    width: 32.5%;
    margin-right: 1%;
    margin-top: 16px;
    border: 1px solid $border-color;
    display: flex;
    flex-direction: row;
    position: relative;
    overflow: hidden;
    border-radius: 6px;
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
        box-shadow: 0 1px 2px -2px rgba($hc-r, $hc-g, $hc-b, 0.16),
            0 3px 6px 0 rgba($hc-r, $hc-g, $hc-b, 0.12),
            0 5px 12px 4px rgba($hc-r, $hc-g, $hc-b, 0.09);
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
                &.status-unload {
                    color: rgba(87, 90, 90, 0.7);
                }
            }
        }

        .status-error {
            color: red;
            outline: none;
        }
        .status-warning {
            color: orange;
            outline: none;
        }
    }
}
</style>
