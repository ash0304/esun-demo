<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">系統管理</li>
        <li class="breadcrumb-item active" aria-current="page">系統操作紀錄</li>
      </ol>
    </nav>
    <h2 class="page-title mt-0">系統操作紀錄</h2>
    <div class="mb-4">
      <div class="input-group border-bottom-0 row g-0">
        <!-- 起始日期 -->
        <span class="col-sm-2 input-group-text py-2 px-4">起始日期</span>
        <div class="col-sm-4 p-2">
          <input
            type="date"
            class="form-control"
            placeholder="請選擇起始日期"
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
        <!-- 類別 -->
        <span class="col-sm-2 input-group-text py-2 px-4">類別</span>
        <div class="col-sm-10 p-2">
          <select
            id="checkname"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Web</option>
            <option >ScanViewer</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary btn-md w320 mt-4 mx-auto d-block"
      >
        確定
      </button>
      <!-- <div>
        <button
          id="querySelectedBtn"
          type="button"
          class="btn btn-secondary btn-sm"
        >
          查詢
        </button>
      </div> -->
    </div>
    <div class="mb-4">
      <!-- 搜尋結果 -->
      <vue-good-table
        mode="remote"
        :columns="columns"
        :rows="rows"
        v-on:page-change="onPageChange"
        v-on:sort-change="onSortChange"
        v-on:per-page-change="onPerPageChange"
        :totalRows="totalRecords"
        :isLoading:sync="true"
        :pagination-options="paginationOptions"
        :sort-options="{ enabled: true }"
      >
        <template #emptystate
          ><p class="mb-0 text-center">目前尚無資料</p></template
        >
        <template #table-row="props">
          <span v-if="props.column.field == 'status'">
            <span v-if="props.formattedRow[props.column.field] == 0">成功</span>
            <span v-else>失敗</span>
          </span>
          <span v-else>{{ props.formattedRow[props.column.field] }}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { doPost } from "@/utilities/api";
import { VueGoodTable } from "vue-good-table-next";
import * as datatable from "@/utilities/datatable";

export default {
  name: "TransRecord",
  components: { VueGoodTable },
  setup() {},
  data() {
    return {
      paginationOptions: datatable.paginationOptions,
      columns: [
        { field: "id", hidden: true },
        { label: "類別", field: "logType" },
        { label: "請求路徑", field: "requestPath" },
        { label: "請求編號", field: "requestId" },
        { label: "狀態", field: "status" },
        { label: "使用者", field: "userAccount" },
        { label: "客戶端IP", field: "clientIp" },
        { label: "新增時間", field: "createTime" },
      ],
      rows: [],
      totalRecords: 0,
    };
  },
  mounted() {
    datatable.resetServerReq();
    this.loadItems();
  },
  methods: {
    updateParams(newProps) {
      datatable.updateParams(newProps);
    },
    onPageChange(params) {
      datatable.onPageChange(params, this.loadItems);
    },
    onPerPageChange(params) {
      datatable.onPerPageChange(params, this.loadItems);
    },
    onSortChange(params) {
      datatable.onSortChange(params, this.loadItems);
    },
    loadItems() {
      doPost("/TransRecord/GetWebQuery", datatable.serverReq)
        .then((response) => {
          if (response.status == 200) {
            this.rows = response.data.rows;
            this.totalRecords = response.data.totalRecords;
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