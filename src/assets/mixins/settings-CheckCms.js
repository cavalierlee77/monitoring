import { mapState } from "vuex"
const CheckCmsMixins = {
    data() {
        return {
            CheckCmsTitle: "情报板文字位置校准"
        }
    },
    computed: {
        ...mapState({
            cmsList: state => state.cms.cmsList,
            devMap: state => state.cms.devMap,
            cmsMap: state => state.cms.cmsMap,
            statusDescMap: state => state.cms.statusDescMap
        }),
        userId: () => JSON.parse(window.localStorage.getItem("users")).userId
    },
    methods: {
        CheckCmsFn() {
            let sendIdArr = ""
            this.cmsList.forEach(id => {
                let sendData = {}
                if (this.statusDescMap[id].statusFlag === true) {
                    sendIdArr +=
                        this.devMap[id].stationInfo +
                        "(" +
                        id.split("×")[1] +
                        ")/"
                    const dev = this.cmsMap[id]
                    const data = JSON.parse(dev.data)
                    const playList = this.saveCmsTextChange(data)
                    sendData = {
                        useId: this.userId + "",
                        orgId: dev.orgId + "",
                        devId: dev.deviceId + "",
                        devVarTypeId: dev.deviceVarTypeId + "",
                        devVarValue: "",
                        playList: playList
                    }
                }
                this.$store.dispatch("postCmsInfos", [sendData])
            })
            alert(
                "校验完毕。校验设备id名单:\n\n" +
                    sendIdArr +
                    "\n\n请刷新页面验证！"
            )
        },

        getByteLen(val) {
            var len = 0
            for (var i = 0; i < val.length; i++) {
                var a = val.charAt(i)
                // eslint-disable-next-line no-control-regex
                if (a.match(/[^\x00-\xff]/gi) != null) {
                    len += 2
                } else {
                    len += 1
                }
            }
            return len
        },
        saveCmsTextChange(data) {
            const list = data.itemList
            const dx = data.dpw
            const dy = data.dph
            list.forEach(page => {
                const fs = page.fs
                page.wordList.forEach((word, index) => {
                    const txt = word.wc.replace(/(^\s*)|(\s*$)/g, "")
                    const len = this.getByteLen(txt)
                    word.wx = (parseInt(dx) - (len / 2) * parseInt(fs)) / 2
                    word.wy =
                        (parseInt(dy) / page.wordList.length - parseInt(fs)) /
                            2 +
                        (parseInt(dy) / page.wordList.length) * index
                    delete word.pstyle
                })
            })
            return data
        }
    }
}
export { CheckCmsMixins }
