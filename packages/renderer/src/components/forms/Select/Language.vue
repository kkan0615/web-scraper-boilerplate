<template>
  <q-select
    v-model="lang"
    color="primary"
    :options="options"
    filled
    dense
    emit-value
    map-options
    @update:model-value="handleUpdate"
  />
</template>
<script setup lang="ts">
import { supportedLanguages } from '@/types/language'
import { useAppSettingStore } from '@/store/modules/appSetting'
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useElectron } from '@/utils/useElectron'
import { AppSetting } from '@/types/appSetting'

const appSettingStore = useAppSettingStore()
const { locale, t } = useI18n()
const { invoke } = useElectron()

const lang = ref('')

const options = computed(() => supportedLanguages.map(supportedLanguage => {
  return {
    label: t(`commons.labels.languages.${supportedLanguage}`),
    value: supportedLanguage
  }
}))

onBeforeMount(() => {
  lang.value = appSettingStore.language
})

const handleUpdate = async () => {
  locale.value = lang.value
  appSettingStore.setState(await invoke<Partial<AppSetting>>('set-app-setting', { language: lang.value }))
}
</script>
<style>

</style>
