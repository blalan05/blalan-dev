<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { TresCanvas } from '@tresjs/core'
  import OrbitControls from '@/components/OrbitControls.vue'
</script>
