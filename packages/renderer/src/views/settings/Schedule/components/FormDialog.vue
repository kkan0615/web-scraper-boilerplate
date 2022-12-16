<template>
  <slot
    name="activator"
    :open="handleOpen"
  />
  <q-dialog
    v-model="open"
  >
    <q-card
      style="width: 500px"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-capitalize">
          {{ schedule ? t('commons.btns.edit') : t('commons.btns.add') }}
        </div>
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          dense
          @click="handleClose"
        />
      </q-card-section>
      <q-card-section>
        <q-form
          class="q-col-gutter-md"
        >
          <div
            class="flex q-gutter-md"
          >
            <q-select
              v-model="hour"
              class="col-grow"
              :label="t('types.schedule.hour')"
              dense
              outlined
              :options="hours"
            />
            <q-select
              v-model="minute"
              class="col-grow"
              :label="t('types.schedule.minute')"
              dense
              outlined
              :options="minutes"
            />
          </div>
          <q-btn-toggle
            v-model="day"
            spread
            flat
            toggle-color="primary"
            :options="weekOfDayOptions"
          />
          <q-select
            v-model="scraps"
            multiple
            :label="t('types.schedule.scraps')"
            dense
            outlined
            option-value="value"
            option-label="label"
            emit-value
            map-options
            :options="scrapKeyOptions"
          />
        </q-form>
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          class="q-ml-auto"
          :label="t('commons.btns.save')"
          @click="handleSave"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { DayMap, Schedule } from '@/types/schedule'
import { useI18n } from 'vue-i18n'
import { useElectron } from '@/utils/useElectron'
import { ScrapKey, scrapKeyArr } from '@/types/scrap'
import { useQuasar } from 'quasar'

interface Props {
  update: boolean
  schedule?: Schedule
}

const $q = useQuasar()
const { t } = useI18n()
const { invoke } = useElectron()

const props = withDefaults(defineProps<Props>(), {
  update: false,
})

const emit = defineEmits<{
  (e: 'saved',): void
}>()
const hours = [...Array(24)].map((_, index) => index)
const minutes = [...Array(60)].map((_, index) => index)
const weekOfDayOptions = Object.keys(DayMap).map(key => {
  return {
    label: t(`commons.labels.dayOfWeek.short.${DayMap[Number(key)]}`),
    value: Number(key),
  }
})

const open = ref(false)
const loading = ref(false)
const hour = ref(0)
const minute = ref(0)
const day = ref(0)
const scraps = ref<ScrapKey[]>([])

const scrapKeyOptions = computed(() => scrapKeyArr.map(scrapKeyEl => {
  return {
    label: t(`types.scrap.${scrapKeyEl}`),
    value: scrapKeyEl,
  }
}))

const handleOpen = () => {
  if (props.update && props.schedule) {
    hour.value = props.schedule.hour
    minute.value = props.schedule.minute
    day.value = props.schedule.day
    scraps.value = props.schedule.scraps
  } else {
    hour.value = 0
    minute.value = 0
    day.value = 0
    scraps.value = []
  }
  open.value = true
}

const handleClose = () => {
  open.value = false
}

const handleSave = async () => {
  try {
    loading.value = true
    if (props.update && props.schedule) {
      await invoke<string>('update-schedule', JSON.stringify({
        ...props.schedule,
        hour: hour.value,
        minute: minute.value,
        day: day.value,
        scraps: scraps.value,
      }))
    } else {
      await invoke<string>('add-schedule', JSON.stringify({
        hour: hour.value,
        minute: minute.value,
        day: day.value,
        scraps: scraps.value,
      }))
    }
    $q.notify({
      type: 'positive',
      message: t('commons.messages.saved')
    })
    emit('saved')
    handleClose()
  } catch (e) {
    console.error(e)
    $q.notify({
      type: 'positive',
      message: t('commons.messages.saveFailed')
    })
  } finally {
    loading.value = false
  }
}
</script>
<style>

</style>
