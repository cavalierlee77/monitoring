import Vue from "vue"
import Router from "vue-router"
import r from "./registercomponents"

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

export default new Router({
    routes: [
        {
            path: "/",
            name: "LoginPage",
            component: r.LoginPage
        },
        {
            path: "/main",
            component: r.MainPage,
            children: [
                {
                    path: "equipment/cms",
                    component: r.Cms
                },
                {
                    path: "equipment/map",
                    component: r.DevMap
                }
            ]
        }
    ]
})
