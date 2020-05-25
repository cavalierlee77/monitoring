// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index.js"
import "../static/js/common.js"

Vue.config.productionTip = false

export const that = new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
})
