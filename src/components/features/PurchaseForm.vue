<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const emit = defineEmits(['save'])
const blank = () => ({ date: new Date().toISOString().slice(0, 10), itemName: '', qty: '', unit: 'kg', totalPrice: '' })
const form = reactive(blank())
const errors = reactive({ itemName: '', qty: '', totalPrice: '', date: '' })

function submit() {
  errors.date = form.date ? '' : 'Tanggal wajib diisi'
  errors.itemName = form.itemName.trim() ? '' : 'Nama bahan wajib diisi'
  errors.qty = Number(form.qty) > 0 ? '' : 'Jumlah harus lebih dari 0'
  errors.totalPrice = Number(form.totalPrice) > 0 ? '' : 'Harga harus lebih dari 0'
  if (Object.values(errors).some(Boolean)) return
  emit('save', {
    date: form.date,
    itemName: form.itemName.trim(),
    qty: Number(form.qty),
    unit: form.unit,
    totalPrice: Number(form.totalPrice)
  })
  Object.assign(form, blank())
}
</script>
<template>
  <div class="row">
    <BaseInput v-model="form.date" label="Tanggal" type="date" :error="errors.date" />
    <BaseInput v-model="form.itemName" label="Nama Bahan" :error="errors.itemName" />
    <BaseInput v-model="form.qty" label="Jumlah" type="number" :error="errors.qty" />
    <BaseInput v-model="form.unit" label="Satuan" />
    <BaseInput v-model="form.totalPrice" label="Total Harga" type="number" :error="errors.totalPrice" />
    <BaseButton label="Simpan" @click="submit" />
  </div>
</template>