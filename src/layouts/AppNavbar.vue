<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/common/BaseButton.vue'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
<template>
  <header class="navbar">
    <span>{{ auth.user.name }} ({{ auth.user.role }})</span>
    <BaseButton label="Keluar" variant="danger" @click="logout" />
  </header>
</template>