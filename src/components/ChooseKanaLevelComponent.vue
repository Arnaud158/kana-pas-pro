<script setup lang="ts">
import { useQuestionStore } from '@/stores/questionStore'
import type Kana from '@/types/kana'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  correctAnswer: Kana
  possibilties: [Kana, Kana, Kana]
  mode: 'showKana' | 'showRomaji'
}

const props = defineProps<Props>()
const emit = defineEmits(['answered'])
const { t } = useI18n()

const questionStore = useQuestionStore()

const isTouchDevice = ref<boolean>(
  globalThis.window !== undefined && 'ontouchstart' in globalThis.window,
)

const isKanaMode = computed(() => {
  return props.mode === 'showKana'
})

const isRomajiMode = computed(() => {
  return props.mode === 'showRomaji'
})

const formatedQuestion = computed<string>((): string => {
  if (isKanaMode.value) {
    return props.correctAnswer.kana
  } else if (isRomajiMode.value) {
    return props.correctAnswer.romaji[0]!
  }
  console.error('Unexpected question mode')
  return ''
})

const formatAnswer = (kana: Kana): string => {
  if (isKanaMode.value) {
    return kana.romaji[0]!
  } else if (isRomajiMode.value) {
    return kana.kana
  }
  console.error('Unexpected question mode')
  return ''
}

const handleAnswerClick = async (kana: Kana) => {
  const isCorrectAnswer = kana.kana === props.correctAnswer.kana

  questionStore.handleQuestionAnswer(isCorrectAnswer)

  emit('answered')
}
</script>
<template>
  <div class="big-character" :aria-hidden="isKanaMode">{{ formatedQuestion }}</div>
  <div class="answer-container">
    <button
      v-for="kana in possibilties"
      v-bind:key="kana.kana"
      class="btn btn-default answer-button"
      :class="{ 'no-hover': isTouchDevice }"
      @click="() => handleAnswerClick(kana)"
    >
      <span :aria-hidden="isRomajiMode">{{ formatAnswer(kana) }}</span>
      <span v-if="isRomajiMode" class="sr-only">{{
        t('chooseKanaLevelComponent.chooseKanaLevelPossibleAnswerAria')
      }}</span>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.big-character {
  font-size: 5em;
}

.answer-container {
  max-width: 360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.answer-form-container {
  max-width: 100px;
  margin: 0 auto;
}

.answer-button {
  min-width: 90px;
  font-size: 2em;
  margin: 30px 0 60px;
  @media (max-width: 768px) {
    margin: 0px 0 15px;
  }
}
.no-hover {
  /* disables hover effect on touch screens */
  background-color: #fff;
  border-color: #ccc;
}
</style>
