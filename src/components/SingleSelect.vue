<template>
  <Select2
    class="single"
    :name="name"
    v-model="inputValue"
    :placeholder="placeholder"
    :options="options"
    @update:modelValue="onChange($event)"
    :settings="{ settingOption: value, minimumResultsForSearch: -1 }"
  />
</template>

<script>
import Select2 from "vue3-select2-component";
import { useField } from "vee-validate";

export default {
  name: "SingleSelect",
  components: { Select2 },
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
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  data(props) {
    const { value: inputValue } = useField(
      props.name,
      undefined,
      {
        initialValue: props.value,
      }
    );

    return {
      inputValue,
    };
  },
  methods: {
    onChange(value){
      this.$emit("update:modelValue", value);
    }
  },
};
</script>