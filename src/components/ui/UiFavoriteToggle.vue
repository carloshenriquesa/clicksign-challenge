<template>
  <span
    class="favorite-toggle"
    :class="{ 'is-active': isActive }"
    @click="toggle"
    role="button"
    :aria-pressed="isActive"
    tabindex="0"
    @keydown.space.prevent="toggle"
    @keydown.enter.prevent="toggle"
    aria-label="Toggle Favorite"
  >
    <IconFavorite />
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import IconFavorite from '../icons/IconFavorite.vue'

interface Props {
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
})

const isActive = ref<boolean>(props.isActive)

const emit = defineEmits<{
  (e: 'update', value: boolean): void
}>()

const toggle = (): void => {
  isActive.value = !isActive.value
  emit('update', isActive.value)
}

watch(
  () => props.isActive,
  (newValue) => {
    isActive.value = newValue
  },
)
</script>

<style scoped lang="scss">
.favorite-toggle {
  display: inline-flex;
  cursor: pointer;
  padding: 4px;
}

.star-icon {
  transition:
    color 0.2s ease-in-out,
    fill 0.2s ease-in-out;
  fill: transparent;
}

.favorite-toggle.is-active .icon {
  fill: var(--color-secondary);
  color: var(--color-secondary);
}

.favorite-toggle:not(.is-active):hover .icon {
  fill: var(--color-gray);
}
</style>
