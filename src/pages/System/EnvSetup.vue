<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">系統管理</li>
        <li class="breadcrumb-item active" aria-current="page">環境設定</li>
      </ol>
    </nav>
    <h2 class="page-title">環境設定</h2>
    <Form v-if="getData" @submit="onSubmit" :validation-schema="schema">
      <div class="accordion mt-3">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#automatic-edition-update"
              aria-expanded="true"
              aria-controls="automatic-edition-update"
            >
              自動版本更新設定
            </button>
          </h2>
          <div
            id="automatic-edition-update"
            class="accordion-collapse show"
          >
            <div class="accordion-body">
              <div class="input-group border-bottom-0 row g-0">
                <!-- 影像掃描器-類別編號 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">影像掃描器-類別編號</label>
                </div>
                <div class="col-sm-9 p-2">
                  <Field
                    name="viewerClassID"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="viewerClassID"
                  />
                  <ErrorMessage name="viewerClassID" class="error-message" />
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 影像掃描器-版本 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">影像掃描器-版本</label>
                </div>
                <div class="col-sm-9 p-2">
                  <Field
                    name="viewerVersion"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="viewerVersion"
                  />
                  <ErrorMessage name="viewerVersion" class="error-message" />
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 影像掃描器-上傳伺服器網址 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after"
                    >影像掃描器-上傳伺服器網址</label
                  >
                </div>
                <div class="col-sm-9 p-2">
                  <Field
                    name="viewerUploadServerURL"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="viewerUploadServerURL"
                  />
                  <ErrorMessage
                    name="viewerUploadServerURL"
                    class="error-message"
                  />
                </div>
              </div>
              <div class="input-group row g-0">
                <!-- 批次程式-上傳伺服器網址 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">批次程式-上傳伺服器網址</label>
                </div>
                <div class="col-sm-9 p-2">
                  <Field
                    name="batchUploadServerURL"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="batchUploadServerURL"
                  />
                  <ErrorMessage
                    name="batchUploadServerURL"
                    class="error-message"
                  />
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-md w320 mt-4 mx-auto d-block"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
    <Form v-if="getData" @submit="onSubmit" :validation-schema="schema">
      <div class="accordion mt-3">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#watermark-setting"
              aria-expanded="true"
              aria-controls="watermark-setting"
            >
              浮水印設定
            </button>
          </h2>
          <div id="watermark-setting" class="accordion-collapse show">
            <div class="accordion-body">
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印開關 (啟用浮水印) -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印開關 (啟用浮水印)</label>
                </div>
                <div class="col-sm-9 p-2 d-flex">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="watermarkSwitchOptions"
                      id="watermarkSwitchOptionsY"
                      value="option1"
                      :checked="watermarkSwitchOptions == 'Y'"
                    />
                    <label
                      class="form-check-label"
                      for="watermarkSwitchOptionsY"
                      >是</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="watermarkSwitchOptions"
                      id="watermarkSwitchOptionsN"
                      value="option2"
                      :checked="watermarkSwitchOptions == 'N'"
                    />
                    <label
                      class="form-check-label"
                      for="watermarkSwitchOptionsN"
                      >否</label
                    >
                  </div>
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 影像掃描器浮水印 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">影像掃描器浮水印</label>
                </div>
                <div class="col-sm-9 p-2 d-flex">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="watermarkViewerOptions"
                      id="watermarkViewerOptionsY"
                      value="option1"
                      :checked="watermarkViewerOptions == 'Y'"
                    />
                    <label
                      class="form-check-label"
                      for="watermarkViewerOptionsY"
                      >是</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="watermarkViewerOptions"
                      id="watermarkViewerOptionsN"
                      value="option2"
                      :checked="watermarkViewerOptions == 'N'"
                    />
                    <label
                      class="form-check-label"
                      for="watermarkViewerOptionsN"
                      >否</label
                    >
                  </div>
                </div>
              </div>
              <div class="input-group row g-0">
                <!-- 列印浮水印 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">列印浮水印</label>
                </div>
                <div class="col-sm-9 p-2 d-flex">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="watermarkPrintOptions"
                      id="watermarkPrintOptionsY"
                      value="option1"
                      :checked="watermarkPrintOptions == 'Y'"
                    />
                    <label class="form-check-label" for="watermarkPrintOptionsY"
                      >是</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="watermarkPrintOptions"
                      id="watermarkPrintOptionsN"
                      value="option2"
                      :checked="watermarkPrintOptions == 'N'"
                    />
                    <label class="form-check-label" for="watermarkPrintOptionsN"
                      >否</label
                    >
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-md w320 mt-4 mx-auto d-block"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
    <Form v-if="getData" @submit="onSubmit" :validation-schema="schema">
      <div class="accordion mt-3">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#watermark-image-setting"
              aria-expanded="true"
              aria-controls="watermark-image-setting"
            >
              浮水印圖片設定
            </button>
          </h2>
          <div id="watermark-image-setting" class="accordion-collapse show">
            <div class="accordion-body">
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印圖片開關 (啟用浮水印圖片) -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after"
                    >浮水印圖片開關 (啟用浮水印圖片)</label
                  >
                </div>
                <div class="col-sm-9 p-2 d-flex">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="watermarkImageSwitchOptions"
                      id="watermarkImageSwitchOptionsY"
                      value="option1"
                      :checked="watermarkImageSwitchOptions == 'Y'"
                    />
                    <label
                      class="form-check-label"
                      for="watermarkImageSwitchOptionsY"
                      >是</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="watermarkImageSwitchOptions"
                      id="watermarkImageSwitchOptionsN"
                      value="option2"
                      :checked="watermarkImageSwitchOptions == 'N'"
                    />
                    <label
                      class="form-check-label"
                      for="watermarkImageSwitchOptionsN"
                      >否</label
                    >
                  </div>
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印圖片網址 (圖片檔案位置) -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after"
                    >浮水印圖片網址 (圖片檔案位置)</label
                  >
                </div>
                <div class="col-sm-9 p-2">
                  <Field
                    name="watermarkImageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="watermarkImageUrl"
                  />
                  <ErrorMessage
                    name="watermarkImageUrl"
                    class="error-message"
                  />
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印圖片角度 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印圖片角度</label>
                </div>
                <div class="col-sm-8 p-2">
                  <Field
                    name="watermarkImageAngleVal"
                    type="range"
                    class="form-range"
                    min="0"
                    max="360"
                    v-model="watermarkImageAngleVal"
                  />
                </div>
                <div class="col-sm-1 p-2">
                  <Field
                    name="watermarkImageAngleVal"
                    type="number"
                    class="form-control"
                    min="0"
                    max="360"
                    v-model="watermarkImageAngleVal"
                  />
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印影像透明度 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印影像透明度</label>
                </div>
                <div class="col-sm-8 p-2">
                  <Field
                    name="watermarkImageOpennessVal"
                    type="range"
                    class="form-range"
                    min="0"
                    max="255"
                    v-model="watermarkImageOpennessVal"
                  />
                </div>
                <div class="col-sm-1 p-2">
                  <Field
                    name="watermarkImageOpennessVal"
                    type="number"
                    class="form-control"
                    min="0"
                    max="255"
                    v-model="watermarkImageOpennessVal"
                  />
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印圖片位置 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印圖片位置</label>
                </div>
                <div class="col-sm-9 p-2">
                  <!-- watermarkImagePosition -->
                  <SingleSelect
                    name="watermarkImagePosition"
                    :options="watermarkImage_positions"
                    v-model="watermarkImagePosition"
                  />
                  <ErrorMessage
                    name="watermarkImagePosition"
                    class="error-message"
                  />
                </div>
              </div>
              <div class="input-group row g-0">
                <!-- 浮水印圖片預覽 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label>浮水印圖片預覽</label>
                </div>
                <div class="col-sm-9 p-2">
                  <img :src="watermarkImageUrl" width="64" height="64" />
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-md w320 mt-4 mx-auto d-block"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
    <Form v-if="getData" @submit="onSubmit" :validation-schema="schema">
      <div class="accordion mt-3">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#watermark-text-setting"
              aria-expanded="true"
              aria-controls="watermark-text-setting"
            >
              浮水印文字設定
            </button>
          </h2>
          <div id="watermark-text-setting" class="accordion-collapse show">
            <div class="accordion-body">
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印文字開關 (啟用文字浮水印) -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after"
                    >浮水印文字開關 (啟用文字浮水印)</label
                  >
                </div>
                <div class="col-sm-9 p-2 d-flex">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="watermarkTextSwitchOptions"
                      id="watermarkTextSwitchOptionsY"
                      value="option1"
                      :checked="watermarkTextSwitchOptions == 'Y'"
                    />
                    <label
                      class="form-check-label"
                      for="watermarkTextSwitchOptionsY"
                      >是</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="watermarkTextSwitchOptions"
                      id="watermarkTextSwitchOptionsN"
                      value="option2"
                      :checked="watermarkTextSwitchOptions == 'N'"
                    />
                    <label
                      class="form-check-label"
                      for="watermarkTextSwitchOptionsN"
                      >否</label
                    >
                  </div>
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印文字 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印文字</label>
                </div>
                <div class="col-sm-9 p-2">
                  <Field
                    name="watermarkText"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="watermarkText"
                  />
                  <ErrorMessage name="watermarkText" class="error-message" />
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印文字角度 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印文字角度</label>
                </div>
                <div class="col-sm-8 p-2">
                  <Field
                    name="watermarkTextAngleVal"
                    type="range"
                    class="form-range"
                    min="0"
                    max="360"
                    v-model="watermarkTextAngleVal"
                  />
                </div>
                <div class="col-sm-1 p-2">
                  <Field
                    name="watermarkTextAngleVal"
                    type="number"
                    class="form-control"
                    min="0"
                    max="360"
                    v-model="watermarkTextAngleVal"
                  />
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮浮水印文字透明度 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印文字透明度</label>
                </div>
                <div class="col-sm-8 p-2">
                  <Field
                    name="watermarkTextOpennessVal"
                    type="range"
                    class="form-range"
                    min="0"
                    max="255"
                    v-model="watermarkTextOpennessVal"
                  />
                </div>
                <div class="col-sm-1 p-2">
                  <Field
                    name="watermarkTextOpennessVal"
                    type="number"
                    class="form-control"
                    min="0"
                    max="255"
                    v-model="watermarkTextOpennessVal"
                  />
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印文字位置 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印文字位置</label>
                </div>
                <div class="col-sm-9 p-2">
                  <SingleSelect
                    name="watermarkTextPosition"
                    :options="watermarkText_positions"
                    v-model="watermarkTextPosition"
                  />
                  <ErrorMessage
                    name="watermarkTextPosition"
                    class="error-message"
                  />
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印文字顏色 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印文字顏色</label>
                </div>
                <div class="col-sm-9 p-2">
                  <ColorPickerInput
                    name="watermarkTextColor"
                    :value="watermarkTextColor"
                  />
                  <ErrorMessage
                    name="watermarkTextColor"
                    class="error-message"
                  />
                </div>
              </div>
              <div class="input-group border-bottom-0 row g-0">
                <!-- 浮水印文字字型 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印文字字型</label>
                </div>
                <div class="col-sm-9 p-2">
                  <Field
                    name="watermarkTextFont"
                    type="text"
                    class="form-control"
                    placeholder="請輸入"
                    v-model="watermarkTextFont"
                  />
                  <ErrorMessage
                    name="watermarkTextFont"
                    class="error-message"
                  />
                </div>
              </div>
              <div class="input-group row g-0">
                <!-- 浮水印文字預覽 -->
                <div class="col-sm-3 input-group-text flex-column py-2 px-4">
                  <label class="required after">浮水印文字預覽</label>
                </div>
                <div class="col-sm-9 p-2">文字顯示</div>
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-md w320 mt-4 mx-auto d-block"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import SingleSelect from "@/components/SingleSelect.vue";
import ColorPickerInput from "@/components/ColorPickerInput.vue";
import { doGet } from "@/utilities/api";

export default {
  name: "EnvSetup",
  components: { Form, Field, ErrorMessage, SingleSelect, ColorPickerInput },
  data() {
    const schema = this.$yup.object({
      watermark_color: this.$yup.string().required(),
    });
    var watermarkImage_positions = [
      { id: 0, text: "自訂" },
      { id: 1, text: "並排" },
      { id: 2, text: "滿版" },
      { id: 3, text: "置中" },
      { id: 4, text: "置頂" },
      { id: 5, text: "置底" },
      { id: 6, text: "左上角" },
      { id: 7, text: "左下角" },
      { id: 8, text: "右上角" },
      { id: 9, text: "右下角" },
    ];

    var watermarkText_positions = [
      { id: 0, text: "自訂" },
      { id: 1, text: "並排" },
      { id: 2, text: "滿版" },
      { id: 3, text: "置中" },
      { id: 4, text: "置頂" },
      { id: 5, text: "置底" },
      { id: 6, text: "左上角" },
      { id: 7, text: "左下角" },
      { id: 8, text: "右上角" },
      { id: 9, text: "右下角" },
    ];

    return {
      schema,
      getData: false,
      // currentColor: "#000000",
      watermarkImage_positions,
      watermarkText_positions,

      //automatic-edition-update
      viewerClassID: "",
      viewerVersion: "",
      viewerUploadServerURL: "",
      batchUploadServerURL: "",
      //watermark-setting
      watermarkSwitchOptions: "",
      watermarkViewerOptions: "",
      watermarkPrintOptions: "",
      //watermark-image-setting
      watermarkImageSwitchOptions: "",
      watermarkImageUrl: "",
      watermarkImageAngleVal: "",
      watermarkImageOpennessVal: "",
      watermarkImagePosition: "",
      //watermark-text-setting
      watermarkTextSwitchOptions: "",
      watermarkText: "",
      watermarkTextAngleVal: "",
      watermarkTextOpennessVal: "",
      watermarkTextColor: "",
      watermarkTextFont: "",
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
    loadItems() {
      doGet("/EnvSetup/GetEnvInitData")
        .then((response) => {
          if (response.status == 200) {
            var model = response.data.model;
            //automatic-edition-update
            this.viewerClassID = model.viewerClassID;
            this.viewerVersion = model.viewerVersion;
            this.viewerUploadServerURL = model.viewerUploadServerURL;
            this.batchUploadServerURL = model.batchUploadServerURL;
            //watermark-setting
            this.watermarkSwitchOptions = model.watermarkSwitch;
            this.watermarkViewerOptions = model.watermarkViewer;
            this.watermarkPrintOptions = model.watermarkPrint;
            //watermark-image-setting
            this.watermarkImageSwitchOptions = model.watermarkImageSwitch;
            this.watermarkImageUrl = model.watermarkImageUrl;
            this.watermarkImageAngleVal = model.watermarkImageAngle;
            this.watermarkImageOpennessVal = model.watermarkImageOpenness;
            this.watermarkImagePosition = model.watermarkImagePosition;
            //watermark-text-setting
            this.watermarkTextSwitchOptions = model.watermarkTextSwitch;
            this.watermarkText = model.watermarkText;
            this.watermarkTextAngleVal = model.watermarkTextAngle;
            this.watermarkTextOpennessVal = model.watermarkTextOpenness;
            this.watermarkTextPosition = model.watermarkTextPosition;
            this.watermarkTextColor = model.watermarkTextColor;
            this.watermarkTextFont = model.watermarkTextFont;
            this.getData = true;
          } else {
            this.$router.push({ name: "Error500" });
          }
        })
        .catch(() => {
          this.$router.push({ name: "Error500" });
        });
    },
  },
};
</script>