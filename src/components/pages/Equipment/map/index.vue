<template>
    <div>
        <div id="map" :style="{ height: FrameHeight }"></div>
        <div id="mouse-position"></div>
        <div id="popup" class="ol-popup">
            <!-- <a href="#" id="popup-closer" class="ol-popup-closer"></a> -->
            <div id="popup-content"></div>
        </div>
        <!-- <div id="mouse-position"></div> -->
        <div class="query-outwrap">
            <query-box
                :width="502"
                :resultArr="resultArr"
                @pressKeyFn="pressKeyFn"
                @clearFn="clearFn"
                :defaultText="defaultText"
                @queryMouseover="queryMouseover"
                :needClearBtn="oldClickMapId !== ''"
            ></query-box>
        </div>
        <div class="result-outwrap" v-if="mapId !== ''">
            <cms-window :cmsId="mapId"></cms-window>
        </div>
    </div>
</template>
<script>
import "ol/ol.css"
import { Map, View, Overlay } from "ol"
import TileLayer from "ol/layer/Tile"
import XYZ from "ol/source/XYZ"

import Feature from "ol/Feature"
import { Icon, Style } from "ol/style"
import VectorSource from "ol/source/Vector"
import { Vector as VectorLayer } from "ol/layer"
import Point from "ol/geom/Point"
import { toStringXY } from "ol/coordinate"

// import { toStringXY, createStringXY } from "ol/coordinate"
// import { defaults as defaultControls } from "ol/control"
// import MousePosition from "ol/control/MousePosition"
// import Select from "ol/interaction/Select"
import proxy from "@/store/constant/clouldConfig"
import { mapState } from "vuex"

import { InitializeWebSocket } from "@/assets/mixins/InitializeWebSocket.js"
import { ConnectWebSocket } from "@/assets/mixins/ConnectWebSocket.js"
import { CheckBoxMixins } from "@/assets/mixins/CheckBox.js"
export default {
    name: "",
    mixins: [ConnectWebSocket, CheckBoxMixins, InitializeWebSocket],
    components: {
        QueryBox: () =>
            import(
                /* webpackChunkName: "cms" */ "@pages/_fragments/querybox.vue"
            ),
        CmsWindow: () =>
            import(/* webpackchunkName: "cms" */ "@pages/_fragments/cms")
    },
    data() {
        return {
            iconImagePath: proxy.mapImagePath[proxy.pattern]
                ? proxy.mapImagePath[proxy.pattern]
                : window.config_.mapImagePath,
            iconImage: "/icon.png",
            iconImageHover: "/icon-hover.png",
            mapXYZ: "offlineMapTiles/{z}/{x}/{y}.png",
            FrameHeight: "",
            map: "",
            vectorSource: "",
            resultArr: [],
            mapId: "",
            longitudeCorrected: -0.0062,
            latitudeCorrected: -0.0062,
            checkInput: "",
            defaultText: "",
            iconFeatureArr: [],
            FeatureMap: {},
            oldMapId: "",
            oldClickMapId: ""
        }
    },
    computed: {
        ...mapState({
            devInfoList: state => state.cms.devInfoList,
            devMap: state => state.cms.devMap,
            statusMap: state => state.cms.statusMap,
            latestMapId: state => state.cms.latestMapId,
            latestCheckInput: state => state.cms.latestCheckInput,
            devInfoListReady: state => state.cms.devInfoListReady
        })
    },
    methods: {
        getFreamHeight() {
            const clientHeight = `${document.documentElement.clientHeight}`
            const headerHeight = document.querySelector(".el-header").style
                .height
            this.FrameHeight =
                parseFloat(clientHeight) - parseFloat(headerHeight) + "px"
        },
        getBasicInfos() {
            // 获取字典表
            this.$store.dispatch("getDirections")
            // 获取情报板基本信息
            this.$store.dispatch("postDevInfo")
            // 获取情报板播放表
            this.$store.dispatch("postPlaylist")
        },
        createFeature(point) {
            var feature = new Feature({
                geometry: point,
                population: 4000,
                rainfall: 500
            })
            return feature
        },
        createMapView() {
            this.vectorSource = new VectorSource({
                features: []
            })

            var vectorLayer = new VectorLayer({
                source: this.vectorSource
            })
            var container = document.querySelector("#popup")
            var content = document.querySelector("#popup-content")
            var overlay = new Overlay({
                element: container,
                autoPan: false,
                autoPanAnimation: {
                    duration: 250
                }
            })
            this.map = new Map({
                target: "map",
                layers: [
                    new TileLayer({
                        source: new XYZ({
                            url: this.iconImagePath + this.mapXYZ
                        })
                    }),
                    vectorLayer
                ],
                overlays: [overlay],
                view: new View({
                    center: [118.8890838, 42.4715848],
                    // projection: "EPSG:3857", // 默认
                    projection: "EPSG:4326",
                    zoom: 10,
                    minZoom: 9,
                    maxZoom: 14,
                    extent: [
                        116.42200533463954,
                        41.071560631253153,
                        121.70645117187501,
                        44.04065543651788
                    ]
                })
            })
            const map = this.map
            const _this = this
            map.addEventListener("click", function(evt) {
                var feature = map.forEachFeatureAtPixel(evt.pixel, function(
                    feature
                ) {
                    return feature
                })
                if (feature) {
                    var coordinate = feature.getGeometry().getCoordinates()
                    var hdms = toStringXY(coordinate, 4)
                    var obj = feature.getProperties()
                    _this.clickPoint(obj, hdms)
                    content.innerHTML = "<p>" + obj.stationInfo + "</p>"
                    overlay.setPosition(coordinate)
                    _this.resetOldFeatureStyle("oldClickMapId")
                    _this.oldClickMapId = feature.values_.id
                    _this.setIconImage(feature, "Hover")
                } else {
                    overlay.setPosition(undefined)
                }
            })
            map.addEventListener("pointermove", function(evt) {
                var feature = map.forEachFeatureAtPixel(evt.pixel, function(
                    feature
                ) {
                    return feature
                })
                if (feature) {
                    var coordinate = feature.getGeometry().getCoordinates()
                    var obj = feature.getProperties()
                    content.innerHTML = "<p>" + obj.stationInfo + "</p>"
                    overlay.setPosition(coordinate)
                    if (_this.oldMapId !== _this.oldClickMapId)
                        _this.resetOldFeatureStyle()
                    _this.oldMapId = feature.values_.id
                    _this.setIconImage(feature, "Hover")
                } else {
                    if (_this.oldMapId !== _this.oldClickMapId) {
                        _this.resetOldFeatureStyle()
                    }
                    overlay.setPosition(undefined)
                }
            })
        },
        clickPoint(...positions) {
            const featureProperties = positions[0]
            this.mapId = featureProperties.id
        },
        createMapIcon() {
            const icon = new Style({
                image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: "fraction",
                    anchorYUnits: "pixels",
                    src: this.iconImagePath + this.iconImage
                })
            })
            return icon
        },
        createIconFeature(point = [118.8836838, 42.2546848], properties = {}) {
            const iconStyle = this.createMapIcon()
            const iconFeature = this.createFeature(new Point(point))
            if (Object.keys(properties).length > 0) {
                Object.entries(properties).map(([k, v]) => {
                    iconFeature.setProperties({ [k]: v }, true)
                })
            }
            iconFeature.setStyle(iconStyle)
            return iconFeature
        },
        setMapPoints(list) {
            let infoList = []
            if (!list) {
                infoList = [...this.devInfoList]
            } else {
                list.map(dev => dev.id).forEach(mapid => {
                    infoList.push(this.devMap[mapid])
                })
            }
            infoList.forEach(dev => {
                const iconFeature = this.createIconFeature(
                    [
                        dev.longitude + this.longitudeCorrected,
                        dev.latitude + this.latitudeCorrected
                    ],
                    {
                        id: dev.mapId,
                        stationInfo: dev.stationInfo
                    }
                )
                if (this.vectorSource) {
                    this.vectorSource.addFeature(iconFeature)
                }
                this.iconFeatureArr.push(iconFeature)
                this.$set(this.FeatureMap, dev.mapId, iconFeature)
            })
        },
        pressKeyFn(res) {
            const type = typeof res
            if (type === "object") {
                Object.entries(res).forEach(([k, v]) => {
                    if (k === "clickList") {
                        this.clickList(v)
                    }
                    if (k === "inputModel") {
                        this.checkInput = v
                    }
                })
            }
            if (type === "string") {
                this.selectFunc(res)
            }
        },
        queryMouseover(res) {
            this.resetOldFeatureStyle()
            this.oldMapId = res.devId
            if (res.devId !== "" && this.FeatureMap[res.devId]) {
                this.setIconImage(this.FeatureMap[res.devId], "Hover")
            }
        },
        resetOldFeatureStyle(str) {
            const idKey = str || "oldMapId"
            if (this[idKey] !== "" && this.FeatureMap[this[idKey]]) {
                this.setIconImage(this.FeatureMap[this[idKey]])
            }
        },
        setIconImage(feature, hover = "", status = "") {
            const _this = this
            feature.setStyle(
                new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: _this.iconImagePath + _this["iconImage" + hover]
                    })
                })
            )
        },
        clearFn() {
            this.mapId = ""
            this.oldMapId = ""
            this.oldClickMapId = ""
            this.FeatureMap = {}
            this.$store.commit("setLatestMapId", "")
            this.$store.commit("setLatestCheckInput", "")
            this.setMapPoints()
            this.resetOldFeatureStyle()
        },
        clickList(dev) {
            this.$store.commit("setCmsId", dev.id)
            this.mapId = dev.id
            this.oldClickMapId = dev.id
        },
        selectFunc(str) {
            this.resultArr = []
            if (str !== "") {
                this.resultArr = []
                this.devInfoList.forEach(dev => {
                    if (dev.deviceName.includes(str)) {
                        this.resultArr.push({
                            show: dev.deviceName,
                            id: dev.mapId
                        })
                    }
                })
            } else if (str === "") {
                this.clearFn()
            }
            if (this.resultArr.length > 0) {
                if (this.vectorSource) {
                    this.vectorSource.clear()
                }
                this.setMapPoints(this.resultArr)
            }
        },
        setOldClickPoint() {
            this.oldClickMapId = this.mapId
            this.setIconImage(this.FeatureMap[this.oldClickMapId], "Hover")
        },
        loadMapPoints() {
            setTimeout(() => {
                this.createMapView()
                this.setMapPoints()
                if (this.latestMapId) {
                    this.setOldClickPoint()
                }
            }, 0)
        }
    },
    created() {
        this.$store.commit("setTillNowPage", "map")
        if (this.latestMapId) {
            this.mapId = this.latestMapId
        }
        if (this.latestCheckInput) {
            this.defaultText = this.latestCheckInput
        }
    },
    mounted() {
        this.getFreamHeight()
    },
    beforeDestroy() {
        if (this.mapId !== "") {
            this.$store.commit("setLatestMapId", this.mapId)
        }
        if (this.checkInput !== "") {
            this.$store.commit("setLatestCheckInput", this.checkInput)
        }
    },
    watch: {
        devInfoList: {
            handler(val) {
                if (val.length > 0) {
                    this.loadMapPoints()
                }
                if (val.length === 0) {
                    this.getBasicInfos()
                }
            },
            immediate: true,
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/Equipment/cms/_css/button.scss";
@import "@pages/Equipment/cms/_css/buttonIcon.scss";
@import "@pages/Equipment/cms/_css/commonStyle.scss";
@import "@pages/Equipment/cms/_css/query.scss";
.query-outwrap {
    position: absolute;
    top: 32px;
    left: 56px;
    z-index: 1999;
}

.result-outwrap {
    position: absolute;
    top: 70px;
    left: 56px;
    z-index: 1998;
    width: auto;
    .wrap-cms {
        margin: 0;
        width: 500px;
    }
}
#map {
    width: 100%;
}

.ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 42px;
    left: -50px;
    min-width: 200px;
    text-align: center;
}
.ol-popup:after,
.ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}
.ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}
.ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}
.ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
}
.ol-popup-closer:after {
    content: "✖";
}
</style>
