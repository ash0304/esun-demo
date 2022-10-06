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
    <Form ref="form" @submit="onSubmit" v-slot="{ errors }">
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
                          @change="onUpload1"
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
                          @change="onUpload2"
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
                          @change="onUpload3"
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

export default {
  name: 'ImageView',
  components: { Field, Form, Loading, Select2, VueGoodTable, Modal, JsonCSV },
  data() {
    return {
      // 結束時間是否早於起始判定
      timeValid: true,
      // 時間間隔是否大於30日
      timeRangeValid: true,
      // 第一次搜尋
      isSearch: false,
      // 調閱申請彈窗
      isModalVisible1: false,
      // 提示訊息彈窗
      isModalVisible2: false,
      responseMessage: '',
      viewCheckBox: false,
      viewApplyCheckBox: false,
      isLoadingVisible: false,
      category: -2,
      categoryOptions: [],
      currentMode: 0,
      caseIndexList: [],
      form: [],
      applyNo: '',
      applyRole: -2,
      applyRoleMessage: '',
      applyRoleOptions: [
        { id: 1, text: '角色1' },
        { id: 2, text: '角色2' },
        { id: 3, text: '角色3' },
      ],
      processReason: -2,
      processReasonMessage: '',
      processReasonOptions: [
        { id: 1, text: '稽核處查核1' },
        { id: 2, text: '稽核處查核2' },
        { id: 3, text: '稽核處查核3' },
      ],
      operator: -2,
      operatorMessage: '',
      operatorOptions: [
        { id: 1, text: '王大美' },
        { id: 2, text: '王中美' },
        { id: 3, text: '王小美' },
      ],
      startDate: '',
      endDate: '',
      processText: '',
      file1: '',
      file2: '',
      file3: '',
      paginationOptions: datatable.paginationOptions,
      columns: [],
      rows: [],
      exportRows: [],
      totalRecords: 0,
      modalcolumns: [],
      modalrows: [],
      caseIds: [],
      // 調閱申請單
      applyInitForm: {},
      // csv匯出設定(未完成)
      labels: {},
      fields: [],
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
    getDate,
    generatorCSVname,
    bankingCenterChange(e) {
      this.form.forEach((item) => {
        if (item.code == 'ArchiveUnit') {
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
    clearQuery() {
      // clear
      this.category = '-2';
      this.caseIndexList = [];
      this.form = [];
      this.status = -1;
      this.rows = [];
    },
    // 取得業務類別
    async getCategoryList() {
      const response = await doPost('/Common/GetCategoryList', {
        Flag: 601,
        GlobalUserId: this.userInfo.userId,
      });
      this.categoryOptions = response;
    },
    // 選擇業務類別時觸發
    onChangeCategory(event) {
      // change時進入loading

      // 重選選項先清空陣列避免重複欄位
      this.form = [];
      // 設定當前業務mode
      const result = this.categoryOptions.filter(
        (item) => item.id == event.target.value
      );
      this.currentMode = result[0].mode;
      // 根據選擇業務類別撈取索引
      doPost('/Common/GetCaseIndexListByCategory', {
        Category: event.target.value,
        GlobalUserId: this.userInfo.userId,
        Flag: 601,
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
          this.form.push(formData);
          // 替換為主渲染變數
          this.caseIndexList = this.form;
        });
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
    transferFieldType(item) {
      if (item.fieldType == 5) {
        return `${item.value},${item.value2}`;
      } else if (item.fieldType == 4) {
        return item.value.join();
      } else {
        return `${item.value}`;
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
      passObj.Data.GlobalUserId = this.userInfo.userId;
      passObj.Data.CaseIndexDataList = [];
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
          if (de - ds <= timeLimit) {
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
      doPost('/Image/Query', passObj).then((response) => {
        const { column, rows, totalRecords } = response;
        this.columns = column;
        this.columns.forEach((item) => {
          if (item.field === 'View' || item.field == 'Apply') {
            item.sortable = false;
          }
          item.width = '200px';
        });
        this.rows = [];
        // rows需要轉換
        rows.forEach((item, index) => {
          this.rows[index] = {};
          this.exportRows[index] = {};
          item.forEach((inner) => {
            Object.assign(this.rows[index], {
              [inner.field]: inner.value,
            });
            Object.assign(this.exportRows[index], {
              [inner.field]: inner.exportValue
                ? inner.exportValue
                : inner.value,
            });
          });
        });
        this.rows.forEach((item) => {
          if (item.View) {
            item.viewValue = false;
          } else if (item.Apply) {
            item.viewApplyValue = false;
          }
        });
        this.totalRecords = totalRecords;
        // csv setting處理
        this.columns.forEach((item) => {
          if (
            item.field == 'Id' ||
            item.field == 'CanView' ||
            item.field == 'CanApply' ||
            item.field == 'CaseNo' ||
            item.field == 'View' ||
            item.field == 'Apply'
          ) {
            // do nothing
          } else {
            this.fields.push(item.field);
            this.labels[item.field] = item.label;
          }
        });
      });
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
        // 開啟影像檢視Flag未確定
        Flag: 8,
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
    // 調閱申請
    handleApply() {
      this.showModal1();
    },
    // 客製表頭勾選(檢視)
    viewMainChange() {
      if (this.viewCheckBox) {
        this.rows.forEach((item) => {
          if (item.View && item.CanView) {
            item.viewValue = true;
          }
        });
      } else {
        this.rows.forEach((item) => {
          if (item.View && item.CanView) {
            item.viewValue = false;
          }
        });
      }
    },
    // 客製表頭勾選(調閱申請)
    viewApplyMainChange() {
      if (this.viewApplyCheckBox) {
        this.rows.forEach((item) => {
          if (item.Apply && item.CanApply) {
            item.viewApplyValue = true;
          }
        });
      } else {
        this.rows.forEach((item) => {
          if (item.Apply && item.CanApply) {
            item.viewApplyValue = false;
          }
        });
      }
    },
    // 表內勾選框改變動作
    viewChange() {
      // 驗證this.rows是不是每個都已經勾, 如果是把表頭v-mode改成true,反之
      const tempArr = this.rows.filter((item) => item.View === true);
      const checkEvery = tempArr.every((item) => item.viewValue === true);
      if (checkEvery) {
        this.viewCheckBox = true;
      } else {
        this.viewCheckBox = false;
      }
    },
    // 表內勾選框改變動作
    viewApplyChange() {
      // 驗證this.rows是不是每個都已經勾, 如果是把表頭v-mode改成true,反之
      const tempArr = this.rows.filter((item) => item.Apply === true);
      const checkEvery = tempArr.every((item) => item.viewApplyValue === true);
      if (checkEvery) {
        this.viewApplyCheckBox = true;
      } else {
        this.viewApplyCheckBox = false;
      }
    },
    // 申請角色改變
    applyRoleChange() {
      if (this.applyRole && this.applyRole != '-2') {
        this.applyRoleMessage = '';
      }
      const tempTarget = this.applyRoleOptions.filter(
        (item) => item.id == this.applyRole
      );
      this.applyInitForm = tempTarget[0];
    },
    // 彈窗控制(調閱申請)
    showModal1() {
      // 驗證有無選取調閱案件
      const tempArr = this.rows.filter((item) => item.viewApplyValue === true);
      this.caseIds = [];
      tempArr.forEach((item) => {
        this.caseIds.push(item.Id);
      });
      if (this.caseIds.length == 0) {
        this.responseMessage = '請勾選欲調閱申請的案件';
        this.showModal2();
        return;
      }
      const passObj = {
        Category: this.category,
        Mode: this.currentMode,
        CaseIds: this.caseIds,
        GlobalUserId: this.userInfo.userId,
      };
      doPost('/ApplyCase/QueryAddInitData', passObj).then((response) => {
        const { applyNo, caseList, operatorList, reasonList, roleList } =
          response;
        this.applyNo = applyNo;
        this.processReasonOptions = reasonList;
        this.applyRoleOptions = roleList;
        // 預設第一選項
        this.applyRole = this.applyRoleOptions[0].id;
        this.applyInitForm = this.applyRoleOptions[0];
        this.operatorOptions = operatorList;
        // 設定modal中table
        this.modalcolumns = caseList.column;
        this.modalrows = [];
        caseList.rows.forEach((item, index) => {
          this.modalrows[index] = {};
          item.forEach((inner) => {
            Object.assign(this.modalrows[index], {
              [inner.field]: inner.value,
            });
          });
        });
        this.isModalVisible1 = true;
      });
    },
    closeModal1() {
      this.isModalVisible1 = false;
      // 清空欄位
      this.processReason = -2;
      this.processText = '';
      this.operator = -2;
      this.applyRole = -2;
      this.file1 = '';
      this.file2 = '';
      this.file3 = '';
      this.$refs.applyForm.resetForm();
    },
    confirmModal1() {
      if (!this.applyRole || this.applyRole == '-2') {
        this.applyRoleMessage = '請填寫此欄位';
        return;
      }
      if (!this.processReason || this.processReason == '-2') {
        this.processReasonMessage = '請填寫此欄位';
        return;
      }
      if (!this.operator || this.operator == '-2') {
        this.operatorMessage = '請填寫此欄位';
        return;
      }
      let formData = new FormData();
      formData.append('GlobalUserId', this.userInfo.userId);
      formData.append('Category', this.category);
      formData.append('RoleId', this.applyRole);
      formData.append('StartDate', this.startDate);
      formData.append('EndDate', this.endDate);
      formData.append('ReasonId', this.processReason);
      formData.append('Description', this.processText);
      formData.append('NextOperatorUserId', this.operator);
      formData.append('Files1', this.file1);
      formData.append('Files2', this.file2);
      formData.append('Files3', this.file3);
      this.caseIds.forEach((item, index) => {
        formData.append(`CaseIds[${index}]`, item);
      });
      // formData.append('CaseIds', this.caseIds);
      doFilePost('/ApplyCase/AddApply', formData).then((response) => {
        if (response) {
          this.isModalVisible1 = false;
          this.$refs.applyForm.resetForm();
          this.responseMessage = `送出成功! 您的調閱申請單編號為:${response}`;
          // 清空欄位
          this.processReason = '';
          this.processText = '';
          this.operator = '';
          if (this.file1) {
            this.deleteFile('inputGroupFile01');
          }
          if (this.file2) {
            this.deleteFile('inputGroupFile02');
          }
          if (this.file3) {
            this.deleteFile('inputGroupFile03');
          }

          this.showModal2();
        }
      });
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
        this.loadItems();
      }, 100);
    },
    // 文件處理
    onUpload1(e) {
      this.file1 = e.target.files[0];
    },
    onUpload2(e) {
      this.file2 = e.target.files[0];
    },
    onUpload3(e) {
      this.file3 = e.target.files[0];
    },
    deleteFile(target) {
      if (target == 'inputGroupFile01') {
        this.file1 = '';
      } else if (target == 'inputGroupFile02') {
        this.file2 = '';
      } else {
        this.file3 = '';
      }
      document.getElementById(target).value = '';
    },
    handleRequire(target) {
      if (target == 'processReason') {
        if (this.processReason && this.processReason != '-2') {
          this.processReasonMessage = '';
        }
      } else if (target == 'operator') {
        if (this.operator && this.operator != '-2') {
          this.operatorMessage = '';
        }
      }
    },
    getSlashDate() {
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
    },
  },
};
</script>
