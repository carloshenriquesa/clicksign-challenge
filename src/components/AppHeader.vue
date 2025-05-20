<script setup lang="ts">
import logoSrc from '../assets/images/logo.png'
</script>

<template>
  <header class="header">
    <img :src="logoSrc" alt="Logo" class="logo" />
    <div class="search">
      <button class="search-button" aria-label="Buscar">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 19L14.65 14.65"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
$header-height: 80px;

.header {
  display: flex;
  background-color: var(--color-primary-darker);
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

.search {
  position: absolute;
  top: 0;
  right: 0;
  height: $header-height;
  display: flex;
  align-items: center;
  &-button {
    padding-right: 30px;
    background-color: transparent;
    border: none;
  }
}
</style>
