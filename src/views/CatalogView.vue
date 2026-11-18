<script setup>
import { ref, computed } from 'vue'
import { useMenuStore } from '@/stores/menu'
import SearchBar from '@/components/common/SearchBar.vue'
import MenuCard from '@/components/features/MenuCard.vue'

const menus = useMenuStore()
const query = ref('')
const rows = computed(() =>
  menus.withCategory.filter(
    (m) => m.available && m.name.toLowerCase().includes(query.value.toLowerCase())
  )
)
</script>
<template>
  <h1>Katalog Menu</h1>
  <SearchBar v-model="query" placeholder="Cari menu..." />
  <div class="grid">
    <MenuCard v-for="m in rows" :key="m.id" :menu="m" />
  </div>
  <p v-if="!rows.length" class="muted">Menu tidak ditemukan</p>
</template>