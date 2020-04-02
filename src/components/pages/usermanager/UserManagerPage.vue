<template>
  <div class="userLayout" :style="{ height: height + 'px' }">
    <header>
      <el-button size="medium" @click="addUser" class="addbtn">
        + 添加用户
      </el-button>
    </header>
    <div>
      <div v-show="isShowDetail" class="table-wraper">
        <el-table
          ref="userTable"
          :height="height - 115"
          :data="users"
          border
          style="width: 100%;flex:1"
        >
          <el-table-column label="用户账号" prop="userId"> </el-table-column>
          <el-table-column label="所属机构" prop="orgName"> </el-table-column>
          <el-table-column label="用户姓名" prop="userName"> </el-table-column>
          <el-table-column label="岗位名称" prop="roleName"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="onEditUserClick(scope.row)"
                >编辑</el-button
              >
              <!-- <el-button
                size="mini"
                type="danger"
                @click="onDeleteUser(scope.row)"
                >删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="isShowDetail" class="footer">
        <el-pagination
          v-show="isShowPager"
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
          style="display:flex"
          :current-page="pageIndex"
          :page-sizes="[10, 25, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRows"
        >
        </el-pagination>
      </div>
      <add-user-page
        :edit-user-key="editUserKey"
        :org="org"
        :userRole="userRole"
        :is-edit="isEdit"
        v-on:cancel="userCancel"
        v-on:submit="submit"
        v-if="!isShowDetail"
      ></add-user-page>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    AddUserPage: () =>
      import(
        /* webpackChunkName: "usermanager" */ "./usermanagerpage/AddUserPage"
      )
  },
  data() {
    return {
      users: [],
      org: [],
      userRole: [],
      isShowDetail: true,
      pageSize: 10,
      totalRows: 0,
      pageIndex: 1,
      tableHeight: 200,
      isShowPager: true,
      isEdit: true,
      editUserKey: {}
    };
  },
  computed: {
    ...mapState({
      height: state => state.common.layoutHgt + 74
    })
  },
  methods: {
    addUser() {
      this.isShowDetail = false;
      this.isEdit = false;
      this.getOrgRole();
    },
    userCancel() {
      this.isShowDetail = true;
    },
    onEditUserClick(row) {
      this.getOrgRole();
      this.editUserKey = row;
      this.isShowDetail = false;
      this.isEdit = true;
    },
    onSizeChange(size) {
      this.pageSize = size;
      this._queryUses(1);
    },
    onCurrentChange(index) {
      this.pageIndex = index;
      this._queryUses(this.pageIndex);
    },
    onDeleteUser(user) {
      // this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //   .then(() => {
      //     let url = "user/deleteUser/" + user.userkeyid;
      //     let encodeUrl = encodeURI(url);
      //     this.$api.get(
      //       url,
      //       null,
      //       res => {
      //         this.$message({
      //           type: "success",
      //           message: "删除成功!"
      //         });
      //         this._queryUses(1);
      //       },
      //       () => {
      //         this.$message({
      //           type: "info",
      //           message: "删除失败!"
      //         });
      //       }
      //     );
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除"
      //     });
      //   });
    },
    submit() {
      this.isShowDetail = true;
      this._queryUses(this.pageIndex);
    },
    _queryUses(pageIndex) {
      var param = {
        currentPage: pageIndex,
        pageSize: this.pageSize
      };

      this.$api.post(
        "user/getAllUsers",
        param,
        res => {
          if (res.page == null) {
            this.isShowPager = false;
          } else {
            this.totalRows = res.page.rows;
            this.isShowPager = true;
          }
          if (res.resultData == null) {
            this.users = [];
            return;
          }
          this.users = res.resultData;
        },
        () => {
          this.users = [];
          this.isShowPager = false;
        }
      );
    },
    getOrgRole() {
      var jsondata = {};
      this.$api.post(
        "comm/getAllOrg",
        jsondata,
        res => {
          if (res.resultData == null) {
            this.org = [];
            return;
          }
          this.org = res.resultData;
        },
        () => {
          this.org = [];
        }
      );
      this.$api.post(
        "comm/getAllRole",
        jsondata,
        res => {
          if (res.resultData == null) {
            this.userRole = [];
            return;
          }
          this.userRole = res.resultData;
        },
        () => {
          this.userRole = [];
        }
      );
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    // var h = parseInt($(".table-wraper").height());
    // console.log(">>>" + h);
    // this.tableHeight = h;
    this._queryUses(1);
  }
};
</script>

<style scoped>
header {
  font-size: 14px;
  font-weight: 700;
  color: "#66666";
  height: 50px;
  border-bottom: 1px solid #ebeef5;
  text-align: left;
  box-sizing: border-box;
}
header span {
  margin: 0;
  padding: 0;
}
.userLayout {
  background-color: #fff;
  padding: 10px;
  height: 100%;
}
.addbtn {
  float: left;
}
.table-wraper {
  display: flex;
  flex: 1;
  padding: 10px;
}

.footer {
  display: flex;
  flex-basis: 50px;
  float: right;
}

.el-pagination {
  margin: 10px;
}

* {
  font-size: 14px;
}
</style>
