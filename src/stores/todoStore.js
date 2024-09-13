import { defineStore } from 'pinia'
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
    isDetailModalOpen: false, // Status untuk modal detail
    isEditModalOpen: false, // Status untuk modal edit
    currentPage: 1,
    todosPerPage: 6
  }),
  getters: {
    paginatedTodos(state) {
      if (!Array.isArray(state.todos)) {
        console.error('Todos is not an array')
        return []
      }
      const start = (state.currentPage - 1) * state.todosPerPage
      const end = start + state.todosPerPage
      return state.todos.slice(start, end)
    },
    totalPages(state) {
      if (!Array.isArray(state.todos)) {
        console.error('Todos is not an array')
        return 1
      }
      return Math.ceil(state.todos.length / state.todosPerPage)
    }
  },
  actions: {
    async loadTodos() {
      try {
        const response = await fetchTodos()
        if (response.status) {
          this.todos = response.data
          console.log('Todos loaded:', this.todos) // Debugging log
        } else {
          console.error('Error loading todos:', response)
          this.todos = []
        }
      } catch (error) {
        console.error('Error loading todos:', error)
        this.todos = []
      }
    },
    async loadTodoDetail(id) {
      try {
        const response = await fetchTodoDetail(id)
        this.selectedTodo = response.data
      } catch (error) {
        console.error('Error loading todo detail:', error)
      }
    },
    async createTodo(newTodo) {
      try {
        const response = await addTodo(newTodo)
        this.todos.push(response.data)
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },
    async updateTodo(id, updatedTodo) {
      try {
        const response = await editTodo(id, updatedTodo)
        const index = this.todos.findIndex((todo) => todo.id === id)
        if (index !== -1) {
          this.todos[index] = response.data
        }
      } catch (error) {
        console.error('Error updating todo:', error)
      }
    },
    async removeTodo(id) {
      try {
        await deleteTodo(id)
        this.todos = this.todos.filter((todo) => todo.id !== id)
      } catch (error) {
        console.error('Error deleting todo:', error)
      }
    },
    showDetailModal(todo) {
      console.log('Opening detail modal for:', todo) // Debugging log
      this.selectedTodo = todo
      this.isDetailModalOpen = true
      this.isEditModalOpen = false // Ensure edit modal is closed
    },
    showEditModal(todo) {
      console.log('Opening edit modal for:', todo) // Debugging log
      this.selectedTodo = todo
      this.isEditModalOpen = true
      this.isDetailModalOpen = false // Ensure detail modal is closed
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
