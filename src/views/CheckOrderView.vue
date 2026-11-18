<script setup>
import { ref } from 'vue'
import { useOrderStore } from '@/stores/order'
import { rupiah } from '@/utils/format'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'

const orders = useOrderStore()
const id = ref('')
const result = ref(null)
const searched = ref(false)

function check() {
  searched.value = true
  result.value = orders.getById(Number(id.value)) ?? null
}
</script>
<template>
  <h1>Cek Pesanan</h1>
  <div class="card">
    <BaseInput v-model="id" label="Nomor Pesanan" type="number" />
    <BaseButton label="Cek" @click="check" />
    <div v-if="result" style="margin-top: 12px">
      <p>Pesanan #{{ result.id }} | Meja {{ result.tableNo }} | {{ rupiah(result.total) }}</p>
      <StatusBadge :status="result.status" />
    </div>
    <p v-else-if="searched" class="error">Pesanan tidak ditemukan</p>
  </div>
</template>