<script setup>
import AppSidebar from './AppSidebar.vue'
import AppNavbar from './AppNavbar.vue'
</script>
<template>
  <div class="layout">
    <AppSidebar />
    <div class="content">
      <AppNavbar />
      <main><router-view /></main>
    </div>
  </div>
</template>