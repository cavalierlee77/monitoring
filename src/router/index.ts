import Vue from 'vue'
import VueRouter from 'vue-router'
import r from './registercomponents'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: r.Login
    },
    {
        path: '/main',
        name: 'Main',
        component: r.Main,
        children: []
    }
]

const router = new VueRouter({
    routes
})

export default router
