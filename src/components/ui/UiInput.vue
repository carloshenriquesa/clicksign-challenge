<template>
  <div class="input-container">
    <label :class="['input-label', { 'input-label-error': error }]" :for="name">
      {{ label }} <span class="input-label-required" v-if="required">(Obrigatório)</span></label
    >
    <input
      ref="inputRef"
      :type="type"
      :value="modelValue"
      @input="handleUiInput"
      :class="['input', { 'input-error': error }]"
      :disabled="disabled"
      :name="name"
      :id="name"
    />
    <span class="input-icon" @click="openDatePicker">
      <slot name="icon" />
    </span>
    <span v-if="error" class="input-error-message">{{ error }}</span>
  </div>
</template>

<script lang="ts">
export interface Props {
  modelValue: string | Date | undefined
  type?: string
  label?: string
  error?: string | null
  name?: string
  disabled?: boolean
  required?: boolean
}
</script>
<script setup lang="ts">
import { ref } from 'vue'

defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const handleUiInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value: string = target.value
  emit('update:modelValue', value)
}

const inputRef = ref<HTMLInputElement>()

const openDatePicker = () => {
  if (inputRef.value && !inputRef.value.disabled) {
    inputRef.value.showPicker()
  }
}
</script>

<style scoped lang="scss">
.input {
  padding: 8px;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  font-size: 16px;
  &:disabled {
    background-color: var(--color-primary-400);
    color: var(--color-primary-400);
  }
  &-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  &-error {
    border-color: var(--color-danger);
    &-message {
      color: var(--color-danger);
      font-size: 14px;
      text-align: left;
    }
  }
  &-icon {
    position: absolute;
    right: 10px;
    top: 55%;
    cursor: pointer;
  }

  &-label {
    font-size: 18px;
    text-align: left;
    color: var(--color-primary-400);
    &-required {
      color: var(--color-gray);
      font-size: 14px;
    }
    &-error {
      color: var(--color-danger);
      .input-label-required {
        color: var(--color-danger);
      }
    }
  }

  &-radio {
    display: inline-flex;
    margin-right: 20px;
    &__label {
      margin-left: 8px;
    }
  }

  &[type='date']::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
}
</style>
