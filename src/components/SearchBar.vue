<template>
  <div class="search" :class="{ 'is-expanded': isSearchExpanded }">
    <input
      v-show="isSearchExpanded"
      v-model="searchInput"
      type="text"
      class="search-input"
      placeholder="Pesquise pelo projeto..."
      @focus="showHistory = true"
      @blur="handleBlur"
      @keyup.enter="handleSearch"
    />
    <button class="search-button" aria-label="Buscar" @click="toggleSearch">
      <IconSearch />
    </button>

    <div v-show="showHistory && isSearchExpanded" class="search-history">
      <div v-if="searchHistory.length > 0">
        <div
          v-for="term in searchHistory"
          :key="term"
          class="history-item"
          @mousedown.prevent="selectHistoryItem(term)"
        >
          <IconHistory class="history-icon" />
          <span class="history-text">{{ term }}</span>
          <button
            class="remove-history"
            @mousedown.prevent="removeFromHistory(term)"
            aria-label="Remover do histórico"
          >
            <IconClose />
          </button>
        </div>
      </div>
      <div v-else class="no-history">Nenhum histórico de busca</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconSearch from './icons/IconSearch.vue'
import IconHistory from './icons/IconHistory.vue'
import IconClose from './icons/IconClose.vue'
import { useSearchHistory } from '@/composables/useSearchHistory'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()
const isSearchExpanded = ref(false)
const searchInput = ref('')
const showHistory = ref(false)

const { searchHistory, saveToHistory, removeFromHistory } = useSearchHistory()

const toggleSearch = () => {
  isSearchExpanded.value = !isSearchExpanded.value
  if (isSearchExpanded.value) {
    setTimeout(() => {
      ;(document.querySelector('.search-input') as HTMLInputElement | null)?.focus()
    }, 100)
  } else {
    showHistory.value = false
    projectStore.setSearchTerm('')
    projectStore.searchProjects()
    searchInput.value = ''
  }
}

const handleBlur = () => {
  setTimeout(() => {
    showHistory.value = false
  }, 200)
}

const handleSearch = () => {
  if (searchInput.value.trim()) {
    saveToHistory(searchInput.value)
  }
  projectStore.setSearchTerm(searchInput.value)
  projectStore.searchProjects()
}

const selectHistoryItem = (term: string) => {
  searchInput.value = term
  projectStore.setSearchTerm(searchInput.value)
  projectStore.searchProjects()
  showHistory.value = false
}
</script>

<style scoped lang="scss">
$header-height: 80px;
$search-transition: 0.3s ease-in-out;

.search {
  position: absolute;
  top: 0;
  right: 0;
  height: $header-height;
  display: flex;
  align-items: center;
  transition: width $search-transition;
  width: auto;
  .icon {
    color: var(--color-white);
    transition: color $search-transition;
  }

  &.is-expanded {
    width: 100%;
    background-color: var(--color-white);
    color: var(--color-text);
    display: flex;
    flex-direction: row-reverse;
    .icon {
      color: var(--color-primary-800);
    }
  }

  &-input {
    width: 100%;
    height: 40px;
    padding: 0 50px 0 20px;
    border: none;
    background-color: transparent;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  &-button {
    padding-right: 30px;
    background-color: transparent;
    border: none;
    position: absolute;
    right: 0;
    cursor: pointer;
  }

  &-history {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
  }
}

.history-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .history-icon {
    margin-right: 12px;
    color: var(--color-text-light);
    font-size: 18px;
  }

  .history-text {
    flex: 1;
    color: var(--color-text);
  }
}

.remove-history {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
}

.no-history {
  padding: 16px;
  text-align: center;
  color: var(--color-text-light);
}
</style>
