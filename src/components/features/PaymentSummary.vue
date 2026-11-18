<script setup>
import { rupiah } from '@/utils/format'
import BaseButton from '@/components/common/BaseButton.vue'
defineProps({ total: Number })
defineEmits(['submit'])
</script>
<template>
  <div class="row" style="justify-content: space-between; margin-top: 12px">
    <h2>Total: {{ rupiah(total) }}</h2>
    <BaseButton label="Simpan Pesanan" @click="$emit('submit')" />
  </div>
</template>