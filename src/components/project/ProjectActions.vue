<template>
  <div class="project-actions">
    <UiFavoriteToggle :isActive="props.project.isFavorite" @update="handleUpdateFavorite" />
    <UiDropdown @edit="handleEditProject" @delete="showModalDeleteProject" />
  </div>
</template>

<script setup lang="ts">
import UiFavoriteToggle from '@/components/ui/UiFavoriteToggle.vue'
import UiDropdown from '@/components/ui/UiDropdown.vue'
import type { Project } from '@/schema/project-schema'
import { useProjectStore } from '@/stores/project'
import { useRouter } from 'vue-router'
import { useModal } from '@/composables/useModal'

const router = useRouter()
const projectStore = useProjectStore()
const showDeleteModal = useModal('modal-delete')
const props = defineProps({
  project: {
    type: Object as () => Project,
    required: true,
  },
})

function handleUpdateFavorite(isFavorite: boolean) {
  projectStore.setProjectFavorite(props.project.id!, isFavorite)
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
  showDeleteModal.open()
  projectStore.setCurrentProject(props.project)
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
