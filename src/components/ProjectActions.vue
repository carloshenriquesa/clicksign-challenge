<template>
  <div class="project-actions">
    <UiFavoriteToggle />
    <UiDropdown />
  </div>
</template>

<script setup lang="ts">
import UiFavoriteToggle from './ui/UiFavoriteToggle.vue'
import UiDropdown from './ui/UiDropdown.vue'
</script>

<style scoped lang="scss">
.project-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
</style>
