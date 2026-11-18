<script setup>
defineProps({ label: String, variant: { type: String, default: 'primary' }, disabled: Boolean })
defineEmits(['click'])
</script>
<template>
  <button :class="['btn', variant]" :disabled="disabled" @click="$emit('click')">
    <slot>{{ label }}</slot>
  </button>
</template>