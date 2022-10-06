<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">首頁</li>
        <li class="breadcrumb-item">系統管理</li>
        <li class="breadcrumb-item active" aria-current="page">索引管理</li>
      </ol>
    </nav>
    <div class="mb-2 d-flex justify-content-between">
      <h2 class="page-title mt-0">索引管理</h2>
      <button
        @click="addCaseIndex"
        type="button"
        class="btn btn-primary btn-sm d-flex align-items-center fs-6"
      >
        <img src="@/assets/images/ic_white_add_circle.svg" title="新增" />
        新增索引
      </button>
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
          <span v-if="props.column.field == 'edit'">
            <router-link
              :to="{
                name: 'CaseIndexEdit',
                query: { id: props.formattedRow['id'] },
              }"
            >
              <img
                src="@/assets/images/ic_pen_edit.svg"
                width="24"
                height="24"
              />
            </router-link>
          </span>
          <span v-else-if="props.column.field == 'isRequired'">
            <span v-if="props.formattedRow[props.column.field] == '1'">Y</span>
            <span v-else>N</span>
          </span>
          <span v-else-if="props.column.field == 'status'">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                :checked="props.formattedRow[props.column.field] == 0"
              />
            </div>
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
  name: "CaseIndexQuery",
  components: { VueGoodTable },
  data: function () {
    return {
      paginationOptions: datatable.paginationOptions,
      columns: [
        { field: "id", hidden: true },
        { label: "單位名稱", field: "name" },
        { label: "是否為必要項目", field: "isRequired" },
        { label: "狀態", field: "status", sortable: false },
        { label: "編輯", field: "edit", sortable: false },
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
    addCaseIndex() {
      this.$router.push({ name: "CaseIndexAdd" });
    },
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
      doPost("/CaseIndex/Query", datatable.serverReq)
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
