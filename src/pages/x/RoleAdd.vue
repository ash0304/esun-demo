<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">首頁</li>
        <li class="breadcrumb-item">帳戶管理</li>
        <li class="breadcrumb-item">角色管理</li>
        <li class="breadcrumb-item active" aria-current="page">新增角色</li>
      </ol>
    </nav>
    <h2 class="page-title">新增角色</h2>
    <Form
      class="mb-4"
      @submit="onSubmit"
      :validation-schema="schema"
    >
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
            name="select_viewer_permission"
            :options="viewerPermissions"
          />
          <ErrorMessage name="select_viewer_permission" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 網站權限 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >網站權限</label
        >
        <div class="col-sm-10 p-2">
          <MultiSelect name="select_web_permission" :options="webPermissions" />
          <ErrorMessage name="select_web_permission" class="error-message" />
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
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import MultiSelect from "@/components/MultiSelect.vue";

export default {
  name: "RoleAdd",
  components: { Form, Field, ErrorMessage, MultiSelect },
  data() {
    const schema = this.$yup.object({
      name: this.$yup.string().required(),
      select_viewer_permission: this.$yup.array().arrayRequired(),
      select_web_permission: this.$yup.array().arrayRequired(),
    });

    return {
      schema,
      viewerPermissions: [
        { id: 1, text: "ToolBar" },
        { id: 2, text: "Scan settings" },
      ],
      webPermissions: [
        { id: 1, text: "Image/Scanning" },
        { id: 2, text: "Image/Query" },
        { id: 2, text: "Account/User" },
      ],
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
  },
};
</script>