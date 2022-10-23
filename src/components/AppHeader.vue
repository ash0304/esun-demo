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
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userInfo = reactive({});
    const versionNo = ref('');
    const showLogout = ref(false);

    versionNo.value = process.env.VUE_APP_VERSION;
    if (process.env.VUE_APP_ENV != 'prod') {
      showLogout.value = true;
    }

    onMounted(() => {
      Object.assign(userInfo, JSON.parse(localStorage.getItem('userInfo')));
    });

    // methods
    const showUserInfo = () => {
      const hideMenuRoute = [
        '/',
        '/Signin',
        '/Error500',
        '/Error403',
        '/Error404',
      ];
      return !hideMenuRoute.includes(route.path);
    };

    const showHeader = () => {
      const hideHeaderRoute = ['/Signin'];
      return !hideHeaderRoute.includes(route.path);
    };

    const logout = () => {
      localStorage.removeItem('isLogin');
      localStorage.removeItem('GlobalUserId');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('pageList');
      localStorage.removeItem('versionno');
      localStorage.setItem('infoReady', false);

      if (
        process.env.VUE_APP_ENV == 'uat' ||
        process.env.VUE_APP_ENV == 'sit' ||
        process.env.VUE_APP_ENV == 'changingsit'
      ) {
        var logoutUrl = process.env.VUE_APP_WEB_BASE_URL + '/SignOut';
        window.location.href = logoutUrl;
      } else {
        router.push({ name: 'Signin' });
      }
    };

    return {
      route,
      router,
      userInfo,
      versionNo,
      showLogout,
      showUserInfo,
      showHeader,
      logout,
    };
  },
};
</script>
