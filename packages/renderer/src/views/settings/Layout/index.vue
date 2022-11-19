<template>
  <q-layout view="lHh lpR lFf">
    <drawer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import Drawer from '@/views/settings/Layout/Components/Drawer.vue'

</script>
<style>

</style>
