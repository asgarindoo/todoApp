<template>
  <div class="flex">
    <AppSidebar />
    <div class="flex-1 p-6">
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

<style scoped></style>
