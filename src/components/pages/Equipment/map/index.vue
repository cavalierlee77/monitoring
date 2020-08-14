<template>
    <div>
        <div id="map" :height="{ FrameHeight }"></div>
        <div id="popup" class="ol-popup">
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content"></div>
        </div>
        <div id="mouse-position"></div>
        <button id="btn">click</button>
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
import { createStringXY, toStringXY } from "ol/coordinate"
import { defaults as defaultControls } from "ol/control"
import MousePosition from "ol/control/MousePosition"

import proxy from "@/store/constant/clouldConfig"

export default {
    components: {},
    data() {
        return {
            iconImage: proxy.mapImagePath[proxy.pattern] + "icon.png",
            mapXYZ:
                proxy.mapImagePath[proxy.pattern] +
                "offlineMapTiles/{z}/{x}/{y}.png"
        }
    },
    computed: {},
    watch: {},
    methods: {
        createFeature(point) {
            var feature = new Feature({
                // geometry:new Point(transform([116.39128380,39.90708480],'EPSG:4326', 'EPSG:3857')),
                // geometry:new Point([116.39128380,39.90708480]),
                geometry: point,
                name: "Null Island",
                population: 4000,
                rainfall: 500
            })
            return feature
        }
    },
    created() {},
    mounted() {
        var iconFeature = this.createFeature(
            new Point([116.3912838, 39.9070848])
        )

        iconFeature.setProperties({ id: 123 }, true)
        iconFeature.setProperties({ name: "liufeng" }, true)

        var iconStyle = new Style({
            image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: "fraction",
                anchorYUnits: "pixels",
                src: this.iconImage
            })
        })
        iconFeature.setStyle(iconStyle)
        var vectorSource = new VectorSource({
            features: [iconFeature]
        })

        var vectorLayer = new VectorLayer({
            source: vectorSource
        })
        var container = document.querySelector("#popup")
        var content = document.querySelector("#popup-content")
        var btn = document.querySelector("#btn")
        console.log(container)
        var overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        })
        var mousePositionControl = new MousePosition({
            coordinateFormat: createStringXY(4),
            projection: "EPSG:4326",
            // comment the following two lines to have the mouse position
            // be placed within the map.
            className: "custom-mouse-position",
            target: document.getElementById("mouse-position"),
            undefinedHTML: "&nbsp;"
        })
        const map = new Map({
            controls: defaultControls().extend([mousePositionControl]),
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
                // center: transform([116.39128380,39.90708480],'EPSG:4326', 'EPSG:3857'),
                center: [118.8890838, 42.4715848],
                // projection: "EPSG:3857", // 默认
                projection: "EPSG:4326",
                zoom: 8
            })
        })
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
        btn.onclick = function() {
            var view = map.getView()
            view.setCenter([115.4, 39.9070848])
            var feature2 = this.createFeature(new Point([115.4, 39.9070848]))
            feature2.setStyle(iconStyle)
            vectorSource.addFeature(feature2)
            return false
        }

        /**
         * Create an overlay to anchor the popup to the map.
         */
    },
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {}
}
</script>
<style lang="scss" scoped>
#map {
    width: 100%;
    height: 600px;
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
