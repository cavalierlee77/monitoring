<template>
    <div>
        <div id="map" :style="{ height: FrameHeight }"></div>
        <div id="popup" class="ol-popup">
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content"></div>
        </div>
        <div id="mouse-position"></div>
        <div class="query-outwrap">
            <query-box
                :width="400"
                :resultArr="resultArr"
                @pressKeyFn="pressKeyFn"
            ></query-box>
        </div>
        <div class="result-outwrap">
            <cms-window
                :dev="devMap[mid]"
                :status="statusMap[mid]"
                :cms="cmsMap[mid]"
            ></cms-window>
        </div>
    </div>
</template>
<script>
import "ol/ol.css"
import { Map, View, Overlay } from "ol"
import TileLayer from "ol/layer/Tile"
import XYZ from "ol/source/XYZ"
import { toLonLat } from "ol/proj"
import Feature from "ol/Feature"
import { Icon, Style } from "ol/style"
import VectorSource from "ol/source/Vector"
import { Vector as VectorLayer } from "ol/layer"
import Point from "ol/geom/Point"
import { toStringXY } from "ol/coordinate"
// import { defaults as defaultControls } from "ol/control"
// import MousePosition from "ol/control/MousePosition"

import proxy from "@/store/constant/clouldConfig"
import { setTimeout } from "timers"
import { mapState } from "vuex"

import { ConnectWebSocket } from "@/assets/mixins/ConnectWebSocket.js"
import { CheckBoxMixins } from "@/assets/mixins/CheckBox.js"
export default {
    name: "",
    mixins: [ConnectWebSocket, CheckBoxMixins],
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
            iconImage: proxy.mapImagePath[proxy.pattern] + "icon.png",
            mapXYZ:
                proxy.mapImagePath[proxy.pattern] +
                "offlineMapTiles/{z}/{x}/{y}.png",
            FrameHeight: "",
            map: "",
            vectorSource: "",
            resultArr: [],
            mid: ""
        }
    },
    computed: {
        ...mapState({
            devMap: state => state.cms.devMap,
            statusMap: state => state.cms.statusMap,
            cmsMap: state => state.cms.cmsMap,
            devInfoList: state => state.cms.devInfoList
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
                name: "Null Island",
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
                            url: this.mapXYZ
                        })
                    }),
                    vectorLayer
                ],
                overlays: [overlay],
                view: new View({
                    center: [118.8890838, 42.4715848],
                    // projection: "EPSG:3857", // 默认
                    projection: "EPSG:4326",
                    zoom: 10
                })
            })
            const map = this.map
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
                    console.log("source =" + coordinate)
                    console.log("toLonLat =" + toLonLat(coordinate))
                    content.innerHTML =
                        "<p>You clicked here:</p><code>" +
                        hdms +
                        ",id=" +
                        obj.id +
                        ",name=" +
                        obj.name +
                        "</code>"
                    overlay.setPosition(coordinate)
                } else {
                    overlay.setPosition(undefined)
                }
            })
        },
        createMapIcon() {
            const icon = new Style({
                image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: "fraction",
                    anchorYUnits: "pixels",
                    src: this.iconImage
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
        setMapPoints() {
            this.devInfoList.forEach(dev => {
                const iconFeature = this.createIconFeature(
                    [dev.longitude, dev.latitude],
                    {
                        id: dev.mapId
                    }
                )
                this.vectorSource.addFeature(iconFeature)
            })
        },
        pressKeyFn(res) {
            const type = typeof res
            if (type === "object") {
                Object.entries(res).forEach(([k, v]) => {
                    if (k === "clickList") {
                        this.clickList(v)
                    }
                })
            }
            if (type === "string") {
                this.selectFunc(res)
            }
        },
        clickList(dev) {
            this.$store.commit("setCmsId", dev.id)
            this.mid = dev.id
            // this.$store.commit("setDynamicLink", "detail")
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
            }
        }
    },
    mounted() {
        this.getFreamHeight()
        if (Object.keys(this.devInfoList).length === 0) {
            this.getBasicInfos()
        }
        setTimeout(() => {
            this.createMapView()
            this.setMapPoints()
        }, 0)
    }
}
</script>
<style lang="scss" scoped>
@import "@pages/Equipment/cms/_css/button.scss";
@import "@pages/Equipment/cms/_css/buttonIcon.scss";
@import "@pages/Equipment/cms/_css/commonStyle.scss";
@import "@pages/Equipment/cms/_css/query.scss";
.query-outwrap {
    position: fixed;
    top: 92px;
    left: 236px;
    z-index: 9999;
}
#map {
    width: 100%;
    // height: 600px;
}

.ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
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
