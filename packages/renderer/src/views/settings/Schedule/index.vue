<template>
  <q-page
    padding
  >
    <div
      class="q-gutter-md"
    >
      <!-- Options -->
      <div
        class="text-h6 text-capitalize"
      >
        {{ t('titles.menus.SettingSchedule') }}
      </div>
    </div>
    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
    >
      <template #top>
        <form-dialog
          :update="false"
          @saved="loadSchedules"
        >
          <template
            #activator="{open}"
          >
            <q-btn
              class="q-ml-auto"
              icon="add"
              color="primary"
              :label="t('commons.btns.add')"
              @click="open"
            >
              <q-tooltip>
                {{ t('commons.tooltips.add') }}
              </q-tooltip>
            </q-btn>
          </template>
        </form-dialog>
      </template>
      <template #body-cell-action="props">
        <q-td :props="props">
          <div>
            <form-dialog
              :schedule="props.row"
              update
              @saved="loadSchedules"
            >
              <template
                #activator="{open}"
              >
                <q-btn
                  color="primary"
                  icon="edit"
                  flat
                  round
                  dense
                  @click="open"
                >
                  <q-tooltip>
                    {{ t('commons.tooltips.edit') }}
                  </q-tooltip>
                </q-btn>
              </template>
            </form-dialog>
            <q-btn
              v-if="!props.row.isDefault"
              color="negative"
              icon="delete"
              flat
              round
              dense
              @click="handleDelete(props.row.id)"
            >
              <q-tooltip>
                {{ t('commons.tooltips.delete') }}
              </q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>
      <template #body-cell-ison="props">
        <q-td :props="props">
          <q-toggle
            :model-value="props.value"
            @click="onUpdateIsOn(props.row.id, props.value)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrapSettingStore } from '@/store/modules/scrapSetting'
import { useElectron } from '@/utils/useElectron'
import { DayMap, Schedule } from '@/types/schedule'
import { QTableColumn, useQuasar } from 'quasar'
import FormDialog from '@/views/settings/Schedule/components/FormDialog.vue'

const { t } = useI18n()
const $q = useQuasar()
const { invoke } = useElectron()
const scrapSettingStore = useScrapSettingStore()

const schedules = ref<Schedule[]>([])
const columns: QTableColumn[] = [
  {
    name: 'index',
    label: '#',
    field: 'index'
  },
  {
    name: 'time',
    label: 'Time',
    align: 'left',
    field: (row: Schedule) => `${row.hour}:${row.minute}`,
  },
  {
    name: 'day',
    label: 'Day',
    align: 'left',
    field: (row: Schedule) => t(`commons.labels.dayOfWeek.${DayMap[row.day]}`).charAt(0).toUpperCase()
        + t(`commons.labels.dayOfWeek.${DayMap[row.day]}`).slice(1),
  },
  {
    name: 'ison',
    label: 'On',
    align: 'right',
    field: 'isOn'
  },
  {
    name: 'action',
    label: 'Action',
    align: 'right',
    field: ''
  },
]

const rows = computed(() => schedules.value.map((schedule, index) => {
  return {
    index: index + 1,
    ...schedule,
  }
}))

onBeforeMount(async () => {
  await loadSchedules()
})

const loadSchedules = async () => {
  try {
    schedules.value = await invoke('get-schedules')
    console.log(schedules.value)
  } catch (e) {
    console.error(e)
  }
}

const onUpdateIsOn = async (id: string, bool: boolean) => {
  try {
    await invoke('update-schedule', {
      id,
      isOn: !bool
    })
    await loadSchedules()
  } catch (e) {
    console.error(e)
  }
}

const handleDelete = async (id: string) => {
  try {
    $q.dialog({
      title: t('commons.titles.delete'),
      message: t('commons.messages.questions.delete'),
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await invoke('delete-schedule', id)
      await loadSchedules()
    }).onCancel(() => {
      // console.log('Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
  } catch (e) {
    console.error(e)
  }
}
</script>
<style>

</style>
