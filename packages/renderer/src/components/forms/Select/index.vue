<template>
  <q-select
    v-model="model"
    standout
    :options="supportedLanguages"
    :dense="true"
    @update:model-value="handleUpdate"
  />
</template>
<script setup lang="ts">
import { supportedLanguages } from '@/types/language'
import { useAppSettingStore } from '@/store/modules/appSetting'
import { storeToRefs } from 'pinia'

const appSettingStore = useAppSettingStore()
const { autoLaunch } = storeToRefs(appSettingStore)

const handleUpdate = () => {

}
</script>
<style>

</style>
