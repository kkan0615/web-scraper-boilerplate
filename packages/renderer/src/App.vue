<template>
  <q-layout
    view="hHh lpR fFf"
  >
    <q-header
      elevated
      class="bg-primary text-white draggable-area"
    >
      <q-bar>
        <q-btn
          class="non-draggable-area"
          dense
          flat
          icon="laptop_chromebook"
        />
        <div class="non-draggable-area">
          Web Scraper
        </div>
        <q-space />
        <q-btn
          v-if="showSettingBtn"
          class="non-draggable-area"
          dense
          flat
          icon="settings"
          :to="{ name: 'Setting' }"
        >
          <q-tooltip>
            {{ t('tooltips.menus.setting') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          class="non-draggable-area"
          dense
          flat
          icon="minimize"
          @click="handleMinimize"
        />
        <q-btn
          class="non-draggable-area"
          dense
          flat
          icon="crop_square"
          @click="toggleMaximize"
        />
        <q-btn
          class="non-draggable-area"
          dense
          flat
          icon="close"
          @click="handleClose"
        />
      </q-bar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useElectron } from '@/utils/useElectron'
import { computed, onBeforeMount, ref } from 'vue'
import { useAppSettingStore } from '@/store/modules/appSetting'
import { useScrapSettingStore } from '@/store/modules/scrapSetting'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale, t } = useI18n()
const route = useRoute()
const { invoke, send } = useElectron()
const appSetting = useAppSettingStore()
const scrapSettingStore = useScrapSettingStore()

const isMaxSize = ref(false)

const showSettingBtn = computed(() => {
  return route.matched.every(match => match.name !== 'Setting')
})

onBeforeMount(async () => {
  const appSettingRes = await invoke('get-app-setting')
  appSetting.setState(appSettingRes)
  // Change locale
  locale.value = appSetting.language
  scrapSettingStore.setState(await invoke('get-scrap-setting'))
})

const handleMinimize = () => {
  send('minimize-window')
}

const toggleMaximize = () => {
  send('toggle-maximize-window')
  isMaxSize.value = !isMaxSize.value
}

const handleClose = () => {
  send('close-window')
}
</script>
