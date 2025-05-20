<template>
  <div class="home">
    <ProjectListEmpty v-if="projects.length === 0" />
    <ProjectList v-else />
  </div>
</template>

<script setup lang="ts">
import ProjectListEmpty from '@/components/ProjectListEmpty.vue'
import ProjectList from '@/components/ProjectList.vue'
import type { Project } from '@/schema/project-schema'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()

const projects: Project[] = projectStore.projectList
</script>
