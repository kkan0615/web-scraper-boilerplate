<template>
  <q-page
    padding
  >
    <div
      class="q-gutter-md"
    >
      <div>
        <div
          class="text-h6 text-capitalize"
        >
          {{ t('commons.titles.version') }}
        </div>
        <div>
          <span
            class="text-capitalize"
          >{{ t('commons.titles.currentVersion') }}</span>: {{ appVersion }}
        </div>
      </div>
      <div>
        <div
          class="text-h6 text-capitalize"
        >
          {{ t('commons.titles.about') }}
        </div>
        <div
          class="q-gutter-sm"
        >
          <div>
            Copyright &copy; 2022. All Rights Reserved
          </div>
          <div>
            <github-me-btn />
          </div>
          <div>
            <buy-me-a-coffee-btn />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BuyMeACoffeeBtn from '@/components/btns/BuyMeACoffee.vue'
import GithubMeBtn from '@/components/btns/GithubMe.vue'

const { t } = useI18n()

const appVersion = __APP_VERSION__
</script>
<style>

</style>
