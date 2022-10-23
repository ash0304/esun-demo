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

import { onMounted, reactive, ref } from 'vue';
import { generatorCSVname } from '@/utilities/time';
import { doPost } from '../../utilities/api';
import { useRoute, useRouter } from 'vue-router';
// import store from '@/utilities/store';

export default {
  name: 'ApplyCase',
  components: { Form, Field, VueGoodTable, Select2, JsonCSV },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const categoryErrorMsg = ref('');
    const isSearch = ref(false);
    const isLoadingVisible = ref(false);
    const scanCheck = ref('系統未偵測到Scan Agent! 請至玉山安裝專區，下載安裝');
    const flag = ref(1001);
    const category = ref('');
    const categoryOptions = ref([]);
    const roleList = ref([]);
    const unitList = ref([]);
    const userList = ref([]);
    const showUserList = ref([]);
    const showOperatorList = ref([]);
    const reasonList = ref([]);
    const caseStatusList = ref([
      { id: 0, text: '覆核中' },
      { id: 1, text: '待取件' },
      { id: 2, text: '分派中' },
      { id: 3, text: '選檔中' },
      { id: 4, text: '已通過' },
      { id: 5, text: '已婉拒' },
      { id: 6, text: '銷案' },
      { id: 7, text: '待處理' },
    ]);
    const applyStatusTransfer = reactive({
      0: '尚有調閱案件處理中',
      1: '全數調閱案件已結案',
      2: '銷案',
    });
    const caseStatusTransfer = reactive({
      0: '覆核中',
      1: '待取件',
      2: '分派中',
      3: '選檔中',
      4: '已通過',
      5: '已婉拒',
      6: '銷案',
      7: '待處理',
    });
    const isModalVisible = ref(false);
    const scanViewerUrl = ref('');
    const applyNo = ref('');
    const applyUnit = ref([]);
    const applyRole = ref([]);
    const archiveUnit = ref([]);
    const applyUser = ref([]);
    const startDate = ref('');
    const endDate = ref('');
    const applyReason = 0;
    const operatorUnit = ref([]);
    const operatorUser = ref([]);
    const caseStatus = ref([]);
    const caseNo = ref('');
    const status = ref(-1);

    // table
    const paginationOptions = reactive(datatable.paginationOptions);
    const totalRecords = ref(0);
    const columns = ref([
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
    ]);
    const rows = ref([]);
    const tempRows = ref([]);
    // csv
    const fields = ref([]);
    const labels = ref([]);
    const userInfo = reactive({});

    Object.assign(userInfo, JSON.parse(localStorage.getItem('userInfo')));

    onMounted(() => {
      getCategoryList();
    });

    // methods
    const applyUnitChange = () => {
      if (applyUnit.value.length > 0) {
        const tempArr = userList.value.filter((item) => {
          return applyUnit.value.indexOf(`${item.parentId}`) !== -1;
        });
        showUserList.value = tempArr;
      } else {
        showUserList.value = userList.value;
      }
    };

    const operatorUnitChange = () => {
      if (operatorUnit.value.length > 0) {
        const tempArr = userList.value.filter((item) => {
          return operatorUnit.value.indexOf(`${item.parentId}`) !== -1;
        });
        showOperatorList.value = tempArr;
      } else {
        showOperatorList.value = userList.value;
      }
    };

    const getCategoryList = () => {
      doPost('/Common/GetCategoryList', {
        Flag: 1001,
        GlobalUserId: userInfo.userId,
      }).then((response) => {
        categoryOptions.value = response;
        queryInitData();
      });
    };

    const onChangeCategory = () => {
      if (!category.value || !category.value.length) {
        categoryErrorMsg.value = '請填寫此欄位';
      } else {
        categoryErrorMsg.value = '';
      }
    };

    const queryInitData = () => {
      const passObj = {
        GlobalUserId: userInfo.userId,
      };
      doPost('/ApplyCase/QueryInitData', passObj).then((response) => {
        const { reasonList, roleList, unitList, userList } = response;
        reasonList.value = response.reasonList;
        roleList.value = response.roleList;
        unitList.value = response.unitList;
        userList.value = response.userList;
        showUserList.value = userList.value;
        showOperatorList.value = userList.value;
        if (route.query.Flag) {
          if (route.query.Flag == '104') {
            flag.value = parseInt(route.query.Flag);
            category.value = route.query.Category.split(',');
            if (route.query.ApplyUser) {
              applyUser.value = [route.query.ApplyUser];
            }
            status.value = parseInt(route.query.Status);
            loadItems();
          } else {
            flag.value = parseInt(route.query.Flag);
            category.value = route.query.Category.split(',');
            if (route.query.OperatorId) {
              operatorUser.value = [route.query.OperatorId];
            }
            if (route.query.OperatorUnitId) {
              operatorUnit.value = [route.query.OperatorUnitId];
            }
            if (route.query.CaseStatus) {
              caseStatus.value = route.query.CaseStatus.split(',');
            }
            if (route.query.ArchiveUnit) {
              archiveUnit.value = route.query.ArchiveUnit.split(',');
            }
            status.value = parseInt(route.query.Status);
            loadItems();
          }
        } else {
          // 預設值
          applyUnit.value = [`${userInfo.unitId}`];
          archiveUnit.value = [`${userInfo.unitId}`];
          // 因為預設值做的額外處理
          const tempArr = userList.value.filter((item) => {
            return applyUnit.value.indexOf(`${item.parentId}`) !== -1;
          });
          showUserList.value = tempArr;
          applyUser.value = [`${userInfo.userId}`];
        }
      });
    };

    const onSubmit = () => {
      loadItems();
    };
    const clearQuery = () => {
      // clear
      category.value = [];
      applyUnit.value = [];
      applyRole.value = [];
      archiveUnit.value = [];
      applyUser.value = [];
      startDate.value = '';
      endDate.value = '';
      applyReason.value = 0;
      operatorUnit.value = [];
      operatorUser.value = [];
      caseStatus.value = [];
      caseNo.value = '';
      status.value = -1;
      isSearch.value = false;
      queryInitData();
    };

    const onPageChange = (params) => {
      datatable.onPageChange(params, loadItems);
    };
    const onPerPageChange = (params) => {
      datatable.onPerPageChange(params, loadItems);
    };
    const onSortChange = (params) => {
      datatable.onSortChange(params, loadItems);
    };

    // 轉大寫開頭屬性
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // 轉成integer array工具
    const toIntegerArray = (array) => {
      if (array.length > 0) {
        let tempArr = array.map((item) => {
          return parseInt(item);
        });
        return tempArr;
      } else {
        return [];
      }
    };

    const loadItems = (params) => {
      if (!category.value || !category.value.length) {
        categoryErrorMsg.value = '請填寫此欄位';
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
      passObj.Data.Flag = flag.value;
      passObj.Data.GlobalUserId = userInfo.userId;
      passObj.Data.Categories = toIntegerArray(category.value);
      passObj.Data.ApplyNo = applyNo.value;
      passObj.Data.ApplyUnitIds = toIntegerArray(applyUnit.value);
      passObj.Data.ApplyUserIds = toIntegerArray(applyUser.value);
      passObj.Data.ApplyRoleIds = toIntegerArray(applyRole.value);
      passObj.Data.OperatorUnitIds = toIntegerArray(operatorUnit.value);
      passObj.Data.OperatorUserIds = toIntegerArray(operatorUser.value);
      passObj.Data.StartDate = startDate.value;
      passObj.Data.EndDate = endDate.value;
      passObj.Data.ReasonId = applyReason.value;
      passObj.Data.ArchiveUnitIds = toIntegerArray(archiveUnit.value);
      passObj.Data.CaseNo = caseNo.value;
      passObj.Data.Status = status.value;
      passObj.Data.CaseStatusList = toIntegerArray(caseStatus.value);
      isSearch.value = true;
      doPost('/ApplyCase/Query', passObj).then((response) => {
        rows.value = [];
        // 對資料做Object屬性開頭大寫處理
        response.rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            if (key == 'applyStatus') {
              tempObj[capitalizeFirstLetter(key)] = applyStatusTransfer[value];
            } else {
              tempObj[capitalizeFirstLetter(key)] = value;
            }
          }
          rows.value[index] = tempObj;
        });
        totalRecords.value = response.totalRecords;
        // csv隱碼處理
        tempRows.value = [];
        // deep copy
        tempRows.value = JSON.parse(JSON.stringify(rows.value));
        tempRows.value.forEach((item) => {
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
        columns.value.forEach((item) => {
          if (item.field == 'Id' || item.field == 'AllowOpen') {
            // do nothing
          } else {
            fields.value.push(item.field);
            labels.value[item.field] = item.label;
          }
        });
      });
    };

    const handleApplyCase = (Id) => {
      localStorage.removeItem('GlobalUserId');
      localStorage.setItem('GlobalUserId', userInfo.userId);
      const routeData = router.resolve({
        name: 'ApplyCasePage',
        query: { id: Id },
      });
      window.open(routeData.href, '_blank');
    };

    return {
      route,
      router,
      categoryErrorMsg,
      isSearch,
      isLoadingVisible,
      scanCheck,
      flag,
      category,
      categoryOptions,
      roleList,
      unitList,
      userList,
      showUserList,
      showOperatorList,
      reasonList,
      caseStatusList,
      applyStatusTransfer,
      caseStatusTransfer,
      isModalVisible,
      scanViewerUrl,
      applyNo,
      applyUnit,
      applyRole,
      archiveUnit,
      applyUser,
      startDate,
      endDate,
      applyReason,
      operatorUnit,
      operatorUser,
      caseStatus,
      caseNo,
      status,
      paginationOptions,
      totalRecords,
      columns,
      rows,
      tempRows,
      fields,
      labels,
      userInfo,
      generatorCSVname,
      applyUnitChange,
      operatorUnitChange,
      getCategoryList,
      onChangeCategory,
      queryInitData,
      onSubmit,
      clearQuery,
      onPageChange,
      onPerPageChange,
      onSortChange,
      capitalizeFirstLetter,
      toIntegerArray,
      loadItems,
      handleApplyCase,
    };
  },
};
</script>
