<template>
  <div class="project-card">
    <div class="project-card-header">
      <img class="project-card-image" :src="Blankslate" alt="Imagem do projeto" />
      <ProjectActions class="actions" :project="props.project" />
    </div>
    <div class="project-card-content">
      <h2 class="project-card-title">{{ props.project.name }}</h2>
      <p class="project-card-description"><strong>Cliente:</strong>{{ props.project.client }}</p>
      <hr />
      <p class="project-card-description">
        <IconCalendarDay />
        {{ props.project.startDate }}
      </p>
      <p class="project-card-description">
        <IconCalendarCheck />
        {{ props.project.endDate }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCalendarCheck from './icons/IconCalendarCheck.vue'
import IconCalendarDay from './icons/IconCalendarDay.vue'
import Blankslate from '@/assets/images/blankslate.png'
import ProjectActions from './ProjectActions.vue'
import { defineProps } from 'vue'
import type { Project } from '@/schema/project-schema'

const props = defineProps({
  project: {
    type: Object as () => Project,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 16px;
  font-size: 16px;
  &-image {
    width: 100%;
    object-fit: cover;
  }
  &-header {
    position: relative;
    .actions {
      position: absolute;
      bottom: 20px;
      right: 16px;
    }
  }
  &-content {
    padding: 16px;
  }
  &-title {
    font-weight: 600;
    font-size: 20px;
    color: var(--color-primary-darker);
  }
  &-description {
    display: flex;
    align-items: center;
    margin-top: 16px;
    strong {
      font-weight: 600;
      margin-right: 8px;
    }
    .icon {
      margin-right: 16px;
    }
  }
  hr {
    border: 1px solid var(--color-primary-lighter);
    margin-top: 16px;
  }
}
</style>
