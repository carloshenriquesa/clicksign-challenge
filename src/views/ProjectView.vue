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
      <UiForm @submit="() => submitProject()">
        <template #fields>
          <div class="grid">
            <UiInput :required="true" v-model="projectForm.name" label="Nome do projeto" />
          </div>
          <div class="grid">
            <UiInput :required="true" v-model="projectForm.client" label="Cliente" />
          </div>
          <div class="grid grid-cols-2">
            <UiInput
              :required="true"
              type="date"
              v-model="projectForm.startDate"
              label="Data de início"
            />
            <UiInput
              :required="true"
              type="date"
              v-model="projectForm.endDate"
              label="Data final"
            />
          </div>
          <UiUpload v-model="projectForm.banner" />
        </template>
        <template #footer>
          <UiButton type="submit" label="Salvar projeto" class="w-full"></UiButton>
        </template>
      </UiForm>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import UiForm from '@/components/ui/UiForm.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiUpload from '@/components/ui/UiUpload.vue'
import type { Project } from '@/schema/project-schema'
import { useProjectStore } from '@/stores/project'
import { useRoute } from 'vue-router'

const projectId = useRoute().params.id as string
const projectStore = useProjectStore()

const projectForm: Ref<Project> = ref({
  id: '',
  name: '',
  client: '',
  startDate: new Date(),
  endDate: new Date(),
  banner: '',
  isFavorite: false,
})

if (projectId) {
  const project = projectStore.getProjectById(projectId)
  if (project) {
    projectForm.value = { ...project }
  }
}

function submitProject() {
  if (projectId) {
    projectStore.updateProject(projectForm.value)
    return
  }
  projectForm.value.id = crypto.randomUUID()
  projectStore.addProject(projectForm.value)
}
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
    border: solid 1px var(--color-primary);
    padding: 52px;
  }
}

.w-full {
  width: 100%;
}
</style>
