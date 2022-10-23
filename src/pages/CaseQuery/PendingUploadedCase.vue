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

import { onMounted, reactive, ref } from 'vue';
import store from '@/utilities/store';
import { getDate } from '@/utilities/time';
import { generatorCSVname } from '@/utilities/time';
import { doPost } from '../../utilities/api';
import { useRoute } from 'vue-router';

export default {
  name: 'PendingUploadedCase',
  components: { Form, Field, Select2, VueGoodTable, JsonCSV, Modal },
  setup() {
    const route = useRoute();
    const categoryErrorMsg = ref('');
    const buttonType = ref(0);
    // 第一次搜尋
    const isSearch = ref(false);
    const flag = ref(1101);
    const category = ref([]);
    const categoryOptions = ref([]);
    const caseId = ref('');
    const pendingUploadedNo = ref('');
    const unitId = ref(-2);
    const userId = ref(-2);
    const operatorId = ref(-2);
    const startDate = ref(getDate(7));
    const endDate = ref(getDate());
    const status = ref([]);
    const unitList = ref([]);
    const userList = ref([]);
    const statusListOptions = ref([
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
    ]);
    const pendingUploadedStatusTransfer = reactive({
      0: '處理中',
      1: '覆核中',
      2: '補件完成',
      3: '補件銷案',
    });
    // 待補申請單彈窗
    const isModalVisible1 = ref(false);
    const pendingModalObj = reactive({});
    // 操作結果彈窗
    const isModalVisible2 = ref(false);
    const responseMessage = ref('');
    // 意見+傳送彈窗
    const isModalVisible3 = ref(false);
    const currentFormId = ref(0);
    const transfer = ref(-2);
    const transferText = ref('');
    const transferErrMsg = ref('');
    const transferOptions = ref([]);
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
      getInitSearchData();
      if (route.query.Flag) {
        startDate.value = '';
        endDate.value = '';
        flag.value = parseInt(route.query.Flag);
        category.value = route.query.Category.split(',');
        if (route.query.UserId) {
          userId.value = route.query.UserId;
        }
        if (route.query.OperatorUnitId) {
          unitId.value = route.query.OperatorUnitId;
        }
        status.value = route.query.Status.split(',');
        loadItems();
      }
    });

    // methods
    const generatorString = (target) => {
      if (target == 'title') {
        if (buttonType.value == 1) {
          return '覆核人員';
        } else {
          if (pendingModalObj.pendingUploadedStatus == '處理中') {
            return '處理人員';
          } else {
            return '覆核人員';
          }
        }
      } else if (target == 'placeholder') {
        if (buttonType.value == 1) {
          return '請選擇欲覆核之人員';
        } else {
          if (pendingModalObj.pendingUploadedStatus == '處理中') {
            return '請選擇欲處理之人員';
          } else {
            return '請選擇欲覆核之人員';
          }
        }
      }
    };

    const onSubmit = () => {
      loadItems();
    };

    const clearQuery = () => {
      category.value = [];
      caseId.value = '';
      pendingUploadedNo.value = '';
      unitId.value = -2;
      userId.value = -2;
      operatorId.value = -2;
      startDate.value = getDate(7);
      endDate.value = getDate();
      status.value = [];
      rows.value = [];
    };

    // 取得
    const getInitSearchData = async () => {
      const response = await doPost('/PendingUploadedCase/QueryInitData', {
        GlobalUserId: userInfo.userId,
      });
      unitList.value = response.unitList;
      userList.value = response.userList;
    };
    // 取得業務類別
    const getCategoryList = async () => {
      const response = await doPost('/Common/GetCategoryList', {
        Flag: 1101,
        GlobalUserId: userInfo.userId,
      });
      categoryOptions.value = response;
    };

    const onChangeCategory = () => {
      if (!category.value || !category.value.length) {
        categoryErrorMsg.value = '請填寫此欄位';
      } else {
        categoryErrorMsg.value = '';
      }
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
      passObj.Data.GlobalUserId = userInfo.userId;
      passObj.Data.Flag = flag.value;
      passObj.Data.Categories = toIntegerArray(category.value);
      passObj.Data.CaseId = caseId.value;
      passObj.Data.PendingUploadedNo = pendingUploadedNo.value;
      passObj.Data.UnitId = unitId.value;
      passObj.Data.UserId = userId.value;
      passObj.Data.OperatorId = operatorId.value;
      passObj.Data.StartDate = startDate.value;
      passObj.Data.EndDate = endDate.value;
      passObj.Data.StatusList = toIntegerArray(status.value);
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
      doPost('/PendingUploadedCase/Query', passObj).then((response) => {
        rows.value = [];
        // 對資料做Object屬性開頭大寫處理
        response.rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            if (key == 'pendingUploadedStatus') {
              tempObj[capitalizeFirstLetter(key)] =
                pendingUploadedStatusTransfer[value];
            } else {
              tempObj[capitalizeFirstLetter(key)] = value;
            }
          }
          this.rows[index] = tempObj;
        });
        totalRecords.value = response.totalRecords;
        // csv隱碼處理
        tempRows.value = [];
        // deep copy
        tempRows.value = JSON.parse(JSON.stringify(rows.value));
        tempRows.value.forEach((item) => {
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
        columns.value.forEach((item) => {
          if (item.field == 'Id' || item.field == 'AllowOpen') {
            // do nothing
          } else {
            fields.value.push(item.field);
            labels[item.field] = item.label;
          }
        });
      });
    };

    const handlePendingApplyCase = (row) => {
      currentFormId.value = row.Id;
      const passObj = {
        GlobalUserId: userInfo.userId,
        FormId: currentFormId.value,
      };
      doPost('/PendingUploadedCase/QueryDetail', passObj).then((response) => {
        Object.assign(pendingModalObj, response);
        pendingModalObj.pendingUploadedStatus =
          pendingUploadedStatusTransfer[pendingModalObj.pendingUploadedStatus];
        console.log(pendingModalObj);
      });
      showModal1();
    };

    const transferChange = () => {
      if (!transfer.value || transfer.value == '-2') {
        transferErrMsg.value = '請填寫此欄位';
      } else {
        transferErrMsg.value = '';
        transferText.value = transferOptions.value.filter(
          (item) => item.id == transfer.value
        )[0].text;
      }
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
      responseMessage.value = '';
      transfer.value = -2;
      isModalVisible2.value = false;
    };
    const showModal3 = () => {
      isModalVisible3.value = true;
    };
    const closeModal3 = () => {
      isModalVisible3.value = false;
    };

    const confirmModal3 = () => {
      if (!transfer.value || transfer.value == '-2') {
        transferErrMsg.value = '請填寫此欄位';
        return;
      }
      if (this.buttonType == 2) {
        const passObj = {
          GlobalUserId: userInfo.userId,
          PendingUploadedFormId: currentFormId.value,
          NextOperatorUserId: transfer.value,
        };
        doPost('/PendingUploadedCase/ReassignOperator', passObj).then(
          (response) => {
            if (response) {
              responseMessage.value = `案件已移轉予${transferText.value}處理`;
              showModal2();
            }
            isModalVisible1.value = false;
            isModalVisible3.value = false;
          }
        );
      } else {
        const passObj = {
          GlobalUserId: userInfo.userId,
          PendingUploadedFormId: currentFormId.value,
          NextOperatorUserId: transfer.value,
        };
        doPost('/PendingUploadedCase/Cancel', passObj).then((response) => {
          if (response) {
            responseMessage.value = `待補申請單單號(${pendingModalObj.caseNo})已傳送成功!`;
            isModalVisible1.value = false;
            showModal2();
          }
          isModalVisible1.value = false;
          isModalVisible3.value = false;
        });
      }
    };

    // 銷案
    const cancelCase = () => {
      buttonType.value = 1;
      const passObj = {
        GlobalUserId: userInfo.userId,
        PendingUploadedFormId: currentFormId.value,
        HierarchyId: pendingModalObj.categoryId,
        ButtonType: buttonType.value,
      };
      doPost('/PendingUploadedCase/GetOperatorList', passObj).then(
        (response) => {
          if (response || response.length > 0) {
            transferOptions.value = response;
            showModal3();
          }
        }
      );
    };

    // 檢視/補件
    const pendingOrView = () => {
      const passObj = {
        Flag: 1102,
        GlobalUserId: userInfo.userId,
        PendingUploadedFormId: currentFormId.value,
        CaseIds: [pendingModalObj.caseId],
      };
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    };
    // 處理權移轉
    const rightTransfer = () => {
      this.buttonType = 2;
      const passObj = {
        GlobalUserId: userInfo.userId,
        PendingUploadedFormId: currentFormId.value,
        HierarchyId: pendingModalObj.categoryId,
        ButtonType: buttonType.value,
      };
      doPost('/PendingUploadedCase/GetOperatorList', passObj).then(
        (response) => {
          if (response || response.length > 0) {
            transferOptions.value = response;
            showModal3();
          }
        }
      );
    };

    // 退回
    const returnCase = () => {
      this.buttonType = 0;
      const passObj = {
        GlobalUserId: userInfo.userId,
        PendingUploadedFormId: currentFormId.value,
        NextOperatorUserId: 0,
      };
      doPost('/PendingUploadedCase/Reject', passObj).then((response) => {
        if (response) {
          // 帶補成功訊息
          isModalVisible1.value = false;
        }
      });
    };

    // 檢視/結案
    const viewOrEndCase = () => {
      const passObj = {
        Flag: 1103,
        GlobalUserId: userInfo.userId,
        PendingUploadedFormId: currentFormId.value,
        CaseIds: [pendingModalObj.caseId],
      };
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    };

    return {
      route,
      categoryErrorMsg,
      buttonType,
      isSearch,
      flag,
      category,
      categoryOptions,
      caseId,
      pendingUploadedNo,
      unitId,
      userId,
      operatorId,
      startDate,
      endDate,
      status,
      unitList,
      userList,
      statusListOptions,
      pendingUploadedStatusTransfer,
      isModalVisible1,
      pendingModalObj,
      isModalVisible2,
      responseMessage,
      isModalVisible3,
      currentFormId,
      transfer,
      transferText,
      transferErrMsg,
      transferOptions,
      paginationOptions,
      totalRecords,
      columns,
      rows,
      tempRows,
      fields,
      labels,
      userInfo,
      generatorCSVname,
      generatorString,
      onSubmit,
      clearQuery,
      getInitSearchData,
      getCategoryList,
      onChangeCategory,
      onPageChange,
      onPerPageChange,
      onSortChange,
      capitalizeFirstLetter,
      toIntegerArray,
      handlePendingApplyCase,
      transferChange,
      showModal1,
      closeModal1,
      showModal2,
      closeModal2,
      confirmModal2,
      showModal3,
      closeModal3,
      confirmModal3,
      cancelCase,
      pendingOrView,
      rightTransfer,
      returnCase,
      viewOrEndCase,
    };
  },
};
</script>
