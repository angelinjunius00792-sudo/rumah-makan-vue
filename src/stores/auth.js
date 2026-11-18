import { defineStore } from 'pinia'
import seed from '@/seed/users.json'
import { loadOrSeed } from '@/utils/storage'

export const useAuthStore = defineStore('auth', {
  state: () => ({ users: [], user: null }),
  actions: {
    init() {
      this.users = loadOrSeed('rm_users', seed)
      try {
        const s = localStorage.getItem('rm_session')
        if (s) this.user = JSON.parse(s)
      } catch (e) {
        this.user = null
      }
    },
    login(username, password) {
      const u = this.users.find((x) => x.username === username && x.password === password)
      if (!u) return false
      const { password: _pw, ...safe } = u
      this.user = safe
      localStorage.setItem('rm_session', JSON.stringify(safe))
      return true
    },
    logout() {
      this.user = null
      localStorage.removeItem('rm_session')
    }
  }
})