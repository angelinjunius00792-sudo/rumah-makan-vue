<script setup>
import { ref, computed } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useOrderStore } from '@/stores/order'
import { useAuthStore } from '@/stores/auth'
import { rupiah, tanggal } from '@/utils/format'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import MenuSelector from '@/components/features/MEnuSelector.vue'
import CartTable from '@/components/features/CartTable.vue'
import PaymentSummary from '@/components/features/PaymentSummary.vue'

const menus = useMenuStore()
const orders = useOrderStore()
const auth = useAuthStore()

const cart = ref([])
const tableNo = ref('')
const error = ref('')
const success = ref('')

const total = computed(() => cart.value.reduce((t, i) => t + i.price * i.qty, 0))
const history = computed(() => [...orders.items].reverse())

function addToCart(menu, qty) {
  success.value = ''
  const n = Number(qty)
  if (!Number.isInteger(n) || n <= 0) {
    error.value = 'Jumlah harus bilangan bulat lebih dari 0'
    return
  }
  error.value = ''
  const found = cart.value.find((i) => i.menuId === menu.id)
  if (found) found.qty += n
  else cart.value.push({ menuId: menu.id, name: menu.name, price: menu.price, qty: n })
}

function removeFromCart(menuId) {
  cart.value = cart.value.filter((i) => i.menuId !== menuId)
}

function save() {
  success.value = ''
  if (!cart.value.length) { error.value = 'Keranjang masih kosong'; return }
  if (!(Number(tableNo.value) > 0)) { error.value = 'Nomor meja wajib diisi'; return }
  const order = orders.add({ waiterId: auth.user.id, tableNo: Number(tableNo.value), items: cart.value })
  cart.value = []
  tableNo.value = ''
  error.value = ''
  success.value = `Pesanan #${order.id} berhasil disimpan`
}
</script>
<template>
  <h1>Pesanan</h1>
  <div class="card">
    <h2>Pilih Menu</h2>
    <MenuSelector :menus="menus.availableItems" @add="addToCart" />
  </div>
  <div class="card">
    <h2>Keranjang</h2>
    <BaseInput v-model="tableNo" label="Nomor Meja" type="number" />
    <CartTable :items="cart" @remove="removeFromCart" />
    <PaymentSummary :total="total" @submit="save" />
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
  <div class="card">
    <h2>Riwayat Pesanan</h2>
    <table>
      <thead><tr><th>No</th><th>Waktu</th><th>Meja</th><th>Total</th><th>Status</th><th></th></tr></thead>
      <tbody>
        <tr v-for="o in history" :key="o.id">
          <td>#{{ o.id }}</td>
          <td>{{ tanggal(o.createdAt) }}</td>
          <td>{{ o.tableNo }}</td>
          <td>{{ rupiah(o.total) }}</td>
          <td><StatusBadge :status="o.status" /></td>
          <td>
            <BaseButton v-if="o.status === 'belum_bayar'" label="Tandai Dibayar" @click="orders.setStatus(o.id, 'dibayar')" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>