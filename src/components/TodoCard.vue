<template>
  <div class="relative border border-gray-300 rounded-lg p-4 bg-white shadow-sm overflow-hidden">
    <div class="flex ml-[77%] mb-2 space-x-2">
      <button @click="editModal" class="ml-4 text-gray-700 hover:text-gray-800">
        <i class="fas fa-edit"></i>
      </button>
      <button @click="deleteTodo" class="text-gray-700 hover:text-gray-800">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button @click="showModal(todo)" class="text-gray-700 hover:text-gray-800">
        <i class="fas fa-info-circle"></i>
      </button>
    </div>
    <div class="pr-10">
      <!-- Sesuaikan padding untuk menghindari overlap dengan tombol -->
      <h3 class="text-xl font-semibold mb-2">{{ todo.title }}</h3>
      <p class="text-gray-600 mb-2 line-clamp-3">{{ todo.description }}</p>
      <p class="text-gray-500 text-sm mb-4">{{ formattedDate(todo.createdAt) }}</p>
      <div class="mt-2">
        <p class="inline-block bg-gray-100 text-gray-700 rounded px-2 py-1 text-xs">
          {{ todo.category || 'No Category' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object
  },
  methods: {
    editModal() {
      this.$emit('edit-modal', this.todo)
    },
    deleteTodo() {
      this.$emit('delete', this.todo.id)
    },
    showModal(todo) {
      this.$emit('show-modal', todo)
    },
    formattedDate(dateString) {
      if (!dateString) return 'No Date'
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  }
}
</script>
