import { defineStore } from 'pinia'

interface ModalState {
  activeModals: Set<string>
}

export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
    activeModals: new Set<string>(),
  }),

  actions: {
    openModal(modalId: string): void {
      this.activeModals.add(modalId)
    },

    closeModal(modalId: string): void {
      this.activeModals.delete(modalId)
    },

    isModalOpen(modalId: string): boolean {
      return this.activeModals.has(modalId)
    },
  },
})
