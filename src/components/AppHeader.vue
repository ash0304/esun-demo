<template>
  <header v-if="showHeader()" class="bg-primary py-3 text-white">
    <div class="container d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <img
          src="../assets/images/logo_white_esun.svg"
          title="玉山銀行E.SUN Bank"
        />
        <span class="fw-bold fs-5"> &nbsp;｜DIMS文件影像管理系統</span>
        <span class="mx-3 mt-1 fs-6">{{ versionNo }}</span>
      </div>
      <div class="d-flex align-items-center" v-if="showUserInfo()">
        <img src="../assets/images/ic_white_user.svg" width="24" />
        <span class="ms-2"
          >{{ userInfo.userCode }}&nbsp;&nbsp;{{
            userInfo.userName
          }}&nbsp;&nbsp;{{ userInfo.unitName }}</span
        >
        <a href="#" @click="logout()" class="ms-4">
          <img src="../assets/images/ic_white_log_out.svg" width="24" />
        </a>
      </div>
    </div>
  </header>
</template>

<script>
// import store from '@/utilities/store';
// import { doPost } from '@/utilities/api';

export default {
  data() {
    return {
      userInfo: {},
      versionNo: '',
    };
  },
  created() {
    this.versionNo = process.env.VUE_APP_VERSION;
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  methods: {
    showUserInfo() {
      const hideMenuRoute = [
        '/',
        '/Signin',
        '/Error500',
        '/Error403',
        '/Error404',
      ];
      return !hideMenuRoute.includes(this.$route.path);
    },
    showHeader() {
      const hideHeaderRoute = ['/Signin'];
      return !hideHeaderRoute.includes(this.$route.path);
    },
    logout() {
      localStorage.removeItem('isLogin');
      localStorage.removeItem('GlobalUserId');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('pageList');
      localStorage.removeItem('versionno');
      localStorage.setItem('infoReady', false);
      this.$router.push({ name: 'Signin' });
    },
  },
};
</script>
