<script setup>
defineProps({ modelValue: String, placeholder: { type: String, default: 'Cari...' } })
defineEmits(['update:modelValue'])
</script>
<template>
  <div class="field">
    <input :value="modelValue" :placeholder="placeholder" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>