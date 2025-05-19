<script setup lang="ts">
import { ref } from 'vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import UiForm from '@/components/ui/UiForm.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'

const name = ref('')
</script>

<template>
  <section class="project">
    <header>
      <UiButton variant="outline" label="Voltar" @click="$router.back()">
        <template #icon>
          <IconArrowLeft />
        </template>
      </UiButton>
      <h1 class="project-title">Novo Projeto</h1>
    </header>
    <div class="project-content">
      <UiForm @submit="() => console.log('Form submitted!')">
        <template #fields>
          <div class="grid">
            <UiInput :required="true" v-model="name" label="Nome do projeto" />
          </div>
          <div class="grid">
            <UiInput :required="true" v-model="name" label="Cliente" />
          </div>
          <div class="grid grid-cols-2">
            <UiInput :required="true" type="date" v-model="name" label="Data de início" />
            <UiInput :required="true" type="date" v-model="name" label="Data final" />
          </div>
        </template>
        <template #footer>
          <UiButton type="submit" label="Salvar projeto" class="w-full"></UiButton>
        </template>
      </UiForm>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project {
  &-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 33px;
  }
  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 4px;
    border: solid 1px var(--color-primary);
    padding: 52px;
  }
}

.w-full {
  width: 100%;
}
</style>
