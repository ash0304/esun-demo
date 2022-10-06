<template>
  <div class="mx-auto">
    <div class="box bg-white">
      <div class="d-flex align-items-center mb-3">
        <img
          class="img-alert me-5"
          src="@/assets/images/ic_big_red_alert.svg"
        />
        <div class="fs-4">
          <p class="mb-2">很抱歉，您沒有權限進入此頁面。</p>
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
@import '@/assets/scss/component/errorPage';
</style>

<script>
export default {
  name: 'Error403',
  methods: {
    redirectRoute() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
