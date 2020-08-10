const LoginPage = () =>
    import(/* webpackChunkName: "entryapp" */ "@/components/pages/LoginPage")
const MainPage = () =>
    import(/* webpackChunkName: "entryapp" */ "@/components/pages/MainPage")
const Cms = () =>
    import(
        /* webpackChunkName: "entryapp" */ "@/components/pages/Equipment/cms"
    )
const DevMap = () =>
    import(
        /* webpackChunkName: "entryapp" */ "@/components/pages/Equipment/map"
    )

export default {
    LoginPage,
    MainPage,
    Cms,
    DevMap
}
