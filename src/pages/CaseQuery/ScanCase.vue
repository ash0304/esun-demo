<template>
  <div class="mt-4 px-4">
    <Form ref="form" @submit="onSubmit" v-slot="{ errors }">
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

import store from '@/utilities/store';
import { doPost } from '@/utilities/api';

export default {
  name: 'ScanCase',
  components: { Field, Form, Select2, VueGoodTable, Modal, JsonCSV },
  data() {
    return {
      // 動態索引是否處理完畢
      done: false,
      // 是否存在flag
      isFlag: false,
      // 動態資料是否完成?
      isDataBack: false,
      // 結束時間是否早於起始判定
      timeValid: true,
      // 時間間隔是否大於30日
      timeRangeValid: true,
      // 第一次搜尋
      isSearch: false,
      flag: 901,
      // 處理權彈窗
      isModalVisible1: false,
      // 是否刪除彈窗
      isModalVisible2: false,
      // api結果彈窗
      isModalVisible3: false,
      category: -2,
      categoryOptions: [],
      caseIndexList: [],
      form: [],
      status: -1,
      paginationOptions: datatable.paginationOptions,
      columns: [],
      rows: [],
      exportRows: [],
      totalRecords: 0,
      statusTransfer: {
        0: '待取件',
        1: '處理中',
        2: '已歸檔',
      },
      transfer: -2,
      transferErrMsg: '',
      transferOptions: [],
      caseId: 0,
      responseMessage: '',
      // csv匯出設定
      labels: {},
      fields: [],
      userInfo: {},
      counter: 0,
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  mounted() {
    if (this.$route.query.Flag) {
      this.isFlag = true;
      this.getCategoryList();
    }
  },
  methods: {
    getDate,
    generatorCSVname,
    bankingCenterChange(e) {
      this.form.forEach((item) => {
        if (item.code == 'ArchiveUnit') {
          item.value = [];
          item.options = item.dataSource.filter(
            (i) => i.parentId == e.target.value
          );
        }
      });
    },
    onSubmit() {
      this.loadItems();
    },
    generatorRule(index) {
      if (this.form[index]?.isRequired) {
        if (Array.isArray(this.form[index]?.value)) {
          if (!this.form[index]?.value.length) {
            return '請填寫此欄位';
          }
        } else {
          if (this.form[index]?.value == '-2' || !this.form[index]?.value) {
            return '請填寫此欄位';
          }
        }
      }
      if (this.form[index]?.regexRule) {
        if (Array.isArray(this.form[index]?.value)) {
          if (!this.form[index]?.value.length) {
            return true;
          }
        } else {
          if (this.form[index]?.value == '-2' || !this.form[index]?.value) {
            return true;
          }
        }
        const regex = new RegExp(this.form[index]?.regexRule);
        if (!regex.test(this.form[index]?.value)) {
          return '請修改此欄位格式';
        }
      }
      return true;
    },
    // 新處理人員變動
    transferChange() {
      if (this.transfer && this.transfer != '-2') {
        this.transferErrMsg = '';
      }
    },
    clearQuery() {
      // clear
      this.category = -2;
      this.caseIndexList = [];
      this.form = [];
      this.rows = [];
      this.status = -1;
      this.$refs.form.resetForm();
    },
    // 取得業務類別
    getCategoryList() {
      doPost('/Common/GetCategoryList', {
        Flag: 901,
        GlobalUserId: this.userInfo.userId,
      }).then((response) => {
        this.categoryOptions = response;
        // 如果從公告導向過來
        if (this.$route.query.Flag && this.counter < 1) {
          this.category = this.$route.query.Category;
          this.onChangeCategory();
        } else {
          this.onChangeCategory();
        }
      });
    },
    // 選擇業務類別時觸發
    onChangeCategory() {
      // 重選選項先清空陣列避免重複欄位
      this.done = false;
      this.form = [];
      // 根據選擇業務類別撈取索引
      doPost('/Common/GetCaseIndexListByCategory', {
        Category: this.category,
        GlobalUserId: this.userInfo.userId,
        Flag: 901,
      }).then((response) => {
        this.caseIndexList = response;
        this.caseIndexList.forEach((item) => {
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

            let loaded = this.form.every((el) => el.loaded);
            if (loaded) {
              //
            }
          }
          if (item.fieldType == 4) {
            // flag
            if (this.$route.query.Flag && this.counter < 1) {
              formData.value = [];
            } else {
              formData.value = item.defaultValue.split(',');
            }
          } else {
            // flag
            if (this.$route.query.Flag && this.counter < 1) {
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
            if (this.$route.query.Flag && this.counter < 1) {
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
            if (this.$route.query.ArchiveUnit && this.counter < 1) {
              formData.value = this.$route.query.ArchiveUnit.split(',');
            }
          }
          // 公告首頁導向特殊處理
          if (item.code == 'WorkTeam') {
            if (this.$route.query.WorkTeam && this.counter < 1) {
              formData.value = this.$route.query.WorkTeam.split(',');
            }
          }
          // 公告首頁導向特殊處理103Flag
          if (item.code == 'ScanUser') {
            if (this.$route.query.ScanUser && this.counter < 1) {
              formData.value = [this.$route.query.ScanUser];
            }
          }
          this.form.push(formData);
          // 替換為主渲染變數
          this.caseIndexList = this.form;
        });
        this.done = true;
        console.log('this.caseIndexList', this.caseIndexList);
        if (this.$route.query.Flag && this.counter < 1) {
          this.flag = parseInt(this.$route.query.Flag);
          this.category = this.$route.query.Category;
          if (
            this.$route.query.Status === '0' ||
            this.$route.query.Status === '1'
          ) {
            this.status = parseInt(this.$route.query.Status);
          }
          this.loadItems();
        }
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
    transferFieldType(item) {
      if (item.fieldType == 5) {
        if (this.$route.query.Flag) {
          return '';
        } else {
          return `${item.value},${item.value2}`;
        }
      } else if (item.fieldType == 4) {
        return item.value.join();
      } else {
        return `${item.value}`;
      }
    },
    dataValue(target) {
      if (target === 'Start') {
        if (this.isFlag && this.counter < 1) {
          return '';
        } else {
          return this.getDate(7);
        }
      } else {
        if (this.isFlag && this.counter < 1) {
          return '';
        } else {
          return this.getDate();
        }
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
      passObj.Data.Category = this.category;
      passObj.Data.Status = this.status;
      passObj.Data.GlobalUserId = this.userInfo.userId;
      passObj.Data.CaseIndexDataList = [];
      passObj.Data.Flag = this.flag;
      this.form.forEach((item) => {
        passObj.Data.CaseIndexDataList.push({
          Code: item.code,
          Value: this.transferFieldType(item),
        });
        // 判斷日期(起始<結束)
        if (item.fieldType == 5) {
          const ds = new Date(item.value);
          const de = new Date(item.value2);
          const timeLimit = 30 * 24 * 60 * 60 * 1000;
          if (ds > de) {
            this.timeValid = false;
          } else {
            this.timeValid = true;
          }
          if ((item.value == '' && item.value2 == '') || de - ds <= timeLimit) {
            this.timeRangeValid = true;
          } else {
            this.timeRangeValid = false;
          }
        }
      });
      if (!this.timeValid) {
        store.dispatch('setGlobalModalMessage', '結束日期不可小於開始日期');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      if (!this.timeRangeValid) {
        store.dispatch('setGlobalModalMessage', '查詢期間最大範圍為30日');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      this.isSearch = true;
      doPost('/Case/Query', passObj).then((response) => {
        const { column, rows, totalRecords } = response;
        this.columns = column;
        this.rows = [];
        // rows需要轉換
        rows.forEach((item, index) => {
          this.rows[index] = {};
          this.exportRows[index] = {};
          item.forEach((inner) => {
            Object.assign(this.rows[index], {
              [inner.field]:
                inner.field == 'Status'
                  ? this.statusTransfer[inner.value]
                  : inner.value,
            });
            Object.assign(this.exportRows[index], {
              [inner.field]: this.mappingCsv(inner),
            });
          });
        });

        console.log('當前row資料型態', this.rows);
        this.totalRecords = totalRecords;
        // csv setting處理
        this.columns.forEach((item) => {
          if (
            item.field == 'Id' ||
            item.field == 'Pickup' ||
            item.field == 'ProcessTransfer' ||
            item.field == 'ClickMe'
          ) {
            // do nothing
          } else {
            this.fields.push(item.field);
            this.labels[item.field] = item.label;
          }
        });
        // 從我的清單&單位清單待辦過來的確保搜出資料再counter+1
        this.counter = 1;
      });
    },
    mappingCsv(inner) {
      if (inner.exportValue) {
        return inner.exportValue;
      } else {
        if (inner.field == 'Status') {
          return this.statusTransfer[inner.value];
        } else {
          return inner.value;
        }
      }
    },
    // 取件
    handlePickUp(row) {
      this.caseId = row.Id;
      const passObj = {
        CaseIds: this.caseId,
        GlobalUserId: this.userInfo.userId,
      };
      doPost('/Case/PickUp', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    },
    // 開啟影像
    handleView(row) {
      // 抓取id並設置當前案別
      this.caseId = row.Id;
      const passObj = {
        Flag: 901,
        CaseIds: [this.caseId],
        GlobalUserId: this.userInfo.userId,
      };
      // do 檢視api
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    },
    // 彈窗控制(處理權轉移)
    showModal1(row) {
      // 抓取id並設置當前案別
      this.caseId = row.Id;
      const passObj = {
        Flag: 901,
        Category: this.category,
        GlobalUserId: this.userInfo.userId,
        UnitId: this.userInfo.unitId,
      };
      doPost('/Common/GetUnitUserList', passObj).then((response) => {
        this.transferOptions = response;
        this.isModalVisible1 = true;
      });
    },
    closeModal1() {
      this.transfer = -2;
      this.isModalVisible1 = false;
    },
    confirmModal1() {
      if (!this.transfer || this.transfer == '-2') {
        this.transferErrMsg = '請填寫此欄位';
        return;
      }

      const passObj = {
        CaseId: this.caseId,
        UserId: this.transfer,
        GlobalUserId: this.userInfo.userId,
      };
      const tempTarget = this.transferOptions.filter(
        (item) => item.id == this.transfer
      );
      const targetTransfer = tempTarget[0].text;
      doPost('/Case/AssignOperator', passObj).then((response) => {
        console.log(response);
        if (response) {
          this.responseMessage = `案件已移轉予${targetTransfer}處理。`;
          this.showModal3();
        }

        this.isModalVisible1 = false;
      });
    },
    showModal2(row) {
      // 抓取id並設置當前案別
      this.caseId = row.Id;
      this.isModalVisible2 = true;
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    confirmModal2() {
      const passObj = {
        CaseId: this.caseId,
        GlobalUserId: this.userInfo.userId,
      };
      doPost('/Case/DeleteCase', passObj).then((response) => {
        if (response) {
          this.responseMessage = `案件已於系統內刪除。`;
          this.showModal3();
        }

        this.isModalVisible2 = false;
      });
    },
    showModal3() {
      this.isModalVisible3 = true;
    },
    closeModal3() {
      this.isModalVisible3 = false;
    },
    confirmModal3() {
      // do something and close
      setTimeout(() => {
        this.isModalVisible3 = false;
        this.loadItems();
      }, 100);
    },
  },
};
</script>
