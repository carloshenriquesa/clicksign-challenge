<template>
  <button class="button">
    <span>{{ icon }}</span>
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string
  icon?: string
}
import { defineProps } from 'vue'

const { icon, label } = defineProps<Props>()
</script>
