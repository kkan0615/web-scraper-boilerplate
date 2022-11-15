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
        @click="handleTest"
      >
        Test
      </q-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useElectron } from '@/utils/useElectron'
import { ref } from 'vue'

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
