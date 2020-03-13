const Login = () => import(/* webpackChunkName: "entryApp" */ '../components/pages/Login.vue')
const Main = () => import(/* webpackChunkName: "entryApp" */ '../components/pages/Main.vue')

export default {
	Login,
	Main
}
