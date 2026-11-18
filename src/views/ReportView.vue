<script setup>
import { useOrderStore } from '@/stores/order'
import { rupiah, tanggal } from '@/utils/format'
import StatCard from '@/components/common/StatCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'

const orders = useOrderStore()
</script>
<template>
  <h1>Laporan Penjualan</h1>
  <div class="grid">
    <StatCard title="Total Pendapatan (dibayar)" :value="rupiah(orders.revenue)" />
    <StatCard title="Jumlah Pesanan" :value="orders.items.length" />
  </div>
  <div class="card">
    <table>
      <thead><tr><th>No</th><th>Waktu</th><th>Item</th><th>Total</th><th>Status</th></tr></thead>
      <tbody>
        <tr v-for="o in [...orders.items].reverse()" :key="o.id">
          <td>#{{ o.id }}</td>
          <td>{{ tanggal(o.createdAt) }}</td>
          <td>{{ o.items.map((i) => `${i.name} x${i.qty}`).join(', ') }}</td>
          <td>{{ rupiah(o.total) }}</td>
          <td><StatusBadge :status="o.status" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>