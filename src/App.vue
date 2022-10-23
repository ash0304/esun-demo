<template>
  <AppHeader v-if="showHeader()" />
  <main class="row col gx-0">
    <AppNavigation v-if="showMenu()" class="col-sm-2 side-adjust" />
    <router-view class="col-sm-10" />
    <!-- 全域錯誤訊息顯示彈窗 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <Modal
          v-if="globalModalVisible"
          :showCancelBtn="false"
          :showConfirmBtn="true"
          :isOnTop="true"
          @close="closeGlobalModal"
          @confirm="closeGlobalModal"
        >
          <template #header> 提示 </template>
          <template #body>
            <div class="modal-body-padding">
              {{ globalModalMessage }}
            </div>
          </template>
          <template #confirmBtn> 關閉 </template>
        </Modal>
      </transition>
    </Teleport>
    <!-- 全域loading -->
    <Teleport to="body">
      <Loading v-if="isLoadingVisible" />
    </Teleport>
  </main>
</template>

<style>
.side-adjust {
  height: 100vh;
}
</style>

<script>
import AppHeader from './components/AppHeader.vue';
import AppNavigation from './components/AppNavigation.vue';
import Modal from '@/components/Modal.vue';
import Loading from '@/components/Loading.vue';
import store from './utilities/store';
import { doAuthGet } from '@/utilities/api';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppNavigation,
    Modal,
    Loading,
  },
  setup() {
    const route = useRoute();
    const infoReady = ref(false);
    const currentRouteName = computed(() => route.name);
    const globalModalVisible = computed(() => store.getters.globalModalVisible);
    const globalModalMessage = computed(() => store.getters.globalModalMessage);
    const isLoadingVisible = computed(() => store.getters.isLoadingVisible);

    console.log('current env', process.env.VUE_APP_ENV);
    if (
      process.env.VUE_APP_ENV == 'prod' ||
      process.env.VUE_APP_ENV == 'uat' ||
      process.env.VUE_APP_ENV == 'sit1'
    ) {
      checkAuth();
    } else {
      infoReady.value = 'true';
    }
    // methods
    const checkAuth = () => {
      localStorage.setItem('infoReady', false);
      console.log('form app.vue');
      let tempAPIpath = '/CheckAuth';
      doAuthGet(tempAPIpath).then((response) => {
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
          localStorage.setItem('infoReady', true);
          infoReady.value = localStorage.getItem('infoReady');
        }
      });
    };
    const closeGlobalModal = () => {
      store.dispatch('toggleGlobalModal', false);
    };

    const showMenu = () => {
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

    return {
      route,
      infoReady,
      currentRouteName,
      globalModalVisible,
      globalModalMessage,
      isLoadingVisible,
      checkAuth,
      closeGlobalModal,
      showMenu,
      showHeader,
    };
  },
};
</script>
