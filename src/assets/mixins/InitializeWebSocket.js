import { mapState } from "vuex"
const InitializeWebSocket = {
    data() {
        return {
            socketMsg: {}
        }
    },
    computed: {
        ...mapState({
            isConnected: state => state.commonTools.socket.isConnected
        })
    },
    methods: {
        initializeWebSocket() {
            // 监听socket
            this.$options.sockets.onmessage = res => {
                // console.log(res)
                // res.data为服务端返回的数据
                const data = JSON.parse(res.data)
                this.socketMsg = { ...data }
            }
        },
        // 处理socket数据
        remixSocketMsg(val) {
            if (val.webInfoType) {
                if (val.webInfoType === "statusDataReturn") {
                    this.$store.commit("setStatusInfos", val.devVarInfoList)
                }
                if (val.webInfoType === "devCtrReturn") {
                    this.$store.dispatch("postPlaylist")
                }
            }
        },
        checkIsConnected() {
            if (this.isConnected === true) {
                this.$socket.send("getDevVarInfo")
                // this.$socket.sendObj({ getDevVarInfo: "getDevVarInfo" })
            }
        }
    },
    mounted() {
        this.initializeWebSocket()
    },
    watch: {
        socketMsg: {
            handler(val) {
                this.remixSocketMsg(val)
            },
            immediate: true,
            deep: true
        },
        isConnected: {
            handler(val) {
                this.checkIsConnected()
            },
            immediate: true
        }
    }
}

export { InitializeWebSocket }
