<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">公告首頁</li>
        <li class="breadcrumb-item">我的清單</li>
        <li class="breadcrumb-item active" aria-current="page">掃描異常案件</li>
      </ol>
    </nav>
    <div class="mt-4">
      <div>
        <JsonCSV
          :data="rows"
          :labels="labels"
          :fields="fields"
          :name="generatorCSVname('掃描異常案件')"
        ></JsonCSV>
      </div>
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
          <span v-if="props.column.field == 'Status'">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="props.row.Value"
                @change="handleSwitch(props.row)"
              />
            </div>
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>
<script>
import * as datatable from '@/utilities/datatable';
import { VueGoodTable } from 'vue-good-table-next';
import JsonCSV from '@/components/JsonCSV';

import { generatorCSVname } from '@/utilities/time';
import { doPost } from '@/utilities/api';

export default {
  name: 'ExceptionCase',
  components: { VueGoodTable, JsonCSV },
  data() {
    return {
      paginationOptions: datatable.paginationOptions,
      totalRecords: 0,
      // table
      columns: [
        {
          label: '',
          field: 'Id',
          hidden: true,
        },
        {
          label: '單位',
          field: 'Unit',
          hidden: false,
          width: '150px',
        },
        {
          label: '日期時間',
          field: 'CreateTime',
          hidden: false,
          width: '150px',
        },
        {
          label: 'pdf檔名',
          field: 'FileName',
          hidden: false,
          width: '150px',
        },
        {
          label: '異常原因',
          field: 'ErrorReason',
          hidden: false,
          width: '150px',
        },
        {
          label: '已完成/未完成',
          field: 'Status',
          hidden: false,
          sortable: false,
          width: '150px',
        },
      ],
      rows: [],
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
    this.loadItems();
  },
  methods: {
    generatorCSVname,
    onPageChange(params) {
      datatable.onPageChange(params, this.loadItems);
    },
    onPerPageChange(params) {
      datatable.onPerPageChange(params, this.loadItems);
    },
    onSortChange(params) {
      datatable.onSortChange(params, this.loadItems);
    },
    // 轉大寫開頭屬性
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
      passObj.Data.GlobalUserId = localStorage.getItem('GlobalUserId')
        ? localStorage.getItem('GlobalUserId')
        : this.userInfo.userId;
      doPost('/ExceptionCase/Query', passObj).then((response) => {
        const { totalRecords, rows } = response;
        this.rows = [];
        this.totalRecords = totalRecords;
        // 對資料做Object屬性開頭大寫處理
        rows.forEach((item, index) => {
          const tempObj = {};
          for (const [key, value] of Object.entries(item)) {
            tempObj[this.capitalizeFirstLetter(key)] = value;
            tempObj['Value'] = tempObj['Status'] == 0 ? false : true;
          }
          this.rows[index] = tempObj;
        });
      });
      // csv setting處理
      this.columns.forEach((item) => {
        if (item.field == 'Id' || item.field == 'Status') {
          // do nothing
        } else {
          this.fields.push(item.field);
          this.labels[item.field] = item.label;
        }
      });
    },
    handleSwitch(row) {
      const passObj = {
        Id: row.Id,
        Status: row.Value ? 1 : 0,
        GlobalUserId: this.userInfo.userId,
      };
      doPost('/ExceptionCase/EditStatus', passObj).then((response) => {
        if (response) {
          this.loadItems();
        }
      });
    },
  },
};
</script>
