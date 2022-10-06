<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">首頁</li>
        <li class="breadcrumb-item active" aria-current="page">個人資料</li>
      </ol>
    </nav>
    <h2 class="page-title">編輯個人資料</h2>
    <Form
    v-if="isFieldVisible"
      class="divider mb-4"
      @submit="onEditProfileSubmit"
      :validation-schema="editProfileSchema"
    >
      <div class="input-group border-bottom-0 row g-0">
        <!-- 帳戶 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >帳戶</label
        >
        <div class="col-sm-10 p-2">
          <Field
            v-model="account"
            name="account"
            type="text"
            class="form-control"
            placeholder="請輸入帳戶"
          />
          <ErrorMessage name="account" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 姓名 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >姓名</label
        >
        <div class="col-sm-10 p-2">
          <Field
            v-model="name"
            name="name"
            type="text"
            class="form-control"
            placeholder="請輸入姓名"
          />
          <ErrorMessage name="name" class="error-message" />
        </div>
      </div>
      <div v-if="isManager" class="input-group border-bottom-0 row g-0">
        <!-- 操作權限 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >操作權限</label
        >
        <div class="col-sm-10 p-2">
          <button
            type="button"
            @click="showModal()"
            class="btn btn-primary btn-sm"
          >
            選擇操作權限
          </button>
          <Field
            v-model="selected_nodes"
            name="permission"
            type="text"
            class="form-control"
            placeholder="請輸入姓名"
            hidden
          />
          <ErrorMessage name="permission" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 單位 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >單位</label
        >
        <div class="col-sm-10 p-2">
          <SingleSelect
            id="select_unit"
            name="select_unit"
            v-model="unitId"
            :value="unitId"
            :options="units"
          />
          <ErrorMessage name="select_unit" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 角色 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >角色</label
        >
        <div class="col-sm-10 p-2">
          <SingleSelect
            id="select_role"
            name="select_role"
            v-model="roleId"
            :value="roleId"
            :options="roles"
          />
          <ErrorMessage name="select_role" class="error-message" />
        </div>
      </div>
      <div class="input-group row g-0">
        <!-- 備註 -->
        <label class="col-sm-2 input-group-text py-2 px-4">備註</label>
        <div class="col-sm-10 p-2">
          <Field
            v-model="comment"
            name="comment"
            type="text"
            class="form-control"
            placeholder="請輸入備註"
          />
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary btn-md w320 mt-4 mx-auto d-block"
      >
        確定
      </button>
    </Form>

    <h3 class="page-subtitle">重設密碼</h3>
    <Form
      class="divider mb-4"
      @submit="onResetPasswordSubmit"
      :validation-schema="resetPasswordSchema"
    >
      <div class="input-group border-bottom-0 row g-0">
        <!-- 原密碼 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >原密碼</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="oldPassword"
            type="password"
            class="form-control"
            placeholder="請輸入原密碼"
          />
          <ErrorMessage name="oldPassword" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 新密碼 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >新密碼</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="newPassword"
            type="password"
            class="form-control"
            placeholder="請輸入新密碼"
          />
          <ErrorMessage name="newPassword" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 確認新密碼 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >確認新密碼</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="confirmNewPassword"
            type="password"
            class="form-control"
            placeholder="請確認新密碼"
          />
          <ErrorMessage name="confirmNewPassword" class="error-message" />
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary btn-md w320 mt-4 mx-auto d-block"
      >
        確定
      </button>
    </Form>

    <Teleport to="body">
      <Modal
        v-if="isModalVisible"
        :showCancelBtn="false"
        @close="closeModal"
        @confirm="confirmModal"
      >
        <template #header> 操作權限 </template>
        <template #body>
          <TreeView
            :config="config"
            :nodes="nodes"
            @nodeChecked="nodeChecked"
            @nodeUnchecked="nodeUnchecked"
          />
        </template>
        <template #confirmBtn> 確定 </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script>
import { doGet } from "@/utilities/api";
import { Form, Field, ErrorMessage } from "vee-validate";
import SingleSelect from "@/components/SingleSelect.vue";
import TreeView from "@/components/TreeView.vue";
import Modal from "@/components/Modal.vue";
import * as converter from "@/utilities/converter";

export default {
  name: "Profile",
  components: { Form, Field, ErrorMessage, SingleSelect, TreeView, Modal },
  data() {
    const editProfileSchema = this.$yup.object({
      account: this.$yup.string().required(),
      name: this.$yup.string().required(),
      permission: this.$yup.array().arrayRequired(),
      select_unit: this.$yup.string().required(),
      select_role: this.$yup.string().required(),
    });

    const resetPasswordSchema = this.$yup.object({
      oldPassword: this.$yup.string().required(),
      newPassword: this.$yup.string().required(),
      confirmNewPassword: this.$yup
        .string()
        .oneOf([this.$yup.ref("newPassword"), null], "請重新輸入新密碼")
        .required(),
    });

    return {
      isFieldVisible: false,
      // validation
      editProfileSchema,
      resetPasswordSchema,
      // datas
      account: "",
      name: "",
      roleId: "",
      unitId: "",
      comment: "",
      isManager: false,
      units: [],
      roles: [],
      isModalVisible: false,
      //treeview
      nodes: {},
      config: {
        roots: ["-1"],
        checkboxes: true,
        checkMode: 0,
      },
      selected_nodes: [],
    };
  },
  created() {
    this.getInitData();
  },
  methods: {
    getInitData() {
      const editProfileReq = this.getEditProfileData();
      const sourceDataReq = this.getSourceData();
      Promise.all([editProfileReq, sourceDataReq]).then((responses) => {
        const editProfileResp = responses[0];
        this.setEditProfileData(editProfileResp);
        const sourceDataResp = responses[1];
        this.setSourceData(sourceDataResp);
      });
    },
    setEditProfileData(editProfileResp) {
      if (editProfileResp.status == 200) {
        if (editProfileResp.data.ok) {
          var data = editProfileResp.data.model;

          this.account = data.account;
          this.name = data.name;
          this.roleId = data.roleId.toString();
          this.unitId = data.unitId.toString();
          this.comment = data.comment;
          this.isManager = data.isManager;
          this.selected_nodes = JSON.parse(data.permissionIdList);

          this.isFieldVisible = true;
        } else {
          this.$router.push({ name: "Error500" });
        }
      } else {
        this.$router.push({ name: "Error500" });
      }
    },
    setSourceData(sourceDataResp) {
      if (sourceDataResp.status == 200) {
        if (sourceDataResp.data.ok) {
          var model = sourceDataResp.data.model;
          this.roles = converter.keyPairStrToArray(model.roleList);
          this.units = converter.keyPairStrToArray(model.unitList);
          var nodeData = JSON.parse(model.operationPermissionList);
          for (const [key, value] of Object.entries(nodeData)) {
            if (this.selected_nodes.includes(parseInt(key))) {
              value.state.checked = true;
            } else if (parseInt(key) == -1 && this.selected_nodes.length > 0) {
              value.state.checked = true;
            }
            value.state.opened = true;
          }

          this.nodes = nodeData;
        } else {
          this.$router.push({ name: "Error500" });
        }
      } else {
        this.$router.push({ name: "Error500" });
      }
    },
    getEditProfileData() {
      return new Promise((resolve, reject) => {
        doGet("/Profile/EditProfile")
          .then((response) => resolve(response))
          .catch(() => reject);
      });
    },
    getSourceData() {
      return new Promise((resolve, reject) => {
        doGet("/Common/GetAddUserInitData")
          .then((response) => resolve(response))
          .catch(() => reject);
      });
    },
    nodeChecked(val) {
      console.log("checked", val);
      // 若非聯動勾選則需使用下方程式碼
      // this.selected_nodes.push(parseInt(val.id));
    },
    nodeUnchecked(val) {
      console.log("unchecked", val);
      // 若非聯動勾選則需使用下方程式碼
      // var index = this.selected_nodes.indexOf(parseInt(val.id));
      // this.selected_nodes.splice(index, 1);
    },
    onEditProfileSubmit(values) {
      console.log("basic", values);
    },
    onResetPasswordSubmit(values) {
      console.log("pwd", values);
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    confirmModal() {
      this.isModalVisible = false;
      for (const [key, value] of Object.entries(this.nodes)) {
        var keyValue = parseInt(key);
        if (
          (value.state.checked == true || value.state.indeterminate == true) &&
          keyValue != -1
        ) {
          if (!this.selected_nodes.includes(keyValue)) {
            this.selected_nodes.push(keyValue);
          }
        } else {
          if (this.selected_nodes.includes(keyValue)) {
            var index = this.selected_nodes.indexOf(keyValue);
            this.selected_nodes.splice(index, 1);
          }
        }
      }
    },
  },
};
</script>