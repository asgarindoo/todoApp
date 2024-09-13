<template>
  <div class="flex flex-row items-center justify-end max-w-full p-4 space-x-4">
    <input
      v-model="title"
      placeholder="Add new todo title"
      class="border border-gray-300 p-3 rounded-md shadow-sm w-64"
      maxlength="50"
    />
    <input
      v-model="description"
      placeholder="Add new todo description"
      class="border border-gray-300 p-3 rounded-md shadow-sm w-64"
      maxlength="200"
    />
    <input
      v-model="category"
      placeholder="Add new todo category"
      class="border border-gray-300 p-3 rounded-md shadow-sm w-64"
      maxlength="10"
    />
    <button
      @click="handleAddTodo"
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
      description: '',
      category: ''
    }
  },
  methods: {
    handleAddTodo() {
      // Emit event with the new todo data
      this.$emit('add', {
        title: this.title,
        createdAt: new Date().toISOString(),
        completed: false,
        description: this.description,
        category: this.category
      })

      // Clear input fields
      this.title = ''
      this.description = ''
      this.category = ''
    }
  }
}
</script>

<style scoped>
/* Custom styles for the form */
input {
  width: 250px; /* Adjust input width if necessary */
}

button {
  white-space: nowrap; /* Prevent button text from wrapping */
}
</style>
