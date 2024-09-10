<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-center">Dashboard</h1>
    <p class="text-center text-gray-700 mb-6">Welcome to the admin dashboard.</p>

    <div class="mt-4">
      <h2 class="text-2xl font-semibold mb-4">Todo List</h2>

      <TodoForm @add="addTodo" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TodoCard
          v-for="item in paginatedTodos"
          :key="item.id"
          :todo="item"
          @click="showModal(item)"
        />
      </div>

      <!-- Pagination Controls -->
      <div class="flex flex-wrap justify-center mt-4">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-800 text-white rounded-lg mr-2"
        >
          Previous
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="{ 'bg-gray-800': currentPage === page, 'bg-gray-300': currentPage !== page }"
          class="px-4 py-2 mx-1 rounded-lg text-white"
        >
          {{ page }}
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          class="px-4 py-2 bg-gray-800 text-white rounded-lg ml-2"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal Detail -->
    <ModalDetail :todo="selectedTodo" :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<script>
import TodoForm from '../components/TodoForm.vue'
import TodoCard from '../components/TodoCard.vue'
import ModalDetail from '../components/ModalDetail.vue'

export default {
  components: {
    TodoCard,
    TodoForm,
    ModalDetail
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: 'Sample Todo 1',
          detail: 'Detail of Todo 1',
          createdAt: new Date().toLocaleDateString()
        },
        {
          id: 2,
          title: 'Sample Todo 2',
          detail: 'Detail of Todo 2',
          createdAt: new Date().toLocaleDateString()
        }
        // Tambahkan lebih banyak data untuk pengujian pagination
      ],
      nextId: 3,
      selectedTodo: null,
      isModalOpen: false,
      currentPage: 1,
      todosPerPage: 6
    }
  },
  computed: {
    paginatedTodos() {
      const start = (this.currentPage - 1) * this.todosPerPage
      const end = start + this.todosPerPage
      return this.todos.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.todos.length / this.todosPerPage)
    }
  },
  methods: {
    logout() {

    },
    addTodo(todo) {
      this.todos.push({
        id: this.nextId++,
        title: todo.title,
        detail: todo.detail,
        createdAt: new Date().toLocaleDateString()
      })
    },
    showModal(todo) {
      this.selectedTodo = todo
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
      this.selectedTodo = null
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
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
