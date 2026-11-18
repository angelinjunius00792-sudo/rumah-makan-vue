<script setup>
import { reactive } from 'vue'
import { rupiah } from '@/utils/format'
import BaseButton from '@/components/common/BaseButton.vue'

defineProps({ menus: Array })
const emit = defineEmits(['add'])
const qty = reactive({})
</script>
<template>
  <table>
    <tbody>
      <tr v-for="m in menus" :key="m.id">
        <td>{{ m.name }}</td>
        <td>{{ rupiah(m.price) }}</td>
        <td><input v-model="qty[m.id]" type="number" placeholder="1" style="width: 70px" /></td>
        <td><BaseButton label="Tambah" @click="emit('add', m, qty[m.id] ?? 1)" /></td>
      </tr>
    </tbody>
  </table>
</template>