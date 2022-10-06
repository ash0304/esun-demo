import { createWebHistory, createRouter } from 'vue-router';

//登入頁
import Signin from '@/pages/Signin.vue';

//錯誤頁
import Error500 from '@/pages/Error/Error500.vue';
import Error404 from '@/pages/Error/Error404.vue';
import Error403 from '@/pages/Error/Error403.vue';

//公告首頁
import IndexTodo from '@/pages/Index/Todo.vue';
import IndexUnitTodo from '@/pages/Index/UnitTodo.vue';
import ExceptionCase from '@/pages/Index/ExceptionCase.vue';

//文件掃描(新增)
import ActiveScanAgent from '@/pages/FileScan/ActiveScanAgent.vue';
import GenerateQRCode from '@/pages/FileScan/GenerateQRCode.vue';
import GenerateMultiQRCode from '@/pages/FileScan/GenerateMultiQRCode.vue';

//文件查詢暨調閱/補件
import ImageView from '@/pages/ImageQuery/ImageView.vue';
import QueryRecord from '@/pages/ImageQuery/QueryRecord.vue';

//案件一覽表查詢
import DailyReviewReport from '@/pages/CaseQuery/DailyReviewReport.vue';
import ReviewPage from '@/pages/CaseQuery/ReviewPage.vue';
import ScanCase from '@/pages/CaseQuery/ScanCase.vue';
import ApplyCase from '@/pages/CaseQuery/ApplyCase.vue';
import ApplyCasePage from '@/pages/CaseQuery/ApplyCasePage.vue';
import PendingUploadedCase from '@/pages/CaseQuery/PendingUploadedCase.vue';

//權限管理
import RoleAssignment from '@/pages/Privilege/RoleAssignment.vue';
import RoleUpdateRecord from '@/pages/Privilege/RoleUpdateRecord.vue';
import PrivilegeManagement from '@/pages/Privilege/PrivilegeManagement.vue';
import UnitQuery from '@/pages/Privilege/Unit/UnitQuery.vue';
import UnitAdd from '@/pages/Privilege/Unit/UnitAdd.vue';
import UnitEdit from '@/pages/Privilege/Unit/UnitEdit.vue';
import UnitGroupQuery from '@/pages/Privilege/UnitGroupQuery.vue';
import RoleFunctionPriv from '@/pages/Privilege/RoleFunctionPriv.vue';
import RoleDocumentPriv from '@/pages/Privilege/RoleDocumentPriv.vue';

//系統管理
import TransRecord from '@/pages/System/TransRecord.vue';
import EnvSetup from '@/pages/System/EnvSetup.vue';
import CategoryManagement from '@/pages/System/CategoryManagement.vue';
import CaseIndexQuery from '@/pages/System/CaseIndex/CaseIndexQuery.vue';
import CaseIndexAdd from '@/pages/System/CaseIndex/CaseIndexAdd.vue';
import CaseIndexEdit from '@/pages/System/CaseIndex/CaseIndexEdit.vue';
import QRCodeQuery from '@/pages/System/QRCode/QRCodeQuery.vue';
import QRCodeEdit from '@/pages/System/QRCode/QRCodeEdit.vue';
import { publicPath } from '../vue.config.js';

import store from '@/utilities/store';
import { doAuthGet } from '@/utilities/api';

const routes = [
  {
    path: '/',
    redirect:
      process.env.VUE_APP_ENV == 'prod' ||
      process.env.VUE_APP_ENV == 'uat' ||
      process.env.VUE_APP_ENV == 'sit1'
        ? '/Index'
        : '/Signin',
  },
  //登入頁
  {
    path: '/Signin',
    name: 'Signin',
    component: Signin,
    meta: { title: '登入' },
  },
  //錯誤頁
  {
    path: '/Error500',
    name: 'Error500',
    component: Error500,
    meta: { title: '內部伺服器錯誤' },
  },
  {
    path: '/Error403',
    name: 'Error403',
    component: Error403,
    meta: { title: '拒絕存取' },
  },
  {
    path: '/Error404',
    name: 'Error404',
    component: Error404,
    meta: { title: '頁面不存在' },
  },

  //公告首頁
  {
    path: '/Index',
    name: 'Index',
    component: IndexTodo,
    meta: { title: '我的清單' },
  },
  {
    path: '/Index/UnitTodo',
    name: 'UnitTodo',
    component: IndexUnitTodo,
    meta: { title: '單位待辦清單' },
  },
  {
    path: '/Index/MyExceptionCase',
    name: 'MyExceptionCase',
    component: ExceptionCase,
  },
  {
    path: '/Index/UnitExceptionCase',
    name: 'UnitExceptionCase',
    component: ExceptionCase,
  },

  //文件掃描(新增)
  {
    path: '/FileScan/ActiveScanAgent',
    name: 'ActiveScanAgent',
    component: ActiveScanAgent,
    meta: { title: '高速掃描機掃描' },
  },
  {
    path: '/FileScan/GenerateQRCode',
    name: 'GenerateQRCode',
    component: GenerateQRCode,
    meta: { title: '事務機掃描(列印QR Code)' },
  },
  {
    path: '/FileScan/GenerateMultiQRCode',
    name: 'GenerateMultiQRCode',
    component: GenerateMultiQRCode,
    meta: { title: '整批產製QR Code' },
  },

  //文件查詢暨調閱/補件
  {
    path: '/ImageQuery/ImageView',
    name: 'ImageView',
    component: ImageView,
    meta: { title: '影像查詢(調閱申請)' },
  },
  {
    path: '/ImageQuery/QueryRecord',
    name: 'QueryRecord',
    component: QueryRecord,
    meta: { title: '調閱紀錄查詢(待補起案)' },
  },

  //案件一覽表查詢
  {
    path: '/CaseQuery/DailyReviewReport',
    name: 'DailyReviewReport',
    component: DailyReviewReport,
    meta: { title: '每日覆核報表' },
  },
  {
    path: '/CaseQuery/ReviewPage',
    name: 'ReviewPage',
    component: ReviewPage,
  },
  {
    path: '/CaseQuery/ScanCase',
    name: 'ScanCase',
    component: ScanCase,
    meta: { title: '掃描案件查詢' },
  },
  {
    path: '/CaseQuery/ApplyCase',
    name: 'ApplyCase',
    component: ApplyCase,
    meta: { title: '調閱申請單查詢' },
  },
  {
    path: '/CaseQuery/ApplyCasePage',
    name: 'ApplyCasePage',
    component: ApplyCasePage,
  },
  {
    path: '/CaseQuery/PendingUploadedCase',
    name: 'PendingUploadedCase',
    component: PendingUploadedCase,
    meta: { title: '待補案件查詢' },
  },

  //權限管理
  {
    path: '/Privilege/RoleAssignment',
    name: 'RoleAssignment',
    component: RoleAssignment,
    meta: { title: '角色指派(角色管理)' },
  },
  {
    path: '/Privilege/RoleUpdateRecord',
    name: 'RoleUpdateRecord',
    component: RoleUpdateRecord,
    meta: { title: '角色異動紀錄查詢' },
  },
  {
    path: '/Privilege/Management',
    name: 'PrivilegeManagement',
    component: PrivilegeManagement,
    meta: { title: '權限管理相關資料查詢' },
  },
  {
    path: '/Privilege/Unit/Query',
    name: 'UnitQuery',
    component: UnitQuery,
    meta: { title: '單位管理' },
  },
  {
    path: '/Privilege/Unit/Add',
    name: 'UnitAdd',
    component: UnitAdd,
    meta: { title: '單位管理 - 新增' },
  },
  {
    path: '/Privilege/Unit/Edit',
    name: 'UnitEdit',
    component: UnitEdit,
    meta: { title: '單位管理 - 編輯' },
  },
  {
    path: '/Privilege/UnitGroup/Query',
    name: 'UnitGroupQuery',
    component: UnitGroupQuery,
    meta: { title: '單位群組管理' },
  },
  {
    path: '/Privilege/RoleFunctionPriv',
    name: 'RoleFunctionPriv',
    component: RoleFunctionPriv,
    meta: { title: '角色功能權限管理' },
  },
  {
    path: '/Privilege/RoleDocumentPriv',
    name: 'RoleDocumentPriv',
    component: RoleDocumentPriv,
    meta: { title: '角色文件權限管理' },
  },

  //系統管理
  {
    path: '/System/TransRecord',
    name: 'TransRecord',
    component: TransRecord,
    meta: { title: '系統操作紀錄' },
  },
  {
    path: '/System/QRCode/Query',
    name: 'QRCodeQuery',
    component: QRCodeQuery,
    meta: { title: 'QRCode 管理' },
  },
  {
    path: '/System/QRCode/Edit',
    name: 'QRCodeEdit',
    component: QRCodeEdit,
    meta: { title: 'QRCode 管理 - 編輯' },
  },
  {
    path: '/System/CategoryManagement',
    name: 'CategoryManagement',
    component: CategoryManagement,
    meta: { title: '業務類別管理' },
  },
  {
    path: '/System/CaseIndex/Query',
    name: 'CaseIndexQuery',
    component: CaseIndexQuery,
    meta: { title: '索引管理' },
  },
  {
    path: '/System/CaseIndex/Add',
    name: 'CaseIndexAdd',
    component: CaseIndexAdd,
    meta: { title: '索引管理 - 新增' },
  },
  {
    path: '/System/CaseIndex/Edit',
    name: 'CaseIndexEdit',
    component: CaseIndexEdit,
    meta: { title: '索引管理 - 編輯' },
  },
  {
    path: '/System/EnvSetup',
    name: 'EnvSetup',
    component: EnvSetup,
    meta: { title: '環境設定' },
  },
];

const router = createRouter({
  history: createWebHistory(publicPath),
  linkActiveClass: 'select',
  linkExactActiveClass: 'select',
  routes,
});

router.beforeResolve(async (to, from, next) => {
  if (
    to.path == '/Error403' ||
    to.path == '/Error404' ||
    to.path == '/Error500'
  ) {
    next();
  } else {
    // prod uat 走checkAuth
    if (
      process.env.VUE_APP_ENV == 'prod' ||
      process.env.VUE_APP_ENV == 'uat' ||
      process.env.VUE_APP_ENV == 'sit1'
    ) {
      const isCheckAuth = store.getters['isCheckAuth'];
      if (!isCheckAuth) {
        console.log('check not yet');
        // api checkauth
        let tempAPIpath = '/CheckAuth';
        const response = await doAuthGet(tempAPIpath);
        if (response) {
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
          const storeRouteList = store.getters['routeList'];
          let realTargetPath;
          if (to.path == '/CaseQuery/ReviewPage') {
            realTargetPath = '/CaseQuery/DailyReviewReport';
          } else if (to.path == '/CaseQuery/ApplyCasePage') {
            realTargetPath = '/CaseQuery/ApplyCase';
          } else if (to.path == '/Index/MyExceptionCase') {
            realTargetPath = '/Index';
          } else if (to.path == '/Index/UnitExceptionCase') {
            realTargetPath = '/Index/UnitTodo';
          } else {
            realTargetPath = to.path;
          }
          let result = false;
          storeRouteList.forEach((item) => {
            item.subFunctions.forEach((i) => {
              if (i.path == realTargetPath) {
                result = i.isValid;
              }
            });
          });
          if (result) {
            next();
          } else {
            if (
              to.path == '/Error403' ||
              to.path == '/Error404' ||
              to.path == '/Error500'
            ) {
              next();
            } else {
              next({ name: 'Error403' });
            }
          }
        }
      } else {
        console.log('checked already');
        const storeRouteList = store.getters['routeList'];
        let realTargetPath;
        if (to.path == '/CaseQuery/ReviewPage') {
          realTargetPath = '/CaseQuery/DailyReviewReport';
        } else if (to.path == '/CaseQuery/ApplyCasePage') {
          realTargetPath = '/CaseQuery/ApplyCase';
        } else if (to.path == '/Index/MyExceptionCase') {
          realTargetPath = '/Index';
        } else if (to.path == '/Index/UnitExceptionCase') {
          realTargetPath = '/Index/UnitTodo';
        } else {
          realTargetPath = to.path;
        }
        let result = false;
        storeRouteList.forEach((item) => {
          item.subFunctions.forEach((i) => {
            if (i.path == realTargetPath) {
              result = i.isValid;
            }
          });
        });
        console.log('result', result);
        if (result) {
          next();
        } else {
          if (
            to.path == '/Error403' ||
            to.path == '/Error404' ||
            to.path == '/Error500'
          ) {
            next();
          } else {
            next({ name: 'Error403' });
          }
        }
      }
    } else {
      // 走siginin
      console.log('signin checked already');
      const storeRouteList = store.getters['routeList'];
      let realTargetPath;
      if (to.path == '/CaseQuery/ReviewPage') {
        realTargetPath = '/CaseQuery/DailyReviewReport';
      } else if (to.path == '/CaseQuery/ApplyCasePage') {
        realTargetPath = '/CaseQuery/ApplyCase';
      } else if (to.path == '/Index/MyExceptionCase') {
        realTargetPath = '/Index';
      } else if (to.path == '/Index/UnitExceptionCase') {
        realTargetPath = '/Index/UnitTodo';
      } else {
        realTargetPath = to.path;
      }
      let result = false;
      storeRouteList.forEach((item) => {
        item.subFunctions.forEach((i) => {
          if (i.path == realTargetPath) {
            result = i.isValid;
          }
        });
      });
      if (result) {
        if (localStorage.getItem('isLogin')) {
          next();
        } else {
          next({ name: 'Error403' });
        }
      } else {
        if (to.path == '/Signin') {
          if (localStorage.getItem('isLogin')) {
            next({ name: 'Index' });
          } else {
            next();
          }
        } else if (
          to.path == '/Error403' ||
          to.path == '/Error404' ||
          to.path == '/Error500'
        ) {
          next();
        } else {
          next({ name: 'Error403' });
        }
      }
    }
  }
});

export default router;
