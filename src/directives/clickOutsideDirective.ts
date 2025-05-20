interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void
}

interface ClickOutsideBinding {
  value: (event: MouseEvent) => void
}

export default {
  beforeMount(el: ClickOutsideElement, binding: ClickOutsideBinding) {
    el.clickOutsideEvent = function (event: MouseEvent) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: ClickOutsideElement) {
    document.removeEventListener('click', el.clickOutsideEvent as EventListener)
  },
}
