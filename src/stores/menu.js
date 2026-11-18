import { defineStore } from 'pinia'
import seedMenus from '@/seed/menus.json'
import seedCategories from '@/seed/categories.json'
import { loadOrSeed, save } from '@/utils/storage'

const KEY = 'rm_menus'

export const useMenuStore = defineStore('menu', {
  state: () => ({ items: [], categories: [] }),
  getters: {
    withCategory: (s) =>
      s.items.map((m) => ({
        ...m,
        categoryName: s.categories.find((c) => c.id === m.categoryId)?.name ?? '-'
      })),
    availableItems: (s) => s.items.filter((m) => m.available)
  },
  actions: {
    init() {
      this.items = loadOrSeed(KEY, seedMenus)
      this.categories = loadOrSeed('rm_categories', seedCategories)
    },
    persist() {
      save(KEY, this.items)
    },
    add(menu) {
      const id = Math.max(0, ...this.items.map((m) => m.id)) + 1
      this.items.push({ ...menu, id })
      this.persist()
    },
    update(id, data) {
      const i = this.items.findIndex((m) => m.id === id)
      if (i !== -1) this.items[i] = { ...this.items[i], ...data }
      this.persist()
    },
    remove(id) {
      this.items = this.items.filter((m) => m.id !== id)
      this.persist()
    }
  }
})