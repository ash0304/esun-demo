<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">首頁</li>
        <li class="breadcrumb-item">帳戶管理</li>
        <li class="breadcrumb-item">角色管理</li>
        <li class="breadcrumb-item active" aria-current="page">編輯角色</li>
      </ol>
    </nav>
    <h2 class="page-title">編輯角色</h2>
    <Form class="mb-4" @submit="onSubmit" :validation-schema="schema">
      <div class="input-group border-bottom-0 row g-0">
        <!-- 姓名 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >姓名</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="name"
            type="text"
            class="form-control"
            placeholder="請輸入姓名"
            v-model="name"
          />
          <ErrorMessage name="name" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 影像掃描器權限 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >影像掃描器權限</label
        >
        <div class="col-sm-10 p-2">
          <MultiSelect
            v-if="isFieldVisible"
            name="viewerPermissionIdList"
            :options="viewerPermissions"
            :value="viewerPermissionIds"
            v-model="viewerPermissionIds"
          />
          <ErrorMessage name="viewerPermissionIdList" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 網站權限 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >網站權限</label
        >
        <div class="col-sm-10 p-2">
          <MultiSelect
            v-if="isFieldVisible"
            name="webPermissionIdList"
            :options="webPermissions"
            :value="webPermissionIds"
            v-model="webPermissionIds"
          />
          <ErrorMessage name="webPermissionIdList" class="error-message" />
        </div>
      </div>
      <div class="input-group row g-0">
        <!-- 備註 -->
        <label class="col-sm-2 input-group-text py-2 px-4">備註</label>
        <div class="col-sm-10 p-2">
          <Field
            name="comment"
            type="text"
            class="form-control"
            placeholder="請輸入備註"
            v-model="comment"
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
    <Teleport to="body">
      <Modal v-if="showErrorModal" @close="closeModal" @confirm="closeModal">
        <template #header>錯誤</template>
        <template #icon>
          <img
            src="@/assets/images/ic_red_x_circle.svg"
            title="玉山銀行E.SUN Bank"
            class="modal-icon"
          />
        </template>
        <template #body>
          {{ editError }}
        </template>
        <template #cancelBtn>取消</template>
        <template #confirmBtn>確定</template>
      </Modal>
    </Teleport>
    <Teleport to="body">
      <Modal v-if="showSuccessModal" @close="closeModal" @confirm="returnToPrePage">
        <template #header>編輯角色</template>
        <template #icon>
          <img
            src="@/assets/images/ic_green_check_circle.svg"
            title="玉山銀行E.SUN Bank"
            class="modal-icon"
          />
        </template>
        <template #body>
          角色編輯完成
        </template>
        <template #cancelBtn>關閉</template>
        <template #confirmBtn>確定</template>
      </Modal>
    </Teleport>
  </div>
</template>

<script>
import { doPost } from "@/utilities/api";
import { Form, Field, ErrorMessage } from "vee-validate";
import MultiSelect from "@/components/MultiSelect.vue";
import { useRoute } from "vue-router";
import * as converter from "@/utilities/converter";
import Modal from "@/components/Modal.vue";

export default {
  name: "RoleEdit",
  components: { Form, Field, ErrorMessage, MultiSelect, Modal },
  data: function () {
    const route = useRoute();

    const schema = this.$yup.object({
      name: this.$yup.string().required(),
      viewerPermissionIdList: this.$yup.array().arrayRequired(),
      webPermissionIdList: this.$yup.array().arrayRequired(),
    });

    return {
      isFieldVisible: false,
      roleId: parseInt(route.query.id),
      schema,
      name: "",
      comment: "",
      viewerPermissionIds: [],
      webPermissionIds: [],
      viewerPermissions: [],
      webPermissions: [],
      // modal
      showErrorModal: false,
      showSuccessModal: false,
      editError: "",
    };
  },
  created() {
    this.getInitData();
  },
  methods: {
    getInitData() {
      const request = {
        roleId: this.roleId,
      };
      doPost("/Role/GetEditInitData", request)
        .then((response) => {
          if (response.status == 200) {
            if (response.data.ok) {
              var model = response.data.model;
              this.name = model.name;
              this.viewerPermissions = converter.keyPairStrToArray(
                model.viewerPermissionSrcList
              );
              this.webPermissions = converter.keyPairStrToArray(
                model.webPermissionSrcList
              );
              this.viewerPermissionIds = JSON.parse(
                model.viewerPermissionIdList
              );
              this.webPermissionIds = JSON.parse(model.webPermissionIdList);
              this.comment = model.comment;

              this.isFieldVisible = true;
            } else {
              this.editError = response.data.message;
              this.showErrorModal = true;
            }
          } else {
            this.$router.push({ name: "Error500" });
          }
        })
        .catch(() => {
          this.$router.push({ name: "Error500" });
        });
    },
    onSubmit(values) {
      const submitData = {
        roleId: this.roleId,
        name: values.name,
        comment: values.comment,
        viewerPermissionIdList: values.viewerPermissionIdList,
        webPermissionIdList: values.webPermissionIdList,
      };

      doPost("/Role/Edit", submitData)
        .then((response) => {
          if (response.status == 200) {
            if (response.data.ok) {
              this.showSuccessModal = true;
            } else {
              this.editError = response.data.message;
              this.showErrorModal = true;
            }
          } else {
            this.$router.push({ name: "Error500" });
          }
        })
        .catch(() => {
          this.$router.push({ name: "Error500" });
        });
    },
    closeModal() {
      this.showErrorModal = false;
      this.showSuccessModal = false;
    },
    returnToPrePage(){
      this.$router.push({ name: "RoleQuery" });
    }
  },
};
</script>