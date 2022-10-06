<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">首頁</li>
        <li class="breadcrumb-item">系統管理</li>
        <li class="breadcrumb-item active">索引管理</li>
        <li class="breadcrumb-item active" aria-current="page">編輯索引</li>
      </ol>
    </nav>
    <h2 class="page-title">編輯索引</h2>
    <Form class="mb-4" @submit="onSubmit" :validation-schema="schema">
      <div class="input-group border-bottom-0 row g-0">
        <!-- 索引名稱 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >索引名稱</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="name"
            type="text"
            class="form-control"
            placeholder="請輸入索引名稱"
          />
          <ErrorMessage name="name" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 索引代碼 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >索引代碼</label
        >
        <div class="col-sm-10 p-2">
          <Field name="code" class="form-control" placeholder="輸入索引代碼" />
          <ErrorMessage name="code" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 正規表達式 -->
        <label class="col-sm-2 input-group-text py-2 px-4">正規表達式</label>
        <div class="col-sm-10 p-2">
          <input
            type="regexRule"
            class="form-control"
            placeholder="請輸入正規表達式"
          />
        </div>
      </div>
      <div class="input-group row g-0">
        <!-- 是否為必要項目 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >是否為必要項目?</label
        >
        <div class="col-sm-10 p-2 d-flex">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
              checked
            />
            <label class="form-check-label" for="inlineRadio1">是</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
            />
            <label class="form-check-label" for="inlineRadio2">否</label>
          </div>
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
import { doPost } from "@/utilities/api";
import * as datatable from "@/utilities/datatable";

export default {
  name: "CaseIndexEdit",
  components: { Form, Field, ErrorMessage },
  data: function () {
    const schema = this.$yup.object({
      name: this.$yup.string().required(),
      code: this.$yup.string().required(),
    });
    return {
      schema,
      name: "",
      code: "",
    };
  },
  mounted() {
    datatable.resetServerReq();
    this.loadItems();
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
    loadItems() {
      var req = 3;
      doPost("/CaseIndex/GetEditInitData", req)
        .then((response) => {
          if (response.status == 200) {
            this.model = response.data.model;
          } else {
            this.$router.push({ name: "Error500" });
          }
        })
        .catch(() => {
          this.$router.push({ name: "Error500" });
        });
    },
  },
};
</script>