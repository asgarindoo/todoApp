<template>
  <div class="flex">
    <div class="fixed left-0 top-0 bottom-0 w-64">
      <AppSidebar />
    </div>
    <div class="flex-1 ml-64 p-6">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue'
export default {
  components: { AppSidebar },
  name: 'DefaultLayout'
}
</script>

<style scoped>
.ml-64 {
  margin-left: 16rem; /* Sesuaikan dengan lebar sidebar-mu */
}
</style>
