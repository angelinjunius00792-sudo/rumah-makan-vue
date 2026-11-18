<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: 'text' },
  error: String
})
defineEmits(['update:modelValue'])
</script>
<template>
  <label class="field">
    <span v-if="label">{{ label }}</span>
    <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <small v-if="error" class="error">{{ error }}</small>
  </label>
</template>