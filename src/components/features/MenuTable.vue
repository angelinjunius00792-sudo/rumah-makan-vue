<script setup>
import { rupiah } from '@/utils/format'
import BaseButton from '@/components/common/BaseButton.vue'
defineProps({ rows: Array, canEdit: Boolean })
defineEmits(['edit', 'remove', 'toggle'])
</script>
<template>
  <table>
    <thead>
      <tr><th>Nama</th><th>Kategori</th><th>Harga</th><th>Status</th><th v-if="canEdit">Aksi</th></tr>
    </thead>
    <tbody>
      <tr v-for="m in rows" :key="m.id">
        <td>{{ m.name }}</td>
        <td>{{ m.categoryName }}</td>
        <td>{{ rupiah(m.price) }}</td>
        <td>{{ m.available ? 'Tersedia' : 'Habis' }}</td>
        <td v-if="canEdit" class="row">
          <BaseButton label="Ubah" variant="secondary" @click="$emit('edit', m)" />
          <BaseButton :label="m.available ? 'Tandai Habis' : 'Tandai Ada'" variant="secondary" @click="$emit('toggle', m)" />
          <BaseButton label="Hapus" variant="danger" @click="$emit('remove', m)" />
        </td>
      </tr>
      <tr v-if="!rows.length"><td colspan="5" class="muted">Menu tidak ditemukan</td></tr>
    </tbody>
  </table>
</template>