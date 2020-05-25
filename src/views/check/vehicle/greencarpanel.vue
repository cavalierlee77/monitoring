<template>
    <div>
        <index-info :index="index" :total="total"></index-info>
        <check-info :obj="obj"></check-info>
        <charge-info :obj="obj"></charge-info>
        <image-info :arr="pictureList"></image-info>
        <timeline-info :stepLabel="timelineList"></timeline-info>
        <label-info @setLabel="setLabel" ref="labelInit"></label-info>
        <textarea-info
            @setVerifySuggest="setVerifySuggest"
            ref="textareaInit"
        ></textarea-info>
        <button-info @action="summit"></button-info>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
    name: "greencarpanel",
    props: {
        obj: {
            type: Object,
            default: function() {
                return {}
            }
        },
        index: {
            type: Number,
            default: function() {
                return 1
            }
        },
        total: {
            type: Number,
            default: function() {
                return 1
            }
        }
    },
    data() {
        return {
            verifyData: {
                checkId: "", // 查验记录编号。必须要填写
                verifyStatus: "", // 审核状态，"1"-待审核,"2"-不通过,"3"-通过
                verifySuggestSelect: "查验合格", // 选择产生的审核意见
                verifySuggest: "确认是绿通车" // 审核意见
            },
            picture_video_src: [
                "picSource",
                "otherPics",
                "driLicenseCopyPics",
                "truckHeadPics",
                "stationMasterPics"
            ],
            pictureList: [],
            timelineList: []
        }
    },
    components: {
        IndexInfo: () => import("../snipet/greencar/indexinfo"),
        CheckInfo: () => import("../snipet/greencar/checkinfo"),
        ChargeInfo: () => import("../snipet/greencar/chargeinfo"),
        ImageInfo: () => import("../snipet/greencar/imageinfo"),
        TimelineInfo: () => import("../snipet/greencar/timelineinfo"),
        LabelInfo: () => import("../snipet/greencar/labelinfo"),
        textareaInfo: () => import("../snipet/greencar/textareainfo"),
        ButtonInfo: () => import("../snipet/greencar/buttoninfo")
    },
    computed: {
        ...mapState({
            alurl: state => state.alurl
        })
    },
    methods: {
        ...mapActions({
            commitInspectionManagementVehicle:
                "commitInspectionManagementVehicle"
        }),
        // 设置审核意见
        setLabel(e) {
            this.verifyData.verifySuggestSelect = e
        },
        setVerifySuggest(e) {
            this.verifyData.verifySuggest = e
        },
        // 处理视频图片路径方法
        parsePictureVideoUrl(data, src, prefix) {
            if (!data) return
            let url = []
            for (let i = 1; i < src.length; i++) {
                if (!data[src[i]]) continue
                url = url.concat(data[src[i]].split(";"))
            }
            if (data[src[0]] === "1" && url.length > 0) {
                url = url.map(item => prefix + item)
            }
            if (data[src[0]] === "2" && url.length > 0) {
                url = url.map(item =>
                    item.slice(item.length - 4, item.length) === ".mp4"
                        ? prefix + item + "?sign=" + data.sign
                        : prefix + item + "!sl?sign=" + data.sign
                )
            }
            return url
        },
        parseTimeLine(data) {
            const arr = []
            // 获取审核时间轴信息
            arr.push({
                // 人名
                name: data.checkorName,
                // 角色
                role: "查验员",
                // 查验时间
                checktime: data.checkTime,
                // 审核状态名称
                verifyStatusName: data.isGcTrunckName,
                // 审核意见
                isGcTrunckName: "",
                // 意见描述
                verifySuggest: ""
            })

            for (let j = 0; j < data.verifySuggestList.length; j++) {
                arr.push({
                    // 人名
                    name: data.verifySuggestList[j].verifyOperatorName,
                    // 角色
                    role: data.verifySuggestList[j].roleName,
                    // 查验时间
                    checktime: data.verifySuggestList[j].verifyTime,
                    // 审核状态名称
                    verifyStatusName:
                        data.verifySuggestList[j].verifyStatusName,
                    // 审核意见
                    isGcTrunckName:
                        data.verifySuggestList[j].verifySuggestSelect,
                    // 意见描述
                    verifySuggest: data.verifySuggestList[j].verifySuggest
                })
            }
            return arr
        },
        // 提交审核数据
        summit(e) {
            if (e) {
                this.verifyData.verifyStatus = "3"
                this.commitInspectionManagementVehicle(this.verifyData).then(
                    res => {
                        if (res === "sucess") {
                            this.init()
                        }
                    }
                )
            } else {
                this.verifyData.verifyStatus = "2"
                this.commitInspectionManagementVehicle(this.verifyData).then(
                    res => {
                        if (res === "sucess") {
                            this.init()
                        }
                    }
                )
            }
        },
        init() {
            this.$emit("removeItem", this.verifyData.checkId)
            this.$refs.labelInit.init()
            this.$refs.textareaInit.init()
        }
    },
    destroyed() {},
    watch: {
        obj: {
            handler: function(v) {
                this.verifyData.checkId = v.checkId
                this.pictureList = this.parsePictureVideoUrl(
                    this.obj,
                    this.picture_video_src,
                    this.alurl
                )
                this.timelineList = this.parseTimeLine(this.obj)
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style scoped></style>
