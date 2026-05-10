<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <footer>
    <i18n-t keypath="footerComponent.footerBasedOn" tag="div">
      <template #legacyLink>
        <a href="https://github.com/anzzstuff/kanaquiz" target="_blank">
          {{ t('footerComponent.footerLegacyLink') }}
        </a>
      </template>
    </i18n-t>
    <i18n-t keypath="footerComponent.footerSourceCode" tag="div">
      <template #sourceLink>
        <a href="https://github.com/Arnaud158/kana-pas-pro" target="_blank">
          {{ t('footerComponent.footerSourceLink') }}
        </a>
      </template>
    </i18n-t>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
