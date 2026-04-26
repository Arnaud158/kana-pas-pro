import { createI18n } from 'vue-i18n'

type JsonMessage = Record<string, unknown>

const frModules = import.meta.glob<JsonMessage>('@/locales/fr/*.json', {
  eager: true,
  import: 'default',
})

const enModules = import.meta.glob<JsonMessage>('@/locales/en/*.json', {
  eager: true,
  import: 'default',
})

const formatModules = (modules: Record<string, JsonMessage>) => {
  const formatted: Record<string, JsonMessage> = {}
  for (const [path, module] of Object.entries(modules)) {
    const fileName = new RegExp(/\/([A-Za-z0-9_-]+)\.json$/).exec(path)?.[1]

    if (fileName && module) {
      formatted[fileName] = module
    }
  }
  return formatted
}

const messages: Record<string, Record<string, JsonMessage>> = {
  fr: formatModules(frModules),
  en: formatModules(enModules),
}

const supportedLocales = ['en', 'fr']
const browserLang = navigator.language.split('-')[0]!
const defaultLang = supportedLocales.includes(browserLang) ? browserLang : 'en'
const savedLocale = localStorage.getItem('user-locale') || defaultLang

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages,
})
