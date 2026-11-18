import { defineStore } from 'pinia'
import seed from '@/seed/orders.json'
import { loadOrSeed, save } from '@/utils/storage'

const KEY = 'rm_orders'

export const useOrderStore = defineStore('order', {
  state: () => ({ items: [] }),
  getters: {
    paid: (s) => s.items.filter((o) => o.status === 'dibayar'),
    revenue() {
      return this.paid.reduce((t, o) => t + o.total, 0)
    },
    topMenus() {
      const map = {}
      this.paid.forEach((o) =>
        o.items.forEach((i) => (map[i.name] = (map[i.name] || 0) + i.qty))
      )
      return Object.entries(map)
        .map(([name, qty]) => ({ name, qty }))
        .sort((a, b) => b.qty - a.qty)
        .slice(0, 5)
    }
  },
  actions: {
    init() {
      this.items = loadOrSeed(KEY, seed)
    },
    persist() {
      save(KEY, this.items)
    },
    add({ waiterId, tableNo, items }) {
      const order = {
        id: Math.max(0, ...this.items.map((o) => o.id)) + 1,
        waiterId,
        tableNo,
        status: 'belum_bayar',
        createdAt: new Date().toISOString(),
        total: items.reduce((t, i) => t + i.price * i.qty, 0),
        items: items.map((i) => ({ ...i }))
      }
      this.items.push(order)
      this.persist()
      return order
    },
    setStatus(id, status) {
      const o = this.items.find((x) => x.id === id)
      if (o) o.status = status
      this.persist()
    },
    getById(id) {
      return this.items.find((o) => o.id === id)
    }
  }
})