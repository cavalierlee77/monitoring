<template>
    <div class="mgt-layout">
        <el-dialog
            title="用户管理"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
        >
            <div>
                <el-form ref="form" label-width="100px">
                    <div class="row">
                        <div class="col-12">
                            <el-form-item label="用户编号">
                                <el-input
                                    v-model="form.loginId"
                                    placeholder="用户编号"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <el-form-item label="用户密码">
                                <el-input
                                    v-model="form.password"
                                    type="password"
                                    placeholder="用户密码"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <el-form-item label="用户姓名">
                                <el-input
                                    v-model="form.userName"
                                    placeholder="用户姓名"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <el-form-item label="用户机构">
                                <el-select
                                    v-model="form.orgId"
                                    placeholder="用户机构"
                                >
                                    <el-option
                                        v-for="item in BranchOfficeOrgidList"
                                        :key="item.orgId"
                                        :label="item.orgName"
                                        :value="item.orgId"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <el-form-item label="用户角色">
                                <el-select
                                    v-model="form.roleId"
                                    placeholder="用户角色"
                                >
                                    <el-option
                                        v-for="item in BranchOfficeRoleList"
                                        :key="item.roleId"
                                        :label="item.roleName"
                                        :value="item.roleId"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="summit">确 定</el-button>
            </span>
        </el-dialog>
        <el-button @click="add">+添加用户</el-button>
        <el-table fixed :data="bt" style="width: 100%" :height="height">
            <el-table-column fixed type="index" label="序号" />
            <el-table-column property="userId" label="用户账户" />
            <el-table-column property="orgName" label="所属机构" />
            <el-table-column property="userName" label="用户姓名" />
            <el-table-column property="roleName" label="岗位名称" />
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <base-pagination
            :page="page.currentPage"
            :total="page.total"
            :pageSize="page.pageSize"
            @changeSize="changeSize"
            @changeCurPage="changeCurPage"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
    name: "",
    components: {
        BasePagination: () =>
            import(
                /* webpackChunkName: "subcheck" */ "../../components/common/pagination/basepagination"
            )
    },
    data() {
        return {
            dialogVisible: false,
            form: {
                loginId: "",
                password: "",
                userName: "",
                orgId: "",
                roleId: ""
            }
        }
    },
    mounted() {
        this.$store.commit("setBranchOfficeUserManagementPage", 1)
        this.getBranchOfficeUserManagementList()
        this.getBranchOfficeRoleList()
        this.getBranchOfficeOrgidList()
    },
    computed: {
        ...mapState({
            bt: state =>
                state.BranchOfficeUserManagement
                    .BranchOfficeUserManagementDataList,
            height: state => state.common.layoutHgt - 42,
            page: state =>
                state.BranchOfficeUserManagement.BranchOfficeUserManagementPage,
            BranchOfficeRoleList: state =>
                state.BranchOfficeUserManagement.BranchOfficeRoleList,
            BranchOfficeOrgidList: state =>
                state.BranchOfficeUserManagement.BranchOfficeOrgidList
        })
    },
    methods: {
        ...mapActions({
            getBranchOfficeUserManagementList:
                "getBranchOfficeUserManagementList",
            getBranchOfficeRoleList: "getBranchOfficeRoleList",
            getBranchOfficeOrgidList: "getBranchOfficeOrgidList",
            commitUserInfo: "commitUserInfo"
        }),
        handleEdit(i, r) {
            this.modify(r)
        },
        changeSize(e) {
            this.$store.commit("setBranchOfficeUserManagementPageSize", e)
            this.getBranchOfficeUserManagementList()
        },
        changeCurPage(e) {
            this.$store.commit("setBranchOfficeUserManagementPage", e)
            this.getBranchOfficeUserManagementList()
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        add() {
            this.dialogVisible = true
            this.flag = "add"
            Object.keys(this.form).forEach(i => {
                this.form[i] = ""
            })
        },
        modify(e) {
            this.dialogVisible = true
            Object.keys(this.form).forEach(i => {
                this.form[i] = e[i]
            })
            this.flag = "modify"
        },
        summit() {
            const self = this
            this.commitUserInfo({ flag: this.flag, data: this.form }).then(
                () => {
                    self.dialogVisible = false
                }
            )
        }
    }
}
</script>

<style scoped>
.mgt-layout {
    background-color: #fff;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
}
</style>
