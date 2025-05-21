<template>
  <div class="select-container" :class="{ 'select-open': isOpen }">
    <div class="select-header" @click="toggleDropdown">
      <span>{{ selectedOption.label }}</span>
      <svg
        class="select-arrow"
        :class="{ 'rotate-arrow': isOpen }"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L6 6L11 1"
          stroke="#4B5563"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <transition name="dropdown">
      <div v-show="isOpen" class="select-dropdown">
        <div
          v-for="option in options"
          :key="option.value"
          class="select-option"
          :class="{ selected: option.value === selectedOption.value }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, defineProps, defineEmits } from 'vue'

export interface SelectOption {
  value: string
  label: string
}

const props = defineProps<{
  options: SelectOption[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === props.modelValue) || props.options[0]
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: SelectOption) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.select-container')) {
    isOpen.value = false
  }
}

window.addEventListener('click', handleClickOutside)
onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.select-container {
  position: relative;
  width: 100%;
  max-width: 300px;
  user-select: none;
}

.select-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 16px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  color: #374151;
  transition: border-color 0.2s ease;
}

.select-container.select-open .select-header {
  border-color: var(--color-primary-400);
  border-radius: 8px 8px 0 0;
}

.select-arrow {
  transition: transform 0.3s ease;
}

.rotate-arrow {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
}

.select-option {
  padding: 12px 16px;
  cursor: pointer;
  color: var(--color-primary-400);
  transition: background-color 0.2s ease;
}

.select-option:hover {
  background-color: var(--color-white);
}

.select-option.selected {
  color: var(--color-primary-400);
  background-color: #eff6ff;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
