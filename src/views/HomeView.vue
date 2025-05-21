<template>
  <div class="home">
    <ProjectListEmpty v-if="!isLoading && projectStore.projectList.length === 0" />
    <ProjectList v-else />
  </div>
</template>

<script setup lang="ts">
import ProjectListEmpty from '@/components/project/ProjectListEmpty.vue'
import ProjectList from '@/components/project/ProjectList.vue'
import { useProjectStore } from '@/stores/project'
import { onMounted, ref } from 'vue'

const projectStore = useProjectStore()
const isLoading = ref(true)

onMounted(async () => {
  try {
    await projectStore.getAllProjects()
  } catch (error) {
    console.error('Error fetching projects:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
