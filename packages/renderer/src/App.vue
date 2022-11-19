<template>
  <div>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { useElectron } from '@/utils/useElectron'
import { onBeforeMount } from 'vue'
import { useAppSettingStore } from '@/store/modules/appSetting'

const electron = useElectron()
const appSetting = useAppSettingStore()

onBeforeMount(async () => {
  appSetting.setState(await electron.invoke('get-app-setting'))
})
</script>

