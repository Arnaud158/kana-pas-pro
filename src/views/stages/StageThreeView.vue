<script setup lang="ts">
import InputKanaLevelComponent from '@/components/InputKanaLevelComponent.vue'
import PreviousAnswerComponent from '@/components/PreviousAnswerComponent.vue'
import ProgressBarComponent from '@/components/ProgressBarComponent.vue'
import StageDescriptionComponent from '@/components/StageDescriptionComponent.vue'
import { useQuestionStore } from '@/stores/questionStore'
import { useStageStore } from '@/stores/stageStore'
import type { LevelThreeQuestion } from '@/types/questions'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const questionStore = useQuestionStore()
const stageStore = useStageStore()
const { t } = useI18n()

const question = computed<LevelThreeQuestion>(
  () => questionStore.currentQuestion as LevelThreeQuestion,
)
const progression = computed<number>(() => stageStore.currentProgress)
const displayGame = ref<boolean>(false)

watch(progression, () => {
  if (!stageStore.isStageFinished()) return
  stageStore.changeToNewStageLevel('4')
})

onBeforeMount(() => {
  const currentStage = stageStore.getCurrentStage()

  stageStore.changeToNewStageLevel(currentStage)
})
</script>
<template>
  <div class="text-center question col-xs-12">
    <StageDescriptionComponent
      :title="t('level3.level3Title')"
      :description="t('level3.level3Description')"
      @done="() => (displayGame = true)"
      v-if="!displayGame"
    />
    <template v-if="displayGame">
      <PreviousAnswerComponent
        :previous-question="questionStore.previousQuestion ?? undefined"
        :correct-answer="questionStore.previousQuestionWasCorrect ?? undefined" />
      <InputKanaLevelComponent :correct-answer="[question.correctAnswer]" />
      <ProgressBarComponent
    /></template>
  </div>
</template>
