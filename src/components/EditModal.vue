<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-sm shadow-2xl max-w-xl w-full relative">
        <button
          @click="close"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Edit Todo</h2>
        <form @submit.prevent="updateTodo">
          <div class="mb-4">
            <label class="block text-gray-700 font-medium">Title</label>
            <input
              v-model="localTodo.title"
              type="text"
              placeholder="Enter todo title"
              class="mt-2 w-full border border-gray-300 rounded-sm shadow-sm p-2 text-sm"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-medium">Description</label>
            <textarea
              v-model="localTodo.description"
              placeholder="Enter description"
              class="mt-2 w-full border border-gray-300 rounded-sm shadow-sm p-2 text-sm resize-none"
              rows="4"
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-medium">Category</label>
            <input
              v-model="localTodo.category"
              type="text"
              placeholder="Enter category"
              class="mt-2 w-full border border-gray-300 rounded-sm shadow-sm p-2 text-sm"
            />
          </div>
          <div class="flex justify-end mt-6">
            <button
              type="submit"
              class="px-5 py-2 bg-slate-700 text-white rounded-sm shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 transition ease-in-out duration-150"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => ({})
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localTodo: { ...this.todo }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    updateTodo() {
      this.$emit('update', this.localTodo)
    }
  },
  watch: {
    isOpen(newVal) {
      console.log('EditModal: isOpen changed to', newVal)
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
