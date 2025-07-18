<template>
  <header class="project-list-header grid lg:grid-cols-3 md:grid-cols-1">
    <h3 class="project-list-title">
      Projetos<span class="project-list-counter">({{ projectListCounter }})</span>
    </h3>
    <div class="project-list-filters lg:col-span-2">
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
const projectListCounter = computed(() => projectStore.filteredProjectList.length)
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
  projectStore.setOnlyFavoritesFilter(onlyFavorites.value)
  projectStore.searchProjects()
})

function handleCreateProject() {
  router.push({ name: 'ProjectNew' })
}
</script>

<style scoped lang="scss">
.project-list {
  &-header {
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  &-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-primary-700);
  }

  &-counter {
    font-size: 1rem;
    font-weight: normal;
    margin-left: 5px;
  }

  &-filters {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    gap: 32px;
  }
}
</style>
