<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { homeByRole } from '@/utils/role'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const auth = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

function submit() {
  if (!username.value.trim() || !password.value) {
    error.value = 'Username dan password wajib diisi'
    return
  }
  if (!auth.login(username.value.trim(), password.value)) {
    error.value = 'Username atau password salah'
    return
  }
  router.push(homeByRole(auth.user.role))
}
</script>
<template>
  <div class="card">
    <h1>Masuk</h1>
    <BaseInput v-model="username" label="Username" />
    <BaseInput v-model="password" label="Password" type="password" />
    <p v-if="error" class="error">{{ error }}</p>
    <BaseButton label="Masuk" @click="submit" />
  </div>
</template>