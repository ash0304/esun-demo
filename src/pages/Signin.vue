<template>
  <div class="box container rounded shadow bg-white p-5 mt-5">
    <Form class="text-center" @submit="onSubmit" v-slot="{ errors }">
      <h3 class="fw-bold mb-4">玉山銀行DIMS文件影像管理系統</h3>
      <div class="row mb-3">
        <label for="account" class="col-form-label fs-5">使用者編號</label>
        <div>
          <Field
            name="account"
            type="text"
            class="form-control"
            v-model="account"
          />
          <span class="error-msg">{{ errors.account }}</span>
        </div>
      </div>
      <!-- <div class="row mb-5">
        <label for="password" class="col-form-label fs-5">密碼</label>
        <div>
          <Field
            name="password"
            type="password"
            class="form-control"
            v-model="password"
          />
          <span class="error-msg">{{ errors.password }}</span>
        </div>
      </div> -->
      <button type="submit" class="btn btn-primary btn-md w320">登入</button>
    </Form>
    <Teleport to="body">
      <Loading v-if="isLoadingVisible" />
    </Teleport>
    <Teleport to="body">
      <Modal v-if="showModal" @close="closeModal" @confirm="closeModal">
        <template #header>錯誤</template>
        <template #icon>
          <img
            src="@/assets/images/ic_red_x_circle.svg"
            title="玉山銀行E.SUN Bank"
            class="modal-icon"
          />
        </template>
        <template #body>
          {{ signinError }}
        </template>
        <template #cancelBtn>取消</template>
        <template #confirmBtn>確定</template>
      </Modal>
    </Teleport>
  </div>
</template>

<style scoped>
.box {
  border-top: 6px solid #45b29d;
}

.container {
  max-width: 650px !important;
  height: 360px;
}

.col-form-label {
  text-align: left;
}

.form-control {
  border: none;
  border-bottom: 1px solid #ced4da;
  border-radius: 0;
  padding-left: 3px;
}
</style>

<script>
import Loading from '@/components/Loading.vue';
import Modal from '@/components/Modal.vue';
import { Form, Field } from 'vee-validate';

import { doPost } from '@/utilities/api';
import store from '@/utilities/store';

export default {
  name: 'Signin',
  components: { Loading, Modal, Form, Field },
  data() {
    return {
      isLoadingVisible: false,
      account: '',
      password: '!qaz2wsx',
      showModal: false,
      signinError: '',
    };
  },
  created() {
    if (
      process.env.VUE_APP_ENV == 'prod' ||
      process.env.VUE_APP_ENV == 'uat' ||
      process.env.VUE_APP_ENV == 'sit1'
    ) {
      this.$router.push({ name: 'Error403' });
    }
  },
  methods: {
    onSubmit() {
      localStorage.setItem('infoReady', false);
      doPost('/Login/GetUserInfo', { Account: this.account }).then(
        (response) => {
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
            // 設定token
            localStorage.setItem('isLogin', true);
            localStorage.setItem('infoReady', true);
            this.$router.push({ name: 'Index' });
          }
        }
      );
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
