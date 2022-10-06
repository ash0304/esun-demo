<template>
  <div class="mt-4 px-4">
    <Form ref="form" @submit="onSubmit">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">案件一覽表查詢</li>
          <li class="breadcrumb-item active" aria-current="page">
            調閱申請單查詢
          </li>
        </ol>
      </nav>
      <h2 class="page-title">調閱申請單查詢</h2>
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
          <span class="col-sm-2 input-group-text py-2 px-4"
            >調閱申請單單號</span
          >
          <div class="col-sm-4 p-3">
            <Field
              type="text"
              name="applyNo"
              class="form-control"
              placeholder="請輸入調閱申請單單號"
              v-model="applyNo"
            />
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">調閱申請單位</span>
          <div class="col-sm-4 p-3">
            <Field
              name="applyUnit"
              class="form-control"
              placeholder="請選擇調閱申請單位"
              v-slot="{ field }"
            >
              <Select2
                placeholder="請選擇"
                v-model="applyUnit"
                v-bind="field"
                :options="unitList"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
                @select="applyUnitChange()"
              />
            </Field>
          </div>
          <span class="col-sm-2 input-group-text py-2 px-4">申請角色</span>
          <div class="col-sm-4 p-3">
            <Field
              name="applyUser"
              class="form-control"
              placeholder="請選擇申請角色"
              v-slot="{ field }"
            >
              <Select2
                placeholder="請選擇"
                v-model="applyRole"
                v-bind="field"
                :options="roleList"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
              />
            </Field>
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">歸檔單位</span>
          <div class="col-sm-4 p-3">
            <Field
              name="archiveUnit"
              class="form-control"
              placeholder="請選擇歸檔單位"
              v-slot="{ field }"
            >
              <Select2
                v-if="unitList"
                placeholder="請選擇"
                v-model="archiveUnit"
                v-bind="field"
                :options="unitList"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
              />
            </Field>
          </div>
          <span class="col-sm-2 input-group-text py-2 px-4">調閱申請人員</span>
          <div class="col-sm-4 p-3">
            <Field
              name="applyUser"
              class="form-control"
              placeholder="請選擇調閱申請人員"
              v-slot="{ field }"
            >
              <Select2
                placeholder="請選擇"
                v-model="applyUser"
                v-bind="field"
                :options="showUserList"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
              />
            </Field>
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">調閱申請日期</span>
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
          <span class="col-sm-2 input-group-text py-2 px-4">調閱事由</span>
          <div class="col-sm-4 p-3">
            <Field
              name="applyReason"
              class="form-control"
              placeholder="請選擇調閱事由"
              v-slot="{ field }"
            >
              <Select2
                placeholder="請選擇"
                v-model="applyReason"
                v-bind="field"
                :options="reasonList"
                :settings="{ language: { noResults: () => '無符合結果' } }"
              />
            </Field>
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">處理單位</span>
          <div class="col-sm-4 p-3">
            <Field
              name="operatorUnit"
              class="form-control"
              placeholder="請選擇處理單位"
              v-slot="{ field }"
            >
              <Select2
                placeholder="請選擇"
                v-model="operatorUnit"
                v-bind="field"
                :options="unitList"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
                @select="operatorUnitChange()"
              />
            </Field>
          </div>
          <span class="col-sm-2 input-group-text py-2 px-4">處理人員</span>
          <div class="col-sm-4 p-3">
            <Field
              name="operatorUser"
              class="form-control"
              placeholder="請選擇處理人員"
              v-slot="{ field }"
            >
              <Select2
                placeholder="請選擇"
                v-model="operatorUser"
                v-bind="field"
                :options="showOperatorList"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
              />
            </Field>
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4"
            >調閱單案件狀態</span
          >
          <div class="col-sm-4 p-3">
            <Field
              name="caseStatus"
              class="form-control"
              placeholder="請選擇調閱單案件狀態"
              v-slot="{ field }"
            >
              <Select2
                placeholder="請選擇"
                v-model="caseStatus"
                v-bind="field"
                :options="caseStatusList"
                :settings="{
                  multiple: true,
                  language: { noResults: () => '無符合結果' },
                }"
              />
            </Field>
          </div>
          <span class="col-sm-2 input-group-text py-2 px-4">案件編號</span>
          <div class="col-sm-4 p-3">
            <Field
              type="text"
              name="caseNo"
              class="form-control"
              placeholder="請輸入案件編號"
              v-model="caseNo"
            />
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4"
            >調閱申請單狀態</span
          >
          <div class="col-sm-10 p-3">
            <div class="d-flex">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="reviewStatus-all"
                  v-model="status"
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
                  id="reviewStatus-pendingReview"
                  v-model="status"
                  :value="0"
                />
                <label class="form-check-label" for="reviewStatus-pendingReview"
                  >尚有調閱案件處理中</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="reviewStatus-pass"
                  v-model="status"
                  :value="1"
                />
                <label class="form-check-label" for="reviewStatus-pass"
                  >全數調閱案件已結案</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="reviewStatus-reject"
                  v-model="status"
                  :value="2"
                />
                <label class="form-check-label" for="reviewStatus-reject"
                  >銷案</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-primary btn-md w320">查詢</button>
          <button
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
        :name="generatorCSVname('調閱申請單查詢')"
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
                @click="handleApplyCase(props.row.Id)"
              >
                開啟調閱申請單
              </button>
            </span>
            <span v-else>
              <button
                type="button"
                class="btn btn-secondary btn-xs w180"
                disabled
              >
                開啟調閱申請單
              </button>
            </span>
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<style lang="scss">
@import './node_modules/vue-good-table-next/src/styles/style';
</style>

<script>
import { Field, Form } from 'vee-validate';
import * as datatable from '@/utilities/datatable';
import { VueGoodTable } from 'vue-good-table-next';
import Select2 from 'vue3-select2-component';
import JsonCSV from '@/components/JsonCSV';

import { generatorCSVname } from '@/utilities/time';
import { doPost } from '../../utilities/api';
// import store from '@/utilities/store';

export default {
  name: 'ApplyCase',
  components: { Form, Field, VueGoodTable, Select2, JsonCSV },
  data() {
    return {
      categoryErrorMsg: '',
      isSearch: false,
      isLoadingVisible: false,
      scanCheck: '系統未偵測到Scan Agent! 請至玉山安裝專區，下載安裝',
      flag: 1001,
      category: '',
      categoryOptions: [],
      roleList: [],
      unitList: [],
      userList: [],
      showUserList: [],
      showOperatorList: [],
      reasonList: [],
      caseStatusList: [
        { id: 0, text: '覆核中' },
        { id: 1, text: '待取件' },
        { id: 2, text: '分派中' },
        { id: 3, text: '選檔中' },
        { id: 4, text: '已通過' },
        { id: 5, text: '已婉拒' },
        { id: 6, text: '銷案' },
        { id: 7, text: '待處理' },
      ],
      applyStatusTransfer: {
        0: '尚有調閱案件處理中',
        1: '全數調閱案件已結案',
        2: '銷案',
      },
      caseStatusTransfer: {
        0: '覆核中',
        1: '待取件',
        2: '分派中',
        3: '選檔中',
        4: '已通過',
        5: '已婉拒',
        6: '銷案',
        7: '待處理',
      },
      isModalVisible: false,
      scanViewerUrl: '',
      applyNo: '',
      applyUnit: [],
      applyRole: [],
      archiveUnit: [],
      applyUser: [],
      startDate: '',
      endDate: '',
      applyReason: 0,
      operatorUnit: [],
      operatorUser: [],
      caseStatus: [],
      caseNo: '',
      status: -1,
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
          label: '調閱申請單單號',
          field: 'ApplyNo',
          hidden: false,
          width: '150px',
        },
        {
          label: '業務類別',
          field: 'Category',
          hidden: false,
          width: '150px',
        },
        {
          label: '調閱申請單位',
          field: 'ApplyUnit',
          hidden: false,
          width: '150px',
        },
        {
          label: '調閱申請人員',
          field: 'ApplyUser',
          hidden: false,
          width: '150px',
        },
        {
          label: '申請角色',
          field: 'ApplyRole',
          hidden: false,
          width: '150px',
        },
        {
          label: '調閱申請日期',
          field: 'ApplyDate',
          hidden: false,
          width: '150px',
        },
        {
          label: '調閱期間',
          field: 'ApplyPeriod',
          hidden: false,
          width: '150px',
        },
        {
          label: '調閱事由',
          field: 'ApplyReason',
          hidden: false,
          width: '150px',
        },
        {
          label: '調閱申請單狀態',
          field: 'ApplyStatus',
          hidden: false,
          width: '200px',
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
  },
  methods: {
    generatorCSVname,
    applyUnitChange() {
      if (this.applyUnit.length > 0) {
        const tempArr = this.userList.filter((item) => {
          return this.applyUnit.indexOf(`${item.parentId}`) !== -1;
        });
        this.showUserList = tempArr;
      } else {
        this.showUserList = this.userList;
      }
    },
    operatorUnitChange() {
      if (this.operatorUnit.length > 0) {
        const tempArr = this.userList.filter((item) => {
          return this.operatorUnit.indexOf(`${item.parentId}`) !== -1;
        });
        this.showOperatorList = tempArr;
      } else {
        this.showOperatorList = this.userList;
      }
    },
    getCategoryList() {
      doPost('/Common/GetCategoryList', {
        Flag: 1001,
        GlobalUserId: this.userInfo.userId,
      }).then((response) => {
        this.categoryOptions = response;
        this.queryInitData();
      });
    },
    onChangeCategory() {
      if (!this.category || !this.category.length) {
        this.categoryErrorMsg = '請填寫此欄位';
      } else {
        this.categoryErrorMsg = '';
      }
    },
    queryInitData() {
      const passObj = {
        GlobalUserId: this.userInfo.userId,
      };
      doPost('/ApplyCase/QueryInitData', passObj).then((response) => {
        const { reasonList, roleList, unitList, userList } = response;
        this.reasonList = reasonList;
        this.roleList = roleList;
        this.unitList = unitList;
        this.userList = userList;
        this.showUserList = this.userList;
        this.showOperatorList = this.userList;
        if (this.$route.query.Flag) {
          if (this.$route.query.Flag == '104') {
            this.flag = parseInt(this.$route.query.Flag);
            this.category = this.$route.query.Category.split(',');
            if (this.$route.query.ApplyUser) {
              this.applyUser = [this.$route.query.ApplyUser];
            }
            this.status = parseInt(this.$route.query.Status);
            this.loadItems();
          } else {
            this.flag = parseInt(this.$route.query.Flag);
            this.category = this.$route.query.Category.split(',');
            if (this.$route.query.OperatorId) {
              this.operatorUser = [this.$route.query.OperatorId];
            }
            if (this.$route.query.OperatorUnitId) {
              this.operatorUnit = [this.$route.query.OperatorUnitId];
            }
            if (this.$route.query.CaseStatus) {
              this.caseStatus = this.$route.query.CaseStatus.split(',');
            }
            if (this.$route.query.ArchiveUnit) {
              this.archiveUnit = this.$route.query.ArchiveUnit.split(',');
            }
            this.status = parseInt(this.$route.query.Status);
            this.loadItems();
          }
        } else {
          // 預設值
          this.applyUnit = [`${this.userInfo.unitId}`];
          this.archiveUnit = [`${this.userInfo.unitId}`];
          // 因為預設值做的額外處理
          const tempArr = this.userList.filter((item) => {
            return this.applyUnit.indexOf(`${item.parentId}`) !== -1;
          });
          this.showUserList = tempArr;
          this.applyUser = [`${this.userInfo.userId}`];
        }
      });
    },
    onSubmit() {
      this.loadItems();
    },
    clearQuery() {
      // clear
      this.category = [];
      this.applyUnit = [];
      this.applyRole = [];
      this.archiveUnit = [];
      this.applyUser = [];
      this.startDate = '';
      this.endDate = '';
      this.applyReason = 0;
      this.operatorUnit = [];
      this.operatorUser = [];
      this.caseStatus = [];
      this.caseNo = '';
      this.status = -1;
      this.isSearch = false;
      this.queryInitData();
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
      passObj.Data.ApplyNo = this.applyNo;
      passObj.Data.ApplyUnitIds = this.toIntegerArray(this.applyUnit);
      passObj.Data.ApplyUserIds = this.toIntegerArray(this.applyUser);
      passObj.Data.ApplyRoleIds = this.toIntegerArray(this.applyRole);
      passObj.Data.OperatorUnitIds = this.toIntegerArray(this.operatorUnit);
      passObj.Data.OperatorUserIds = this.toIntegerArray(this.operatorUser);
      passObj.Data.StartDate = this.startDate;
      passObj.Data.EndDate = this.endDate;
      passObj.Data.ReasonId = this.applyReason;
      passObj.Data.ArchiveUnitIds = this.toIntegerArray(this.archiveUnit);
      passObj.Data.CaseNo = this.caseNo;
      passObj.Data.Status = this.status;
      passObj.Data.CaseStatusList = this.toIntegerArray(this.caseStatus);
      this.isSearch = true;
      doPost('/ApplyCase/Query', passObj).then((response) => {
        const { rows, totalRecords } = response;
        this.rows = [];
        // 對資料做Object屬性開頭大寫處理
        rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            if (key == 'applyStatus') {
              tempObj[this.capitalizeFirstLetter(key)] =
                this.applyStatusTransfer[value];
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
          if (item.field == 'Id' || item.field == 'AllowOpen') {
            // do nothing
          } else {
            this.fields.push(item.field);
            this.labels[item.field] = item.label;
          }
        });
      });
    },
    handleApplyCase(Id) {
      localStorage.removeItem('GlobalUserId');
      localStorage.setItem('GlobalUserId', this.userInfo.userId);
      const routeData = this.$router.resolve({
        name: 'ApplyCasePage',
        query: { id: Id },
      });
      window.open(routeData.href, '_blank');
    },
  },
};
</script>
