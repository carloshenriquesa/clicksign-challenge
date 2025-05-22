<template>
  <div class="upload-container" :class="{ 'has-image': selectedImage }">
    <div v-if="!selectedImage" class="upload-area">
      <div class="upload-content">
        <div class="upload-icon">
          <IconUpload />
        </div>
        <p class="upload-text">Escolha uma imagem .jpg ou .png no seu dispositivo</p>
        <UiButton
          class="upload-button"
          variant="secondary"
          type="button"
          @click="triggerFileInput"
          label="Selecionar"
        />
        <input
          type="file"
          ref="fileInput"
          class="file-input"
          accept="image/jpeg,image/png"
          @change="handleFileSelect"
        />
      </div>
    </div>

    <div v-else class="image-preview">
      <img :src="selectedImage" alt="Preview" class="preview-image" />
      <button class="delete-button" @click="removeImage">
        <IconTrash />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import IconUpload from '../icons/IconUpload.vue'
import UiButton from './UiButton.vue'
import IconTrash from '../icons/IconTrash.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])
interface FileReaderEvent extends ProgressEvent {
  target: FileReader
}

const fileInput: Ref<HTMLInputElement | null> = ref(null)
const selectedImage: Ref<string | null> = ref(null)
selectedImage.value = props.modelValue || null
const triggerFileInput = (): void => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileSelect = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const file: File | undefined = target.files?.[0]

  if (file) {
    const reader: FileReader = new FileReader()
    reader.onload = (e: ProgressEvent) => {
      const readerEvent = e as FileReaderEvent
      selectedImage.value = readerEvent.target.result as string
      emit('update:modelValue', selectedImage.value)
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = (): void => {
  selectedImage.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('update:modelValue', null)
}
</script>

<style scoped lang="scss">
.upload {
  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 702px;
    min-height: 174px;
    background: transparent;
    border-radius: 8px;
    border: 1px dashed var(--color-primary-400);
    overflow: hidden;
    position: relative;
    margin-bottom: 32px;
    &.has-image {
      border: none;
    }
  }
  &-area {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-content {
    text-align: center;
  }

  &-icon {
    color: white;
    margin-bottom: 16px;
  }

  &-text {
    margin-bottom: 16px;
    font-size: 14px;
  }
  &-button {
    margin: 0 auto;
  }
}

.file-input {
  display: none;
}

.image-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: var(--color-white);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-primary-400);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.delete-button:hover {
  background-color: var(--color-white);
}
</style>
