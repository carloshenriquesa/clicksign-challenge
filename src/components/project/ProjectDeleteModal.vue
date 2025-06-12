<template>
  <UiModal :is-visible="deleteProjectModal.isOpen.value" title="Remover projeto">
    <template #icon>
      <IconTrash />
    </template>
    <template #body>
      <p class="modal-message">Essa ação removerá definitivamente o projeto:</p>
      <h2 class="modal-project-name">{{ projectStore.currentProject.name }}</h2>
    </template>
    <template #footer>
      <UiButton label="Cancelar" variant="secondary" @click="hideModalDeleteProject" />
      <UiButton label="Confirmar" @click="handleDeleteProject" />
    </template>
  </UiModal>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useProjectStore } from '@/stores/project'
import { useModal } from '@/composables/useModal'
import type { Project } from '@/schema/project-schema'

const projectStore = useProjectStore()

const deleteProjectModal = useModal('modal-delete')

function hideModalDeleteProject() {
  projectStore.setCurrentProject({} as Project)
  deleteProjectModal.close()
}

function handleDeleteProject() {
  if (projectStore.currentProject.id) {
    projectStore.deleteProject(projectStore.currentProject.id)
  }
  deleteProjectModal.close()
}
</script>
