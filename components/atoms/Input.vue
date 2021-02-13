<template>
  <div class="flex-1 relative my-4 m-2 border-b-2 focus-within:border-black">
    <input
      :type="inputType"
      :id="inputId"
      placeholder
      :min="minNumber"
      :max="maxNumber"
      class="block w-full appearance-none focus:outline-none bg-transparent"
      v-on:input="updateValue($event.target.value)"
    />
    <label :for="inputId" class="absolute top-0 left-0 -z-1 duration-300 origin-0">{{ inputName }}</label>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    inputType: String,
    inputId: String,
    inputName: {
      type: String,
      // default: null,
    },
    value: {
      type: String,
      // default: null,
    },
    minNumber: {
      type: String,
    },
    maxNumber: {
      type: String,
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit("input", value);
    },
  },
};
</script>