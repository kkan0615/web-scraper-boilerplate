<template>
  <q-drawer
    v-model="open"
    class="bg-primary text-white"
    :width="240"
    :breakpoint="0"
    show-if-above
    bordered
  >
    <div
      class="q-py-xs"
    >
      <router-link :to="{ name: 'Home' }">
        <q-btn
          flat
          rounded
        >
          <Icon
            class="text-h6"
            icon="material-symbols:arrow-back-ios-new-rounded"
          />
          <q-tooltip>
            {{ t('commons.tooltips.back') }}
          </q-tooltip>
        </q-btn>
      </router-link>
    </div>
    <q-list>
      <q-item
        :to="{ name: 'SettingGeneral' }"
        :class="{'bg-secondary': currRouteName === 'SettingGeneral'}"
        clickable
        active-class="text-white"
      >
        <q-item-section avatar>
          <q-icon name="drafts" />
        </q-item-section>

        <q-item-section
          class="text-capitalize"
        >
          {{ t('titles.menus.settingGeneral') }}
        </q-item-section>
      </q-item>
      <q-item
        :to="{ name: 'SettingScrapping' }"
        :class="{'bg-secondary': currRouteName === 'SettingScrapping'}"
        clickable
        active-class="text-white"
      >
        <q-item-section avatar>
          <q-icon name="drafts" />
        </q-item-section>

        <q-item-section
          class="text-capitalize"
        >
          {{ t('titles.menus.settingScrapping') }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

const open = ref(true)

const currRouteName = computed(() => route.name)
</script>
<style>

</style>
