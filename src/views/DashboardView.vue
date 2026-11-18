<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import { usePurchaseStore } from '@/stores/purchase'
import { rupiah } from '@/utils/format'
import StatCard from '@/components/common/StatCard.vue'
import TopMenuList from '@/components/features/TopMenuList.vue'

const orders = useOrderStore()
const purchases = usePurchaseStore()
const profit = computed(() => orders.revenue - purchases.totalExpense)
</script>
<template>
  <h1>Dashboard</h1>
  <div class="grid">
    <StatCard title="Pendapatan" :value="rupiah(orders.revenue)" />
    <StatCard title="Pengeluaran Belanja" :value="rupiah(purchases.totalExpense)" />
    <StatCard title="Selisih" :value="rupiah(profit)" />
    <StatCard title="Pesanan Dibayar" :value="orders.paid.length" />
  </div>
  <div class="card">
    <h2>Menu Terlaris</h2>
    <TopMenuList :items="orders.topMenus" />
  </div>
</template>