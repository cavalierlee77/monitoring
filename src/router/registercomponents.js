const HistoryLayout = () =>
  import(/* webpackChunkName: "history" */ "@/components/pages/history/Layout");
const ReportPage = () =>
  import(
    /* webpackChunkName: "report" */ "@/components/pages/report/ReportPage"
  );
const UserManagerPage = () =>
  import(
    /* webpackChunkName: "usermanager" */ "@/components/pages/usermanager/UserManagerPage"
  );
const Maintenance = () =>
  import(
    /* webpackChunkName: "maintenance" */ "@/components/pages/maintenance/MaintenanceLayOut"
  );
// 添加线——————————————————————————————————————————————————————————————————————————————
const OperationFrame = () =>
  import(
    /* webpackChunkName: "operation" */ "@/components/pages/Operation/OperationFrame"
  );

// import wechat from '@/components/pages/wechat/layout'
// import wechatVechicle from '@/components/pages/wechat/layout/vechicleLayout'
// import wechatBill from '@/components/pages/wechat/layout/billLayout'

const LoginPage = () =>
  import(/* webpackChunkName: "entryapp" */ "@/components/pages/LoginPage");
const MainPage = () =>
  import(/* webpackChunkName: "entryapp" */ "@/components/pages/MainPage");
const CheckLayout = () =>
  import(/* webpackChunkName: "check" */ "@/components/pages/check/Layout");
const UnCheckTable = () =>
  import(
    /* webpackChunkName: "check" */ "@/components/pages/check/sublayout/uncheck"
  );
const NewCheckTable = () =>
  import(
    /* webpackChunkName: "check" */ "@/components/pages/check/sublayout/newcheck"
  );
const NewTollTable = () =>
  import(
    /* webpackChunkName: "check" */ "@/components/pages/check/sublayout/newtoll"
  );
const SubCheckLayout = () =>
  import(/* webpackChunkName: "check" */ "@/components/pages/subcheck/layOut");
const SubReport = () =>
  import(
    /* webpackChunkName: "subreport" */ "@/components/pages/subreport/SubReport"
  );
const SubHistoryLayout = () =>
  import(
    /* webpackChunkName: "subhistory" */ "@/components/pages/subhistory/Layout"
  );

const BranchOfficeInspectionManagement = () =>
  import(
    /* webpackChunkName: "BranchOfficeInspectionManagement" */ "@/views/check/index.vue"
  );
const BranchOfficeUserManagement = () =>
  import(
    /* webpackChunkName: "BranchOfficeUserManagement" */ "@/views/mgt/index.vue"
  );
const Enclosure = () =>
  import(
    /* webpackChunkName: "Enclosure" */ "@/components/pages/enclosure/index.vue"
  );
export default {
  HistoryLayout,
  ReportPage,
  UserManagerPage,
  Maintenance,
  OperationFrame,
  LoginPage,
  MainPage,
  CheckLayout,
  UnCheckTable,
  NewCheckTable,
  NewTollTable,
  SubCheckLayout,
  BranchOfficeInspectionManagement,
  BranchOfficeUserManagement,
  Enclosure,
  SubReport,
  SubHistoryLayout
};
