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

const electron = useElectron()
const appSetting = useAppSettingStore()
const scrapSettingStore = useScrapSettingStore()

onBeforeMount(async () => {
  appSetting.setState(await electron.invoke('get-app-setting'))
  scrapSettingStore.setState(await electron.invoke('get-scrap-setting'))
})
</script>
