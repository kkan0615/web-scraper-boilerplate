import { createI18n } from 'vue-i18n'
import enDictionary from './langs/en'
import { SupportedLanguage } from '@/types/language'

// Default locale
export const DefaultFallbackLocale = 'en'

const messages: Record<SupportedLanguage, any> = {
  /* English */
  en: enDictionary,
  /* Korean */
  // ko: koDictionary,
}

const i18n = createI18n({
  legacy: false,
  locale: DefaultFallbackLocale,
  fallbackLocale: DefaultFallbackLocale,
  globalInjection: true,
  messages
})

export default i18n
