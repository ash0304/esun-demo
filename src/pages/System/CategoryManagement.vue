<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">系統管理</li>
        <li class="breadcrumb-item active" aria-current="page">業務類別管理</li>
      </ol>
    </nav>
    <h2 class="page-title">業務類別管理</h2>
    <div class="row mb-4">
      <div class="col-sm-3">
        <TreeView
          :config="config"
          :nodes="nodes"
          @nodeFocus="nodeFocus"
          @nodeDragstart="nodeDragstart"
          @nodeDrop="nodeDrop"
          @nodeDragend="nodeDragend"
        />
      </div>
      <div class="col-sm-9">
        <div class="d-flex justify-content-between mb-2">
          <span class="d-flex">
            <h5 class="fw-bold me-2" v-text="currentNode.text ?? '根目錄'"></h5>
            <a
              v-if="currentNode.id != -1"
              href="#"
              @click="showModal('edit', currentNode.id)"
            >
              <img
                src="@/assets/images/ic_pen_edit.svg"
                width="24"
                height="24"
              />
            </a>
          </span>

          <button
            @click="showModal('create', currentNode.id)"
            type="button"
            class="btn btn-primary btn-sm d-flex align-items-center fs-6"
          >
            <img src="@/assets/images/ic_white_add_circle.svg" title="新增" />
            新增
          </button>
        </div>
        <!-- 搜尋結果 -->
        <div>
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
          >
            <template #emptystate
              ><p class="mb-0 text-center">目前尚無資料</p></template
            >
            <template #table-row="props">
              <span v-if="props.column.field == 'status'">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    :checked="props.formattedRow[props.column.field] == 0"
                  />
                </div>
              </span>
              <span v-else-if="props.column.field == 'edit'">
                <a
                  href="#"
                  @click="showModal('edit', props.formattedRow['id'])"
                >
                  <img
                    src="@/assets/images/ic_pen_edit.svg"
                    width="24"
                    height="24"
                  />
                </a>
              </span>
              <span v-else>{{ props.formattedRow[props.column.field] }}</span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <Modal v-if="isModalVisible" type="form" @close="closeModal">
        <template #header> {{ modalHeader }} </template>
        <template #form>
          <Form @submit="onSubmit" :validation-schema="schema">
            <div class="input-group row g-0">
              <!-- 父層 -->
              <label class="col-sm-3 input-group-text py-2 px-4">父層</label>
              <div class="col-sm-9 p-2">
                <Field
                  v-model="modal.parent"
                  name="parent"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="input-group border-top-0 row g-0">
              <!-- 名稱 -->
              <label class="col-sm-3 input-group-text py-2 px-4 required after"
                >名稱</label
              >
              <div class="col-sm-9 p-2">
                <Field
                  v-model="modal.name"
                  name="name"
                  type="text"
                  class="form-control"
                  placeholder="請輸入名稱"
                />
                <ErrorMessage name="name" class="error-message" />
              </div>
            </div>
            <div class="input-group border-top-0 row g-0">
              <!-- 文件代碼 -->
              <label class="col-sm-3 input-group-text py-2 px-4 required after"
                >文件代碼</label
              >
              <div class="col-sm-9 p-2">
                <Field
                  v-model="modal.documentCode"
                  name="documentCode"
                  type="text"
                  class="form-control"
                  placeholder="請輸入文件代碼"
                />
                <ErrorMessage name="documentCode" class="error-message" />
              </div>
            </div>
            <div
              v-if="showIndexAttribute"
              class="input-group border-top-0 row g-0"
            >
              <!-- 索引屬性 -->
              <label class="col-sm-3 input-group-text py-2 px-4 required after"
                >索引屬性</label
              >
              <div class="col-sm-9 p-2">
                <MultiSelect
                  v-model="modal.index_attribute"
                  name="index_attribute"
                  :options="indexAttrs"
                />
                <ErrorMessage name="index_attribute" class="error-message" />
              </div>
            </div>
            <div v-if="showRegexRule" class="input-group border-top-0 row g-0">
              <!-- 正規表達式規則 -->
              <label class="col-sm-3 input-group-text py-2 px-4"
                >正規表達式規則</label
              >
              <div class="col-sm-9 p-2">
                <Field
                  v-model="modal.regex_rule"
                  name="regex_rule"
                  type="text"
                  class="form-control"
                  placeholder="請輸入正規表達式規則"
                />
                <ErrorMessage name="regex_rule" class="error-message" />
              </div>
            </div>
            <div v-if="showFileSetting" class="accordion mt-3">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFileSetting"
                    aria-expanded="true"
                    aria-controls="collapseFileSetting"
                  >
                    檔案設定
                  </button>
                </h2>
                <div id="collapseFileSetting" class="accordion-collapse show">
                  <div class="accordion-body">
                    <div class="input-group row g-0">
                      <!-- 預設張數 -->
                      <div
                        class="col-sm-3 input-group-text flex-column py-2 px-4"
                      >
                        <label class="required after">預設張數</label>
                        <span>(不限制張數:-1)</span>
                      </div>
                      <div class="col-sm-9 p-2">
                        <Field
                          v-model="modal.numberofSheets"
                          name="numberofSheets"
                          type="number"
                          class="form-control"
                          placeholder="請輸入預設張數"
                        />
                        <ErrorMessage
                          name="numberofSheets"
                          class="error-message"
                        />
                      </div>
                    </div>
                    <div class="input-group border-top-0 row g-0">
                      <!-- 預設長寬比 -->
                      <label
                        class="
                          col-sm-3
                          input-group-text
                          py-2
                          px-4
                          required
                          after
                        "
                        >預設長寬比</label
                      >
                      <div class="col-sm-9 p-2">
                        <SingleSelect
                          v-model="modal.select_aspect_ratio"
                          name="select_aspect_ratio"
                          :options="aspect_ratios"
                        />
                        <ErrorMessage
                          name="select_aspect_ratio"
                          class="error-message"
                        />
                      </div>
                    </div>
                    <div class="input-group border-top-0 row g-0">
                      <!-- 預設解析度 -->
                      <label
                        class="
                          col-sm-3
                          input-group-text
                          py-2
                          px-4
                          required
                          after
                        "
                        >預設解析度</label
                      >
                      <div class="col-sm-9 p-2">
                        <SingleSelect
                          v-model="modal.select_file_resolution"
                          name="select_file_resolution"
                          :options="file_resolutions"
                        />
                        <ErrorMessage
                          name="select_file_resolution"
                          class="error-message"
                        />
                      </div>
                    </div>
                    <div class="input-group border-top-0 row g-0">
                      <!-- 影像檔案上傳限制(KB) -->
                      <div
                        class="col-sm-3 input-group-text flex-column py-2 px-4"
                      >
                        <label class="required after">影像檔案上傳限制</label>
                        <span>(KB)</span>
                      </div>
                      <div class="col-sm-9 p-2">
                        <Field
                          v-model="modal.imageUploadLimit"
                          name="imageUploadLimit"
                          type="number"
                          class="form-control"
                          placeholder="請輸入影像檔案上傳限制"
                        />
                        <ErrorMessage
                          name="imageUploadLimit"
                          class="error-message"
                        />
                      </div>
                    </div>
                    <div class="input-group border-top-0 row g-0">
                      <!-- 非圖檔上傳限制(KB) -->
                      <div
                        class="col-sm-3 input-group-text flex-column py-2 px-4"
                      >
                        <label class="required after">非圖檔上傳限制</label>
                        <span>(KB)</span>
                      </div>
                      <div class="col-sm-9 p-2">
                        <Field
                          v-model="modal.nonImageUploadLimit"
                          name="nonImageUploadLimit"
                          type="number"
                          class="form-control"
                          placeholder="請輸入非圖檔上傳限制"
                        />
                        <ErrorMessage
                          name="nonImageUploadLimit"
                          class="error-message"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-md w320 mt-4 mx-auto d-block"
            >
              儲存
            </button>
          </Form>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<style lang="scss"  scoped>
@import "./node_modules/vue-good-table-next/src/styles/style";
</style>

<script>
import { doGet, doPost } from "@/utilities/api";
import TreeView from "@/components/TreeView.vue";
import { VueGoodTable } from "vue-good-table-next";
import * as datatable from "@/utilities/datatable";
import { Form, Field, ErrorMessage } from "vee-validate";
import Modal from "@/components/Modal.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import SingleSelect from "@/components/SingleSelect.vue";

export default {
  name: "DocManagement",
  components: {
    TreeView,
    VueGoodTable,
    Modal,
    Form,
    Field,
    ErrorMessage,
    MultiSelect,
    SingleSelect,
  },
  data() {
    const schema = this.$yup.object({
      name: this.$yup.string().required(),
      documentCode: this.$yup.string().required(),
      index_attribute: this.$yup.array().arrayRequired(),
      numberofSheets: this.$yup.number().required().min(-1),
      imageUploadLimit: this.$yup.number().nullable().required(),
      nonImageUploadLimit: this.$yup.number().nullable().required(),
    });

    var modal = this.initModalData();
    return {
      //treeview
      currentNode: "",
      config: [],
      nodes: [],
      tempNodes: "",
      targetNodeId: "",

      //datatable
      paginationOptions: datatable.paginationOptions,
      columns: [
        { field: "id", hidden: true },
        { label: "名稱", field: "nodeName" },
        { label: "文件代碼", field: "barcode" },
        { label: "狀態", field: "status", sortable: false },
        { label: "編輯", field: "edit", sortable: false },
      ],
      rows: [],
      totalRecords: 0,

      // modal
      isModalVisible: false,
      modalHeader: "",
      showFileSetting: false,
      showIndexAttribute: false,
      showRegexRule: false,
      schema,
      indexAttrs: [1, 2, 3, 4, 5, 6],
      aspect_ratios: [
        { id: 1024, text: "1024*768" },
        { id: 1600, text: "1600*1200" },
      ],
      file_resolutions: [150, 200, 300],
      modal
    };
  },
  mounted() {
    this.getHierarchyList();
    this.loadItems();
  },
  methods: {
    getHierarchyList() {
      doGet("/DocManagement/GetHierarchyList")
        .then((response) => {
          if (response.status == 200) {
            var data = JSON.parse(response.data);
            this.nodes = data;
            this.config = {
              roots: ["-1"],
              dragAndDrop: true,
            };
            this.currentNode = this.nodes[-1];
          } else {
            this.$router.push({ name: "Error500" });
          }
        })
        .catch(() => {
          this.$router.push({ name: "Error500" });
        });
    },
    addHierarchy() {
      // loading start
      // post 新增Hierarchy
      // get 重新取得List
      // loading end
      if (this.currentNode != "") {
        this.nodes[this.currentNode.id].children.push("35");
        this.nodes[this.currentNode.id].state.opened = true;
        this.nodes["35"] = {
          text: "測試新增",
          state: {
            checked: false,
            dropable: true,
            draggable: true,
          },
          type: this.currentNode.type + 1,
        };
      }
    },
    nodeFocus(val) {
      this.currentNode = val;
      this.loadItems();
    },
    nodeDragstart(val) {
      console.log("nodeDragstart", val);
      this.tempNodes = JSON.stringify(this.nodes);
    },
    nodeDrop(val) {
      this.targetNodeId = val.target.node;
      if (
        val.target.parentId != val.dragged.parentId ||
        val.target.parentId == null
      ) {
        this.nodes = JSON.parse(this.tempNodes);
      }
    },
    nodeDragend(val) {
      if (val.target.parentId == val.dragged.parentId) {
        if (
          this.nodes[this.targetNodeId].children.includes(val.dragged.node.id)
        ) {
          this.nodes = JSON.parse(this.tempNodes);
        }
      }
      if (this.config.roots.includes(val.dragged.node.id)) {
        this.nodes = JSON.parse(this.tempNodes);
        this.config.roots = ["-1"];
      }
      // post update tree node
      // reset table
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
    loadItems() {
      const request = {
        dtRequest: datatable.serverReq,
        id: this.currentNode == "" ? -1 : parseInt(this.currentNode.id),
      };
      doPost("/DocManagement/GetHierarchyChildrenQueryResult", request)
        .then((response) => {
          if (response.status == 200) {
            this.rows = response.data.rows;
            this.totalRecords = response.data.totalRecords;
          } else {
            this.$router.push({ name: "Error500" });
          }
        })
        .catch(() => {
          this.$router.push({ name: "Error500" });
        });
    },
    showModal(type, nodeId) {
      var node = this.nodes[nodeId];

      console.log(node);
      if (type == "edit") {
        // 編輯
        // post get data
        this.handleModalContentDisplay(type, node.type);
        this.setEditModalData(node);
      } else {
        // 新增
        this.handleModalContentDisplay(type, node.type + 1);
        this.setCreateModalData(node);
      }
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.modal = this.initModalData();
    },
    initModalData() {
      return {
        parent: "",
        name: "",
        documentCode: "",
        index_attribute: [],
        regex_rule: "",
        numberofSheets: null,
        select_aspect_ratio: 1024,
        select_file_resolution: 150,
        imageUploadLimit: null,
        nonImageUploadLimit: null,
      };
    },
    handleModalContentDisplay(type, nodeType) {
      var modalTitlePrefix = type == "create" ? "新增" : "編輯";
      switch (nodeType) {
        case this.$treeType.CATEGORY:
          this.modalHeader = `${modalTitlePrefix}類別`;
          this.showFileSetting = false;
          this.showIndexAttribute = false;
          this.showRegexRule = false;
          this.schema = this.$yup.object({
            name: this.$yup.string().required(),
            documentCode: this.$yup.string().required(),
          });
          break;
        case this.$treeType.CASE:
          this.modalHeader = `${modalTitlePrefix}案件`;
          this.showFileSetting = true;
          this.showIndexAttribute = true;
          this.showRegexRule = true;
          this.schema = this.$yup.object({
            name: this.$yup.string().required(),
            documentCode: this.$yup.string().required(),
            index_attribute: this.$yup.array().arrayRequired(),
            select_aspect_ratio: this.$yup.number().required(),
            select_file_resolution: this.$yup.number().required(),
            numberofSheets: this.$yup.number().nullable().required().min(-1),
            imageUploadLimit: this.$yup.number().nullable().required(),
            nonImageUploadLimit: this.$yup.number().nullable().required(),
          });
          break;
        case this.$treeType.FILE:
          this.modalHeader = `${modalTitlePrefix}檔案`;
          this.showFileSetting = true;
          this.showIndexAttribute = false;
          this.showRegexRule = false;
          this.schema = this.$yup.object({
            name: this.$yup.string().required(),
            documentCode: this.$yup.string().required(),
            numberofSheets: this.$yup.number().nullable().required().min(-1),
            select_aspect_ratio: this.$yup.number().required(),
            select_file_resolution: this.$yup.number().required(),
            imageUploadLimit: this.$yup.number().nullable().required(),
            nonImageUploadLimit: this.$yup.number().nullable().required(),
          });
          break;
        default:
      }
    },
    setCreateModalData(node) {
      // 新增
      this.modal.parent = node.text;
    },
    setEditModalData(node) {
      // 編輯
      var parentNode = this.getParentNode(node);

      this.modal.parent = parentNode?.text;
      this.modal.name = node?.text;
    },
    getParentNode(node) {
      if (node.id != this.currentNode.id) {
        return this.currentNode;
      } else {
        return this.nodes[node.parent];
      }
    },
    onSubmit(values) {
      console.log(values);
    },
  },
};
</script>

<style scoped>
.error-message {
  font-size: 18px;
}
</style>