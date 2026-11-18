<script setup>
defineProps({ show: Boolean, title: String })
defineEmits(['close'])
</script>
<template>
  <div v-if="show" class="modal-bg" @click.self="$emit('close')">
    <div class="modal">
      <h2>{{ title }}</h2>
      <slot />
    </div>
  </div>
</template>