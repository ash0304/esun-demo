<template>
  <div class="mx-auto">
    <div class="box bg-white">
      <div class="d-flex align-items-center mb-3">
        <img
          class="img-alert me-5"
          src="@/assets/images/ic_big_red_alert.svg"
        />
        <div class="fs-4">
          <p class="mb-2">很抱歉，您要找的頁面不存在，</p>
          <p>請重新確認網址是否為正確路徑後再重試，謝謝。</p>
        </div>
      </div>
      <a
        type="button"
        class="btn btn-primary btn-md w320 mx-auto d-block"
        href="#"
        @click="redirectRoute"
        >回系統首頁</a
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/component/errorPage";
</style>

<script>
  export default {
    name: 'Error404',
    methods: {
      redirectRoute() {
        this.$router.push({ path: '/' });
      },
    },
  };
  </script>
