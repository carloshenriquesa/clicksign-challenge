<template>
  <ProjectHeader />
  <section>
    <div class="grid xl:grid-cols-5 lg:grid-cols-3">
      <ProjectCard v-for="(project, index) in projectList" :project="project" :key="index" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/project/ProjectCard.vue'
import ProjectHeader from '@/components/project/ProjectHeader.vue'
import { useProjectStore } from '@/stores/project'
import { computed } from 'vue'

const projectStore = useProjectStore()
const projectList = computed(() => projectStore.filteredProjectList)
</script>
