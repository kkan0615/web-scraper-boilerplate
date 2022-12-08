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
        <div class="text-h6">
          Close icon
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
import { ref } from 'vue'
import { DayMap, Schedule } from '@/types/schedule'
import { useI18n } from 'vue-i18n'
import { useElectron } from '@/utils/useElectron'

interface Props {
  update: boolean
  schedule?: Schedule
}

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

const handleOpen = () => {
  if (props.update && props.schedule) {
    hour.value = props.schedule.hour
    minute.value = props.schedule.minute
    day.value = props.schedule.day
  } else {
    hour.value = 0
    minute.value = 0
    day.value = 0
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
      await invoke<Partial<Schedule>>('update-schedule', {
        ...props.schedule,
        hour: hour.value,
        minute: minute.value,
        day: day.value,
      })
    } else {
      await invoke<Omit<Schedule, 'id' | 'isDefault' | 'isOn'>>('add-schedule', {
        hour: hour.value,
        minute: minute.value,
        day: day.value,
      })
    }

    emit('saved')
    handleClose()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
<style>

</style>
