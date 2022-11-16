<template>
  <div
    class="flex flex-center"
    style="height: 100vh"
  >
    <div
      class="text-center"
    >
      <div>
        Press to button to scrapping
      </div>
      <q-btn
        :loading="loading"
        color="primary"
        @click="scrapping"
      >
        {{ t('commons.btns.start') }}
        <q-tooltip>
          {{ t('tooltips.startScrapping') }}
        </q-tooltip>
      </q-btn>
      <div
        class="q-mt-sm"
      >
        <div
          class="text-subtitle2"
        >
          Export data
        </div>
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
                {{ t('commons.tooltips.fileExts.downloads.pdf') }}
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
                {{ t('commons.tooltips.fileExts.downloads.csv') }}
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
                {{ t('commons.tooltips.fileExts.downloads.xlsx') }}
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
                {{ t('commons.tooltips.fileExts.downloads.txt') }}
              </q-tooltip>
            </q-btn>
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
const seconds = ref(MaxWaitingSeconds)


onBeforeUnmount(() => {
  destroyTimer()
})

const scrapping = async () => {
  try {
    loading.value = true
    createTimer()
    const res = await invoke('scraping')
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
    await (invoke('test'))
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const createTimer = () => {
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
