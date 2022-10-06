<template>
  <div class="mt-4 px-4">
    <Form @submit="onSubmit" v-slot="{ errors }">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">文件掃描(新增)</li>
          <li class="breadcrumb-item active" aria-current="page">
            事務機掃描(列印 QR Code)
          </li>
        </ol>
      </nav>
      <h2 class="page-title">事務機掃描(列印 QR Code)</h2>
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
        <!-- 消金貸款案件(CPS) 判斷Mode出現 -->
        <div
          v-if="currentMode == 5 || currentMode == 6"
          class="input-group border-bottom-0 row g-0"
        >
          <span class="col-sm-2 input-group-text py-2 px-4">產品別</span>
          <div class="col-sm-10 p-3">
            <Field
              name="productType"
              class="form-control"
              v-model="productType"
              placeholder="請選擇產品別"
              @change="onChangeProductType($event)"
              as="select"
              :rules="{ required: true }"
            >
              <option value="-2">請選擇</option>
              <option
                v-for="product in productTypeOptions"
                :key="product.id"
                :value="product.id"
              >
                {{ product.text }}
              </option>
            </Field>
            <span class="error-msg">{{ errors.productType }}</span>
          </div>
        </div>
        <div v-if="isShowSeparator" class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">只印分頁</span>
          <div class="col-sm-10 p-3">
            <div class="d-flex">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="onlySeparator"
                  v-model="onlySeparator"
                  id="inlineRadio1"
                  :value="true"
                />
                <label class="form-check-label" for="inlineRadio1">是</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="onlySeparator"
                  v-model="onlySeparator"
                  id="inlineRadio2"
                  :value="false"
                  checked
                />
                <label class="form-check-label" for="inlineRadio2">否</label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isShowSeparator" class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">分頁類型</span>
          <div class="col-sm-10 p-3">
            <TreeView
              :config="config"
              :nodes="nodes"
              v-model="pageType"
              @nodeChecked="nodeChecked"
            />
            <span v-if="treeViewMsg" class="error-msg">{{ treeViewMsg }}</span>
          </div>
        </div>
      </div>
      <div class="text-center mb-4">
        <button
          class="btn btn-primary btn-md w320"
          :disabled="category == '-2'"
        >
          產製QR Code
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Field, Form } from 'vee-validate';
import Select2 from 'vue3-select2-component';
import TreeView from '@/components/TreeView.vue';

import { doPost } from '@/utilities/api';
import store from '@/utilities/store';

export default {
  name: 'GenerateQRCode',
  components: { Form, Field, Select2, TreeView },
  data() {
    return {
      PDFsource: '',
      // tree view 自定義錯誤訊息
      treeViewMsg: '',
      documentType: [],
      // 當前Mode, 判斷消金
      currentMode: 0,
      isShowSeparator: false,
      category: -2,
      productType: -2,
      onlySeparator: false,
      categoryOptions: [],
      caseIndexList: [],
      form: [],
      productTypeOptions: [],
      pageType: {},
      // tree view fake date
      nodes: {},
      // tree view setting
      config: {
        roots: ['-1'],
        checkboxes: true,
        checkMode: 0,
        dragAndDrop: false,
      },
      // tree view drag function temp varible
      targetNodeId: '',
      tempNodes: '',
      test: [],
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
    onSubmit() {
      // 若tree view 存在
      if (this.isShowSeparator) {
        // 檢驗tree view是否有填寫
        let tempNodeArr = Object.values(this.nodes);
        const checkIfEmpty = tempNodeArr.every(
          (item) => item.state.checked === false
        );
        // 清空站存勾選
        this.documentType = [];
        // 取得當前勾選
        tempNodeArr.forEach((item) => {
          if (item.state.checked) {
            this.documentType.push(item.id);
          }
        });
        if (checkIfEmpty) {
          this.treeViewMsg = '請填寫此欄位';
          return;
        }
      }

      // 打產製qrcode api
      const passObj = {
        CaseIndexDataList: [],
      };
      passObj['OnlySeparator'] = this.onlySeparator;
      passObj['Category'] = this.category;
      // passObj['DocumentType'] = this.documentType;
      passObj['DocumentType'] = this.documentType.filter(
        (item) => item !== '-1'
      );

      passObj['GlobalUserId'] = this.userInfo.userId;
      this.form.forEach((item) => {
        passObj.CaseIndexDataList.push({
          Code: item.code,
          Value: item.fieldType == 4 ? item.value.join() : item.value,
        });
      });
      // 先清空
      store.dispatch('setPDFString', '');
      doPost('/FileScan/GenerateQRCode', passObj).then((response) => {
        if (response) {
          store.dispatch(
            'setPDFString',
            `data:application/pdf;base64,${response}`
          );
          //
          let bstr = window.atob(`${response}`);
          let n = bstr.length;
          let u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          let blob = new Blob([u8arr], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          //
          let pdfWindow = window.open('');
          pdfWindow.document.write(`<html><title>列印頁面</title>`);
          pdfWindow.document.write(
            `<embed width='100%' height='100%' style="margin: 0" src='${url}'></embed>`
          );
          pdfWindow.document.write(`</html>`);
        } else {
          // alert
          store.dispatch('setGlobalModalMessage', response);
          store.dispatch('toggleGlobalModal', true);
        }
      });
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
    // 文件層勾選事件(清除必填message)
    nodeChecked() {
      let tempNodeArr = Object.values(this.nodes);
      const checkIfEmpty = tempNodeArr.every(
        (item) => item.state.checked === false
      );
      if (checkIfEmpty) {
        this.treeViewMsg = '請填寫此欄位';
      } else {
        this.treeViewMsg = '';
      }
    },
    // 取得業務類別
    async getCategoryList() {
      const response = await doPost('/Common/GetCategoryList', {
        Flag: 401,
        GlobalUserId: this.userInfo.userId,
      });
      this.categoryOptions = response;
    },
    // 取得文件層列表
    async getDocumentTypeList(categoryType) {
      const response = await doPost('/Common/GetDocumentTypeList', {
        Category: categoryType,
        GlobalUserId: this.userInfo.userId,
      });
      if (response.length > 0) {
        // 設定產品別
        this.productTypeOptions = response;
        // 非mode 5 或者 6 的無產品別情況(取用第0筆的tree view結構)
        if (this.currentMode !== 5 && this.currentMode !== 6) {
          this.isShowSeparator = true;
          this.nodes = JSON.parse(this.productTypeOptions[0].documentTypeList);
        } else {
          this.isShowSeparator = false;
        }
      } else {
        this.isShowSeparator = false;
      }
    },
    // 選擇產品別時觸發
    onChangeProductType(event) {
      this.isShowSeparator = true;
      let targetArr = this.productTypeOptions.filter(
        (item) => item.id == event.target.value
      );
      if (targetArr[0].documentTypeList) {
        this.nodes = JSON.parse(targetArr[0].documentTypeList);
      }
    },
    // 選擇業務類別時觸發
    onChangeCategory(event) {
      // 重選選項先清空陣列避免重複欄位
      this.form = [];
      // change時進入loading

      // 判斷是否是消金類別
      const result = this.categoryOptions.filter(
        (item) => item.id == event.target.value
      );
      this.currentMode = result[0].mode;
      // 根據選擇業務類別撈取索引
      doPost('/Common/GetCaseIndexListByCategory', {
        Category: event.target.value,
        GlobalUserId: this.userInfo.userId,
        Flag: 401,
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
          // 如果mode是5或者6時候才打
          this.getDocumentTypeList(event.target.value);
        });
      });
    },
  },
};
</script>
