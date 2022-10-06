<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">首頁</li>
        <li class="breadcrumb-item">帳戶管理</li>
        <li class="breadcrumb-item active" aria-current="page">角色管理</li>
      </ol>
    </nav>
    <div class="mb-2 d-flex justify-content-between">
      <h2 class="page-title mt-0">角色管理</h2>
      <button
        @click="addRole"
        type="button"
        class="btn btn-primary btn-sm d-flex align-items-center fs-6"
      >
        <img src="@/assets/images/ic_white_add_circle.svg" title="新增" />
        新增角色
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
          <span v-if="props.column.field == 'comment'">
            {{ formatEmpty(props.formattedRow[props.column.field]) }}
          </span>
          <span v-else-if="props.column.field == 'edit'">
            <router-link
              :to="{
                name: 'RoleEdit',
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
          <span v-else-if="props.column.field == 'delete'">
            <a href="#" @click="showModal">
              <img src="@/assets/images/ic_delete.svg" width="24" height="24" />
            </a>
          </span>
          <span v-else>{{ props.formattedRow[props.column.field] }}</span>
        </template>
      </vue-good-table>
    </div>
    <Teleport to="body">
      <Modal v-if="isModalVisible" @close="closeModal" @confirm="closeModal">
        <template #header> 是否確定將資料刪除? </template>
        <template #icon>
          <img
            src="@/assets/images/ic_red_alert_circle.svg"
            title="玉山銀行E.SUN Bank"
            class="modal-icon"
          />
        </template>
        <template #body> 刪除後，您將無法還原資料 </template>
        <template #cancelBtn> 取消 </template>
        <template #confirmBtn> 確定 </template>
      </Modal>
    </Teleport>
  </div>
</template>

<style lang="scss">
@import "./node_modules/vue-good-table-next/src/styles/style";
</style>

<script>
import { doPost } from "@/utilities/api";
import { VueGoodTable } from "vue-good-table-next";
import * as datatable from "@/utilities/datatable";
import * as converter from "@/utilities/converter";
import Modal from "@/components/Modal.vue";

export default {
  name: "RoleQuery",
  components: { VueGoodTable, Modal },
  data: function () {
    return {
      isModalVisible: false,
      paginationOptions: datatable.paginationOptions,
      columns: [
        { field: "id", hidden: true },
        { label: "姓名", field: "name" },
        { label: "備註", field: "comment" },
        { label: "編輯", field: "edit", sortable: false },
        { label: "刪除", field: "delete", sortable: false },
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
    formatEmpty(value) {
      return converter.formatEmpty(value);
    },
    addRole() {
      this.$router.push({ name: "RoleAdd" });
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
      doPost("/Role/Query", datatable.serverReq)
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
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>