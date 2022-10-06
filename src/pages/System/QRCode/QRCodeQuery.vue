<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">系統管理</li>
        <li class="breadcrumb-item active" aria-current="page">QRCode 管理</li>
      </ol>
    </nav>
    <h2 class="page-title">QRCode 管理</h2>
    <div class="mb-4">
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
                name: 'QRCodeEdit',
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

          <span v-else>{{ props.formattedRow[props.column.field] }}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>


<style lang="scss">
@import "./node_modules/vue-good-table-next/src/styles/style";
</style>

<script>
//import { doPost } from "@/utilities/api";
import { VueGoodTable } from "vue-good-table-next";
import * as datatable from "@/utilities/datatable";

export default {
  name: "QRCodeQuery",
  components: { VueGoodTable },
  data: function () {
    return {
      paginationOptions: datatable.paginationOptions,
      columns: [
        { field: "id", hidden: true },
        { label: "業務類別名稱", field: "category" },
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
      this.rows = [
        { id: 1, category: "存匯傳票" },
        { id: 2, category: "開戶申請書" },
        { id: 3, category: "約定變更暨事故申請書" },
        { id: 4, category: "金融卡電話網銀申請書" },
        { id: 5, category: "消金貸款案件(CPS)" },
        { id: 6, category: "消金貸款案件(NCS)" },
      ];
      this.totalRecords = 6;
    },
  },
};
</script>
