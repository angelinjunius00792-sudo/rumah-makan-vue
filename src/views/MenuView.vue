<script setup>
import { ref, computed } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useAuthStore } from '@/stores/auth'
import SearchBar from '@/components/common/SearchBar.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import MenuTable from '@/components/features/MenuTable.vue'
import MenuForm from '@/components/features/MenuForm.vue'

const menus = useMenuStore()
const auth = useAuthStore()
const query = ref('')
const showForm = ref(false)
const editing = ref(null)

const canEdit = computed(() => auth.user.role === 'pemilik')
const rows = computed(() =>
  menus.withCategory.filter((m) => m.name.toLowerCase().includes(query.value.toLowerCase()))
)

function openAdd() { editing.value = null; showForm.value = true }
function openEdit(m) { editing.value = m; showForm.value = true }
function closeForm() { showForm.value = false }
function onSave(data) {
  if (editing.value) menus.update(editing.value.id, data)
  else menus.add(data)
  closeForm()
}
function onRemove(m) {
  if (confirm(`Hapus menu ${m.name}?`)) menus.remove(m.id)
}
function onToggle(m) {
  menus.update(m.id, { available: !m.available })
}
</script>
<template>
  <h1>Data Menu</h1>
  <div class="card">
    <div class="row">
      <SearchBar v-model="query" placeholder="Cari menu..." />
      <BaseButton v-if="canEdit" label="Tambah Menu" @click="openAdd" />
    </div>
    <MenuTable :rows="rows" :can-edit="canEdit" @edit="openEdit" @remove="onRemove" @toggle="onToggle" />
  </div>
  <BaseModal :show="showForm" :title="editing ? 'Ubah Menu' : 'Tambah Menu'" @close="closeForm">
    <MenuForm :initial="editing" :categories="menus.categories" @save="onSave" @cancel="closeForm" />
  </BaseModal>
</template>