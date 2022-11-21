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
          {{ t('titles.menus.settingGeneral') }}
        </div>
        <q-checkbox
          v-model="saveImmediate"
          :label="t('types.appSetting.labels.autoLaunch')"
          @update:model-value="onUpdateSaveImmediate"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const saveImmediate = ref(false)

const onUpdateSaveImmediate = () => {
  //
}
</script>
<style>

</style>
