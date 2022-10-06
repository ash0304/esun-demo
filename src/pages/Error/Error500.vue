<template>
  <div class="mx-auto">
    <div class="box bg-white">
      <div class="d-flex align-items-center mb-3">
        <img
          class="img-alert me-5"
          src="@/assets/images/ic_big_red_alert.svg"
        />
        <p class="fs-4">系統發生錯誤，請重新再試，謝謝。</p>
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
// import { useRoute } from "vue-router";

export default {
  name: "RoleEdit",
  methods: {
    redirectRoute() {
      this.$router.push({ path: '/' });
    },
  },
}
</script>