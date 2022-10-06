<template>
  <div class="mt-4 px-4">
    <Form @submit="onSubmit" v-slot="{ errors }">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">文件掃描(新增)</li>
          <li class="breadcrumb-item active" aria-current="page">
            高速掃描機掃描
          </li>
        </ol>
      </nav>
      <h2 class="page-title">高速掃描機掃描</h2>
      <div class="mb-4">
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
                  <Field
                    :name="caseIndex.code"
                    v-slot="{ field }"
                    :rules="{ required: caseIndex.isRequired }"
                    :value="caseIndex.defaultValue"
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
                  <span class="error-msg">{{ errors[caseIndex.code] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Teleport to="body">
        <transition name="modal-fade">
          <Modal
            v-if="isModalVisible"
            :showCancelBtn="false"
            :showConfirmBtn="true"
            @close="closeModal"
            @confirm="closeModal"
          >
            <template #header> 提示 </template>
            <template #body>
              <div class="modal-body-padding">
                {{ scanCheck }}
              </div>
            </template>
            <template #cancelBtn> 取消 </template>
            <template #confirmBtn> 確定 </template>
          </Modal>
        </transition>
      </Teleport>
      <div class="text-center">
        <button
          class="btn btn-primary btn-md w320"
          :disabled="category == '-2'"
        >
          開啟掃描機
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Field, Form } from 'vee-validate';
import Select2 from 'vue3-select2-component';
import Modal from '@/components/Modal.vue';

import { doPost } from '@/utilities/api';

export default {
  name: 'ActiveScanAgent',
  components: { Form, Field, Select2, Modal },
  data() {
    return {
      scanCheck: '系統未偵測到Scan Agent! 請至玉山安裝專區，下載安裝',
      category: -2,
      categoryOptions: [],
      caseIndexList: [],
      form: [],
      isModalVisible: false,
      scanViewerUrl: '',
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
    errorHandler() {
      this.showModal();
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
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
    // 表單傳送
    onSubmit() {
      let passObj = {
        Category: this.category,
        GlobalUserId: this.userInfo.userId,
        CaseIndexDataList: [],
      };
      this.form.forEach((item) => {
        passObj.CaseIndexDataList.push({
          Code: item.code,
          Value: item.fieldType == 4 ? item.value.join() : item.value,
        });
      });
      // call url api
      doPost('/FileScan/ActiveScanAgent', passObj).then((response) => {
        try {
          window.protocolCheck(response, this.errorHandler);
        } catch (error) {
          console.log(error);
        }
      });
    },
    // 取得業務類別
    async getCategoryList() {
      const response = await doPost('/Common/GetCategoryList', {
        Flag: 301,
        GlobalUserId: this.userInfo.userId,
      });
      this.categoryOptions = response;
    },
    // 選擇業務類別時觸發
    onChangeCategory(event) {
      // change時進入loading

      // 重選選項先清空陣列避免重複欄位
      this.form = [];
      // 根據選擇業務類別撈取索引
      doPost('/Common/GetCaseIndexListByCategory', {
        Category: event.target.value,
        GlobalUserId: this.userInfo.userId,
        Flag: 301,
      }).then((response) => {
        this.caseIndexList = response;
        this.caseIndexList.forEach((item) => {
          // 建立暫時存放表
          let formData = {
            ...item,
            options: [],
            loaded: item.fieldType == 2 || item.fieldType == 3 ? false : true,
            value: item.fieldType == 2 ? '-2' : '',
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
          this.form.push(formData);
          // 替換為主渲染變數
          this.caseIndexList = this.form;
        });
      });
    },
  },
};
</script>
