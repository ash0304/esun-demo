<template>
  <div class="mt-4 px-3">
    <!-- modal -->
    <div class="mb-3">
      <p>modal文字</p>
      <p>
        - 若不需取消按鈕請新增
        <span class="highlight">:showCancelBtn="false"</span>
        (預設為true)
      </p>
      <p>
        - 若內容為表單請新增
        <span class="highlight">type="form"</span>
        (預設為basic，type 分為 basic 跟 form，form不包含按鈕)
        並將#body替換為#form來放置內容。
      </p>
      <button type="button" class="btn btn-sm btn-primary" @click="showModal">
        開啟modal
      </button>

      <Teleport to="body">
        <transition name="modal-fade">
          <Modal
            v-if="isModalVisible"
            :showCancelBtn="false"
            :showConfirmBtn="true"
            @close="closeModal"
            @confirm="closeModal"
          >
            <template #header> 標題文字 </template>
            <template #body>
              <div class="modal-body-padding">
                文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容
              </div>
            </template>
            <template #cancelBtn> 取消 </template>
            <template #confirmBtn> 確定 </template>
          </Modal>
        </transition>
      </Teleport>
    </div>
    <!-- modal + icon -->
    <div class="mb-3">
      <p>modal文字 + icon</p>
      <button
        type="button"
        class="btn btn-sm btn-primary"
        @click="showIconModal"
      >
        開啟modal
      </button>

      <Teleport to="body">
        <transition name="modal-fade">
          <Modal
            v-if="isModalIconVisible"
            @close="closeModal"
            @confirm="closeModal"
          >
            <template #header> 標題文字 </template>
            <template #icon>
              <img
                src="@/assets/images/ic_green_check_circle.svg"
                title="玉山銀行E.SUN Bank"
                class="modal-icon"
              />
            </template>
            <template #body>
              文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容
            </template>
            <template #cancelBtn> 取消 </template>
            <template #confirmBtn> 確定 </template>
          </Modal>
        </transition>
      </Teleport>
    </div>
    <!-- checkbox -->
    <div class="mb-3">
      <p>checkbox</p>
      <div class="d-flex">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
            checked
          />
          <label class="form-check-label" for="inlineCheckbox1">分行</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option1"
          />
          <label class="form-check-label" for="inlineCheckbox2">財富處</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox3"
            value="option1"
            disabled
          />
          <label class="form-check-label" for="inlineCheckbox3">無法選擇</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox4"
            value="option1"
            disabled
            checked
          />
          <label class="form-check-label" for="inlineCheckbox4">無法取消</label>
        </div>
      </div>
    </div>
    <!-- radio -->
    <div class="mb-3">
      <p>radio button</p>
      <div class="d-flex">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="option1"
            checked
          />
          <label class="form-check-label" for="inlineRadio1">是</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="option2"
          />
          <label class="form-check-label" for="inlineRadio2">否</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="option3"
            disabled
          />
          <label class="form-check-label" for="inlineRadio3">無法選擇</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio4"
            value="option4"
            checked
            disabled
          />
          <label class="form-check-label" for="inlineRadio4">無法取消</label>
        </div>
      </div>
    </div>
    <!-- switch -->
    <div class="mb-3">
      <p>switch</p>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
        />
        <label class="form-check-label" for="flexSwitchCheckDefault"
          >關閉</label
        >
      </div>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckChecked"
          checked
        />
        <label class="form-check-label" for="flexSwitchCheckChecked"
          >開啟</label
        >
      </div>
    </div>
    <!-- button -->
    <div class="mb-3">
      <p>button</p>
      <div class="mb-3">
        <button type="button" class="btn btn-primary btn-xs me-3">
          btn-primary
        </button>
        <button type="button" class="btn btn-secondary btn-xs me-3">
          btn-secondary
        </button>
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-primary btn-xs me-3">
          btn-xs
        </button>
        <button type="button" class="btn btn-primary btn-sm me-3">
          btn-sm
        </button>
        <button type="button" class="btn btn-primary btn-md me-3">
          btn-md
        </button>
        <button type="button" class="btn btn-primary btn-lg me-3">
          btn-lg
        </button>
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-primary btn-xs w100 me-3">
          w100
        </button>
        <button type="button" class="btn btn-primary btn-xs w125 me-3">
          w125
        </button>
        <button type="button" class="btn btn-primary btn-xs w180 me-3">
          w180
        </button>
        <button type="button" class="btn btn-primary btn-xs w220 me-3">
          w220
        </button>
        <button type="button" class="btn btn-primary btn-xs w320 me-3">
          w320
        </button>
      </div>
    </div>
    <!-- loading -->
    <div class="mb-3">
      <p>loading</p>
      <button type="button" class="btn btn-sm btn-primary" @click="showLoading">
        顯示loading
      </button>
      <Teleport to="body">
        <Loading v-if="isLoadingVisible" />
      </Teleport>
    </div>
    <!-- single select -->
    <div class="mb-3">
      <p>single select</p>
      <p>
        - 若資料格式為KeyPair，務必使用id text
        <span class="highlight">[{id: key, text: value}]</span>
      </p>
      <Select2
        placeholder="請選擇"
        v-model="singleSelect"
        :options="optionKeyPair"
        :settings="{ settingOption: value, settingOption: value }"
      />
    </div>
    <!-- multiple select -->
    <div class="mb-3">
      <p>multiple select</p>
      <Select2
        placeholder="請選擇"
        @change="test($event)"
        v-model="multiSelect"
        :options="optionKeyPair"
        :settings="{
          multiple: true,
        }"
      />
    </div>
    <!-- treeview -->
    <div class="mb-3">
      <p>treeview</p>
      <p>
        - 拖曳: 在config中設定 <span class="highlight">dragAndDrop: true</span>
      </p>
      <p>
        - 勾選: 在config中設定 <span class="highlight">checkboxes: true</span>
        <span class="highlight">checkMode: 0 或 checkMode: 1</span>
        (勾選連動或不連動)
      </p>
      <TreeView
        :config="config"
        :nodes="nodes"
        @nodeFocus="nodeFocus"
        @nodeChecked="nodeChecked"
        @nodeUnchecked="nodeUnchecked"
        @nodeDragstart="nodeDragstart"
        @nodeOver="nodeOver"
        @nodeEnter="nodeEnter"
        @nodeDrop="nodeDrop"
        @nodeDragend="nodeDragend"
      />
    </div>
    <!-- datepicker -->
    <div class="mb-3">
      <p>datepicker</p>
      <div class="row">
        <div class="col-4">
          <div class="input-group calendar-wrapper">
            <input
              type="date"
              class="form-control"
              placeholder="請選擇日期"
              v-model="date1"
            />
            <span class="calendar">
              <button class="btn btn-secondary btn-calendar" type="button">
                <img class="img-calendar" />
              </button>
            </span>
          </div>
        </div>

        <div class="col-4">
          <div class="input-group calendar-wrapper">
            <input
              type="date"
              class="form-control"
              placeholder="請選擇日期"
              v-model="date2"
              disabled
            />
            <span class="calendar">
              <button class="btn btn-secondary btn-calendar" type="button">
                <img class="img-calendar" />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.highlight {
  border: 1px solid #979797;
  padding: 2px;
}
.node-error {
  cursor: not-allowed;
}
</style>

<script>
import Modal from '@/components/Modal.vue';
import Loading from '@/components/Loading.vue';
import Select2 from 'vue3-select2-component';
import TreeView from '@/components/TreeView.vue';

export default {
  name: 'Sample',
  components: {
    Modal,
    Loading,
    Select2,
    TreeView,
  },
  data: function () {
    return {
      selected_permission: 0,
      permissions: [],
      users: [],
      isModalVisible: false,
      isModalIconVisible: false,
      isLoadingVisible: false,
      singleSelect: '',
      multiSelect: [],
      options: ['opt1', 'opt2', 'opt3'],
      optionKeyPair: [
        { id: 1, text: 'opt1' },
        { id: 2, text: 'opt2' },
        { id: 3, text: 'opt3' },
      ],
      targetNodeId: '',
      tempNodes: '',
      nodes: {
        '-1': {
          text: 'Root',
          children: ['1', '3'],
          state: {
            checked: false,
            disabled: false,
            dropable: false,
            draggable: false,
            editable: false,
          },
          type: 3,
        },
        1: {
          text: '消金',
          children: ['2'],
          state: {
            checked: false,
            disabled: false,
            dropable: false,
            draggable: false,
            editable: false,
          },
          type: -2,
        },
        2: {
          text: 'CaseNo',
          state: {
            checked: false,
            disabled: false,
            dropable: false,
            draggable: false,
            editable: false,
          },
          type: 2,
        },
        3: {
          text: '開戶表單',
          state: {
            checked: false,
            disabled: false,
            dropable: false,
            draggable: false,
            editable: false,
          },
          type: 1,
        },
      },
      config: {
        roots: ['-1'],
        checkboxes: true,
        checkMode: 0,
        dragAndDrop: false,
      },
      date1: '',
      date2: '',
    };
  },
  methods: {
    test(e) {
      console.log(e)
      console.log(this.multiSelect);
    },
    showModal() {
      this.isModalVisible = true;
    },
    showIconModal() {
      this.isModalIconVisible = true;
    },
    showLoading() {
      this.isLoadingVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.isModalIconVisible = false;
    },
    nodeFocus(val) {
      console.log('nodeFocus', val);
    },
    nodeChecked(val) {
      console.log('nodeChecked', val);
    },
    nodeUnchecked(val) {
      console.log('nodeUnchecked', val);
    },
    nodeDragstart(val) {
      console.log('nodeDragstart', val);
      this.tempNodes = JSON.stringify(this.nodes);
    },
    nodeOver(val) {
      console.log('nodeOver', val);
    },
    nodeEnter(val) {
      console.log('nodeEnter', val);
    },
    nodeDrop(val) {
      console.log('nodeDrop', val);
      this.targetNodeId = val.target.node;
      // 限制拖曳範圍同一層
      if (
        val.target.parentId != val.dragged.parentId ||
        val.target.parentId == null
      ) {
        this.nodes = JSON.parse(this.tempNodes);
      }
    },
    nodeDragend(val) {
      console.log('nodeDragend', val);
      // 不可拖曳進同一層
      if (val.target.parentId == val.dragged.parentId) {
        if (
          this.nodes[this.targetNodeId].children.includes(val.dragged.node.id)
        ) {
          this.nodes = JSON.parse(this.tempNodes);
        }
      }
      // 不可拖曳至根目錄同層
      if (this.config.roots.includes(val.dragged.node.id)) {
        this.nodes = JSON.parse(this.tempNodes);
        this.config.roots = ['-1'];
      }
    },
  },
};
</script>
