<script setup>
defineProps({ status: String })
const label = { dibayar: 'Dibayar', belum_bayar: 'Belum Bayar' }
</script>
<template>
  <span :class="['badge', status]">{{ label[status] ?? status }}</span>
</template>