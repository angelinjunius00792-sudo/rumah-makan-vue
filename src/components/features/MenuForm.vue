<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({ initial: Object, categories: Array })
const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  name: props.initial?.name ?? '',
  categoryId: props.initial?.categoryId ?? props.categories[0]?.id,
  price: props.initial?.price ?? '',
  available: props.initial?.available ?? true
})
const errors = reactive({ name: '', price: '' })

function submit() {
  errors.name = form.name.trim() ? '' : 'Nama menu wajib diisi'
  errors.price = Number(form.price) > 0 ? '' : 'Harga harus lebih dari 0'
  if (errors.name || errors.price) return
  emit('save', {
    name: form.name.trim(),
    categoryId: Number(form.categoryId),
    price: Number(form.price),
    available: form.available
  })
}
</script>
<template>
  <div>
    <BaseInput v-model="form.name" label="Nama Menu" :error="errors.name" />
    <label class="field">
      <span>Kategori</span>
      <select v-model="form.categoryId">
        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
    </label>
    <BaseInput v-model="form.price" label="Harga" type="number" :error="errors.price" />
    <label><input v-model="form.available" type="checkbox" /> Tersedia</label>
    <div class="row" style="margin-top: 12px">
      <BaseButton label="Simpan" @click="submit" />
      <BaseButton label="Batal" variant="secondary" @click="emit('cancel')" />
    </div>
  </div>
</template>