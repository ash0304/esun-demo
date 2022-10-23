<template>
  <div class="mt-4 px-4">
    <Form>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">案件一覽表查詢</li>
          <li class="breadcrumb-item">調閱申請單查詢</li>
          <li class="breadcrumb-item active" aria-current="page">調閱申請單</li>
        </ol>
      </nav>
      <h2 class="page-title">調閱申請單</h2>
      <div v-if="Object.keys(applyCase).length > 0" class="mb-4">
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4"
            >調閱申請單單號</span
          >
          <div class="col-sm-10 p-3">{{ applyCase.applyNo }}</div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4"
            >調閱申請單狀態</span
          >
          <div class="col-sm-10 p-3">
            {{ applyStatusTransfer[applyCase.applyStatus] }}
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">調閱申請單位</span>
          <div class="col-sm-10 p-3">{{ applyCase.applyUnit }}</div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">調閱申請人員</span>
          <div class="col-sm-10 p-3">{{ applyCase.applyUser }}</div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">調閱申請日期</span>
          <div class="col-sm-10 p-3">{{ applyCase.applyDate }}</div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">調閱期間</span>
          <div
            v-if="
              applyCase.caseStatus == 7 &&
              userInfo.userId == applyCase.operatorUserId
            "
            class="col-sm-10 p-3"
          >
            <div class="col-sm p-0 d-flex align-items-center">
              <div>
                <Field
                  name="startDate"
                  v-slot="{ field }"
                  :rules="{ required: true }"
                  :value="defaultstartDate"
                >
                  <div class="input-group calendar-wrapper w320">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="請選擇起始日期"
                      v-model="startDate"
                      v-bind="field"
                      @change="handleRequire('startDate')"
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
                <span v-if="startDateMessage" class="error-msg">{{
                  startDateMessage
                }}</span>
              </div>
              <div class="mx-3">~</div>
              <div>
                <Field
                  name="endDate"
                  v-slot="{ field }"
                  :rules="{ required: true }"
                  :value="defaultendDate"
                >
                  <div class="input-group calendar-wrapper w320">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="請選擇結束日期"
                      v-model="endDate"
                      v-bind="field"
                      @change="handleRequire('endDate')"
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
                <span v-if="endDateMessage" class="error-msg">{{
                  endDateMessage
                }}</span>
              </div>
            </div>
          </div>
          <div v-else class="col-sm-10 p-3">
            {{ applyCase.applyStartDate }}~{{ applyCase.applyEndDate }}
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">調閱事由</span>
          <div
            v-if="
              applyCase.caseStatus == 7 &&
              userInfo.userId == applyCase.operatorUserId
            "
            class="col-sm-10 p-3"
          >
            <Field
              name="applyReason"
              class="form-control"
              as="select"
              v-model="applyReason"
              :rules="{ required: true }"
              @change="handleRequire('applyReason')"
            >
              <option value="-2">請選擇</option>
              <option
                v-for="option in applyReasonOptions"
                :key="option.id"
                :value="option.id"
              >
                {{ option.text }}
              </option>
            </Field>
            <span v-if="applyReasonMessage" class="error-msg">{{
              applyReasonMessage
            }}</span>
          </div>
          <div v-else class="col-sm-10 p-3">{{ applyCase.applyReason }}</div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">調閱說明</span>
          <div
            v-if="
              applyCase.caseStatus == 7 &&
              userInfo.userId == applyCase.operatorUserId
            "
            class="col-sm-10 p-3"
          >
            <Field
              name="applyDescription"
              class="form-control"
              as="textarea"
              v-model="applyDescription"
              :rules="{ required: true }"
              @change="handleRequire('applyDescription')"
            >
            </Field>
            <span v-if="applyDescriptionMessage" class="error-msg">{{
              applyDescriptionMessage
            }}</span>
          </div>
          <div v-else class="col-sm-10 p-3">
            {{ applyCase.applyDescription }}
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">附檔1</span>
          <div
            v-if="
              applyCase.caseStatus == 7 &&
              userInfo.userId == applyCase.operatorUserId
            "
            class="col-sm-10 p-3"
          >
            <div
              v-if="applyCase.file1 && !isFile1Update"
              class="d-flex align-items-center"
            >
              <a href="#" @click="handleDown(applyCase.file1.id)">{{
                applyCase.file1.fileName
              }}</a>
              <label
                class="input-group-text deleteFile mx-4"
                @click="tempDelFile('file1')"
                >刪除檔案</label
              >
            </div>
            <div
              v-if="!applyCase.file1 || isFile1Update"
              class="d-flex align-items-center"
            >
              <input
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                class="form-control"
                id="File1"
                @change="onUpload($event, 'file1')"
              />
              <label class="input-group-text customFileUpload-btn" for="File1"
                >上傳檔案</label
              >
              <label
                class="input-group-text deleteFile mx-4"
                @click="deleteFile('File1')"
                >刪除檔案</label
              >
            </div>
          </div>
          <div v-else class="col-sm-10 p-3">
            <a
              v-if="applyCase.file1"
              href="#"
              @click="handleDown(applyCase.file1.id)"
              >{{ applyCase.file1.fileName }}</a
            >
            <a v-else href="#"></a>
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">附檔2</span>
          <div
            v-if="
              applyCase.caseStatus == 7 &&
              userInfo.userId == applyCase.operatorUserId
            "
            class="col-sm-10 p-3"
          >
            <div
              v-if="applyCase.file2 && !isFile2Update"
              class="d-flex align-items-center"
            >
              <a href="#" @click="handleDown(applyCase.file2.id)">{{
                applyCase.file2.fileName
              }}</a>
              <label
                class="input-group-text deleteFile mx-4"
                @click="tempDelFile('file2')"
                >刪除檔案</label
              >
            </div>
            <div
              v-if="!applyCase.file2 || isFile2Update"
              class="d-flex align-items-center"
            >
              <input
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                class="form-control"
                id="File2"
                @change="onUpload($event, 'file2')"
              />
              <label class="input-group-text customFileUpload-btn" for="File2"
                >上傳檔案</label
              >
              <label
                class="input-group-text deleteFile mx-4"
                @click="deleteFile('File2')"
                >刪除檔案</label
              >
            </div>
          </div>
          <div v-else class="col-sm-10 p-3">
            <a
              v-if="applyCase.file2"
              href="#"
              @click="handleDown(applyCase.file2.id)"
              >{{ applyCase.file2.fileName }}</a
            >
            <a v-else href="#"></a>
          </div>
        </div>
        <div class="input-group border-bottom-0 row g-0">
          <span class="col-sm-2 input-group-text py-2 px-4">附檔3</span>
          <div
            v-if="
              applyCase.caseStatus == 7 &&
              userInfo.userId == applyCase.operatorUserId
            "
            class="col-sm-10 p-3"
          >
            <div
              v-if="applyCase.file3 && !isFile3Update"
              class="d-flex align-items-center"
            >
              <a href="#" @click="handleDown(applyCase.file3.id)">{{
                applyCase.file3.fileName
              }}</a>
              <label
                class="input-group-text deleteFile mx-4"
                @click="tempDelFile('file3')"
                >刪除檔案</label
              >
            </div>
            <div
              v-if="!applyCase.file3 || isFile3Update"
              class="d-flex align-items-center"
            >
              <input
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                class="form-control"
                id="File3"
                @change="onUpload($event, 'file3')"
              />
              <label class="input-group-text customFileUpload-btn" for="File3"
                >上傳檔案</label
              >
              <label
                class="input-group-text deleteFile mx-4"
                @click="deleteFile('File3')"
                >刪除檔案</label
              >
            </div>
          </div>
          <div v-else class="col-sm-10 p-3">
            <a
              v-if="applyCase.file3"
              href="#"
              @click="handleDown(applyCase.file3.id)"
              >{{ applyCase.file3.fileName }}</a
            >
            <a v-else href="#"></a>
          </div>
        </div>
      </div>
    </Form>
    <div
      v-if="Object.keys(applyCase).length > 0"
      class="mt-4 d-flex justify-content-end"
    >
      <div>
        <JsonCSV
          :data="tempRows"
          :labels="labels"
          :fields="fields"
          :name="generatorCSVname('調閱申請單')"
        ></JsonCSV>
      </div>
      <!-- 婉拒申請 -->
      <button
        v-if="
          userInfo.userId == applyCase.operatorUserId &&
          userInfo.unitId != applyCase.applyUnitId &&
          (applyCase.caseStatus == 0 || applyCase.caseStatus == 2)
        "
        type="button"
        class="btn btn-secondary btn-xs w100 mx-3"
        @click="rejectApply"
      >
        婉拒申請
      </button>
      <!-- 退回 -->
      <button
        v-if="
          userInfo.userId == applyCase.operatorUserId &&
          applyCase.caseStatus == 0
        "
        type="button"
        class="btn btn-secondary btn-xs w100 mx-3"
        @click="returnCase"
      >
        退回
      </button>
      <!-- 銷案 -->
      <button
        v-if="
          userInfo.userId == applyCase.operatorUserId &&
          applyCase.caseStatus == 7
        "
        type="button"
        class="btn btn-secondary btn-xs w100 mx-3"
        @click="cancelCase"
      >
        銷案
      </button>
      <!-- 確認放行 -->
      <button
        v-if="
          userInfo.userId == applyCase.operatorUserId &&
          applyCase.caseStatus == 0
        "
        type="button"
        class="btn btn-secondary btn-xs w100 mx-3"
        @click="releaseCase"
      >
        確認放行
      </button>
      <!-- 取件 -->
      <button
        v-if="
          userInfo.unitId == applyCase.operatorUnitId &&
          applyCase.caseStatus == 1 &&
          applyCase.canReview
        "
        type="button"
        class="btn btn-secondary btn-xs w100 mx-3"
        @click="pickUpCase"
      >
        取件
      </button>
      <!-- 傳送下一關 -->
      <button
        v-if="
          userInfo.userId == applyCase.operatorUserId &&
          (applyCase.caseStatus == 7 ||
            applyCase.caseStatus == 2 ||
            applyCase.caseStatus == 3)
        "
        type="button"
        class="btn btn-secondary btn-xs w125 mx-3"
        @click="passNextLevel"
      >
        傳送下一關
      </button>
      <!-- 處理權移轉 -->
      <button
        v-if="
          userInfo.unitId == applyCase.operatorUnitId &&
          applyCase.canReview &&
          (applyCase.caseStatus == 0 ||
            applyCase.caseStatus == 2 ||
            applyCase.caseStatus == 3)
        "
        type="button"
        class="btn btn-secondary btn-xs w125 mx-3"
        @click="rightTransfer"
      >
        處理權移轉
      </button>
    </div>
    <div class="mt-4">
      <vue-good-table
        mode="remote"
        :columns="columns"
        :rows="rows"
        v-on:page-change="onPageChange"
        v-on:sort-change="onSortChange"
        v-on:per-page-change="onPerPageChange"
        :line-numbers="true"
        :totalRows="totalRecords"
        :isLoading:sync="true"
        :pagination-options="
          rows.length > 0 ? paginationOptions : { enabled: false }
        "
        :sort-options="{ enabled: true }"
      >
        <template #emptystate
          ><p class="mb-0 text-center">目前尚無資料</p></template
        >
        <template #table-row="props">
          <span v-if="props.column.field == 'Comments'">
            <span @click="handleComments(props.row)" class="comments-btn">
              <img src="@/assets/images/ic_file.svg" title="意見紀錄" />
            </span>
          </span>
          <span v-if="props.column.field == 'AllowView'">
            <span v-if="props.row.AllowView">
              <button
                type="button"
                class="btn btn-primary btn-xs w100"
                @click="handleView(props.row)"
              >
                開啟影像
              </button>
            </span>
            <span v-else>
              <button
                type="button"
                class="btn btn-secondary btn-xs w100"
                disabled
              >
                開啟影像
              </button>
            </span>
          </span>
        </template>
      </vue-good-table>
    </div>
    <!-- 意見框 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <Modal
          v-if="isModalVisible1"
          :showCancelBtn="true"
          :showConfirmBtn="true"
          @close="closeModal1"
          @confirm="confirmModal1"
        >
          <template #header> 提示 </template>
          <template #body>
            <div class="modal-body-padding custom">
              <div class="input-group row g-0">
                <span class="col-sm-2 input-group-text py-2 px-4">意見</span>
                <div class="col-sm-10 p-3">
                  <Field
                    name="applyDescription"
                    class="form-control"
                    as="textarea"
                    v-model="comment"
                  >
                  </Field>
                </div>
              </div>
            </div>
          </template>
          <template #cancelBtn> 取消 </template>
          <template #confirmBtn> 確定 </template>
        </Modal>
      </transition>
    </Teleport>
    <!-- 轉移人員 + 意見框 -->
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
            <div class="modal-body-padding custom">
              <div class="input-group border-bottom-0 row g-0">
                <span class="col-sm-2 input-group-text py-2 px-4">{{
                  currentButtonType == 5 || currentButtonType == 4
                    ? '傳送人員'
                    : '移轉人員'
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
                    <option value="" disabled>
                      {{
                        currentButtonType == 5 || currentButtonType == 4
                          ? '請選擇欲傳送之人員'
                          : '請選擇欲移轉之人員'
                      }}
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
              <div class="input-group row g-0">
                <span class="col-sm-2 input-group-text py-2 px-4">意見</span>
                <div class="col-sm-10 p-3">
                  <Field
                    name="applyDescription"
                    class="form-control"
                    as="textarea"
                    v-model="comment"
                  >
                  </Field>
                </div>
              </div>
            </div>
          </template>
          <template #cancelBtn> 取消 </template>
          <template #confirmBtn> 確定 </template>
        </Modal>
      </transition>
    </Teleport>
    <!-- 確認銷案Modal -->
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
              <div class="mb-4">您確定要註銷這筆調閱申請單嗎？</div>
              <div class="input-group row g-0">
                <span class="col-sm-2 input-group-text py-2 px-4">意見</span>
                <div class="col-sm-10 p-3">
                  <Field
                    name="applyDescription"
                    class="form-control"
                    as="textarea"
                    v-model="comment"
                  >
                  </Field>
                </div>
              </div>
            </div>
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
          v-if="isModalVisible4"
          :showCancelBtn="false"
          :showConfirmBtn="true"
          @close="closeModal4"
          @confirm="confirmModal4"
        >
          <template #header> 提示 </template>
          <template #body>
            <div class="modal-body-padding">{{ responseMessage }}</div>
          </template>
          <template #confirmBtn> 關閉 </template>
        </Modal>
      </transition>
    </Teleport>
    <!-- 意見紀錄 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <Modal
          v-if="isModalVisible5"
          :showCancelBtn="true"
          :showConfirmBtn="false"
          :extraLargeSize="true"
          @close="closeModal5"
        >
          <template #header> 意見紀錄 </template>
          <template #body>
            <div class="modal-body-padding custom">
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
                <template #table-row="props">
                  <span v-if="props.column.field == 'status'">
                    <span>{{ this.statusTransfer[props.row.status] }}</span>
                  </span>
                </template>
              </vue-good-table>
            </div>
          </template>
          <template #cancelBtn> 關閉 </template>
        </Modal>
      </transition>
    </Teleport>
  </div>
</template>
<style lang="scss">
.deleteFile {
  border: 1px solid #ced4da;
  cursor: pointer;
}
.custom {
  text-align: left;
  font-size: 16px;
  line-height: 1;
}
.comments-btn {
  cursor: pointer;
}
.customFileUpload-btn {
  height: 38px;
  border-top-right-radius: 0.25rem !important;
  border-bottom-right-radius: 0.25rem !important;
  transform: translateX(-3px);
}
</style>

<script>
import { Form, Field } from 'vee-validate';
import * as datatable from '@/utilities/datatable';
import { VueGoodTable } from 'vue-good-table-next';
import Modal from '@/components/Modal.vue';
import JsonCSV from '@/components/JsonCSV';
import { onMounted, reactive, ref } from 'vue';

import { generatorCSVname } from '@/utilities/time';
import { doPost, doFilePost, doBlobFile } from '../../utilities/api';
import { useRoute } from 'vue-router';

export default {
  name: 'ApplyCasePage',
  components: { Form, Field, VueGoodTable, Modal, JsonCSV },
  setup() {
    const route = useRoute();
    // 當前操作狀態
    const currentButtonType = ref(0);
    // 純意見彈窗
    const isModalVisible1 = ref(false);
    // 意見+人員轉移
    const isModalVisible2 = ref(false);
    const transfer = ref('');
    const transferErrMsg = ref('');
    const transferText = ref('');
    // 銷案確認彈窗
    const isModalVisible3 = ref(false);
    const comment = ref('');
    // 提示訊息彈窗
    const isModalVisible4 = ref(false);
    const responseMessage = ref('');
    // 意見紀錄(裝表格)彈窗
    const isModalVisible5 = ref(false);
    const applyCase = reactive({});
    const applyStatusTransfer = reactive({
      0: '尚有案件處理中',
      1: '全數調閱案件已結案',
      2: '銷案',
    });
    const caseStatusTransfer = reactive({
      0: '覆核中',
      1: '待取件',
      2: '分派中',
      3: '選檔中',
      4: '已通過',
      5: '已婉拒',
      6: '銷案',
      7: '待處理',
    });

    const fileConfirmStatusTransfer = reactive({
      0: '未確認',
      1: '已完成勾選',
      2: '無符合影像',
    });

    const statusTransfer = reactive({
      0: '申請',
      1: '退回',
      2: '婉拒',
      3: '放行',
      4: '撤銷',
      5: '取件',
      6: '選檔',
      7: '移轉',
      8: '處理',
    });

    const startDate = ref('');
    const defaultstartDate = ref('');
    const endDate = ref('');
    const defaultendDate = ref('');
    const applyDescription = ref('');
    const applyReason = ref(-2);
    const applyReasonOptions = ref([]);
    const transferOptions = ref([]);
    const file1 = ref('');
    const file2 = ref('');
    const file3 = ref('');
    const isFile1Update = ref(false);
    const isFile2Update = ref(false);
    const isFile3Update = ref(false);
    const deleteFileIds = ref([]);
    // 錯誤訊息
    const startDateMessage = ref('');
    const endDateMessage = ref('');
    const applyReasonMessage = ref('');
    const applyDescriptionMessage = ref('');
    const caseId = ref(0);
    // table
    const columns = ref([
      {
        label: '',
        field: 'CaseId',
        hidden: true,
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
        label: '調閱期間',
        field: 'Period',
        hidden: false,
        width: '150px',
      },
      {
        label: '處理單位',
        field: 'Unit',
        hidden: false,
        width: '150px',
      },
      {
        label: '處理人員',
        field: 'User',
        hidden: false,
        width: '150px',
      },
      {
        label: '意見紀錄',
        field: 'Comments',
        hidden: false,
        sortable: false,
        width: '150px',
      },
      {
        label: '案件狀態',
        field: 'CaseStatus',
        hidden: false,
        width: '150px',
      },
      {
        label: '開啟影像處理',
        field: 'AllowView',
        hidden: false,
        sortable: false,
        width: '150px',
      },
      {
        label: '影像確認狀態',
        field: 'FileConfirmStatus',
        hidden: false,
        width: '150px',
      },
      {
        label: '調閱申請單單號',
        field: 'ApplyNo',
        hidden: false,
        width: '150px',
      },
      {
        label: '區域中心',
        field: 'BankingCenter',
        hidden: false,
        width: '150px',
      },
      {
        label: '歸檔單位',
        field: 'ArchiveUnit',
        hidden: false,
        width: '150px',
      },
      {
        label: '交易經辦',
        field: 'TraUser',
        hidden: false,
        width: '150px',
      },
      {
        label: '交易日期',
        field: 'TraDate',
        hidden: false,
        width: '150px',
      },
    ]);
    const rows = ref([]);
    const tempRows = ref([]);
    const modalcolumns = ref([
      {
        label: '處理單位',
        field: 'unit',
        hidden: false,
      },
      {
        label: '處理人員',
        field: 'user',
        hidden: false,
      },
      {
        label: '意見',
        field: 'comment',
        hidden: false,
      },
      {
        label: '處理狀態',
        field: 'status',
        hidden: false,
      },
      {
        label: '處理時間',
        field: 'dateTime',
        hidden: false,
      },
    ]);
    const modalrows = ref([]);
    const paginationOptions = reactive(datatable.paginationOptions);
    const totalRecords = ref(0);
    // csv
    const fields = ref([]);
    const labels = ref([]);
    const userInfo = reactive({});

    Object.assign(userInfo, JSON.parse(localStorage.getItem('userInfo')));

    onMounted(() => {
      queryDetail();
      loadItems();
    });

    // methods
    const queryDetail = () => {
      const passObj = {
        // localstorage
        GlobalUserId: localStorage.getItem('GlobalUserId')
          ? localStorage.getItem('GlobalUserId')
          : userInfo.userId,
        ApplyId: route.query.id,
      };
      doPost('/ApplyCase/QueryDetail', passObj).then((response) => {
        Object.assign(applyCase, {});
        for (const key in response) {
          applyCase[key] = response[key];
        }
        if (applyCase.caseStatus == 7) {
          startDate.value = applyCase.applyStartDate.replaceAll('/', '-');
          defaultstartDate.value = startDate.value;
          endDate.value = applyCase.applyEndDate.replaceAll('/', '-');
          defaultendDate.value = endDate.value;
          applyDescription.value = applyCase.applyDescription;
          // call api
          doPost('/ApplyCase/GetApplyReasonList', {
            GlobalUserId: userInfo.userId,
          }).then((response) => {
            applyReasonOptions.value = response;
            // 代入api值
            applyReason.value = applyReasonOptions.value.filter(
              (item) => item.text == applyCase.applyReason
            )[0].id;
          });
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

    // 轉大寫開頭屬性
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
      // localstorage
      passObj.Data.GlobalUserId = localStorage.getItem('GlobalUserId')
        ? localStorage.getItem('GlobalUserId')
        : userInfo.userId;
      passObj.Data.ApplyId = route.query.id;
      doPost('/ApplyCase/QueryDetailCase', passObj).then((response) => {
        totalRecords.value = response.totalRecords;
        rows.value = [];
        // 對資料做Object屬性開頭大寫處理
        response.rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            if (key == 'caseStatus') {
              tempObj[capitalizeFirstLetter(key)] = caseStatusTransfer[value];
            } else if (key == 'fileConfirmStatus') {
              tempObj[capitalizeFirstLetter(key)] =
                fileConfirmStatusTransfer[value];
            } else {
              tempObj[capitalizeFirstLetter(key)] = value;
            }
          }
          rows.value[index] = tempObj;
        });
        // csv隱碼處理
        tempRows.value = [];
        // deep copy
        tempRows.value = JSON.parse(JSON.stringify(rows.value));
        tempRows.value.forEach((item) => {
          const ObjKeys = Object.keys(item);
          ObjKeys.forEach((i, d) => {
            if (ObjKeys[d].includes('User')) {
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
          if (
            item.field == 'CaseId' ||
            item.field == 'AllowView' ||
            item.field == 'Comments'
          ) {
            // do nothing
          } else {
            fields.value.push(item.field);
            labels.value[item.field] = item.label;
          }
        });
      });
    };

    // 檔案下載(暫定)
    const handleDown = (id) => {
      const passObj = {
        GlobalUserId: userInfo.userId,
        Id: id,
      };
      doBlobFile('/ApplyCase/DownloadFile', passObj).then((response) => {
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        let blob = new Blob([response.data], {
          type: 'application/' + response.headers['content-type'],
        });
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = decodeURIComponent(response.headers.filename);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
    };

    const handleComments = (row) => {
      modalrows.value = row.Comments.rows;
      // 開表格
      showModal5();
    };
    const handleView = (row) => {
      // 抓取id並設置當前案別
      caseId.value = row.CaseId;
      const passObj = {
        Flag: 1002,
        CaseIds: [caseId.value],
        GlobalUserId: userInfo.userId,
        ApplyRecordId: applyCase.id,
      };
      // do 檢視api
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
        }
      });
    };

    const transferChange = () => {
      if (transfer.value) {
        transferErrMsg.value = '';
        transferText.value = transferOptions.value.filter(
          (item) => item.id == transfer.value
        )[0].text;
      }
    };

    // 婉拒申請
    const rejectApply = () => {
      currentButtonType.value = 0;
      showModal1();
    };
    // 退回
    const returnCase = () => {
      currentButtonType.value = 1;
      showModal1();
    };
    // 銷案處理
    const cancelCase = () => {
      currentButtonType.value = 2;
      showModal3();
    };
    // 確認放行
    const releaseCase = () => {
      currentButtonType.value = 3;
      showModal1();
    };
    // 取件
    const pickUpCase = () => {
      currentButtonType.value = 4;
      showModal1();
    };

    // 傳送下一關
    const passNextLevel = () => {
      if (applyCase.caseStatus == 7) {
        if (!startDate.value) {
          startDateMessage.value = '請填寫此欄位';
          return;
        }
        if (!endDate.value) {
          endDateMessage.value = '請填寫此欄位';
          return;
        }
        if (!applyReason.value || applyReason.value == '-2') {
          applyReasonMessage.value = '請填寫此欄位';
          return;
        }
        if (!applyDescription.value) {
          applyDescriptionMessage.value = '請填寫此欄位';
          return;
        }
      }
      currentButtonType.value = 5;
      showModal2();
    };
    // 處理權轉移
    const rightTransfer = () => {
      currentButtonType.value = 6;
      showModal2();
    };

    const showModal1 = () => {
      isModalVisible1.value = true;
    };
    const closeModal1 = () => {
      isModalVisible1.value = false;
      comment.value = '';
    };

    const confirmModal1 = () => {
      const passObj = {
        GlobalUserId: userInfo.userId,
        ApplyId: applyCase.id,
        ButtonType: currentButtonType.value,
        NextOperatorUserId: null,
        Comment: comment.value,
        ArchiveUnitId: applyCase.archiveUnitId,
      };
      doPost('/ApplyCase/AddProcessDetail', passObj).then((response) => {
        if (response) {
          switch (currentButtonType.value) {
            case 0:
              responseMessage.value = `已婉拒申請單!`;
              break;
            case 1:
              responseMessage.value = `案件已退回給${applyCase.previousOperatorUser}處理`;
              break;
            case 3:
              responseMessage.value =
                userInfo.unitId == applyCase.applyUnitId
                  ? `案件已完成放行!`
                  : `已放行申請單`;
              break;
            case 4:
              responseMessage.value = '取件成功!';
              break;
            default:
              responseMessage.value = ``;
          }
          // 清除意見框
          comment.value = '';
          showModal4();
        }
        isModalVisible1.value = false;
      });
    };

    const showModal2 = () => {
      isModalVisible2.value = true;
      const passObj = {
        GlobalUserId: userInfo.userId,
        ApplyId: applyCase.id,
        Flag: 1,
        HierarchyId: applyCase.hierarchyId,
        CaseStatus: applyCase.caseStatus,
        ArchiveUnitId: applyCase.archiveUnitId,
        ButtonType: currentButtonType.value,
      };
      doPost('/ApplyCase/GetOperatorList', passObj).then((response) => {
        transferOptions.value = response;
      });
    };
    const closeModal2 = () => {
      isModalVisible2.value = false;
      comment.value = '';
      transfer.value = '';
    };

    const confirmModal2 = () => {
      if (!transfer.value) {
        transferErrMsg.value = '請填寫此欄位';
        return;
      }
      if (currentButtonType.value == 5 && applyCase.caseStatus == 7) {
        let formData = new FormData();
        formData.append('GlobalUserId', userInfo.userId);
        formData.append('ApplyId', applyCase.id);
        formData.append('ApplyStartDate', startDate.value);
        formData.append('ApplyEndDate', endDate.value);
        formData.append('ApplyReasonId', applyReason.value);
        formData.append('ApplyDescription', applyDescription.value);
        formData.append('Files1', file1.value);
        formData.append('Files2', file2.value);
        formData.append('Files3', file3.value);
        deleteFileIds.value.forEach((item, index) => {
          formData.append(`DeleteFileIds[${index}]`, item);
        });
        // formData.append('DeleteFileIds', this.deleteFileIds.join());
        doFilePost('/ApplyCase/EditApply', formData).then((response) => {
          if (response) {
            const passObj = {
              GlobalUserId: userInfo.userId,
              ApplyId: applyCase.id,
              ButtonType: currentButtonType.value,
              NextOperatorUserId: transfer.value,
              Comment: comment.value,
              ArchiveUnitId: applyCase.archiveUnitId,
            };
            doPost('/ApplyCase/AddProcessDetail', passObj).then((response) => {
              if (response) {
                responseMessage.value = `案件已傳送予${transferText.value}處理`;
                showModal4();
              }
              this.isModalVisible2 = false;
            });
          }
        });
      } else {
        const passObj = {
          GlobalUserId: userInfo.userId,
          ApplyId: applyCase.id,
          ButtonType: currentButtonType.value,
          NextOperatorUserId: transfer.value,
          Comment: comment.value,
          ArchiveUnitId: applyCase.archiveUnitId,
        };
        doPost('/ApplyCase/AddProcessDetail', passObj).then((response) => {
          if (response) {
            if (currentButtonType.value == 5) {
              if (applyCase.caseStatus == 2 || applyCase.caseStatus == 3) {
                responseMessage.value = `案件已傳送予${transferText.value}處理`;
              }
            } else if (currentButtonType.value == 6) {
              if (
                applyCase.caseStatus == 0 ||
                applyCase.caseStatus == 2 ||
                applyCase.caseStatus == 3
              ) {
                responseMessage.value = `案件已移轉予${transferText.value}處理`;
              }
            }
            showModal4();
          }
          isModalVisible2.value = false;
        });
      }
    };

    const showModal3 = () => {
      isModalVisible3.value = true;
    };
    const closeModal3 = () => {
      isModalVisible3.value = false;
    };

    const confirmModal3 = () => {
      const passObj = {
        GlobalUserId: userInfo.userId,
        ApplyId: applyCase.id,
        ButtonType: currentButtonType.value,
        NextOperatorUserId: null,
        Comment: comment.value,
        ArchiveUnitId: applyCase.archiveUnitId,
      };
      doPost('/ApplyCase/AddProcessDetail', passObj).then((response) => {
        if (response) {
          responseMessage.value = `已完成銷案!`;
          showModal4();
        }
        isModalVisible3.value = false;
      });
    };

    // 操作結果彈窗處理
    const showModal4 = () => {
      isModalVisible4.value = true;
    };
    const closeModal4 = () => {
      isModalVisible4.value = false;
    };
    const confirmModal4 = () => {
      // do something and close
      setTimeout(() => {
        isModalVisible4.value = false;
        // do call back?
        queryDetail();
        loadItems();
      }, 500);
    };
    const showModal5 = () => {
      isModalVisible5.value = true;
    };
    const closeModal5 = () => {
      isModalVisible5.value = false;
    };

    // 必填錯誤訊息處理
    const handleRequire = (target) => {
      if (target == 'startDate') {
        if (startDate.value) {
          startDateMessage.value = '';
        }
      } else if (target == 'endDate') {
        if (endDate.value) {
          endDateMessage.value = '';
        }
      } else if (target == 'applyReason') {
        if (applyReason.value && applyReason.value != '-2') {
          applyReasonMessage.value = '';
        }
      } else if (target == 'applyDescription') {
        if (applyDescription.value) {
          applyDescriptionMessage.value = '';
        }
      }
    };

    const onUpload = (e, target) => {
      if (target == 'file1') {
        file1.value = e.target.files[0];
      } else if (target == 'file2') {
        file2.value = e.target.files[0];
      } else {
        file3.value = e.target.files[0];
      }
    };

    const tempDelFile = (target) => {
      if (target == 'file1') {
        deleteFileIds.value.push(applyCase.file1.id);
        isFile1Update.value = !isFile1Update.value;
      } else if (target == 'file2') {
        deleteFileIds.value.push(applyCase.file2.id);
        isFile2Update.value = !isFile2Update.value;
      } else {
        deleteFileIds.value.push(applyCase.file3.id);
        isFile3Update.value = !isFile3Update.value;
      }
    };

    const deleteFile = (target) => {
      if (target == 'File1') {
        file1.value = '';
      } else if (target == 'File2') {
        file2.value = '';
      } else {
        file3.value = '';
      }
      document.getElementById(target).value = '';
    };

    return {
      currentButtonType,
      isModalVisible1,
      isModalVisible2,
      transfer,
      transferErrMsg,
      transferText,
      isModalVisible3,
      comment,
      isModalVisible4,
      responseMessage,
      isModalVisible5,
      applyCase,
      applyStatusTransfer,
      caseStatusTransfer,
      fileConfirmStatusTransfer,
      statusTransfer,
      startDate,
      defaultstartDate,
      endDate,
      defaultendDate,
      applyDescription,
      applyReason,
      applyReasonOptions,
      transferOptions,
      file1,
      file2,
      file3,
      isFile1Update,
      isFile2Update,
      isFile3Update,
      deleteFileIds,
      startDateMessage,
      endDateMessage,
      applyReasonMessage,
      applyDescriptionMessage,
      caseId,
      columns,
      rows,
      tempRows,
      modalcolumns,
      modalrows,
      paginationOptions,
      totalRecords,
      fields,
      labels,
      userInfo,
      generatorCSVname,
      queryDetail,
      onPageChange,
      onPerPageChange,
      onSortChange,
      capitalizeFirstLetter,
      loadItems,
      handleDown,
      handleComments,
      handleView,
      transferChange,
      rejectApply,
      returnCase,
      cancelCase,
      releaseCase,
      pickUpCase,
      passNextLevel,
      rightTransfer,
      showModal1,
      closeModal1,
      confirmModal1,
      showModal2,
      closeModal2,
      confirmModal2,
      showModal3,
      closeModal3,
      confirmModal3,
      showModal4,
      closeModal4,
      confirmModal4,
      showModal5,
      closeModal5,
      handleRequire,
      onUpload,
      tempDelFile,
      deleteFile,
    };
  },
};
</script>
