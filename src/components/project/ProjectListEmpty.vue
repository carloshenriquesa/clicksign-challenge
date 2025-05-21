<template>
  <div class="project-list-empty">
    <h1>Nenhum projeto</h1>
    <p>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</p>
    <UiButton @click="createProject" size="large" label="Novo projeto">
      <template #icon>
        <IconPlusCircle />
      </template>
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import IconPlusCircle from '@/components/icons/IconPlusCircle.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function createProject() {
  router.push('/project/new')
}
</script>

<style scoped lang="scss">
.project-list-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);
  text-align: center;
  background-color: #fff;
  border-radius: 4px;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 24px;
    color: var(--color-primary-400);
  }

  p {
    font-size: 1rem;
    margin-bottom: 32px;
  }
}
</style>
