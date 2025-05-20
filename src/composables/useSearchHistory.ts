import { ref } from 'vue'

const STORAGE_KEY = 'search_history'
const MAX_HISTORY_ITEMS = 10

export function useSearchHistory() {
  const searchHistory = ref<string[]>([])

  const loadHistory = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      searchHistory.value = JSON.parse(saved)
    }
  }

  const saveToHistory = (term: string) => {
    if (!term.trim()) return

    searchHistory.value = [term, ...searchHistory.value.filter((item) => item !== term)].slice(
      0,
      MAX_HISTORY_ITEMS,
    )

    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value))
  }

  const removeFromHistory = (term: string) => {
    searchHistory.value = searchHistory.value.filter((item) => item !== term)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value))
  }

  const clearHistory = () => {
    searchHistory.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  loadHistory()

  return {
    searchHistory,
    saveToHistory,
    removeFromHistory,
    clearHistory,
  }
}
