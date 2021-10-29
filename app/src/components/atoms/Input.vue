<template>
  <div class="flex-1 relative my-6 m-2 border-b-2 focus-within:border-black">
    <input
      :type="inputType"
      :id="inputId"
      :min="minNumber"
      :max="maxNumber"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="block w-full appearance-none focus:outline-none bg-transparent"
    />
    <label :for="inputId" class="absolute top-0 left-0 -z-1 duration-300 origin-0">{{ inputName }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    inputType: String,
    inputId: String,
    inputName: {
      type: String,
    },
    modelValue: {
      type: String,
    },
    minNumber: {
      type: String,
    },
    maxNumber: {
      type: String,
    }
  },
});
</script>