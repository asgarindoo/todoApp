<template>
  <div class="card">
    <div class="actions">
      <button @click="editTodo" class="btn btn-edit">
        <i class="fas fa-edit"></i>
      </button>
      <button @click="deleteTodo" class="btn btn-delete">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <div class="content-card">
      <h3 class="text-xl font-semibold mb-2">{{ todo.title }}</h3>
      <p class="text-gray-600 mb-2">{{ todo.detail }}</p>
      <p class="text-gray-500 text-sm mb-4">Created on: {{ todo.createdAt }}</p>
    </div>
    <div>
      <input type="checkbox" class="form-checkbox h-4 w-4 mt-3 rounded" />
      <label for="completed" class="ml-2 mt-4 text-gray-700">Completed</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object
  },
  methods: {
    editTodo() {
      const title = prompt('Enter new title', this.todo.title)
      if (title) {
        this.$emit('edit', { id: this.todo.id, title })
      }
    },
    deleteTodo() {
      this.$emit('delete', this.todo.id)
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.content-card {
  padding-right: 40px; /* Adjust this padding to fit your button size */
}

.actions {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-edit {
  color: #353535;
}

.btn-delete {
  color: #353535;
}
</style>
