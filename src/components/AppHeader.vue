<template>
  <header class="header">
    <img :src="logoSrc" alt="Logo" class="logo" />
    <SearchBar v-if="$route.name === 'Home' && projectStore.projectList.length > 1" />
  </header>
</template>

<script setup lang="ts">
import logoSrc from '../assets/images/logo.png'
import SearchBar from './SearchBar.vue'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()
</script>

<style scoped lang="scss">
$header-height: 80px;

.header {
  display: flex;
  background-color: var(--color-primary-800);
  color: white;
  width: 100%;
  height: $header-height;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.logo {
  height: 70px;
}
</style>
