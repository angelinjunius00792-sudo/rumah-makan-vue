<script setup>
import { rupiah } from '@/utils/format'
import BaseButton from '@/components/common/BaseButton.vue'
defineProps({ items: Array })
defineEmits(['remove'])
</script>
<template>
  <table>
    <thead><tr><th>Menu</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead>
    <tbody>
      <tr v-for="i in items" :key="i.menuId">
        <td>{{ i.name }}</td>
        <td>{{ i.qty }}</td>
        <td>{{ rupiah(i.price * i.qty) }}</td>
        <td><BaseButton label="Hapus" variant="danger" @click="$emit('remove', i.menuId)" /></td>
      </tr>
      <tr v-if="!items.length"><td colspan="4" class="muted">Keranjang kosong</td></tr>
    </tbody>
  </table>
</template>