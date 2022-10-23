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
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'QueryRecord',
  components: { Field, Form, VueGoodTable, Select2, Modal, JsonCSV },
  setup() {
    // router
    const router = useRouter();
    const route = useRoute();
    const isSearch = ref(false);
    const flag = ref(701);
    const isModalVisible1 = ref(false);
    const isModalVisible2 = ref(false);
    const responseMessage = ref('');
    const caseIds = ref([]);
    const category = ref([]);
    const categoryOptions = ref([]);
    const applyReason = ref([]);
    const reasonList = ref([]);
    const archiveUnitId = ref([]);
    const archiveUnitList = ref([]);
    const applyDate = ref(getDate());
    const startDate = ref('');
    const endDate = ref('');
    const caseNo = ref('');
    const viewCheckBox = ref(false);
    // table
    const paginationOptions = reactive(datatable.paginationOptions);
    const columns = ref([
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
    ]);
    const rows = ref([]);
    const exportRows = ref([]);
    const totalRecords = ref(0);
    const modalcolumns = ref([
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
    ]);
    const modalrows = ref([]);
    // csv匯出設定(未完成)
    const labels = reactive({});
    const fields = ref([]);
    const statusTransfer = ref({
      0: '申請',
      1: '退回',
      2: '婉拒',
      3: '放行',
      4: '撤銷',
      5: '取件',
      6: '選檔',
      7: '移轉',
      8: '處理',
    });
    const userInfo = reactive({});

    Object.assign(userInfo, JSON.parse(localStorage.getItem('userInfo')));

    onMounted(() => {
      getCategoryList();
      getApplyReason();
      console.log(route);
      if (route.query.Flag == 104) {
        flag.value = parseInt(route.query.Flag);
        category.value = route.query.Category.split(',');
        applyDate.value = route.query.ApplyData;
        loadItems();
      }
    });

    // methods
    const onSubmit = () => {
      loadItems();
    };
    const clearQuery = () => {
      category.value = [];
      applyReason.value = [];
      archiveUnitId.value = [];
      applyDate.value = '';
      startDate.value = '';
      endDate.value = '';
      caseNo.value = '';
      rows.value = [];
    };
    // 取得業務類別
    const getCategoryList = async () => {
      const response = await doPost('/Common/GetCategoryList', {
        Flag: 6,
        GlobalUserId: userInfo.userId,
      });
      categoryOptions.value = response;
    };

    // 取得調閱事由
    const getApplyReason = async () => {
      const response = await doPost('/ApplyCase/getApplyReasonList', {
        GlobalUserId: userInfo.userId,
      });
      reasonList.value = response;
    };
    // 業務類別改變時
    const onChangeCategory = () => {
      const passObj = {
        GlobalUserId: userInfo.userId,
        Category: category.value,
        Flag: 701,
      };
      // 取得單位列表
      doPost('/Common/getUnitList', passObj).then((response) => {
        archiveUnitList.value = response;
      });
    };

    // 客製表頭勾選(檢視)
    const viewMainChange = () => {
      if (viewCheckBox.value) {
        rows.value.forEach((item) => {
          item.viewValue = true;
        });
      } else {
        rows.value.forEach((item) => {
          item.viewValue = false;
        });
      }
    };

    // 表內勾選框改變動作
    const viewChange = () => {
      // 驗證this.rows是不是每個都已經勾, 如果是把表頭v-mode改成true,反之
      const tempArr = rows.value.filter((item) => item.AllowView === true);
      const checkEvery = tempArr.every((item) => item.viewValue === true);
      if (checkEvery) {
        viewCheckBox.value = true;
      } else {
        viewCheckBox.value = false;
      }
    };

    // 檢視
    const handleView = () => {
      const tempArr = rows.value.filter((item) => item.viewValue === true);
      caseIds.value = [];
      tempArr.forEach((item) => {
        caseIds.value.push(item.Id);
      });
      if (caseIds.value.length == 0) {
        responseMessage.value = '請勾選欲開啟檢視的案件';
        showModal2();
        return;
      }
      const passObj = {
        Flag: 702,
        CaseIds: caseIds.value,
        GlobalUserId: userInfo.userId,
      };
      // do 檢視api
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    };

    // table action
    const updateParams = (newProps) => {
      datatable.updateParams(newProps);
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

    // load query
    const loadItems = (params) => {
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
      passObj.Data.ArchiveUnitId = toIntegerArray(archiveUnitId.value);
      passObj.Data.ApplyDate = applyDate.value;
      passObj.Data.StartDate = startDate.value;
      passObj.Data.EndDate = endDate.value;
      passObj.Data.ReasonId = toIntegerArray(applyReason.value);
      passObj.Data.CaseNo = caseNo.value;
      const ds = new Date(startDate.value);
      const de = new Date(endDate.value);
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
      isSearch.value = true;
      doPost('/ImageQueryRecord/Query', passObj).then((response) => {
        rows.value = [];
        // 對資料做Object屬性開頭大寫處理
        response.rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            tempObj[capitalizeFirstLetter(key)] = value;
          }
          rows.value[index] = tempObj;
          // 綁個v-model用
          if (rows.value[index].AllowView) {
            rows.value[index].viewValue = false;
          }
        });
        totalRecords.value = response.totalRecords;
        // csv setting
        columns.value.forEach((item) => {
          if (
            item.field == 'Id' ||
            item.field == 'Comments' ||
            item.field == 'AllowView'
          ) {
            // do nothing
          } else {
            fields.value.push(item.field);
            labels[item.field] = item.label;
          }
        });
      });
    };

    // 另開新頁調閱申請單(不可編輯版)
    const handleApplyCase = (Id) => {
      localStorage.removeItem('GlobalUserId');
      localStorage.setItem('GlobalUserId', userInfo.userId);
      const routeData = router.resolve({
        name: 'ApplyCasePage',
        query: { id: Id, editable: false },
      });
      window.open(routeData.href, '_blank');
    };
    const handleComments = (row) => {
      modalrows.value = row.Comments;
      // 開表格
      showModal1();
    };
    const showModal1 = () => {
      isModalVisible1.value = true;
    };
    const closeModal1 = () => {
      isModalVisible1.value = false;
    };
    const showModal2 = () => {
      isModalVisible2.value = true;
    };
    const closeModal2 = () => {
      isModalVisible2.value = false;
    };
    const confirmModal2 = () => {
      // do something and close
      setTimeout(() => {
        isModalVisible2.value = false;
        // do call back?
      }, 500);
    };

    return {
      router,
      route,
      isSearch,
      flag,
      isModalVisible1,
      isModalVisible2,
      responseMessage,
      caseIds,
      category,
      categoryOptions,
      applyReason,
      reasonList,
      archiveUnitId,
      archiveUnitList,
      applyDate,
      startDate,
      endDate,
      caseNo,
      viewCheckBox,
      paginationOptions,
      columns,
      rows,
      exportRows,
      totalRecords,
      modalcolumns,
      modalrows,
      labels,
      fields,
      statusTransfer,
      userInfo,
      getDate,
      generatorCSVname,
      onSubmit,
      clearQuery,
      getCategoryList,
      getApplyReason,
      onChangeCategory,
      viewMainChange,
      viewChange,
      handleView,
      updateParams,
      onPageChange,
      onPerPageChange,
      onSortChange,
      capitalizeFirstLetter,
      toIntegerArray,
      loadItems,
      handleApplyCase,
      handleComments,
      showModal1,
      closeModal1,
      showModal2,
      closeModal2,
      confirmModal2,
    };
  },
};
</script>
