import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import {
  fetchTodos,
  fetchTodoDetail,
  addTodo,
  editTodo,
  deleteTodo
} from '../services/todo.service'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    selectedTodo: null,
    isDetailModalOpen: false,
    isEditModalOpen: false,
    currentPage: 1,
    todosPerPage: 6
  }),
  getters: {
    paginatedTodos(state) {
      if (!Array.isArray(state.todos)) {
        // console.error('Todos is not an array')
        return []
      }
      const start = (state.currentPage - 1) * state.todosPerPage
      const end = start + state.todosPerPage
      return state.todos.slice(start, end)
    },
    totalPages(state) {
      if (!Array.isArray(state.todos)) {
        // console.error('Todos is not an array')
        return 1
      }
      return Math.ceil(state.todos.length / state.todosPerPage)
    }
  },
  actions: {
    async loadTodos() {
      try {
        const todos = await fetchTodos()

        // Memastikan response berbentuk array
        if (Array.isArray(todos)) {
          if (todos.length > 0) {
            // Data tersedia
            this.todos = todos
          } else {
            // Data kosong tapi format response benar
            Swal.fire({
              icon: 'info',
              title: 'No Todos Found',
              text: 'No todos are available at the moment.'
            })
            this.todos = []
          }
        } else {
          // Format response tidak sesuai harapan
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load todos. Please try again later.'
          })
          this.todos = []
        }
      } catch (error) {
        // Tangani kesalahan fetch
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to load todos. Please try again later.'
        })
        this.todos = []
      }
    },

    async loadTodoDetail(id) {
      try {
        const response = await fetchTodoDetail(id)
        this.selectedTodo = response.data
      } catch (error) {
        console.error('Error loading todo detail:', error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to load todo details!'
        })
      }
    },

    async createTodo(newTodo) {
      try {
        await addTodo(newTodo) // Tambahkan todo baru
        await this.loadTodos() // Muat ulang todos setelah menambahkan
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Todo added successfully!'
        })
      } catch (error) {
        console.error('Error adding todo:', error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add todo. Please try again.'
        })
      }
    },

    async updateTodo(id, updatedTodo) {
      try {
        if (!updatedTodo.title) {
          Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Title is required.'
          })
          return
        }

        const response = await editTodo(id, updatedTodo)

        const index = this.todos.findIndex((todo) => todo.id === id)
        if (index !== -1) {
          this.todos[index] = response
          await this.loadTodos()
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Todo updated successfully!'
          })
        } else {
          console.error('Todo item not found for update:', id)
        }
      } catch (error) {
        console.error('Error updating todo:', error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update todo. Please try again.'
        })
      }
    },

    async removeTodo(id) {
      try {
        await deleteTodo(id)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Todo deleted successfully!'
        })
        this.todos = this.todos.filter((todo) => todo.id !== id)
      } catch (error) {
        console.error('Error deleting todo:', error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete todo. Please try again.'
        })
      }
    },

    showDetailModal(todo) {
      console.log('Opening detail modal for:', todo)
      this.selectedTodo = todo
      this.isDetailModalOpen = true
      this.isEditModalOpen = false
    },

    showEditModal(todo) {
      console.log('Opening edit modal for:', todo)
      this.selectedTodo = todo
      this.isEditModalOpen = true
      this.isDetailModalOpen = false
    },

    closeDetailModal() {
      this.selectedTodo = null
      this.isDetailModalOpen = false
    },

    closeEditModal() {
      this.selectedTodo = null
      this.isEditModalOpen = false
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    }
  }
})
