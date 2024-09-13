<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-center">Dashboard</h1>
    <p class="text-center text-gray-700 mb-6">Welcome to the admin dashboard.</p>

    <div class="mt-4">
      <h2 class="text-2xl font-semibold mb-4">Todo List</h2>

      <!-- Form untuk menambahkan Todo -->
      <TodoForm @add="addTodo" />

      <!-- Daftar Todo dalam bentuk grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TodoCard
          v-for="item in todoStore.paginatedTodos"
          :key="item.id"
          :todo="item"
          @show-modal="showDetailModal"
          @edit-modal="showEditModal"
          @delete="deleteTodo"
        />
      </div>

      <!-- Kontrol Pagination -->
      <div class="flex flex-wrap justify-center mt-4">
        <button
          @click="todoStore.previousPage"
          :disabled="todoStore.currentPage === 1"
          class="px-4 py-2 bg-gray-800 text-white rounded-lg mr-2"
        >
          Previous
        </button>

        <button
          v-for="page in todoStore.totalPages"
          :key="page"
          @click="todoStore.currentPage = page"
          :class="{
            'bg-gray-800': todoStore.currentPage === page,
            'bg-gray-500': todoStore.currentPage !== page
          }"
          class="px-4 py-2 mx-1 rounded-lg text-white"
        >
          {{ page }}
        </button>

        <button
          @click="todoStore.nextPage"
          :disabled="todoStore.currentPage >= todoStore.totalPages"
          class="px-4 py-2 bg-gray-800 text-white rounded-lg ml-2"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal Detail untuk menampilkan Todo -->
    <ModalDetail
      :todo="todoStore.selectedTodo"
      :isOpen="todoStore.isDetailModalOpen"
      @close="closeDetailModal"
      @toggle-completed="toggleCompleted"
    />

    <!-- Edit Modal -->
    <EditModal
      :todo="todoStore.selectedTodo"
      :isOpen="todoStore.isEditModalOpen"
      @close="closeEditModal"
      @update="updateTodo"
    />
  </div>
</template>

<script>
import { useTodoStore } from '../stores/todoStore'
import TodoForm from '../components/TodoForm.vue'
import TodoCard from '../components/TodoCard.vue'
import ModalDetail from '../components/ModalDetail.vue'
import EditModal from '../components/EditModal.vue'

export default {
  components: {
    TodoCard,
    TodoForm,
    ModalDetail,
    EditModal
  },
  setup() {
    const todoStore = useTodoStore()

    todoStore.loadTodos()

    // Menampilkan modal dengan detail todo
    function showDetailModal(todo) {
      todoStore.showDetailModal(todo)
    }

    // Menampilkan modal edit todo
    function showEditModal(todo) {
      todoStore.showEditModal(todo)
    }

    // Menutup modal detail
    function closeDetailModal() {
      todoStore.closeDetailModal()
    }

    // Menutup modal edit
    function closeEditModal() {
      todoStore.closeEditModal()
    }

    // Menambahkan todo baru
    function addTodo(newTodo) {
      todoStore.createTodo(newTodo)
    }

    // Mengedit todo yang dipilih
    function updateTodo(updatedTodo) {
      if (todoStore.selectedTodo) {
        todoStore.updateTodo(todoStore.selectedTodo.id, updatedTodo)
      }
    }

    // Menghapus todo berdasarkan ID
    function deleteTodo(id) {
      todoStore.removeTodo(id)
    }

    // Mengubah status completed dari todo
    function toggleCompleted(todo) {
      todoStore.toggleCompleted(todo)
    }

    return {
      todoStore,
      showDetailModal,
      showEditModal,
      closeEditModal,
      closeDetailModal,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleCompleted
    }
  }
}
</script>

<style scoped>
/* Custom styling for dashboard */
input {
  width: 300px;
}
</style>
