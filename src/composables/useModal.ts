import { computed, type ComputedRef } from 'vue'
import { useModalStore } from '@/stores/modal'

interface UseModalReturn<> {
  isOpen: ComputedRef<boolean>
  open: () => void
  close: () => void
}

export function useModal(modalId: string): UseModalReturn {
  const modalStore = useModalStore()

  const isOpen: ComputedRef<boolean> = computed(() => modalStore.isModalOpen(modalId))

  const open = (): void => {
    modalStore.openModal(modalId)
  }

  const close = (): void => {
    modalStore.closeModal(modalId)
  }

  return { isOpen, open, close }
}
