<template>
  <div class="mt-4 px-4">
    <Form @submit="onSubmit">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">案件一覽表查詢</li>
          <li class="breadcrumb-item active" aria-current="page">
            待補案件查詢
          </li>
        </ol>
      </nav>
      <h2 class="page-title">待補案件查詢</h2>
      <div class="mb-4">
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">業務類別</span>
          <div class="col-sm-4 p-3">
            <Field
              name="category"
              class="form-control"
              placeholder="請選擇業務類別"
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
            <span v-if="categoryErrorMsg" class="error-msg">{{
              categoryErrorMsg
            }}</span>
          </div>
          <span class="col-sm-2 input-group-text py-2 px-4">案件編號</span>
          <div class="col-sm-4 p-3">
            <Field
              type="text"
              name="caseNo"
              class="form-control"
              placeholder="請輸入案件編號"
              v-model="caseId"
            />
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4"
            >待補申請單編號</span
          >
          <div class="col-sm-4 p-3">
            <Field
              type="text"
              name="pendingUploadedNo"
              class="form-control"
              placeholder="請輸入待補申請單編號"
              v-model="pendingUploadedNo"
            />
          </div>
          <span class="col-sm-2 input-group-text py-2 px-4">待補申請單位</span>
          <div class="col-sm-4 p-3">
            <Field
              name="pendingUploadedUnit"
              class="form-control"
              placeholder="請選擇待補申請單位"
              v-model="unitId"
              as="select"
            >
              <option value="-2">請選擇</option>
              <option
                v-for="option in unitList"
                :key="option.id"
                :value="option.id"
              >
                {{ option.text }}
              </option>
            </Field>
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">待補申請人員</span>
          <div class="col-sm-4 p-3">
            <Field
              name="pendingUploadedUser"
              class="form-control"
              placeholder="請選擇待補申請人員"
              v-model="userId"
              as="select"
            >
              <option value="-2">請選擇</option>
              <option
                v-for="option in userList"
                :key="option.id"
                :value="option.id"
              >
                {{ option.text }}
              </option>
            </Field>
          </div>
          <span class="col-sm-2 input-group-text py-2 px-4">待補負責人員</span>
          <div class="col-sm-4 p-3">
            <Field
              name="pendingUploadedHandler"
              class="form-control"
              placeholder="請選擇待補負責人員"
              v-model="operatorId"
              as="select"
            >
              <option value="-2">請選擇</option>
              <option
                v-for="option in userList"
                :key="option.id"
                :value="option.id"
              >
                {{ option.text }}
              </option>
            </Field>
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">待補申請日期</span>
          <div class="col-sm-4 p-3 d-flex align-items-center">
            <div class="input-group calendar-wrapper w220">
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
            <div class="input-group calendar-wrapper w220">
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
          <span class="col-sm-2 input-group-text py-2 px-4"
            >待補申請單狀態</span
          >
          <div class="col-sm-4 p-3">
            <Field
              name="status"
              class="form-control"
              placeholder="請選擇待補申請單狀態"
              v-slot="{ field }"
            >
              <Select2
                placeholder="請選擇"
                v-model="status"
                v-bind="field"
                :options="statusListOptions"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
                @select="onChangeStatus"
              />
            </Field>
            <span v-if="statusErrorMsg" class="error-msg">{{
              statusErrorMsg
            }}</span>
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
        :data="tempRows"
        :labels="labels"
        :fields="fields"
        :name="generatorCSVname('待補案件查詢')"
      ></JsonCSV>
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
          <span v-if="props.column.field == 'AllowOpen'">
            <span v-if="props.row.AllowOpen">
              <button
                type="button"
                class="btn btn-primary btn-xs w180"
                @click="handlePendingApplyCase(props.row)"
              >
                開啟待補申請單
              </button>
            </span>
            <span v-else>
              <button
                type="button"
                class="btn btn-primary btn-xs w180"
                disabled
              >
                開啟待補申請單
              </button>
            </span>
          </span>
        </template>
      </vue-good-table>
    </div>
    <!-- 待補申請單Modal -->
    <Teleport to="body">
      <transition name="modal-fade">
        <Modal
          v-if="isModalVisible1"
          :showCancelBtn="false"
          :showConfirmBtn="false"
          @close="closeModal1"
        >
          <template #header> 待補申請單 </template>
          <template #body>
            <div class="modal-body-padding custom">
              <div class="mb-2 text-end">
                <button
                  v-if="
                    userInfo.userId == pendingModalObj.operatorId &&
                    pendingModalObj.pendingUploadedStatus == '處理中'
                  "
                  type="button"
                  class="btn btn-md btn-secondary me-3 w100"
                  @click="cancelCase"
                >
                  銷案
                </button>
                <button
                  v-if="
                    userInfo.userId == pendingModalObj.operatorId &&
                    pendingModalObj.pendingUploadedStatus == '處理中'
                  "
                  type="button"
                  class="btn btn-md btn-secondary me-3 w125"
                  @click="pendingOrView"
                >
                  檢視/補件
                </button>
                <button
                  v-if="pendingModalObj.canReview"
                  type="button"
                  class="btn btn-md btn-secondary me-3 w180"
                  @click="rightTransfer"
                >
                  處理權移轉
                </button>
                <button
                  v-if="
                    userInfo.userId == pendingModalObj.operatorId &&
                    pendingModalObj.pendingUploadedStatus == '覆核中'
                  "
                  type="button"
                  class="btn btn-md btn-secondary me-3 w100"
                  @click="returnCase"
                >
                  退回
                </button>
                <button
                  v-if="
                    userInfo.userId == pendingModalObj.operatorId &&
                    pendingModalObj.pendingUploadedStatus == '覆核中'
                  "
                  type="button"
                  class="btn btn-md btn-secondary me-3 w125"
                  @click="viewOrEndCase"
                >
                  檢視/結案
                </button>
              </div>
              <div class="mb-2">
                待補申請單單號: {{ pendingModalObj.pendingUploadedNo }}
              </div>
              <div>
                <div class="input-group border-bottom-0 row g-0">
                  <span class="col-sm-3 input-group-text py-2 px-4"
                    >待補申請單位</span
                  >
                  <div class="col-sm-9 p-3">
                    <span>{{ pendingModalObj.pendingUploadedUnit }}</span>
                  </div>
                </div>
                <div class="input-group border-bottom-0 row g-0">
                  <span class="col-sm-3 input-group-text py-2 px-4"
                    >待補申請人員</span
                  >
                  <div class="col-sm-9 p-3">
                    <span>{{ pendingModalObj.pendingUploadedUser }}</span>
                  </div>
                </div>
                <div class="input-group border-bottom-0 row g-0">
                  <span class="col-sm-3 input-group-text py-2 px-4"
                    >待補負責人員</span
                  >
                  <div class="col-sm-9 p-3">
                    <span>{{ pendingModalObj.pendingUploadedOperator }}</span>
                  </div>
                </div>
                <div class="input-group border-bottom-0 row g-0">
                  <span class="col-sm-3 input-group-text py-2 px-4"
                    >待補申請日期</span
                  >
                  <div class="col-sm-9 p-3">
                    <span>{{ pendingModalObj.pendingUploadedDate }}</span>
                  </div>
                </div>
                <div class="input-group border-bottom-0 row g-0">
                  <span class="col-sm-3 input-group-text py-2 px-4"
                    >業務類別</span
                  >
                  <div class="col-sm-9 p-3">
                    <span>{{ pendingModalObj.category }}</span>
                  </div>
                </div>
                <div class="input-group border-bottom-0 row g-0">
                  <span class="col-sm-3 input-group-text py-2 px-4"
                    >待補事由</span
                  >
                  <div class="col-sm-9 p-3">
                    <span>{{ pendingModalObj.pendingUploadedReason }}</span>
                  </div>
                </div>
                <div class="input-group row g-0">
                  <span class="col-sm-3 input-group-text py-2 px-4"
                    >補件資訊</span
                  >
                  <div class="col-sm-9 p-3">
                    <span>{{ pendingModalObj.endingUploadedStatus }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
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
    <!-- 轉移人員 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <Modal
          v-if="isModalVisible3"
          :showCancelBtn="true"
          :showConfirmBtn="true"
          @close="closeModal3"
          @confirm="confirmModal3"
        >
          <template #header> 提示 </template>
          <template #body>
            <div class="modal-body-padding custom">
              <div class="input-group border-bottom-0 row g-0">
                <span class="col-sm-2 input-group-text py-2 px-4">{{
                  generatorString('title')
                }}</span>
                <div class="col-sm-10 p-3">
                  <Field
                    name="transfer"
                    class="form-control my-1"
                    placeholder=""
                    v-model="transfer"
                    as="select"
                    @change="transferChange"
                  >
                    <option value="-2" disabled>
                      {{ generatorString('placeholder') }}
                    </option>
                    <option
                      v-for="item in transferOptions"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.text }}
                    </option>
                  </Field>
                  <span v-if="transferErrMsg" class="error-msg">{{
                    transferErrMsg
                  }}</span>
                </div>
              </div>
            </div>
          </template>
          <template #cancelBtn> 取消 </template>
          <template #confirmBtn> 傳送 </template>
        </Modal>
      </transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@import './node_modules/vue-good-table-next/src/styles/style';
.custom {
  text-align: left;
  font-size: 16px;
  line-height: 1.2;
  .error-msg {
    font-size: 16px;
  }
  &.modal-body-padding {
    padding: 40px 60px 20px;
  }
}
</style>

<script>
import { Field, Form } from 'vee-validate';
import * as datatable from '@/utilities/datatable';
import { VueGoodTable } from 'vue-good-table-next';
import Select2 from 'vue3-select2-component';
import JsonCSV from '@/components/JsonCSV';
import Modal from '@/components/Modal.vue';

import store from '@/utilities/store';
import { getDate } from '@/utilities/time';
import { generatorCSVname } from '@/utilities/time';
import { doPost } from '../../utilities/api';

export default {
  name: 'PendingUploadedCase',
  components: { Form, Field, Select2, VueGoodTable, JsonCSV, Modal },
  data() {
    return {
      categoryErrorMsg: '',
      statusErrorMsg: '',
      buttonType: 0,
      // 第一次搜尋
      isSearch: false,
      flag: 1101,
      category: [],
      categoryOptions: [],
      caseId: '',
      pendingUploadedNo: '',
      unitId: -2,
      userId: -2,
      operatorId: -2,
      startDate: getDate(7),
      endDate: getDate(),
      status: [],
      unitList: [],
      userList: [],
      statusListOptions: [
        {
          id: 0,
          text: '處理中',
        },
        {
          id: 1,
          text: '覆核中',
        },
        {
          id: 2,
          text: '補件完成',
        },
        {
          id: 3,
          text: '補件銷案',
        },
      ],
      pendingUploadedStatusTransfer: {
        0: '處理中',
        1: '覆核中',
        2: '補件完成',
        3: '補件銷案',
      },
      // 待補申請單彈窗
      isModalVisible1: false,
      pendingModalObj: {},
      // 操作結果彈窗
      isModalVisible2: false,
      responseMessage: '',
      // 意見+傳送彈窗
      isModalVisible3: false,
      currentFormId: 0,
      transfer: -2,
      transferText: '',
      transferErrMsg: '',
      transferOptions: [],
      // table
      paginationOptions: datatable.paginationOptions,
      totalRecords: 0,
      columns: [
        {
          label: '',
          field: 'Id',
          hidden: true,
          sortable: false,
        },
        {
          label: '點我處理',
          field: 'AllowOpen',
          hidden: false,
          sortable: false,
          width: '150px',
        },
        {
          label: '業務類別',
          field: 'Category',
          hidden: false,
          width: '150px',
        },
        {
          label: '案件編號',
          field: 'CaseNo',
          hidden: false,
          width: '150px',
        },
        {
          label: '待補申請單單號',
          field: 'PendingUploadedNo',
          hidden: false,
          width: '150px',
        },
        {
          label: '待補申請單位',
          field: 'PendingUploadedUnit',
          hidden: false,
          width: '150px',
        },
        {
          label: '待補申請人員',
          field: 'PendingUploadedUser',
          hidden: false,
          width: '150px',
        },
        {
          label: '待補負責人員',
          field: 'PendingUploadedOperator',
          hidden: false,
          width: '150px',
        },
        {
          label: '待補申請日期',
          field: 'PendingUploadedDate',
          hidden: false,
          width: '150px',
        },
        {
          label: '待補理由',
          field: 'PendingUploadedReason',
          hidden: false,
          width: '150px',
        },
        {
          label: '處理人員',
          field: 'Operator',
          hidden: false,
          width: '150px',
        },
        {
          label: '待補申請單狀態',
          field: 'PendingUploadedStatus',
          hidden: false,
          width: '150px',
        },
      ],
      rows: [],
      tempRows: [],
      // csv
      fields: [],
      labels: [],
      userInfo: {}
    };
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  mounted() {
    this.getCategoryList();
    this.getInitSearchData();
    if (this.$route.query.Flag) {
      this.startDate = '';
      this.endDate = '';
      this.flag = parseInt(this.$route.query.Flag);
      this.category = this.$route.query.Category.split(',');
      if (this.$route.query.UserId) {
        this.userId = this.$route.query.UserId;
      }
      if (this.$route.query.OperatorUnitId) {
        this.unitId = this.$route.query.OperatorUnitId;
      }
      this.status = this.$route.query.Status.split(',');
      this.loadItems();
    }
  },
  methods: {
    generatorCSVname,
    generatorString(target) {
      if (target == 'title') {
        if (this.buttonType == 1) {
          return '覆核人員';
        } else {
          if (this.pendingModalObj.pendingUploadedStatus == '處理中') {
            return '處理人員';
          } else {
            return '覆核人員';
          }
        }
      } else if (target == 'placeholder') {
        if (this.buttonType == 1) {
          return '請選擇欲覆核之人員';
        } else {
          if (this.pendingModalObj.pendingUploadedStatus == '處理中') {
            return '請選擇欲處理之人員';
          } else {
            return '請選擇欲覆核之人員';
          }
        }
      }
    },
    onSubmit() {
      this.loadItems();
    },
    clearQuery() {
      this.category = [];
      this.caseId = '';
      this.pendingUploadedNo = '';
      this.unitId = -2;
      this.userId = -2;
      this.operatorId = -2;
      this.startDate = getDate(7);
      this.endDate = getDate();
      this.status = [];
      this.rows = [];
    },
    // 取得
    async getInitSearchData() {
      const response = await doPost('/PendingUploadedCase/QueryInitData', {
        GlobalUserId: this.userInfo.userId,
      });
      const { unitList, userList } = response;
      this.unitList = unitList;
      this.userList = userList;
    },
    // 取得業務類別
    async getCategoryList() {
      const response = await doPost('/Common/GetCategoryList', {
        Flag: 1101,
        GlobalUserId: this.userInfo.userId,
      });
      this.categoryOptions = response;
    },
    onChangeCategory() {
      if (!this.category || !this.category.length) {
        this.categoryErrorMsg = '請填寫此欄位';
      } else {
        this.categoryErrorMsg = '';
      }
    },
    onChangeStatus() {
      if (!this.status || !this.status.length) {
        this.statusErrorMsg = '請填寫此欄位';
      } else {
        this.statusErrorMsg = '';
      }
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
      if (!this.category || !this.category.length) {
        this.categoryErrorMsg = '請填寫此欄位';
        return;
      }
      if (!this.status || !this.status.length) {
        this.statusErrorMsg = '請填寫此欄位';
        return;
      }
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
      passObj.Data.GlobalUserId = this.userInfo.userId;
      passObj.Data.Flag = this.flag;
      passObj.Data.Categories = this.toIntegerArray(this.category);
      passObj.Data.CaseId = this.caseId;
      passObj.Data.PendingUploadedNo = this.pendingUploadedNo;
      passObj.Data.UnitId = this.unitId;
      passObj.Data.UserId = this.userId;
      passObj.Data.OperatorId = this.operatorId;
      passObj.Data.StartDate = this.startDate;
      passObj.Data.EndDate = this.endDate;
      passObj.Data.StatusList = this.toIntegerArray(this.status);
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
      doPost('/PendingUploadedCase/Query', passObj).then((response) => {
        console.log('response', response);
        const { rows, totalRecords } = response;
        this.rows = [];
        // 對資料做Object屬性開頭大寫處理
        rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            if (key == 'pendingUploadedStatus') {
              tempObj[this.capitalizeFirstLetter(key)] =
                this.pendingUploadedStatusTransfer[value];
            } else {
              tempObj[this.capitalizeFirstLetter(key)] = value;
            }
          }
          this.rows[index] = tempObj;
        });
        this.totalRecords = totalRecords;
        // csv隱碼處理
        this.tempRows = [];
        // deep copy
        this.tempRows = JSON.parse(JSON.stringify(this.rows));
        this.tempRows.forEach((item) => {
          const ObjKeys = Object.keys(item);
          ObjKeys.forEach((i, d) => {
            if (
              ObjKeys[d].includes('User') ||
              ObjKeys[d].includes('PendingUploadedOperator') ||
              ObjKeys[d].includes('Operator')
            ) {
              const str = item[ObjKeys[d]];
              if (str) {
                const temp = str.split(' ');
                const code = temp[0];
                const targetArr = temp[1].split('');
                targetArr[1] = '*';
                const result = targetArr.join('');
                item[ObjKeys[d]] = `${code} ${result}`;
              }
            }
          });
        });
        // csv setting處理
        this.columns.forEach((item) => {
          if (item.field == 'Id' || item.field == 'AllowOpen') {
            // do nothing
          } else {
            this.fields.push(item.field);
            this.labels[item.field] = item.label;
          }
        });
      });
    },
    handlePendingApplyCase(row) {
      this.currentFormId = row.Id;
      const passObj = {
        GlobalUserId: this.userInfo.userId,
        FormId: this.currentFormId,
      };
      doPost('/PendingUploadedCase/QueryDetail', passObj).then((response) => {
        this.pendingModalObj = response;
        this.pendingModalObj.pendingUploadedStatus =
          this.pendingUploadedStatusTransfer[
            this.pendingModalObj.pendingUploadedStatus
          ];
        console.log(this.pendingModalObj);
      });
      this.showModal1();
    },
    transferChange() {
      if (!this.transfer || this.transfer == '-2') {
        this.transferErrMsg = '請填寫此欄位';
      } else {
        this.transferErrMsg = '';
        this.transferText = this.transferOptions.filter(
          (item) => item.id == this.transfer
        )[0].text;
      }
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
      this.responseMessage = '';
      this.transfer = -2;
      this.isModalVisible2 = false;
    },
    showModal3() {
      this.isModalVisible3 = true;
    },
    closeModal3() {
      this.isModalVisible3 = false;
    },
    confirmModal3() {
      if (!this.transfer || this.transfer == '-2') {
        this.transferErrMsg = '請填寫此欄位';
        return;
      }
      if (this.buttonType == 2) {
        const passObj = {
          GlobalUserId: this.userInfo.userId,
          PendingUploadedFormId: this.currentFormId,
          NextOperatorUserId: this.transfer,
        };
        doPost('/PendingUploadedCase/ReassignOperator', passObj).then(
          (response) => {
            if (response) {
              this.responseMessage = `案件已移轉予${this.transferText}處理`;
              this.showModal2();
            }
            this.isModalVisible1 = false;
            this.isModalVisible3 = false;
          }
        );
      } else {
        const passObj = {
          GlobalUserId: this.userInfo.userId,
          PendingUploadedFormId: this.currentFormId,
          NextOperatorUserId: this.transfer,
        };
        doPost('/PendingUploadedCase/Cancel', passObj).then((response) => {
          if (response) {
            this.responseMessage = `待補申請單單號(${this.pendingModalObj.caseNo})已傳送成功!`;
            this.isModalVisible1 = false;
            this.showModal2();
          }
          this.isModalVisible1 = false;
          this.isModalVisible3 = false;
        });
      }
    },
    // 銷案
    cancelCase() {
      this.buttonType = 1;
      const passObj = {
        GlobalUserId: this.userInfo.userId,
        PendingUploadedFormId: this.currentFormId,
        HierarchyId: this.pendingModalObj.categoryId,
        ButtonType: this.buttonType,
      };
      doPost('/PendingUploadedCase/GetOperatorList', passObj).then(
        (response) => {
          if (response || response.length > 0) {
            this.transferOptions = response;
            this.showModal3();
          }
        }
      );
    },
    // 檢視/補件
    pendingOrView() {
      const passObj = {
        Flag: 1102,
        GlobalUserId: this.userInfo.userId,
        PendingUploadedFormId: this.currentFormId,
        CaseIds: [this.pendingModalObj.caseId],
      };
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    },
    // 處理權移轉
    rightTransfer() {
      this.buttonType = 2;
      const passObj = {
        GlobalUserId: this.userInfo.userId,
        PendingUploadedFormId: this.currentFormId,
        HierarchyId: this.pendingModalObj.categoryId,
        ButtonType: this.buttonType,
      };
      doPost('/PendingUploadedCase/GetOperatorList', passObj).then(
        (response) => {
          if (response || response.length > 0) {
            this.transferOptions = response;
            this.showModal3();
          }
        }
      );
    },
    // 退回
    returnCase() {
      this.buttonType = 0;
      const passObj = {
        GlobalUserId: this.userInfo.userId,
        PendingUploadedFormId: this.currentFormId,
        NextOperatorUserId: 0,
      };
      doPost('/PendingUploadedCase/Reject', passObj).then((response) => {
        if (response) {
          // 帶補成功訊息
          this.isModalVisible1 = false;
        }
      });
    },
    // 檢視/結案
    viewOrEndCase() {
      const passObj = {
        Flag: 1103,
        GlobalUserId: this.userInfo.userId,
        PendingUploadedFormId: this.currentFormId,
        CaseIds: [this.pendingModalObj.caseId],
      };
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    },
  },
};
</script>
