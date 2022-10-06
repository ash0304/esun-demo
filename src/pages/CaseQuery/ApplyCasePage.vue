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
                @click="tempDelFile1"
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
                @change="onUpload1"
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
                @click="tempDelFile2"
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
                @change="onUpload2"
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
                @click="tempDelFile3"
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
                @change="onUpload3"
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

import { generatorCSVname } from '@/utilities/time';
import { doPost, doFilePost, doBlobFile } from '../../utilities/api';

export default {
  name: 'ApplyCasePage',
  components: { Form, Field, VueGoodTable, Modal, JsonCSV },
  data() {
    return {
      // 當前操作狀態
      currentButtonType: 0,
      // 純意見彈窗
      isModalVisible1: false,
      // 意見+人員轉移
      isModalVisible2: false,
      transfer: '',
      transferErrMsg: '',
      transferText: '',
      // 銷案確認彈窗
      isModalVisible3: false,
      comment: '',
      // 提示訊息彈窗
      isModalVisible4: false,
      responseMessage: '',
      // 意見紀錄(裝表格)彈窗
      isModalVisible5: false,
      applyCase: {},
      applyStatusTransfer: {
        0: '尚有案件處理中',
        1: '全數調閱案件已結案',
        2: '銷案',
      },
      caseStatusTransfer: {
        0: '覆核中',
        1: '待取件',
        2: '分派中',
        3: '選檔中',
        4: '已通過',
        5: '已婉拒',
        6: '銷案',
        7: '待處理',
      },
      fileConfirmStatusTransfer: {
        0: '未確認',
        1: '已完成勾選',
        2: '無符合影像',
      },
      statusTransfer: {
        0: '申請',
        1: '退回',
        2: '婉拒',
        3: '放行',
        4: '撤銷',
        5: '取件',
        6: '選檔',
        7: '移轉',
        8: '處理',
      },
      startDate: '',
      defaultstartDate: '',
      endDate: '',
      defaultendDate: '',
      applyDescription: '',
      applyReason: -2,
      applyReasonOptions: [],
      transferOptions: [],
      isFile1Update: false,
      file1: '',
      isFile2Update: false,
      file2: '',
      isFile3Update: false,
      file3: '',
      deleteFileIds: [],
      // 錯誤訊息
      startDateMessage: '',
      endDateMessage: '',
      applyReasonMessage: '',
      applyDescriptionMessage: '',
      caseId: 0,
      // table
      columns: [
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
      ],
      rows: [],
      tempRows: [],
      modalcolumns: [
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
      ],
      modalrows: [],
      paginationOptions: datatable.paginationOptions,
      totalRecords: 0,
      // csv
      fields: [],
      labels: [],
      userInfo: {}
    };
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  mounted() {
    this.queryDetail();
    this.loadItems();
  },
  methods: {
    generatorCSVname,
    queryDetail() {
      const passObj = {
        // localstorage
        GlobalUserId: localStorage.getItem('GlobalUserId')
          ? localStorage.getItem('GlobalUserId')
          : this.userInfo.userId,
        ApplyId: this.$route.query.id,
      };
      doPost('/ApplyCase/QueryDetail', passObj).then((response) => {
        this.applyCase = {};
        for (const key in response) {
          this.applyCase[key] = response[key];
        }
        if (this.applyCase.caseStatus == 7) {
          this.startDate = this.applyCase.applyStartDate.replaceAll('/', '-');
          this.defaultstartDate = this.startDate;
          this.endDate = this.applyCase.applyEndDate.replaceAll('/', '-');
          this.defaultendDate = this.endDate;
          this.applyDescription = this.applyCase.applyDescription;
          // call api
          doPost('/ApplyCase/GetApplyReasonList', {
            GlobalUserId: this.userInfo.userId,
          }).then((response) => {
            this.applyReasonOptions = response;
            // 代入api值
            this.applyReason = this.applyReasonOptions.filter(
              (item) => item.text == this.applyCase.applyReason
            )[0].id;
          });
        }
      });
    },
    // 檔案下載(暫定)
    handleDown(id) {
      const passObj = {
        GlobalUserId: this.userInfo.userId,
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
    },
    // 轉大寫開頭屬性
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    handleComments(row) {
      this.modalrows = row.Comments.rows;
      // 開表格
      this.showModal5();
    },
    handleView(row) {
      // 抓取id並設置當前案別
      this.caseId = row.CaseId;
      const passObj = {
        Flag: 1002,
        CaseIds: [this.caseId],
        GlobalUserId: this.userInfo.userId,
        ApplyRecordId: this.applyCase.id,
      };
      // do 檢視api
      doPost('/Common/ActiveViewer', passObj).then((response) => {
        if (response) {
          window.open(response, '_blank');
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
      // localstorage
      passObj.Data.GlobalUserId = localStorage.getItem('GlobalUserId')
        ? localStorage.getItem('GlobalUserId')
        : this.userInfo.userId;
      passObj.Data.ApplyId = this.$route.query.id;
      doPost('/ApplyCase/QueryDetailCase', passObj).then((response) => {
        const { rows, totalRecords } = response;
        this.totalRecords = totalRecords;
        this.rows = [];
        // 對資料做Object屬性開頭大寫處理
        rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            if (key == 'caseStatus') {
              tempObj[this.capitalizeFirstLetter(key)] =
                this.caseStatusTransfer[value];
            } else if (key == 'fileConfirmStatus') {
              tempObj[this.capitalizeFirstLetter(key)] =
                this.fileConfirmStatusTransfer[value];
            } else {
              tempObj[this.capitalizeFirstLetter(key)] = value;
            }
          }
          this.rows[index] = tempObj;
        });
        // csv隱碼處理
        this.tempRows = [];
        // deep copy
        this.tempRows = JSON.parse(JSON.stringify(this.rows));
        this.tempRows.forEach((item) => {
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
        this.columns.forEach((item) => {
          if (
            item.field == 'CaseId' ||
            item.field == 'AllowView' ||
            item.field == 'Comments'
          ) {
            // do nothing
          } else {
            this.fields.push(item.field);
            this.labels[item.field] = item.label;
          }
        });
      });
    },
    transferChange() {
      if (this.transfer) {
        this.transferErrMsg = '';
        this.transferText = this.transferOptions.filter(
          (item) => item.id == this.transfer
        )[0].text;
      }
    },
    // 婉拒申請
    rejectApply() {
      this.currentButtonType = 0;
      this.showModal1();
    },
    // 退回
    returnCase() {
      this.currentButtonType = 1;
      this.showModal1();
    },
    // 銷案處理
    cancelCase() {
      this.currentButtonType = 2;
      this.showModal3();
    },
    // 確認放行
    releaseCase() {
      this.currentButtonType = 3;
      this.showModal1();
    },
    // 取件
    pickUpCase() {
      this.currentButtonType = 4;
      this.showModal1();
    },
    // 傳送下一關
    passNextLevel() {
      if (this.applyCase.caseStatus == 7) {
        if (!this.startDate) {
          this.startDateMessage = '請填寫此欄位';
          return;
        }
        if (!this.endDate) {
          this.endDateMessage = '請填寫此欄位';
          return;
        }
        if (!this.applyReason || this.applyReason == '-2') {
          this.applyReasonMessage = '請填寫此欄位';
          return;
        }
        if (!this.applyDescription) {
          this.applyDescriptionMessage = '請填寫此欄位';
          return;
        }
      }
      this.currentButtonType = 5;
      this.showModal2();
    },
    // 處理權轉移
    rightTransfer() {
      this.currentButtonType = 6;
      this.showModal2();
    },
    showModal1() {
      this.isModalVisible1 = true;
    },
    closeModal1() {
      this.isModalVisible1 = false;
      this.comment = '';
    },
    confirmModal1() {
      const passObj = {
        GlobalUserId: this.userInfo.userId,
        ApplyId: this.applyCase.id,
        ButtonType: this.currentButtonType,
        NextOperatorUserId: null,
        Comment: this.comment,
        ArchiveUnitId: this.applyCase.archiveUnitId,
      };
      doPost('/ApplyCase/AddProcessDetail', passObj).then((response) => {
        if (response) {
          switch (this.currentButtonType) {
            case 0:
              this.responseMessage = `已婉拒申請單!`;
              break;
            case 1:
              this.responseMessage = `案件已退回給${this.applyCase.previousOperatorUser}處理`;
              break;
            case 3:
              this.responseMessage =
                this.userInfo.unitId == this.applyCase.applyUnitId
                  ? `案件已完成放行!`
                  : `已放行申請單`;
              break;
            case 4:
              this.responseMessage = '取件成功!';
              break;
            default:
              this.responseMessage = ``;
          }
          // 清除意見框
          this.comment = '';
          this.showModal4();
        }
        this.isModalVisible1 = false;
      });
    },
    showModal2() {
      this.isModalVisible2 = true;
      const passObj = {
        GlobalUserId: this.userInfo.userId,
        ApplyId: this.applyCase.id,
        Flag: 1,
        HierarchyId: this.applyCase.hierarchyId,
        CaseStatus: this.applyCase.caseStatus,
        ArchiveUnitId: this.applyCase.archiveUnitId,
        ButtonType: this.currentButtonType,
      };
      doPost('/ApplyCase/GetOperatorList', passObj).then((response) => {
        this.transferOptions = response;
      });
    },
    closeModal2() {
      this.isModalVisible2 = false;
      this.comment = '';
      this.transfer = '';
    },
    confirmModal2() {
      if (!this.transfer) {
        this.transferErrMsg = '請填寫此欄位';
        return;
      }
      if (this.currentButtonType == 5 && this.applyCase.caseStatus == 7) {
        let formData = new FormData();
        formData.append('GlobalUserId', this.userInfo.userId);
        formData.append('ApplyId', this.applyCase.id);
        formData.append('ApplyStartDate', this.startDate);
        formData.append('ApplyEndDate', this.endDate);
        formData.append('ApplyReasonId', this.applyReason);
        formData.append('ApplyDescription', this.applyDescription);
        formData.append('Files1', this.file1);
        formData.append('Files2', this.file2);
        formData.append('Files3', this.file3);
        this.deleteFileIds.forEach((item, index) => {
          formData.append(`DeleteFileIds[${index}]`, item);
        });
        // formData.append('DeleteFileIds', this.deleteFileIds.join());
        doFilePost('/ApplyCase/EditApply', formData).then((response) => {
          if (response) {
            const passObj = {
              GlobalUserId: this.userInfo.userId,
              ApplyId: this.applyCase.id,
              ButtonType: this.currentButtonType,
              NextOperatorUserId: this.transfer,
              Comment: this.comment,
              ArchiveUnitId: this.applyCase.archiveUnitId,
            };
            doPost('/ApplyCase/AddProcessDetail', passObj).then((response) => {
              if (response) {
                this.responseMessage = `案件已傳送予${this.transferText}處理`;
                this.showModal4();
              }
              this.isModalVisible2 = false;
            });
          }
        });
      } else {
        const passObj = {
          GlobalUserId: this.userInfo.userId,
          ApplyId: this.applyCase.id,
          ButtonType: this.currentButtonType,
          NextOperatorUserId: this.transfer,
          Comment: this.comment,
          ArchiveUnitId: this.applyCase.archiveUnitId,
        };
        doPost('/ApplyCase/AddProcessDetail', passObj).then((response) => {
          if (response) {
            if (this.currentButtonType == 5) {
              if (
                this.applyCase.caseStatus == 2 ||
                this.applyCase.caseStatus == 3
              ) {
                this.responseMessage = `案件已傳送予${this.transferText}處理`;
              }
            } else if (this.currentButtonType == 6) {
              if (
                this.applyCase.caseStatus == 0 ||
                this.applyCase.caseStatus == 2 ||
                this.applyCase.caseStatus == 3
              ) {
                this.responseMessage = `案件已移轉予${this.transferText}處理`;
              }
            }
            this.showModal4();
          }
          this.isModalVisible2 = false;
        });
      }
    },
    showModal3() {
      this.isModalVisible3 = true;
    },
    closeModal3() {
      this.isModalVisible3 = false;
    },
    confirmModal3() {
      const passObj = {
        GlobalUserId: this.userInfo.userId,
        ApplyId: this.applyCase.id,
        ButtonType: this.currentButtonType,
        NextOperatorUserId: null,
        Comment: this.comment,
        ArchiveUnitId: this.applyCase.archiveUnitId,
      };
      doPost('/ApplyCase/AddProcessDetail', passObj).then((response) => {
        if (response) {
          this.responseMessage = `已完成銷案!`;
          this.showModal4();
        }
        this.isModalVisible3 = false;
      });
    },
    // 操作結果彈窗處理
    showModal4() {
      this.isModalVisible4 = true;
    },
    closeModal4() {
      this.isModalVisible4 = false;
    },
    confirmModal4() {
      // do something and close
      setTimeout(() => {
        this.isModalVisible4 = false;
        // do call back?
        this.queryDetail();
        this.loadItems();
      }, 500);
    },
    showModal5() {
      this.isModalVisible5 = true;
    },
    closeModal5() {
      this.isModalVisible5 = false;
    },
    // 必填錯誤訊息處理
    handleRequire(target) {
      if (target == 'startDate') {
        if (this.startDate) {
          this.startDateMessage = '';
        }
      } else if (target == 'endDate') {
        if (this.endDate) {
          this.endDateMessage = '';
        }
      } else if (target == 'applyReason') {
        if (this.applyReason && this.applyReason != '-2') {
          this.applyReasonMessage = '';
        }
      } else if (target == 'applyDescription') {
        if (this.applyDescription) {
          this.applyDescriptionMessage = '';
        }
      }
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
    tempDelFile1() {
      this.deleteFileIds.push(this.applyCase.file1.id);
      this.isFile1Update = !this.isFile1Update;
    },
    tempDelFile2() {
      this.deleteFileIds.push(this.applyCase.file2.id);
      this.isFile2Update = !this.isFile2Update;
    },
    tempDelFile3() {
      this.deleteFileIds.push(this.applyCase.file3.id);
      this.isFile3Update = !this.isFile3Update;
    },
    deleteFile(target) {
      if (target == 'File1') {
        this.file1 = '';
      } else if (target == 'File2') {
        this.file2 = '';
      } else {
        this.file3 = '';
      }
      document.getElementById(target).value = '';
    },
  },
};
</script>
