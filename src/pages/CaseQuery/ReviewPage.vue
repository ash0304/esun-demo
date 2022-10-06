<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">案件一覽表查詢</li>
        <li class="breadcrumb-item">每日覆核報表</li>
        <li class="breadcrumb-item active" aria-current="page">覆核報表</li>
      </ol>
    </nav>
    <h2 class="page-title">每日覆核報表</h2>
    <h5>請確認每日應掃描案件筆數，以確認是否已完成掃描作業。</h5>
    <div
      v-if="reviewStatus != 1 && userInfo.unitId == reviewUnitId"
      class="text-end mt-4"
    >
      <button
        type="button"
        class="btn btn-primary btn-xs me-3"
        @click="showModal2"
      >
        覆核確認
      </button>
    </div>
    <div class="mt-4">
      <vue-good-table
        mode="remote"
        :columns="columns"
        :rows="rows"
        v-on:page-change="onPageChange"
        v-on:sort-change="onSortChange"
        v-on:per-page-change="onPerPageChange"
        :totalRows="totalRecords"
        :isLoading:sync="true"
        :pagination-options="
          rows.length > 0 ? paginationOptions : { enabled: false }
        "
        :sort-options="{ enabled: true }"
        :line-numbers="true"
      >
        <template #emptystate
          ><p class="mb-0 text-center">目前尚無資料</p></template
        >
        <template #table-row="props">
          <span v-if="props.column.field == 'ClickMe'">
            <span v-if="reviewStatus != 1 && userInfo.unitId == reviewUnitId">
              <button
                type="button"
                class="btn btn-primary btn-xs"
                @click="handleView(props.row)"
              >
                開啟影像檔
              </button>
            </span>
            <span v-else>
              <button type="button" class="btn btn-primary btn-xs" disabled>
                開啟影像檔
              </button>
            </span>
          </span>
        </template>
      </vue-good-table>
    </div>
    <!-- 操作結果Modal -->
    <Teleport to="body">
      <transition name="modal-fade">
        <Modal
          v-if="isModalVisible1"
          :showCancelBtn="false"
          :showConfirmBtn="true"
          @close="closeModal1"
          @confirm="confirmModal1"
        >
          <template #header> 提示 </template>
          <template #body>
            <div class="modal-body-padding">{{ responseMessage }}</div>
          </template>
          <template #confirmBtn> 關閉 </template>
        </Modal>
      </transition>
    </Teleport>
    <!-- 覆核modal -->
    <Teleport to="body">
      <transition name="modal-fade">
        <Modal
          v-if="isModalVisible2"
          :showCancelBtn="true"
          :showConfirmBtn="true"
          @close="closeModal2"
          @confirm="confirmModal2"
        >
          <template #header> 覆核報表 </template>
          <template #body>
            <div class="modal-body-padding custom">
              <div class="input-group row g-0">
                <span class="col-sm-2 input-group-text py-2 px-4">備註</span>
                <div class="col-sm-10 p-3">
                  <Field
                    name="applyDescription"
                    placeholder="請輸入備註說明(非必填，限50字)"
                    class="form-control"
                    as="textarea"
                    v-model="comment"
                    maxlength="50"
                  >
                  </Field>
                </div>
              </div>
            </div>
          </template>
          <template #cancelBtn> 取消 </template>
          <template #confirmBtn> 確定 </template>
        </Modal>
      </transition>
    </Teleport>
  </div>
</template>
<script>
import { Field } from 'vee-validate';
import * as datatable from '@/utilities/datatable';
import { VueGoodTable } from 'vue-good-table-next';
import Modal from '@/components/Modal.vue';

import { doPost } from '@/utilities/api';

export default {
  name: 'ReviewPage',
  components: { VueGoodTable, Modal, Field },
  data() {
    return {
      isModalVisible1: false,
      isModalVisible2: false,
      responseMessage: '',
      comment: '',
      reviewStatus: 0,
      reviewUnitId: 0,
      columns: [
        { field: 'CaseId', hidden: true },
        {
          label: '單位名稱',
          field: 'Unit',
        },
        {
          label: '業務類別',
          field: 'Category',
        },
        {
          label: '交易日',
          field: 'TraDate',
        },
        {
          label: '案件編號',
          field: 'CaseNo',
        },
        {
          label: '交易櫃員',
          field: 'TraUser',
        },
        {
          label: '點我處理',
          field: 'ClickMe',
        },
      ],
      rows: [],
      paginationOptions: datatable.paginationOptions,
      totalRecords: 0,
      userInfo: {}
    };
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  mounted() {
    this.getQueryDetail();
    this.getQueryCase();
  },
  methods: {
    // 取得覆核單詳細資料
    getQueryDetail() {
      const passObj = {
        // localstorage
        GlobalUserId: localStorage.getItem('GlobalUserId')
          ? localStorage.getItem('GlobalUserId')
          : this.userInfo.userId,
        Id: this.$route.query.id,
      };
      doPost('/DailyReviewReport/QueryDetail', passObj).then((response) => {
        const { reviewStatus, reviewUnitId } = response;
        this.reviewStatus = reviewStatus;
        this.reviewUnitId = reviewUnitId;
      });
    },
    getQueryCase(params) {
      let passObj = {};
      const serverReq = {
        sort: { field: '', type: '' },
        page: 1,
        perPage: 25,
      };
      passObj = {
        ...serverReq,
        Data: {},
      };
      if (params) {
        passObj = {
          ...serverReq,
          ...params,
          Data: {},
        };
      }
      // localstorage
      passObj.Data.GlobalUserId = localStorage.getItem('GlobalUserId')
        ? localStorage.getItem('GlobalUserId')
        : this.userInfo.userId;
      passObj.Data.Id = this.$route.query.id;
      doPost('/DailyReviewReport/QueryCase', passObj).then((response) => {
        const { totalRecords, rows } = response;
        // 對資料做Object屬性開頭大寫處理
        rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            tempObj[this.capitalizeFirstLetter(key)] = value;
          }
          this.rows[index] = tempObj;
        });
        this.totalRecords = totalRecords;
      });
    },
    handleView(row) {
      const passObj = {
        Flag: 802,
        CaseIds: [row.CaseId],
        GlobalUserId: this.userInfo.userId,
      };
      // do 檢視api
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    },
    showModal1() {
      this.isModalVisible1 = true;
    },
    closeModal1() {
      this.isModalVisible1 = false;
    },
    confirmModal1() {
      // do something and close
      this.getQueryDetail();
      this.getQueryCase();
      setTimeout(() => {
        this.isModalVisible1 = false;
      }, 500);
    },
    showModal2() {
      this.isModalVisible2 = true;
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    confirmModal2() {
      const passObj = {
        Id: this.$route.query.id,
        Comment: this.comment,
        GlobalUserId: localStorage.getItem('GlobalUserId')
          ? localStorage.getItem('GlobalUserId')
          : this.userInfo.userId,
      };
      doPost('/DailyReviewReport/Review', passObj).then((response) => {
        if (response) {
          this.responseMessage = `已完成覆核!`;
          this.showModal1();
        }
        this.isModalVisible2 = false;
      });
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
    // 轉大寫開頭屬性
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    loadItems(params) {
      // 這邊組成傳送參數(params + this.form)
      let passObj = {};
      const serverReq = {
        sort: { field: '', type: '' },
        page: 1,
        perPage: 25,
      };
      passObj = {
        ...serverReq,
        Data: {},
      };
      if (params) {
        passObj = {
          ...serverReq,
          ...params,
          Data: {},
        };
      }
      // localstorage
      passObj.Data.GlobalUserId = localStorage.getItem('GlobalUserId')
        ? localStorage.getItem('GlobalUserId')
        : this.userInfo.userId;
      passObj.Data.Id = this.$route.query.id;
      doPost('/DailyReviewReport/QueryCase', passObj).then((response) => {
        const { totalRecords, rows } = response;
        this.rows = [];
        // 對資料做Object屬性開頭大寫處理
        rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            tempObj[this.capitalizeFirstLetter(key)] = value;
          }
          this.rows[index] = tempObj;
        });
        this.totalRecords = totalRecords;
      });
    },
  },
};
</script>
