<template>
  <div class="modal-backdrop baseZindex" :class="{ 'is-on-top': isOnTop }">
    <div
      class="modal-dialog modal-dialog-centered"
      :class="{ 'modal-lg': !extraLargeSize, 'modal-xl': extraLargeSize }"
    >
      <div class="modal-content">
        <header class="modal-header">
          <slot class="modal-title" name="header"> </slot>
          <button type="button" class="btn modal-btn-close" @click="close" />
        </header>

        <section v-if="type == 'form'" class="modal-form">
          <slot name="form"> </slot>
        </section>

        <section v-if="type == 'basic'" class="modal-body">
          <div>
            <slot name="icon"> </slot>
          </div>
          <div class="w-100">
            <slot name="body"> </slot>
          </div>
        </section>

        <footer v-if="type == 'basic'" class="modal-footer">
          <div>
            <slot name="footer"></slot>
          </div>
          <button
            v-if="showCancelBtn"
            type="button"
            class="btn btn-md btn-secondary me-3 w220"
            @click="close"
          >
            <slot name="cancelBtn"> </slot>
          </button>
          <button
            v-if="showConfirmBtn"
            type="button"
            class="btn btn-md btn-primary w220"
            @click="confirm"
          >
            <slot name="confirmBtn"> </slot>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>
<style>
.baseZindex {
  z-index: 1000 !important;
}
.is-on-top {
  z-index: 9999 !important;
}
</style>

<script>
export default {
  name: 'Modal',
  props: {
    extraLargeSize: {
      default: false,
      type: Boolean,
    },
    isOnTop: {
      default: false,
      type: Boolean,
    },
    showCancelBtn: {
      default: true,
      type: Boolean,
    },
    showConfirmBtn: {
      default: true,
      type: Boolean,
    },
    type: {
      default: 'basic',
      type: String,
    },
  },
  emits: ['close', 'confirm'],
  methods: {
    close() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
    },
  },
};
</script>
