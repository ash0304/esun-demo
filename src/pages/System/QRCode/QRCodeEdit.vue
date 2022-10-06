<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">系統管理</li>
        <li class="breadcrumb-item" aria-current="page">QRCode 管理</li>
        <li class="breadcrumb-item active" aria-current="page">編輯 QRCode</li>
      </ol>
    </nav>
    <h2 class="page-title">編輯 QRCode</h2>
    <div class="mb-4">
      <div class="row">
        <div class="col-sm-5">
          <div class="input-group">
            <a href="#" class="w-100 bg-lightGray text-center py-1"  @click="selectAll">
              <img src="@/assets/images/ic_simple_arrow_right.svg" alt="" />
            </a>
            <div class="p-3">
              <div
                class="form-check form-check-inline mb-2"
                v-for="item in categorySrc"
                :key="item.id"
              >
                <input
                  class="form-check-input me-2"
                  type="checkbox"
                  :value="item"
                  v-model="categoryDest"
                />
                <label class="form-check-label">{{ item.text }}</label>
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            col-sm-2
            d-flex
            flex-column
            align-items-center
            justify-content-center
          "
        >
          <img
            class="mb-2"
            src="@/assets/images/ic_lightgray_arrow_right.svg"
          />
          <img src="@/assets/images/ic_lightgray_arrow_left.svg" />
        </div>
        <div class="col-sm-5">
          <div class="input-group">
            <a href="#" class="w-100 bg-lightGray text-center py-1" @click="unselectAll">
              <img src="@/assets/images/ic_simple_arrow_left.svg" alt="" />
            </a>
            <div class="p-3">
              <span
                class="text-lightGray fw-bold"
                v-if="categoryDest.length == 0"
                >請選擇左側業務類別</span
              >
              <div
                class="d-flex align-items-center mb-3"
                v-for="item in categoryDest"
                :key="item.id"
              >
                <div
                  class="cross-check me-2"
                  :value="item.id"
                  @click="removeDestItem($event, item.id)"
                ></div>
                <label class="form-check-label">{{ item.text }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
       <div class="text-center mt-5">
        <button type="button" class="btn btn-primary btn-md w320">查詢</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QRCodeEdit",
  components: {},
  data: function () {
    return {
      categorySrc: [
        { id: 1, text: "掃描日期", seq: 1 },
        { id: 2, text: "歸檔單位", seq: 2 },
        { id: 3, text: "歸檔人員", seq: 3 },
        { id: 4, text: "統一編號", seq: 4 },
        { id: 5, text: "批覆書編號", seq: 5 },
        { id: 6, text: "案件編號", seq: 6 },
        { id: 7, text: "交易日期", seq: 7 },
        { id: 8, text: "交易櫃員", seq: 8 },
      ],
      categoryDest: [],
    };
  },
  methods: {
    removeDestItem: function (event, id) {
      this.categoryDest = this.categoryDest.filter(el => el.id != id);
    },
    selectAll: function(){
      this.categoryDest = this.categorySrc;
    },
    unselectAll: function (){
      this.categoryDest = [];
    }
  },
  watch: {
    categoryDest: function () {
      this.categoryDest = this.categoryDest.sort(function (prev, next) {
        if (prev.seq > next.seq) {
          return 1;
        }
        if (prev.seq < next.seq) {
          return -1;
        }
        return 0;
      });
    },
  },
};
</script>
