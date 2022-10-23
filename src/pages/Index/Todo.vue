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
import { doPost } from '@/utilities/api';
import { getDate } from '@/utilities/time';
import store from '@/utilities/store';
import { onMounted, reactive, ref, computed } from 'vue';
import { useRouter } from "vue-router";

export default {
  name: 'Todo',
  setup() {
    const router = useRouter();
    const pendingPickup = reactive({});
    const todo = reactive({});
    const applyCase = reactive({});
    const exceptionCaseCount = ref(0);
    const userInfo = reactive({});

    const isCheckAuth = computed(() => store.getters.isCheckAuth);

    Object.assign(userInfo, JSON.parse(localStorage.getItem('userInfo')));

    onMounted(() => {
      getUserTodoList();
    });

    // methods
    const getUserTodoList = () => {
      const passObj = {
        GlobalUserId: userInfo.userId,
      };
      doPost('/Bulletin/GetUserTodoList', passObj).then((response) => {
        console.log(response, 'wat');
        Object.assign(pendingPickup, response.pendingPickup);
        Object.assign(todo, response.todo);
        Object.assign(applyCase, response.applyCase);
        Object.assign(exceptionCaseCount, response.exceptionCaseCount);
      });
    };

    // 待取件 - 掃描案件(依業務)
    const handlePengingScanCase = (arg) => {
      router.push({
        name: 'ScanCase',
        query: {
          Category: arg.id,
          Flag: 101,
          Status: 0,
          ArchiveUnit: arg.unitIds.join(),
          WorkTeam: arg.workTeamIds.join(),
        },
      });
    };

    // 待取件 - 總攬調閱申請案件
    const handleAllPengingApplyCase = (arg) => {
      if (arg.applyCase.length > 0) {
        const tempTarget = [];
        const tempArr = arg.applyCase.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        const tempUnitIds = [];
        arg.applyCase.forEach((item) => {
          Array.isArray(tempUnitIds) ? tempUnitIds.concat(item.unitIds) : [];
        });
        router.push({
          name: 'ApplyCase',
          query: {
            Category: tempTarget.join(),
            Flag: 101,
            OperatorUnitId: userInfo.unitId,
            Status: 0,
            CaseStatus: '1',
            ArchiveUnit: tempUnitIds.join(),
          },
        });
      }
    };

    // 待取件 - 每日覆核未完成
    const handleAllPengingDailyReview = () => {
      router.push({
        name: 'DailyReviewReport',
        query: {
          Flag: 101,
          OperatorUnitId: userInfo.unitId,
          Status: 0,
        },
      });
    };

    // 待處理 - 掃描案件(依業務)
    const handleTodoScanCase = (arg) => {
      console.log(arg);
      router.push({
        name: 'ScanCase',
        query: {
          Category: arg.id,
          Flag: 103,
          Status: 1,
          ArchiveUnit: arg.unitIds.join(),
          ScanUser: userInfo.userId,
        },
      });
    };

    // 待處理 - 總攬待補案件
    const handleAllTodoPendingCase = (arg) => {
      if (arg.pendingUploaded.length > 0) {
        const tempTarget = [];
        const tempArr = arg.pendingUploaded.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        router.push({
          name: 'PendingUploadedCase',
          query: {
            Category: tempTarget.join(),
            Flag: 102,
            OperatorId: userInfo.userId,
            Status: '0,1',
          },
        });
      }
    };

    // 待處理 - 待補案件(依業務)
    const handleTodoPendingCase = (arg) => {
      router.push({
        name: 'PendingUploadedCase',
        query: {
          Category: arg.id,
          Flag: 103,
          OperatorId: userInfo.userId,
          Status: '0,1',
        },
      });
    };

    // 待處理 - 調閱申請單總攬
    const handleAllTodoApplyCase = (arg) => {
      if (arg.applyCase.length > 0) {
        const tempTarget = [];
        const tempArr = arg.applyCase.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        router.push({
          name: 'ApplyCase',
          query: {
            Category: tempTarget.join(),
            Flag: 102,
            OperatorId: userInfo.userId,
            Status: 0,
            CaseStatus: '0,2,3,7',
          },
        });
      }
    };

    // 待處理 - 調閱申請單(依業務)
    const handleTodoApplyCase = (arg) => {
      console.log(arg);
      router.push({
        name: 'ApplyCase',
        query: {
          Category: arg.id,
          Flag: 103,
          OperatorId: userInfo.userId,
          Status: 0,
          CaseStatus: '0,2,3,7',
        },
      });
    };

    // 我的申請案件 - 調閱申請單總攬
    const handlerAllMyUnfinishedCase = (arg) => {
      if (arg.unfinishedCase.length > 0) {
        const tempTarget = [];
        const tempArr = arg.unfinishedCase.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        router.push({
          name: 'ApplyCase',
          query: {
            Category: tempTarget.join(),
            Flag: 104,
            ApplyUser: userInfo.userId,
            Status: 0,
          },
        });
      }
    };

    // 我的申請案件 - 檢視調閱影像總攬
    const handlerAllMyImageView = (arg) => {
      if (arg.imageView.length > 0) {
        const tempTarget = [];
        const tempArr = arg.imageView.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        router.push({
          name: 'QueryRecord',
          query: {
            Category: tempTarget.join(),
            Flag: 104,
            ApplyData: getDate(),
          },
        });
      }
    };

    // 我的申請案件 - 總攬待補案件
    const handleMyPendingCase = (arg) => {
      if (arg.pendingUploaded.length > 0) {
        const tempTarget = [];
        const tempArr = arg.pendingUploaded.filter((item) => item.count > 0);
        tempArr.forEach((item) => tempTarget.push(item.id));
        router.push({
          name: 'PendingUploadedCase',
          query: {
            Category: tempTarget.join(),
            Flag: 104,
            UserId: userInfo.userId,
            Status: '0,1',
          },
        });
      }
    };

    const handleExceptionCase = () => {
      localStorage.removeItem('GlobalUserId');
      localStorage.setItem('GlobalUserId', userInfo.userId);
      const routeData = router.resolve({
        name: 'MyExceptionCase',
      });
      window.open(routeData.href, '_blank');
    };

    return {
      pendingPickup,
      todo,
      applyCase,
      exceptionCaseCount,
      userInfo,
      isCheckAuth,
      getUserTodoList,
      handlePengingScanCase,
      handleAllPengingApplyCase,
      handleAllPengingDailyReview,
      handleTodoScanCase,
      handleAllTodoPendingCase,
      handleTodoPendingCase,
      handleAllTodoApplyCase,
      handleTodoApplyCase,
      handlerAllMyUnfinishedCase,
      handlerAllMyImageView,
      handleMyPendingCase,
      handleExceptionCase,
    };
  },
};
</script>
