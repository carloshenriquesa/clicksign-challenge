<template>
  <header class="project-list-header">
    <h3 class="project-list-title">
      Projetos<span class="project-list-counter">({{ projectListCounter }})</span>
    </h3>
    <div class="project-list-filters">
      <UiToggle label="Apenas favoritos" v-model="onlyFavorites" />
      <UiSelect v-model="selectedProject" :options="selectOptions" label="Projetos" />
      <UiButton label="Novo projeto" @click="handleCreateProject()">
        <template #icon><IconPlusCircle /></template>
      </UiButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import UiToggle from '@/components/ui/UiToggle.vue'
import UiButton from '@/components/ui/UiButton.vue'
import IconPlusCircle from '@/components/icons/IconPlusCircle.vue'
import UiSelect from '@/components/ui/UiSelect.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useProjectStore } from '@/stores/project'
import { useRouter } from 'vue-router'

const router = useRouter()
const projectStore = useProjectStore()
const projectListCounter = computed(() => projectStore.projectList.length)
const selectedProject = ref('1')
const selectOptions = [
  { value: '1', label: 'Ordem alfabética' },
  { value: '2', label: 'Iniciados mais recentes' },
  { value: '3', label: 'Prazo mais próximo' },
]
const onlyFavorites = ref(false)

onMounted(() => {
  projectStore.resetFilter()
  projectStore.sortByAlphabeticalOrder()
})

watch([selectedProject, onlyFavorites], () => {
  if (selectedProject.value === '1') {
    projectStore.sortByAlphabeticalOrder()
  } else if (selectedProject.value === '2') {
    projectStore.sortByStartDate()
  } else if (selectedProject.value === '3') {
    projectStore.sortByEndDate()
  }
  if (onlyFavorites.value) {
    projectStore.filterByFavorites()
  } else {
    projectStore.resetFilter()
  }
})

function handleCreateProject() {
  router.push({ name: 'ProjectNew' })
}
</script>

<style scoped lang="scss">
.project-list {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  &-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-primary-dark);
  }

  &-counter {
    font-size: 1rem;
    font-weight: normal;
    margin-left: 5px;
  }

  &-filters {
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
}
</style>
