<script setup lang="ts">
import ChooseKanaLevelComponent from '@/components/ChooseKanaLevelComponent.vue'
import PreviousAnswerComponent from '@/components/PreviousAnswerComponent.vue'
import ProgressBarComponent from '@/components/ProgressBarComponent.vue'
import StageDescriptionComponent from '@/components/StageDescriptionComponent.vue'
import { useQuestionStore } from '@/stores/questionStore'
import { useStageStore } from '@/stores/stageStore'
import type { LevelTwoQuestion } from '@/types/questions'
import { computed, nextTick, onBeforeMount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const questionStore = useQuestionStore()
const stageStore = useStageStore()
const { t } = useI18n()

const question = computed<LevelTwoQuestion>(() => questionStore.currentQuestion as LevelTwoQuestion)
const progression = computed<number>(() => stageStore.currentProgress)
const displayGame = ref<boolean>(false)
const feedbackZone = ref<HTMLElement | null>(null)

watch(progression, () => {
  if (!stageStore.isStageFinished()) return
  stageStore.changeToNewStageLevel('3')
})

onBeforeMount(() => {
  const currentStage = stageStore.getCurrentStage()

  stageStore.changeToNewStageLevel(currentStage)
})

const handleQuestionAnswered = async () => {
  await nextTick()

  if (feedbackZone.value) {
    feedbackZone.value.focus()
  }
}
</script>
<template>
  <div class="text-center question col-xs-12">
    <StageDescriptionComponent
      :title="t('level2.level2Title')"
      :description="t('level2.level2Description')"
      :secondary-description="t('level2.level2SecondaryDescription')"
      @done="() => (displayGame = true)"
      v-if="!displayGame"
    />
    <template v-if="displayGame">
      <div ref="feedbackZone" tabindex="-1" class="focus-outline-none">
        <PreviousAnswerComponent
          :previous-question="questionStore.previousQuestion ?? undefined"
          :correct-answer="questionStore.previousQuestionWasCorrect ?? undefined"
        />
      </div>
      <ChooseKanaLevelComponent
        :correct-answer="question.correctAnswer"
        :possibilties="question.possibleAnswers"
        mode="showRomaji"
        @answered="handleQuestionAnswered" />
      <ProgressBarComponent
    /></template>
  </div>
</template>
<style lang="scss" scoped>
.focus-outline-none {
  outline: none;
}
</style>
