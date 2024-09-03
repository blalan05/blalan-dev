<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" :position="[-6, -6, 0]" visible />
    <TresMesh :position="{ x: 0, y: 0, z: 0 }">
      <TresPlaneGeometry :args="[15, 9]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresMesh :position="{ x: 6, y: 6 }">
      <TresPlaneGeometry :args="[12, 9]" />
      <TresMeshBasicMaterial color="red" />
    </TresMesh>
    <TresAmbientLight :intensity="27" />
    <OrbitControls />
  </TresCanvas>
</template>

<script lang="ts" setup>
  import { TresCanvas } from '@tresjs/core'
  import OrbitControls from '@/components/OrbitControls.vue'
</script>
