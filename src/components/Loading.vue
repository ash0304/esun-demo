<template>
  <transition name="modal-fade">
    <div class="loading-backdrop">
      <div
        class="position-absolute top-50 start-50 translate-middle text-center"
      >
        <div class="loading-content">
          <Lottie :animationData="settingJson" />
        </div>
        <span class="loading-text">Loading...</span>
      </div>
    </div>
  </transition>
</template>

<script>
import Lottie from "vue3-lottie";
import settingJson from "@/assets/data/esun_loading.json";

export default {
  components: {
    Lottie,
  },
  data() {
    return {
      settingJson,
    };
  },
};
</script>