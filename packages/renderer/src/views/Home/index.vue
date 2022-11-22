<template>
  <div
    class="flex flex-center"
    style="height: 100vh"
  >
    <div
      style="width: 300px"
    >
      <header
        class="flex"
      >
        <router-link
          :to="{ name: 'Setting' }"
          class="q-ml-auto"
        >
          <q-btn
            flat
            round
          >
            <Icon
              class="text-h5"
              icon="ic:outline-settings"
            />
            <q-tooltip>
              {{ t('tooltips.menus.setting') }}
            </q-tooltip>
          </q-btn>
        </router-link>
      </header>
      <div
        class="text-center"
      >
        <div
          class="text-h6 q-mb-md"
        >
          Press to button to scrapping
        </div>
        <q-btn
          :disable="seconds > 0"
          :loading="loading"
          color="primary"
          @click="handleTest"
        >
          {{ t('commons.btns.start') }}
          <q-tooltip>
            {{ t('tooltips.startScrapping') }}
          </q-tooltip>
        </q-btn>
        <div
          v-if="seconds > 0"
        >
          Try again after {{ seconds }} seconds
        </div>
        <div
          class="q-mt-sm"
        >
          <div
            class="row q-gutter-sm justify-center"
          >
            <div>
              <q-btn
                flat
                round
                @click="exportData('pdf')"
              >
                <Icon
                  class="text-h5"
                  icon="fluent:document-pdf-16-regular"
                />
                <q-tooltip>
                  {{ t('tooltips.fileExts.downloads.pdf') }}
                </q-tooltip>
              </q-btn>
            </div>
            <div>
              <q-btn
                flat
                round
                @click="exportData('csv')"
              >
                <Icon
                  class="text-h5"
                  icon="iwwa:file-csv"
                />
                <q-tooltip>
                  {{ t('tooltips.fileExts.downloads.csv') }}
                </q-tooltip>
              </q-btn>
            </div>
            <div>
              <q-btn
                flat
                round
                @click="exportData('excel')"
              >
                <Icon
                  class="text-h6"
                  icon="uiw:file-excel"
                />
                <q-tooltip>
                  {{ t('tooltips.fileExts.downloads.xlsx') }}
                </q-tooltip>
              </q-btn>
            </div>
            <div>
              <q-btn
                flat
                round
                @click="exportData('txt')"
              >
                <Icon
                  class="text-h6"
                  icon="icon-park-outline:file-txt-one"
                />
                <q-tooltip>
                  {{ t('tooltips.fileExts.downloads.txt') }}
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useElectron } from '@/utils/useElectron'
import { MaxWaitingSeconds } from '@/types/timer'
import { Icon } from '@iconify/vue'

const { t } = useI18n()
const { invoke } = useElectron()

const loading = ref(false)
const possible = ref(true)
const timer = ref<NodeJS.Timer | null>(null)
const seconds = ref(0)

onBeforeUnmount(() => {
  destroyTimer()
})

const scrapping = async () => {
  try {
    loading.value = true
    createTimer()
    const res = await invoke('scraping')
    // const res = await invoke('scrapping-images')
    console.log(res)
    // Prevent multiple click after
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const handleTest = async () => {
  try {
    loading.value = true
    // console.log(await invoke('scraping'))
    console.log(await invoke('scrapping-pdf-test'))
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const createTimer = () => {
  seconds.value = MaxWaitingSeconds
  timer.value = setInterval(() => {
    seconds.value -= 1
    if (seconds.value < 0) {
      timeout()
    }
  }, 1000)
}

const destroyTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

const timeout = () => {
  seconds.value = MaxWaitingSeconds
  possible.value = true
  destroyTimer()
}

const exportData = async (ext: string) => {
  try {
    await invoke(`export-to-${ext}`)
  } catch (e) {
    console.error(e)
  }
}

</script>
<style>

</style>
