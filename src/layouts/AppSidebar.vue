<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const links = [
  { to: '/dashboard', label: 'Dashboard', roles: ['pemilik'] },
  { to: '/menu', label: 'Data Menu', roles: ['pemilik', 'pelayan'] },
  { to: '/order', label: 'Pesanan', roles: ['pelayan'] },
  { to: '/purchase', label: 'Belanja Bahan', roles: ['pemilik'] },
  { to: '/report', label: 'Laporan', roles: ['pemilik'] },
  { to: '/catalog', label: 'Katalog Menu', roles: ['pelanggan'] },
  { to: '/check-order', label: 'Cek Pesanan', roles: ['pelanggan'] }
]
const visible = computed(() => links.filter((l) => l.roles.includes(auth.user.role)))
</script>
<template>
  <aside class="sidebar">
    <h2>Rumah Makan</h2>
    <router-link v-for="l in visible" :key="l.to" :to="l.to">{{ l.label }}</router-link>
  </aside>
</template>