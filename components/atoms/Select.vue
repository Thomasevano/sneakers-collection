<template>
  <div class="flex-1 relative my-6 m-2">
    <div class="relative">
      <select
        class="block w-full appearance-none bg-transparent border-b-2 focus:outline-none focus-within:border-black"
        :id="selectId"
        v-on:input="updateValue($event.target.value)"
      >
        <option value>{{ selectName }}</option>
        <option v-for="item in items.results" :key="item.id" :value="item">{{ item }}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    items: {
      type: Object,
    },
    selectName: {
      type: String,
    },
    selectId: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  methods: {
    updateValue: function (value) {
      this.$emit("input", value);
    },
  },
};
</script>