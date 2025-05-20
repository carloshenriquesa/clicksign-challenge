<template>
  <ProjectHeader />
  <section>
    <div class="grid grid-cols-5">
      <ProjectCard v-for="(project, index) in projectList" :project="project" :key="index" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectHeader from './ProjectHeader.vue'
import { useProjectStore } from '@/stores/project'
import type { Project } from '@/schema/project-schema'

const projectStore = useProjectStore()
const projectList: Project[] = projectStore.projectList
</script>
