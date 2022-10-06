<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">首頁</li>
        <li class="breadcrumb-item">帳戶管理</li>
        <li class="breadcrumb-item">使用者管理</li>
        <li class="breadcrumb-item active" aria-current="page">新增使用者</li>
      </ol>
    </nav>
    <h2 class="page-title">新增使用者</h2>
    <Form class="mb-4" @submit="onSubmit" :validation-schema="schema">
      <div class="input-group border-bottom-0 row g-0">
        <!-- 帳號 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >帳號</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="account"
            type="text"
            class="form-control"
            placeholder="請輸入帳號"
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
            name="name"
            type="text"
            class="form-control"
            placeholder="請輸入姓名"
          />
          <ErrorMessage name="name" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 密碼 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >密碼</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="passowrd"
            type="password"
            class="form-control"
            placeholder="請輸入密碼"
          />
          <ErrorMessage name="passowrd" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 確認密碼 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >確認密碼</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="confirm_passowrd"
            type="password"
            class="form-control"
            placeholder="請輸入確認密碼"
          />
          <ErrorMessage name="confirm_passowrd" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 操作權限 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >操作權限</label
        >
        <div class="col-sm-10 p-2">
          <button type="button" class="btn btn-secondary btn-sm">
            選擇操作權限
          </button>
          <ErrorMessage name="operation_permission" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 單位 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >單位</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="unit"
            class="form-control"
            placeholder="請選擇單位"
            as="select"
          />
          <ErrorMessage name="unit" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 角色 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >角色</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="role"
            class="form-control"
            placeholder="請選擇角色"
            as="select"
          />
          <ErrorMessage name="role" class="error-message" />
        </div>
      </div>
      <div class="input-group row g-0">
        <!-- 備註 -->
        <label class="col-sm-2 input-group-text py-2 px-4">備註</label>
        <div class="col-sm-10 p-2">
          <input type="text" class="form-control" placeholder="請輸入備註" />
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

export default {
  name: "UserAdd",
  components: { Form, Field, ErrorMessage },
  data: function () {
    const schema = this.$yup.object({
        account: this.$yup.string().required(),
        name: this.$yup.string().required(),
        passowrd: this.$yup.string().required(),
        confirm_passowrd: this.$yup.string().required().oneOf([this.$yup.ref('password'), null], '確認密碼必須與密碼符合'),
        unit: this.$yup.string().required(),
        role: this.$yup.string().required()
    });
    return {
      schema
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
  },
};
</script>