<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 class="text-xl font-bold mb-4">{{ todo.title }}</h2>
        <p>{{ todo.detail }}</p>
        <p class="text-gray-500 mt-2">Created at: {{ todo.createdAt }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    todo: Object,
    isOpen: Boolean
  },
  methods: {
    close() {
      this.$emit('close')
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
