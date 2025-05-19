<template>
  <ProjectHeader />
  <section>
    <div class="grid grid-cols-5">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectHeader from './ProjectHeader.vue'
</script>
