import { defineStore } from 'pinia'
import seed from '@/seed/purchases.json'
import { loadOrSeed, save } from '@/utils/storage'

const KEY = 'rm_purchases'

export const usePurchaseStore = defineStore('purchase', {
  state: () => ({ items: [] }),
  getters: {
    totalExpense: (s) => s.items.reduce((t, p) => t + p.totalPrice, 0)
  },
  actions: {
    init() {
      this.items = loadOrSeed(KEY, seed)
    },
    persist() {
      save(KEY, this.items)
    },
    add(data) {
      const id = Math.max(0, ...this.items.map((p) => p.id)) + 1
      this.items.push({ ...data, id })
      this.persist()
    }
  }
})