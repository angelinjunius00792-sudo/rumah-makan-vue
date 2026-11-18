<script setup>
defineProps({ title: String, value: [String, Number] })
</script>
<template>
  <div class="card">
    <div class="muted">{{ title }}</div>
    <h2>{{ value }}</h2>
  </div>
</template>