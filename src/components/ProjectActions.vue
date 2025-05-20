<template>
  <div class="project-actions">
    <UiFavoriteToggle :isActive="props.project.isFavorite" @update="handleUpdateFavorite" />
    <UiDropdown @edit="handleEditProject" @delete="showModalDeleteProject" />
    <UiModal
      message="Essa ação removerá definitivamente o projeto:"
      :project-name="props.project.name"
      :is-visible="isModalVisible"
      title="Remover projeto"
    >
      <template #icon>
        <IconTrash />
      </template>
      <template #footer>
        <UiButton label="Cancelar" variant="secondary" @click="hideModalDeleteProject" />
        <UiButton label="Confirmar" @click="handleDeleteProject" />
      </template>
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import UiFavoriteToggle from './ui/UiFavoriteToggle.vue'
import UiDropdown from './ui/UiDropdown.vue'
import UiModal from './ui/UiModal.vue'
import IconTrash from './icons/IconTrash.vue'
import { defineProps, ref } from 'vue'
import type { Project } from '@/schema/project-schema'
import { useProjectStore } from '@/stores/project'
import { useRouter } from 'vue-router'
import UiButton from './ui/UiButton.vue'

const router = useRouter()
const projectStore = useProjectStore()
const isModalVisible = ref(false)
const props = defineProps({
  project: {
    type: Object as () => Project,
    required: true,
  },
})

function handleUpdateFavorite(isFavorite: boolean) {
  projectStore.setProjectFavorite(props.project.id, isFavorite)
}

function handleEditProject() {
  router.push({
    name: 'Project',
    params: {
      id: props.project.id,
    },
  })
}

function showModalDeleteProject() {
  isModalVisible.value = true
}

function hideModalDeleteProject() {
  isModalVisible.value = false
}

function handleDeleteProject() {
  projectStore.deleteProject(props.project.id)
  isModalVisible.value = false
}
</script>

<style scoped lang="scss">
.project-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
</style>
