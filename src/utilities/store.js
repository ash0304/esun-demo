import { createStore } from 'vuex';

export default createStore({
  state: {
    userInfo: {
      userId: 2,
      userCode: '08877',
      userName: '○○茹',
      account: 'ma-08877',
      unitId: 1,
      unitCode: '532',
      unitName: '城中分行',
    },
    user: JSON.parse(sessionStorage.getItem('user')),
    globalModal: false,
    globalModalMessage: '',
    isLoadingVisible: false,
    tempPDFstring: '',
    isCheckAuth: false,
    isLogin: localStorage.getItem('isLogin') ? true : false,
    routeList: [
      {
        mainCode: 'TD-01',
        mainName: '公告首頁',
        isValid: true,
        subFunctions: [
          {
            subCode: 'TD-01-001',
            subName: '我的清單',
            isValid: true,
            path: '/Index',
          },
          {
            subCode: 'TD-01-002',
            subName: '單位待辦清單',
            isValid: true,
            path: '/Index/UnitTodo',
          },
        ],
      },
      {
        mainCode: 'SC-01',
        mainName: '文件掃描(新增)',
        isValid: true,
        subFunctions: [
          {
            subCode: 'SC-01-001',
            subName: '高速掃描機掃描',
            isValid: true,
            path: '/FileScan/ActiveScanAgent',
          },
          {
            subCode: 'SC-01-002',
            subName: '事務機掃描',
            isValid: true,
            path: '/FileScan/GenerateQRCode',
          },
          {
            subCode: 'SC-01-003',
            subName: '整批產製QR Code',
            isValid: true,
            path: '/FileScan/GenerateMultiQRCode',
          },
        ],
      },
      {
        mainCode: 'SE-01',
        mainName: '文件查詢暨調閱/補件',
        isValid: true,
        subFunctions: [
          {
            subCode: 'SE-01-001',
            subName: '影像查詢(調閱申請)',
            isValid: true,
            path: '/ImageQuery/ImageView',
          },
          {
            subCode: 'SE-01-002',
            subName: '調閱紀錄查詢(待補起案)',
            isValid: true,
            path: '/ImageQuery/QueryRecord',
          },
        ],
      },
      {
        mainCode: 'MA-01',
        mainName: '案件一覽表查詢',
        isValid: true,
        subFunctions: [
          {
            subCode: 'MA-01-001',
            subName: '每日覆核報表',
            isValid: true,
            path: '/CaseQuery/DailyReviewReport',
          },
          {
            subCode: 'MA-01-002',
            subName: '掃描案件查詢',
            isValid: true,
            path: '/CaseQuery/ScanCase',
          },
          {
            subCode: 'MA-01-003',
            subName: '調閱申請單查詢',
            isValid: true,
            path: '/CaseQuery/ApplyCase',
          },
          {
            subCode: 'MA-01-004',
            subName: '待補案件查詢',
            isValid: true,
            path: '/CaseQuery/PendingUploadedCase',
          },
        ],
      },
      {
        mainCode: 'AP-01',
        mainName: '權限管理',
        isValid: true,
        subFunctions: [
          {
            subCode: 'AP-01-001',
            subName: '角色指派(角色管理)',
            isValid: true,
            path: '/Privilege/RoleAssignment',
          },
          {
            subCode: 'AP-01-002',
            subName: '角色異動紀錄查詢',
            isValid: true,
            path: '/Privilege/RoleUpdateRecord',
          },
          {
            subCode: 'AP-01-003',
            subName: '權限管理相關資料查詢',
            isValid: true,
            path: '/Privilege/Management',
          },
          {
            subCode: 'AP-01-004',
            subName: '單位管理',
            isValid: true,
            path: '/Privilege/Unit/Query',
          },
          {
            subCode: 'AP-01-005',
            subName: '單位群組管理',
            isValid: true,
            path: '/Privilege/UnitGroup/Query',
          },
          {
            subCode: 'AP-01-006',
            subName: '角色功能權限管理',
            isValid: true,
            path: '/Privilege/RoleFunctionPriv',
          },
          {
            subCode: 'AP-01-007',
            subName: '角色文件權限管理',
            isValid: true,
            path: '/Privilege/RoleDocumentPriv',
          },
        ],
      },
      {
        mainCode: 'SM-01',
        mainName: '系統管理',
        isValid: true,
        subFunctions: [
          {
            subCode: 'SM-01-001',
            subName: '系統操作紀錄',
            isValid: true,
            path: '/System/TransRecord',
          },
          {
            subCode: 'SM-01-002',
            subName: 'QRCode 管理',
            isValid: true,
            path: '/System/QRCode/Query',
          },
          {
            subCode: 'SM-01-003',
            subName: '業務類別管理',
            isValid: true,
            path: '/System/CategoryManagement',
          },
          {
            subCode: 'SM-01-004',
            subName: '索引管理',
            isValid: true,
            path: '/System/CaseIndex/Query',
          },
          {
            subCode: 'SM-01-005',
            subName: '環境設定',
            isValid: true,
            path: '/System/EnvSetup',
          },
        ],
      },
    ],
  },
  mutations: {
    setUser(state, status) {
      sessionStorage.setItem('user', JSON.stringify(status));
      state.user = status;
    },
    clean(state) {
      sessionStorage.clear();
      state.user = null;
    },
    SET_GLOBALMODAL(state, status) {
      state.globalModal = status;
    },
    SET_GLOBALMODALMESSAGE(state, status) {
      state.globalModalMessage = status;
    },
    SET_LOADING(state, status) {
      state.isLoadingVisible = status;
    },
    SET_USERINFO(state, status) {
      state.userInfo = status;
      localStorage.setItem('userInfo', JSON.stringify(status));
    },
    SET_ROUTE_LIST(state, status) {
      console.log(status);
      state.routeList.forEach((item) => {
        const routerItem = status.find((el) => el.mainCode == item.mainCode);
        item.isValid = routerItem.isValid;
        item.subFunctions.forEach((i) => {
          const subFunctionItem = routerItem.subFunctions.find(
            (el) => el.subCode == i.subCode
          );
          i.isValid = subFunctionItem.isValid;
        });
        localStorage.setItem('pageList', JSON.stringify(state.routeList));
      });
    },
    SET_ISCHECKAUTH(state, status) {
      state.isCheckAuth = status;
    },
    SET_ISLOGIN(state, status) {
      state.isLogin = status;
    },
    SET_PDFSTRING(state, status) {
      state.tempPDFstring = status;
    },
  },
  actions: {
    toggleGlobalModal(context, status) {
      context.commit('SET_GLOBALMODAL', status);
    },
    toggleLoading(context, status) {
      context.commit('SET_LOADING', status);
    },
    setGlobalModalMessage(context, status) {
      context.commit('SET_GLOBALMODALMESSAGE', status);
    },
    setUserInfo(context, status) {
      context.commit('SET_USERINFO', status);
    },
    setRouteList(context, status) {
      context.commit('SET_ROUTE_LIST', status);
    },
    setIsCheckAuth(context, status) {
      context.commit('SET_ISCHECKAUTH', status);
    },
    setIsLogin(context, status) {
      context.commit('SET_ISLOGIN', status);
    },
    setPDFString(context, status) {
      context.commit('SET_PDFSTRING', status);
    },
  },
  getters: {
    globalModalVisible: (state) => state.globalModal,
    globalModalMessage: (state) => state.globalModalMessage,
    userInfo: (state) => state.userInfo,
    isLoadingVisible: (state) => state.isLoadingVisible,
    routeList: (state) => state.routeList,
    isCheckAuth: (state) => state.isCheckAuth,
    tempPDFstring: (state) => state.tempPDFstring,
    isLogin: (state) => state.isLogin,
  },
});
