<template>
  <section class="project">
    <header>
      <UiButton variant="outline" label="Voltar" @click="$router.back()">
        <template #icon>
          <IconArrowLeft />
        </template>
      </UiButton>
      <h1 v-if="projectId" class="project-title">Editar Projeto</h1>
      <h1 v-else class="project-title">Novo Projeto</h1>
    </header>
    <div class="project-content">
      <ProjectForm v-if="!isLoading" :project="project" />
    </div>
  </section>
</template>

<script setup lang="ts">
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useProjectStore } from '@/stores/project'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import ProjectForm from '@/components/project/ProjectForm.vue'
import type { Project } from '@/schema/project-schema'

const isLoading = ref(false)
const projectId = useRoute().params.id as string
const projectStore = useProjectStore()
const project = ref({} as Project)

onMounted(async () => {
  if (projectId) {
    try {
      isLoading.value = true
      await projectStore.getProjectById(projectId)
      project.value = projectStore.project
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      isLoading.value = false
    }
  }
})
</script>

<style scoped lang="scss">
.project {
  &-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 33px;
  }
  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 4px;
    border: solid 1px var(--color-primary-400);
    padding: 52px;
  }
}
</style>
