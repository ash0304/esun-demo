<template>
  <div class="mt-4 px-4">
    <Form @submit="onSubmit" v-slot="{ errors }">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">案件一覽表查詢</li>
          <li class="breadcrumb-item active" aria-current="page">
            每日覆核報表
          </li>
        </ol>
      </nav>
      <h2 class="page-title">每日覆核報表</h2>
      <div class="mb-4">
        <!-- 覆核單位 -->
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">覆核單位</span>
          <div class="col-sm-10 p-3">
            <Field
              name="reviewUnit"
              class="form-control"
              placeholder="請選擇覆核單位"
              v-model="reviewUnit"
              as="select"
              :rules="{ required: true }"
              disabled
            >
              <option value="-2">請選擇</option>
              <option
                v-for="option in reviewUnitList"
                :key="option.id"
                :value="option.id"
              >
                {{ option.text }}
              </option>
            </Field>
            <span class="error-msg">{{ errors.reviewUnit }}</span>
          </div>
        </div>
        <!-- 覆核人員 -->
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">覆核人員</span>
          <div class="col-sm-10 p-3">
            <Field
              name="reviewUser"
              class="form-control"
              placeholder="請選擇覆核單位"
              v-model="reviewUser"
              as="select"
            >
              <option value="-2">請選擇</option>
              <option
                v-for="option in reviewUserList"
                :key="option.id"
                :value="option.id"
              >
                {{ option.text }}
              </option>
            </Field>
            <span class="error-msg">{{ errors.reviewUser }}</span>
          </div>
        </div>
        <!-- 應覆核日期 -->
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">應覆核日期</span>
          <div class="col-sm p-3 d-flex align-items-center">
            <div>
              <Field name="expectedReviewStartDate" v-slot="{ field }" :value="isFlag ? '' : getDate(7)">
                <div class="input-group calendar-wrapper w320">
                  <input
                    type="date"
                    class="form-control"
                    placeholder="請選擇應覆核起始日期"
                    v-model="expectedReviewStartDate"
                    v-bind="field"
                  />
                  <span class="calendar">
                    <button
                      class="btn btn-secondary btn-calendar"
                      type="button"
                    >
                      <img class="img-calendar" />
                    </button>
                  </span>
                </div>
              </Field>
              <span class="error-msg">{{
                errors.expectedReviewStartDate
              }}</span>
            </div>
            <div class="mx-3">~</div>
            <div>
              <Field name="expectedReviewEndDate" v-slot="{ field }" :value="isFlag ? '' : getDate()">
                <div class="input-group calendar-wrapper w320">
                  <input
                    type="date"
                    class="form-control"
                    placeholder="請選擇應覆核結束日期"
                    v-model="expectedReviewEndDate"
                    v-bind="field"
                  />
                  <span class="calendar">
                    <button
                      class="btn btn-secondary btn-calendar"
                      type="button"
                    >
                      <img class="img-calendar" />
                    </button>
                  </span>
                </div>
              </Field>
              <span class="error-msg">{{ errors.expectedReviewEndDate }}</span>
            </div>
          </div>
        </div>
        <!-- 實際覆核日期 -->
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">實際覆核日期</span>
          <div class="col-sm p-3 d-flex align-items-center">
            <div>
              <Field name="actualReviewStartDate" v-slot="{ field }">
                <div class="input-group calendar-wrapper w320">
                  <input
                    type="date"
                    class="form-control"
                    placeholder="請選擇實際覆核起始日期"
                    v-model="actualReviewStartDate"
                    v-bind="field"
                  />
                  <span class="calendar">
                    <button
                      class="btn btn-secondary btn-calendar"
                      type="button"
                    >
                      <img class="img-calendar" />
                    </button>
                  </span>
                </div>
              </Field>
              <span class="error-msg">{{ errors.actualReviewStartDate }}</span>
            </div>
            <div class="mx-3">~</div>
            <div>
              <Field name="actualReviewEndDate" v-slot="{ field }">
                <div class="input-group calendar-wrapper w320">
                  <input
                    type="date"
                    class="form-control"
                    placeholder="請選擇實際覆核結束日期"
                    v-model="actualReviewEndDate"
                    v-bind="field"
                  />
                  <span class="calendar">
                    <button
                      class="btn btn-secondary btn-calendar"
                      type="button"
                    >
                      <img class="img-calendar" />
                    </button>
                  </span>
                </div>
              </Field>
              <span class="error-msg">{{ errors.actualReviewEndDate }}</span>
            </div>
          </div>
        </div>
        <div class="input-group row g-0">
          <!-- 覆核狀態 -->
          <span class="col-sm-2 input-group-text py-2 px-4">覆核狀態</span>
          <div class="col-sm-10 p-3">
            <div class="d-flex">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="reviewStatus-all"
                  v-model="reviewStatus"
                  :value="-1"
                  checked
                />
                <label class="form-check-label" for="reviewStatus-all"
                  >全部</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="reviewStatus-0"
                  v-model="reviewStatus"
                  :value="0"
                />
                <label class="form-check-label" for="reviewStatus-0"
                  >未覆核</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="reviewStatus-1"
                  v-model="reviewStatus"
                  :value="1"
                />
                <label class="form-check-label" for="reviewStatus-1"
                  >已覆核</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-primary btn-md w320">查詢</button>
          <button
            v-if="isSearch"
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
        :name="generatorCSVname('每日覆核報表')"
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
        :pagination-options="paginationOptions"
        :sort-options="{ enabled: true }"
      >
        <template #emptystate
          ><p class="mb-0 text-center">目前尚無資料</p></template
        >

        <template #table-row="props">
          <span v-if="props.column.field == 'AllowReview'">
            <span v-if="props.row.AllowReview">
              <button
                type="button"
                class="btn btn-primary btn-xs"
                @click="handleReview(props.row)"
              >
                檢視/覆核
              </button>
            </span>
            <span v-else> </span>
          </span>
          <span v-if="props.column.field == 'Comment'">
            <span v-if="props.row.LessComment">
              <a href="#" @click="handleComment(props.row)">{{
                props.row.LessComment
              }}</a>
            </span>
            <span v-else>
              {{ props.row.Comment }}
            </span>
          </span>
        </template>
      </vue-good-table>
    </div>
    <!-- 備註Modal -->
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
  </div>
</template>

<style lang="scss">
@import './node_modules/vue-good-table-next/src/styles/style';
</style>

<script>
import { Field, Form } from 'vee-validate';
import { VueGoodTable } from 'vue-good-table-next';
import JsonCSV from '@/components/JsonCSV';
import Modal from '@/components/Modal.vue';
import * as datatable from '@/utilities/datatable';

import { generatorCSVname } from '@/utilities/time';
import { getDate } from '@/utilities/time';
import store from '@/utilities/store';
import { doPost } from '@/utilities/api';

export default {
  name: 'DailyReviewReport',
  components: { Field, VueGoodTable, JsonCSV, Form, Modal },
  data() {
    return {
      // 是否存在flag
      isFlag: false,
      // 第一次搜尋
      isSearch: false,
      flag: 801,
      // 備註彈窗
      isModalVisible1: false,
      responseMessage: '',
      reviewUnit: -2,
      reviewUnitList: [],
      reviewUser: -2,
      reviewUserList: [],
      expectedReviewStartDate: getDate(7),
      expectedReviewEndDate: getDate(),
      actualReviewStartDate: '',
      actualReviewEndDate: '',
      reviewStatus: 0,
      statusTransfer: {
        0: '未覆核',
        1: '已覆核',
      },
      paginationOptions: datatable.paginationOptions,
      columns: [
        { field: 'id', hidden: true },
        {
          label: '覆核單位',
          field: 'ReviewUnit',
          width: '150px',
        },
        {
          label: '批號',
          field: 'BatchNo',
          width: '150px',
        },
        {
          label: '應覆核日期',
          field: 'ExpectedReviewDate',
          width: '150px',
        },
        {
          label: '實際覆核日期',
          field: 'ActualReviewDate',
          width: '150px',
        },
        {
          label: '覆核人員',
          field: 'ReviewUser',
          width: '150px',
        },
        {
          label: '點我處理',
          field: 'AllowReview',
          width: '150px',
        },
        {
          label: '覆核狀態',
          field: 'Status',
          width: '150px',
        },
        {
          label: '備註',
          field: 'Comment',
          width: '150px',
        },
      ],
      rows: [],
      tempRows: [],
      // csv
      labels: {},
      fields: [],
      totalRecords: 0,
      userInfo: {}
    };
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  mounted() {
    this.getUnitList();
    this.getUserList();
    if (this.$route.query.Flag) {
      this.expectedReviewStartDate = '';
      this.expectedReviewEndDate = '';
      this.isFlag = true;
      this.flag = parseInt(this.$route.query.Flag);
      this.reviewUnit = this.$route.query.OperatorUnitId;
      this.reviewStatus = parseInt(this.$route.query.Status);
      this.loadItems();
    }
  },
  methods: {
    generatorCSVname,
    getDate,
    onSubmit() {
      this.loadItems();
    },
    clearQuery() {
      this.reviewUnit = -2;
      this.reviewUser = -2;
      this.expectedReviewStartDate = getDate(7);
      this.expectedReviewEndDate = getDate();
      this.actualReviewStartDate = '';
      this.actualReviewEndDate = '';
      this.reviewStatus = 1;
      this.rows = [];
    },
    getUnitList() {
      const passObj = {
        GlobalUserId: this.userInfo.userId,
        Flag: 801,
      };
      // 取得單位列表
      doPost('/Common/GetUnitList', passObj).then((response) => {
        this.reviewUnit = this.userInfo.unitId;
        this.reviewUnitList = response;
      });
    },
    getUserList() {
      const passObj = {
        GlobalUserId: this.userInfo.userId,
        Flag: 801,
      };
      // 取得單位列表
      doPost('/Common/GetUserList', passObj).then((response) => {
        this.reviewUserList = response;
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
      passObj.Data.GlobalUserId = this.userInfo.userId;
      passObj.Data.Flag = this.flag;
      passObj.Data.ReviewUnit = this.reviewUnit;
      passObj.Data.ReviewUser = this.reviewUser;
      passObj.Data.ExpectedReviewStartDate = this.expectedReviewStartDate;
      passObj.Data.ExpectedReviewEndDate = this.expectedReviewEndDate;
      passObj.Data.ActualReviewStartDate = this.actualReviewStartDate;
      passObj.Data.ActualReviewEndDate = this.actualReviewEndDate;
      passObj.Data.ReviewStatus = this.reviewStatus;
      const expectds = new Date(this.expectedReviewStartDate);
      const expectde = new Date(this.expectedReviewEndDate);
      const actualds = new Date(this.actualReviewStartDate);
      const actualde = new Date(this.actualReviewEndDate);
      const timeLimit = 30 * 24 * 60 * 60 * 1000;
      if (expectds > expectde) {
        store.dispatch('setGlobalModalMessage', '結束日期不可小於開始日期');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      if (expectde - expectds > timeLimit) {
        store.dispatch('setGlobalModalMessage', '查詢期間最大範圍為30日');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      if (actualds > actualde) {
        store.dispatch('setGlobalModalMessage', '結束日期不可小於開始日期');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      if (actualde - actualds > timeLimit) {
        store.dispatch('setGlobalModalMessage', '查詢期間最大範圍為30日');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      this.isSearch = true;
      doPost('/DailyReviewReport/Query', passObj).then((response) => {
        const { rows, totalRecords } = response;
        this.rows = [];
        // 對資料做Object屬性開頭大寫處理
        rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            if (key == 'status') {
              tempObj[this.capitalizeFirstLetter(key)] =
                this.statusTransfer[value];
            } else {
              tempObj[this.capitalizeFirstLetter(key)] = value;
            }
          }
          this.rows[index] = tempObj;
          if (this.rows[index].Comment) {
            if (this.rows[index].Comment.length >= 20) {
              this.rows[index].LessComment = `${this.rows[index].Comment.slice(
                0,
                20
              )}...`;
            }
          }
        });
        this.totalRecords = totalRecords;
        // csv隱碼處理
        this.tempRows = [];
        // deep copy
        this.tempRows = JSON.parse(JSON.stringify(this.rows));
        this.tempRows.forEach((item) => {
          const ObjKeys = Object.keys(item);
          ObjKeys.forEach((i, d) => {
            if (ObjKeys[d].includes('User')) {
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
          if (item.field == 'Id' || item.field == 'AllowReview') {
            // do nothing
          } else {
            this.fields.push(item.field);
            this.labels[item.field] = item.label;
          }
        });
      });
    },
    handleReview(row) {
      localStorage.removeItem('GlobalUserId');
      localStorage.setItem('GlobalUserId', this.userInfo.userId);
      const routeData = this.$router.resolve({
        name: 'ReviewPage',
        query: { id: row.Id },
      });
      window.open(routeData.href, '_blank');
    },
    handleComment(row) {
      this.responseMessage = row.Comment;
      this.showModal1();
    },
    showModal1() {
      this.isModalVisible1 = true;
    },
    closeModal1() {
      this.isModalVisible1 = false;
    },
    confirmModal1() {
      // do something and close
      setTimeout(() => {
        this.isModalVisible1 = false;
      }, 500);
    },
  },
};
</script>
