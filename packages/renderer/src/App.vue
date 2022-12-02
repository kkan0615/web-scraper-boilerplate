<template>
  <div>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { useElectron } from '@/utils/useElectron'
import { onBeforeMount } from 'vue'
import { useAppSettingStore } from '@/store/modules/appSetting'
import { useScrapSettingStore } from '@/store/modules/scrapSetting'
import { useI18n } from 'vue-i18n'

const electron = useElectron()
const { locale } = useI18n()
const appSetting = useAppSettingStore()
const scrapSettingStore = useScrapSettingStore()

onBeforeMount(async () => {
  const appSettingRes = await electron.invoke('get-app-setting')
  appSetting.setState(appSettingRes)
  // Change locale
  locale.value = appSetting.language
  scrapSettingStore.setState(await electron.invoke('get-scrap-setting'))
})
</script>
