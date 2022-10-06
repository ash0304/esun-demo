<template>
  <div ref="colorPickerTemplate" class="input-group">
    <span class="input-group-text">
      <span
        class="color-picker-current"
        :style="'background-color: ' + colorValue"
        @click="showPicker()"
      ></span>
      <Chrome v-model="inputValue" v-if="displayPicker" />
    </span>
    <input
      :name="name"
      :placeholder="placeholder"
      type="text"
      class="form-control"
      v-model="colorValue"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { Chrome } from "@ckpack/vue-color";
import { useField } from "vee-validate";
import { onMounted, onUnmounted, watch } from "@vue/runtime-core";
export default {
  components: {
    Chrome,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "請選擇",
    },
    value: {
      type: String,
      default: "#000000",
    },
  },
  setup(props, ctx) {
    // vee-validate 綁定
    const { value: colorValue, handleChange } = useField(
      props.name,
      undefined,
      {
        initialValue: props.value,
      }
    );

    const onChange = (value) => {
      handleChange(value);
      ctx.emit("update:modelValue", value);
    };

    // 顏色選擇設定
    const inputValue = ref(props.value);

    watch(
      inputValue,
      (nV) => {
        if (nV && nV != props.value) {
          const value = nV.hex;
          colorValue.value = value;
          onChange(value);
        }
      },
      {
        immediate: true,
      }
    );

    // 設定是否顯示開關
    const displayPicker = ref(false);

    function showPicker() {
      displayPicker.value = true;
    }
    function hidePicker() {
      displayPicker.value = false;
    }

    const colorPickerTemplate = ref(null);

    let callback = (e) => {
      var el = colorPickerTemplate.value,
        target = e.target;
      if (el !== target && !el.contains(target)) {
        hidePicker();
      }
    };
    onMounted(() => {
      document.body.addEventListener("click", callback);
    });

    onUnmounted(() => {
      document.body.removeEventListener("click", callback);
    });

    return {
      colorPickerTemplate,
      inputValue,
      colorValue,
      displayPicker,
      showPicker,
      hidePicker,
    };
  },
};
</script>

<style scoped>
.input-group {
    border: 0px;
}
</style>
