<template>
  <div class="mt-4 px-4">
    <Form @submit="onSubmit" v-slot="{ errors }">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">文件掃描(新增)</li>
          <li class="breadcrumb-item active" aria-current="page">
            整批產製QR Code
          </li>
        </ol>
      </nav>
      <h2 class="page-title">整批產製QR Code</h2>
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
        <div v-if="category != '-2'" class="input-group row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">選擇檔案</span>
          <div class="col-sm-10 p-3">
            <div class="d-flex">
              <button
                type="button"
                class="btn btn-secondary btn-xs w125 mb-2"
                @click="downloadSample"
              >
                下載範例檔
              </button>
              <div class="mt-1 mx-2 smapleIcon" @click="showSampleImg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-exclamation-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
                  />
                </svg>
              </div>
            </div>
            <!-- <Field name="file" v-slot="{ field }" class="input-group" :rules="{ required: true }"> -->
            <div class="customFileUpload d-flex">
              <input
                type="file"
                class="form-control"
                id="inputGroupFile02"
                accept=".csv"
                @change="onUpload"
              />
              <label
                class="customFileUpload-btn input-group-text"
                for="inputGroupFile02"
                >上傳檔案</label
              >
            </div>
            <!-- </Field> -->
            <span v-if="fileErrorMsg" class="error-msg">{{
              fileErrorMsg
            }}</span>
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
      <Teleport to="body">
        <transition name="modal-fade">
          <Modal
            v-if="isModalVisible2"
            :showCancelBtn="false"
            :showConfirmBtn="true"
            :extraLargeSize="true"
            @close="closeSampleImg"
            @confirm="closeSampleImg"
          >
            <template #header>預覽</template>
            <template #body>
              <div class="modal-body-padding sampleImg">
                <img src="@/assets/images/DIMS批次產出QRCode範例檔(CPS).jpg" alt="">
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
          產製QR Code
        </button>
      </div>
    </Form>
  </div>
</template>
<style>
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
.smapleIcon {
  cursor: pointer;
}
.sampleImg img {
  width: 100%;
  height: 100%;
}
</style>
<script>
// import axios from 'axios';
import { Field, Form } from 'vee-validate';
import Modal from '@/components/Modal.vue';

import { doPost, doFilePost } from '@/utilities/api';
import store from '@/utilities/store';

export default {
  name: 'GenerateMultiQRCode',
  components: { Form, Field, Modal },
  data() {
    return {
      scanCheck: '系統未偵測到Scan Agent! 請至玉山安裝專區，下載安裝',
      category: -2,
      categoryOptions: [],
      currentCategory: '',
      caseIndexList: [],
      form: [],
      isModalVisible: false,
      isModalVisible2: false,
      scanViewerUrl: '',
      fileErrorMsg: '',
      file: null,
      userInfo: {}
    };
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  mounted() {
    this.getCategoryList();
  },
  watch: {
    file: function (newValue, oldValue) {
      console.log(oldValue);
      if (newValue) {
        this.fileErrorMsg = '';
      }
    },
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    // 上傳檔案
    onUpload(e) {
      this.file = e.target.files[0];
    },
    showSampleImg() {
      this.isModalVisible2 = true;
    },
    closeSampleImg() {
      this.isModalVisible2 = false;
    },
    // 下載範例檔
    async downloadSample() {
      const passObj = {
        Category: this.category,
        GlobalUserId: this.userInfo.userId,
      };
      const response = await doPost('/FileScan/GetSampleFile', passObj);
      const a = document.createElement('a');
      a.href =
        'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(response);
      a.target = '_blank';
      a.download = `整批產製QR Code_(${this.currentCategory}).csv`;
      a.click();
    },
    // 表單傳送
    onSubmit() {
      if (!this.file) {
        this.fileErrorMsg = '請填寫此欄位';
        return;
      }
      let formData = new FormData();
      formData.append('Category', this.category);
      formData.append('GlobalUserId', this.userInfo.userId);
      formData.append('File', this.file);
      // 先清空
      store.dispatch('setPDFString', '');
      doFilePost('/FileScan/GenerateMultiQRCode', formData).then((response) => {
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
    // 取得業務類別
    async getCategoryList() {
      const response = await doPost('/Common/GetCategoryList', {
        Flag: 501,
        GlobalUserId: this.userInfo.userId,
      });
      this.categoryOptions = response;
    },
    // 選擇業務類別時觸發
    onChangeCategory(event) {
      const tempArr = this.categoryOptions.filter(
        (item) => item.id == event.target.value
      );
      this.currentCategory = tempArr[0].text;
    },
  },
};
</script>
