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
        @click="handleTest"
      >
        {{ t('commons.btns.start') }}
      </q-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useElectron } from '@/utils/useElectron'

const { t } = useI18n()
const { invoke } = useElectron()

const loading = ref(false)

const handleTest = async () => {
  try {
    loading.value = true
    console.log(await invoke('scraping'))
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
<style>

</style>
