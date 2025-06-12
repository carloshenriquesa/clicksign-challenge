<template>
  <dialog v-if="isVisible" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <div class="modal-icon">
          <slot name="icon" />
        </div>
      </div>

      <h1 class="modal-title">{{ props.title }}</h1>

      <div class="modal-divider"></div>

      <div class="modal-body">
        <p class="modal-message">{{ props.message }}</p>
        <h2 class="modal-project-name">{{ props.projectName }}</h2>
      </div>

      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  projectName: string
  isVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  message: '',
  isVisible: false,
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-container {
  position: relative;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 24px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-header {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.modal-icon {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: var(--color-primary-400);
  height: 64px;
  width: 64px;
  border-radius: 50%;
  top: -30px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-primary-400);
  margin-bottom: 16px;
  text-align: center;
}

.modal-divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-primary-100);
  margin: 8px 0 24px 0;
}

.modal-body {
  width: 100%;
  text-align: center;
  margin-bottom: 24px;
}

.modal-message {
  color: #666;
  margin-bottom: 8px;
}

.modal-project-name {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.modal-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
</style>
