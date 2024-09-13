<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-8 rounded-sm shadow-lg max-w-lg w-full relative">
        <button
          @click="close"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 class="text-3xl font-bold mb-6 break-words">{{ localTodo.title || 'No Title' }}</h2>

        <div class="mb-8 space-y-6">
          <p class="text-gray-800 text-lg leading-relaxed pb-2 border-b-2 border-gray-300">
            {{ localTodo.description || 'No Description' }}
          </p>
          <div class="space-y-3">
            <p class="text-gray-700 text-sm flex items-center">
              <span class="font-semibold w-24">Completed:</span>
              <span
                :class="{
                  'text-green-500': localTodo.completed,
                  'text-red-500': !localTodo.completed
                }"
                class="ml-2"
              >
                {{ localTodo.completed ? 'Yes' : 'No' }}
              </span>
            </p>
            <p class="text-gray-700 text-sm flex items-center">
              <span class="font-semibold w-24">Created at:</span>
              <span class="ml-2">{{ formattedDate(localTodo.createdAt) || 'No Date' }}</span>
            </p>
            <p class="text-gray-700 text-sm flex items-center">
              <span class="font-semibold w-24">Updated at:</span>
              <span class="ml-2">{{ formattedDate(localTodo.updatedAt) || 'No Date' }}</span>
            </p>
            <p class="text-gray-700 text-sm flex items-center">
              <span class="font-semibold w-24">Username:</span>
              <span class="ml-2">{{ localTodo.username || 'No Username' }}</span>
            </p>
            <p class="text-gray-700 text-sm flex items-center">
              <span class="font-semibold w-24">Category:</span>
              <span class="ml-2">{{ localTodo.category || 'No Category' }}</span>
            </p>
          </div>
          <div class="flex justify-end mt-8">
            <button
              @click="toggleCompleted"
              class="px-6 py-2 bg-gray-700 text-white rounded-sm hover:bg-gray-800 transition duration-200"
            >
              Set as {{ localTodo.completed ? 'Not Done' : 'Done' }}
            </button>
          </div>
        </div>
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
    },
    toggleCompleted() {
      this.localTodo.completed = !this.localTodo.completed
      this.$emit('toggle-completed', this.localTodo)
    },
    openEdit() {
      this.$emit('edit', this.localTodo)
    }
  },
  watch: {
    todo: {
      handler(newVal) {
        this.localTodo = { ...newVal }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
