<template>
  <q-page
    padding
  >
    <div
      class="q-gutter-md"
    >
      <!-- Options -->
      <div>
        <div
          class="text-h6 text-capitalize"
        >
          File names
        </div>
        <div
          class="flex column q-col-gutter-md"
        >
          <q-input
            v-model="xlsxFileName"
            label="xlsx"
            dense
            outlined
            @update:model-value="onUpdateFileNames"
          />
          <q-input
            v-model="pdfFileName"
            label="PDF"
            dense
            outlined
            @update:model-value="onUpdateFileNames"
          />
          <q-input
            v-model="pdfWithTemplateFileName"
            label="pdf with template"
            dense
            outlined
            @update:model-value="onUpdateFileNames"
          />
          <q-input
            v-model="imagesFileName"
            label="image"
            dense
            outlined
            @update:model-value="onUpdateFileNames"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrapSettingStore } from '@/store/modules/scrapSetting'
import { ScrapSetting } from '@/types/scrapSetting'
import { useElectron } from '@/utils/useElectron'

const { t } = useI18n()
const { invoke } = useElectron()
const scrapSettingStore = useScrapSettingStore()

const xlsxFileName = ref('')
const csvFileName = ref('')
const txtFileName = ref('')
const imagesFileName = ref('')
const pdfFileName = ref('')
const pdfWithTemplateFileName = ref('')
const videosWithTemplateFileName = ref('')

onBeforeMount(() => {
  xlsxFileName.value = scrapSettingStore.fileNames.xlsx
  csvFileName.value = scrapSettingStore.fileNames.csv
  txtFileName.value = scrapSettingStore.fileNames.txt
  imagesFileName.value = scrapSettingStore.fileNames.images
  pdfFileName.value = scrapSettingStore.fileNames.pdf
  pdfWithTemplateFileName.value = scrapSettingStore.fileNames['pdf-with-template']
  videosWithTemplateFileName.value = scrapSettingStore.fileNames.videos
})

const onUpdateFileNames = async () => {
  scrapSettingStore.setState(
    await invoke<Partial<ScrapSetting>>('set-scrap-setting', {
      fileNames: {
        xlsx: xlsxFileName.value,
        csv: csvFileName.value,
        txt: txtFileName.value,
        images: imagesFileName.value,
        pdf: pdfFileName.value,
        'pdf-with-template': pdfWithTemplateFileName.value,
        videos: videosWithTemplateFileName.value
      }
    })
  )

}
</script>
<style>

</style>
