<template>
  <div class="mt-4 px-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">公告首頁</li>
        <li class="breadcrumb-item active" aria-current="page">我的清單</li>
      </ol>
    </nav>
    <h2 class="page-title">我的清單</h2>
    <div class="mb-4">
      <!-- 待取件 -->
      <div class="input-group border-bottom-0 row g-0">
        <span class="col-sm-2 input-group-text py-2 px-4"
          >待取件 ({{
            pendingPickup.scanCaseCount +
            pendingPickup.applyCaseCount +
            pendingPickup.unfinishedDailyReviewCount
          }})</span
        >
        <div class="col-sm-4 p-3">
          <ul class="list-unstyled mb-0">
            <!-- 掃描案件 -->
            <li>
              <a href="#" class="unstyle-link"
                >掃描案件 ({{ pendingPickup.scanCaseCount }})</a
              >
            </li>
            <!-- 掃描案件細項 -->
            <ul
              v-if="pendingPickup.scanCaseCount > 0"
              class="list-unstyled mb-0 ms-5"
            >
              <li v-for="item in pendingPickup.scanCase" :key="item.id">
                <a
                  href="#"
                  :class="{ 'unstyle-link': item.count == 0 }"
                  @click="handlePengingScanCase(item)"
                  >{{ `-${item.name} (${item.count})` }}</a
                >
              </li>
            </ul>
            <!-- 調閱申請案件 -->
            <li>
              <a
                href="#"
                :class="{ 'unstyle-link': pendingPickup.applyCaseCount == 0 }"
                @click="handleAllPengingApplyCase(pendingPickup)"
                >調閱申請案件 ({{ pendingPickup.applyCaseCount }})</a
              >
            </li>
            <!-- 每日覆核 -->
            <li>
              <a
                href="#"
                :class="{
                  'unstyle-link': pendingPickup.unfinishedDailyReviewCount == 0,
                }"
                @click="handleAllPengingDailyReview()"
                >每日覆核未完成 ({{
                  pendingPickup.unfinishedDailyReviewCount
                }})</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- 待處理 -->
      <div class="input-group border-bottom-0 row g-0">
        <span class="col-sm-2 input-group-text py-2 px-4"
          >待處理 ({{
            todo.scanCaseCount +
            todo.pendingUploadedCount +
            todo.applyCaseCount
          }})</span
        >
        <div class="col-sm-4 p-3">
          <ul class="list-unstyled mb-0">
            <!-- 掃描案件 -->
            <li>掃描案件 ({{ todo.scanCaseCount }})</li>
            <!-- 掃描案件細項 -->
            <ul v-if="todo.scanCaseCount > 0" class="list-unstyled mb-0 ms-5">
              <li v-for="item in todo.scanCase" :key="item.id">
                <a
                  href="#"
                  :class="{ 'unstyle-link': item.count == 0 }"
                  @click="handleTodoScanCase(item)"
                  >{{ `-${item.name} (${item.count})` }}</a
                >
              </li>
            </ul>
            <!-- 待補案件 -->
            <li>
              <a
                href="#"
                :class="{ 'unstyle-link': todo.pendingUploadedCount == 0 }"
                @click="handleAllTodoPendingCase(todo)"
                >待補案件 ({{ todo.pendingUploadedCount }})</a
              >
            </li>
            <!-- 待補案件細項 -->
            <ul
              v-if="todo.pendingUploadedCount > 0"
              class="list-unstyled mb-0 ms-5"
            >
              <li v-for="item in todo.pendingUploaded" :key="item.id">
                <a
                  href="#"
                  :class="{ 'unstyle-link': item.count == 0 }"
                  @click="handleTodoPendingCase(item)"
                  >{{ `-${item.name} (${item.count})` }}</a
                >
              </li>
            </ul>
            <!-- 調閱申請單 -->
            <li>
              <a
                href="#"
                :class="{ 'unstyle-link': todo.applyCaseCount == 0 }"
                @click="handleAllTodoApplyCase(todo)"
                >調閱申請單 ({{ todo.applyCaseCount }})</a
              >
            </li>
            <!-- 調閱申請單細項 -->
            <ul v-if="todo.applyCaseCount > 0" class="list-unstyled mb-0 ms-5">
              <li v-for="item in todo.applyCase" :key="item.id">
                <a
                  href="#"
                  :class="{ 'unstyle-link': item.count == 0 }"
                  @click="handleTodoApplyCase(item)"
                  >{{ `-${item.name} (${item.count})` }}</a
                >
              </li>
            </ul>
          </ul>
        </div>
      </div>
      <!-- 我的申請案件 -->
      <div class="input-group border-bottom-0 row g-0">
        <span class="col-sm-2 input-group-text py-2 px-4"
          >我的申請案件 ({{
            applyCase.unfinishedCaseCount +
            applyCase.imageViewCount +
            applyCase.pendingUploadedCaseCount
          }})</span
        >
        <div class="col-sm-4 p-3">
          <ul class="list-unstyled mb-0">
            <!-- 調閱申請-查看未結案 -->
            <li>
              <a
                href="#"
                :class="{ 'unstyle-link': applyCase.unfinishedCaseCount == 0 }"
                @click="handlerAllMyUnfinishedCase(applyCase)"
                >調閱申請-查看未結案進度 ({{
                  applyCase.unfinishedCaseCount
                }})</a
              >
            </li>
            <!-- 調閱申請 - 檢視調閱影像 -->
            <li>
              <a
                href="#"
                :class="{ 'unstyle-link': applyCase.imageViewCount == 0 }"
                @click="handlerAllMyImageView(applyCase)"
                >調閱申請-檢視調閱影像 ({{ applyCase.imageViewCount }})</a
              >
            </li>
            <!-- 待補案件 -->
            <li>
              <a
                href="#"
                :class="{
                  'unstyle-link': applyCase.pendingUploadedCaseCount == 0,
                }"
                @click="handleMyPendingCase(applyCase)"
                >待補案件 ({{ applyCase.pendingUploadedCaseCount }})</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- 掃描異常案件 -->
      <div class="input-group row g-0">
        <span class="col-sm-2 input-group-text py-2 px-4"
          ><a
            href="#"
            :class="{
              'unstyle-link': exceptionCaseCount == 0,
            }"
            @click="handleExceptionCase()"
            >掃描異常案件 ({{ exceptionCaseCount }})</a
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { doPost, doAuthGet } from '@/utilities/api';
import { mapGetters } from 'vuex';
import { getDate } from '@/utilities/time';
import store from '@/utilities/store';

export default {
  name: 'Todo',
  data() {
    return {
      pendingPickup: {},
      todo: {},
      applyCase: {},
      exceptionCaseCount: 0,
      userInfo: {}
    };
  },
  computed: {
    ...mapGetters(['isCheckAuth']),
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  mounted() {
    if (process.env.VUE_APP_ENV == 'prod' || process.env.VUE_APP_ENV == 'uat' || process.env.VUE_APP_ENV == 'sit1') {
      if (!this.isCheckAuth) {
        console.log('check not yet from todo');
        // api checkauth
        let tempAPIpath = '/CheckAuth';
        doAuthGet(tempAPIpath).then((response) => {
          const {
            account,
            pageList,
            unitCode,
            unitId,
            unitName,
            userCode,
            userId,
            userName,
          } = response;
          // 更新路由權限
          store.dispatch('setRouteList', pageList);
          // 設定使用者資料
          const userInfo = {
            account,
            unitCode,
            unitId,
            unitName,
            userCode,
            userId,
            userName,
          };
          store.dispatch('setUserInfo', userInfo);
          store.dispatch('setIsCheckAuth', true);
          this.getUserTodoList();
        });
      } else {
        this.getUserTodoList();
      }
    } else {
      this.getUserTodoList();
    }
  },
  methods: {
    getUserTodoList() {
      const passObj = {
        GlobalUserId: this.userInfo.userId,
      };
      doPost('/Bulletin/GetUserTodoList', passObj).then((response) => {
        console.log(response, 'wat');
        const { pendingPickup, todo, applyCase, exceptionCaseCount } = response;
        this.pendingPickup = pendingPickup;
        this.todo = todo;
        this.applyCase = applyCase;
        this.exceptionCaseCount = exceptionCaseCount;
      });
    },
    // 待取件 - 掃描案件(依業務)
    handlePengingScanCase(arg) {
      this.$router.push({
        name: 'ScanCase',
        query: {
          Category: arg.id,
          Flag: 101,
          Status: 0,
          ArchiveUnit: arg.unitIds.join(),
          WorkTeam: arg.workTeamIds.join(),
        },
      });
    },
    // 待取件 - 總攬調閱申請案件
    handleAllPengingApplyCase(arg) {
      if (arg.applyCase.length > 0) {
        const tempTarget = [];
        const tempArr = arg.applyCase.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        const tempUnitIds = [];
        arg.applyCase.forEach((item) => {
          Array.isArray(tempUnitIds) ? tempUnitIds.concat(item.unitIds) : [];
        });
        this.$router.push({
          name: 'ApplyCase',
          query: {
            Category: tempTarget.join(),
            Flag: 101,
            OperatorUnitId: this.userInfo.unitId,
            Status: 0,
            CaseStatus: '1',
            ArchiveUnit: tempUnitIds.join(),
          },
        });
      }
    },
    // 待取件 - 每日覆核未完成
    handleAllPengingDailyReview() {
      this.$router.push({
        name: 'DailyReviewReport',
        query: {
          Flag: 101,
          OperatorUnitId: this.userInfo.unitId,
          Status: 0,
        },
      });
    },
    // 待處理 - 掃描案件(依業務)
    handleTodoScanCase(arg) {
      console.log(arg);
      this.$router.push({
        name: 'ScanCase',
        query: {
          Category: arg.id,
          Flag: 103,
          Status: 1,
          ArchiveUnit: arg.unitIds.join(),
          ScanUser: this.userInfo.userId,
        },
      });
    },
    // 待處理 - 總攬待補案件
    handleAllTodoPendingCase(arg) {
      if (arg.pendingUploaded.length > 0) {
        const tempTarget = [];
        const tempArr = arg.pendingUploaded.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        this.$router.push({
          name: 'PendingUploadedCase',
          query: {
            Category: tempTarget.join(),
            Flag: 102,
            OperatorId: this.userInfo.userId,
            Status: '0,1',
          },
        });
      }
    },
    // 待處理 - 待補案件(依業務)
    handleTodoPendingCase(arg) {
      this.$router.push({
        name: 'PendingUploadedCase',
        query: {
          Category: arg.id,
          Flag: 103,
          OperatorId: this.userInfo.userId,
          Status: '0,1',
        },
      });
    },
    // 待處理 - 調閱申請單總攬
    handleAllTodoApplyCase(arg) {
      if (arg.applyCase.length > 0) {
        const tempTarget = [];
        const tempArr = arg.applyCase.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        this.$router.push({
          name: 'ApplyCase',
          query: {
            Category: tempTarget.join(),
            Flag: 102,
            OperatorId: this.userInfo.userId,
            Status: 0,
            CaseStatus: '0,2,3,7',
          },
        });
      }
    },
    // 待處理 - 調閱申請單(依業務)
    handleTodoApplyCase(arg) {
      console.log(arg);
      this.$router.push({
        name: 'ApplyCase',
        query: {
          Category: arg.id,
          Flag: 103,
          OperatorId: this.userInfo.userId,
          Status: 0,
          CaseStatus: '0,2,3,7',
        },
      });
    },
    // 我的申請案件 - 調閱申請單總攬
    handlerAllMyUnfinishedCase(arg) {
      if (arg.unfinishedCase.length > 0) {
        const tempTarget = [];
        const tempArr = arg.unfinishedCase.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        this.$router.push({
          name: 'ApplyCase',
          query: {
            Category: tempTarget.join(),
            Flag: 104,
            ApplyUser: this.userInfo.userId,
            Status: 0,
          },
        });
      }
    },
    // 我的申請案件 - 檢視調閱影像總攬
    handlerAllMyImageView(arg) {
      if (arg.imageView.length > 0) {
        const tempTarget = [];
        const tempArr = arg.imageView.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        this.$router.push({
          name: 'QueryRecord',
          query: {
            Category: tempTarget.join(),
            Flag: 104,
            ApplyData: getDate(),
          },
        });
      }
    },
    // 我的申請案件 - 總攬待補案件
    handleMyPendingCase(arg) {
      if (arg.pendingUploaded.length > 0) {
        const tempTarget = [];
        const tempArr = arg.pendingUploaded.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        this.$router.push({
          name: 'PendingUploadedCase',
          query: {
            Category: tempTarget.join(),
            Flag: 104,
            UserId: this.userInfo.userId,
            Status: '0,1',
          },
        });
      }
    },
    handleExceptionCase() {
      localStorage.removeItem('GlobalUserId');
      localStorage.setItem('GlobalUserId', this.userInfo.userId);
      const routeData = this.$router.resolve({
        name: 'MyExceptionCase',
      });
      window.open(routeData.href, '_blank');
    },
  },
};
</script>
