<template>
  <div class="flex flex-row items-center justify-end max-w-full p-4 space-x-4">
    <input
      v-model="title"
      placeholder="Add new todo title"
      class="border border-gray-300 p-3 rounded-md shadow-sm w-64"
    />
    <input
      v-model="detail"
      placeholder="Add new todo detail"
      class="border border-gray-300 p-3 rounded-md shadow-sm w-64"
    />
    <button
      @click="addTodo"
      class="bg-gray-700 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-800 transition-colors"
    >
      Add
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      detail: ''
    }
  },
  methods: {
    addTodo() {
      if (this.title.trim() && this.detail.trim()) {
        this.$emit('add', { title: this.title, detail: this.detail })
        this.title = ''
        this.detail = ''
      }
    }
  }
}
</script>
