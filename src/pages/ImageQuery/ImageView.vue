<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">文件查詢暨調閱/補件</li>
        <li class="breadcrumb-item active" aria-current="page">
          影像查詢(調閱申請)
        </li>
      </ol>
    </nav>
    <h2 class="page-title">影像查詢(調閱申請)</h2>
    <Form @submit="onSubmit" v-slot="{ errors }">
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
        <div v-if="form.length > 0">
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
                        :value="getDate(7)"
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
                        :value="getDate()"
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
      </div>
      <div class="text-center mt-4">
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
    <Teleport to="body">
      <Loading v-if="isLoadingVisible" />
    </Teleport>
    <div v-if="isSearch && rows.length > 0" class="text-end mt-4">
      <!-- 測試匯出csv -->
      <JsonCSV
        :data="exportRows"
        :labels="labels"
        :fields="fields"
        :name="generatorCSVname('影像查詢(調閱申請)')"
      ></JsonCSV>
      <button
        type="button"
        class="btn btn-secondary btn-xs w100 me-3"
        @click="handleView"
      >
        檢視
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-xs w100"
        @click="handleApply"
      >
        調閱申請
      </button>
    </div>
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
        :pagination-options="paginationOptions"
        :sort-options="{ enabled: true }"
        :line-numbers="true"
      >
        <template #emptystate
          ><p class="mb-0 text-center">目前尚無資料</p></template
        >

        <template #table-column="props">
          <span v-if="props.column.field == 'View'">
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
          <span v-else-if="props.column.field == 'Apply'">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input me-2"
                v-model="viewApplyCheckBox"
                type="checkbox"
                @change="viewApplyMainChange"
              />
              <span>調閱申請</span>
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
          <span
            v-if="props.column.field == 'View' || props.column.field == 'Apply'"
          >
            <span
              v-if="
                props.formattedRow['CanView'] == true &&
                props.column.field == 'View'
              "
            >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  v-model="rows[props.row.originalIndex].viewValue"
                  @change="viewChange"
                  type="checkbox"
                />
              </div>
            </span>
            <span
              v-else-if="
                props.formattedRow['CanApply'] == true &&
                props.column.field == 'Apply'
              "
            >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  v-model="rows[props.row.originalIndex].viewApplyValue"
                  @change="viewApplyChange"
                  type="checkbox"
                />
              </div>
            </span>
          </span>
          <span v-else>
            <!-- 為解決客製化跑版微調樣式 -->
            <div
              class="form-check form-check-inline"
              :style="{ height: '40px' }"
            >
              <span>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </div>
          </span>
        </template>
      </vue-good-table>
    </div>
    <!-- 調閱申請Modal -->
    <Teleport to="body">
      <transition name="modal-fade">
        <Modal
          v-if="isModalVisible1"
          :showCancelBtn="true"
          :showConfirmBtn="true"
          :extraLargeSize="true"
          :type="'form'"
          @close="closeModal1"
        >
          <template #header> 調閱申請單 </template>
          <template #form>
            <Form ref="applyForm" @submit="confirmModal1" v-slot="{ errors }">
              <div class="modal-body-padding custom">
                <!-- start -->
                <div class="mb-1">申請資訊:</div>
                <div class="mb-4">
                  <div class="input-group border-bottom-0 row g-0">
                    <span class="col-sm-3 input-group-text py-2 px-4"
                      >調閱申請單位</span
                    >
                    <div class="col-sm-9 p-3">
                      <span
                        >{{ userInfo.unitCode }} {{ userInfo.unitName }}</span
                      >
                    </div>
                  </div>
                  <div class="input-group border-bottom-0 row g-0">
                    <span class="col-sm-3 input-group-text py-2 px-4"
                      >調閱申請人員</span
                    >
                    <div class="col-sm-9 p-3">
                      <span
                        >{{ userInfo.userCode }} {{ userInfo.userName }}</span
                      >
                    </div>
                  </div>
                  <div class="input-group border-bottom-0 row g-0">
                    <span class="col-sm-3 input-group-text py-2 px-4"
                      >調閱申請日期</span
                    >
                    <div class="col-sm-9 p-3">
                      <span>{{ getSlashDate() }}</span>
                    </div>
                  </div>
                  <div class="input-group border-bottom-0 row g-0">
                    <span class="col-sm-3 input-group-text py-2 px-4"
                      >申請角色</span
                    >
                    <div class="col-sm-4 p-3">
                      <Field
                        name="applyRole"
                        class="form-control"
                        :class="{ 'mb-2': errors.applyRole }"
                        as="select"
                        v-model="applyRole"
                        @change="applyRoleChange"
                        :rules="{ required: true }"
                      >
                        <option value="-2">請選擇</option>
                        <option
                          v-for="option in applyRoleOptions"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.text }}
                        </option>
                      </Field>
                      <span v-if="applyRoleMessage" class="error-msg">{{
                        applyRoleMessage
                      }}</span>
                    </div>
                    <div class="col-sm-5 p-3">
                      因您職務隸屬多重角色，請選擇欲以何種角色提出調閱申請
                    </div>
                  </div>
                  <div class="input-group border-bottom-0 row g-0">
                    <span class="col-sm-3 input-group-text py-2 px-4"
                      >調閱期間</span
                    >
                    <div class="col-sm-9 p-3">
                      <!-- 時間 -->
                      <div class="col-sm p-0 d-flex align-items-center">
                        <div>
                          <Field
                            :name="'startDate'"
                            v-slot="{ field }"
                            :rules="{ required: true }"
                          >
                            <div
                              class="input-group calendar-wrapper w180"
                              :class="{ 'mb-2': errors.startDate }"
                            >
                              <input
                                type="date"
                                class="form-control"
                                placeholder="請選擇起始日期"
                                v-model="startDate"
                                v-bind="field"
                                :min="getDate(0)"
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
                          <span class="error-msg">{{ errors.startDate }}</span>
                        </div>
                        <div class="mx-3">~</div>
                        <div>
                          <Field
                            :name="'endDate'"
                            v-slot="{ field }"
                            :rules="{ required: true }"
                          >
                            <div
                              class="input-group calendar-wrapper w180"
                              :class="{ 'mb-2': errors.endDate }"
                            >
                              <input
                                type="date"
                                class="form-control"
                                placeholder="請選擇結束日期"
                                v-model="endDate"
                                v-bind="field"
                                :min="getDate(0)"
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
                          <span class="error-msg">{{ errors.endDate }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="input-group border-bottom-0 row g-0">
                    <span class="col-sm-3 input-group-text py-2 px-4"
                      >調閱事由</span
                    >
                    <div class="col-sm-9 p-3">
                      <Field
                        name="processReason"
                        class="form-control"
                        :class="{ 'mb-2': processReasonMessage }"
                        as="select"
                        v-model="processReason"
                        :rules="{ required: true }"
                        @change="handleRequire('processReason')"
                      >
                        <option value="-2">請選擇</option>
                        <option
                          v-for="option in processReasonOptions"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.text }}
                        </option>
                      </Field>
                      <span v-if="processReasonMessage" class="error-msg">{{
                        processReasonMessage
                      }}</span>
                    </div>
                  </div>
                  <div class="input-group border-bottom-0 row g-0">
                    <span class="col-sm-3 input-group-text py-2 px-4"
                      >調閱說明</span
                    >
                    <div class="col-sm-9 p-3">
                      <Field
                        name="processText"
                        class="form-control"
                        :class="{ 'mb-2': errors.processText }"
                        as="textarea"
                        v-model="processText"
                        :rules="{ required: true }"
                        maxlength="100"
                        placeholder="說明調閱原因或指定調閱的影像，純文字，限100字"
                      >
                      </Field>
                      <span class="error-msg">{{ errors.processText }}</span>
                    </div>
                  </div>
                  <div class="input-group border-bottom-0 row g-0">
                    <span class="col-sm-3 input-group-text py-2 px-4"
                      >附檔一</span
                    >
                    <div class="col-sm-7 p-3">
                      <div class="customFileUpload d-flex">
                        <input
                          type="file"
                          class="form-control"
                          id="inputGroupFile01"
                          @change="onUpload('1')"
                          accept="image/jpeg,image/png,application/pdf"
                        />
                        <label
                          class="customFileUpload-btn input-group-text"
                          for="inputGroupFile01"
                          >上傳檔案</label
                        >
                      </div>
                    </div>
                    <div class="col-sm-2 p-3">
                      <div class="d-flex">
                        <label
                          class="input-group-text deleteFile"
                          @click="deleteFile('inputGroupFile01')"
                          >刪除檔案</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="input-group border-bottom-0 row g-0">
                    <span class="col-sm-3 input-group-text py-2 px-4"
                      >附檔二</span
                    >
                    <div class="col-sm-7 p-3">
                      <div class="customFileUpload d-flex">
                        <input
                          type="file"
                          class="form-control"
                          id="inputGroupFile02"
                          @change="onUpload('2')"
                          accept="image/jpeg,image/png,application/pdf"
                        />
                        <label
                          class="customFileUpload-btn input-group-text"
                          for="inputGroupFile02"
                          >上傳檔案</label
                        >
                      </div>
                    </div>
                    <div class="col-sm-2 p-3">
                      <div class="d-flex">
                        <label
                          class="input-group-text deleteFile"
                          @click="deleteFile('inputGroupFile02')"
                          >刪除檔案</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="input-group row g-0">
                    <span class="col-sm-3 input-group-text py-2 px-4"
                      >附檔三</span
                    >
                    <div class="col-sm-7 p-3">
                      <div class="customFileUpload d-flex">
                        <input
                          type="file"
                          class="form-control"
                          id="inputGroupFile03"
                          @change="onUpload('3')"
                          accept="image/jpeg,image/png,application/pdf"
                        />
                        <label
                          class="customFileUpload-btn input-group-text"
                          for="inputGroupFile03"
                          >上傳檔案</label
                        >
                      </div>
                    </div>
                    <div class="col-sm-1 p-3">
                      <div class="d-flex">
                        <label
                          class="input-group-text deleteFile"
                          @click="deleteFile('inputGroupFile03')"
                          >刪除檔案</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-1">調閱案件:</div>
                <div>
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
                  </vue-good-table>
                </div>
                <div class="my-2">放行人員:</div>
                <div class="input-group row g-0">
                  <span class="col-sm-3 input-group-text py-2 px-4"
                    >放行人員</span
                  >
                  <div class="col-sm-9 p-3">
                    <Field
                      name="operator"
                      class="form-control"
                      :class="{ 'mb-2': operatorMessage }"
                      as="select"
                      v-model="operator"
                      :rules="{ required: true }"
                      @change="handleRequire('operator')"
                    >
                      <option value="-2">請選擇</option>
                      <option
                        v-for="option in operatorOptions"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.text }}
                      </option>
                    </Field>
                    <span v-if="operatorMessage" class="error-msg">{{
                      operatorMessage
                    }}</span>
                  </div>
                </div>
                <!-- end -->
                <footer class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-md btn-secondary me-3 w220"
                    @click="closeModal1"
                  >
                    取消申請
                  </button>
                  <button class="btn btn-md btn-primary w220">送出申請</button>
                </footer>
              </div>
            </Form>
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
  .deleteFile {
    border: 1px solid #ced4da;
    cursor: pointer;
  }
}

.customFileUpload {
  position: relative;
}
.customFileUpload .customFileUpload-btn {
  position: absolute;
  top: 0px;
  right: 0;
  height: 100%;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>

<script>
import Loading from '@/components/Loading.vue';
import { Field, Form } from 'vee-validate';
import Select2 from 'vue3-select2-component';
import { VueGoodTable } from 'vue-good-table-next';
import Modal from '@/components/Modal.vue';
import JsonCSV from '@/components/JsonCSV';
import * as datatable from '@/utilities/datatable';
import { getDate } from '@/utilities/time';
import { generatorCSVname } from '@/utilities/time';

import store from '@/utilities/store';
import { doPost, doFilePost } from '@/utilities/api';
import { onMounted, reactive, ref } from 'vue';

export default {
  name: 'ImageView',
  components: { Field, Form, Loading, Select2, VueGoodTable, Modal, JsonCSV },
  setup() {
    // 結束時間是否早於起始判定
    const timeValid = ref(true);
    // 時間間隔是否大於30日
    const timeRangeValid = ref(true);
    // 結束時間是否早於起始判定
    const modalTimeValid = ref(true);
    // 第一次搜尋
    const isSearch = ref(false);
    // 調閱申請彈窗
    const isModalVisible1 = ref(false);
    // 提示訊息彈窗
    const isModalVisible2 = ref(false);
    const responseMessage = ref('');
    const viewCheckBox = ref(false);
    const viewApplyCheckBox = ref(false);
    const isLoadingVisible = ref(false);
    const category = ref(-2);
    const requestCategoryId = ref(0);
    const categoryOptions = ref([]);
    const currentMode = ref(0);
    const caseIndexList = ref([]);
    const form = ref([]);
    const applyForm = ref(null);
    const applyNo = ref('');
    const applyRole = ref(-2);
    const applyRoleMessage = ref('');
    const applyRoleOptions = ref([
      { id: 1, text: '角色1' },
      { id: 2, text: '角色2' },
      { id: 3, text: '角色3' },
    ]);
    const processReason = ref(-2);
    const processReasonMessage = ref('');
    const processReasonOptions = ref([
      { id: 1, text: '稽核處查核1' },
      { id: 2, text: '稽核處查核2' },
      { id: 3, text: '稽核處查核3' },
    ]);

    const operator = ref(-2);
    const operatorMessage = ref('');
    const operatorOptions = ref([
      { id: 1, text: '王大美' },
      { id: 2, text: '王中美' },
      { id: 3, text: '王小美' },
    ]);

    const startDate = ref('');
    const endDate = ref('');
    const processText = ref('');
    const file1 = ref('');
    const file2 = ref('');
    const file3 = ref('');
    // table
    const paginationOptions = reactive(datatable.paginationOptions);

    const columns = ref([]);
    const rows = ref([]);
    const exportRows = ref([]);
    const totalRecords = ref(0);
    const modalcolumns = ref([]);
    const modalrows = ref([]);
    const caseIds = ref([]);

    // 調閱申請單
    const applyInitForm = reactive({});
    // csv匯出設定(未完成)
    const labels = reactive({});
    const fields = ref([]);
    const userInfo = reactive({});

    Object.assign(userInfo, JSON.parse(localStorage.getItem('userInfo')));

    onMounted(() => {
      getCategoryList();
    });

    // methods
    // 取得業務類別
    const getCategoryList = async () => {
      const response = await doPost('/Common/GetCategoryList', {
        Flag: 601,
        GlobalUserId: userInfo.userId,
      });
      categoryOptions.value = response;
    };

    // 選擇業務類別時觸發
    const onChangeCategory = (event) => {
      // 重選選項先清空陣列避免重複欄位
      form.value = [];
      // 設定當前業務mode
      const result = categoryOptions.value.filter(
        (item) => item.id == event.target.value
      );
      currentMode.value = result[0].mode;
      // 根據選擇業務類別撈取索引
      doPost('/Common/GetCaseIndexListByCategory', {
        Category: event.target.value,
        GlobalUserId: userInfo.userId,
        Flag: 601,
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
            formData.value = item.defaultValue.split(',');
          } else {
            formData.value = item.defaultValue;
          }
          // 時間區間特殊處理
          if (item.fieldType === 5) {
            formData.code2 = `${item.code}2`;
            formData.value = getDate(7);
            formData.value2 = getDate();
          }
          form.value.push(formData);
          // 替換為主渲染變數
          caseIndexList.value = form.value;
        });
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

    const clearQuery = () => {
      // clear
      category.value = '-2';
      caseIndexList.value = [];
      form.value = [];
      rows.value = [];
    };

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

    const transferFieldType = (item) => {
      if (item.fieldType == 5) {
        return `${item.value},${item.value2}`;
      } else if (item.fieldType == 4) {
        return item.value.join();
      } else {
        return `${item.value}`;
      }
    };

    const loadItems = (params) => {
      console.log('fofo', form);
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
      passObj.Data.GlobalUserId = userInfo.userId;
      passObj.Data.CaseIndexDataList = [];
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
          if (de - ds <= timeLimit) {
            timeRangeValid.value = true;
          } else {
            timeRangeValid.value = false;
          }
        }
      });
      if (!timeValid.value) {
        store.dispatch('setGlobalModalMessage', '結束日期不可小於開始日期');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      if (!timeRangeValid.value) {
        store.dispatch('setGlobalModalMessage', '查詢期間最大範圍為30日');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      isSearch.value = true;
      doPost('/Image/Query', passObj).then((response) => {
        columns.value = response.column;
        columns.value.forEach((item) => {
          if (item.field === 'View' || item.field == 'Apply') {
            item.sortable = false;
          }
          item.width = '200px';
        });
        rows.value = [];
        // rows需要轉換
        response.rows.forEach((item, index) => {
          rows.value[index] = {};
          exportRows.value[index] = {};
          item.forEach((inner) => {
            Object.assign(rows.value[index], {
              [inner.field]: inner.value,
            });
            Object.assign(exportRows.value[index], {
              [inner.field]: inner.exportValue
                ? inner.exportValue
                : inner.value,
            });
          });
        });
        rows.value.forEach((item) => {
          if (item.View) {
            item.viewValue = false;
          } else if (item.Apply) {
            item.viewApplyValue = false;
          }
        });
        requestCategoryId.value = rows.value[0].CategoryId;
        totalRecords.value = response.totalRecords;
        // csv setting處理
        columns.value.forEach((item) => {
          if (
            item.field == 'Id' ||
            item.field == 'CanView' ||
            item.field == 'CanApply' ||
            item.field == 'CaseNo' ||
            item.field == 'CategoryId' ||
            item.field == 'View' ||
            item.field == 'Apply'
          ) {
            // do nothing
          } else {
            fields.value.push(item.field);
            labels[item.field] = item.label;
          }
        });
        console.log('hell no', caseIndexList, form);
      });
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
        // 開啟影像檢視Flag未確定
        Flag: 8,
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

    // 調閱申請
    const handleApply = () => {
      showModal1();
    };

    // 客製表頭勾選(檢視)
    const viewMainChange = () => {
      if (viewCheckBox.value) {
        rows.value.forEach((item) => {
          if (item.View && item.CanView) {
            item.viewValue = true;
          }
        });
      } else {
        rows.value.forEach((item) => {
          if (item.View && item.CanView) {
            item.viewValue = false;
          }
        });
      }
    };

    // 客製表頭勾選(調閱申請)
    const viewApplyMainChange = () => {
      if (viewApplyCheckBox.value) {
        rows.value.forEach((item) => {
          if (item.Apply && item.CanApply) {
            item.viewApplyValue = true;
          }
        });
      } else {
        rows.value.forEach((item) => {
          if (item.Apply && item.CanApply) {
            item.viewApplyValue = false;
          }
        });
      }
    };

    // 表內勾選框改變動作
    const viewChange = () => {
      // 驗證this.rows是不是每個都已經勾, 如果是把表頭v-mode改成true,反之
      const tempArr = rows.value.filter((item) => item.View === true);
      const checkEvery = tempArr.every((item) => item.viewValue === true);
      if (checkEvery) {
        viewCheckBox.value = true;
      } else {
        viewCheckBox.value = false;
      }
    };
    // 表內勾選框改變動作
    const viewApplyChange = () => {
      // 驗證this.rows是不是每個都已經勾, 如果是把表頭v-mode改成true,反之
      const tempArr = rows.value.filter((item) => item.Apply === true);
      const checkEvery = tempArr.every((item) => item.viewApplyValue === true);
      if (checkEvery) {
        viewApplyCheckBox.value = true;
      } else {
        viewApplyCheckBox.value = false;
      }
    };

    // 申請角色改變
    const applyRoleChange = () => {
      if (applyRole.value && applyRole.value != '-2') {
        applyRoleMessage.value = '';
      }
      const tempTarget = applyRoleOptions.value.filter(
        (item) => item.id == applyRole.value
      );
      Object.assign(applyInitForm, tempTarget[0]);
      const passObj = {
        Category: category.value,
        GlobalUserId: userInfo.userId,
        RoleId: applyRole.value,
      };
      doPost('/ApplyCase/GetApplyOperatorList', passObj).then((response) => {
        if (response) {
          operatorOptions.value = response;
        }
      });
    };

    // 彈窗控制(調閱申請)
    const showModal1 = () => {
      // 驗證有無選取調閱案件
      const tempArr = rows.value.filter((item) => item.viewApplyValue === true);
      caseIds.value = [];
      tempArr.forEach((item) => {
        caseIds.value.push(item.Id);
      });
      if (caseIds.value.length == 0) {
        responseMessage.value = '請勾選欲調閱申請的案件';
        showModal2();
        return;
      }
      const passObj = {
        Category: requestCategoryId.value,
        Mode: currentMode.value,
        CaseIds: caseIds.value,
        GlobalUserId: userInfo.userId,
      };
      doPost('/ApplyCase/QueryAddInitData', passObj).then((response) => {
        applyNo.value = response.applyNo;
        processReasonOptions.value = response.reasonList;
        applyRoleOptions.value = response.roleList;
        // 預設第一選項
        applyRole.value = applyRoleOptions.value[0].id;
        Object.assign(applyInitForm, applyRoleOptions.value[0]);
        operatorOptions.value = response.operatorList;
        // 設定modal中table
        modalcolumns.value = response.caseList.column;
        modalrows.value = [];
        response.caseList.rows.forEach((item, index) => {
          modalrows.value[index] = {};
          item.forEach((inner) => {
            Object.assign(modalrows.value[index], {
              [inner.field]: inner.value,
            });
          });
        });
        isModalVisible1.value = true;
      });
    };

    const closeModal1 = () => {
      isModalVisible1.value = false;
      // 清空欄位
      processReason.value = -2;
      processText.value = '';
      operator.value = -2;
      applyRole.value = -2;
      file1.value = '';
      file2.value = '';
      file3.value = '';
    };

    const confirmModal1 = () => {
      if (!applyRole.value || applyRole.value == '-2') {
        applyRoleMessage.value = '請填寫此欄位';
        return;
      }
      if (!processReason.value || processReason.value == '-2') {
        processReasonMessage.value = '請填寫此欄位';
        return;
      }
      if (!operator.value || operator.value == '-2') {
        operatorMessage.value = '請填寫此欄位';
        return;
      }
      const ds = new Date(startDate.value);
      const de = new Date(endDate.value);
      if (ds > de) {
        modalTimeValid.value = false;
      } else {
        modalTimeValid.value = true;
      }
      if (!modalTimeValid.value) {
        store.dispatch('setGlobalModalMessage', '結束日期不可小於開始日期');
        store.dispatch('toggleGlobalModal', true);
        return;
      }
      let formData = new FormData();
      formData.append('GlobalUserId', userInfo.userId);
      formData.append('Category', requestCategoryId.value);
      formData.append('RoleId', applyRole.value);
      formData.append('StartDate', startDate.value);
      formData.append('EndDate', endDate.value);
      formData.append('ReasonId', processReason.value);
      formData.append('Description', processText.value);
      formData.append('NextOperatorUserId', operator.value);
      formData.append('Files1', file1.value);
      formData.append('Files2', file2.value);
      formData.append('Files3', file3.value);
      caseIds.value.forEach((item, index) => {
        formData.append(`CaseIds[${index}]`, item);
      });
      // formData.append('CaseIds', this.caseIds);
      doFilePost('/ApplyCase/AddApply', formData).then((response) => {
        if (response) {
          isModalVisible1.value = false;
          applyForm.value.resetForm();
          responseMessage.value = `送出成功! 您的調閱申請單編號為:${response}`;
          // 清空欄位
          processReason.value = '';
          processText.value = '';
          operator.value = '';
          if (file1.value) {
            deleteFile('inputGroupFile01');
          }
          if (file2.value) {
            deleteFile('inputGroupFile02');
          }
          if (file3.value) {
            deleteFile('inputGroupFile03');
          }

          showModal2();
        }
      });
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
        loadItems();
      }, 100);
    };

    const onUpload = (e, target) => {
      if (target == '1') {
        file1.value = e.target.files[0];
      } else if (target == '2') {
        file2.value = e.target.files[0];
      } else {
        file3.value = e.target.files[0];
      }
    };

    const deleteFile = (target) => {
      if (target == 'inputGroupFile01') {
        file1.value = '';
      } else if (target == 'inputGroupFile02') {
        file2.value = '';
      } else {
        file3.value = '';
      }
      document.getElementById(target).value = '';
    };

    const handleRequire = (target) => {
      if (target == 'processReason') {
        if (processReason.value && processReason.value != '-2') {
          processReasonMessage.value = '';
        }
      } else if (target == 'operator') {
        if (operator.value && operator.value != '-2') {
          operatorMessage.value = '';
        }
      }
    };
    const getSlashDate = () => {
      let tempDate = new Date();
      let yyyy = tempDate.getFullYear();
      let mm = tempDate.getMonth() + 1;
      let dd = tempDate.getDate();
      if (mm < 10) {
        mm = `0${mm}`;
      }
      if (dd < 10) {
        dd = `0${dd}`;
      }
      return `${yyyy}/${mm}/${dd}`;
    };

    return {
      timeValid,
      timeRangeValid,
      modalTimeValid,
      isSearch,
      isModalVisible1,
      isModalVisible2,
      responseMessage,
      viewCheckBox,
      viewApplyCheckBox,
      isLoadingVisible,
      category,
      requestCategoryId,
      categoryOptions,
      currentMode,
      caseIndexList,
      form,
      applyForm,
      applyNo,
      applyRole,
      applyRoleMessage,
      applyRoleOptions,
      processReason,
      processReasonMessage,
      processReasonOptions,
      operator,
      operatorMessage,
      operatorOptions,
      startDate,
      endDate,
      processText,
      file1,
      file2,
      file3,
      paginationOptions,
      columns,
      rows,
      exportRows,
      totalRecords,
      modalcolumns,
      modalrows,
      caseIds,
      applyInitForm,
      labels,
      fields,
      userInfo,
      getCategoryList,
      getDate,
      generatorCSVname,
      onSubmit,
      generatorRule,
      clearQuery,
      onChangeCategory,
      updateParams,
      onPageChange,
      onPerPageChange,
      onSortChange,
      transferFieldType,
      loadItems,
      handleView,
      handleApply,
      viewMainChange,
      viewApplyMainChange,
      viewChange,
      viewApplyChange,
      applyRoleChange,
      showModal1,
      closeModal1,
      confirmModal1,
      showModal2,
      closeModal2,
      confirmModal2,
      onUpload,
      deleteFile,
      handleRequire,
      getSlashDate,
    };
  },
};
</script>
