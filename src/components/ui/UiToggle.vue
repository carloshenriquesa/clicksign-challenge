<template>
  <div class="toggle">
    <label
      class="toggle-switch"
      :class="{ 'is-active': modelValue }"
      role="switch"
      :aria-checked="modelValue"
    >
      <input
        type="checkbox"
        class="toggle-switch-input"
        :checked="modelValue"
        @change="handleChange"
        @keydown.space.prevent="toggle"
        @keydown.enter.prevent="toggle"
        tabindex="0"
      />
      <span class="toggle-switch-slider"></span>
    </label>
    <span class="toggle-label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue?: boolean
  initialValue?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  initialValue: false,
  label: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const internalValue = ref(props.modelValue !== undefined ? props.modelValue : props.initialValue)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      internalValue.value = newValue
    }
  },
)

watch(
  () => props.initialValue,
  (newInitialValue) => {
    if (props.modelValue === undefined) {
      internalValue.value = newInitialValue
    }
  },
)

const toggle = (): void => {
  internalValue.value = !internalValue.value
  emit('update:modelValue', internalValue.value)
}

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  internalValue.value = target.checked
  emit('update:modelValue', internalValue.value)
}
</script>

<style scoped lang="scss">
.toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    cursor: pointer;
    &-input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    &-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 20px;
      &::before {
        position: absolute;
        content: '';
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }
    }
  }
  &-label {
    color: #374151;
    font-size: 0.875rem;
  }
}

.toggle-switch-input:checked + .toggle-switch-slider {
  background-color: var(--color-secondary);
}

.toggle-switch-input:focus + .toggle-switch-slider {
  box-shadow: 0 0 1px var(--color-secondary);
}

.toggle-switch-input:checked + .toggle-switch-slider::before {
  transform: translateX(20px);
}
</style>
