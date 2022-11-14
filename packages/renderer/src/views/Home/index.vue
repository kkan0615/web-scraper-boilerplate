<template>
  <div>
    <div>
      loading: {{ loading }}
    </div>
    <button
      @click="handleTest"
    >
      Test
    </button>
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
