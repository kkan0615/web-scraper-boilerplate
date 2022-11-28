<template>
  <q-btn
    color="black"
    @click="handleOpen"
  >
    <Icon
      class="text-h6"
      icon="radix-icons:github-logo"
    />
    <span
      class="q-ml-sm"
    >
      github
    </span>
  </q-btn>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useElectron } from '@/utils/useElectron'

const { send } = useElectron()

const handleOpen = () => {
  send('open-external', 'https://github.com/kkan0615')
}
</script>
<style>

</style>
