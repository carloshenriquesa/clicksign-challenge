<template>
  <UiForm @submit="submitProject">
    <template #fields>
      <div class="grid">
        <UiInput
          name="name"
          :required="true"
          v-model="projectForm.name"
          label="Nome do projeto"
          :error="errorForm.name"
        />
      </div>
      <div class="grid">
        <UiInput
          name="client"
          :required="true"
          v-model="projectForm.client"
          label="Cliente"
          :error="errorForm.client"
        />
      </div>
      <div class="grid grid-cols-2">
        <UiInput
          name="startDate"
          :required="true"
          type="date"
          v-model="projectForm.startDate"
          label="Data de início"
          :error="errorForm.startDate"
        >
          <template #icon>
            <IconCalendarDay />
          </template>
        </UiInput>
        <UiInput
          name="endDate"
          :required="true"
          type="date"
          v-model="projectForm.endDate"
          label="Data final"
          :error="errorForm.endDate"
        >
          <template #icon>
            <IconCalendarCheck />
          </template>
        </UiInput>
      </div>
      <UiUpload v-model="projectForm.banner" />
    </template>
    <template #footer>
      <UiButton
        type="submit"
        label="Salvar projeto"
        :disabled="
          isLoading ||
          !projectForm.client ||
          !projectForm.name ||
          !projectForm.startDate ||
          !projectForm.endDate
        "
        :full-width="true"
      />
    </template>
  </UiForm>
</template>

<script setup lang="ts">
import UiForm from '@/components/ui/UiForm.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiUpload from '@/components/ui/UiUpload.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { projectSchema } from '@/schema/project-schema'
import type { Project } from '@/schema/project-schema'
import { useProjectStore } from '@/stores/project'
import { ref, type Ref } from 'vue'
import { ZodError } from 'zod'
import { useRouter } from 'vue-router'
import IconCalendarDay from '../icons/IconCalendarDay.vue'
import IconCalendarCheck from '../icons/IconCalendarCheck.vue'

const isLoading = ref(false)
const projectStore = useProjectStore()
const router = useRouter()

const projectForm: Ref<Project> = ref(projectStore.currentProject)

const errorForm = ref({
  name: '',
  client: '',
  startDate: '',
  endDate: '',
})

function validateProject(project: Project) {
  try {
    projectSchema.parse(project)
    return true
  } catch (error) {
    if (error instanceof ZodError) {
      errorForm.value.name = error.errors.find((e) => e.path[0] === 'name')?.message || ''
      errorForm.value.client = error.errors.find((e) => e.path[0] === 'client')?.message || ''
      errorForm.value.startDate = error.errors.find((e) => e.path[0] === 'startDate')?.message || ''
      errorForm.value.endDate = error.errors.find((e) => e.path[0] === 'endDate')?.message || ''
    }
    console.error('Validation error:', error)
    return false
  }
}

async function submitProject() {
  if (!validateProject(projectForm.value)) {
    return
  }

  try {
    isLoading.value = true
    if (projectStore.currentProject.id) {
      await projectStore.updateProject(projectForm.value)
    } else {
      projectStore.addProject(projectForm.value)
    }
  } catch (error) {
    console.error('Error saving project:', error)
  } finally {
    isLoading.value = false
    router.back()
  }
}
</script>
