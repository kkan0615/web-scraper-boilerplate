<template>
  <q-page
    padding
  >
    <div
      class="q-gutter-md"
    >
      <div>
        <div
          class="text-h6 text-capitalize"
        >
          {{ t('titles.menus.settingGeneral') }}
        </div>
        <q-checkbox
          v-model="autoLaunch"
          :label="t('types.appSetting.labels.autoLaunch')"
          @update:model-value="handleAutoLaunch"
        />
      </div>
      <div>
        <div
          class="text-h6 text-capitalize"
        >
          {{ t('types.appSetting.downloadPath') }}
        </div>
        <q-input
          v-model="downloadPath"
          readonly
          filled
          dense
          @click="handleChangePath"
        />
        <div
          class="q-mt-sm text-right"
        >
          <q-btn
            color="negative"
            @click="handleResetPath"
          >
            {{ t('commons.btns.reset') }}
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { OpenDialogOptions, OpenDialogReturnValue } from 'electron'
import { useAppSettingStore } from '@/store/modules/appSetting'
import { useElectron } from '@/utils/useElectron'
import { AppSetting } from '@/types/appSetting'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { invoke } = useElectron()
const appSettingStore = useAppSettingStore()

const autoLaunch = ref(false)
const downloadPath = ref('')

onBeforeMount(() => {
  autoLaunch.value = appSettingStore.autoLaunch
  downloadPath.value = appSettingStore.downloadPath

})

const handleAutoLaunch = async () => {
  appSettingStore.setState(await invoke<Partial<AppSetting>>('set-app-setting', { autoLaunch: autoLaunch.value }))
}

const handleChangePath = async () => {
  const res = await invoke<OpenDialogOptions, OpenDialogReturnValue>('show-open-dialog', {
    properties: [ 'openDirectory' ]
  })
  if (!res.canceled && res.filePaths.length > 0) {
    downloadPath.value = res.filePaths[0]
    appSettingStore.setState(await invoke<Partial<AppSetting>>('set-app-setting', { downloadPath: downloadPath.value }))
  }
}

const handleResetPath = async () => {
  downloadPath.value = await invoke('get-path', 'downloads')
  appSettingStore.setState(await invoke<Partial<AppSetting>>('set-app-setting', { downloadPath: downloadPath.value }))
}
</script>
<style>

</style>
