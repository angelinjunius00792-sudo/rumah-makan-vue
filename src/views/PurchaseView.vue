<script setup>
import { usePurchaseStore } from '@/stores/purchase'
import { useAuthStore } from '@/stores/auth'
import { rupiah } from '@/utils/format'
import PurchaseForm from '@/components/features/PurchaseForm.vue'

const purchases = usePurchaseStore()
const auth = useAuthStore()

function onSave(data) {
  purchases.add({ ...data, userId: auth.user.id })
}
</script>
<template>
  <h1>Belanja Bahan</h1>
  <div class="card">
    <PurchaseForm @save="onSave" />
  </div>
  <div class="card">
    <table>
      <thead><tr><th>Tanggal</th><th>Bahan</th><th>Jumlah</th><th>Total Harga</th></tr></thead>
      <tbody>
        <tr v-for="p in [...purchases.items].reverse()" :key="p.id">
          <td>{{ p.date }}</td>
          <td>{{ p.itemName }}</td>
          <td>{{ p.qty }} {{ p.unit }}</td>
          <td>{{ rupiah(p.totalPrice) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr><th colspan="3">Total Pengeluaran</th><th>{{ rupiah(purchases.totalExpense) }}</th></tr>
      </tfoot>
    </table>
  </div>
</template>