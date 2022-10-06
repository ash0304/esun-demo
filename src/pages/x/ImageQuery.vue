<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">首頁</li>
        <li class="breadcrumb-item active" aria-current="page">影像查詢</li>
      </ol>
    </nav>
    <h2 class="page-title">影像查詢</h2>
    <div class="mb-4">
      <div class="input-group border-bottom-0 row g-0">
        <!-- 起始日期 -->
        <span class="col-sm-2 input-group-text py-2 px-4">起始日期</span>
        <div class="col-sm-4 p-2">
          <input
            type="date"
            class="form-control"
            placeholder="起選擇起始日期"
          />
        </div>
        <!-- 結束日期 -->
        <span class="col-sm-2 input-group-text py-2 px-4">結束日期</span>
        <div class="col-sm-4 p-2">
          <input
            type="date"
            class="form-control"
            placeholder="起選擇結束日期"
          />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 權限類別 -->
        <span class="col-sm-2 input-group-text py-2 px-4">權限類別</span>
        <div class="col-sm-10 p-2">
          <select class="form-select" aria-label="Default select example">
            <option selected>管理者</option>
          </select>
        </div>
      </div>
      <div class="input-group row g-0">
        <!-- 索引類別 -->
        <span class="col-sm-2 input-group-text py-2 px-4">索引類別</span>
        <div class="col-sm-10 p-2">
          <select class="form-select" aria-label="Default select example">
            <option selected>公司編號</option>
          </select>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-md w320 mt-4 mx-auto d-block">
        確定
      </button>
    </div>
    <div>
      <button
        id="querySelectedFileBtn"
        type="button"
        class="btn btn-secondary btn-sm"
      >
        查詢選擇檔案
      </button>
      <!-- 搜尋結果 -->

    </div>
  </div>
</template>

<script>


export default {
  name: "ImageQuery",
  components: { },
  setup() {},
  data() {
    return {
     
    };
  },
};
</script>