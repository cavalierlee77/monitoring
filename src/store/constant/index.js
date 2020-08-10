export default {
    leftMenus: [
        {
            title: "情报板管理",
            hasChild: true,
            imgClass: "el-icon-edit-outline",
            hot: true,
            child: [
                {
                    title: "情报板展示",
                    hasChild: false,
                    index: "main/cms/cms",
                    imgClass: "",
                    hot: true
                },
                {
                    title: "情报板地图",
                    hasChild: false,
                    index: "main/cms/map",
                    imgClass: "",
                    hot: true
                },
                {
                    title: "模板管理",
                    hasChild: false,
                    index: "main/cmsModel",
                    imgClass: "",
                    hot: false
                }
            ]
        }
    ]
}
