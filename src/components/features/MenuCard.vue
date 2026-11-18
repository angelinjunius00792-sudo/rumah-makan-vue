<script setup>
import { rupiah } from '@/utils/format'
defineProps({ menu: Object })
defineEmits(['select'])
</script>
<template>
  <div class="card" @click="$emit('select', menu)">
    <strong>{{ menu.name }}</strong>
    <div class="muted">{{ menu.categoryName }}</div>
    <div>{{ rupiah(menu.price) }}</div>
  </div>
</template>