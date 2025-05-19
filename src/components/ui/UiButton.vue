<template>
  <button
    :class="['button', `button-${variant}`, `button-${size}`, { 'button-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
    :type="type"
  >
    <span class="button-icon">
      <slot name="icon"></slot>
    </span>
    {{ label }}
    <span v-if="loading" class="button-loader"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'outline'
  loading?: boolean
  disabled?: boolean
  label?: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  loading: false,
  disabled: false,
  size: 'medium',
})

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()

const handleClick = (event: Event) =>
  !props.loading && !props.disabled ? emit('click', event) : null
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  overlay: none;
  border-radius: 26px;
  color: var(--color-white);
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  &-primary {
    background-color: var(--color-primary);
    color: var(--color-white);
    &:hover {
      background-color: var(--color-primary-dark);
    }
  }
  &-icon {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
  &-medium {
    height: 40px;
    font-size: 16px;
    padding: 0 24px;
    .icon {
      width: 24px;
      height: 24px;
    }
  }
  &-large {
    height: 52px;
    padding: 0 32px;
  }
  &-outline {
    background-color: transparent;
    color: var(--color-primary);
    padding: 0;
    .button-icon {
      margin-right: 5px;
    }
  }
}
</style>
