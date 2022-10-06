<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">首頁</li>
        <li class="breadcrumb-item">帳戶管理</li>
        <li class="breadcrumb-item">單位管理</li>
        <li class="breadcrumb-item active" aria-current="page">編輯單位</li>
      </ol>
    </nav>
    <h2 class="page-title">編輯單位</h2>
    <Form class="mb-4" @submit="onSubmit" :validation-schema="schema">
      <div class="input-group border-bottom-0 row g-0">
        <!-- 單位名稱 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >單位名稱</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="unitName"
            type="text"
            class="form-control"
            placeholder="請輸入單位名稱"
            :value="unitName"
          />
          <ErrorMessage name="unitName" class="error-message" />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 單位代碼 -->
        <label class="col-sm-2 input-group-text py-2 px-4 required after"
          >單位代碼</label
        >
        <div class="col-sm-10 p-2">
          <Field
            name="unitCode"
            class="form-control"
            placeholder="輸入單位代碼"
            :value="unitCode"
          />
          <ErrorMessage name="unitCode" class="error-message" />
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
import { doPost } from "@/utilities/api";
import * as datatable from "@/utilities/datatable";

export default {
  name: "UnitEdit",
  components: { Form, Field, ErrorMessage },
  data: function () {
    const schema = this.$yup.object({
        unitName: this.$yup.string().required(),
        unitCode: this.$yup.string().required(),
    });
    return {
      schema,
      unitName: "",
      unitCode: "",
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
      var req=3
      doPost("/Unit/GetEditInitData", req)
        .then((response) => {
          if (response.status == 200) {
            this.model = response.data.model;
          } else {
            this.$router.push({ name: "Error500" });
          }
        })
        .catch(() => {this.$router.push({ name: "Error500" }); });
    },
    
  },
};
</script>