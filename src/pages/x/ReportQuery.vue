<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">首頁</li>
        <li class="breadcrumb-item active" aria-current="page">報表查詢</li>
      </ol>
    </nav>
    <h2 class="page-title">報表查詢</h2>
    <div class="mb-4">
      <div class="form-check form-check-inline mb-2">
        <!-- 開關顯示日期模式 -->
        <input
          class="form-check-input"
          type="checkbox"
          id="checkbox-showDate"
          v-model="check_showDate"
          checked
        />
        <label class="form-check-label" for="checkbox-showDate"
          >開關顯示日期模式</label
        >
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 起始日期 -->
        <span class="col-sm-2 input-group-text py-2 px-4">起始日期</span>
        <div class="col-sm-4 p-2">
          <div class="input-group calendar-wrapper">
            <input
              type="date"
              class="form-control"
              placeholder="請選擇起始日期"
              v-model="startDate"
            />
            <span class="calendar">
              <button class="btn btn-secondary btn-calendar" type="button">
                <img class="img-calendar" />
              </button>
            </span>
          </div>
        </div>
        <!-- 結束日期 -->
        <span class="col-sm-2 input-group-text py-2 px-4">結束日期</span>
        <div class="col-sm-4 p-2">
          <input
            type="date"
            class="form-control"
            placeholder="請選擇結束日期"
            v-model="endDate"
          />
        </div>
      </div>
      <div class="input-group border-bottom-0 row g-0">
        <!-- 權限類別 -->
        <span class="col-sm-2 input-group-text py-2 px-4">權限類別</span>
        <div class="col-sm-10 p-2">
          <MultiSelect
            v-model="selected_permission"
            name="selected_permission"
            :options="permissions"
          />
        </div>
      </div>
      <button
        @click="loadItems"
        type="submit"
        class="btn btn-primary btn-md w320 mt-4 mx-auto d-block"
      >
        確定
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
          <span>{{ props.formattedRow[props.column.field] }}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<style lang="scss">
@import "./node_modules/vue-good-table-next/src/styles/style";
</style>

<script>
import { doPost } from "@/utilities/api";
import { VueGoodTable } from "vue-good-table-next";
import * as datatable from "@/utilities/datatable";
import MultiSelect from "@/components/MultiSelect.vue";

export default {
  name: "ReportQuery",
  components: { VueGoodTable, MultiSelect },
  data: function () {
    return {
      check_showDate: true,
      startDate: "",
      endDate: "",
      selected_permission: [],
      permissions: ["per1", "per2", "per3"],
      paginationOptions: datatable.paginationOptions,
      columns: [],
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
      const request = {
        dtRequest: datatable.serverReq,
        seletAll: true,
        startDate: this.startDate,
        endDate: this.endDate,
        permissionCategoryIds: this.selected_permission,
      };
      if (this.check_showDate) {
        this.columns = [
          { field: "id", hidden: true },
          { label: "類別", field: "category" },
          { label: "檔案數量", field: "fileCount" },
          { label: "新增時間", field: "createTime" },
        ];
        doPost("/Report/QueryFileWithDate", request)
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
      } else {
        this.columns = [
          { field: "id", hidden: true },
          { label: "類別", field: "category" },
          { label: "案件數量", field: "caseCount" },
          { label: "檔案數量", field: "fileCount" },
        ];
        doPost("/Report/QueryFile", request)
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
      }
    },
  },
};
</script>