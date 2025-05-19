<template>
  <div class="input-container">
    <label class="input-label"
      >{{ label }} <span class="input-label__required" v-if="required">(Obrigatório)</span></label
    >
    <template v-if="mask">
      <input
        :type="type"
        :value="modelValue"
        @input="handleUiInput"
        :placeholder="placeholder"
        :class="['input', { 'input-error': error }]"
        v-mask="mask"
        :disabled="disabled"
      />
    </template>
    <template v-else>
      <input
        :type="type"
        :value="modelValue"
        @input="handleUiInput"
        :placeholder="placeholder"
        :class="['input', { 'input-error': error }]"
        :disabled="disabled"
      />
    </template>
    <span v-if="error" class="input-error__message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  mask: {
    type: String,
    default: null,
  },
  error: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const handleUiInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value: string = target.value

  emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.input {
  padding: 8px;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  font-size: 16px;
  &:disabled {
    background-color: var(--color-primary);
    color: var(--color-primary);
  }
  &-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  &-error {
    border-color: var(--color-danger);
    &__message {
      color: var(--color-danger);
      font-size: 12px;
      font-weight: bold;
    }
  }

  &-label {
    font-size: 18px;
    text-align: left;
    color: var(--color-primary);
    &__required {
      color: var(--color-gray);
      font-size: 14px;
    }
  }

  &-radio {
    display: inline-flex;
    margin-right: 20px;
    &__label {
      margin-left: 8px;
    }
  }
}
</style>
