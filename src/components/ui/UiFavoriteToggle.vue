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
  initialValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: false,
})

const isActive = ref<boolean>(props.initialValue)

// Define o evento que será emitido
const emit = defineEmits<{
  (e: 'update:isActive', value: boolean): void
}>()

const toggle = (): void => {
  isActive.value = !isActive.value
  emit('update:isActive', isActive.value)
}

watch(
  () => props.initialValue,
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
