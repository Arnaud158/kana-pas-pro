<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  title: string
  description?: string
  secondaryDescription?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'done'): void
}>()

const isVisible = ref(false)

let timeoutId: number | undefined

onMounted(() => {
  isVisible.value = true

  timeoutId = globalThis.setTimeout(() => {
    isVisible.value = false
  }, 1200)
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})

const handleTransitionEnd = () => {
  emit('done')
}
</script>
<template>
  <Transition name="stage" @after-leave="handleTransitionEnd">
    <div v-if="isVisible" class="text-center show-stage">
      <h1>{{ props.title }}</h1>
      <h3 v-if="props.description">{{ props.description }}</h3>
      <h4 v-if="props.secondaryDescription">{{ props.secondaryDescription }}</h4>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.show-stage {
  margin-top: 130px;
  h3 {
    margin-top: 30px;
  }
  @media (max-width: 768px) {
    margin-top: 100px;
    margin-bottom: 100px;
  }
}
.stage-enter-active,
.stage-leave-active {
  transition: opacity 0.9s ease;
}

.stage-enter-from,
.stage-leave-to {
  opacity: 0;
}

.stage-enter-to,
.stage-leave-from {
  opacity: 1;
}
</style>
