<template>
    <div class="wrap clear">
        <el-container class="container-outwrap">
            <el-header class="header-outwrap" height="80px">
                <cms-header></cms-header>
            </el-header>
            <el-main
                class="main-outwrap"
                v-bind:style="{ height: frameheight }"
            >
                <cms-list></cms-list>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "",
    data() {
        return {
            frameheight: "",
            clientHeight: "",
            headerHeight: "",
            frameHeight: "",
            cmsList: [],
            cmsGroupList: [],
            cmsMap: {},
            awaitInfos: [],
            awaitStatus: []
        }
    },
    computed: {
        ...mapState({
            devInfoList: state => state.cms.devInfoList,
            cmsInfoList: state => state.cms.cmsInfoList,
            cmsStatusList: state => state.cms.cmsStatusList
        })
    },
    components: {
        RoadFrame: () =>
            import(/* webpackChunkName: "cms" */ "./_template/_box/roadframe"),
        CmsList: () =>
            import(/* webpackChunkName: "cms" */ "./_template/_box/cmsFrame"),
        CmsHeader: () =>
            import(/* webpackChunkName: "cms" */ "./_template/_box/cmsHeader")
    },
    methods: {
        getBasicInfos() {
            this.$store.dispatch("getDevInfo")
            this.$store.dispatch("getCmsInfo")
            this.$store.dispatch("getStatusInfo")
        },
        getCheckedData(val) {
            this.checkedList = val.concat()
            this.dialogToggle()
        },
        dialogToggle() {
            this.dialogVisible = !this.dialogVisible
        },
        resetFrameHeight() {
            this.frameheight =
                parseFloat(this.clientHeight) -
                parseFloat(this.headerHeight) -
                parseFloat(this.frameHeight) -
                20 +
                "px"
        },
        remixCmsList() {
            if (!this.devInfoList || this.devInfoList.lenght === 0) {
                return false
            }
            this.$store.commit("setDevCount", this.devInfoList.length)
            this.devInfoList.forEach(dev => {
                this.cmsMap[dev.orgId + "×" + dev.devId] = {}
                this.cmsMap[dev.orgId + "×" + dev.devId] = dev
            })
            this.awaitInfos.forEach(info => {
                Object.entries(info).map(([key, value]) => {
                    this.cmsMap[info.orgId + "×" + info.devId][key] = value
                })
            })
            this.awaitStatus.forEach(status => {
                Object.entries(status).map(([key, value]) => {
                    this.cmsMap[status.orgId + "×" + status.devId][key] = value
                })
            })
            this.cmsList = Object.values(this.cmsMap)
            this.$store.commit("setCmsList", this.cmsList)
        },
        remixCmsInfo(val) {
            val.forEach(info => {
                Object.entries(info).map(([key, value]) => {
                    if (this.cmsMap[info.orgId + "×" + info.devId]) {
                        this.cmsMap[info.orgId + "×" + info.devId][key] = value
                    } else {
                        this.awaitInfos.push(info)
                    }
                })
            })
            this.cmsList = Object.values(this.cmsMap)
            this.$store.commit("setCmsList", this.cmsList)
        },
        remixCmsStatus(val) {
            val.forEach(info => {
                Object.entries(info).map(([key, value]) => {
                    if (this.cmsMap[info.orgId + "×" + info.devId]) {
                        this.cmsMap[info.orgId + "×" + info.devId][key] = value
                    } else {
                        this.awaitStatus.push(info)
                    }
                })
            })
            this.cmsList = Object.values(this.cmsMap)
            this.$store.commit("setCmsList", this.cmsList)
        },
        resetLists() {
            this.cmsList = Object.values(this.cmsMap)
            this.$store.commit("setCmsList", this.cmsList)
        }
    },
    mounted() {
        this.getBasicInfos()
        this.clientHeight = `${document.documentElement.clientHeight}`
        this.headerHeight = document.querySelector(".el-header").style.height
        this.frameHeight = document.querySelector(
            ".header-outwrap"
        ).style.height
        this.resetFrameHeight()
        window.onresize = function temp() {
            this.clientHeight = `${document.documentElement.clientHeight}`
            this.headerHeight = document.querySelector(
                ".el-header"
            ).style.height
            this.frameHeight = document.querySelector(
                ".header-outwrap"
            ).style.height
            this.resetFrameHeight()
        }
    },
    watch: {
        devInfoList: {
            handler(val) {
                this.remixCmsList()
            },
            immediate: true,
            deep: true
        },
        cmsInfoList: {
            handler(val) {
                this.remixCmsInfo(val)
            },
            immediate: true,
            deep: true
        },
        cmsStatusList: {
            handler(val) {
                this.remixCmsStatus(val)
            },
            immediate: true,
            deep: true
        },
        cmsMap: {
            handler(val) {
                this.resetLists(val)
            },
            deep: true
        }
    }
}
</script>

<style scoped lang="scss">
$outwrap-borderline-color: #ddd;

.container-outwrap {
    margin: 8px;
    border: 1px solid $outwrap-borderline-color;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    overflow: hidden;

    .header-outwrap {
        background-color: #fff;
        border-bottom: 1px solid $outwrap-borderline-color;
        box-sizing: border-box;
    }
}
</style>
