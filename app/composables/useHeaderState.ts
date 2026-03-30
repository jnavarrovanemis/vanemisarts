// composables/useHeaderState.ts
// Singleton reactivo — compartido entre AppHeader y sus dropdowns.
import { ref } from 'vue'

const lockedOpen = ref(false)

export function useHeaderState() {
  const lockOpen = () => {
    lockedOpen.value = true
  }
  const unlock = () => {
    lockedOpen.value = false
  }
  return { lockedOpen, lockOpen, unlock }
}
