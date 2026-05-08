<script setup lang="ts">
import { useLockStore } from '@/stores/lockStore'
import type { StageLevel } from '@/types/stageLevel'
import { nextTick, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const lockStore = useLockStore()
const { t } = useI18n()

const lockLevel = ref<string>(lockStore.lockLevel)
const selectRef = ref<HTMLSelectElement | null>(null)

watchEffect(() => {
  if (!lockLevel.value) return
  const data = lockLevel.value as StageLevel
  lockStore.lockLevel = data
})

const handleLockLevel = async () => {
  if (lockStore.isLocked) {
    lockLevel.value = '1'

    await nextTick()

    selectRef.value?.focus()
  }
}
</script>
<template>
  <span class="pull-right lock"
    >{{ t('lockLevelComponent.lockLevelText') }} &nbsp;
    <select
      v-if="lockStore.isLocked"
      ref="selectRef"
      v-model="lockLevel"
      class="stage-choice"
      :aria-label="t('lockLevelComponent.lockLevelLevelSelectionAria')"
    >
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
    <input
      type="checkbox"
      v-model="lockStore.isLocked"
      @change="handleLockLevel"
      :aria-label="t('lockLevelComponent.lockLevelToggleButtonAria')"
    />
  </span>
</template>
<style lang="scss" scoped>
.lock {
  color: #707070;
  margin-bottom: 10px;
}
.stage-choice {
  border: 1px solid #999;
  padding-left: 5px;
  border-radius: 5px;
  margin-right: 5px;
  outline: none;
}
</style>
