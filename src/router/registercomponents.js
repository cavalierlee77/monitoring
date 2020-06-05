const LoginPage = () =>
    import(/* webpackChunkName: "entryapp" */ "@/components/pages/LoginPage")
const MainPage = () =>
    import(/* webpackChunkName: "entryapp" */ "@/components/pages/MainPage")
const Cms = () =>
    import(/* webpackChunkName: "Cms" */ "@/components/pages/cms/index")

export default {
    LoginPage,
    MainPage,
    Cms
}
