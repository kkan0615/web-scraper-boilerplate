<template>
  <div
    class="flex flex-center"
    style="height: 100vh"
  >
    <div>
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
        <!-- Error banner -->
        <q-banner
          v-if="errorMessage"
          dense
          class="bg-negative text-white q-mb-md"
        >
          <template #avatar>
            <q-icon
              name="error"
            />
          </template>
          You have lost connection to the internet. This app is offline.
        </q-banner>
        <div
          class="text-h6 q-mb-md text-capitalize"
        >
          {{ t('views.Home.instruction') }}
        </div>
        <div
          class="flex justify-center q-gutter-sm"
        >
          <!-- Sample 1 - scrapping -->
          <!--          <q-btn-->
          <!--            :disable="seconds > 0"-->
          <!--            :loading="loading"-->
          <!--            color="primary"-->
          <!--            @click="scrapping"-->
          <!--          >-->
          <!--            {{ t('commons.btns.start') }}-->
          <!--            <q-tooltip-->
          <!--              v-if="seconds <= 0"-->
          <!--            >-->
          <!--              {{ t('tooltips.startScrapping') }}-->
          <!--            </q-tooltip>-->
          <!--          </q-btn>-->
          <!-- Sample 2 - xlsx -->
          <q-btn
            :disable="seconds > 0"
            :loading="loading"
            color="primary"
            icon="fas fa-file-excel"
            label="excel"
            @click="handleScrapping('xlsx')"
          >
            <q-tooltip
              v-if="seconds <= 0"
            >
              {{ t('tooltips.startScrapping') }}
            </q-tooltip>
          </q-btn>
          <!-- Sample 3 - csv -->
          <q-btn
            :disable="seconds > 0"
            :loading="loading"
            icon="fas fa-file-csv"
            color="primary"
            label="csv"
            @click="handleScrapping('csv')"
          >
            <q-tooltip
              v-if="seconds <= 0"
            >
              {{ t('tooltips.startScrapping') }}
            </q-tooltip>
          </q-btn>
          <!-- Sample 4 - pdf -->
          <q-btn
            :disable="seconds > 0"
            :loading="loading"
            color="primary"
            icon="fas fa-file-pdf"
            label="pdf"
            @click="handleScrapping('pdf')"
          >
            <q-tooltip
              v-if="seconds <= 0"
            >
              {{ t('tooltips.startScrapping') }}
            </q-tooltip>
          </q-btn>
          <!-- Sample 5 - pdf with template -->
          <q-btn
            :disable="seconds > 0"
            :loading="loading"
            color="primary"
            icon="fas fa-file-pdf"
            label="pdf With Template"
            @click="handleScrapping('pdfWithTemplate')"
          >
            <q-tooltip
              v-if="seconds <= 0"
            >
              {{ t('tooltips.startScrapping') }}
            </q-tooltip>
          </q-btn>
          <!-- Sample 6 - txt -->
          <q-btn
            :disable="seconds > 0"
            :loading="loading"
            color="primary"
            icon="fas fa-file-lines"
            label="txt"
            @click="handleScrapping('txt')"
          >
            <q-tooltip
              v-if="seconds <= 0"
            >
              {{ t('tooltips.startScrapping') }}
            </q-tooltip>
          </q-btn>
          <!-- Sample 5 - pdf with template -->
          <q-btn
            :disable="seconds > 0"
            :loading="loading"
            color="primary"
            icon="fas fa-file-image"
            label="images"
            @click="handleScrapping('images')"
          >
            <q-tooltip
              v-if="seconds <= 0"
            >
              {{ t('tooltips.startScrapping') }}
            </q-tooltip>
          </q-btn>
        </div>
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
const errorMsg = ref('')

onBeforeUnmount(() => {
  destroyTimer()
})

const handleScrapping = async (type: 'xlsx' | 'csv' | 'pdf' | 'pdfWithTemplate' | 'txt' | 'images') => {
  try {
    loading.value = true
    errorMsg.value = ''
    createTimer()
    if (type === 'xlsx') {
      await invoke('scrap-to-xlsx-test')
    } else if (type=== 'csv') {
      await invoke('scrap-to-csv-test')
    } else if (type === 'pdf') {
      await invoke('scrap-pdf-test')
    } else if (type === 'pdfWithTemplate') {
      await invoke('scrap-pdf-with-template-test')
    } else if (type === 'txt') {
      await invoke('scrap-to-txt-test')
    } else if (type === 'images') {
      await invoke('scrap-images-test')
    }

  } catch (e) {
    console.error(e)
    errorMsg.value = t('views.Home.errorMsg')
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
