<template>
  <div class="mt-4 px-4">
    <Form @submit="onSubmit" v-slot="{ errors }">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">文件查詢暨調閱/補件</li>
          <li class="breadcrumb-item active" aria-current="page">
            調閱紀錄查詢(待補起案)
          </li>
        </ol>
      </nav>
      <h2 class="page-title">調閱紀錄查詢(待補起案)</h2>
      <div class="mb-4">
        <!-- 業務類別 -->
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">業務類別</span>
          <div class="col-sm-4 p-3">
            <Field
              name="category"
              class="form-control"
              placeholder="請選擇業務類別"
              :rules="{ required: true }"
              v-slot="{ field }"
            >
              <Select2
                placeholder="請選擇"
                v-model="category"
                v-bind="field"
                :options="categoryOptions"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
                @select="onChangeCategory"
              />
            </Field>
            <span class="error-msg">{{ errors.category }}</span>
          </div>
          <!-- 申請日期區間 -->
          <span class="col-sm-2 input-group-text py-2 px-4">申請日期區間</span>
          <div class="col-sm-4 p-3 d-flex align-items-center">
            <div class="input-group calendar-wrapper w320">
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
            <div class="mx-3">~</div>
            <div class="input-group calendar-wrapper w320">
              <input
                type="date"
                class="form-control"
                placeholder="請選擇結束日期"
                v-model="endDate"
              />
              <span class="calendar">
                <button class="btn btn-secondary btn-calendar" type="button">
                  <img class="img-calendar" />
                </button>
              </span>
            </div>
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <!-- 調閱申請單位 -->
          <span class="col-sm-2 input-group-text py-2 px-4">調閱申請單位</span>
          <div class="col-sm-4 p-3">
            <Field
              class="form-control"
              name="applyUnit"
              type="text"
              :value="`${userInfo.unitCode} ${userInfo.unitName}`"
              :disabled="true"
            />
          </div>
          <!-- 調閱申請人員 -->
          <span class="col-sm-2 input-group-text py-2 px-4">調閱申請人員</span>
          <div class="col-sm-4 p-3">
            <Field
              class="form-control"
              name="applyUser"
              type="text"
              :value="`${userInfo.userCode} ${userInfo.userName}`"
              :disabled="true"
            />
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <!-- 可調閱日期 -->
          <span class="col-sm-2 input-group-text py-2 px-4">可調閱日期</span>
          <div class="col-sm-4 p-3">
            <Field name="applyDate" v-slot="{ field }" :value="getDate()">
              <div class="input-group calendar-wrapper">
                <input
                  type="date"
                  class="form-control"
                  placeholder="請選擇可調閱日期"
                  v-model="applyDate"
                  v-bind="field"
                />
                <span class="calendar">
                  <button class="btn btn-secondary btn-calendar" type="button">
                    <img class="img-calendar" />
                  </button>
                </span>
              </div>
            </Field>
          </div>
          <!-- 調閱事由 -->
          <span class="col-sm-2 input-group-text py-2 px-4">調閱事由</span>
          <div class="col-sm-4 p-3">
            <Field
              name="applyReason"
              class="form-control"
              placeholder="請選擇調閱事由"
              v-slot="{ field }"
              :rules="{ required: true }"
            >
              <Select2
                placeholder="請選擇"
                v-model="applyReason"
                v-bind="field"
                :options="reasonList"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
              />
            </Field>
            <span class="error-msg">{{ errors.applyReason }}</span>
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <!-- 歸檔單位 -->
          <span class="col-sm-2 input-group-text py-2 px-4">歸檔單位</span>
          <div class="col-sm-4 p-3">
            <Field
              name="archiveUnitId"
              class="form-control"
              placeholder="請選擇調閱事由"
              v-slot="{ field }"
            >
              <Select2
                placeholder="請選擇"
                v-model="archiveUnitId"
                v-bind="field"
                :options="archiveUnitList"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
              />
            </Field>
          </div>
          <!-- 案件編號 -->
          <span class="col-sm-2 input-group-text py-2 px-4">案件編號</span>
          <div class="col-sm-4 p-3">
            <Field
              name="caseNo"
              type="text"
              v-model="caseNo"
              class="form-control"
            >
            </Field>
          </div>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-primary btn-md w320">查詢</button>
          <button
            v-if="category"
            type="button"
            class="btn btn-secondary btn-md w125 mx-3"
            @click="clearQuery"
          >
            清除條件
          </button>
        </div>
      </div>
    </Form>
    <div v-if="isSearch && rows.length > 0" class="text-end mt-4">
      <!-- 測試匯出csv -->
      <JsonCSV
        :data="rows"
        :labels="labels"
        :fields="fields"
        :name="generatorCSVname('調閱紀錄查詢(待補起案)')"
      ></JsonCSV>
      <button
        type="button"
        class="btn btn-secondary btn-xs w100 me-3"
        @click="handleView"
      >
        檢視
      </button>
    </div>
    <div v-if="isSearch" class="mt-4">
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
        :line-numbers="true"
      >
        <template #emptystate
          ><p class="mb-0 text-center">目前尚無資料</p></template
        >

        <template #table-column="props">
          <span v-if="props.column.field == 'AllowView'">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input me-2"
                v-model="viewCheckBox"
                type="checkbox"
                @change="viewMainChange"
              />
              <span>檢視</span>
            </div>
          </span>
          <span v-else>
            <div class="form-check form-check-inline">
              <!-- 為解決客製化跑版微調樣式 -->
              <div :style="{ width: '1px', height: '40px' }"></div>
              <span>{{ props.column.label }}</span>
            </div>
          </span>
        </template>

        <template #table-row="props">
          <span v-if="props.column.field == 'AllowView'">
            <span v-if="props.formattedRow['AllowView'] == true">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  v-model="rows[props.row.originalIndex].viewValue"
                  @change="viewChange"
                  type="checkbox"
                />
              </div>
            </span>
          </span>
          <span v-if="props.column.field == 'Comments'">
            <span class="comments-btn" @click="handleComments(props.row)">
              <img src="@/assets/images/ic_file.svg" title="意見紀錄" />
            </span>
          </span>
          <span v-if="props.column.field == 'ApplyNo'">
            <a href="#" @click="handleApplyCase(props.row.Id)">{{
              props.row.ApplyNo
            }}</a>
          </span>
        </template>
      </vue-good-table>
    </div>
    <!-- 意見紀錄 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <Modal
          v-if="isModalVisible1"
          :showCancelBtn="true"
          :showConfirmBtn="false"
          :extraLargeSize="true"
          @close="closeModal1"
        >
          <template #header> 意見紀錄 </template>
          <template #body>
            <div class="modal-body-padding custom">
              <vue-good-table
                mode="remote"
                :columns="modalcolumns"
                :rows="modalrows"
                :isLoading:sync="true"
                :pagination-options="{ enabled: false }"
                :sort-options="{ enabled: false }"
              >
                <template #emptystate
                  ><p class="mb-0 text-center">目前尚無資料</p></template
                >
                <template #table-row="props">
                  <span v-if="props.column.field == 'status'">
                    <span>{{ this.statusTransfer[props.row.status] }}</span>
                  </span>
                </template>
              </vue-good-table>
            </div>
          </template>
          <template #cancelBtn> 關閉 </template>
        </Modal>
      </transition>
    </Teleport>
    <!-- 操作結果Modal -->
    <Teleport to="body">
      <transition name="modal-fade">
        <Modal
          v-if="isModalVisible2"
          :showCancelBtn="false"
          :showConfirmBtn="true"
          @close="closeModal2"
          @confirm="confirmModal2"
        >
          <template #header> 提示 </template>
          <template #body>
            <div class="modal-body-padding">{{ responseMessage }}</div>
          </template>
          <template #confirmBtn> 關閉 </template>
        </Modal>
      </transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@import './node_modules/vue-good-table-next/src/styles/style';
</style>

<script>
import { Field, Form } from 'vee-validate';
import { VueGoodTable } from 'vue-good-table-next';
import Modal from '@/components/Modal.vue';
import JsonCSV from '@/components/JsonCSV';
import Select2 from 'vue3-select2-component';
import * as datatable from '@/utilities/datatable';

import store from '@/utilities/store';
import { getDate } from '@/utilities/time';
import { doPost } from '@/utilities/api';
import { generatorCSVname } from '@/utilities/time';

export default {
  name: 'QueryRecord',
  components: { Field, Form, VueGoodTable, Select2, Modal, JsonCSV },
  data() {
    return {
      // 第一次搜尋
      isSearch: false,
      flag: 701,
      // 意見紀錄彈窗
      isModalVisible1: false,
      // 提示訊息彈窗
      isModalVisible2: false,
      responseMessage: '',
      caseIds: [],
      category: [],
      categoryOptions: [],
      applyReason: [],
      reasonList: [],
      archiveUnitId: [],
      archiveUnitList: [],
      applyDate: getDate(),
      startDate: '',
      endDate: '',
      caseNo: '',
      viewCheckBox: false,
      paginationOptions: datatable.paginationOptions,
      columns: [
        { field: 'Id', hidden: true },
        { label: '檢視', field: 'AllowView', sortable: false, width: '150px' },
        {
          label: '業務類別',
          field: 'Category',
          width: '150px',
        },
        {
          label: '歸檔單位',
          field: 'ArchiveUnit',
          width: '150px',
        },
        {
          label: '案件編號',
          field: 'CaseNo',
          width: '150px',
        },
        {
          label: '意見紀錄',
          field: 'Comments',
          sortable: false,
          width: '150px',
        },
        {
          label: '調閱申請日期',
          field: 'ApplyDate',
          width: '200px',
        },
        {
          label: '開啟調閱申請單',
          field: 'ApplyNo',
          width: '150px',
        },
        {
          label: '調閱事由',
          field: 'ApplyReason',
          width: '150px',
        },
        {
          label: '調閱期間',
          field: 'ApplyPeriod',
          width: '150px',
        },
      ],
      rows: [],
      totalRecords: 0,
      modalcolumns: [
        {
          label: '處理單位',
          field: 'unit',
          hidden: false,
        },
        {
          label: '處理人員',
          field: 'user',
          hidden: false,
        },
        {
          label: '意見',
          field: 'comment',
          hidden: false,
        },
        {
          label: '處理狀態',
          field: 'status',
          hidden: false,
        },
        {
          label: '處理時間',
          field: 'dateTime',
          hidden: false,
        },
      ],
      modalrows: [],
      // csv
      labels: {},
      fields: [],
      statusTransfer: {
        0: '申請',
        1: '退回',
        2: '婉拒',
        3: '放行',
        4: '撤銷',
        5: '取件',
        6: '選檔',
        7: '移轉',
        8: '處理',
      },
      userInfo: {}
    };
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  mounted() {
    this.getCategoryList();
    this.getApplyReason();
    if (this.$route.query.Flag == 104) {
      this.flag = parseInt(this.$route.query.Flag);
      this.category = this.$route.query.Category.split(',');
      this.applyDate = this.$route.query.ApplyData;
      this.loadItems();
    }
  },
  methods: {
    getDate,
    generatorCSVname,
    onSubmit() {
      this.loadItems();
    },
    clearQuery() {
      this.category = [];
      this.applyReason = [];
      this.archiveUnitId = [];
      this.applyDate = '';
      this.startDate = '';
      this.endDate = '';
      this.caseNo = '';
      this.rows = [];
    },
    onChangeCategory() {
      const passObj = {
        GlobalUserId: this.userInfo.userId,
        Category: this.category,
        Flag: 701,
      };
      // 取得單位列表
      doPost('/Common/getUnitList', passObj).then((response) => {
        this.archiveUnitList = response;
      });
    },
    // 取得業務類別
    async getCategoryList() {
      const response = await doPost('/Common/GetCategoryList', {
        Flag: 6,
        GlobalUserId: this.userInfo.userId,
      });
      this.categoryOptions = response;
    },
    // 取得調閱事由
    async getApplyReason() {
      const response = await doPost('/ApplyCase/getApplyReasonList', {
        GlobalUserId: this.userInfo.userId,
      });
      this.reasonList = response;
    },
    // 客製表頭勾選(檢視)
    viewMainChange() {
      if (this.viewCheckBox) {
        this.rows.forEach((item) => {
          item.viewValue = true;
        });
      } else {
        this.rows.forEach((item) => {
          item.viewValue = false;
        });
      }
    },
    // 表內勾選框改變動作
    viewChange() {
      // 驗證this.rows是不是每個都已經勾, 如果是把表頭v-mode改成true,反之
      const tempArr = this.rows.filter((item) => item.AllowView === true);
      const checkEvery = tempArr.every((item) => item.viewValue === true);
      if (checkEvery) {
        this.viewCheckBox = true;
      } else {
        this.viewCheckBox = false;
      }
    },
    // 檢視
    handleView() {
      const tempArr = this.rows.filter((item) => item.viewValue === true);
      this.caseIds = [];
      tempArr.forEach((item) => {
        this.caseIds.push(item.Id);
      });
      if (this.caseIds.length == 0) {
        this.responseMessage = '請勾選欲開啟檢視的案件';
        this.showModal2();
        return;
      }
      const passObj = {
        Flag: 702,
        CaseIds: this.caseIds,
        GlobalUserId: this.userInfo.userId,
      };
      // do 檢視api
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
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
    // 轉大寫開頭屬性
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    // 轉成integer array工具
    toIntegerArray(array) {
      if (array.length > 0) {
        let tempArr = array.map((item) => {
          return parseInt(item);
        });
        return tempArr;
      } else {
        return [];
      }
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
      passObj.Data.Flag = this.flag;
      passObj.Data.GlobalUserId = this.userInfo.userId;
      passObj.Data.Categories = this.toIntegerArray(this.category);
      passObj.Data.ArchiveUnitId = this.toIntegerArray(this.archiveUnitId);
      passObj.Data.ApplyDate = this.applyDate;
      passObj.Data.StartDate = this.startDate;
      passObj.Data.EndDate = this.endDate;
      passObj.Data.ReasonId = this.toIntegerArray(this.applyReason);
      passObj.Data.CaseNo = this.caseNo;
      const ds = new Date(this.startDate);
      const de = new Date(this.endDate);
      const timeLimit = 30 * 24 * 60 * 60 * 1000;
      if (ds > de) {
        store.dispatch('setGlobalModalMessage', '結束日期不可小於開始日期');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      if (de - ds > timeLimit) {
        store.dispatch('setGlobalModalMessage', '查詢期間最大範圍為30日');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      this.isSearch = true;
      doPost('/ImageQueryRecord/Query', passObj).then((response) => {
        const { rows, totalRecords } = response;
        this.rows = [];
        // 對資料做Object屬性開頭大寫處理
        rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            tempObj[this.capitalizeFirstLetter(key)] = value;
          }
          this.rows[index] = tempObj;
          // 綁個v-model用
          if (this.rows[index].AllowView) {
            this.rows[index].viewValue = false;
          }
        });
        this.totalRecords = totalRecords;
        // csv setting
        this.columns.forEach((item) => {
          if (
            item.field == 'Id' ||
            item.field == 'Comments' ||
            item.field == 'AllowView'
          ) {
            // do nothing
          } else {
            this.fields.push(item.field);
            this.labels[item.field] = item.label;
          }
        });
      });
    },
    // 另開新頁調閱申請單(不可編輯版)
    handleApplyCase(Id) {
      localStorage.removeItem('GlobalUserId');
      localStorage.setItem('GlobalUserId', this.userInfo.userId);
      const routeData = this.$router.resolve({
        name: 'ApplyCasePage',
        query: { id: Id, editable: false },
      });
      window.open(routeData.href, '_blank');
    },
    handleComments(row) {
      this.modalrows = row.Comments;
      // 開表格
      this.showModal1();
    },
    showModal1() {
      this.isModalVisible1 = true;
    },
    closeModal1() {
      this.isModalVisible1 = false;
    },
    showModal2() {
      this.isModalVisible2 = true;
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    confirmModal2() {
      // do something and close
      setTimeout(() => {
        this.isModalVisible2 = false;
        // do call back?
      }, 500);
    },
  },
};
</script>
