<template>
  <div class="mt-4 px-4">
    <Form ref="myform" @submit="onSubmit" v-slot="{ errors }">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">案件一覽表查詢</li>
          <li class="breadcrumb-item active" aria-current="page">
            掃描案件查詢
          </li>
        </ol>
      </nav>
      <h2 class="page-title">掃描案件查詢</h2>
      <div class="mb-4">
        <!-- 業務類別 -->
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">業務類別</span>
          <div class="col-sm-10 p-3">
            <Field
              name="category"
              class="form-control"
              placeholder="請選擇業務類別"
              v-model="category"
              as="select"
              :rules="{ required: true }"
              @change="onChangeCategory($event)"
            >
              <option value="-2">請選擇</option>
              <option
                v-for="category in categoryOptions"
                :key="category.id"
                :value="category.id"
              >
                {{ category.text }}
              </option>
            </Field>
            <span class="error-msg">{{ errors.category }}</span>
          </div>
        </div>
        <!-- 索引動態產生區域 -->
        <div v-if="caseIndexList.length > 0 && done">
          <div v-for="(caseIndex, index) in caseIndexList" :key="caseIndex.id">
            <div class="input-group border-bottom-0 row g-0">
              <span class="col-sm-2 input-group-text py-2 px-4">{{
                caseIndex.name
              }}</span>
              <div class="col-sm-10 p-3">
                <div v-if="caseIndex.fieldType == 1">
                  <Field
                    :name="caseIndex.code"
                    type="text"
                    class="form-control"
                    v-model="form[index].value"
                    :rules="generatorRule.bind(null, index)"
                    :disabled="form[index].isDisabled"
                  />
                  <span class="error-msg">{{ errors[caseIndex.code] }}</span>
                </div>
                <div v-if="caseIndex.fieldType == 2">
                  <Field
                    :name="caseIndex.code"
                    class="form-control"
                    as="select"
                    v-model="form[index].value"
                    :rules="generatorRule.bind(null, index)"
                    @change="bankingCenterChange($event)"
                    :disabled="form[index].isDisabled"
                  >
                    <option value="-2">請選擇</option>
                    <option
                      v-for="option in caseIndex.options"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.text }}
                    </option>
                  </Field>
                  <span class="error-msg">{{ errors[caseIndex.code] }}</span>
                </div>
                <div v-if="caseIndex.fieldType == 3">
                  <Field
                    :name="caseIndex.code"
                    class="form-control"
                    :rules="generatorRule.bind(null, index)"
                    v-slot="{ field }"
                  >
                    <Select2
                      placeholder="請選擇"
                      v-model="form[index].value"
                      v-bind="field"
                      :options="caseIndex.options"
                      :settings="{
                        language: { noResults: () => '無符合結果' },
                      }"
                      :disabled="form[index].isDisabled"
                    />
                  </Field>
                  <span class="error-msg">{{ errors[caseIndex.code] }}</span>
                </div>
                <div v-if="caseIndex.fieldType == 4">
                  <Field
                    :name="caseIndex.code"
                    class="form-control"
                    :rules="generatorRule.bind(null, index)"
                    v-slot="{ field }"
                  >
                    <Select2
                      placeholder="請選擇"
                      v-model="form[index].value"
                      v-bind="field"
                      :options="caseIndex.options"
                      :settings="{
                        multiple: true,
                        language: { noResults: () => '無符合結果' },
                      }"
                      :disabled="form[index].isDisabled"
                    />
                  </Field>
                  <span class="error-msg">{{ errors[caseIndex.code] }}</span>
                </div>
                <div v-if="caseIndex.fieldType == 5">
                  <div class="col-sm p-0 d-flex align-items-center">
                    <div>
                      <Field
                        :name="caseIndex.code"
                        v-slot="{ field }"
                        :rules="{ required: caseIndex.isRequired }"
                        :value="dataValue('Start')"
                      >
                        <div class="input-group calendar-wrapper w320">
                          <input
                            type="date"
                            class="form-control"
                            placeholder="請選擇起始日期"
                            v-model="form[index].value"
                            v-bind="field"
                            :disabled="form[index].isDisabled"
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
                        errors[caseIndex.code]
                      }}</span>
                    </div>
                    <div class="mx-3">~</div>
                    <div>
                      <Field
                        :name="caseIndex.code2"
                        v-slot="{ field }"
                        :rules="{ required: caseIndex.isRequired }"
                        :value="dataValue('End')"
                      >
                        <div class="input-group calendar-wrapper w320">
                          <input
                            type="date"
                            class="form-control"
                            placeholder="請選擇結束日期"
                            v-model="form[index].value2"
                            v-bind="field"
                            :disabled="form[index].isDisabled"
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
                        errors[caseIndex.code2]
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="category" class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">處理狀態</span>
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
                  id="reviewStatus-0"
                  v-model="status"
                  :value="0"
                />
                <label class="form-check-label" for="reviewStatus-0"
                  >待取件</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="reviewStatus-1"
                  v-model="status"
                  :value="1"
                />
                <label class="form-check-label" for="reviewStatus-1"
                  >處理中</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="reviewStatus-2"
                  v-model="status"
                  :value="2"
                />
                <label class="form-check-label" for="reviewStatus-2"
                  >已歸檔</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mb-4">
        <button
          class="btn btn-primary btn-md w320"
          :disabled="category == '-2'"
        >
          查詢
        </button>
        <button
          v-if="category != '-2'"
          type="button"
          class="btn btn-secondary btn-md w125 mx-3"
          @click="clearQuery"
        >
          清除條件
        </button>
      </div>
    </Form>
    <div v-if="isSearch && rows.length > 0" class="text-end mt-4">
      <!-- 測試匯出csv -->
      <JsonCSV
        :data="exportRows"
        :labels="labels"
        :fields="fields"
        :name="generatorCSVname('掃描案件查詢')"
      ></JsonCSV>
    </div>
    <!-- table -->
    <div v-if="isSearch" class="mt-3 mb-5">
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
          <!-- 取件客製 -->
          <span v-if="props.column.field == 'Pickup'">
            <span v-if="props.row.Pickup">
              <button
                type="button"
                class="btn btn-primary btn-xs w100"
                @click="handlePickUp(props.row)"
              >
                取件
              </button>
            </span>
            <span v-else>
              <span></span>
            </span>
          </span>
          <!-- 處理權客製 -->
          <span v-if="props.column.field == 'ProcessTransfer'">
            <span v-if="props.row.ProcessTransfer">
              <button
                type="button"
                class="btn btn-primary btn-xs w125"
                @click="showModal1(props.row)"
              >
                處理權移轉
              </button>
            </span>
            <span v-else>
              <span></span>
            </span>
          </span>
          <!-- 點我處理客製 -->
          <span v-if="props.column.field == 'ClickMe'">
            <span v-if="props.row.ClickMe">
              <div class="d-flex">
                <button
                  type="button"
                  class="btn btn-primary btn-xs w100 mx-3"
                  @click="handleView(props.row)"
                >
                  開啟影像
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-xs w100"
                  @click="showModal2(props.row)"
                >
                  刪除案件
                </button>
              </div>
            </span>
            <span v-else>
              <span></span>
            </span>
          </span>
        </template>
      </vue-good-table>
      <!-- 處理權移轉Modal -->
      <Teleport to="body">
        <transition name="modal-fade">
          <Modal
            v-if="isModalVisible1"
            :showCancelBtn="true"
            :showConfirmBtn="true"
            @close="closeModal1"
            @confirm="confirmModal1"
          >
            <template #header> 請您選擇欲移轉的人員 </template>
            <template #body>
              <div class="modal-body-padding custom">
                <!-- start -->
                <div class="input-group row g-0">
                  <span class="col-sm-2 input-group-text py-2 px-4"
                    >新處理人員</span
                  >
                  <div class="col-sm-10 p-3">
                    <div>
                      <Field
                        name="transfer"
                        class="form-control"
                        placeholder="請選擇新處理人員"
                        v-model="transfer"
                        as="select"
                        @change="transferChange"
                      >
                        <option value="-2">請選擇</option>
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
                <!-- end -->
              </div>
            </template>
            <template #cancelBtn> 取消 </template>
            <template #confirmBtn> 確定 </template>
          </Modal>
        </transition>
      </Teleport>
      <!-- 確認刪除Modal -->
      <Teleport to="body">
        <transition name="modal-fade">
          <Modal
            v-if="isModalVisible2"
            :showCancelBtn="true"
            :showConfirmBtn="true"
            @close="closeModal2"
            @confirm="confirmModal2"
          >
            <template #header> 提示 </template>
            <template #body>
              <div class="modal-body-padding">確定刪除此案件?</div>
            </template>
            <template #cancelBtn> 取消 </template>
            <template #confirmBtn> 確定 </template>
          </Modal>
        </transition>
      </Teleport>
      <!-- 操作結果Modal -->
      <Teleport to="body">
        <transition name="modal-fade">
          <Modal
            v-if="isModalVisible3"
            :showCancelBtn="false"
            :showConfirmBtn="true"
            @close="closeModal3"
            @confirm="confirmModal3"
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
  </div>
</template>

<style lang="scss">
@import './node_modules/vue-good-table-next/src/styles/style';
.custom {
  text-align: left;
  font-size: 16px;
  line-height: 1;
}
</style>

<script>
import { Field, Form } from 'vee-validate';
import Select2 from 'vue3-select2-component';
import { VueGoodTable } from 'vue-good-table-next';
import Modal from '@/components/Modal.vue';
import JsonCSV from '@/components/JsonCSV';
import * as datatable from '@/utilities/datatable';

import { getDate } from '@/utilities/time';
import { generatorCSVname } from '@/utilities/time';
import { onMounted, reactive, ref } from 'vue';

import store from '@/utilities/store';
import { doPost } from '@/utilities/api';
import { useRoute } from 'vue-router';

export default {
  name: 'ScanCase',
  components: { Field, Form, Select2, VueGoodTable, Modal, JsonCSV },
  setup() {
    const route = useRoute();
    const myform = ref('');
    // 動態索引是否處理完畢
    const done = ref(false);
    // 是否存在flag
    const isFlag = ref(false);
    // 動態資料是否完成?
    const isDataBack = ref(false);
    // 結束時間是否早於起始判定
    const timeValid = ref(true);
    // 時間間隔是否大於30日
    const timeRangeValid = ref(true);
    // 第一次搜尋
    const isSearch = ref(false);
    const flag = ref(901);
    // 處理權彈窗
    const isModalVisible1 = ref(false);
    // 是否刪除彈窗
    const isModalVisible2 = ref(false);
    // api結果彈窗
    const isModalVisible3 = ref(false);
    const category = ref(-2);
    const categoryOptions = ref([]);
    const caseIndexList = ref([]);
    const form = ref([]);
    const status = ref(-1);
    // table
    const paginationOptions = reactive(datatable.paginationOptions);
    const columns = ref([]);
    const rows = ref([]);
    const exportRows = ref([]);
    const totalRecords = ref(0);
    const statusTransfer = reactive({
      0: '待取件',
      1: '處理中',
      2: '已歸檔',
    });
    const transfer = ref(-2);
    const transferErrMsg = ref('');
    const transferOptions = ref([]);
    const caseId = ref(0);
    const responseMessage = ref('');
    // csv匯出設定
    const labels = reactive({});
    const fields = ref([]);
    const userInfo = reactive({});
    const counter = ref(0);

    Object.assign(userInfo, JSON.parse(localStorage.getItem('userInfo')));

    onMounted(() => {
      if (route.query.Flag) {
        isFlag.value = true;
        getCategoryList();
      }
    });

    const getCategoryList = () => {
      doPost('/Common/GetCategoryList', {
        Flag: 901,
        GlobalUserId: userInfo.userId,
      }).then((response) => {
        categoryOptions.value = response;
        // 如果從公告導向過來
        if (route.query.Flag && counter.value < 1) {
          category.value = route.query.Category;
          onChangeCategory();
        } else {
          onChangeCategory();
        }
      });
    };

    const bankingCenterChange = (e) => {
      form.value.forEach((item) => {
        if (item.code == 'ArchiveUnit') {
          item.value = [];
          item.options = item.dataSource.filter(
            (i) => i.parentId == e.target.value
          );
        }
      });
    };

    const onSubmit = () => {
      loadItems();
    };

    // 測試規則
    const generatorRule = (index) => {
      if (form.value[index]?.isRequired) {
        if (Array.isArray(form.value[index]?.value)) {
          if (!form.value[index]?.value.length) {
            return '請填寫此欄位';
          }
        } else {
          if (form.value[index]?.value == '-2' || !form.value[index]?.value) {
            return '請填寫此欄位';
          }
        }
      }
      if (form.value[index]?.regexRule) {
        if (Array.isArray(form.value[index]?.value)) {
          if (!form.value[index]?.value.length) {
            return true;
          }
        } else {
          if (form.value[index]?.value == '-2' || !form.value[index]?.value) {
            return true;
          }
        }
        const regex = new RegExp(form.value[index]?.regexRule);
        if (!regex.test(form.value[index]?.value)) {
          return '請修改此欄位格式';
        }
      }
      return true;
    };

    // 新處理人員變動
    const transferChange = () => {
      if (transfer.value && transfer.value != '-2') {
        transferErrMsg.value = '';
      }
    };

    const clearQuery = () => {
      // clear
      category.value = -2;
      caseIndexList.value = [];
      form.value = [];
      rows.value = [];
      status.value = -1;
      myform.value.resetForm();
    };

    // 選擇業務類別時觸發
    const onChangeCategory = () => {
      // 重選選項先清空陣列避免重複欄位
      done.value = false;
      form.value = [];
      // 根據選擇業務類別撈取索引
      doPost('/Common/GetCaseIndexListByCategory', {
        Category: category.value,
        GlobalUserId: userInfo.userId,
        Flag: 901,
      }).then((response) => {
        caseIndexList.value = response;
        caseIndexList.value.forEach((item) => {
          // 建立暫時存放表
          let formData = {
            ...item,
            options: [],
            loaded: item.fieldType == 2 || item.fieldType == 3 ? false : true,
            value: item.fieldType == 2 ? '-2' : '',
            value2: '',
          };
          if (item.dataSource) {
            formData.options = item.dataSource;
            formData.loaded = true;

            let loaded = form.value.every((el) => el.loaded);
            if (loaded) {
              //
            }
          }
          if (item.fieldType == 4) {
            // flag
            if (route.query.Flag && counter.value < 1) {
              formData.value = [];
            } else {
              formData.value = item.defaultValue.split(',');
            }
          } else {
            // flag
            if (route.query.Flag && counter.value < 1) {
              if (item.fieldType == 1) {
                formData.value = '';
              } else if (item.fieldType == 2) {
                formData.value = '-2';
              } else if (item.fieldType == 3) {
                formData.value = '-2';
              }
            } else {
              formData.value = item.defaultValue;
            }
          }
          // 時間區間特殊處理
          if (item.fieldType === 5) {
            // flag存在時代空值
            if (route.query.Flag && counter.value < 1) {
              formData.code2 = `${item.code}2`;
              formData.value = '';
              formData.value2 = '';
            } else {
              formData.code2 = `${item.code}2`;
              formData.value = getDate(7);
              formData.value2 = getDate();
            }
          }
          // 公告首頁導向特殊處理
          if (item.code == 'ArchiveUnit') {
            if (route.query.ArchiveUnit && counter.value < 1) {
              formData.value = route.query.ArchiveUnit.split(',');
            }
          }
          // 公告首頁導向特殊處理
          if (item.code == 'WorkTeam') {
            if (route.query.WorkTeam && counter.value < 1) {
              formData.value = route.query.WorkTeam.split(',');
            }
          }
          // 公告首頁導向特殊處理103Flag
          if (item.code == 'ScanUser') {
            if (route.query.ScanUser && counter.value < 1) {
              formData.value = [route.query.ScanUser];
            }
          }
          form.value.push(formData);
          // 替換為主渲染變數
          caseIndexList.value = form.value;
        });
        done.value = true;
        console.log('this.caseIndexList', caseIndexList.value);
        if (route.query.Flag && counter.value < 1) {
          flag.value = parseInt(route.query.Flag);
          category.value = route.query.Category;
          if (route.query.Status === '0' || route.query.Status === '1') {
            status.value = parseInt(route.query.Status);
          }
          loadItems();
        }
      });
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

    const transferFieldType = (item) => {
      if (item.fieldType == 5) {
        if (route.query.Flag) {
          return '';
        } else {
          return `${item.value},${item.value2}`;
        }
      } else if (item.fieldType == 4) {
        return item.value.join();
      } else {
        return `${item.value}`;
      }
    };
    const dataValue = (target) => {
      if (target === 'Start') {
        if (isFlag.value && counter.value < 1) {
          return '';
        } else {
          return getDate(7);
        }
      } else {
        if (isFlag.value && counter.value < 1) {
          return '';
        } else {
          return getDate();
        }
      }
    };

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
      passObj.Data.Category = category.value;
      passObj.Data.Status = status.value;
      passObj.Data.GlobalUserId = userInfo.userId;
      passObj.Data.CaseIndexDataList = [];
      passObj.Data.Flag = flag.value;
      form.value.forEach((item) => {
        passObj.Data.CaseIndexDataList.push({
          Code: item.code,
          Value: transferFieldType(item),
        });
        // 判斷日期(起始<結束)
        if (item.fieldType == 5) {
          const ds = new Date(item.value);
          const de = new Date(item.value2);
          const timeLimit = 30 * 24 * 60 * 60 * 1000;
          if (ds > de) {
            timeValid.value = false;
          } else {
            timeValid.value = true;
          }
          if ((item.value == '' && item.value2 == '') || de - ds <= timeLimit) {
            timeRangeValid.value = true;
          } else {
            timeRangeValid.value = false;
          }
        }
      });
      if (!timeValid.value) {
        store.dispatch(
          'setGlobalModalMessage',
          '結束日期不可小於開始日期'.value
        );
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      if (!timeRangeValid.value) {
        store.dispatch('setGlobalModalMessage', '查詢期間最大範圍為30日');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      isSearch.value = true;
      doPost('/Case/Query', passObj).then((response) => {
        columns.value = response.column;
        rows.value = [];
        // rows需要轉換
        response.rows.forEach((item, index) => {
          rows.value[index] = {};
          exportRows.value[index] = {};
          item.forEach((inner) => {
            Object.assign(rows.value[index], {
              [inner.field]:
                inner.field == 'Status'
                  ? statusTransfer[inner.value]
                  : inner.value,
            });
            Object.assign(exportRows.value[index], {
              [inner.field]: mappingCsv(inner),
            });
          });
        });

        console.log('當前row資料型態', rows.value);
        totalRecords.value = response.totalRecords;
        // csv setting處理
        columns.value.forEach((item) => {
          if (
            item.field == 'Id' ||
            item.field == 'Pickup' ||
            item.field == 'ProcessTransfer' ||
            item.field == 'ClickMe'
          ) {
            // do nothing
          } else {
            fields.value.push(item.field);
            labels[item.field] = item.label;
          }
        });
        // 從我的清單&單位清單待辦過來的確保搜出資料再counter+1
        counter.value = 1;
      });
    };

    const mappingCsv = (inner) => {
      if (inner.exportValue) {
        return inner.exportValue;
      } else {
        if (inner.field == 'Status') {
          return statusTransfer[inner.value];
        } else {
          return inner.value;
        }
      }
    };
    // 取件
    const handlePickUp = (row) => {
      caseId.value = row.Id;
      const passObj = {
        CaseIds: caseId.value,
        GlobalUserId: userInfo.userId,
      };
      doPost('/Case/PickUp', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    };

    // 開啟影像
    const handleView = (row) => {
      // 抓取id並設置當前案別
      caseId.value = row.Id;
      const passObj = {
        Flag: 901,
        CaseIds: [caseId.value],
        GlobalUserId: userInfo.userId,
      };
      // do 檢視api
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    };
    // 彈窗控制(處理權轉移)
    const showModal1 = (row) => {
      // 抓取id並設置當前案別
      this.caseId = row.Id;
      const passObj = {
        Flag: 901,
        Category: category.value,
        GlobalUserId: userInfo.userId,
        UnitId: userInfo.unitId,
      };
      doPost('/Common/GetUnitUserList', passObj).then((response) => {
        transferOptions.value = response;
        isModalVisible1.value = true;
      });
    };

    const closeModal1 = () => {
      transfer.value = -2;
      isModalVisible1.value = false;
    };
    const confirmModal1 = () => {
      if (!transfer.value || transfer.value == '-2') {
        transferErrMsg.value = '請填寫此欄位';
        return;
      }

      const passObj = {
        CaseId: caseId.value,
        UserId: transfer.value,
        GlobalUserId: userInfo.userId,
      };
      const tempTarget = transferOptions.value.filter(
        (item) => item.id == transfer.value
      );
      const targetTransfer = tempTarget[0].text;
      doPost('/Case/AssignOperator', passObj).then((response) => {
        console.log(response);
        if (response) {
          responseMessage.value = `案件已移轉予${targetTransfer}處理。`;
          showModal3();
        }
        isModalVisible1.value = false;
      });
    };

    const showModal2 = (row) => {
      // 抓取id並設置當前案別
      caseId.value = row.Id;
      isModalVisible2.value = true;
    };
    const closeModal2 = () => {
      isModalVisible2.value = false;
    };
    const confirmModal2 = () => {
      const passObj = {
        CaseId: caseId.value,
        GlobalUserId: userInfo.userId,
      };
      doPost('/Case/DeleteCase', passObj).then((response) => {
        if (response) {
          responseMessage.value = `案件已於系統內刪除。`;
          showModal3();
        }

        isModalVisible2.value = false;
      });
    };
    const showModal3 = () => {
      isModalVisible3.value = true;
    };
    const closeModal3 = () => {
      isModalVisible3.value = false;
    };
    const confirmModal3 = () => {
      // do something and close
      setTimeout(() => {
        isModalVisible3.value = false;
        loadItems();
      }, 100);
    };

    return {
      route,
      myform,
      done,
      isFlag,
      isDataBack,
      timeValid,
      timeRangeValid,
      isSearch,
      flag,
      isModalVisible1,
      isModalVisible2,
      isModalVisible3,
      category,
      categoryOptions,
      caseIndexList,
      form,
      status,
      paginationOptions,
      columns,
      rows,
      exportRows,
      totalRecords,
      statusTransfer,
      transfer,
      transferErrMsg,
      transferOptions,
      caseId,
      responseMessage,
      labels,
      fields,
      userInfo,
      counter,
      getDate,
      generatorCSVname,
      getCategoryList,
      bankingCenterChange,
      onSubmit,
      generatorRule,
      transferChange,
      clearQuery,
      onChangeCategory,
      onPageChange,
      onPerPageChange,
      onSortChange,
      transferFieldType,
      dataValue,
      loadItems,
      mappingCsv,
      handlePickUp,
      handleView,
      showModal1,
      closeModal1,
      confirmModal1,
      showModal2,
      closeModal2,
      confirmModal2,
      showModal3,
      closeModal3,
      confirmModal3,
    };
  },
};
</script>
