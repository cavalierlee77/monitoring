const LoginPage = () =>
    import(/* webpackChunkName: "entryapp" */ "@/components/pages/LoginPage")
const MainPage = () =>
    import(/* webpackChunkName: "entryapp" */ "@/components/pages/MainPage")
const Cms = () =>
    import(/* webpackChunkName: "Cms" */ "@/components/pages/cms/index")
const CmsModel = () =>
    import(
        /* webpackChunkName: "Cms" */ "@/components/pages/cms/_template/_box/cmsModel"
    )
export default {
    LoginPage,
    MainPage,
    Cms,
    CmsModel
}
