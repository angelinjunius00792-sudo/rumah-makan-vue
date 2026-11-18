<script setup>
defineProps({ items: Array })
</script>
<template>
  <ol>
    <li v-for="m in items" :key="m.name">{{ m.name }}: {{ m.qty }} porsi</li>
    <li v-if="!items.length" class="muted">Belum ada data penjualan</li>
  </ol>
</template>